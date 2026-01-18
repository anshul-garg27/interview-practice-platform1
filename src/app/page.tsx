"use client"

import { motion } from "framer-motion"
import { CompanyCard } from "@/components/dashboard/CompanyCard"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { allCompanies } from "@/data/companies"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Your Tech Interviews
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Real interview experiences, curated questions, and expert tips from top tech companies.
          Prepare smarter, not harder.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <StatsOverview />
      </motion.div>

      {/* Companies Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Companies
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select a company to view detailed interview insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {allCompanies.map((company, index) => (
            <CompanyCard key={company.company} company={company} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Quick Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-800/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Quick Start Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Choose Your Target
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Select the company you&apos;re interviewing with to see tailored content
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500 text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Study the Pattern
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Review the interview timeline and common question types
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500 text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Practice Daily
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Use the practice mode to drill questions and track progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
