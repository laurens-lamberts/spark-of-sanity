# Spark of Sanity — Band Website Design

**Date:** 2026-06-27  
**Stack:** Vite + React, GitHub Pages  
**URL:** sparkofsanity.nl (custom domain via GitHub Pages CNAME)

---

## Overview

Single-page scrolling band website replacing the existing WordPress/Audioman site. Reuses all existing assets and audio files. Modern dark aesthetic with gold accent matching the band logo.

---

## Architecture

```
spark-of-sanity/
├── public/
│   ├── assets/
│   │   ├── images/          # Band photos, hero images, EP covers, member portraits
│   │   ├── audio/           # MP3 tracks (9 total)
│   │   └── logo/            # SOS-logo-def-white-1.png, SOS-logo-def.png
│   └── CNAME                # sparkofsanity.nl
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Music.jsx
│   │   ├── MiniPlayer.jsx
│   │   ├── Videos.jsx
│   │   ├── VideoLightbox.jsx
│   │   ├── Gigs.jsx
│   │   ├── About.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useAudioPlayer.js  # Shared audio state (current track, play/pause, seek)
│   ├── data/
│   │   ├── tracks.js           # Track list with file paths, EP grouping
│   │   └── videos.js           # YouTube video IDs + titles
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # CSS custom properties + global resets
├── .github/
│   └── workflows/
│       └── deploy.yml         # Build + deploy to gh-pages branch
├── vite.config.js
└── package.json
```

---

## Sections

### 1. Navbar

- Fixed top, full-width
- Transparent when hero is in viewport; transitions to `#141414` with subtle blur on scroll
- Left: white logo (`SOS-logo-def-white-1.png`), links to top
- Right: text links — Music · Videos · Gigs · About (smooth-scroll to section anchors)
- Mobile (< 768px): hamburger icon → slide-down menu overlay

### 2. Hero

- Full-viewport (`100vh`) with `object-fit: cover` background image
- Desktop image: `180324-Spark-of-Sanity-013.jpg`
- Mobile image (< 768px): `collage-mobile.png` (via CSS `@media` background swap)
- Dark vignette overlay (`linear-gradient` from transparent to `rgba(0,0,0,0.6)`)
- Centered content: logo + "SPARK OF SANITY" heading (Bebas Neue) + gold "Listen Now" CTA button → smooth-scrolls to `#music`

### 3. Music

Two EP releases, each displayed as a card:

**EP 1 — 2018**
Tracks: Storm, Sweet or Salty, Not Me, Starts Again, Breaking Out
Cover: `Spark-of-Sanity-EP-CD-cover.jpg`

**EP 2 — 2020**
Tracks: Make Up Your Mind, Willow Tree, Short Life, Lies For A Living
Cover: `SoS-collage.jpg`

Layout: two side-by-side cards on desktop, stacked on mobile. Each card has cover art on left, tracklist on right. Clicking a track name sets it as active in the audio player. Active track highlighted in gold.

### 4. MiniPlayer (persistent)

- Fixed bottom bar, appears when user scrolls past the Music section
- Dark background `#141414`, 60px height
- Contents: album art thumbnail (16x16 square) · track title · artist · ◀◀ prev · ▶/⏸ play/pause · ▶▶ next · progress bar (gold fill) · time display
- Audio state managed via `useAudioPlayer` hook (shared with Music section tracklist)
- HTML5 `<audio>` element, no external library needed

### 5. Videos

- Section heading: "VIDEOS"
- Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
- Each item: YouTube thumbnail image (`https://img.youtube.com/vi/{ID}/hqdefault.jpg`), title below, gold play icon overlay on hover
- Clicking opens `VideoLightbox` component: dark overlay, centered `<iframe>` YouTube embed with `?autoplay=1`, close button top-right (×)
- Press Escape to close lightbox
- Keyboard trap inside lightbox for accessibility

**Video list (11 videos):**
| Title | YouTube ID |
|-------|-----------|
| (video 1) | `3rSNOEppy4c` |
| (video 2) | `uOC8LXM3meU` |
| (video 3) | `Yjxwq236odA` |
| (video 4) | `sGDxHS2_E8k` |
| (video 5) | `5tGpckMQXdI` |
| (video 6) | `PeWjmUttpbs` |
| (video 7) | `KcwVboxKe7c` |
| (video 8) | `eBDR_cmMeyw` |
| (video 9) | `zvfJaD9N0Nw` |
| (video 10) | `HlgDHXbx2DQ` |
| (video 11) | `Cl0peiNm4zU` |

