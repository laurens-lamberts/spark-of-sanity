import { describe, it, expect } from 'vitest'
import { releases, allTracks } from './tracks'

describe('tracks data', () => {
  it('has two releases', () => {
    expect(releases).toHaveLength(2)
  })

  it('each release has id, year, cover, and tracks', () => {
    for (const release of releases) {
      expect(release).toHaveProperty('id')
      expect(release).toHaveProperty('year')
      expect(release).toHaveProperty('cover')
      expect(release.tracks.length).toBeGreaterThan(0)
    }
  })

  it('each track has id, title, and src pointing to audio dir', () => {
    for (const track of allTracks) {
      expect(track).toHaveProperty('id')
      expect(track).toHaveProperty('title')
      expect(track.src).toMatch(/^\/assets\/audio\//)
    }
  })

  it('allTracks has 9 tracks', () => {
    expect(allTracks).toHaveLength(9)
  })

  it('track ids are unique', () => {
    const ids = allTracks.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
