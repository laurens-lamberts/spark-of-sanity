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
