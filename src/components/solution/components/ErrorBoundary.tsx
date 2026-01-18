"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/typography'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  phaseName?: string
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary for catching render errors in phase components
 * Prevents the entire modal from crashing when one phase has bad data
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`ErrorBoundary caught error in ${this.props.phaseName || 'component'}:`, error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            padding: 24,
            backgroundColor: colors.errorMuted,
            borderRadius: 12,
            border: `1px solid ${colors.error}`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.error,
              marginBottom: 8,
            }}
          >
            Unable to load {this.props.phaseName || 'this section'}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            There was an issue rendering this content. The data may be malformed.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details
              style={{
                textAlign: 'left',
                backgroundColor: colors.bgCarbon,
                padding: 12,
                borderRadius: 8,
                fontSize: 12,
                fontFamily: fonts.mono,
              }}
            >
              <summary style={{ cursor: 'pointer', color: colors.textMuted }}>
                Error Details (dev only)
              </summary>
              <pre
                style={{
                  marginTop: 8,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  color: colors.error,
                }}
              >
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: 16,
              padding: '8px 16px',
              backgroundColor: colors.bgCarbon,
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: colors.textPrimary,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Wrapper component for phase content with error handling
 */
export function PhaseErrorBoundary({
  children,
  phaseName,
}: {
  children: ReactNode
  phaseName: string
}) {
  return (
    <ErrorBoundary phaseName={phaseName}>
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundary
