import { usePlayer } from '../context/PlayerContext'
import './MiniPlayer.css'

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function MiniPlayer({ visible }) {
  const { currentTrack, isPlaying, currentTime, duration, pause, resume, seek, next, prev } = usePlayer()

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const shouldShow = visible && !!currentTrack

  return (
    <div
      className={`mini-player ${!shouldShow ? 'mini-player--hidden' : ''}`}
      data-testid="mini-player"
    >
      <div className="mini-player__info">
        {currentTrack
          ? <span className="mini-player__title">{currentTrack.title}</span>
          : <span className="mini-player__empty">—</span>
        }
      </div>

      <div className="mini-player__controls">
        <button className="mini-player__btn" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
        </button>
        <button
          className="mini-player__btn mini-player__play"
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying
            ? <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>
            : <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>
        <button className="mini-player__btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>
        </button>
      </div>

      <div className="mini-player__progress-area">
        <span className="mini-player__time">{formatTime(currentTime)}</span>
        <div
          className="mini-player__bar"
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            seek(((e.clientX - rect.left) / rect.width) * duration)
          }}
        >
          <div className="mini-player__fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="mini-player__time">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
