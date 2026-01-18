/**
 * Design System Colors - Light & Dark Themes
 * Inspired by Linear, Stripe, and modern SaaS design
 *
 * Usage:
 *   import { colors, darkColors, getThemeColors } from './constants/colors'
 */

// Light theme (default)
export const colors = {
  // Backgrounds - Clean light grays
  bgVoid: '#F4F5F7',        // Page background
  bgObsidian: '#FAFBFC',    // Main modal background
  bgCarbon: '#FFFFFF',      // Cards and sections (white)
  bgGraphite: '#F4F5F7',    // Hover states
  bgSlate: '#E4E7EB',       // Active states
  bgElevated: '#FFFFFF',    // Elevated cards

  // Phase Colors - Each phase has its own identity
  phaseUnderstand: '#5B6CF9',      // Blue - analytical, calm
  phaseUnderstandBg: '#EEF0FF',
  phaseApproach: '#A855F7',         // Purple - creative, strategic
  phaseApproachBg: '#F5EEFF',
  phaseSolution: '#10B981',         // Green - growth, building
  phaseSolutionBg: '#ECFDF5',
  phaseVerify: '#F59E0B',           // Amber - caution, testing
  phaseVerifyBg: '#FFFBEB',
  phaseMaster: '#EC4899',           // Pink - mastery, excellence
  phaseMasterBg: '#FDF2F8',

  // Legacy mappings (for backward compatibility)
  frostGlow: '#5B6CF9',
  frostBright: '#818CF8',
  frostSoft: '#C7D2FE',
  frostDeep: '#4F46E5',
  frostFaint: 'rgba(91, 108, 249, 0.08)',
  emberGlow: '#5B6CF9',
  emberFire: '#A855F7',
  emberWarm: '#C084FC',
  emberSoft: '#E9D5FF',
  emberFaint: 'rgba(91, 108, 249, 0.06)',

  // Text - Dark for readability (WCAG AA compliant)
  textBright: '#1A1A2E',     // Darkest headings - 16.5:1 contrast
  textPrimary: '#374151',    // Main readable text - 9.3:1 contrast
  textSecondary: '#4B5563',  // Secondary text - 7.0:1 contrast (improved)
  textMuted: '#6B7280',      // Labels, captions - 5.0:1 contrast (WCAG AA)
  textDim: '#9CA3AF',        // Decorative only (icons, disabled) - 3.0:1

  // Semantic - Balanced and accessible
  success: '#10B981',        // Emerald green
  successMuted: 'rgba(16, 185, 129, 0.10)',
  warning: '#F59E0B',        // Amber warning
  warningMuted: 'rgba(245, 158, 11, 0.10)',
  warningText: '#B45309',    // Darker amber for text (WCAG AA on white)
  error: '#EF4444',          // Red
  errorMuted: 'rgba(239, 68, 68, 0.10)',
  info: '#3B82F6',           // Blue
  infoMuted: 'rgba(59, 130, 246, 0.10)',

  // Borders - Light and subtle
  borderSubtle: '#E4E7EB',
  borderMedium: '#D1D5DB',
  borderEmber: 'rgba(91, 108, 249, 0.30)',
  borderBright: '#9CA3AF',

  // Code block (GitHub dark theme)
  codeBg: '#0D1117',           // Main code background
  codeHeaderBg: '#161B22',     // Code block header
  codeBorder: '#2D3748',       // Code block borders
  codeText: '#C9D1D9',         // Main code text
  codeTextMuted: '#8B949E',    // Comments, line numbers
  codeLineNumbers: '#6E7681',  // Line number color
  codeButtonBg: '#21262D',     // Copy button background
  codeButtonBorder: '#30363D', // Copy button border
  codeSuccess: '#3FB950',      // Success state (copied)

  // Inline code (in markdown)
  inlineCodeBg: '#1E1E2E',
  inlineCodeText: '#E879F9',   // Fuchsia - better contrast than #C792EA

  // Interview tip (yellow callout)
  tipGradientStart: '#FEF3C7',
  tipGradientEnd: '#FDE68A',
  tipBorder: '#FBBF24',
  tipText: '#92400E',          // Darker amber for better contrast
} as const

