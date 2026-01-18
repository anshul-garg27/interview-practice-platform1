/**
 * Test for fixBrokenStringLiterals function
 *
 * This tests the fix for when AI generates code with actual newlines
 * inside print statements instead of escaped \n
 */

// Copy of the function for testing (same logic as in PracticeSolutionModal.tsx)
function fixBrokenStringLiterals(lines: string[]): string[] {
  const result: string[] = []
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

describe('fixBrokenStringLiterals', () => {
  it('should fix broken print statement with newline', () => {
    // This is what happens when AI generates print("\n" + "=" * 60)
    // but the \n becomes an actual newline in JSON
    const brokenLines = [
      '    print("',
      '" + "=" * 60)',
      '    print("ALL TESTS PASSED!")',
    ]

    const fixed = fixBrokenStringLiterals(brokenLines)

    expect(fixed).toEqual([
      '    print("\\n" + "=" * 60)',
      '    print("ALL TESTS PASSED!")',
    ])
  })

  it('should fix multiple broken strings in sequence', () => {
    const brokenLines = [
      '    print("',
      '" + "=" * 60)',
      '    print("HEADER")',
      '    print("',
      '" + "-" * 40)',
    ]

    const fixed = fixBrokenStringLiterals(brokenLines)

    expect(fixed).toEqual([
      '    print("\\n" + "=" * 60)',
      '    print("HEADER")',
      '    print("\\n" + "-" * 40)',
    ])
  })

  it('should not modify correctly formatted code', () => {
    const correctLines = [
      '    print("\\n" + "=" * 60)',
      '    print("ALL TESTS PASSED!")',
      '    print("=" * 60)',
    ]

    const fixed = fixBrokenStringLiterals(correctLines)

    expect(fixed).toEqual(correctLines)
  })

  it('should handle code without any print statements', () => {
    const normalLines = [
      'def calculate(x):',
      '    return x * 2',
      '',
      'result = calculate(5)',
    ]

    const fixed = fixBrokenStringLiterals(normalLines)

    expect(fixed).toEqual(normalLines)
  })

  it('should handle single quotes too', () => {
    const brokenLines = [
      "    print('",
      "' + '=' * 60)",
    ]

    const fixed = fixBrokenStringLiterals(brokenLines)

    expect(fixed).toEqual([
      "    print('\\n' + '=' * 60)",
    ])
  })

  it('should handle pattern with string concatenation ending', () => {
    const brokenLines = [
      '    message = "Hello" + "',
      '" + name',
    ]

    const fixed = fixBrokenStringLiterals(brokenLines)

    expect(fixed).toEqual([
      '    message = "Hello" + "\\n" + name',
    ])
  })
})
