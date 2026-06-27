import { useEffect } from 'react'
import './Gigs.css'

export default function Gigs() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="bandsintown"]')
    if (existing) {
      window.BIT?.init?.()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://widget.bandsintown.com/main.min.js'
    script.charset = 'utf-8'
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
            data-link-text-color="#000000"
            data-display-lineup="false"
            data-separator-color="rgba(255,255,255,0.15)"
            data-display-track-button="false"
            data-app-id="js_sparkofsanity.nl"
          />
        </div>
      </section>
    </div>
  )
}
