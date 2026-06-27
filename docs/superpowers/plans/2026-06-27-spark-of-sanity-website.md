# Spark of Sanity Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React band website for Spark of Sanity, deployed to GitHub Pages at sparkofsanity.nl.

**Architecture:** Vite + React SPA. Six sections (Hero, Music, Videos, Gigs, About, Footer) stacked vertically for single-page scroll. Audio state managed globally via React Context. No routing needed — all sections are anchored divs.

**Tech Stack:** Vite 6, React 19, Vitest + @testing-library/react + jsdom, plain CSS with custom properties, HTML5 Audio API, Bandsintown widget (dynamic script embed), YouTube iframes.

## Global Constraints

- Node.js ≥ 20
- React 19 (ref as regular prop — no `forwardRef` needed)
- Vite 6
- No CSS frameworks — plain CSS only
- No audio library — HTML5 `<audio>` element directly
- Fonts: Bebas Neue (headings) + Inter (body) via Google Fonts CDN
- Colors: bg `#0a0a0a`, surface `#141414`, accent `#f5c518`, text `#ffffff`, muted `#888888`
- All assets served from `public/assets/` — paths like `/assets/audio/Storm.mp3`
- Deploy target: `gh-pages` branch, custom domain `sparkofsanity.nl`

---

### Task 1: Project Scaffold & Asset Setup

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/test-setup.js`
- Create: `public/CNAME`
- Copy: all assets from `Resources/SOS-website-backup-may-2026/` to `public/assets/`

**Interfaces:**
- Produces: running dev server at `http://localhost:5173` showing white text on dark background

- [ ] **Step 1: Scaffold Vite + React project**

From `spark-of-sanity/` directory:
```bash
npm create vite@latest . -- --template react
```
When prompted about non-empty directory, choose to continue/ignore (only `Resources/` and `docs/` are present).

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Configure Vitest in vite.config.js**

Replace `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.js'],
  },
})
```

- [ ] **Step 4: Create test setup file**

Create `src/test-setup.js`:
```js
import '@testing-library/jest-dom'

window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
window.HTMLMediaElement.prototype.pause = vi.fn()
window.HTMLMediaElement.prototype.load = vi.fn()
Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
  get: () => 180,
  configurable: true,
})
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
  get: () => 0,
  set: vi.fn(),
  configurable: true,
})
```

- [ ] **Step 5: Update package.json scripts**

Ensure `package.json` scripts section contains:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 6: Replace src/index.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-accent: #f5c518;
  --color-text: #ffffff;
  --color-muted: #888888;
  --font-heading: 'Bebas Neue', sans-serif;
  --font-body: 'Inter', sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: var(--font-body);
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.section-wrapper {
  background-color: var(--color-bg);
}

.section-wrapper--alt {
  background-color: var(--color-surface);
}

section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  letter-spacing: 0.05em;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: 0.1em;
  margin-bottom: 48px;
  color: var(--color-text);
}
```

- [ ] **Step 7: Replace src/App.jsx with placeholder**

```jsx
import './index.css'

export default function App() {
  return <div style={{ color: 'white', padding: '2rem' }}>Spark of Sanity — coming soon</div>
}
```

- [ ] **Step 8: Replace src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 9: Replace index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Spark of Sanity — rock band from Aalst, Netherlands" />
    <title>Spark of Sanity</title>
    <link rel="icon" type="image/png" href="/assets/logo/logo-white.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 10: Create public/CNAME**

```
sparkofsanity.nl
```

- [ ] **Step 11: Copy assets**

```bash
mkdir -p public/assets/images public/assets/audio public/assets/logo

# Logo
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/SOS-logo-def-white-1.png" public/assets/logo/logo-white.png
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/SOS-logo-def.png" public/assets/logo/logo-dark.png

# Hero images
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/180324-Spark-of-Sanity-013.jpg" public/assets/images/hero-desktop.jpg
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/12/collage-mobile.png" public/assets/images/hero-mobile.png

# EP covers
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/Spark-of-Sanity-EP-CD-cover.jpg" public/assets/images/ep1-cover.jpg
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/12/SoS-collage.jpg" public/assets/images/ep2-cover.jpg

# Band member portraits
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/lau.png" public/assets/images/member-laurens.png
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/bjorn.png" public/assets/images/member-bjorn.png
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/robin.png" public/assets/images/member-robin.png
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/nick.png" public/assets/images/member-nick.png

# Audio — EP 2018
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/Storm.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/Sweet-or-Salty.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/Not-Me.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/Starts-Again.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2018/09/Breaking-Out.mp3" public/assets/audio/

# Audio — EP 2020
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/Make-Up-Your-Mind.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/Willow-Tree.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/Short-Life.mp3" public/assets/audio/
cp "Resources/SOS-website-backup-may-2026/wp-content/uploads/2020/11/Lies-For-A-Living.mp3" public/assets/audio/
```

- [ ] **Step 12: Verify dev server**

```bash
npm run dev
```
Expected: `http://localhost:5173` shows "Spark of Sanity — coming soon" in white on black.

