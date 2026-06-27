import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Videos from './Videos'

describe('Videos', () => {
  it('renders 11 video buttons', () => {
    render(<Videos />)
    expect(screen.getAllByRole('button')).toHaveLength(11)
  })

  it('clicking a video opens the lightbox', () => {
    render(<Videos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByTestId('video-lightbox')).toBeInTheDocument()
  })

  it('close button removes the lightbox', () => {
    render(<Videos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByLabelText('Close video'))
    expect(screen.queryByTestId('video-lightbox')).not.toBeInTheDocument()
  })

  it('Escape key removes the lightbox', () => {
    render(<Videos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('video-lightbox')).not.toBeInTheDocument()
  })
})
