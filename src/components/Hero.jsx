import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <img src="/assets/logo/logo-white.png" alt="Spark of Sanity logo" className="hero__logo" />
        <h1 className="hero__title">Spark of Sanity</h1>
        <a href="#music" className="hero__cta">Listen Now</a>
      </div>
    </section>
  )
}
