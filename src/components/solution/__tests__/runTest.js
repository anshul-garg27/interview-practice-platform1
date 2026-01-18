/**
 * Manual test runner for fixBrokenStringLiterals
 * Run with: node runTest.js
 */

// Copy of the function for testing (same logic as in PracticeSolutionModal.tsx)
function fixBrokenStringLiterals(lines) {
  const result = []
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i]
    // Check if line ends with unclosed string: print(" or ends with " + "
    const endsWithUnclosedString = /\(\s*["']$/.test(currentLine.trimEnd()) ||
                                   /["']\s*\+\s*["']$/.test(currentLine.trimEnd())
    const nextLine = lines[i + 1]
    const nextStartsWithStringContinuation = nextLine && /^\s*["']/.test(nextLine)

    if (endsWithUnclosedString && nextStartsWithStringContinuation) {
      // Merge with next line, adding \n to represent the escaped newline
      result.push(currentLine + '\\n' + nextLine.trim())
      i++ // Skip next line as we merged it
    } else {
      result.push(currentLine)
    }
  }
  return result
}

// Test helpers
let passed = 0
let failed = 0

function assertEqual(actual, expected, testName) {
  const actualStr = JSON.stringify(actual)
  const expectedStr = JSON.stringify(expected)
  if (actualStr === expectedStr) {
    console.log(`✅ ${testName}`)
    passed++
  } else {
    console.log(`❌ ${testName}`)
    console.log(`   Expected: ${expectedStr}`)
    console.log(`   Actual:   ${actualStr}`)
    failed++
  }
}

console.log('\n🧪 Testing fixBrokenStringLiterals\n')

// Test 1: Fix broken print statement with newline
assertEqual(
  fixBrokenStringLiterals([
    '    print("',
    '" + "=" * 60)',
    '    print("ALL TESTS PASSED!")',
  ]),
  [
    '    print("\\n" + "=" * 60)',
    '    print("ALL TESTS PASSED!")',
  ],
  'Test 1: Fix broken print statement with newline'
)

// Test 2: Fix multiple broken strings in sequence
assertEqual(
  fixBrokenStringLiterals([
    '    print("',
    '" + "=" * 60)',
    '    print("HEADER")',
    '    print("',
    '" + "-" * 40)',
  ]),
  [
    '    print("\\n" + "=" * 60)',
    '    print("HEADER")',
    '    print("\\n" + "-" * 40)',
  ],
  'Test 2: Fix multiple broken strings in sequence'
)

// Test 3: Should not modify correctly formatted code
const correctLines = [
  '    print("\\n" + "=" * 60)',
  '    print("ALL TESTS PASSED!")',
  '    print("=" * 60)',
]
assertEqual(
  fixBrokenStringLiterals(correctLines),
  correctLines,
  'Test 3: Should not modify correctly formatted code'
)

// Test 4: Handle code without any print statements
const normalLines = [
  'def calculate(x):',
  '    return x * 2',
  '',
  'result = calculate(5)',
]
assertEqual(
  fixBrokenStringLiterals(normalLines),
  normalLines,
  'Test 4: Handle code without any print statements'
)

// Test 5: Handle single quotes too
assertEqual(
  fixBrokenStringLiterals([
    "    print('",
    "' + '=' * 60)",
  ]),
  [
    "    print('\\n' + '=' * 60)",
  ],
  'Test 5: Handle single quotes too'
)

// Test 6: Handle pattern with string concatenation ending
assertEqual(
  fixBrokenStringLiterals([
    '    message = "Hello" + "',
    '" + name',
  ]),
  [
    '    message = "Hello" + "\\n" + name',
  ],
  'Test 6: Handle pattern with string concatenation ending'
)

console.log('\n────────────────────────────────')
console.log(`Results: ${passed} passed, ${failed} failed`)
console.log('────────────────────────────────\n')

process.exit(failed > 0 ? 1 : 0)
