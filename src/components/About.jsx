import { useEffect, useRef } from 'react'
import { members } from '../data/members'
import './About.css'

const BIO = `Spark of Sanity is an alternative rock band from the Netherlands. We play a mix of original songs and covers from bands we love — Kaleo, Highly Suspect, Arctic Monkeys, Muse and many others. We're best experienced live, that's where the raw energy really comes to life.`

const PRESSKIT_FILES = [
  { label: 'Rider', file: 'rider.pdf', ext: 'PDF' },
  { label: 'Logo',  file: 'logo.png',  ext: 'PNG' },
]

export default function About() {
  const membersRef = useRef(null)

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
        <p className="about__bio">{BIO}</p>
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
