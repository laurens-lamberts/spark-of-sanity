import { useEffect } from 'react'
import './VideoLightbox.css'
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
