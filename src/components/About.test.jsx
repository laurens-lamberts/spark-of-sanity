import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('renders all 4 member names', () => {
    render(<About />)
    expect(screen.getByText('Laurens')).toBeInTheDocument()
    expect(screen.getByText('Bjorn')).toBeInTheDocument()
    expect(screen.getByText('Robin')).toBeInTheDocument()
    expect(screen.getByText('Nick')).toBeInTheDocument()
  })

  it('renders member instruments', () => {
    render(<About />)
    expect(screen.getByText('Vocals & Guitar')).toBeInTheDocument()
    expect(screen.getByText('Drums')).toBeInTheDocument()
  })

  it('renders band bio text', () => {
    render(<About />)
    expect(screen.getByText(/rock band/i)).toBeInTheDocument()
  })
})

describe('About contact block', () => {
  it('renders the contact email link', () => {
    render(<About />)
    expect(screen.getByRole('link', { name: /contact@sparkofsanity\.nl/ })).toHaveAttribute(
      'href',
      'mailto:contact@sparkofsanity.nl'
    )
  })

  it('renders Rider and Logo download buttons but not Photo', () => {
    render(<About />)
    expect(screen.getByText('Rider')).toBeInTheDocument()
    expect(screen.getByText('Logo')).toBeInTheDocument()
    expect(screen.queryByText('Photo')).not.toBeInTheDocument()
  })
})
