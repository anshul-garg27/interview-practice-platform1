"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface ExperienceStatsProps {
  total: number
  accepted: number
  rejected: number
  pending: number
  codingQuestions: number
}

export function ExperienceStats({ 
  total, 
  accepted, 
  rejected, 
  pending,
  codingQuestions 
}: ExperienceStatsProps) {
  const passRate = total > 0 ? Math.round((accepted / total) * 100) : 0

  const stats = [
    {
      label: "Total Experiences",
      value: total,
      icon: "📚",
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Offers Received",
      value: accepted,
      icon: "✅",
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Rejections",
      value: rejected,
      icon: "❌",
      color: "from-red-500 to-pink-500",
    },
    {
      label: "Pass Rate",
      value: `${passRate}%`,
      icon: "📊",
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Coding Questions",
      value: codingQuestions,
      icon: "💻",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardContent className="p-4 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{stat.icon}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
