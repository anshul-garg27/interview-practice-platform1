"use client"

import React from 'react'
import { colors } from '../constants/colors'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: number
  className?: string
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 6,
  className = ''
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: colors.bgGraphite,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style jsx>{`
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

/**
 * Skeleton for text lines
 */
export function SkeletonText({ lines = 3, lastLineWidth = '60%' }: { lines?: number; lastLineWidth?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton for the phase tab bar
 */
export function SkeletonPhaseTabs() {
  return (
    <div style={{
      display: 'flex',
      gap: 8,
      padding: '12px 20px',
      borderBottom: `1px solid ${colors.borderSubtle}`,
      backgroundColor: colors.bgObsidian,
    }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} width={80} height={36} borderRadius={8} />
      ))}
    </div>
  )
}

/**
 * Skeleton for a section with title and content
 */
export function SkeletonSection({ hasIcon = true }: { hasIcon?: boolean }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: colors.bgCarbon,
      borderRadius: 12,
      border: `1px solid ${colors.borderSubtle}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {hasIcon && <Skeleton width={24} height={24} borderRadius={6} />}
        <Skeleton width={180} height={20} />
      </div>
      <SkeletonText lines={4} />
    </div>
  )
}

/**
 * Skeleton for code block
 */
export function SkeletonCodeBlock() {
  return (
    <div style={{
      backgroundColor: colors.codeBg,
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${colors.codeBorder}`,
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 16px',
        backgroundColor: colors.codeHeaderBg,
        borderBottom: `1px solid ${colors.codeBorder}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Skeleton width={80} height={16} borderRadius={4} />
        <Skeleton width={60} height={28} borderRadius={6} />
      </div>
      {/* Code lines */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[100, 85, 70, 90, 60, 80, 95, 50].map((width, i) => (
          <Skeleton key={i} width={`${width}%`} height={16} borderRadius={4} />
        ))}
      </div>
    </div>
  )
}

/**
 * Skeleton for the Understand phase
 */
export function SkeletonUnderstandPhase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Problem restatement */}
      <SkeletonSection />

      {/* Key insights */}
      <div style={{
        padding: 20,
        backgroundColor: colors.bgCarbon,
        borderRadius: 12,
        border: `1px solid ${colors.borderSubtle}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Skeleton width={24} height={24} borderRadius={6} />
          <Skeleton width={120} height={20} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              padding: 12,
              backgroundColor: colors.bgGraphite,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <Skeleton width={20} height={20} borderRadius={10} />
              <Skeleton width="80%" height={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <SkeletonSection hasIcon={true} />
    </div>
  )
}

/**
 * Skeleton for the Solution phase
 */
export function SkeletonSolutionPhase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Approach selector */}
      <div style={{ display: 'flex', gap: 12 }}>
        {[1, 2].map((i) => (
          <Skeleton key={i} width={140} height={44} borderRadius={8} />
        ))}
      </div>

      {/* Code block */}
      <SkeletonCodeBlock />

      {/* Walkthrough */}
      <SkeletonSection />
    </div>
  )
}

/**
 * Full modal skeleton
 */
export function SkeletonModal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: `1px solid ${colors.borderSubtle}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton width={300} height={24} />
          <Skeleton width={200} height={16} />
        </div>
        <Skeleton width={32} height={32} borderRadius={8} />
      </div>

      {/* Phase tabs */}
      <SkeletonPhaseTabs />

      {/* Content */}
      <div style={{ padding: 24, flex: 1, overflow: 'auto' }}>
        <SkeletonUnderstandPhase />
      </div>
    </div>
  )
}

export default Skeleton
