#!/usr/bin/env node
/**
 * Generates a manifest of available practice solutions
 * Run: node scripts/generate-solution-manifest.js
 */

const fs = require('fs')
const path = require('path')

const SOLUTIONS_DIR = path.join(__dirname, '../public/data/practice_solutions')
const OUTPUT_FILE = path.join(__dirname, '../public/data/solution_manifest.json')

function generateManifest() {
  const files = fs.readdirSync(SOLUTIONS_DIR).filter(f => f.endsWith('.json'))

  const manifest = {}

  for (const file of files) {
    // Skip temp files
    if (file === 'temp' || file.startsWith('.')) continue

    // Parse filename: problem_id_main.json or problem_id_part2.json
    const match = file.match(/^(.+?)_(main|part\d+)\.json$/)
    if (!match) continue

    const [, problemId, partType] = match

    if (!manifest[problemId]) {
      manifest[problemId] = {
        main: false,
        parts: []
      }
    }

    if (partType === 'main') {
      manifest[problemId].main = true
    } else {
      // Extract part number
      const partNum = parseInt(partType.replace('part', ''))
      if (!manifest[problemId].parts.includes(partNum)) {
        manifest[problemId].parts.push(partNum)
      }
    }
  }

  // Sort parts array for each problem
  for (const problemId in manifest) {
    manifest[problemId].parts.sort((a, b) => a - b)
  }

  const output = {
    generated_at: new Date().toISOString(),
    total_with_solutions: Object.keys(manifest).length,
    solutions: manifest
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2))

  console.log('Solution manifest generated!')
  console.log(`Total problems with solutions: ${Object.keys(manifest).length}`)

  // Summary
  let mainCount = 0
  let followUpCount = 0
  for (const problemId in manifest) {
    if (manifest[problemId].main) mainCount++
    followUpCount += manifest[problemId].parts.length
  }

  console.log(`Main solutions: ${mainCount}`)
  console.log(`Follow-up solutions: ${followUpCount}`)
}

generateManifest()
