"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { allCompanies, getCompanyStats } from "@/data/companies"

export function StatsOverview() {
  // Calculate aggregate stats
  const totalCompanies = allCompanies.length
  const totalQuestions = allCompanies.reduce((acc, company) => {
    const stats = getCompanyStats(company)
    return acc + stats.totalQuestions
  }, 0)
  const totalCoding = allCompanies.reduce((acc, company) => {
    const stats = getCompanyStats(company)
    return acc + stats.codingQuestions
  }, 0)
  const totalSystemDesign = allCompanies.reduce((acc, company) => {
    const stats = getCompanyStats(company)
    return acc + stats.systemDesign
  }, 0)

  const stats = [
    {
      label: "Companies",
      value: totalCompanies,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
          <path d="M12 3v6"/>
        </svg>
      ),
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-500/10",
    },
    {
      label: "Total Questions",
      value: totalQuestions,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Coding Problems",
      value: totalCoding,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "System Design",
      value: totalSystemDesign,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1"/>
          <rect width="7" height="7" x="14" y="3" rx="1"/>
          <rect width="7" height="7" x="14" y="14" rx="1"/>
          <rect width="7" height="7" x="3" y="14" rx="1"/>
        </svg>
      ),
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden border-slate-200 dark:border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </CardContent>
            {/* Decorative gradient */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2`} />
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
