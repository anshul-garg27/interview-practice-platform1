"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InterviewRound } from "@/lib/types"
import { getDifficultyColor } from "@/lib/utils"

interface InterviewTimelineProps {
  rounds: InterviewRound[]
}

const roundTypeIcons: Record<string, string> = {
  technical: "💻",
  behavioral: "🗣️",
  "system design": "🏗️",
  hr: "👔",
  hiring_manager: "👔",
}

export function InterviewTimeline({ rounds }: InterviewTimelineProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
            <path d="M12 20v-6M6 20V10M18 20V4"/>
          </svg>
          Interview Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

          <div className="space-y-6">
            {rounds.map((round, index) => (
              <motion.div
                key={round.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-2 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>

                {/* Round number badge */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {index + 1}
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {roundTypeIcons[round.type.toLowerCase()] || "📋"}
                      </span>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {round.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {round.duration}
                      </Badge>
                      <Badge className={getDifficultyColor(round.difficulty)} variant="outline">
                        {round.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {round.description}
                  </p>

                  {/* Skills tested */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                      Skills Tested
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {round.skills_tested.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Questions preview */}
                  {round.questions.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        Sample Questions ({round.questions.length})
                      </div>
                      <ul className="space-y-1">
                        {round.questions.slice(0, 3).map((q, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                          >
                            <span className="text-indigo-500 mt-1">•</span>
                            <span className="line-clamp-1">{q}</span>
                          </li>
                        ))}
                        {round.questions.length > 3 && (
                          <li className="text-xs text-indigo-500">
                            +{round.questions.length - 3} more questions
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {round.tips && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800/30">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500">💡</span>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          {round.tips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
