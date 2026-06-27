import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders logo image', () => {
    render(<Navbar />)
    expect(screen.getByAltText('Spark of Sanity')).toBeInTheDocument()
  })

  it('renders all four nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Videos')).toBeInTheDocument()
    expect(screen.getByText('Gigs')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('mobile menu opens on hamburger click', () => {
    render(<Navbar />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(screen.getByRole('navigation')).toHaveClass('nav--open')
  })

  it('mobile menu closes when nav link clicked', () => {
    render(<Navbar />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByText('Music'))
    expect(screen.getByRole('navigation')).not.toHaveClass('nav--open')
  })
})
