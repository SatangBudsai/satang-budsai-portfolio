import { expect, test } from '@playwright/test'

test('renders the portfolio and persists a keyboard theme change', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('opacity', '1')
  const toggle = page.getByRole('button', { name: 'Toggle theme' })
  await expect(toggle).toHaveAttribute('data-slot', 'button')
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('html')).toHaveClass(/light/)
  await page.reload()
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('body')).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  expect(errors).toEqual([])
})

for (const route of ['about', 'work']) {
  test(`renders /${route} with bundled mobile navigation icons`, async ({ page }) => {
    const iconRequests: string[] = []
    page.on('request', request => {
      if (request.url().includes('api.iconify.design')) iconRequests.push(request.url())
    })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/${route}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route === 'about' ? 'About' : 'Work')
    const menu = page.getByRole('button', { name: 'Open menu' })
    await expect(menu.locator('svg')).toBeVisible()
    await menu.click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: 'PROJECTS', exact: true }).last()).toBeVisible()
    expect(iconRequests).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
}

test('reads the language cookie on the server and rejects unsupported locales', async ({ page, context }) => {
  await context.addCookies([{ name: 'NEXT_LOCALE', value: 'en', url: 'http://127.0.0.1:3131' }])
  await page.goto('/about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await context.addCookies([{ name: 'NEXT_LOCALE', value: 'invalid', url: 'http://127.0.0.1:3131' }])
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'th')
})
