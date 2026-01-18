"use client"

import { useState, useCallback, useRef, useEffect } from 'react'

interface UseCopyToClipboardReturn {
  copied: boolean
  error: string | null
  copyToClipboard: (text: string) => Promise<void>
  reset: () => void
}

/**
 * Safe clipboard hook with:
 * - Feature detection for Clipboard API
 * - Fallback for older browsers / HTTP contexts
 * - Auto-reset after timeout
 * - Proper cleanup to prevent memory leaks
 */
export function useCopyToClipboard(resetDelay: number = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const reset = useCallback(() => {
    setCopied(false)
    setError(null)
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    try {
      // Modern Clipboard API (requires HTTPS or localhost)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
      } else {
        // Fallback for older browsers or HTTP
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        textarea.style.top = '-9999px'
        textarea.setAttribute('readonly', '')
        document.body.appendChild(textarea)
        textarea.select()

        const success = document.execCommand('copy')
        document.body.removeChild(textarea)

        if (success) {
          setCopied(true)
          setError(null)
        } else {
          throw new Error('execCommand copy failed')
        }
      }

      // Auto-reset after delay
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, resetDelay)

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to copy'
      setError(message)
      setCopied(false)
      console.error('Copy to clipboard failed:', err)
    }
  }, [resetDelay])

  return { copied, error, copyToClipboard, reset }
}

export default useCopyToClipboard
