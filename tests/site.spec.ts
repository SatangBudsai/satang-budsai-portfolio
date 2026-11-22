import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/work',
  '/work/git-control-orca',
  '/work/qorstack-report',
  '/work/scanhub',
  '/work/clipath',
  '/work/thai-pdf-fixer',
  '/work/eec-id',
  '/work/eec-e-customs',
  '/work/suvarnabhumi-airport-gate',
  '/work/lampang-health-network',
  '/work/cmu-journal',
  '/work/cmu-research-gallery',
  '/work/ora-cmu',
  '/work/sage',
  '/work/junior-bootcamp',
  '/work/readitgo',
  '/experiments',
  '/about'
]

for (const route of routes) {
  test(`renders ${route} without errors, broken images or sideways scroll on a phone`, async ({ page }) => {
    const errors: string[] = []
    const iconRequests: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('request', request => {
      if (request.url().includes('api.iconify.design')) iconRequests.push(request.url())
    })
    await page.setViewportSize({ width: 390, height: 844 })
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise(resolve => setTimeout(resolve, 40))
      }
    })
    const broken = await page.$$eval('img', images =>
      images.filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src)
    )
    expect(broken).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(iconRequests).toEqual([])
    expect(errors).toEqual([])
  })
}

test('opens and closes the mobile menu with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/about')
  const menu = page.getByRole('button', { name: /Open menu|เปิดเมนู/ })
  await menu.click()
  await expect(page.getByRole('button', { name: /Close menu|ปิดเมนู/ })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#mobile-menu')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-menu')).toBeHidden()
})

test('returns 404 for an unknown project', async ({ page }) => {
  const response = await page.goto('/work/does-not-exist')
  expect(response?.status()).toBe(404)
})

test('picks the language from the cookie, then from Accept-Language', async ({ browser }) => {
  const english = await browser.newContext({ locale: 'en-US' })
  const page = await english.newPage()
  await page.goto('/about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await english.addCookies([{ name: 'NEXT_LOCALE', value: 'th', url: 'http://127.0.0.1:3131' }])
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'th')
  await english.addCookies([{ name: 'NEXT_LOCALE', value: 'invalid', url: 'http://127.0.0.1:3131' }])
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await english.close()

  const thai = await browser.newContext({ locale: 'th-TH' })
  const thaiPage = await thai.newPage()
  await thaiPage.goto('/about')
  await expect(thaiPage.locator('html')).toHaveAttribute('lang', 'th')
  await thai.close()
})

test('switches language from the header', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' })
  const page = await context.newPage()
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'เปลี่ยนเป็นภาษาไทย' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'th')
  await context.close()
})

test('hydrates cleanly with reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', locale: 'en-US' })
  const page = await context.newPage()
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of ['/', '/work', '/work/eec-id', '/work/qorstack-report', '/experiments', '/about']) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
  await page.goto('/')
  // The hero name must be in place, not stuck below the line.
  const letter = page.locator('h1 [aria-hidden] span').first()
  await expect(letter).toBeInViewport()
  expect(errors).toEqual([])
  await context.close()
})

test('opens the screen gallery in a lightbox and closes it with Escape', async ({ page }) => {
  await page.goto('/work/git-control-orca')
  const first = page.getByRole('button', { name: /^Open: / }).first()
  await first.scrollIntoViewIfNeeded()
  await first.click()
  const dialog = page.locator('dialog[open]')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(/^1 \/ \d+$/)).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByText(/^2 \/ \d+$/)).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog[open]')).toHaveCount(0)
})
