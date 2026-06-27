import '@testing-library/jest-dom'

window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
window.HTMLMediaElement.prototype.pause = vi.fn()
window.HTMLMediaElement.prototype.load = vi.fn()
Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
  get: () => 180,
  configurable: true,
})
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
  get: () => 0,
  set: vi.fn(),
  configurable: true,
})
