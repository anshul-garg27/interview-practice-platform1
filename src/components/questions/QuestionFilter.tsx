"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuestionFilterProps {
  topics: string[]
  difficulties: string[]
  selectedTopic: string | null
  selectedDifficulty: string | null
  onTopicChange: (topic: string | null) => void
  onDifficultyChange: (difficulty: string | null) => void
}

export function QuestionFilter({
  topics,
  difficulties,
  selectedTopic,
  selectedDifficulty,
  onTopicChange,
  onDifficultyChange,
}: QuestionFilterProps) {
  return (
    <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
      {/* Difficulty Filter */}
      <div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Difficulty
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedDifficulty === null ? "default" : "outline"}
            size="sm"
            onClick={() => onDifficultyChange(null)}
            className="text-xs"
          >
            All
          </Button>
          {difficulties.map((diff) => (
            <Button
              key={diff}
              variant={selectedDifficulty === diff ? "default" : "outline"}
              size="sm"
              onClick={() => onDifficultyChange(diff)}
              className={cn(
                "text-xs",
                selectedDifficulty === diff && diff === "easy" && "bg-emerald-500 hover:bg-emerald-600",
                selectedDifficulty === diff && diff === "medium" && "bg-amber-500 hover:bg-amber-600",
                selectedDifficulty === diff && diff === "hard" && "bg-red-500 hover:bg-red-600"
              )}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Topic Filter */}
      <div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Topics
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTopic === null ? "default" : "secondary"}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onTopicChange(null)}
          >
            All Topics
          </Badge>
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopic === topic ? "default" : "secondary"}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onTopicChange(topic)}
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedTopic || selectedDifficulty) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onTopicChange(null)
            onDifficultyChange(null)
          }}
          className="text-xs text-slate-500"
        >
          Clear all filters
        </Button>
      )}
    </div>
  )
}
