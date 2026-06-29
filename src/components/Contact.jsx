import './Contact.css'

const PRESSKIT_FILES = [
  { label: 'Rider',  file: 'rider.pdf',  ext: 'PDF' },
  { label: 'Logo',   file: 'logo.png',   ext: 'PNG' },
  { label: 'Photo',  file: 'photo.jpg',  ext: 'JPG' },
]

export default function Contact() {
  return (
    <div className="section-wrapper">
      <section id="contact">
        <h2 className="section-heading">Contact</h2>
        <p className="contact__text">
          Want to get in touch? Drop us a message at{' '}
          <a href="mailto:contact@sparkofsanity.nl" className="contact__email">
            contact@sparkofsanity.nl
          </a>
          . Looking forward to seeing you at a gig!
        </p>

        <div className="contact__presskit">
          <h3 className="contact__presskit-heading">Press Kit</h3>
          <div className="contact__downloads">
            {PRESSKIT_FILES.map(({ label, file, ext }) => (
              <a
                key={file}
                href={`${import.meta.env.BASE_URL}assets/presskit/${file}`}
                download={file}
                className="contact__download-btn"
              >
                <span className="contact__download-ext">{ext}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
