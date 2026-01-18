"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../constants/colors'
import { fonts } from '../constants/typography'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
  placeholder?: string
}

/**
 * Search bar component for modal content search
 */
export function SearchBar({
  isOpen,
  onClose,
  onSearch,
  placeholder = 'Search in solution...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Clear and close
  const handleClose = useCallback(() => {
    setQuery('')
    onSearch('')
    onClose()
  }, [onClose, onSearch])

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }, [onSearch])

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }, [handleClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          style={{
            padding: '12px 20px',
            backgroundColor: colors.bgCarbon,
            borderBottom: `1px solid ${colors.borderSubtle}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: colors.bgGraphite,
              borderRadius: 8,
              padding: '8px 12px',
              border: `1px solid ${colors.borderSubtle}`,
            }}
          >
            {/* Search icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: 14,
                fontFamily: fonts.sans,
                color: colors.textPrimary,
              }}
            />

            {/* Result count or keyboard hint */}
            {query ? (
              <button
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  color: colors.textMuted,
                  fontSize: 12,
                  borderRadius: 4,
                }}
              >
                Clear
              </button>
            ) : (
              <kbd
                style={{
                  padding: '2px 6px',
                  fontSize: 11,
                  fontFamily: fonts.mono,
                  backgroundColor: colors.bgSlate,
                  borderRadius: 4,
                  color: colors.textMuted,
                  border: `1px solid ${colors.borderSubtle}`,
                }}
              >
                Esc
              </kbd>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Hook to highlight search matches in text
 */
export function useSearchHighlight(text: string, query: string): React.ReactNode {
  if (!query || !text) return text

  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{
          backgroundColor: 'rgba(251, 191, 36, 0.4)',
          color: 'inherit',
          padding: '0 2px',
          borderRadius: 2,
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default SearchBar
