# Photos Gallery + About/Contact Merge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Photos" section with a downloadable press-photo gallery + lightbox, and merge the Contact section into About.

**Architecture:** New `Photos.jsx` + `PhotoLightbox.jsx` mirror the existing `Videos.jsx`/`VideoLightbox.jsx` pattern (grid of thumbs → click opens modal with a download action). `Contact.jsx`'s content (email text + Rider/Logo downloads) moves into `About.jsx` as a sub-block; `Contact.jsx`/`Contact.css` are deleted. `App.jsx` and `Navbar.jsx` are updated to reflect the new section list.

**Tech Stack:** React 19, Vite, Vitest + @testing-library/react. No new dependencies.

## Global Constraints

- No new npm dependencies.
- No build-time image processing — gallery thumbs use the same full-res files as the lightbox/download (matches existing `Videos.jsx` convention of using real images, not generated thumbnails).
- No zip-all download — per-photo download links only.
- Photo assets live at `public/assets/presskit/` and are referenced via `${import.meta.env.BASE_URL}assets/presskit/<file>` (existing convention from `Contact.jsx`).
- Section order in `App.jsx`: Hero, Gigs, Music, About, Photos, Videos, Footer.
- Nav link order in `Navbar.jsx`: Gigs, Music, About, Photos, Videos.

---

## File Structure

- Create: `src/data/presskitPhotos.js` — list of 9 press photos (`{ id, file, alt }`)
- Create: `src/components/PhotoLightbox.jsx` — modal showing one full-size photo + download button
- Create: `src/components/PhotoLightbox.css`
- Create: `src/components/Photos.jsx` — new section: heading, blurb, grid of thumbs, opens `PhotoLightbox`
- Create: `src/components/Photos.css`
- Create: `src/components/Photos.test.jsx`
- Modify: `src/components/About.jsx` — add contact sub-block (email text + Rider/Logo downloads)
- Modify: `src/components/About.css` — add `about__contact-*` styles (ported from `Contact.css`)
- Modify: `src/components/About.test.jsx` — add contact sub-block assertions
- Modify: `src/components/Navbar.jsx` — update `NAV_LINKS`
- Modify: `src/components/Navbar.test.jsx` — update nav link assertions
- Modify: `src/App.jsx` — swap `Contact` for `Photos`, reorder sections
- Delete: `src/components/Contact.jsx`
- Delete: `src/components/Contact.css`

---

## Task 1: Press photo data + Photos gallery grid + lightbox

**Files:**
- Create: `src/data/presskitPhotos.js`
- Create: `src/components/PhotoLightbox.jsx`
- Create: `src/components/PhotoLightbox.css`
- Create: `src/components/Photos.jsx`
- Create: `src/components/Photos.css`
- Test: `src/components/Photos.test.jsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `Photos` default export (React component, no props) for `App.jsx` to render. `presskitPhotos` named export (array of `{ id: number, file: string, alt: string }`, length 9) for potential reuse.

- [ ] **Step 1: Write the failing test**

Create `src/components/Photos.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Photos from './Photos'

