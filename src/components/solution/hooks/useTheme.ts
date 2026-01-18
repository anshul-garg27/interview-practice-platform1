"use client"

import { useSyncExternalStore, useCallback } from 'react'
import { colors, darkColors, getThemeColors, type ColorTheme } from '../constants/colors'

/**
 * SSR-safe hook for detecting dark mode preference
 * Syncs with system preference and next-themes
 */
export function useIsDarkMode(): boolean {
  const subscribe = useCallback((callback: () => void) => {
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', callback)

    // Also listen for class changes on html element (next-themes)
    const observer = new MutationObserver(callback)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      mediaQuery.removeEventListener('change', callback)
      observer.disconnect()
    }
  }, [])

  const getSnapshot = useCallback(() => {
    // Check for next-themes dark class first
    if (document.documentElement.classList.contains('dark')) {
      return true
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])

  // SSR-safe: return false on server
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Hook that returns the appropriate color theme based on current mode
 *
 * Usage:
 *   const theme = useThemeColors()
 *   <div style={{ backgroundColor: theme.bgCarbon }}>
 */
export function useThemeColors(): ColorTheme {
  const isDark = useIsDarkMode()
  return getThemeColors(isDark)
}

/**
 * Hook that returns both the colors and whether dark mode is active
 *
 * Usage:
 *   const { theme, isDark } = useTheme()
 */
export function useTheme(): { theme: ColorTheme; isDark: boolean } {
  const isDark = useIsDarkMode()
  return {
    theme: isDark ? darkColors : colors,
    isDark,
  }
}

export default useTheme
