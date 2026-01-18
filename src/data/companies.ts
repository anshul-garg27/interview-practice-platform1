import { CompanyData } from '@/lib/types'

export const ripplingData: CompanyData = {
  company: "Rippling",
  interview_process: {
    total_rounds: "4-6",
    round_types: [
      "Phone Screen/DSA",
      "Hiring Manager/Behavioral",
      "Onsite DSA (2-3 rounds)",
      "System Design",
      "API Design"
    ],
    typical_timeline: "2-4 weeks from initial contact to final decision"
  },
  rounds: [
    {
      name: "Phone Screen / DSA Round 1",
      type: "Technical",
      duration: "45-60 minutes",
      description: "HackerRank CodePair session with a base problem, 2-3 follow-up scale-ups, and production-quality code expectation",
      questions: [
        "Design a delivery driver payment system",
        "Design a Music Player like Spotify",
        "Design Excel Sheet with formulas",
        "Employee Importance variation"
      ],
      skills_tested: [
        "Object-Oriented Design",
        "Production-quality code",
        "Data structure selection",
        "Time/Space complexity"
      ],
      difficulty: "medium",
      tips: "Write production-level code with proper class structure. Ask clarifying questions about time constraints upfront."
    },
    {
      name: "Hiring Manager Round",
      type: "Behavioral",
      duration: "45-60 minutes",
      description: "Discussion about past experiences, projects, leadership, and team dynamics. Recruiter provides topics beforehand.",
      questions: [
        "Past project experiences",
        "Mentor/mentee experiences",
        "What would you change about your work?",
        "What's working well?",
        "Leadership experiences"
      ],
      skills_tested: [
        "Communication",
        "Leadership",
        "Self-awareness",
        "Problem-solving approach"
      ],
      difficulty: "easy",
      tips: "Prepare answers in advance using STAR format. Recruiter often gives the script of topics."
    },
    {
      name: "Onsite DSA Round 1",
      type: "Technical",
      duration: "60 minutes",
      description: "In-depth coding round focusing on data structure design with multiple follow-ups",
      questions: [
        "In-memory Key-Value Store with transactions",
        "Support nested transactions (begin, commit, rollback)",
        "Song ranking by unique users"
      ],
      skills_tested: [
        "Data structure design",
        "Transaction handling",
        "State management",
        "Code organization"
      ],
      difficulty: "hard",
      tips: "Transactions with rollback require careful state management - consider using stack-based approach."
    },
    {
      name: "Onsite DSA Round 2",
      type: "Technical",
      duration: "60 minutes",
      description: "Another coding round focusing on different problem domain, often spreadsheet/formula parsing",
      questions: [
        "Design Excel sheet with set, reset, print methods",
        "Support formula parsing like '=9+10'",
        "Extend to support cell references like '=A1+10'"
      ],
      skills_tested: [
        "Parsing and evaluation",
        "Graph/dependency handling",
        "String manipulation",
        "Cell coordinate mapping"
      ],
      difficulty: "hard",
      tips: "Consider using topological sort for cell dependencies. Handle negative numbers in formulas carefully."
    },
    {
      name: "System Design Round",
      type: "System Design",
      duration: "45-60 minutes",
      description: "High-level system design focusing on scalability, reliability, and architecture",
      questions: [
        "Design document upload and review system",
        "Design Google News",
        "Design News Aggregator and feed system"
      ],
      skills_tested: [
        "System architecture",
        "Scalability",
        "Database design",
        "Trade-off analysis"
      ],
      difficulty: "hard",
      tips: "Focus on core functional requirements first. Don't get lost in nice-to-haves."
    },
    {
      name: "API Design / Full Stack Round",
      type: "Technical",
      duration: "90 minutes",
      description: "Extended round requiring end-to-end API implementation with production-ready code",
      questions: [
        "Design Stack Overflow API end-to-end",
        "CRUD API implementation with DB design"
      ],
      skills_tested: [
        "Full-stack development",
        "API design",
        "Database design",
        "Production code quality"
      ],
      difficulty: "hard",
      tips: "Practice writing complete working APIs within time constraints. Focus on DB schema design."
    }
  ],
  coding_questions: [
    {
      question: "Design a delivery driver payment system: addDriver(driverId, hourlyRate), addOrder(driverId, startTime, endTime), getTotalCost()",
      topic: "Object-Oriented Design",
      subtopics: ["HashMap", "API Design"],
      difficulty: "medium",
      round: "Phone Screen",
      leetcode_similar: "Custom Design Problem",
      approach_hint: "Use HashMap for drivers with their rates. Store orders with timestamps. Handle epoch seconds for time.",
      follow_ups: ["Add payment clearing time", "Calculate unpaid totals"],
      gotchas: ["Use BigDecimal for currency instead of float/double"]
    },
    {
      question: "Design a Music Player like Spotify: addSong(songTitle), playSong(songId, userId), printMostPlayedSongs()",
      topic: "HashMap / Heap / Design",
      subtopics: ["Sorting", "Set"],
      difficulty: "medium",
      round: "Phone Screen / DSA",
      leetcode_similar: "LC 355 - Design Twitter",
      approach_hint: "Use HashMap<songId, Set<userId>> for tracking unique plays. For sorting, consider TreeMap or priority queue.",
      follow_ups: ["Get last 3 unique songs played by user"],
      gotchas: ["Maintain insertion order with uniqueness"]
    },
    {
      question: "Design In-memory Key-Value Store with transaction support: get(key), set(key, value), deleteKey(key), begin(), commit(), rollback()",
      topic: "Design / Stack",
      subtopics: ["HashMap", "Transaction"],
      difficulty: "hard",
      round: "Onsite DSA",
      leetcode_similar: "LC Discussion - Key-Value Store with Transactions",
      approach_hint: "Use stack of HashMaps for transactions. Each begin() pushes new map. commit() merges top into parent.",
      follow_ups: ["Support nested transactions"],
      gotchas: ["Handle key lookups by traversing stack from top"]
    },
    {
      question: "Design Excel Sheet: set(cell, value) where value can be number or formula like '=9+10', reset(cell), print()",
      topic: "Parsing / Graph / Topological Sort",
      subtopics: ["String Manipulation", "Dependency Graph"],
      difficulty: "hard",
      round: "Phone Screen / Onsite",
      leetcode_similar: "LC 631 - Design Excel Sum Formula",
      approach_hint: "Parse cell names to coordinates (A1 -> row 0, col 0). For formulas, tokenize and evaluate.",
      follow_ups: ["Support cell references like '=A1+10'", "Detect circular dependencies"],
      gotchas: ["Handle negative numbers in formulas carefully"]
    },
    {
      question: "Employee Importance - Calculate total importance value of an employee and all their subordinates",
      topic: "BFS / DFS / Graph Traversal",
      subtopics: ["Tree", "Recursion"],
      difficulty: "medium",
      round: "Phone Screen",
      leetcode_similar: "LC 690 - Employee Importance",
      approach_hint: "Build adjacency list from employee-subordinate relationships. Use BFS or DFS to traverse and sum.",
      follow_ups: ["Additional filtering or aggregation"]
    },
    {
      question: "Stack Overflow API Design - Full end-to-end implementation",
      topic: "API Design / Database",
      subtopics: ["CRUD", "Full Stack"],
      difficulty: "hard",
      round: "API Design Round",
      leetcode_similar: "System Design",
      approach_hint: "Design end-to-end API with CRUD operations, working code in 45 minutes",
      follow_ups: ["Add voting system", "Add tagging"]
    }
  ],
  system_design_questions: [
    {
      question: "Design a document upload and review system for Rippling's customers with internal audit team review",
      key_components: [
        "Document storage service (S3)",
        "Upload service with chunked uploads",
        "Review workflow management",
        "Time tracking for review completion",
        "Notification system",
        "Access control and audit logging",
        "Queue system for review assignment"
      ],
      scale: "Multiple customers uploading simultaneously, large file handling, review SLAs"
    },
    {
      question: "Design Google News / News Aggregator and Feed System",
      key_components: [
        "News crawling and ingestion pipeline",
        "Content deduplication",
        "Personalization and recommendation engine",
        "Feed generation and ranking",
        "Caching layer for popular content",
        "Search functionality",
        "Real-time updates and push notifications"
      ],
      scale: "Millions of users, thousands of news sources, real-time updates"
    }
  ],
  behavioral_questions: [
    {
      question: "Tell me about your past project experiences and how you approached them",
      what_they_look_for: "Technical decision-making, ownership, problem-solving methodology"
    },
    {
      question: "Describe your experience with mentoring (both as mentor and mentee)",
      what_they_look_for: "Leadership potential, growth mindset, ability to help others grow"
    },
    {
      question: "What would you like to change about your current work?",
      what_they_look_for: "Self-awareness, constructive criticism ability, improvement-oriented mindset"
    },
    {
      question: "What is working well in your current role?",
      what_they_look_for: "Ability to recognize positive aspects, understanding of what makes teams successful"
    },
    {
      question: "Describe your leadership experience on projects",
      what_they_look_for: "Initiative, ability to drive projects, influence without authority"
    }
  ],
  success_tips: [
    "Write production-quality code with proper class design, not just algorithmic solutions",
    "Ask clarifying questions upfront about number of questions and time expectations",
    "Prepare for 2-3 follow-up scale-up questions for each base problem",
    "Recruiter provides detailed preparation guidance - follow it closely",
    "For behavioral round, recruiter often gives the script of topics - prepare all answers in advance",
    "Focus on core functional requirements in system design - avoid getting lost in nice-to-haves",
    "Practice implementing transactions with begin/commit/rollback - this is a common pattern",
    "Be familiar with data type considerations (e.g., BigDecimal vs float for currency)",
    "Time management is crucial - plan execution based on number of questions",
    "Handle concurrency and edge cases in your code"
  ],
  mistakes_to_avoid: [
    "Spending too much time on code clarity at the expense of covering all questions",
    "Not asking about time constraints and number of questions upfront",
    "Focusing too much on nice-to-have features in system design",
    "Using float/double for currency calculations instead of appropriate types",
    "Not preparing for nested transaction support in key-value store problems",
    "Poor time management - unable to reach follow-up questions",
    "Not writing production-ready code (missing class structure, error handling)",
    "Getting stuck on one part without discussing approach for subsequent parts",
    "Not listening when interviewer redirects focus in system design"
  ],
  preparation: {
    focus_topics: [
      "Object-Oriented Design with production-quality code",
      "In-memory data store design with transaction support",
      "HashMap and Set operations",
      "Excel/Spreadsheet design problems",
      "Graph traversal (BFS/DFS)",
      "Topological sorting for dependencies",
      "LRU Cache style problems",
      "String parsing and formula evaluation",
      "System design for document management",
      "API design with CRUD operations"
    ],
    recommended_problems: [
      "LC 631 - Design Excel Sum Formula",
      "LC 146 - LRU Cache",
      "LC 355 - Design Twitter",
      "LC 690 - Employee Importance",
      "LC 347 - Top K Frequent Elements",
      "LC 341 - Flatten Nested List Iterator",
      "LC 1396 - Design Underground System",
      "LC 1472 - Design Browser History",
      "LC 380 - Insert Delete GetRandom O(1)"
    ],
    resources: [
      "LeetCode Premium for company-specific questions",
      "System Design Primer on GitHub",
      "Grokking the System Design Interview",
      "Practice writing production-quality OOP code"
    ],
    time_needed: "3-4 weeks of focused preparation"
  },
  overall_difficulty: "hard",
  pass_rate_estimate: "~20-30% based on experiences shared",
  summary: "Rippling interviews are challenging with 4-6 rounds focusing heavily on production-quality code and object-oriented design. Expect base problems with multiple follow-up scale-ups, commonly featuring key-value stores with transactions, Excel sheet design, and delivery/music player systems."
}

