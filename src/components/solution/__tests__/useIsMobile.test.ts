import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile, useWindowWidth } from '../hooks/useIsMobile'

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Reset window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
  })

  it('should return false when window width is above breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile(640))
    expect(result.current).toBe(false)
  })

  it('should return true when window width is below breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    })

    const { result } = renderHook(() => useIsMobile(640))
    expect(result.current).toBe(true)
  })

  it('should use default breakpoint of 640', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 639,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should update when window resizes', () => {
    const { result } = renderHook(() => useIsMobile(640))

    expect(result.current).toBe(false)

    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe(true)
  })
})

describe('useWindowWidth', () => {
  it('should return the current window width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useWindowWidth())
    expect(result.current).toBe(1024)
  })

  it('should update when window resizes', () => {
    const { result } = renderHook(() => useWindowWidth())

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe(768)
  })
})
