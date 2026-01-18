/**
 * TypeScript types for Practice Solution data
 * Replaces ~45 'any' types with proper interfaces
 */

import type { Phase } from '../constants/colors'

// ─────────────────────────────────────────────────────────────────────────────
// MAIN INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface PracticeSolutionModalProps {
  isOpen: boolean
  onClose: () => void
  solution: PracticeSolution | null
  problemTitle?: string
}

export interface PracticeSolution {
  problem_title?: string
  difficulty?: string
  category?: string
  estimated_time?: string
  part_number?: number
  builds_on?: string
  problem_analysis?: ProblemAnalysis
  visual_explanation?: VisualExplanation
  thinking_process?: ThinkingProcess
  problem_understanding?: ProblemUnderstanding
  approaches?: Approach[]
  optimal_solution?: OptimalSolution
  solution_python?: string
  solution_java?: string
  solution_python_lines?: string[]
  solution_java_lines?: string[]
  code_walkthrough?: CodeWalkthroughItem[]
  complexity_analysis?: ComplexityAnalysis
  dry_run?: DryRun
  test_cases?: TestCase[]
  edge_cases?: EdgeCase[]
  common_mistakes?: CommonMistake[]
  interview_tips?: InterviewTips
  pattern_recognition?: PatternRecognition
  follow_up_preparation?: FollowUpPreparation
  requirements_coverage?: RequirementsCoverage
  assumptions?: string[]
  tradeoffs?: Tradeoff[]
  extensibility_and_followups?: ExtensibilityAndFollowups
  extensibility_notes?: ExtensibilityNotes
  debugging_strategy?: DebuggingStrategy
  debugging_playbook?: DebuggingPlaybook
  communication_script?: CommunicationScript
  interviewer_perspective?: InterviewerPerspective
  time_milestones?: TimeMilestones
  recovery_strategies?: RecoveryStrategies
  ai_copilot_tips?: AICopilotTips
  signal_points?: SignalPoints
  red_flags_to_avoid?: RedFlagsToAvoid
  final_checklist?: FinalChecklist
  production_considerations?: ProductionConsiderations
  connection_to_next_part?: string
  generated_at?: string
  _meta?: Record<string, unknown>
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBLEM ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

export interface ProblemAnalysis {
  first_impressions?: string
  pattern_recognition?: string
  key_constraints?: string[]
  clarifying_questions?: string[]
  edge_cases_to_consider?: string[]
}

export interface ProblemUnderstanding {
  what_changes?: string
  new_requirements?: string[]
  new_constraints?: string[]
  key_insight?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// VISUAL EXPLANATION
// ─────────────────────────────────────────────────────────────────────────────

export interface VisualExplanation {
  problem_visualization?: string
  data_structure_state?: string
  before_after?: string
  algorithm_flow?: string | AlgorithmFlowStep[]
  dry_run_table?: string
}

export interface AlgorithmFlowStep {
  step?: number
  description: string
  visualization?: string
  key_point?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// THINKING PROCESS & APPROACHES
// ─────────────────────────────────────────────────────────────────────────────

export interface ThinkingProcess {
  step_by_step?: string[]
  key_insight?: string
  why_this_works?: string
}

export interface Approach {
  name: string
  description: string
  time_complexity: string
  space_complexity: string
  why_not_optimal?: string
  key_insight?: string
  pseudocode?: string
}

export interface OptimalSolution {
  name?: string
  explanation_md?: string
  data_structures?: DataStructure[]
  algorithm_steps?: string[]
  why_decimal?: string
}

export interface DataStructure {
  structure: string
  purpose: string
}

// ─────────────────────────────────────────────────────────────────────────────
// CODE & COMPLEXITY
// ─────────────────────────────────────────────────────────────────────────────

export interface CodeWalkthroughItem {
  lines?: string
  section?: string
  explanation: string
}

export interface ComplexityAnalysis {
  time: string | TimeComplexityObject
  space: string | SpaceComplexityObject
  can_we_do_better?: string
}

export interface TimeComplexityObject {
  new_methods?: Record<string, string | { complexity: string; explanation?: string }>
  modified_methods?: Record<string, { was: string; now: string; explanation?: string }>
  overall_change?: string
  [key: string]: unknown
}

export interface SpaceComplexityObject {
  additional_space?: string
  complexity?: string
  explanation?: string
  breakdown?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────

export interface DryRun {
  example?: string
  trace_table?: string
  final_answer?: string
  example_input?: string
  steps?: DryRunStep[]
  expected_output?: string
  final_output?: string
}

export interface DryRunStep {
  step: number
  action: string
  state?: string
  explanation?: string
}

export interface TestCase {
  name: string
  input: string
  expected: string
  category?: string
  explanation?: string
  gotcha?: string
}

export interface EdgeCase {
  case?: string
  expected?: string
  why_important?: string
  handling?: string
  gotcha?: string
}

export interface CommonMistake {
  mistake: string
  why_wrong?: string
  correct_approach?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// DEBUGGING
// ─────────────────────────────────────────────────────────────────────────────

export interface DebuggingStrategy {
  how_to_test_incrementally?: string
  what_to_print_or_assert?: string[]
  common_failure_modes?: string[]
}

export interface DebuggingPlaybook {
  fast_sanity_checks?: string[]
  likely_bugs?: string[]
  recommended_logs_or_asserts?: string[]
  how_to_localize?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERVIEW MASTERY
// ─────────────────────────────────────────────────────────────────────────────

export interface CommunicationScript {
  opening_verbatim?: string
  after_clarification?: string
  while_coding?: string[]
  after_coding?: string
  when_stuck_verbatim?: string
  // Follow-up format
  transition_from_previous?: string
  explaining_changes?: string
  while_extending_code?: string[]
  after_completing?: string
}

export interface InterviewTips {
  opening?: string
  how_to_present?: string
  clarifying_questions_to_ask?: string[]
  what_to_mention_proactively?: string[]
  what_to_mention?: string[]
  communication_during_coding?: string[]
  time_management?: string
  time_allocation?: string
  if_stuck?: string[]
}

export interface InterviewerPerspective {
  what_they_evaluate?: string[]
  bonus_points?: string[]
}

export interface TimeMilestones {
  time_budget?: string
  by_2_min?: string
  by_5_min?: string
  by_10_min?: string
  by_20_min?: string
  warning_signs?: string
}

export interface RecoveryStrategies {
  when_completely_stuck?: string
  when_you_make_a_bug?: string
  if_part_builds_wrong?: string
  if_new_requirement_unclear?: string
  if_running_behind?: string
  when_you_dont_know_syntax?: string
  when_approach_is_wrong?: string
  when_running_out_of_time?: string
}

export interface SignalPoints {
  wow_factors?: string[]
  wow_factors_for_followup?: string[]
  subtle_signals_of_experience?: string[]
}

export interface RedFlagsToAvoid {
  behavioral?: string[]
  technical?: string[]
  communication?: string[]
}

export interface FinalChecklist {
  before_saying_done?: string[]
  quick_code_review?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTENSIBILITY
// ─────────────────────────────────────────────────────────────────────────────

export interface RequirementsCoverage {
  checklist?: RequirementChecklistItem[]
  complexity_targets?: ComplexityTarget[]
  non_goals?: string[]
}

export interface RequirementChecklistItem {
  requirement: string
  how_met: string
  gotchas?: string[]
}

export interface ComplexityTarget {
  operation: string
  target: string
  achieved: string
  why?: string
}

export interface Tradeoff {
  decision: string
  chosen: string
  alternative?: string
  why: string
  when_to_switch?: string
}

export interface ExtensibilityAndFollowups {
  design_principles?: string[]
  why_this_design_scales?: string
  expected_followup_hooks?: string[]
  invariants?: string[]
}

export interface ExtensibilityNotes {
  what_to_keep_stable?: string[]
  what_to_change?: string[]
  interfaces_and_boundaries?: string
  invariants?: string[]
}

export interface PatternRecognition {
  pattern?: string
  pattern_name?: string
  indicators?: string[]
  similar_problems?: string[]
  template?: string
}

export interface FollowUpPreparation {
  part_2_hint?: string
  part_3_hint?: string
  part_4_hint?: string
  data_structure_evolution?: string
}

export interface AICopilotTips {
  when_using_cursor_or_copilot?: string
  what_to_do?: string[]
  what_not_to_do?: string[]
}

export interface ProductionConsiderations {
  what_id_add_in_production?: string[]
  why_not_in_interview?: string
  how_to_mention?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type { Phase }

export interface PhaseConfig {
  id: Phase
  icon: string
  label: string
  hasContent: boolean
}
