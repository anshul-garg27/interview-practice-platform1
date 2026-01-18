"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExperienceFiltersProps {
  selectedOutcome: string
  selectedPostType: string
  searchQuery: string
  onOutcomeChange: (outcome: string) => void
  onPostTypeChange: (postType: string) => void
  onSearchChange: (search: string) => void
}

const outcomes = [
  { value: 'all', label: 'All Outcomes' },
  { value: 'accepted', label: '✅ Accepted' },
  { value: 'rejected', label: '❌ Rejected' },
  { value: 'pending', label: '⏳ Pending' },
]

const postTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'experience', label: '📝 Experiences' },
  { value: 'question_share', label: '❓ Questions' },
  { value: 'help_request', label: '🆘 Help Requests' },
]

export function ExperienceFilters({
  selectedOutcome,
  selectedPostType,
  searchQuery,
  onOutcomeChange,
  onPostTypeChange,
  onSearchChange,
}: ExperienceFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
      {/* Search */}
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
          Search
        </label>
        <input
          type="text"
          placeholder="Search experiences..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Outcome Filter */}
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
          Outcome
        </label>
        <div className="flex flex-wrap gap-2">
          {outcomes.map((outcome) => (
            <Button
              key={outcome.value}
              variant={selectedOutcome === outcome.value ? "default" : "outline"}
              size="sm"
              onClick={() => onOutcomeChange(outcome.value)}
              className={cn(
                "text-xs",
                selectedOutcome === outcome.value && outcome.value === 'accepted' && "bg-emerald-500 hover:bg-emerald-600",
                selectedOutcome === outcome.value && outcome.value === 'rejected' && "bg-red-500 hover:bg-red-600",
                selectedOutcome === outcome.value && outcome.value === 'pending' && "bg-amber-500 hover:bg-amber-600"
              )}
            >
              {outcome.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Post Type Filter */}
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
          Post Type
        </label>
        <div className="flex flex-wrap gap-2">
          {postTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedPostType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => onPostTypeChange(type.value)}
              className="text-xs"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