Titles fetched manually or left as placeholders in `videos.js` — no YouTube API key required.

### 6. Gigs

- Section heading: "GIGS"
- Bandsintown widget embedded via script tag in `index.html` (loaded once globally)
- React component renders the `.bit-widget-container` div with initialized anchor tag
- Custom colors: text white, link color gold (`#f5c518`), background transparent, popup background `#111111`
- `data-display-past-dates="true"`, limit 15, no lineup, no track button
- If no gigs: widget shows empty state handled by Bandsintown itself

### 7. About

- Section heading: "ABOUT"
- Band bio paragraph:
  > "Spark of Sanity is a rock band from Aalst, Netherlands. We play a mix of original songs and covers from bands we love — Kaleo, Highly Suspect, Arctic Monkeys and many others. Our sound spans everything from slow burners to high-energy rock, with a focus on honest songs and loud guitars."
- 4 member cards in a row (desktop) / 2x2 grid (tablet) / single column (mobile):
  - Photo: grayscale by default, color on hover (CSS `filter: grayscale(100%)` → `grayscale(0%)`)
  - Name in Bebas Neue
  - Instrument in muted text
- Members:
  - Laurens — Vocals & Guitar — `lau.png`
  - Bjorn — Bass Guitar — `bjorn.png`
  - Robin — Guitar — `robin.png`
  - Nick — Drums — `nick.png`
- Photos from `uploads/2020/11/`

### 8. Footer

- Band logo (white version) centered
- Social links row: Spotify · Apple Music · Instagram · Facebook — icon buttons, gold on hover
- Copyright line: `© Spark of Sanity`
- Minimal, dark, no filler

---

## Data

### `src/data/tracks.js`

```js
export const releases = [
  {
    id: 'ep1',
    title: 'Spark of Sanity',
    year: 2018,
    cover: '/assets/images/Spark-of-Sanity-EP-CD-cover.jpg',
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
    title: null,
    year: 2020,
    cover: '/assets/images/SoS-collage.jpg',
    tracks: [
      { id: 6, title: 'Make Up Your Mind', src: '/assets/audio/Make-Up-Your-Mind.mp3' },
      { id: 7, title: 'Willow Tree', src: '/assets/audio/Willow-Tree.mp3' },
      { id: 8, title: 'Short Life', src: '/assets/audio/Short-Life.mp3' },
      { id: 9, title: 'Lies For A Living', src: '/assets/audio/Lies-For-A-Living.mp3' },
    ],
  },
]
```

### `src/hooks/useAudioPlayer.js`

Custom hook managing:
- `currentTrack` (track object or null)
- `isPlaying` (bool)
- `currentTime` / `duration` (numbers)
- `play(track)`, `pause()`, `resume()`, `seek(time)`, `next()`, `prev()`
- Single `Audio` instance held in a `useRef`, replaced when track changes
- Returns all state + actions; shared across Music section and MiniPlayer via React Context

---

## Visual Design

| Token | Value |
|-------|-------|
| `--color-bg` | `#0a0a0a` |
| `--color-surface` | `#141414` |
| `--color-accent` | `#f5c518` |
| `--color-text` | `#ffffff` |
| `--color-muted` | `#888888` |
| `--font-heading` | Bebas Neue (Google Fonts) |
| `--font-body` | Inter (Google Fonts) |

- Section headings: Bebas Neue, large (48–72px), letter-spacing wide, white
- No hard borders between sections; subtle dark gradient transitions
- Member card photos: `filter: grayscale(100%)`, `transition: filter 0.3s ease`; on hover `grayscale(0%)`
- CTA buttons: gold background, black text, no border-radius (sharp corners = rock feel)
- All interactive elements have visible focus rings for accessibility

---

## Deployment

**GitHub Actions** (`.github/workflows/deploy.yml`):
1. On push to `main`
2. `npm ci` → `npm run build`
3. Deploy `dist/` to `gh-pages` branch via `peaceiris/actions-gh-pages`
4. GitHub Pages serves from `gh-pages` branch
5. Custom domain via `public/CNAME` containing `sparkofsanity.nl`

**Vite config:** `base: '/'` (root domain, not subpath).

---

## Out of Scope

- CMS / content management — updates require editing `tracks.js` or `videos.js` and pushing
- Blog / news posts
- Contact form
- E-commerce / merch
- Instagram feed embed (Instagram API restrictions make this unreliable)
