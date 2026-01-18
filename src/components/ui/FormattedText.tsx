"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface FormattedTextProps {
  text: string
  className?: string
  variant?: 'default' | 'question' | 'approach' | 'tip'
}

// Technical terms to highlight
const TECH_TERMS = [
  // Data Structures
  'HashMap', 'HashSet', 'TreeMap', 'TreeSet', 'LinkedList', 'ArrayList',
  'Stack', 'Queue', 'Deque', 'PriorityQueue', 'Heap', 'MinHeap', 'MaxHeap',
  'Tree', 'Binary Tree', 'BST', 'Trie', 'Graph', 'DAG',
  'Array', 'Matrix', 'Vector', 'Set', 'Map', 'Dictionary',
  
  // Algorithms
  'BFS', 'DFS', 'Dijkstra', 'Bellman-Ford', 'Floyd-Warshall',
  'Binary Search', 'Two Pointers', 'Sliding Window', 'Dynamic Programming', 'DP',
  'Backtracking', 'Recursion', 'Memoization', 'Greedy', 'Divide and Conquer',
  'Topological Sort', 'Union Find', 'Kruskal', 'Prim',
  'Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort',
  
  // Concepts
  'Time Complexity', 'Space Complexity', 'O(n)', 'O(log n)', 'O(n^2)', 'O(1)',
  'API', 'REST', 'CRUD', 'SQL', 'NoSQL', 'Database',
  'Transaction', 'Rollback', 'Commit', 'ACID',
  'Cache', 'Redis', 'Memcached', 'CDN',
  'Load Balancer', 'Sharding', 'Replication', 'Partitioning',
  'Microservices', 'Monolith', 'Event-Driven',
  'OOP', 'Object-Oriented', 'SOLID', 'Design Pattern',
  
  // Languages/Tools
  'Python', 'Java', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'C++',
  'React', 'Node.js', 'Spring', 'Django', 'Flask',
  'AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'DynamoDB',
  'Kafka', 'RabbitMQ', 'SQS', 'Pub/Sub',
]

// Create regex pattern for tech terms (case insensitive, word boundaries)
const techTermsPattern = new RegExp(
  `\\b(${TECH_TERMS.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
)

// URL pattern
const urlPattern = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g

// Code pattern (backticks or method names like functionName())
const codePattern = /`([^`]+)`|(\b[a-zA-Z_][a-zA-Z0-9_]*\(\))/g

// Bullet point pattern
const bulletPattern = /^[\s]*[-•*]\s+/gm

interface TextSegment {
  type: 'text' | 'url' | 'code' | 'tech' | 'bullet'
  content: string
  href?: string
}

function parseText(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let remaining = text

  // First, split by URLs
  const urlParts = remaining.split(urlPattern)
  
  urlParts.forEach((part, index) => {
    if (urlPattern.test(part)) {
      segments.push({ type: 'url', content: part, href: part })
    } else if (part) {
      // For non-URL parts, further parse for code and tech terms
      parseNonUrlText(part, segments)
    }
  })

  return segments
}

function parseNonUrlText(text: string, segments: TextSegment[]) {
  // Split by code patterns first
  let lastIndex = 0
  const codeMatches = [...text.matchAll(/`([^`]+)`|(\b[a-zA-Z_][a-zA-Z0-9_]*\(\))/g)]
  
  // If no code matches, just parse tech terms and return
  if (codeMatches.length === 0) {
    parseTechTerms(text, segments)
    return
  }
  
  codeMatches.forEach(match => {
    const matchIndex = match.index!
    
    // Add text before this match
    if (matchIndex > lastIndex) {
      const beforeText = text.slice(lastIndex, matchIndex)
      parseTechTerms(beforeText, segments)
    }
    
    // Add the code segment
    const codeContent = match[1] || match[2] || match[0]
    segments.push({ type: 'code', content: codeContent.replace(/`/g, '') })
    
    lastIndex = matchIndex + match[0].length
  })
  
  // Add remaining text after last code match
  if (lastIndex < text.length) {
    parseTechTerms(text.slice(lastIndex), segments)
  }
}

function parseTechTerms(text: string, segments: TextSegment[]) {
  let lastIndex = 0
  const matches = [...text.matchAll(techTermsPattern)]
  
  if (matches.length === 0) {
    if (text) segments.push({ type: 'text', content: text })
    return
  }
  
  matches.forEach(match => {
    const matchIndex = match.index!
    
    // Add text before this match
    if (matchIndex > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, matchIndex) })
    }
    
    // Add the tech term
    segments.push({ type: 'tech', content: match[0] })
    
    lastIndex = matchIndex + match[0].length
  })
  
  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) })
  }
}

