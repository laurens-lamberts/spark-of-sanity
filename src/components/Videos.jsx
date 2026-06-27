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
