import { releases } from '../data/tracks'
import { usePlayer } from '../context/PlayerContext'
import './Music.css'

export default function Music({ ref }) {
  const { currentTrack, isPlaying, play, pause, resume } = usePlayer()

  const handleClick = (track, epTracks) => {
    if (currentTrack?.id === track.id) {
      isPlaying ? pause() : resume()
    } else {
      play(track, epTracks)
    }
  }

  return (
    <div className="section-wrapper" ref={ref}>
      <section id="music">
        <h2 className="section-heading">Music</h2>
        <div className="music__releases">
          {releases.map(release => (
            <div key={release.id} className="music__ep">
              <div className="music__ep-cover">
                <img src={release.cover} alt={`${release.year} EP cover`} />
              </div>
              <div className="music__ep-info">
                <span className="music__ep-year">{release.year}</span>
                <ul className="music__tracklist">
                  {release.tracks.map((track, i) => {
                    const isActive = currentTrack?.id === track.id
                    return (
                      <li
                        key={track.id}
                        className={`music__track ${isActive ? 'track--active' : ''}`}
                      >
                        <button
                          className="music__track-btn"
                          onClick={() => handleClick(track, release.tracks)}
                          aria-pressed={isActive}
                        >
                          <span className="music__track-num">{i + 1}</span>
                          <span className="music__track-title">{track.title}</span>
                          <span className="music__track-icon">
                            {isActive && isPlaying ? '⏸' : '▶'}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
