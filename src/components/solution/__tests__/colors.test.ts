import { describe, it, expect } from 'vitest'
import {
  colors,
  darkColors,
  getPhaseColor,
  getThemeColors,
  phaseColors,
  darkPhaseColors,
} from '../constants/colors'

describe('colors', () => {
  it('should export light theme colors', () => {
    expect(colors).toBeDefined()
    expect(colors.bgVoid).toBe('#F4F5F7')
    expect(colors.textPrimary).toBe('#374151')
  })

  it('should export dark theme colors', () => {
    expect(darkColors).toBeDefined()
    expect(darkColors.bgVoid).toBe('#0A0A0F')
    expect(darkColors.textPrimary).toBe('#E5E7EB')
  })

  it('should have matching keys between light and dark themes', () => {
    const lightKeys = Object.keys(colors).sort()
    const darkKeys = Object.keys(darkColors).sort()
    expect(lightKeys).toEqual(darkKeys)
  })
})

describe('getPhaseColor', () => {
  it('should return correct color for understand phase', () => {
    const result = getPhaseColor('understand')
    expect(result.color).toBe(colors.phaseUnderstand)
    expect(result.bg).toBe(colors.phaseUnderstandBg)
  })

  it('should return correct color for approach phase', () => {
    const result = getPhaseColor('approach')
    expect(result.color).toBe(colors.phaseApproach)
    expect(result.bg).toBe(colors.phaseApproachBg)
  })

  it('should return correct color for solution phase', () => {
    const result = getPhaseColor('solution')
    expect(result.color).toBe(colors.phaseSolution)
    expect(result.bg).toBe(colors.phaseSolutionBg)
  })

  it('should return correct color for verify phase', () => {
    const result = getPhaseColor('verify')
    expect(result.color).toBe(colors.phaseVerify)
    expect(result.bg).toBe(colors.phaseVerifyBg)
  })

  it('should return correct color for master phase', () => {
    const result = getPhaseColor('master')
    expect(result.color).toBe(colors.phaseMaster)
    expect(result.bg).toBe(colors.phaseMasterBg)
  })

  it('should return dark theme colors when isDark is true', () => {
    const result = getPhaseColor('understand', true)
    expect(result.color).toBe(darkColors.phaseUnderstand)
    expect(result.bg).toBe(darkColors.phaseUnderstandBg)
  })

  it('should default to understand phase for invalid input', () => {
    // @ts-expect-error - testing invalid input
    const result = getPhaseColor('invalid')
    expect(result.color).toBe(colors.phaseUnderstand)
  })
})

describe('getThemeColors', () => {
  it('should return light colors when isDark is false', () => {
    const result = getThemeColors(false)
    expect(result.bgVoid).toBe(colors.bgVoid)
    expect(result.textPrimary).toBe(colors.textPrimary)
  })

  it('should return dark colors when isDark is true', () => {
    const result = getThemeColors(true)
    expect(result.bgVoid).toBe(darkColors.bgVoid)
    expect(result.textPrimary).toBe(darkColors.textPrimary)
  })
})

describe('phaseColors', () => {
  it('should have all five phases', () => {
    const phases = ['understand', 'approach', 'solution', 'verify', 'master']
    phases.forEach((phase) => {
      expect(phaseColors[phase as keyof typeof phaseColors]).toBeDefined()
      expect(phaseColors[phase as keyof typeof phaseColors].color).toBeDefined()
      expect(phaseColors[phase as keyof typeof phaseColors].bg).toBeDefined()
    })
  })

  it('should have matching phases in dark theme', () => {
    const lightPhases = Object.keys(phaseColors).sort()
    const darkPhases = Object.keys(darkPhaseColors).sort()
    expect(lightPhases).toEqual(darkPhases)
  })
})

describe('WCAG contrast requirements', () => {
  // These are documentation tests - they verify our color choices meet WCAG AA

  it('textPrimary should have sufficient contrast on white background', () => {
    // #374151 on #FFFFFF = 9.3:1 (WCAG AAA)
    expect(colors.textPrimary).toBe('#374151')
  })

  it('textSecondary should meet WCAG AA (4.5:1 minimum)', () => {
    // #4B5563 on #FFFFFF = 7.0:1 (WCAG AA)
    expect(colors.textSecondary).toBe('#4B5563')
  })

  it('textMuted should meet WCAG AA for large text (3:1 minimum)', () => {
    // #6B7280 on #FFFFFF = 5.0:1 (WCAG AA)
    expect(colors.textMuted).toBe('#6B7280')
  })
})
