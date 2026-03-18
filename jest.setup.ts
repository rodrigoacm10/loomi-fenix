import '@testing-library/jest-dom'

window.PointerEvent =
  class PointerEvent extends Event {} as unknown as typeof window.PointerEvent
HTMLElement.prototype.hasPointerCapture = jest.fn()
HTMLElement.prototype.scrollIntoView = jest.fn()
