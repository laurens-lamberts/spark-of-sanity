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