- [ ] **Step 13: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Vite + React project with assets and global styles"
```

---

### Task 2: Data Layer

**Files:**
- Create: `src/data/tracks.js`
- Create: `src/data/videos.js`
- Create: `src/data/members.js`
- Create: `src/data/tracks.test.js`
- Create: `src/data/videos.test.js`

**Interfaces:**
- Produces:
  - `releases` — `Array<{ id: string, year: number, cover: string, tracks: Array<{ id: number, title: string, src: string }> }>`
  - `allTracks` — flat array of all tracks across both releases
  - `videos` — `Array<{ id: number, youtubeId: string, title: string }>`
  - `members` — `Array<{ id: number, name: string, instrument: string, photo: string }>`

- [ ] **Step 1: Fetch YouTube video titles (run once)**

```bash
node -e "
const ids = ['3rSNOEppy4c','uOC8LXM3meU','Yjxwq236odA','sGDxHS2_E8k','5tGpckMQXdI','PeWjmUttpbs','KcwVboxKe7c','eBDR_cmMeyw','zvfJaD9N0Nw','HlgDHXbx2DQ','Cl0peiNm4zU'];
(async () => {
  for (const id of ids) {
    const r = await fetch(\`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=\${id}&format=json\`);
    const d = await r.json();
    console.log(\`{ id: 0, youtubeId: '\${id}', title: '\${d.title.replace(/'/g, \"\\\\'\"}' },\`);
  }
})()
"
```

Copy the output — you'll use the titles in Step 3.

- [ ] **Step 2: Create src/data/tracks.js**

```js
export const releases = [
  {
    id: 'ep1',
    year: 2018,
    cover: '/assets/images/ep1-cover.jpg',
    tracks: [
      { id: 1, title: 'Storm', src: '/assets/audio/Storm.mp3' },
      { id: 2, title: 'Sweet or Salty', src: '/assets/audio/Sweet-or-Salty.mp3' },
      { id: 3, title: 'Not Me', src: '/assets/audio/Not-Me.mp3' },
      { id: 4, title: 'Starts Again', src: '/assets/audio/Starts-Again.mp3' },
      { id: 5, title: 'Breaking Out', src: '/assets/audio/Breaking-Out.mp3' },
    ],
  },
  {
    id: 'ep2',
    year: 2020,
    cover: '/assets/images/ep2-cover.jpg',
    tracks: [
      { id: 6, title: 'Make Up Your Mind', src: '/assets/audio/Make-Up-Your-Mind.mp3' },
      { id: 7, title: 'Willow Tree', src: '/assets/audio/Willow-Tree.mp3' },
      { id: 8, title: 'Short Life', src: '/assets/audio/Short-Life.mp3' },
      { id: 9, title: 'Lies For A Living', src: '/assets/audio/Lies-For-A-Living.mp3' },
    ],
  },
]

export const allTracks = releases.flatMap(r => r.tracks)
```

- [ ] **Step 3: Create src/data/videos.js**

Replace each `title` with the actual title from Step 1's output. Set `id` sequentially starting at 1:
```js
export const videos = [
  { id: 1, youtubeId: '3rSNOEppy4c', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 2, youtubeId: 'uOC8LXM3meU', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 3, youtubeId: 'Yjxwq236odA', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 4, youtubeId: 'sGDxHS2_E8k', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 5, youtubeId: '5tGpckMQXdI', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 6, youtubeId: 'PeWjmUttpbs', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 7, youtubeId: 'KcwVboxKe7c', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 8, youtubeId: 'eBDR_cmMeyw', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 9, youtubeId: 'zvfJaD9N0Nw', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 10, youtubeId: 'HlgDHXbx2DQ', title: 'REPLACE WITH TITLE FROM STEP 1' },
  { id: 11, youtubeId: 'Cl0peiNm4zU', title: 'REPLACE WITH TITLE FROM STEP 1' },
]
```

- [ ] **Step 4: Create src/data/members.js**

```js
export const members = [
  { id: 1, name: 'Laurens', instrument: 'Vocals & Guitar', photo: '/assets/images/member-laurens.png' },
  { id: 2, name: 'Bjorn',   instrument: 'Bass Guitar',     photo: '/assets/images/member-bjorn.png' },
  { id: 3, name: 'Robin',   instrument: 'Guitar',          photo: '/assets/images/member-robin.png' },
  { id: 4, name: 'Nick',    instrument: 'Drums',           photo: '/assets/images/member-nick.png' },
]
```

- [ ] **Step 5: Write tests for tracks data**

Create `src/data/tracks.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { releases, allTracks } from './tracks'

describe('tracks data', () => {
  it('has two releases', () => {
    expect(releases).toHaveLength(2)
  })

  it('each release has id, year, cover, and tracks', () => {
    for (const release of releases) {
      expect(release).toHaveProperty('id')
      expect(release).toHaveProperty('year')
      expect(release).toHaveProperty('cover')
      expect(release.tracks.length).toBeGreaterThan(0)
    }
  })

  it('each track has id, title, and src pointing to audio dir', () => {
    for (const track of allTracks) {
      expect(track).toHaveProperty('id')
      expect(track).toHaveProperty('title')
      expect(track.src).toMatch(/^\/assets\/audio\//)
    }
  })

  it('allTracks has 9 tracks', () => {
    expect(allTracks).toHaveLength(9)
  })

  it('track ids are unique', () => {
    const ids = allTracks.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Step 6: Write tests for videos data**

Create `src/data/videos.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { videos } from './videos'

describe('videos data', () => {
  it('has 11 videos', () => {
    expect(videos).toHaveLength(11)
  })

  it('each video has id, valid youtubeId, and non-empty title', () => {
    for (const video of videos) {
      expect(video).toHaveProperty('id')
      expect(video.youtubeId).toMatch(/^[a-zA-Z0-9_-]{11}$/)
      expect(video.title.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 7: Run tests**

```bash
npm test
```
Expected: 7 tests pass. If video title test fails, you haven't replaced the placeholder titles in Step 3 yet — do that first.

- [ ] **Step 8: Commit**

```bash
git add src/data/
git commit -m "feat: add tracks, videos, and members data"
```

---

### Task 3: Audio Player Context

**Files:**
- Create: `src/context/PlayerContext.jsx`
- Create: `src/context/PlayerContext.test.jsx`

**Interfaces:**
- Produces:
  - `PlayerProvider` — wraps app, creates single `Audio` instance
  - `usePlayer()` — returns `{ currentTrack: Track|null, isPlaying: bool, currentTime: number, duration: number, play(track: Track, playlist: Track[]): void, pause(): void, resume(): void, seek(time: number): void, next(): void, prev(): void }`
  - `Track` type: `{ id: number, title: string, src: string }`

- [ ] **Step 1: Write failing tests**

Create `src/context/PlayerContext.test.jsx`:
```jsx
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { PlayerProvider, usePlayer } from './PlayerContext'

const wrapper = ({ children }) => <PlayerProvider>{children}</PlayerProvider>

const track1 = { id: 1, title: 'Storm', src: '/assets/audio/Storm.mp3' }
const track2 = { id: 2, title: 'Sweet or Salty', src: '/assets/audio/Sweet-or-Salty.mp3' }
const playlist = [track1, track2]

describe('PlayerContext', () => {
  beforeEach(() => vi.clearAllMocks())

  it('starts with no track and not playing', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    expect(result.current.currentTrack).toBeNull()
    expect(result.current.isPlaying).toBe(false)
  })

  it('play() sets currentTrack and isPlaying true', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    expect(result.current.currentTrack).toEqual(track1)
    expect(result.current.isPlaying).toBe(true)
  })

  it('pause() sets isPlaying false', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.pause())
    expect(result.current.isPlaying).toBe(false)
  })

  it('resume() sets isPlaying true', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.pause())
    act(() => result.current.resume())
    expect(result.current.isPlaying).toBe(true)
  })

  it('next() advances to next track in playlist', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.next())
    expect(result.current.currentTrack).toEqual(track2)
  })

  it('prev() goes to previous track', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track2, playlist))
    act(() => result.current.prev())
    expect(result.current.currentTrack).toEqual(track1)
  })

  it('next() wraps to first track at end of playlist', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track2, playlist))
    act(() => result.current.next())
    expect(result.current.currentTrack).toEqual(track1)
  })

  it('prev() wraps to last track at start of playlist', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.prev())
    expect(result.current.currentTrack).toEqual(track2)
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/context/PlayerContext.test.jsx
```
Expected: FAIL — "Cannot find module './PlayerContext'".

- [ ] **Step 3: Create src/context/PlayerContext.jsx**

```jsx
import { createContext, useContext, useRef, useState, useCallback } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const playlistRef = useRef([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const play = useCallback((track, playlist = []) => {
    const audio = audioRef.current
    playlistRef.current = playlist.length ? playlist : [track]

    if (audio.src !== track.src) {
      audio.src = track.src
      audio.load()
    }

    audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
    audio.ondurationchange = () => setDuration(audio.duration || 0)
    audio.onended = () => {
      const list = playlistRef.current
      const idx = list.findIndex(t => t.id === track.id)
      const next = list[(idx + 1) % list.length]
      play(next, list)
    }

    audio.play().catch(() => {})
    setCurrentTrack(track)
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const resume = useCallback(() => {
    audioRef.current.play().catch(() => {})
    setIsPlaying(true)
  }, [])

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const next = useCallback(() => {
    const list = playlistRef.current
    if (!list.length) return
    setCurrentTrack(prev => {
      const idx = list.findIndex(t => t.id === prev?.id)
      const nextTrack = list[(idx + 1) % list.length]
      play(nextTrack, list)
      return nextTrack
    })
  }, [play])

  const prev = useCallback(() => {
    const list = playlistRef.current
    if (!list.length) return
    setCurrentTrack(prev => {
      const idx = list.findIndex(t => t.id === prev?.id)
      const prevTrack = list[(idx - 1 + list.length) % list.length]
      play(prevTrack, list)
      return prevTrack
    })
  }, [play])

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, currentTime, duration, play, pause, resume, seek, next, prev }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test src/context/PlayerContext.test.jsx
```
Expected: 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/context/
git commit -m "feat: add audio PlayerContext with play/pause/next/prev"
```

---

### Task 4: Navbar

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Navbar.css`
- Create: `src/components/Navbar.test.jsx`

**Interfaces:**
- Produces: `<Navbar />` — fixed top header, transparent on hero, `#141414` with blur on scroll, mobile hamburger

- [ ] **Step 1: Write failing tests**

Create `src/components/Navbar.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders logo image', () => {
    render(<Navbar />)
    expect(screen.getByAltText('Spark of Sanity')).toBeInTheDocument()
  })

  it('renders all four nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Videos')).toBeInTheDocument()
    expect(screen.getByText('Gigs')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('mobile menu opens on hamburger click', () => {
    render(<Navbar />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(screen.getByRole('navigation')).toHaveClass('nav--open')
  })

  it('mobile menu closes when nav link clicked', () => {
    render(<Navbar />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByText('Music'))
    expect(screen.getByRole('navigation')).not.toHaveClass('nav--open')
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/Navbar.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/Navbar.jsx**

```jsx
import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Music', href: '#music' },
  { label: 'Videos', href: '#videos' },
  { label: 'Gigs', href: '#gigs' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#top" className="navbar__logo" onClick={close}>
        <img src="/assets/logo/logo-white.png" alt="Spark of Sanity" height="40" />
      </a>
      <nav role="navigation" className={`navbar__nav ${open ? 'nav--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a key={link.label} href={link.href} className="navbar__link" onClick={close}>
            {link.label}
          </a>
        ))}
      </nav>
      <button
        className="navbar__hamburger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </header>
  )
}
```

- [ ] **Step 4: Create src/components/Navbar.css**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.navbar--scrolled {
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(8px);
}

.navbar__logo img {
  height: 40px;
  width: auto;
}

.navbar__nav {
  display: flex;
  gap: 32px;
}

.navbar__link {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: var(--color-text);
  transition: color 0.2s;
}

.navbar__link:hover {
  color: var(--color-accent);
}

.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
}

@media (max-width: 768px) {
  .navbar__hamburger {
    display: flex;
  }

  .navbar__nav {
    position: fixed;
    inset: 0;
    background: var(--color-surface);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 99;
  }

  .navbar__nav.nav--open {
    opacity: 1;
    pointer-events: all;
  }

  .navbar__link {
    font-size: 2rem;
  }
}
```

- [ ] **Step 5: Run tests**

```bash
npm test src/components/Navbar.test.jsx
```
Expected: 4 tests pass.

- [ ] **Step 6: Wire into App.jsx temporarily and verify visually**

Update `src/App.jsx`:
```jsx
import './index.css'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ color: 'white', padding: '8rem 2rem', minHeight: '200vh' }}>Scroll to test navbar</div>
    </>
  )
}
```

Run `npm run dev`. Confirm: navbar is transparent at top, goes solid `#141414` on scroll. On narrow window, hamburger appears and opens full-screen menu.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.css src/components/Navbar.test.jsx
git commit -m "feat: add sticky Navbar with scroll state and mobile hamburger"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/Hero.css`
- Create: `src/components/Hero.test.jsx`

**Interfaces:**
- Produces: `<Hero />` — full-viewport section with dark photo background, logo, heading, gold CTA

- [ ] **Step 1: Write failing tests**

Create `src/components/Hero.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders band name heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: /spark of sanity/i })).toBeInTheDocument()
  })

  it('renders Listen Now CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /listen now/i })).toBeInTheDocument()
  })

  it('CTA links to #music', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /listen now/i })).toHaveAttribute('href', '#music')
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/Hero.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/Hero.jsx**

