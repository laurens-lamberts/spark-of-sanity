import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MiniPlayer from './MiniPlayer'
import { PlayerProvider, usePlayer } from '../context/PlayerContext'

function Harness({ visible }) {
  const { play } = usePlayer()
  return (
    <>
      <button onClick={() => play({ id: 1, title: 'Storm', src: '/a.mp3' }, [{ id: 1, title: 'Storm', src: '/a.mp3' }])}>
        Load
      </button>
      <MiniPlayer visible={visible} />
    </>
  )
}

describe('MiniPlayer', () => {
  it('has hidden class when visible=false', () => {
    render(<PlayerProvider><Harness visible={false} /></PlayerProvider>)
    expect(screen.getByTestId('mini-player')).toHaveClass('mini-player--hidden')
  })

  it('does not have hidden class when visible=true', () => {
    render(<PlayerProvider><Harness visible={true} /></PlayerProvider>)
    expect(screen.getByTestId('mini-player')).not.toHaveClass('mini-player--hidden')
  })

  it('shows track title after play()', () => {
    render(<PlayerProvider><Harness visible={true} /></PlayerProvider>)
    fireEvent.click(screen.getByText('Load'))
    expect(screen.getByText('Storm')).toBeInTheDocument()
  })

  it('pause button switches to play button', () => {
    render(<PlayerProvider><Harness visible={true} /></PlayerProvider>)
    fireEvent.click(screen.getByText('Load'))
    fireEvent.click(screen.getByLabelText('Pause'))
    expect(screen.getByLabelText('Play')).toBeInTheDocument()
  })
})
