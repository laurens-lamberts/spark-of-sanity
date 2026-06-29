import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Music from './Music'
import { PlayerProvider } from '../context/PlayerContext'

const wrapper = ({ children }) => <PlayerProvider>{children}</PlayerProvider>

describe('Music', () => {
  it('renders EP years', () => {
    render(<Music />, { wrapper })
    expect(screen.getByText('2018')).toBeInTheDocument()
    expect(screen.getByText('2020')).toBeInTheDocument()
  })

  it('renders all 9 track titles', () => {
    render(<Music />, { wrapper })
    expect(screen.getByText('Storm in My Head')).toBeInTheDocument()
    expect(screen.getByText('Willow Tree')).toBeInTheDocument()
    expect(screen.getByText('Lies for a Living')).toBeInTheDocument()
  })

  it('clicking a track adds track--active class to its list item', () => {
    render(<Music />, { wrapper })
    fireEvent.click(screen.getByText('Storm in My Head'))
    expect(screen.getByText('Storm in My Head').closest('li')).toHaveClass('track--active')
  })

  it('other tracks are not active after clicking Storm', () => {
    render(<Music />, { wrapper })
    fireEvent.click(screen.getByText('Storm in My Head'))
    expect(screen.getByText('Willow Tree').closest('li')).not.toHaveClass('track--active')
  })
})
