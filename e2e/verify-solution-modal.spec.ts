import { test, expect } from '@playwright/test'

/**
 * Visual verification test for PracticeSolutionModal
 * Opens ALL collapsible sections and takes screenshots
 */

const PRACTICE_URL = 'http://localhost:3000/practice/delivery_cost_tracking'

// Helper function to expand ALL sections by clicking every section header
async function expandAllSections(page: any, phaseName: string) {
  let expandedCount = 0
  let attempts = 0
  const maxAttempts = 3

  // Keep trying to expand sections until no more can be expanded
  while (attempts < maxAttempts) {
    // Find all section header buttons (they have the chevron icon)
    // Look for buttons that contain SVG (the chevron) and have uppercase text
    const sectionButtons = page.locator('button').filter({
      has: page.locator('svg')
    })

    const count = await sectionButtons.count()
    let expandedThisRound = 0

    for (let i = 0; i < count; i++) {
      try {
        const btn = sectionButtons.nth(i)

        // Check if this button has a chevron pointing DOWN (collapsed state)
        // The chevron rotates 180deg when open, so we check for transform
        const svg = btn.locator('svg')
        if (await svg.count() === 0) continue

        const transform = await svg.evaluate((el: SVGElement) => {
          return window.getComputedStyle(el).transform
        }).catch(() => 'none')

        // If transform is 'none' or doesn't include rotation, it's collapsed
        // matrix values for rotate(180deg) would be different from rotate(0)
        const isCollapsed = transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)'

        if (isCollapsed && await btn.isVisible()) {
          const text = await btn.textContent().catch(() => '')
          // Skip phase tab buttons (they have short text like "UNDERSTAND")
          if (text && text.length > 15) {
            console.log(`${phaseName} - Expanding: ${text.substring(0, 40).trim()}...`)
            await btn.click({ force: true })
            await page.waitForTimeout(150)
            expandedCount++
            expandedThisRound++
          }
        }
      } catch (e) {
        // Skip errors
      }
    }

    if (expandedThisRound === 0) break
    attempts++
  }

  console.log(`${phaseName} - Total expanded: ${expandedCount} sections`)
  await page.waitForTimeout(300)
}

// Alternative: expand by finding collapsed sections specifically
async function expandAllSectionsV2(page: any, phaseName: string) {
  let expandedCount = 0

  // Get all buttons that look like section headers
  // Section headers have: icon emoji + uppercase title + chevron svg
  const allButtons = await page.locator('button').all()

  for (const btn of allButtons) {
    try {
      // Check if button is visible
      if (!await btn.isVisible({ timeout: 100 }).catch(() => false)) continue

      // Get button text
      const text = await btn.textContent().catch(() => '')
      if (!text || text.length < 5) continue

      // Skip phase tabs (they're short like "UNDERSTAND", "APPROACH")
      const phaseTabTexts = ['UNDERSTAND', 'APPROACH', 'SOLUTION', 'VERIFY', 'MASTER']
      if (phaseTabTexts.some(t => text.trim() === t)) continue

      // Check if it has a chevron SVG
      const hasSvg = await btn.locator('svg').count() > 0
      if (!hasSvg) continue

      // Check if the section content is hidden (chevron pointing down = collapsed)
      // We click it to toggle
      const svgTransform = await btn.locator('svg').evaluate((el: SVGElement) => {
        return window.getComputedStyle(el).transform
      }).catch(() => '')

      // If no rotation or rotation is 0, it's collapsed
      const isLikelyCollapsed = !svgTransform ||
                                svgTransform === 'none' ||
                                svgTransform.includes('matrix(1, 0, 0, 1')

      if (isLikelyCollapsed) {
        console.log(`${phaseName} - Clicking: ${text.substring(0, 50).replace(/\n/g, ' ').trim()}`)
        await btn.click({ force: true })
        await page.waitForTimeout(100)
        expandedCount++
      }
    } catch (e) {
      // Skip
    }
  }

  console.log(`${phaseName} - Expanded ${expandedCount} sections`)
  await page.waitForTimeout(300)
}

