import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Photos from './Photos'

describe('Photos', () => {
  it('renders 9 photo thumbnail buttons', () => {
    render(<Photos />)
    expect(screen.getAllByRole('button')).toHaveLength(9)
  })

  it('clicking a thumbnail opens the lightbox', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByTestId('photo-lightbox')).toBeInTheDocument()
  })

  it('lightbox shows a download link for the selected photo', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    const link = screen.getByLabelText('Download photo')
    expect(link).toHaveAttribute('download')
    expect(link.getAttribute('href')).toContain('assets/presskit/')
  })

  it('close button removes the lightbox', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByLabelText('Close photo'))
    expect(screen.queryByTestId('photo-lightbox')).not.toBeInTheDocument()
  })

  it('Escape key removes the lightbox', () => {
    render(<Photos />)
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('photo-lightbox')).not.toBeInTheDocument()
  })
})