```jsx
import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <img src="/assets/logo/logo-white.png" alt="Spark of Sanity logo" className="hero__logo" />
        <h1 className="hero__title">Spark of Sanity</h1>
        <a href="#music" className="hero__cta">Listen Now</a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create src/components/Hero.css**

```css
.hero {
  position: relative;
  height: 100vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/assets/images/hero-desktop.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero {
    background-image: url('/assets/images/hero-mobile.png');
  }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%);
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.hero__logo {
  width: clamp(180px, 40vw, 380px);
  height: auto;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 8vw, 6rem);
  letter-spacing: 0.15em;
  color: var(--color-text);
  text-shadow: 0 2px 20px rgba(0,0,0,0.8);
}

.hero__cta {
  display: inline-block;
  padding: 14px 40px;
  background: var(--color-accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  letter-spacing: 0.15em;
  transition: background 0.2s, transform 0.2s;
}

.hero__cta:hover {
  background: #ffd700;
  transform: translateY(-2px);
}
```

- [ ] **Step 5: Run tests**

```bash
npm test src/components/Hero.test.jsx
```
Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css src/components/Hero.test.jsx
git commit -m "feat: add Hero section with full-viewport photo and gold CTA"
```

---

### Task 6: Music Section

**Files:**
- Create: `src/components/Music.jsx`
- Create: `src/components/Music.css`
- Create: `src/components/Music.test.jsx`

**Interfaces:**
- Consumes: `releases`, `allTracks` from `src/data/tracks.js`; `usePlayer()` from `src/context/PlayerContext.jsx`
- Produces: `<Music ref={ref} />` — two EP cards with cover art and tracklists; clicking a track calls `play(track, epTracks)`

- [ ] **Step 1: Write failing tests**

Create `src/components/Music.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Music from './Music'
import { PlayerProvider } from '../context/PlayerContext'

const wrapper = ({ children }) => <PlayerProvider>{children}</PlayerProvider>

describe('Music', () => {
  it('renders EP years', () => {
    render(<Music />, { wrapper })
    expect(screen.getByText('2018')).toBeInTheDocument()
    expect(screen.getByText('2020')).toBeInTheDocument()
  })

  it('renders all 9 track titles', () => {
    render(<Music />, { wrapper })
    expect(screen.getByText('Storm')).toBeInTheDocument()
    expect(screen.getByText('Willow Tree')).toBeInTheDocument()
    expect(screen.getByText('Lies For A Living')).toBeInTheDocument()
  })

  it('clicking a track adds track--active class to its list item', () => {
    render(<Music />, { wrapper })
    fireEvent.click(screen.getByText('Storm'))
    expect(screen.getByText('Storm').closest('li')).toHaveClass('track--active')
  })

  it('other tracks are not active after clicking Storm', () => {
    render(<Music />, { wrapper })
    fireEvent.click(screen.getByText('Storm'))
    expect(screen.getByText('Willow Tree').closest('li')).not.toHaveClass('track--active')
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/Music.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/Music.jsx**

In React 19, `ref` can be passed as a regular prop without `forwardRef`:
```jsx
import { releases } from '../data/tracks'
import { usePlayer } from '../context/PlayerContext'
import './Music.css'

export default function Music({ ref }) {
  const { currentTrack, isPlaying, play, pause, resume } = usePlayer()

  const handleClick = (track, epTracks) => {
    if (currentTrack?.id === track.id) {
      isPlaying ? pause() : resume()
    } else {
      play(track, epTracks)
    }
  }

  return (
    <div className="section-wrapper" ref={ref}>
      <section id="music">
        <h2 className="section-heading">Music</h2>
        <div className="music__releases">
          {releases.map(release => (
            <div key={release.id} className="music__ep">
              <div className="music__ep-cover">
                <img src={release.cover} alt={`${release.year} EP cover`} />
              </div>
              <div className="music__ep-info">
                <span className="music__ep-year">{release.year}</span>
                <ul className="music__tracklist">
                  {release.tracks.map((track, i) => {
                    const isActive = currentTrack?.id === track.id
                    return (
                      <li
                        key={track.id}
                        className={`music__track ${isActive ? 'track--active' : ''}`}
                      >
                        <button
                          className="music__track-btn"
                          onClick={() => handleClick(track, release.tracks)}
                          aria-pressed={isActive}
                        >
                          <span className="music__track-num">{i + 1}</span>
                          <span className="music__track-title">{track.title}</span>
                          <span className="music__track-icon">
                            {isActive && isPlaying ? '⏸' : '▶'}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/Music.css**

```css
.music__releases {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

@media (max-width: 768px) {
  .music__releases {
    grid-template-columns: 1fr;
  }
}

.music__ep {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.music__ep-cover img {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  transition: transform 0.3s ease;
}

.music__ep-cover img:hover {
  transform: scale(1.02);
}

.music__ep-year {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  display: block;
  margin-bottom: 12px;
}

.music__tracklist {
  list-style: none;
}

.music__track {
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.music__track.track--active {
  background: rgba(245,197,24,0.08);
  border-color: rgba(245,197,24,0.2);
}

.music__track-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  cursor: pointer;
  color: var(--color-text);
  transition: color 0.2s;
}

.music__track-btn:hover {
  color: var(--color-accent);
}

.track--active .music__track-btn {
  color: var(--color-accent);
}

.music__track-num {
  font-size: 0.85rem;
  color: var(--color-muted);
  width: 20px;
  text-align: right;
  flex-shrink: 0;
}

.music__track-title {
  flex: 1;
  text-align: left;
}

.music__track-icon {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.track--active .music__track-icon {
  color: var(--color-accent);
}
```

- [ ] **Step 5: Run tests**

```bash
npm test src/components/Music.test.jsx
```
Expected: 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/Music.jsx src/components/Music.css src/components/Music.test.jsx
git commit -m "feat: add Music section with EP cards and interactive tracklist"
```

---

### Task 7: MiniPlayer

**Files:**
- Create: `src/components/MiniPlayer.jsx`
- Create: `src/components/MiniPlayer.css`
- Create: `src/components/MiniPlayer.test.jsx`

**Interfaces:**
- Consumes: `usePlayer()` from `src/context/PlayerContext.jsx`; `visible: bool` prop
- Produces: `<MiniPlayer visible={bool} />` — fixed bottom bar, slides in/out with `transform: translateY`, shows current track + controls + progress

- [ ] **Step 1: Write failing tests**

Create `src/components/MiniPlayer.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MiniPlayer from './MiniPlayer'
import { PlayerProvider, usePlayer } from '../context/PlayerContext'

function Harness({ visible }) {
  const { play } = usePlayer()
  return (
    <>
      <button onClick={() => play({ id: 1, title: 'Storm', src: '/a.mp3' }, [{ id: 1, title: 'Storm', src: '/a.mp3' }])}>
        Load
      </button>
      <MiniPlayer visible={visible} />
    </>
  )
}

const wrap = (visible) => {
  render(<PlayerProvider><Harness visible={visible} /></PlayerProvider>)
}

describe('MiniPlayer', () => {
  it('has hidden class when visible=false', () => {
    wrap(false)
    expect(screen.getByTestId('mini-player')).toHaveClass('mini-player--hidden')
  })

  it('does not have hidden class when visible=true', () => {
    wrap(true)
    expect(screen.getByTestId('mini-player')).not.toHaveClass('mini-player--hidden')
  })

  it('shows track title after play()', () => {
    wrap(true)
    fireEvent.click(screen.getByText('Load'))
    expect(screen.getByText('Storm')).toBeInTheDocument()
  })

  it('pause button switches to play button', () => {
    wrap(true)
    fireEvent.click(screen.getByText('Load'))
    fireEvent.click(screen.getByLabelText('Pause'))
    expect(screen.getByLabelText('Play')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/MiniPlayer.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/MiniPlayer.jsx**

```jsx
import { usePlayer } from '../context/PlayerContext'
import './MiniPlayer.css'

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function MiniPlayer({ visible }) {
  const { currentTrack, isPlaying, currentTime, duration, pause, resume, seek, next, prev } = usePlayer()

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={`mini-player ${!visible ? 'mini-player--hidden' : ''}`}
      data-testid="mini-player"
    >
      <div className="mini-player__info">
        {currentTrack
          ? <span className="mini-player__title">{currentTrack.title}</span>
          : <span className="mini-player__empty">—</span>
        }
      </div>

      <div className="mini-player__controls">
        <button className="mini-player__btn" onClick={prev} aria-label="Previous">⏮</button>
        <button
          className="mini-player__btn mini-player__play"
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="mini-player__btn" onClick={next} aria-label="Next">⏭</button>
      </div>

      <div className="mini-player__progress-area">
        <span className="mini-player__time">{formatTime(currentTime)}</span>
        <div
          className="mini-player__bar"
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            seek(((e.clientX - rect.left) / rect.width) * duration)
          }}
        >
          <div className="mini-player__fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="mini-player__time">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/MiniPlayer.css**

```css
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 64px;
  background: var(--color-surface);
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 24px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.mini-player--hidden {
  transform: translateY(100%);
}

.mini-player__info {
  flex: 1;
  min-width: 0;
}

.mini-player__title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-player__empty {
  color: var(--color-muted);
}

.mini-player__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mini-player__btn {
  color: var(--color-text);
  font-size: 1.1rem;
  transition: color 0.2s;
}

.mini-player__btn:hover {
  color: var(--color-accent);
}

.mini-player__play {
  font-size: 1.4rem;
  color: var(--color-accent);
}

.mini-player__progress-area {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.mini-player__time {
  font-size: 0.75rem;
  color: var(--color-muted);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.mini-player__bar {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  cursor: pointer;
}

.mini-player__fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
  pointer-events: none;
}

@media (max-width: 600px) {
  .mini-player__progress-area {
    display: none;
  }
}
```

- [ ] **Step 5: Run tests**

```bash
npm test src/components/MiniPlayer.test.jsx
```
Expected: 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/MiniPlayer.jsx src/components/MiniPlayer.css src/components/MiniPlayer.test.jsx
git commit -m "feat: add persistent MiniPlayer with controls and progress bar"
```

---

### Task 8: Videos Section + Lightbox

**Files:**
- Create: `src/components/Videos.jsx`
- Create: `src/components/Videos.css`
- Create: `src/components/VideoLightbox.jsx`
- Create: `src/components/VideoLightbox.css`
- Create: `src/components/Videos.test.jsx`

**Interfaces:**
- Consumes: `videos` from `src/data/videos.js`
- Produces:
  - `<Videos />` — 3-col grid of YouTube thumbnail buttons
  - `<VideoLightbox video={video} onClose={fn} />` — full-screen overlay with autoplay iframe; Escape closes it

- [ ] **Step 1: Write failing tests**

Create `src/components/Videos.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Videos from './Videos'

describe('Videos', () => {
  it('renders 11 video buttons', () => {
    render(<Videos />)
    expect(screen.getAllByRole('button')).toHaveLength(11)
  })

  it('clicking a video opens the lightbox', () => {
    render(<Videos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByTestId('video-lightbox')).toBeInTheDocument()
  })

  it('close button removes the lightbox', () => {
    render(<Videos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByLabelText('Close video'))
    expect(screen.queryByTestId('video-lightbox')).not.toBeInTheDocument()
  })

  it('Escape key removes the lightbox', () => {
    render(<Videos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('video-lightbox')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/Videos.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/VideoLightbox.jsx**

```jsx
import { useEffect } from 'react'
import './VideoLightbox.css'

export default function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="lightbox"
      data-testid="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lightbox__inner">
        <button className="lightbox__close" onClick={onClose} aria-label="Close video">✕</button>
        <div className="lightbox__frame">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>
        <p className="lightbox__title">{video.title}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/VideoLightbox.css**

```css
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0,0,0,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.lightbox__inner {
  position: relative;
  width: 100%;
  max-width: 900px;
}

.lightbox__close {
  position: absolute;
  top: -40px;
  right: 0;
  color: var(--color-text);
  font-size: 1.4rem;
  transition: color 0.2s;
}

.lightbox__close:hover {
  color: var(--color-accent);
}

.lightbox__frame {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
}

.lightbox__frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.lightbox__title {
  margin-top: 12px;
  font-size: 0.875rem;
  color: var(--color-muted);
  text-align: center;
}
```

- [ ] **Step 5: Create src/components/Videos.jsx**

```jsx
import { useState } from 'react'
import { videos } from '../data/videos'
import VideoLightbox from './VideoLightbox'
import './Videos.css'

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <div className="section-wrapper section-wrapper--alt">
      <section id="videos">
        <h2 className="section-heading">Videos</h2>
        <div className="videos__grid">
          {videos.map(video => (
            <button
              key={video.id}
              className="videos__item"
              onClick={() => setActiveVideo(video)}
              aria-label={`Play ${video.title}`}
            >
              <div className="videos__thumb">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                />
                <div className="videos__play">▶</div>
              </div>
              <p className="videos__title">{video.title}</p>
            </button>
          ))}
        </div>
        {activeVideo && (
          <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </section>
    </div>
  )
}
```

- [ ] **Step 6: Create src/components/Videos.css**

```css
.videos__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .videos__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 500px) {
  .videos__grid { grid-template-columns: 1fr; }
}

.videos__item {
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
}

.videos__thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-surface);
}

.videos__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.videos__item:hover .videos__thumb img {
  transform: scale(1.04);
  filter: brightness(0.6);
}

.videos__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--color-accent);
  opacity: 0;
  transition: opacity 0.2s;
}

.videos__item:hover .videos__play {
  opacity: 1;
}

.videos__title {
  margin-top: 8px;
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.4;
}
```

- [ ] **Step 7: Run tests**

```bash
npm test src/components/Videos.test.jsx
```
Expected: 4 tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/Videos.jsx src/components/Videos.css src/components/VideoLightbox.jsx src/components/VideoLightbox.css src/components/Videos.test.jsx
git commit -m "feat: add Videos grid with YouTube lightbox"
```

---

### Task 9: Gigs Section

**Files:**
- Create: `src/components/Gigs.jsx`
- Create: `src/components/Gigs.css`

**Interfaces:**
- Produces: `<Gigs />` — Bandsintown widget loaded via dynamic script injection

(No unit test — widget is entirely third-party. Verify manually in browser.)

- [ ] **Step 1: Create src/components/Gigs.jsx**

```jsx
import { useEffect } from 'react'
import './Gigs.css'

export default function Gigs() {
  useEffect(() => {
    if (document.querySelector('script[src*="bandsintown"]')) return
    const script = document.createElement('script')
    script.src = 'https://widget.bandsintown.com/main.min.js'
    script.charset = 'utf-8'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="section-wrapper">
      <section id="gigs">
        <h2 className="section-heading">Gigs</h2>
        <div className="bit-widget-container">
          <a
            className="bit-widget-initializer"
            data-artist-name="Spark of Sanity"
            data-display-local-dates="false"
            data-display-past-dates="true"
            data-auto-style="false"
            data-text-color="#FFFFFF"
            data-link-color="#f5c518"
            data-popup-background-color="#111111"
            data-background-color="transparent"
            data-display-limit="15"
            data-link-text-color="#FFFFFF"
            data-display-lineup="false"
            data-separator-color="rgba(255,255,255,0.15)"
            data-display-track-button="false"
          />
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/Gigs.css**

```css
.bit-widget-container {
  max-width: 860px;
  margin: 0 auto;
}
```

- [ ] **Step 3: Verify manually**

```bash
npm run dev
```
Navigate to `#gigs`. Bandsintown widget should load and show gig history for "Spark of Sanity".

- [ ] **Step 4: Commit**

```bash
git add src/components/Gigs.jsx src/components/Gigs.css
git commit -m "feat: add Gigs section with Bandsintown widget"
```

---

### Task 10: About Section

**Files:**
- Create: `src/components/About.jsx`
- Create: `src/components/About.css`
- Create: `src/components/About.test.jsx`

**Interfaces:**
- Consumes: `members` from `src/data/members.js`
- Produces: `<About />` — band bio paragraph + 4 member cards with grayscale-to-color hover

- [ ] **Step 1: Write failing tests**

Create `src/components/About.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('renders all 4 member names', () => {
    render(<About />)
    expect(screen.getByText('Laurens')).toBeInTheDocument()
    expect(screen.getByText('Bjorn')).toBeInTheDocument()
    expect(screen.getByText('Robin')).toBeInTheDocument()
    expect(screen.getByText('Nick')).toBeInTheDocument()
  })

  it('renders member instruments', () => {
    render(<About />)
    expect(screen.getByText('Vocals & Guitar')).toBeInTheDocument()
    expect(screen.getByText('Drums')).toBeInTheDocument()
  })

  it('renders band bio text', () => {
    render(<About />)
    expect(screen.getByText(/rock band/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/About.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/About.jsx**

```jsx
import { members } from '../data/members'
import './About.css'

const BIO = `Spark of Sanity is a rock band from Aalst, Netherlands. We play a mix of original songs and covers from bands we love — Kaleo, Highly Suspect, Arctic Monkeys and many others. Our sound spans everything from slow burners to high-energy rock, with a focus on honest songs and loud guitars.`

export default function About() {
  return (
    <div className="section-wrapper section-wrapper--alt">
      <section id="about">
        <h2 className="section-heading">About</h2>
        <p className="about__bio">{BIO}</p>
        <div className="about__members">
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
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/About.css**

```css
.about__bio {
  max-width: 680px;
  margin-bottom: 56px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.85);
}

.about__members {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

@media (max-width: 900px) {
  .about__members { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .about__members { grid-template-columns: 1fr; }
}

.about__member {
  text-align: center;
}

.about__photo {
  aspect-ratio: 1;
  overflow: hidden;
  margin-bottom: 16px;
}

.about__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.about__member:hover .about__photo img {
  filter: grayscale(0%);
}

.about__name {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}

.about__instrument {
  font-size: 0.875rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

- [ ] **Step 5: Run tests**

```bash
npm test src/components/About.test.jsx
```
Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/About.jsx src/components/About.css src/components/About.test.jsx
git commit -m "feat: add About section with band bio and member cards"
```

---

### Task 11: Footer

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.css`
- Create: `src/components/Footer.test.jsx`

**Interfaces:**
- Produces: `<Footer />` — logo, social icon links, copyright line

- [ ] **Step 1: Write failing tests**

Create `src/components/Footer.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders logo', () => {
    render(<Footer />)
    expect(screen.getByAltText('Spark of Sanity')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Spotify')).toBeInTheDocument()
    expect(screen.getByLabelText('Apple Music')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© Spark of Sanity/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify fail**

```bash
npm test src/components/Footer.test.jsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Create src/components/Footer.jsx**

Update the `href` values with the band's actual social profile URLs before shipping:
```jsx
import './Footer.css'

const SOCIALS = [
  { label: 'Spotify',     href: 'https://open.spotify.com/artist/sparkofsanity',   icon: '♪' },
  { label: 'Apple Music', href: 'https://music.apple.com/artist/sparkofsanity',     icon: '♫' },
  { label: 'Instagram',   href: 'https://www.instagram.com/sparkofsanity',          icon: '◎' },
  { label: 'Facebook',    href: 'https://www.facebook.com/sparkofsanity',           icon: '𝑓' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <a href="#top" className="footer__logo-link">
        <img src="/assets/logo/logo-white.png" alt="Spark of Sanity" className="footer__logo" />
      </a>
      <nav className="footer__socials" aria-label="Social media links">
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.href}
            className="footer__social"
            aria-label={s.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.icon}
          </a>
        ))}
      </nav>
      <p className="footer__copy">© Spark of Sanity</p>
    </footer>
  )
}
```

- [ ] **Step 4: Create src/components/Footer.css**

```css
.footer {
  background: var(--color-surface);
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 48px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.footer__logo {
  height: 48px;
  width: auto;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.footer__logo-link:hover .footer__logo {
  opacity: 1;
}

.footer__socials {
  display: flex;
  gap: 28px;
  align-items: center;
}

.footer__social {
  font-size: 1.5rem;
  color: var(--color-muted);
  transition: color 0.2s;
}

.footer__social:hover {
  color: var(--color-accent);
}

.footer__copy {
  font-size: 0.8rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}
```

- [ ] **Step 5: Run tests**

```bash
npm test src/components/Footer.test.jsx
```
Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.css src/components/Footer.test.jsx
git commit -m "feat: add Footer with social links and copyright"
```

---

### Task 12: App Assembly

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: all components, `PlayerProvider`
- Produces: complete single-page website — all sections wired, MiniPlayer visibility driven by IntersectionObserver on Music section

- [ ] **Step 1: Replace src/App.jsx**

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
        <Music ref={musicRef} />
        <Videos />
        <Gigs />
        <About />
      </main>
      <Footer />
      <MiniPlayer visible={showMiniPlayer} />
    </PlayerProvider>
  )
}
```

- [ ] **Step 2: Run all tests**

```bash
npm test
```
Expected: ~30 tests all pass (data layer + PlayerContext + all component tests).

- [ ] **Step 3: Manual verification checklist**

```bash
npm run dev
```

Check each item:
- [ ] Navbar transparent on Hero, solid dark after scrolling 80px, mobile hamburger opens/closes overlay menu
- [ ] Hero: full-viewport dark photo, logo centered, "Listen Now" button smooth-scrolls to Music
- [ ] Music: two EP cards side by side, clicking a track plays audio and highlights it gold, clicking again pauses
- [ ] MiniPlayer: appears at bottom after scrolling past Music section, play/pause/prev/next work, progress bar fills and is clickable
- [ ] Videos: 11 thumbnails in 3-col grid, hover shows gold play icon, click opens lightbox with autoplay YouTube, Escape closes, click outside closes
- [ ] Gigs: Bandsintown widget loads gig list for "Spark of Sanity"
- [ ] About: 4 member cards in a row, photo goes from grayscale to color on hover, bio text present
- [ ] Footer: logo, 4 social links, copyright

- [ ] **Step 4: Verify production build**

```bash
npm run build && npm run preview
```
Open `http://localhost:4173`. Confirm: no console errors, all assets load, site looks identical to dev.

- [ ] **Step 5: Update actual social URLs in Footer.jsx**

Replace the placeholder `href` values in `src/components/Footer.jsx` with the band's real profile URLs for Spotify, Apple Music, Instagram, and Facebook.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/components/Footer.jsx
git commit -m "feat: assemble complete single-page website"
```

---

### Task 13: GitHub Actions Deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: automatic deploy to `gh-pages` branch on every push to `main`

- [ ] **Step 1: Create deploy workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm test

      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: sparkofsanity.nl
```

- [ ] **Step 2: Confirm public/CNAME exists**

```bash
cat public/CNAME
```
Expected output: `sparkofsanity.nl`

- [ ] **Step 3: Push to GitHub and watch deploy**

```bash
git add .github/
git commit -m "feat: add GitHub Actions deploy to gh-pages"
git push origin main
```

Go to the GitHub repo → Actions tab. "Deploy to GitHub Pages" workflow runs. After success, go to Settings → Pages → confirm source is `gh-pages` branch.

- [ ] **Step 4: Configure GitHub Pages (if not automatic)**

In GitHub repo Settings → Pages:
- Source: "Deploy from a branch"
- Branch: `gh-pages`, folder: `/ (root)`
- Custom domain: `sparkofsanity.nl`

GitHub will provision an HTTPS certificate via Let's Encrypt automatically once DNS resolves.

- [ ] **Step 5: Verify DNS points to GitHub Pages**

Confirm `sparkofsanity.nl` has A records pointing to:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
Or a CNAME for `www` pointing to `<your-github-username>.github.io`. DNS changes can take up to 48 hours to propagate.

---

## Post-Deploy Checklist

- [ ] `https://sparkofsanity.nl` loads the site with HTTPS
- [ ] Update Footer social `href` values to actual band profile URLs
- [ ] Fill video titles in `src/data/videos.js` (run oEmbed script from Task 2 Step 1)
- [ ] Test on iOS Safari and Android Chrome (audio requires user gesture — clicking a track counts)
- [ ] Confirm Bandsintown widget shows correct gig history
