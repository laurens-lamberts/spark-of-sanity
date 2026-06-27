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

  return (
    <div
      className={`mini-player ${!visible ? 'mini-player--hidden' : ''}`}
      data-testid="mini-player"
    >
      <div className="mini-player__info">
        {currentTrack
          ? <span className="mini-player__title">{currentTrack.title}</span>
          : <span className="mini-player__empty">—</span>
        }
      </div>

      <div className="mini-player__controls">
        <button className="mini-player__btn" onClick={prev} aria-label="Previous">⏮</button>
        <button
          className="mini-player__btn mini-player__play"
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="mini-player__btn" onClick={next} aria-label="Next">⏭</button>
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
