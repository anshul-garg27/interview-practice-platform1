"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Custom light theme for code blocks
const customStyle = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    margin: '1rem 0',
    border: '1px solid #e2e8f0',
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: 'transparent',
    fontSize: '0.875rem',
  },
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  if (!content) return null

  // Parse markdown content
  const rendered = parseMarkdown(content)

  return (
    <div className={cn("markdown-content prose prose-slate max-w-none", className)}>
      {rendered}
    </div>
  )
}

function parseMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentCodeBlock: { lang: string; code: string[] } | null = null
  let listItems: React.ReactNode[] = []
  let listType: 'ul' | 'ol' | null = null
  let tableRows: string[][] = []
  let inTable = false
  let key = 0

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ol') {
        elements.push(<ol key={key++} className="list-decimal list-inside space-y-2 my-4 pl-2">{listItems}</ol>)
      } else {
        elements.push(<ul key={key++} className="list-disc list-inside space-y-2 my-4 pl-2">{listItems}</ul>)
      }
      listItems = []
      listType = null
    }
  }

  const flushTable = () => {
    if (tableRows.length > 1) {
      const header = tableRows[0]
      const body = tableRows.slice(2) // Skip separator row
      elements.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                    {parseInline(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {body.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-3 text-sm text-slate-600">
                      {parseInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableRows = []
      inTable = false
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block start/end
    if (line.trim().startsWith('```')) {
      if (currentCodeBlock) {
        // End of code block
        elements.push(
          <SyntaxHighlighter
            key={key++}
            language={currentCodeBlock.lang || 'text'}
            style={customStyle}
            customStyle={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '1rem',
              fontSize: '0.875rem',
              border: '1px solid #e2e8f0',
              margin: '1rem 0',
            }}
            codeTagProps={{
              style: {
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }
            }}
          >
            {currentCodeBlock.code.join('\n')}
          </SyntaxHighlighter>
        )
        currentCodeBlock = null
      } else {
        // Start of code block
        flushList()
        flushTable()
        const lang = line.trim().slice(3).toLowerCase() || 'text'
        currentCodeBlock = { lang, code: [] }
      }
      continue
    }

    // Inside code block
    if (currentCodeBlock) {
      currentCodeBlock.code.push(line)
      continue
    }

    // Table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList()
      inTable = true
      const cells = line.trim().slice(1, -1).split('|')
      tableRows.push(cells)
      continue
    } else if (inTable) {
      flushTable()
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.*)/)
    if (headerMatch) {
      flushList()
      const level = headerMatch[1].length
      const text = headerMatch[2]
      const headerClasses: Record<number, string> = {
        1: "text-2xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2",
        2: "text-xl font-bold text-slate-800 mt-6 mb-3 flex items-center gap-2",
        3: "text-lg font-semibold text-slate-700 mt-5 mb-2",
        4: "text-base font-semibold text-slate-700 mt-4 mb-2 uppercase tracking-wide text-sm",
        5: "text-sm font-semibold text-slate-600 mt-3 mb-1",
        6: "text-xs font-semibold text-slate-500 mt-2 mb-1 uppercase tracking-wider",
      }
      const className = headerClasses[level] || headerClasses[1]
      // Use explicit elements instead of dynamic tag to satisfy TypeScript
      const headerElement = level === 1 ? (
        <h1 key={key++} className={className}>{parseInline(text)}</h1>
      ) : level === 2 ? (
        <h2 key={key++} className={className}>{parseInline(text)}</h2>
      ) : level === 3 ? (
        <h3 key={key++} className={className}>{parseInline(text)}</h3>
      ) : level === 4 ? (
        <h4 key={key++} className={className}>{parseInline(text)}</h4>
      ) : level === 5 ? (
        <h5 key={key++} className={className}>{parseInline(text)}</h5>
      ) : (
        <h6 key={key++} className={className}>{parseInline(text)}</h6>
      )
      elements.push(headerElement)
      continue
    }

    // Ordered list
    const orderedMatch = line.match(/^(\d+)\.\s+(.*)/)
    if (orderedMatch) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      listItems.push(
        <li key={key++} className="text-slate-700 leading-relaxed">
          {parseInline(orderedMatch[2])}
        </li>
      )
      continue
    }

    // Unordered list
    const unorderedMatch = line.match(/^[-*•]\s+(.*)/)
    if (unorderedMatch) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      listItems.push(
        <li key={key++} className="text-slate-700 leading-relaxed">
          {parseInline(unorderedMatch[1])}
        </li>
      )
      continue
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      flushList()
      const quoteText = line.trim().slice(1).trim()
      elements.push(
        <blockquote key={key++} className="border-l-4 border-indigo-400 pl-4 py-2 my-4 bg-indigo-50/50 rounded-r-lg italic text-slate-600">
          {parseInline(quoteText)}
        </blockquote>
      )
      continue
    }

    // Horizontal rule
    if (line.trim().match(/^[-*_]{3,}$/)) {
      flushList()
      elements.push(<hr key={key++} className="my-6 border-t-2 border-slate-200" />)
      continue
    }

    // Empty line (flush lists)
    if (line.trim() === '') {
      flushList()
      continue
    }

    // Regular paragraph
    flushList()
    elements.push(
      <p key={key++} className="text-slate-700 leading-relaxed my-3">
        {parseInline(line)}
      </p>
    )
  }

  // Flush any remaining items
  flushList()
  flushTable()

  return elements
}

