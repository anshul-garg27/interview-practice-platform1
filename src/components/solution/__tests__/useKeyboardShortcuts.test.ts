import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'

describe('useKeyboardShortcuts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call onEscape when Escape key is pressed', () => {
    const onEscape = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onEscape,
        enabled: true,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onEscape).toHaveBeenCalledTimes(1)
  })

  it('should call onArrowLeft when ArrowLeft key is pressed', () => {
    const onArrowLeft = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onArrowLeft,
        enabled: true,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    document.dispatchEvent(event)

    expect(onArrowLeft).toHaveBeenCalledTimes(1)
  })

  it('should call onArrowRight when ArrowRight key is pressed', () => {
    const onArrowRight = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onArrowRight,
        enabled: true,
      })
    )

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    document.dispatchEvent(event)

    expect(onArrowRight).toHaveBeenCalledTimes(1)
  })

  it('should not call handlers when enabled is false', () => {
    const onEscape = vi.fn()
    const onArrowLeft = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onEscape,
        onArrowLeft,
        enabled: false,
      })
    )

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

    expect(onEscape).not.toHaveBeenCalled()
    expect(onArrowLeft).not.toHaveBeenCalled()
  })

  it('should call onSlash when / key is pressed', () => {
    const onSlash = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onSlash,
        enabled: true,
      })
    )

    const event = new KeyboardEvent('keydown', { key: '/' })
    document.dispatchEvent(event)

    expect(onSlash).toHaveBeenCalledTimes(1)
  })

  it('should not trigger shortcuts when typing in an input', () => {
    const onArrowLeft = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onArrowLeft,
        enabled: true,
      })
    )

    // Create and focus an input
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    // Simulate keydown on input
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
    })
    Object.defineProperty(event, 'target', { value: input })
    document.dispatchEvent(event)

    // Should not be called because focus is on input
    expect(onArrowLeft).not.toHaveBeenCalled()

    // Cleanup
    document.body.removeChild(input)
  })

  it('should still call onEscape when typing in an input', () => {
    const onEscape = vi.fn()

    renderHook(() =>
      useKeyboardShortcuts({
        onEscape,
        enabled: true,
      })
    )

    // Create and focus an input
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    // Simulate Escape on input
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    })
    Object.defineProperty(event, 'target', { value: input })
    document.dispatchEvent(event)

    // Escape should still work even in input
    expect(onEscape).toHaveBeenCalledTimes(1)

    // Cleanup
    document.body.removeChild(input)
  })
})
