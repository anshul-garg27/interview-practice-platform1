import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const solutionsDir = path.join(process.cwd(), 'public/data/practice_solutions')

  try {
    const files = fs.readdirSync(solutionsDir).filter(f => f.endsWith('.json'))

    const manifest: Record<string, { main: boolean; parts: number[] }> = {}

    for (const file of files) {
      if (file === 'temp' || file.startsWith('.')) continue

      const match = file.match(/^(.+?)_(main|part\d+)\.json$/)
      if (!match) continue

      const [, problemId, partType] = match

      if (!manifest[problemId]) {
        manifest[problemId] = { main: false, parts: [] }
      }

      if (partType === 'main') {
        manifest[problemId].main = true
      } else {
        const partNum = parseInt(partType.replace('part', ''))
        if (!manifest[problemId].parts.includes(partNum)) {
          manifest[problemId].parts.push(partNum)
        }
      }
    }

    // Sort parts
    for (const problemId in manifest) {
      manifest[problemId].parts.sort((a, b) => a - b)
    }

    return NextResponse.json({
      generated_at: new Date().toISOString(),
      total_with_solutions: Object.keys(manifest).length,
      solutions: manifest
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read solutions directory' }, { status: 500 })
  }
}
