"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CompanyData } from "@/lib/types"
import { getCompanyStats } from "@/data/companies"
import { getDifficultyColor } from "@/lib/utils"

interface CompanyCardProps {
  company: CompanyData
  index: number
}

const companyLogos: Record<string, string> = {
  rippling: "🌊",
  google: "🔍",
  amazon: "📦",
  microsoft: "🪟",
  meta: "👤",
  apple: "🍎",
}

export function CompanyCard({ company, index }: CompanyCardProps) {
  const stats = getCompanyStats(company)
  const logo = companyLogos[company.company.toLowerCase()] || "🏢"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/company/${company.company.toLowerCase()}`}>
        <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 border-slate-200 dark:border-slate-800">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
          </div>

          <CardHeader className="relative pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-3xl shadow-inner">
                  {logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {company.company}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stats.totalRounds} rounds • {company.interview_process.typical_timeline}
                  </p>
                </div>
              </div>
              <Badge
                className={getDifficultyColor(company.overall_difficulty)}
                variant="outline"
              >
                {company.overall_difficulty.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-slate-50 dark:bg-slate-900/50 p-3 text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {stats.codingQuestions}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Coding
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-900/50 p-3 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.systemDesign}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  System Design
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-900/50 p-3 text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {stats.behavioral}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Behavioral
                </div>
              </div>
            </div>

            {/* Top Topics */}
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                Top Topics
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stats.topTopics.slice(0, 4).map((topic) => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className="text-xs bg-slate-100 dark:bg-slate-800"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pass Rate */}
            {company.pass_rate_estimate && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">
                    Estimated Pass Rate
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {company.pass_rate_estimate}
                  </span>
                </div>
                <Progress value={25} className="h-1.5" />
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {stats.totalQuestions} questions total
              </span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                View Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
