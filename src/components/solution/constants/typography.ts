/**
 * Typography Constants
 * Centralized font definitions for consistent usage across components
 *
 * Usage:
 *   import { fonts, fontSizes } from './constants/typography'
 */

export const fonts = {
  // Sans-serif (UI text) - uses CSS variable from next/font
  sans: "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // Monospace (code) - uses CSS variable from next/font
  mono: "var(--font-mono), 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
} as const

export const fontSizes = {
  // Fluid sizes (use CSS variables for responsive scaling)
  xs: 'var(--text-xs)',      // 12px → 13px
  sm: 'var(--text-sm)',      // 13px → 14px
  base: 'var(--text-base)',  // 14px → 16px
  lg: 'var(--text-lg)',      // 16px → 18px
  xl: 'var(--text-xl)',      // 18px → 20px
  '2xl': 'var(--text-2xl)',  // 20px → 24px
  '3xl': 'var(--text-3xl)',  // 24px → 30px
  '4xl': 'var(--text-4xl)',  // 30px → 36px

  // Fixed sizes (for specific use cases like badges, labels)
  fixed: {
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 15,
    16: 16,
    18: 18,
    20: 20,
    24: 24,
  },
} as const

export const lineHeights = {
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 1.75,
} as const

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export default fonts
