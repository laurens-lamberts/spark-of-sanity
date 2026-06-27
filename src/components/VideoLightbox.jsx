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
