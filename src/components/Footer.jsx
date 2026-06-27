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