// Dark theme
export const darkColors = {
  // Backgrounds - Deep dark tones
  bgVoid: '#0A0A0F',         // Page background
  bgObsidian: '#111118',     // Main modal background
  bgCarbon: '#1A1A24',       // Cards and sections
  bgGraphite: '#22222E',     // Hover states
  bgSlate: '#2A2A38',        // Active states
  bgElevated: '#1E1E28',     // Elevated cards

  // Phase Colors - Same accent colors, darker backgrounds
  phaseUnderstand: '#7C8AFF',      // Blue - brighter for dark mode
  phaseUnderstandBg: 'rgba(91, 108, 249, 0.15)',
  phaseApproach: '#C084FC',         // Purple - brighter
  phaseApproachBg: 'rgba(168, 85, 247, 0.15)',
  phaseSolution: '#34D399',         // Green - brighter
  phaseSolutionBg: 'rgba(16, 185, 129, 0.15)',
  phaseVerify: '#FBBF24',           // Amber - brighter
  phaseVerifyBg: 'rgba(245, 158, 11, 0.15)',
  phaseMaster: '#F472B6',           // Pink - brighter
  phaseMasterBg: 'rgba(236, 72, 153, 0.15)',

  // Legacy mappings (for backward compatibility)
  frostGlow: '#7C8AFF',
  frostBright: '#A5B4FC',
  frostSoft: '#4F46E5',
  frostDeep: '#6366F1',
  frostFaint: 'rgba(124, 138, 255, 0.12)',
  emberGlow: '#7C8AFF',
  emberFire: '#C084FC',
  emberWarm: '#E879F9',
  emberSoft: '#7C3AED',
  emberFaint: 'rgba(124, 138, 255, 0.10)',

  // Text - Light for dark backgrounds (WCAG AA compliant)
  textBright: '#F9FAFB',     // Brightest headings
  textPrimary: '#E5E7EB',    // Main readable text
  textSecondary: '#D1D5DB',  // Secondary text
  textMuted: '#9CA3AF',      // Labels, captions
  textDim: '#6B7280',        // Decorative only

  // Semantic - Brighter for dark mode
  success: '#34D399',
  successMuted: 'rgba(52, 211, 153, 0.15)',
  warning: '#FBBF24',
  warningMuted: 'rgba(251, 191, 36, 0.15)',
  warningText: '#FCD34D',    // Lighter amber for dark mode
  error: '#F87171',
  errorMuted: 'rgba(248, 113, 113, 0.15)',
  info: '#60A5FA',
  infoMuted: 'rgba(96, 165, 250, 0.15)',

  // Borders - Subtle on dark
  borderSubtle: '#2A2A38',
  borderMedium: '#3A3A4A',
  borderEmber: 'rgba(124, 138, 255, 0.40)',
  borderBright: '#4A4A5A',

  // Code block (same dark theme works well)
  codeBg: '#0D1117',
  codeHeaderBg: '#161B22',
  codeBorder: '#30363D',
  codeText: '#C9D1D9',
  codeTextMuted: '#8B949E',
  codeLineNumbers: '#6E7681',
  codeButtonBg: '#21262D',
  codeButtonBorder: '#30363D',
  codeSuccess: '#3FB950',

  // Inline code
  inlineCodeBg: '#2D2D3D',
  inlineCodeText: '#F0ABFC',

  // Interview tip (darker version)
  tipGradientStart: 'rgba(251, 191, 36, 0.15)',
  tipGradientEnd: 'rgba(245, 158, 11, 0.20)',
  tipBorder: '#B45309',
  tipText: '#FCD34D',
} as const

// ColorTheme type - allows both light and dark themes
export type ColorTheme = {
  [K in keyof typeof colors]: string
}
export type Phase = 'understand' | 'approach' | 'solution' | 'verify' | 'master'

export interface PhaseColorSet {
  color: string
  bg: string
}

export const phaseColors: Record<Phase, PhaseColorSet> = {
  understand: { color: colors.phaseUnderstand, bg: colors.phaseUnderstandBg },
  approach: { color: colors.phaseApproach, bg: colors.phaseApproachBg },
  solution: { color: colors.phaseSolution, bg: colors.phaseSolutionBg },
  verify: { color: colors.phaseVerify, bg: colors.phaseVerifyBg },
  master: { color: colors.phaseMaster, bg: colors.phaseMasterBg },
}

export function getPhaseColor(phase: Phase, isDark = false): PhaseColorSet {
  const theme = isDark ? darkPhaseColors : phaseColors
  return theme[phase] || theme.understand
}

// Dark theme phase colors
export const darkPhaseColors: Record<Phase, PhaseColorSet> = {
  understand: { color: darkColors.phaseUnderstand, bg: darkColors.phaseUnderstandBg },
  approach: { color: darkColors.phaseApproach, bg: darkColors.phaseApproachBg },
  solution: { color: darkColors.phaseSolution, bg: darkColors.phaseSolutionBg },
  verify: { color: darkColors.phaseVerify, bg: darkColors.phaseVerifyBg },
  master: { color: darkColors.phaseMaster, bg: darkColors.phaseMasterBg },
}

/**
 * Get the appropriate color theme based on dark mode preference
 */
export function getThemeColors(isDark: boolean): ColorTheme {
  return isDark ? darkColors : colors
}

// Common style patterns (to reduce inline style duplication)
export const commonStyles = {
  labelUppercase: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  cardBase: {
    borderRadius: 8,
    backgroundColor: colors.bgGraphite,
  },
  monoFont: {
    fontFamily: "var(--font-mono), 'JetBrains Mono', 'Fira Code', monospace",
  },
} as const

export default colors
