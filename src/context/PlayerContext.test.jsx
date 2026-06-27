import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { PlayerProvider, usePlayer } from './PlayerContext'

const wrapper = ({ children }) => <PlayerProvider>{children}</PlayerProvider>

const track1 = { id: 1, title: 'Storm', src: '/assets/audio/Storm.mp3' }
const track2 = { id: 2, title: 'Sweet or Salty', src: '/assets/audio/Sweet-or-Salty.mp3' }
const playlist = [track1, track2]

describe('PlayerContext', () => {
  beforeEach(() => vi.clearAllMocks())

  it('starts with no track and not playing', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    expect(result.current.currentTrack).toBeNull()
    expect(result.current.isPlaying).toBe(false)
  })

  it('play() sets currentTrack and isPlaying true', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    expect(result.current.currentTrack).toEqual(track1)
    expect(result.current.isPlaying).toBe(true)
  })

  it('pause() sets isPlaying false', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.pause())
    expect(result.current.isPlaying).toBe(false)
  })

  it('resume() sets isPlaying true', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.pause())
    act(() => result.current.resume())
    expect(result.current.isPlaying).toBe(true)
  })

  it('next() advances to next track', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.next())
    expect(result.current.currentTrack).toEqual(track2)
  })

  it('prev() goes to previous track', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track2, playlist))
    act(() => result.current.prev())
    expect(result.current.currentTrack).toEqual(track1)
  })

  it('next() wraps to first track at end', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track2, playlist))
    act(() => result.current.next())
    expect(result.current.currentTrack).toEqual(track1)
  })

  it('prev() wraps to last track at start', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper })
    act(() => result.current.play(track1, playlist))
    act(() => result.current.prev())
    expect(result.current.currentTrack).toEqual(track2)
  })
})
