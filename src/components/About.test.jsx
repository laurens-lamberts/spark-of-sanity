import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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

describe('About bio toggle', () => {
  it('defaults to short English bio', () => {
    render(<About />)
    expect(screen.getByText(/Netherlands/)).toBeInTheDocument()
    expect(screen.queryByText(/Bommelerwaard/)).not.toBeInTheDocument()
  })

  it('switches to Dutch bio when NL is selected', () => {
    render(<About />)
    fireEvent.click(screen.getByRole('button', { name: 'NL' }))
    expect(screen.getByText(/Bommelerwaard/)).toBeInTheDocument()
    expect(screen.queryByText(/Netherlands/)).not.toBeInTheDocument()
  })

  it('switches to long bio when Long is selected', () => {
    render(<About />)
    fireEvent.click(screen.getByRole('button', { name: 'Long' }))
    expect(screen.getByText(/Parel van de Betuwe/)).toBeInTheDocument()
  })

  it('combines language and length toggles', () => {
    render(<About />)
    fireEvent.click(screen.getByRole('button', { name: 'NL' }))
    fireEvent.click(screen.getByRole('button', { name: 'Long' }))
    expect(screen.getByText(/bandwedstrijd de Parel van de Betuwe/)).toBeInTheDocument()
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