function getLeetCodeInfo(url: string): { isLeetCode: boolean; problemName?: string } {
  if (url.includes('leetcode.com')) {
    const match = url.match(/problems\/([^/]+)/)
    if (match) {
      return { 
        isLeetCode: true, 
        problemName: match[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      }
    }
    return { isLeetCode: true }
  }
  return { isLeetCode: false }
}

// Render a single segment
function renderSegment(segment: TextSegment, index: number) {
  switch (segment.type) {
    case 'url': {
      const { isLeetCode, problemName } = getLeetCodeInfo(segment.content)
      return (
        <a
          key={index}
          href={segment.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1 font-medium hover:underline transition-colors",
            isLeetCode 
              ? "text-orange-600 hover:text-orange-700" 
              : "text-blue-600 hover:text-blue-700"
          )}
        >
          {isLeetCode && (
            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-bold px-1.5 py-0.5 rounded">
              LC
            </span>
          )}
          <span className="underline decoration-dotted underline-offset-2">
            {problemName || (segment.content.length > 50 ? segment.content.slice(0, 50) + '...' : segment.content)}
          </span>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )
    }
    
    case 'code':
      return (
        <code
          key={index}
          className="inline-block bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200"
        >
          {segment.content}
        </code>
      )
    
    case 'tech':
      return (
        <span
          key={index}
          className="inline-block bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-semibold"
        >
          {segment.content}
        </span>
      )
    
    default:
      return <span key={index}>{segment.content}</span>
  }
}

export function FormattedText({ text, className, variant = 'default' }: FormattedTextProps) {
  if (!text) return null

  const baseStyles = cn(
    "leading-relaxed",
    variant === 'question' && "text-slate-800 text-base",
    variant === 'approach' && "text-slate-600",
    variant === 'tip' && "text-cyan-700",
    className
  )

  // Split by newlines first, then parse each line
  const lines = text.split(/\\n|\n/)

  // If only one line, render inline
  if (lines.length === 1) {
    const segments = parseText(text)
    return (
      <span className={baseStyles}>
        {segments.map((segment, index) => renderSegment(segment, index))}
      </span>
    )
  }

  // Multiple lines - render as block with proper line breaks
  return (
    <div className={cn(baseStyles, "space-y-2")}>
      {lines.map((line, lineIndex) => {
        const trimmedLine = line.trim()
        
        // Empty line = paragraph break
        if (!trimmedLine) {
          return <div key={lineIndex} className="h-2" />
        }

        // Check if it's a bullet point
        const isBullet = /^[-•*]\s+/.test(trimmedLine)
        const isNumbered = /^\d+[\.\)]\s+/.test(trimmedLine)
        
        // Clean bullet/number prefix
        let cleanLine = trimmedLine
        if (isBullet) {
          cleanLine = trimmedLine.replace(/^[-•*]\s+/, '')
        } else if (isNumbered) {
          cleanLine = trimmedLine.replace(/^\d+[\.\)]\s+/, '')
        }
        
        const segments = parseText(cleanLine)

        if (isBullet || isNumbered) {
          return (
            <div key={lineIndex} className="flex items-start gap-2">
              <span className={cn(
                "flex-shrink-0 mt-1",
                isBullet && "w-1.5 h-1.5 rounded-full bg-indigo-400",
                isNumbered && "text-indigo-600 font-semibold text-sm min-w-[1.5rem]"
              )}>
                {isNumbered && trimmedLine.match(/^\d+/)?.[0] + '.'}
              </span>
              <span className="flex-1">
                {segments.map((segment, segIndex) => renderSegment(segment, lineIndex * 1000 + segIndex))}
              </span>
            </div>
          )
        }

        return (
          <div key={lineIndex}>
            {segments.map((segment, segIndex) => renderSegment(segment, lineIndex * 1000 + segIndex))}
          </div>
        )
      })}
    </div>
  )
}

// Specialized component for displaying questions with better formatting
export function QuestionText({ text, className }: { text: string; className?: string }) {
  if (!text) return null
  
  // Check if text has multiple lines
  const hasMultipleLines = text.includes('\n') || text.includes('\\n')
  
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
      <div className={cn(
        "pl-4",
        hasMultipleLines && "bg-slate-50 rounded-lg p-4 border border-slate-200"
      )}>
        <FormattedText 
          text={text} 
          variant="question" 
          className={cn(
            hasMultipleLines ? "text-base" : "text-lg font-medium"
          )} 
        />
      </div>
    </div>
  )
}

// Component for approach/hint text
export function ApproachText({ text, className }: { text: string; className?: string }) {
  return (
    <FormattedText text={text} variant="approach" className={className} />
  )
}

// Component for tips
export function TipText({ text, className }: { text: string; className?: string }) {
  return (
    <FormattedText text={text} variant="tip" className={className} />
  )
}

// Component for LeetCode similar problems
export function LeetCodeLink({ text, className }: { text: string; className?: string }) {
  // Check if it's a URL or just text
  const isUrl = text.startsWith('http')
  
  if (isUrl) {
    return <FormattedText text={text} className={className} />
  }
  
  // If it's just text like "Top K Frequent Elements", make it searchable
  return (
    <a
      href={`https://leetcode.com/problemset/all/?search=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-medium transition-colors",
        className
      )}
    >
      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-bold px-1.5 py-0.5 rounded">
        LC
      </span>
      <span className="underline decoration-dotted underline-offset-2">{text}</span>
      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </a>
  )
}
