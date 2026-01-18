"use client"

import { useSyncExternalStore } from 'react'

/**
 * SSR-safe hook for detecting mobile viewport
 * Uses useSyncExternalStore for proper synchronization with browser state
 * - Returns false during SSR (safe default)
 * - Updates on window resize
 */
export function useIsMobile(breakpoint: number = 640): boolean {
  const subscribe = (callback: () => void) => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }

  const getSnapshot = () => window.innerWidth < breakpoint

  // SSR-safe: return false on server
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Hook for getting current window width (SSR-safe)
 * Returns 0 during SSR, actual width after mount
 */
export function useWindowWidth(): number {
  const subscribe = (callback: () => void) => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }

  const getSnapshot = () => window.innerWidth

  // SSR-safe: return 0 on server
  const getServerSnapshot = () => 0

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useIsMobile