describe('Photos', () => {
  it('renders 9 photo thumbnail buttons', () => {
    render(<Photos />)
    expect(screen.getAllByRole('button')).toHaveLength(9)
  })

  it('clicking a thumbnail opens the lightbox', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByTestId('photo-lightbox')).toBeInTheDocument()
  })

  it('lightbox shows a download link for the selected photo', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    const link = screen.getByLabelText('Download photo')
    expect(link).toHaveAttribute('download')
    expect(link.getAttribute('href')).toContain('assets/presskit/')
  })

  it('close button removes the lightbox', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByLabelText('Close photo'))
    expect(screen.queryByTestId('photo-lightbox')).not.toBeInTheDocument()
  })

  it('Escape key removes the lightbox', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('photo-lightbox')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Photos.test.jsx`
Expected: FAIL — `Cannot find module './Photos'`

- [ ] **Step 3: Create the data file**

Create `src/data/presskitPhotos.js`:

```js
export const presskitPhotos = [
  { id: 1, file: 'photo.jpg', alt: 'Live photo 1' },
  { id: 2, file: '260710-204703.jpg', alt: 'Live photo 2' },
  { id: 3, file: '260710-204727.jpg', alt: 'Live photo 3' },
  { id: 4, file: '260710-204912.jpg', alt: 'Live photo 4' },
  { id: 5, file: '260710-205811.jpg', alt: 'Live photo 5' },
  { id: 6, file: '260710-205837.jpg', alt: 'Live photo 6' },
  { id: 7, file: '260710-210302.jpg', alt: 'Live photo 7' },
  { id: 8, file: '260710-210519.jpg', alt: 'Live photo 8' },
  { id: 9, file: '260710-210632.jpg', alt: 'Live photo 9' },
]
```

- [ ] **Step 4: Create the lightbox component**

Create `src/components/PhotoLightbox.jsx`:

```jsx
import { useEffect } from 'react'
import './PhotoLightbox.css'

export default function PhotoLightbox({ photo, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const src = `${import.meta.env.BASE_URL}assets/presskit/${photo.file}`

  return (
    <div
      className="lightbox"
      data-testid="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lightbox__inner">
        <button className="lightbox__close" onClick={onClose} aria-label="Close photo">✕</button>
        <div className="lightbox__frame photo-lightbox__frame">
          <img src={src} alt={photo.alt} />
        </div>
        <a
          className="photo-lightbox__download"
          href={src}
          download={photo.file}
          aria-label="Download photo"
        >
          Download full size
        </a>
      </div>
    </div>
  )
}
```

Create `src/components/PhotoLightbox.css`:

```css
.photo-lightbox__frame {
  aspect-ratio: auto;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-lightbox__frame img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
}

.photo-lightbox__download {
  display: inline-flex;
  margin-top: 12px;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  transition: border-color 0.2s, color 0.2s;
}

.photo-lightbox__download:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

Note: `.lightbox`, `.lightbox__inner`, `.lightbox__close`, `.lightbox__frame` base rules already exist in `VideoLightbox.css`. Import that stylesheet too so those base classes apply — add `import './VideoLightbox.css'` alongside `import './PhotoLightbox.css'` in `PhotoLightbox.jsx`:

```jsx
import { useEffect } from 'react'
import './VideoLightbox.css'
import './PhotoLightbox.css'
```

- [ ] **Step 5: Create the Photos section component**

Create `src/components/Photos.jsx`:

```jsx
import { useState } from 'react'
import { presskitPhotos } from '../data/presskitPhotos'
import PhotoLightbox from './PhotoLightbox'
import './Photos.css'

export default function Photos() {
  const [activePhoto, setActivePhoto] = useState(null)

  return (
    <div className="section-wrapper" id="photos">
      <section>
        <h2 className="section-heading">Photos</h2>
        <p className="photos__intro">Press photos, free to use — click a photo to download the full-size file.</p>
        <div className="photos__grid">
          {presskitPhotos.map(photo => (
            <button
              key={photo.id}
              className="photos__item"
              onClick={() => setActivePhoto(photo)}
              aria-label={`View ${photo.alt}`}
            >
              <div className="photos__thumb">
                <img
                  src={`${import.meta.env.BASE_URL}assets/presskit/${photo.file}`}
                  alt={photo.alt}
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>
        {activePhoto && (
          <PhotoLightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />
        )}
      </section>
    </div>
  )
}
```

Create `src/components/Photos.css`:

```css
.photos__intro {
  max-width: 600px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 32px;
}

.photos__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .photos__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 500px) {
  .photos__grid { grid-template-columns: 1fr; }
}

.photos__item {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.photos__thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-surface);
}

.photos__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.photos__item:hover .photos__thumb img {
  transform: scale(1.04);
  filter: brightness(1);
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/Photos.test.jsx`
Expected: PASS (5 tests)

- [ ] **Step 7: Commit**

```bash
git add src/data/presskitPhotos.js src/components/PhotoLightbox.jsx src/components/PhotoLightbox.css src/components/Photos.jsx src/components/Photos.css src/components/Photos.test.jsx
git commit -m "feat: add Photos section with gallery grid and download lightbox"
```

---

## Task 2: Merge Contact into About

**Files:**
- Modify: `src/components/About.jsx`
- Modify: `src/components/About.css`
- Modify: `src/components/About.test.jsx`
- Delete: `src/components/Contact.jsx`
- Delete: `src/components/Contact.css`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `About` default export gains contact text + downloads; no signature change (still no props).

- [ ] **Step 1: Write the failing test additions**

Modify `src/components/About.test.jsx` — add a new `describe` block at the end of the file (after the existing one, before the final closing — i.e. append after line 24's `})`):

```jsx
describe('About contact block', () => {
  it('renders the contact email link', () => {
    render(<About />)
    expect(screen.getByRole('link', { name: /contact@sparkofsanity\.nl/ })).toHaveAttribute(
      'href',
      'mailto:contact@sparkofsanity.nl'
    )
  })

  it('renders Rider and Logo download buttons but not Photo', () => {
    render(<About />)
    expect(screen.getByText('Rider')).toBeInTheDocument()
    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.queryByText('Photo')).not.toBeInTheDocument()
  })
})
```

The full file's `describe('About contact block', ...)` block must be a sibling of the existing `describe('About', ...)` block, both inside the same file after the existing imports (`About` and `screen` are already imported at the top).

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/About.test.jsx`
Expected: FAIL — cannot find link with email text, "Rider"/"Logo" not found

- [ ] **Step 3: Update About.jsx**

Replace the full contents of `src/components/About.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import { members } from '../data/members'
import './About.css'

const BIO = `Spark of Sanity is an alternative rock band from the Netherlands. We play a mix of original songs and covers from bands we love — Kaleo, Highly Suspect, Arctic Monkeys, Muse and many others. We're best experienced live, that's where the raw energy really comes to life.`

const PRESSKIT_FILES = [
  { label: 'Rider', file: 'rider.pdf', ext: 'PDF' },
  { label: 'Logo',  file: 'logo.png',  ext: 'PNG' },
]

export default function About() {
  const membersRef = useRef(null)

  useEffect(() => {
    if (!membersRef.current) return
    const cards = membersRef.current.querySelectorAll('.about__member')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-in-view', entry.isIntersecting)
        })
      },
      { threshold: 1 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="section-wrapper section-wrapper--alt">
      <section id="about">
        <h2 className="section-heading">About</h2>
        <p className="about__bio">{BIO}</p>
        <div className="about__members" ref={membersRef}>
          {members.map(member => (
            <div key={member.id} className="about__member">
              <div className="about__photo">
                <img src={member.photo} alt={member.name} />
              </div>
              <h3 className="about__name">{member.name}</h3>
              <p className="about__instrument">{member.instrument}</p>
            </div>
          ))}
        </div>

        <div className="about__contact">
          <p className="about__contact-text">
            Want to get in touch? Drop us a message at{' '}
            <a href="mailto:contact@sparkofsanity.nl" className="about__contact-email">
              contact@sparkofsanity.nl
            </a>
            . Looking forward to seeing you at a gig!
          </p>
          <div className="about__downloads">
            {PRESSKIT_FILES.map(({ label, file, ext }) => (
              <a
                key={file}
                href={`${import.meta.env.BASE_URL}assets/presskit/${file}`}
                download={file}
                className="about__download-btn"
              >
                <span className="about__download-ext">{ext}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Add contact styles to About.css**

Append to `src/components/About.css`:

```css
.about__contact {
  margin-top: 56px;
}

.about__contact-text {
  max-width: 600px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
}

.about__contact-email {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.about__contact-email:hover {
  opacity: 0.8;
}

.about__downloads {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.about__download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  transition: border-color 0.2s, color 0.2s;
}

.about__download-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.about__download-ext {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  border: 1px solid currentColor;
  padding: 1px 4px;
  line-height: 1.4;
  transition: color 0.2s;
}

.about__download-btn:hover .about__download-ext {
  color: var(--color-accent);
}
```

- [ ] **Step 5: Delete Contact files**

```bash
git rm src/components/Contact.jsx src/components/Contact.css
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/About.test.jsx`
Expected: PASS (5 tests total — 3 original + 2 new)

- [ ] **Step 7: Commit**

```bash
git add src/components/About.jsx src/components/About.css src/components/About.test.jsx
git commit -m "feat: merge Contact into About section"
```

---

## Task 3: Wire up App and Navbar

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.test.jsx`

**Interfaces:**
- Consumes: `Photos` default export from Task 1 (`src/components/Photos.jsx`), updated `About` default export from Task 2.
- Produces: nothing consumed by later tasks (final integration task).

- [ ] **Step 1: Write the failing test changes**

Replace the nav-links test in `src/components/Navbar.test.jsx` (the `it('renders all four nav links', ...)` block, lines 11-17):

```jsx
  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Videos')).toBeInTheDocument()
    expect(screen.getByText('Gigs')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Photos')).toBeInTheDocument()
    expect(screen.queryByText('Contact')).not.toBeInTheDocument()
  })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Navbar.test.jsx`
Expected: FAIL — "Photos" not found

- [ ] **Step 3: Update Navbar.jsx**

In `src/components/Navbar.jsx`, replace the `NAV_LINKS` array (lines 4-10):

```js
const NAV_LINKS = [
  { label: 'Gigs', href: '#gigs' },
  { label: 'Music', href: '#music' },
  { label: 'About', href: '#about' },
  { label: 'Photos', href: '#photos' },
  { label: 'Videos', href: '#videos' },
]
```

- [ ] **Step 4: Update App.jsx**

Replace the full contents of `src/App.jsx`:

```jsx
import { useRef, useState, useEffect } from 'react'
import { PlayerProvider } from './context/PlayerContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Music from './components/Music'
import MiniPlayer from './components/MiniPlayer'
import Videos from './components/Videos'
import Gigs from './components/Gigs'
import About from './components/About'
import Photos from './components/Photos'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  const musicRef = useRef(null)
  const [showMiniPlayer, setShowMiniPlayer] = useState(false)

  useEffect(() => {
    const el = musicRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowMiniPlayer(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <PlayerProvider>
      <Navbar />
      <main>
        <Hero />
        <Gigs />
        <Music ref={musicRef} />
        <About />
        <Photos />
        <Videos />
      </main>
      <Footer />
      <MiniPlayer visible={showMiniPlayer} />
    </PlayerProvider>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/Navbar.test.jsx`
Expected: PASS (4 tests)

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: All tests PASS, no references to deleted `Contact` component remain

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/components/Navbar.jsx src/components/Navbar.test.jsx
git commit -m "feat: wire Photos section into App and nav, drop Contact link"
```

---

## Self-Review Notes

- Spec coverage: gallery grid ✓ (Task 1), lightbox + per-photo download ✓ (Task 1), Contact merged into About sub-block ✓ (Task 2), Photo entry dropped from downloads row ✓ (Task 2), Rider/Logo kept ✓ (Task 2), new Photos nav link + section order ✓ (Task 3), Contact link removed ✓ (Task 3), no zip/no thumbnail pipeline/no new deps ✓ (not introduced anywhere above).
- Class name consistency checked: `PhotoLightbox` reuses `.lightbox`/`.lightbox__inner`/`.lightbox__close`/`.lightbox__frame` from `VideoLightbox.css` (imported explicitly) and adds only its own `.photo-lightbox__*` classes — no collision with `.lightbox__frame` sizing since `.photo-lightbox__frame` overrides `aspect-ratio`.
- `about__contact-*` / `about__download-*` naming avoids collision with existing `about__bio`, `about__members`, etc.
