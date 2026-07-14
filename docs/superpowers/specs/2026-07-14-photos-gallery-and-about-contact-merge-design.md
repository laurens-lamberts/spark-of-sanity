# Photos Gallery + About/Contact Merge

## Goal

Add a downloadable photo gallery for the press kit (9 photos: existing `photo.jpg` + 8 new `260710-*.jpg`), presented as its own "Photos" section with a lightbox and per-photo download. Merge the standalone Contact section into About, since its only content beyond the email line was press-kit downloads.

## Structural changes

### About (merge target)
`About.jsx` keeps its existing bio + members grid, then gains a new sub-block below it:
- Contact text + email link (moved verbatim from `Contact.jsx`)
- Press-kit downloads: **Rider** and **Logo** only. The **Photo** entry is dropped from this row — press photos now live in the new Photos section.

`Contact.jsx` and `Contact.css` are deleted. Their styles move into `About.css` under an `about__contact-*` naming scheme (was `contact__*`).

### Photos (new section)
New `Photos.jsx` + `Photos.css`:
- Heading "Photos"
- One-line note that these are downloadable press photos
- 3-column responsive grid (breakpoints match `Videos.css`: 3 col → 2 col @900px → 1 col @500px) of 9 thumbnails, `object-fit: cover`, lazy-loaded, hover zoom/darken (same interaction as `.videos__thumb`)
- Click a thumb → opens `PhotoLightbox`

New `PhotoLightbox.jsx` + `PhotoLightbox.css`, structurally mirrors `VideoLightbox.jsx`:
- Full-size image display
- Close on Esc key or click outside `.lightbox__inner`
- A download button/link for that specific photo's full-res file (`download` attribute)

New `src/data/presskitPhotos.js`:
```js
export const presskitPhotos = [
  { id: 1, file: 'photo.jpg', alt: 'Live photo 1' },
  { id: 2, file: '260710-204703.jpg', alt: 'Live photo 2' },
  // ... remaining 260710-*.jpg files, alt incrementing
]
```
Files are served from `${import.meta.env.BASE_URL}assets/presskit/<file>`, same base path already used by `Contact.jsx`.

### App composition
`App.jsx` section order becomes: Hero, Gigs, Music, About, Photos, Videos, Footer. `Contact` import/usage removed, `Photos` import/usage added between `About` and `Videos`.

`Navbar.jsx` `NAV_LINKS` becomes: Gigs, Music, About, Photos, Videos (Contact link removed, Photos link added, pointing to `#photos`).

## Out of scope
- No zip-all download (per-photo download only)
- No generated/resized thumbnails — grid serves the same full-res files as the lightbox/download, consistent with how `Videos.jsx` already handles thumbnail images (no build-time image processing exists in this project)
- No new dependencies

## Testing
- `About.test.jsx`: add assertions for the contact sub-block (email link, Rider/Logo download buttons present, Photo entry absent)
- `Navbar.test.jsx`: update nav link list assertion to include Photos, exclude Contact
- New `Photos.test.jsx`: grid renders 9 items; clicking a thumb opens lightbox; lightbox shows a download link with correct `href`/`download` attrs; Esc closes it
- No dedicated lightbox test file — `VideoLightbox.jsx` has none either; lightbox behavior is covered via `Photos.test.jsx`, consistent with existing project convention