// Helper function to scroll and capture screenshots
async function scrollAndCapture(page: any, phaseName: string, screenshotPrefix: string) {
  // Scroll to top first
  await page.evaluate(() => {
    const scrollable = document.querySelector('[style*="overflow-y: auto"]') ||
                       document.querySelector('[style*="overflow: auto"]') ||
                       document.documentElement
    if (scrollable) scrollable.scrollTop = 0
  })
  await page.waitForTimeout(300)

  // Get scroll dimensions
  const scrollInfo = await page.evaluate(() => {
    const scrollable = document.querySelector('[style*="overflow-y: auto"]') ||
                       document.querySelector('[style*="overflow: auto"]') ||
                       document.documentElement
    return {
      scrollHeight: scrollable?.scrollHeight || 2000,
      clientHeight: scrollable?.clientHeight || 800
    }
  })

  console.log(`${phaseName} - Total scroll height: ${scrollInfo.scrollHeight}px`)

  const viewportHeight = scrollInfo.clientHeight || 800
  const totalHeight = scrollInfo.scrollHeight || 2000
  const scrollSteps = Math.min(Math.ceil(totalHeight / (viewportHeight * 0.5)), 50)

  console.log(`${phaseName} - Taking ${scrollSteps} screenshots`)

  for (let i = 0; i < scrollSteps; i++) {
    await page.screenshot({
      path: `e2e/screenshots/${screenshotPrefix}-${String(i + 1).padStart(2, '0')}.png`,
      fullPage: false
    })

    await page.evaluate((scrollAmount: number) => {
      const scrollable = document.querySelector('[style*="overflow-y: auto"]') ||
                         document.querySelector('[style*="overflow: auto"]') ||
                         document.documentElement
      if (scrollable) scrollable.scrollTop += scrollAmount
    }, viewportHeight * 0.5)

    await page.waitForTimeout(100)
  }
}

async function openSolutionAndGoToPhase(page: any, phaseLabel: string) {
  await page.goto(PRACTICE_URL)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)

  const viewSolutionBtn = page.getByRole('button', { name: /View Solution/i })
  if (await viewSolutionBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await viewSolutionBtn.click()
    await page.waitForTimeout(1500)
  }

  const tab = page.locator(`[role="tab"]:has-text("${phaseLabel}")`)
  if (await tab.isVisible({ timeout: 2000 }).catch(() => false)) {
    await tab.click({ force: true })
    await page.waitForTimeout(1000)
  }
}

test('UNDERSTAND phase - all sections expanded', async ({ page }) => {
  test.setTimeout(120000)
  await openSolutionAndGoToPhase(page, 'Understand')
  await expandAllSectionsV2(page, 'UNDERSTAND')
  await scrollAndCapture(page, 'UNDERSTAND', '01-understand')
})

test('APPROACH phase - all sections expanded', async ({ page }) => {
  test.setTimeout(120000)
  await openSolutionAndGoToPhase(page, 'Approach')
  await expandAllSectionsV2(page, 'APPROACH')
  await scrollAndCapture(page, 'APPROACH', '02-approach')
})

test('SOLUTION phase - all sections expanded', async ({ page }) => {
  test.setTimeout(120000)
  await openSolutionAndGoToPhase(page, 'Solution')
  await expandAllSectionsV2(page, 'SOLUTION')
  await scrollAndCapture(page, 'SOLUTION', '03-solution')
})

test('VERIFY phase - all sections expanded', async ({ page }) => {
  test.setTimeout(120000)
  await openSolutionAndGoToPhase(page, 'Verify')
  await expandAllSectionsV2(page, 'VERIFY')
  await scrollAndCapture(page, 'VERIFY', '04-verify')
})

test('MASTER phase - all sections expanded', async ({ page }) => {
  test.setTimeout(120000)
  await openSolutionAndGoToPhase(page, 'Master')
  await expandAllSectionsV2(page, 'MASTER')
  await scrollAndCapture(page, 'MASTER', '05-master')
})
