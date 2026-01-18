import { InterviewExperience, OutcomeFilter, LevelFilter, PostTypeFilter } from '@/lib/types'
import experiencesData from '../../public/data/experiences.json'

// Type for the raw data structure
interface ExperiencesDataFile {
  company: string
  generated_at: string
  stats: {
    total_experiences: number
    outcomes: Record<string, number>
    post_types: Record<string, number>
    levels: Record<string, number>
    difficulties: Record<string, number>
  }
  experiences: InterviewExperience[]
}

const data = experiencesData as ExperiencesDataFile

// Export all experiences
export const allExperiences: InterviewExperience[] = data.experiences

// Export stats
export const experienceStats = data.stats

// Get experience by ID (folder name)
export function getExperienceById(id: string): InterviewExperience | undefined {
  return allExperiences.find(exp => exp.id === id || exp.folder === id)
}

// Get outcome from experience (handles both formats)
export function getOutcome(exp: InterviewExperience): string {
  if (!exp.outcome) return 'unknown'
  if (typeof exp.outcome === 'string') return exp.outcome
  return exp.outcome.result || 'unknown'
}

// Get position level from experience
export function getPositionLevel(exp: InterviewExperience): string {
  if (!exp.metadata) return 'unknown'
  if (typeof exp.metadata === 'object') {
    return exp.metadata.position_level || 'unknown'
  }
  return 'unknown'
}

// Get post type from experience
export function getPostType(exp: InterviewExperience): string {
  if (!exp.metadata) return 'unknown'
  if (typeof exp.metadata === 'object') {
    return exp.metadata.post_type || 'unknown'
  }
  return 'unknown'
}

// Get title from experience
export function getTitle(exp: InterviewExperience): string {
  // Try metadata title first
  if (exp.metadata && typeof exp.metadata === 'object' && exp.metadata.title) {
    return exp.metadata.title
  }
  // Try _meta source_title
  if (exp._meta && exp._meta.source_title) {
    return exp._meta.source_title
  }
  // Fallback to folder name
  return exp.folder || exp.id || 'Untitled Experience'
}

// Get source URL
export function getSourceUrl(exp: InterviewExperience): string | null {
  return exp._meta?.source_url || null
}

// Get source date
export function getSourceDate(exp: InterviewExperience): string | null {
  return exp._meta?.source_date || null
}

// Format date for display
export function formatExperienceDate(dateStr: string | null): string {
  if (!dateStr) return 'Unknown date'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateStr
  }
}

// Filter experiences
export function filterExperiences(
  experiences: InterviewExperience[],
  filters: {
    outcome?: OutcomeFilter
    level?: LevelFilter
    postType?: PostTypeFilter
    search?: string
  }
): InterviewExperience[] {
  return experiences.filter(exp => {
    // Outcome filter
    if (filters.outcome && filters.outcome !== 'all') {
      const outcome = getOutcome(exp).toLowerCase()
      if (!outcome.includes(filters.outcome.toLowerCase())) {
        return false
      }
    }

    // Level filter
    if (filters.level && filters.level !== 'all') {
      const level = getPositionLevel(exp).toLowerCase()
      if (!level.includes(filters.level.toLowerCase())) {
        return false
      }
    }

    // Post type filter
    if (filters.postType && filters.postType !== 'all') {
      const postType = getPostType(exp).toLowerCase()
      if (!postType.includes(filters.postType.toLowerCase())) {
        return false
      }
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const title = getTitle(exp).toLowerCase()
      const summary = (exp.summary || '').toLowerCase()
      if (!title.includes(searchLower) && !summary.includes(searchLower)) {
        return false
      }
    }

    return true
  })
}

// Get unique values for filters
export function getUniqueOutcomes(): string[] {
  const outcomes = new Set<string>()
  allExperiences.forEach(exp => {
    outcomes.add(getOutcome(exp))
  })
  return Array.from(outcomes).sort()
}

export function getUniqueLevels(): string[] {
  const levels = new Set<string>()
  allExperiences.forEach(exp => {
    levels.add(getPositionLevel(exp))
  })
  return Array.from(levels).sort()
}

export function getUniquePostTypes(): string[] {
  const types = new Set<string>()
  allExperiences.forEach(exp => {
    types.add(getPostType(exp))
  })
  return Array.from(types).sort()
}

// Get experiences with actual interview content (not just help requests)
export function getActualExperiences(): InterviewExperience[] {
  return allExperiences.filter(exp => {
    const postType = getPostType(exp).toLowerCase()
    return postType === 'experience' || postType === 'question_share'
  })
}

// Get experiences by outcome
export function getExperiencesByOutcome(outcome: string): InterviewExperience[] {
  return allExperiences.filter(exp => {
    return getOutcome(exp).toLowerCase().includes(outcome.toLowerCase())
  })
}

// Calculate pass rate
export function calculatePassRate(): number {
  const total = allExperiences.length
  const accepted = allExperiences.filter(exp => {
    const outcome = getOutcome(exp).toLowerCase()
    return outcome.includes('accepted') || outcome.includes('offer')
  }).length
  return total > 0 ? Math.round((accepted / total) * 100) : 0
}

// Get all coding questions from experiences
export function getAllCodingQuestions() {
  const questions: Array<{
    question: string
    topic: string
    difficulty: string
    round: string
    experienceId: string
    experienceTitle: string
    approach?: string
    leetcode_similar?: string
    gotchas?: string[]
    follow_ups?: string[]
  }> = []

  allExperiences.forEach(exp => {
    if (exp.coding_questions && Array.isArray(exp.coding_questions)) {
      exp.coding_questions.forEach(q => {
        if (q.question && q.question.length > 10) {
          questions.push({
            question: q.question,
            topic: q.topic || 'Unknown',
            difficulty: q.difficulty || 'unknown',
            round: q.round || q.from_round || 'Unknown',
            experienceId: exp.id,
            experienceTitle: getTitle(exp),
            approach: q.approach,
            leetcode_similar: q.leetcode_similar || undefined,
            gotchas: q.gotchas,
            follow_ups: q.follow_ups
          })
        }
      })
    }
  })

  return questions
}

// Get experience statistics
export function getExperienceStatistics() {
  const actualExperiences = getActualExperiences()
  const outcomes = {
    accepted: 0,
    rejected: 0,
    pending: 0,
    unknown: 0
  }

  actualExperiences.forEach(exp => {
    const outcome = getOutcome(exp).toLowerCase()
    if (outcome.includes('accepted') || outcome.includes('offer')) {
      outcomes.accepted++
    } else if (outcome.includes('rejected') || outcome.includes('reject')) {
      outcomes.rejected++
    } else if (outcome.includes('pending')) {
      outcomes.pending++
    } else {
      outcomes.unknown++
    }
  })

  return {
    total: allExperiences.length,
    actualExperiences: actualExperiences.length,
    outcomes,
    passRate: calculatePassRate(),
    codingQuestions: getAllCodingQuestions().length
  }
}
