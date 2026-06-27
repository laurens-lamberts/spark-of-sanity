import { createContext, useContext, useRef, useState, useCallback } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const playlistRef = useRef([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const play = useCallback((track, playlist = []) => {
    const audio = audioRef.current
    playlistRef.current = playlist.length ? playlist : [track]

    if (audio.src !== track.src) {
      audio.src = track.src
      audio.load()
    }

    audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
    audio.ondurationchange = () => setDuration(audio.duration || 0)
    audio.onended = () => {
      const list = playlistRef.current
      const idx = list.findIndex(t => t.id === track.id)
      const next = list[(idx + 1) % list.length]
      play(next, list)
    }

    audio.play().catch(() => {})
    setCurrentTrack(track)
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const resume = useCallback(() => {
    audioRef.current.play().catch(() => {})
    setIsPlaying(true)
  }, [])

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const next = useCallback(() => {
    const list = playlistRef.current
    if (!list.length) return
    setCurrentTrack(prev => {
      const idx = list.findIndex(t => t.id === prev?.id)
      const nextTrack = list[(idx + 1) % list.length]
      play(nextTrack, list)
      return nextTrack
    })
  }, [play])

  const prev = useCallback(() => {
    const list = playlistRef.current
    if (!list.length) return
    setCurrentTrack(prev => {
      const idx = list.findIndex(t => t.id === prev?.id)
      const prevTrack = list[(idx - 1 + list.length) % list.length]
      play(prevTrack, list)
      return prevTrack
    })
  }, [play])

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, currentTime, duration, play, pause, resume, seek, next, prev }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
