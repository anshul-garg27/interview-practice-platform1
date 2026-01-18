"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ExperienceCard } from "@/components/experiences/ExperienceCard"
import { ExperienceFilters } from "@/components/experiences/ExperienceFilters"
import { ExperienceStats } from "@/components/experiences/ExperienceStats"
import { 
  allExperiences, 
  filterExperiences, 
  getOutcome,
  getExperienceStatistics,
  getAllCodingQuestions
} from "@/data/experiences"

export default function ExperiencesPage() {
  const [selectedOutcome, setSelectedOutcome] = useState("all")
  const [selectedPostType, setSelectedPostType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Get statistics
  const stats = useMemo(() => getExperienceStatistics(), [])
  const codingQuestionsCount = useMemo(() => getAllCodingQuestions().length, [])

  // Filter experiences
  const filteredExperiences = useMemo(() => {
    return filterExperiences(allExperiences, {
      outcome: selectedOutcome as 'all' | 'accepted' | 'rejected' | 'pending' | 'unknown',
      postType: selectedPostType as 'all' | 'experience' | 'question_share' | 'help_request',
      search: searchQuery,
    })
  }, [selectedOutcome, selectedPostType, searchQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Real Interview Experiences
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Browse {stats.total} real interview experiences from Rippling candidates.
          Learn from their successes and mistakes.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <ExperienceStats
          total={stats.total}
          accepted={stats.outcomes.accepted}
          rejected={stats.outcomes.rejected}
          pending={stats.outcomes.pending}
          codingQuestions={codingQuestionsCount}
        />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <ExperienceFilters
          selectedOutcome={selectedOutcome}
          selectedPostType={selectedPostType}
          searchQuery={searchQuery}
          onOutcomeChange={setSelectedOutcome}
          onPostTypeChange={setSelectedPostType}
          onSearchChange={setSearchQuery}
        />
      </motion.div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredExperiences.length} of {allExperiences.length} experiences
        </p>
        {(selectedOutcome !== 'all' || selectedPostType !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedOutcome('all')
              setSelectedPostType('all')
              setSearchQuery('')
            }}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Experience List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredExperiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
          />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No experiences found
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  )
}
