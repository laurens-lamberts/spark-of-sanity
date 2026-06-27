import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Gigs', href: '#gigs' },
  { label: 'Music', href: '#music' },
  { label: 'About', href: '#about' },
  { label: 'Videos', href: '#videos' },
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
        <img src={`${import.meta.env.BASE_URL}assets/logo/logo-white.png`} alt="Spark of Sanity" height="40" />
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
