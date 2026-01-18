"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CodingQuestion } from "@/lib/types"
import { getDifficultyColor } from "@/lib/utils"

interface QuestionCardProps {
  question: CodingQuestion
  index: number
  showHint?: boolean
}

export function QuestionCard({ question, index, showHint = false }: QuestionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group relative overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold">
                {index + 1}
              </div>
              <Badge className={getDifficultyColor(question.difficulty)} variant="outline">
                {question.difficulty.toUpperCase()}
              </Badge>
            </div>
            <Badge variant="secondary" className="text-xs">
              {question.round}
            </Badge>
          </div>

          {/* Question */}
          <h4 className="font-medium text-slate-900 dark:text-white mb-3 leading-relaxed">
            {question.question}
          </h4>

          {/* Topics */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs">
              {question.topic}
            </Badge>
            {question.subtopics?.map((subtopic) => (
              <Badge
                key={subtopic}
                variant="secondary"
                className="text-xs"
              >
                {subtopic}
              </Badge>
            ))}
          </div>

          {/* LeetCode Similar */}
          {question.leetcode_similar && (
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className="text-slate-500 dark:text-slate-400">Similar:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {question.leetcode_similar}
              </span>
            </div>
          )}

          {/* Expandable content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Approach Hint */}
                {question.approach_hint && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 mb-3 border border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500">💡</span>
                      <div>
                        <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                          Approach Hint
                        </div>
                        <p className="text-sm text-emerald-800 dark:text-emerald-200">
                          {question.approach_hint}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Follow-ups */}
                {question.follow_ups && question.follow_ups.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      Follow-up Questions
                    </div>
                    <ul className="space-y-1">
                      {question.follow_ups.map((followUp, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                        >
                          <span className="text-purple-500">→</span>
                          {followUp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gotchas */}
                {question.gotchas && question.gotchas.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800/30">
                    <div className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-2">
                      ⚠️ Watch Out For
                    </div>
                    <ul className="space-y-1">
                      {question.gotchas.map((gotcha, i) => (
                        <li
                          key={i}
                          className="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2"
                        >
                          <span>•</span>
                          {gotcha}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              {isExpanded ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                  Show More
                </>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Mark as Practiced
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
