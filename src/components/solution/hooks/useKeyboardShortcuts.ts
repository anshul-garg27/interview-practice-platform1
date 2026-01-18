"use client"

import { useEffect, useCallback } from 'react'

interface KeyboardShortcuts {
  onEscape?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onSlash?: () => void  // For search (/)
  onQuestionMark?: () => void  // For help (?)
  enabled?: boolean
}

/**
 * Hook to handle keyboard shortcuts
 *
 * Usage:
 *   useKeyboardShortcuts({
 *     onEscape: () => closeModal(),
 *     onArrowLeft: () => previousPhase(),
 *     onArrowRight: () => nextPhase(),
 *     enabled: isOpen,
 *   })
 */
export function useKeyboardShortcuts({
  onEscape,
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onArrowDown,
  onSlash,
  onQuestionMark,
  enabled = true,
}: KeyboardShortcuts) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Escape even in inputs
        if (event.key !== 'Escape') return
      }

      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          onEscape?.()
          break

        case 'ArrowLeft':
          // Don't interfere with text selection
          if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
            event.preventDefault()
            onArrowLeft?.()
          }
          break

        case 'ArrowRight':
          if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
            event.preventDefault()
            onArrowRight?.()
          }
          break

        case 'ArrowUp':
          if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
            event.preventDefault()
            onArrowUp?.()
          }
          break

        case 'ArrowDown':
          if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
            event.preventDefault()
            onArrowDown?.()
          }
          break

        case '/':
          // Focus search (common pattern)
          if (!event.metaKey && !event.ctrlKey) {
            event.preventDefault()
            onSlash?.()
          }
          break

        case '?':
          // Show keyboard shortcuts help
          if (event.shiftKey) {
            event.preventDefault()
            onQuestionMark?.()
          }
          break
      }
    },
    [enabled, onEscape, onArrowLeft, onArrowRight, onArrowUp, onArrowDown, onSlash, onQuestionMark]
  )

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, handleKeyDown])
}

/**
 * Keyboard shortcuts help data
 */
export const keyboardShortcutsHelp = [
  { key: 'Esc', description: 'Close modal' },
  { key: '←', description: 'Previous phase' },
  { key: '→', description: 'Next phase' },
  { key: '/', description: 'Focus search' },
  { key: '?', description: 'Show shortcuts' },
]

export default useKeyboardShortcuts
