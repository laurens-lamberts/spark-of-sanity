import { useRef, useState, useEffect } from 'react'
import { PlayerProvider } from './context/PlayerContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Music from './components/Music'
import MiniPlayer from './components/MiniPlayer'
import Videos from './components/Videos'
import Gigs from './components/Gigs'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  const musicRef = useRef(null)
  const [showMiniPlayer, setShowMiniPlayer] = useState(false)

  useEffect(() => {
    const el = musicRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowMiniPlayer(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <PlayerProvider>
      <Navbar />
      <main>
        <Hero />
        <Gigs />
        <Music ref={musicRef} />
        <About />
        <Videos />
        <Contact />
      </main>
      <Footer />
      <MiniPlayer visible={showMiniPlayer} />
    </PlayerProvider>
  )
}