function parseInline(text: string): React.ReactNode {
  if (!text) return null

  // Split by various inline patterns
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  // Pattern for inline code, bold, italic, links, emoji
  const patterns = [
    { regex: /`([^`]+)`/g, render: (match: string) => (
      <code key={key++} className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-sm font-mono border border-slate-200">
        {match}
      </code>
    )},
    { regex: /\*\*([^*]+)\*\*/g, render: (match: string) => (
      <strong key={key++} className="font-semibold text-slate-900">{match}</strong>
    )},
    { regex: /\*([^*]+)\*/g, render: (match: string) => (
      <em key={key++} className="italic">{match}</em>
    )},
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, render: (text: string, url: string) => (
      <a key={key++} href={url} target="_blank" rel="noopener noreferrer" 
         className="text-indigo-600 hover:text-indigo-700 underline decoration-dotted underline-offset-2 font-medium">
        {text}
      </a>
    )},
  ]

  // Process inline code first
  const codeRegex = /`([^`]+)`/g
  const boldRegex = /\*\*([^*]+)\*\*/g
  const italicRegex = /\*([^*]+)\*/g
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|⚡|⚠️|📝|💡|✅|❌|🔥|💻|🎨|🧪|📚|🎯|💰|📊|💳|🚚)/gu

  // Simple approach: just render text with some formatting
  let result = text

  // Build an array of segments
  interface Segment {
    type: 'text' | 'code' | 'bold' | 'italic' | 'link' | 'emoji'
    content: string
    url?: string
    start: number
    end: number
  }

  const segments: Segment[] = []

  // Find all matches
  let match
  
  // Code
  const codeMatches = [...text.matchAll(/`([^`]+)`/g)]
  codeMatches.forEach(m => {
    segments.push({ type: 'code', content: m[1], start: m.index!, end: m.index! + m[0].length })
  })

  // Bold
  const boldMatches = [...text.matchAll(/\*\*([^*]+)\*\*/g)]
  boldMatches.forEach(m => {
    segments.push({ type: 'bold', content: m[1], start: m.index!, end: m.index! + m[0].length })
  })

  // Italic (but not bold)
  const italicMatches = [...text.matchAll(/(?<!\*)\*([^*]+)\*(?!\*)/g)]
  italicMatches.forEach(m => {
    segments.push({ type: 'italic', content: m[1], start: m.index!, end: m.index! + m[0].length })
  })

  // Links
  const linkMatches = [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
  linkMatches.forEach(m => {
    segments.push({ type: 'link', content: m[1], url: m[2], start: m.index!, end: m.index! + m[0].length })
  })

  // Sort segments by start position
  segments.sort((a, b) => a.start - b.start)

  // Filter out overlapping segments (keep earlier ones)
  const filteredSegments: Segment[] = []
  for (const seg of segments) {
    const overlaps = filteredSegments.some(fs => 
      (seg.start >= fs.start && seg.start < fs.end) ||
      (seg.end > fs.start && seg.end <= fs.end)
    )
    if (!overlaps) {
      filteredSegments.push(seg)
    }
  }

  // Build result
  const result2: React.ReactNode[] = []
  let lastEnd = 0

  for (const seg of filteredSegments) {
    // Add text before this segment
    if (seg.start > lastEnd) {
      result2.push(<span key={key++}>{text.slice(lastEnd, seg.start)}</span>)
    }

    // Add the formatted segment
    switch (seg.type) {
      case 'code':
        result2.push(
          <code key={key++} className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-sm font-mono border border-slate-200">
            {seg.content}
          </code>
        )
        break
      case 'bold':
        result2.push(<strong key={key++} className="font-semibold text-slate-900">{seg.content}</strong>)
        break
      case 'italic':
        result2.push(<em key={key++} className="italic">{seg.content}</em>)
        break
      case 'link':
        result2.push(
          <a key={key++} href={seg.url} target="_blank" rel="noopener noreferrer"
             className="text-indigo-600 hover:text-indigo-700 underline decoration-dotted underline-offset-2 font-medium">
            {seg.content}
          </a>
        )
        break
    }

    lastEnd = seg.end
  }

  // Add remaining text
  if (lastEnd < text.length) {
    result2.push(<span key={key++}>{text.slice(lastEnd)}</span>)
  }

  return result2.length > 0 ? result2 : text
}

export default MarkdownRenderer
