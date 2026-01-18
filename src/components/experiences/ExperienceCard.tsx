"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InterviewExperience } from "@/lib/types"
import { 
  getTitle, 
  getOutcome, 
  getPositionLevel, 
  getPostType,
  getSourceDate,
  formatExperienceDate 
} from "@/data/experiences"
import { cn } from "@/lib/utils"

interface ExperienceCardProps {
  experience: InterviewExperience
  index: number
}

const outcomeColors: Record<string, string> = {
  accepted: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  offer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
  reject: "bg-red-500/10 text-red-600 border-red-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  ghosted: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  unknown: "bg-slate-500/10 text-slate-600 border-slate-500/20",
}

const postTypeIcons: Record<string, string> = {
  experience: "📝",
  question_share: "❓",
  help_request: "🆘",
  general_query: "💬",
  inquiry: "🔍",
}

function getOutcomeColor(outcome: string): string {
  const lowerOutcome = outcome.toLowerCase()
  for (const [key, value] of Object.entries(outcomeColors)) {
    if (lowerOutcome.includes(key)) return value
  }
  return outcomeColors.unknown
}

function getPostTypeIcon(postType: string): string {
  const lowerType = postType.toLowerCase()
  for (const [key, value] of Object.entries(postTypeIcons)) {
    if (lowerType.includes(key)) return value
  }
  return "📄"
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const title = getTitle(experience)
  const outcome = getOutcome(experience)
  const level = getPositionLevel(experience)
  const postType = getPostType(experience)
  const date = formatExperienceDate(getSourceDate(experience))
  
  const codingCount = experience.coding_questions?.length || 0
  const roundsCount = experience.rounds?.length || 0
  const hasSystemDesign = (experience.system_design?.length || 0) > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/experience/${experience.id}`}>
        <Card className="group cursor-pointer border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">{getPostTypeIcon(postType)}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {date}
                  </p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={cn("flex-shrink-0 capitalize", getOutcomeColor(outcome))}
              >
                {outcome}
              </Badge>
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {level && level !== 'unknown' && (
                <Badge variant="secondary" className="text-xs">
                  {level}
                </Badge>
              )}
              {experience.overall_difficulty && experience.overall_difficulty !== 'unknown' && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    experience.overall_difficulty === 'hard' && "text-red-500 border-red-500/30",
                    experience.overall_difficulty === 'medium' && "text-amber-500 border-amber-500/30",
                    experience.overall_difficulty === 'easy' && "text-emerald-500 border-emerald-500/30"
                  )}
                >
                  {experience.overall_difficulty}
                </Badge>
              )}
            </div>

            {/* Summary */}
            {experience.summary && (
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                {experience.summary}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              {roundsCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="text-indigo-500">🎯</span>
                  {roundsCount} rounds
                </span>
              )}
              {codingCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="text-purple-500">💻</span>
                  {codingCount} questions
                </span>
              )}
              {hasSystemDesign && (
                <span className="flex items-center gap-1">
                  <span className="text-pink-500">🏗️</span>
                  System Design
                </span>
              )}
              {(experience.views ?? 0) > 0 && (
                <span className="flex items-center gap-1 ml-auto">
                  👁️ {experience.views}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
