"use client"

import { useRef, useEffect, useCallback } from 'react'

interface SwipeConfig {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number  // Minimum distance for swipe (default: 50px)
  enabled?: boolean
}

interface TouchState {
  startX: number
  startY: number
  startTime: number
}

/**
 * Hook to detect swipe gestures on touch devices
 *
 * Usage:
 *   const swipeRef = useSwipeGestures({
 *     onSwipeLeft: () => nextPhase(),
 *     onSwipeRight: () => previousPhase(),
 *     enabled: isMobile,
 *   })
 *
 *   return <div ref={swipeRef}>...</div>
 */
export function useSwipeGestures<T extends HTMLElement = HTMLDivElement>({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  enabled = true,
}: SwipeConfig) {
  const ref = useRef<T>(null)
  const touchState = useRef<TouchState | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return
    const touch = e.touches[0]
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    }
  }, [enabled])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || !touchState.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchState.current.startX
    const deltaY = touch.clientY - touchState.current.startY
    const deltaTime = Date.now() - touchState.current.startTime

    // Reset touch state
    touchState.current = null

    // Must be fast enough (under 300ms) to be a swipe
    if (deltaTime > 300) return

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Determine if horizontal or vertical swipe
    if (absX > absY && absX > threshold) {
      // Horizontal swipe
      if (deltaX > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    } else if (absY > absX && absY > threshold) {
      // Vertical swipe
      if (deltaY > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }
  }, [enabled, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, handleTouchStart, handleTouchEnd])

  return ref
}

export default useSwipeGestures
