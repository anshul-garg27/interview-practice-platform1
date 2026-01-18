"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../constants/colors'

// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (type: ToastType, message: string, duration?: number) => void
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

// Toast icons
const icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

// Toast colors
const toastColors: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
  success: {
    bg: colors.successMuted,
    border: colors.success,
    icon: colors.success,
    text: colors.textPrimary,
  },
  error: {
    bg: colors.errorMuted,
    border: colors.error,
    icon: colors.error,
    text: colors.textPrimary,
  },
  warning: {
    bg: colors.warningMuted,
    border: colors.warning,
    icon: colors.warningText,
    text: colors.textPrimary,
  },
  info: {
    bg: colors.infoMuted,
    border: colors.info,
    icon: colors.info,
    text: colors.textPrimary,
  },
}

/**
 * Individual Toast component
 */
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const colorSet = toastColors[toast.type]

  useEffect(() => {
    const timer = setTimeout(onRemove, toast.duration || 3000)
    return () => clearTimeout(timer)
  }, [toast.duration, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        backgroundColor: colorSet.bg,
        border: `1px solid ${colorSet.border}`,
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        minWidth: 280,
        maxWidth: 400,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: colorSet.border,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: '#FFFFFF',
          flexShrink: 0,
        }}
      >
        {icons[toast.type]}
      </div>

      {/* Message */}
      <p style={{
        flex: 1,
        fontSize: 14,
        fontWeight: 500,
        color: colorSet.text,
        margin: 0,
        lineHeight: 1.4,
      }}>
        {toast.message}
      </p>

      {/* Close button */}
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          padding: 4,
          cursor: 'pointer',
          color: colors.textMuted,
          fontSize: 16,
          lineHeight: 1,
          borderRadius: 4,
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = colors.textPrimary)}
        onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </motion.div>
  )
}

/**
 * Toast container - renders all active toasts
 */
function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * Toast Provider - wrap your app with this
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setToasts((prev) => [...prev, { id, type, message, duration }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback((message: string, duration?: number) => addToast('success', message, duration), [addToast])
  const error = useCallback((message: string, duration?: number) => addToast('error', message, duration), [addToast])
  const warning = useCallback((message: string, duration?: number) => addToast('warning', message, duration), [addToast])
  const info = useCallback((message: string, duration?: number) => addToast('info', message, duration), [addToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

/**
 * Hook to use toast notifications
 *
 * Usage:
 *   const toast = useToast()
 *   toast.success('Copied to clipboard!')
 *   toast.error('Failed to save')
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastProvider
