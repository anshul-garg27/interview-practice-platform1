import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    case 'medium':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    case 'hard':
      return 'text-red-500 bg-red-500/10 border-red-500/20'
    default:
      return 'text-slate-500 bg-slate-500/10 border-slate-500/20'
  }
}

export function getDifficultyBadgeColor(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'bg-emerald-500'
    case 'medium':
      return 'bg-amber-500'
    case 'hard':
      return 'bg-red-500'
    default:
      return 'bg-slate-500'
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function formatDuration(duration: string): string {
  return duration || '45-60 min'
}
