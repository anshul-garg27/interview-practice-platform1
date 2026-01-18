export interface CodingQuestion {
  question: string
  topic: string
  difficulty: string
  round: string
  leetcode_similar?: string
  approach_hint?: string
  subtopics?: string[]
  follow_ups?: string[]
  gotchas?: string[]
}

export interface SystemDesignQuestion {
  question: string
  key_components: string[]
  scale?: string
}

export interface BehavioralQuestion {
  question: string
  what_they_look_for: string
}

export interface InterviewRound {
  name: string
  type: string
  duration: string
  description: string
  questions: string[]
  skills_tested: string[]
  difficulty: string
  tips: string
}

export interface InterviewProcess {
  total_rounds: string
  round_types: string[]
  typical_timeline: string
}

export interface CompanyData {
  company: string
  interview_process: InterviewProcess
  rounds: InterviewRound[]
  coding_questions: CodingQuestion[]
  system_design_questions: SystemDesignQuestion[]
  behavioral_questions: BehavioralQuestion[]
  success_tips: string[]
  mistakes_to_avoid: string[]
  preparation: {
    focus_topics: string[]
    recommended_problems: string[]
    resources: string[]
    time_needed: string
  }
  overall_difficulty: string
  pass_rate_estimate?: string
  summary?: string
}

export interface CompanyStats {
  totalQuestions: number
  codingQuestions: number
  systemDesign: number
  behavioral: number
  avgDifficulty: string
  topTopics: string[]
  totalRounds: number
}

// ============================================
// Interview Experience Types (Real Data)
// ============================================

export interface ExperienceMetadata {
  title: string
  post_type: 'experience' | 'question_share' | 'help_request' | 'general_query'
  position_level: string
  location: string
  yoe: string
  application_source: string
  interview_date: string
  team_department: string
  compensation: string | null
}

export interface ExperienceOutcome {
  result: 'accepted' | 'rejected' | 'pending' | 'ghosted' | 'unknown'
  time_to_response: string
  feedback_received: string | null
  rejection_reasons: string[]
}

export interface ExperienceInterviewProcess {
  total_rounds: number | string
  process_duration: string
  ai_tools_allowed: boolean | string
  platforms?: string
  [key: string]: unknown
}

export interface ExperienceRoundQuestion {
  question: string
  topic: string
  difficulty: string
  follow_ups: string[]
  approach: string
  leetcode_similar: string | null
  language_used: string
  time_taken: string
  gotchas: string[]
  candidate_performance: string
}

export interface ExperienceRound {
  round_number: number
  name: string
  type: string
  duration: string
  difficulty: string
  is_elimination: boolean | string
  interviewer_notes: string
  questions: ExperienceRoundQuestion[]
  tips: string
  verdict?: string
  [key: string]: unknown
}

export interface ExperienceCodingQuestion {
  question: string
  topic: string
  subtopics?: string[]
  difficulty: string
  round: string
  follow_ups?: string[]
  approach?: string
  leetcode_similar?: string | null
  language?: string
  gotchas?: string[]
  sample_input?: string
  sample_output?: string
  from_round?: string
  [key: string]: unknown
}

export interface ExperienceSystemDesign {
  question: string
  round?: string
  scale_requirements?: {
    qps: string
    storage: string
    users: string
    [key: string]: string
  }
  components?: string[]
  key_components?: string[]
  key_topics?: string[]
  approach?: string
  feedback?: string
  scale?: string
  [key: string]: unknown
}

export interface ExperienceBehavioral {
  question: string
  what_they_look_for: string
  candidate_answer?: string
}

export interface ExperienceSourceMeta {
  source_title: string
  source_url: string
  source_author: string
  source_date: string
  analyzed_at: string
}

export interface InterviewExperience {
  id: string
  folder: string
  metadata: ExperienceMetadata
  outcome: ExperienceOutcome | string
  interview_process: ExperienceInterviewProcess
  rounds: ExperienceRound[]
  coding_questions: ExperienceCodingQuestion[]
  system_design: ExperienceSystemDesign[]
  behavioral: ExperienceBehavioral[]
  key_learnings: string[]
  preparation_tips: string[]
  mistakes_made: string[]
  red_flags: string[]
  overall_difficulty: string
  summary: string
  _meta: ExperienceSourceMeta
  // Additional fields from raw data
  views?: number
  comments?: number
  tags?: string[]
  interview_verdicts_summary?: Record<string, string>
  [key: string]: unknown
}

export interface ExperienceIndex {
  company: string
  total_fetched: number
  fetched_at: string
  experiences: {
    folder: string
    title: string
    url: string
    analyzed: boolean
  }[]
}

export type OutcomeFilter = 'all' | 'accepted' | 'rejected' | 'pending' | 'unknown'
export type LevelFilter = 'all' | 'SDE-1' | 'SDE-2' | 'Senior' | 'Staff' | 'L6' | 'L7' | 'L8'
export type PostTypeFilter = 'all' | 'experience' | 'question_share' | 'help_request'
