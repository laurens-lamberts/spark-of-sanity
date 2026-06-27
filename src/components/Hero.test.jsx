import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders Listen Now CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /listen now/i })).toBeInTheDocument()
  })

  it('CTA links to #music', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /listen now/i })).toHaveAttribute('href', '#music')
  })
})
