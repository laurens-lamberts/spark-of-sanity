import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <a href="#music" className="hero__cta">Listen Now</a>
      </div>
    </section>
  )
}