export const googleData: CompanyData = {
  company: "Google",
  interview_process: {
    total_rounds: "4-5",
    round_types: [
      "Phone Screen",
      "Onsite Coding (2-3 rounds)",
      "System Design",
      "Behavioral (Googleyness)"
    ],
    typical_timeline: "4-8 weeks including team matching"
  },
  rounds: [
    {
      name: "Phone Screen",
      type: "Technical",
      duration: "45 minutes",
      description: "Coding problem on Google Docs with focus on problem-solving and communication",
      questions: [
        "Count ordered pairs (i,j) where a[i]-a[j] = i-j",
        "Array manipulation problems",
        "String processing"
      ],
      skills_tested: [
        "Problem-solving",
        "Code quality",
        "Communication",
        "Time complexity analysis"
      ],
      difficulty: "medium",
      tips: "Think out loud, discuss approach before coding, optimize iteratively"
    },
    {
      name: "Onsite Round 1",
      type: "Technical",
      duration: "45 minutes",
      description: "Graph/path finding problems with optimization focus",
      questions: [
        "Find path with minimum security level in directed graph",
        "Graph traversal with edge weights"
      ],
      skills_tested: [
        "Graph algorithms",
        "Dijkstra/BFS variations",
        "Optimization"
      ],
      difficulty: "hard",
      tips: "Consider modified Dijkstra for min-max path problems"
    },
    {
      name: "Onsite Round 2",
      type: "Technical",
      duration: "45 minutes",
      description: "Optimization and greedy/binary search problems",
      questions: [
        "Split data into minimum packets with balanced sizes",
        "Binary search on answer problems"
      ],
      skills_tested: [
        "Binary search",
        "Greedy algorithms",
        "Optimization"
      ],
      difficulty: "hard",
      tips: "Binary search on answer is a common pattern"
    },
    {
      name: "Onsite Round 3",
      type: "Technical",
      duration: "45 minutes",
      description: "Data structure design with time-based operations",
      questions: [
        "Event timeout system with unique IDs",
        "Time-based data structures"
      ],
      skills_tested: [
        "Data structure design",
        "Time complexity",
        "Edge cases"
      ],
      difficulty: "hard",
      tips: "Consider using TreeMap or priority queue for time-based operations"
    },
    {
      name: "Behavioral (Googleyness)",
      type: "Behavioral",
      duration: "45 minutes",
      description: "Assessment of cultural fit, collaboration, and leadership",
      questions: [
        "Tell me about a time you disagreed with a teammate",
        "How do you handle ambiguity?",
        "Describe a challenging project"
      ],
      skills_tested: [
        "Collaboration",
        "Leadership",
        "Problem-solving mindset",
        "Cultural fit"
      ],
      difficulty: "medium",
      tips: "Use STAR format, show growth mindset and collaboration"
    }
  ],
  coding_questions: [
    {
      question: "Count ordered pairs (i,j) where a[i]-a[j] = i-j",
      topic: "Arrays / HashMap",
      difficulty: "medium",
      round: "Phone Screen",
      leetcode_similar: "Two Sum variations",
      approach_hint: "Rearrange equation: a[i]-i = a[j]-j. Count elements with same (a[i]-i) value."
    },
    {
      question: "Find path from start to end with minimum security level (max edge weight minimized)",
      topic: "Graph / Dijkstra",
      difficulty: "hard",
      round: "Onsite",
      leetcode_similar: "LC 1631 - Path With Minimum Effort",
      approach_hint: "Modified Dijkstra or binary search + BFS"
    },
    {
      question: "Split data into minimum packets where max packet size is minimized",
      topic: "Binary Search / Greedy",
      difficulty: "hard",
      round: "Onsite",
      leetcode_similar: "LC 410 - Split Array Largest Sum",
      approach_hint: "Binary search on the answer (max packet size)"
    }
  ],
  system_design_questions: [
    {
      question: "Design YouTube",
      key_components: [
        "Video upload and processing",
        "CDN for video delivery",
        "Recommendation system",
        "Search functionality",
        "Comments and engagement"
      ],
      scale: "Billions of videos, millions of concurrent viewers"
    }
  ],
  behavioral_questions: [
    {
      question: "Tell me about a time you disagreed with a teammate",
      what_they_look_for: "Conflict resolution, collaboration, respect for others"
    },
    {
      question: "Describe a challenging project you worked on",
      what_they_look_for: "Problem-solving, perseverance, technical depth"
    }
  ],
  success_tips: [
    "Think out loud throughout the interview",
    "Start with brute force, then optimize",
    "Ask clarifying questions before coding",
    "Test your code with examples",
    "Be prepared for team matching process after passing interviews"
  ],
  mistakes_to_avoid: [
    "Jumping into code without discussing approach",
    "Not considering edge cases",
    "Poor time management",
    "Not asking questions about the role/team"
  ],
  preparation: {
    focus_topics: [
      "Graph algorithms (BFS, DFS, Dijkstra)",
      "Binary search variations",
      "Dynamic programming",
      "System design fundamentals",
      "Data structure design"
    ],
    recommended_problems: [
      "LC 1631 - Path With Minimum Effort",
      "LC 410 - Split Array Largest Sum",
      "LC 1 - Two Sum",
      "LC 200 - Number of Islands",
      "LC 146 - LRU Cache"
    ],
    resources: [
      "LeetCode Premium Google tag",
      "System Design Interview book",
      "Cracking the Coding Interview"
    ],
    time_needed: "2-3 months of preparation"
  },
  overall_difficulty: "hard",
  pass_rate_estimate: "~15-20%",
  summary: "Google interviews focus on algorithmic problem-solving with emphasis on optimization and clean code. Expect graph problems, binary search variations, and system design. Team matching can take several months after passing interviews."
}

export const allCompanies: CompanyData[] = [ripplingData, googleData]

export function getCompanyBySlug(slug: string): CompanyData | undefined {
  return allCompanies.find(c => c.company.toLowerCase() === slug.toLowerCase())
}

export function getCompanyStats(company: CompanyData) {
  const topicCounts: Record<string, number> = {}
  company.coding_questions.forEach(q => {
    const topic = q.topic.split('/')[0].trim()
    topicCounts[topic] = (topicCounts[topic] || 0) + 1
  })
  
  const sortedTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic)

  return {
    totalQuestions: company.coding_questions.length + company.system_design_questions.length + company.behavioral_questions.length,
    codingQuestions: company.coding_questions.length,
    systemDesign: company.system_design_questions.length,
    behavioral: company.behavioral_questions.length,
    avgDifficulty: company.overall_difficulty,
    topTopics: sortedTopics.slice(0, 5),
    totalRounds: company.rounds.length
  }
}
