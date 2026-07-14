import { useEffect, useRef, useState } from 'react'
import { members } from '../data/members'
import { BIOS } from '../data/bios'
import './About.css'

const PRESSKIT_FILES = [
  { label: 'Rider', file: 'rider.pdf', ext: 'PDF' },
  { label: 'Logo',  file: 'logo.png',  ext: 'PNG' },
]

export default function About() {
  const membersRef = useRef(null)
  const [lang, setLang] = useState('en')
  const [length, setLength] = useState('short')

  useEffect(() => {
    if (!membersRef.current) return
    const cards = membersRef.current.querySelectorAll('.about__member')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-in-view', entry.isIntersecting)
        })
      },
      { threshold: 1 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="section-wrapper section-wrapper--alt">
      <section id="about">
        <h2 className="section-heading">About</h2>
        <div className="about__bio-toggles">
          <div className="about__toggle-group">
            <button
              className={`about__toggle-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={`about__toggle-btn ${lang === 'nl' ? 'is-active' : ''}`}
              onClick={() => setLang('nl')}
            >
              NL
            </button>
          </div>
          <div className="about__toggle-group">
            <button
              className={`about__toggle-btn ${length === 'short' ? 'is-active' : ''}`}
              onClick={() => setLength('short')}
            >
              Short
            </button>
            <button
              className={`about__toggle-btn ${length === 'long' ? 'is-active' : ''}`}
              onClick={() => setLength('long')}
            >
              Long
            </button>
          </div>
        </div>
        <p className="about__bio">{BIOS[lang][length]}</p>
        <div className="about__members" ref={membersRef}>
          {members.map(member => (
            <div key={member.id} className="about__member">
              <div className="about__photo">
                <img src={member.photo} alt={member.name} />
              </div>
              <h3 className="about__name">{member.name}</h3>
              <p className="about__instrument">{member.instrument}</p>
            </div>
          ))}
        </div>

        <div className="about__contact">
          <p className="about__contact-text">
            Want to get in touch? Drop us a message at{' '}
            <a href="mailto:contact@sparkofsanity.nl" className="about__contact-email">
              contact@sparkofsanity.nl
            </a>
            . Looking forward to seeing you at a gig!
          </p>
          <div className="about__downloads">
            {PRESSKIT_FILES.map(({ label, file, ext }) => (
              <a
                key={file}
                href={`${import.meta.env.BASE_URL}assets/presskit/${file}`}
                download={file}
                className="about__download-btn"
              >
                <span className="about__download-ext">{ext}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
