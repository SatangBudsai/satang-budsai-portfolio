/**
 * Renders /resume to public/Satang-Budsai-Resume.pdf (A4, English).
 *
 *   pnpm build && pnpm start          # or pnpm dev
 *   pnpm resume:pdf [http://localhost:3031]
 *
 * Re-run after changing résumé content, and commit the PDF.
 */
import { chromium } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const base = (process.argv[2] ?? 'http://localhost:3031').replace(/\/$/, '')
const out = fileURLToPath(new URL('../../public/Satang-Budsai-Resume.pdf', import.meta.url))

const browser = await chromium.launch()
const page = await browser.newPage({ locale: 'en-US', reducedMotion: 'reduce' })
const response = await page.goto(`${base}/resume`, { waitUntil: 'networkidle' })
if (!response?.ok()) throw new Error(`GET ${base}/resume → ${response?.status()}`)
await page.evaluate(() => document.fonts.ready)
await page.emulateMedia({ media: 'print' })
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '13mm', right: '14mm', bottom: '15mm', left: '14mm' },
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8px;color:#8a8494;padding:0 14mm;display:flex;justify-content:space-between;font-family:Inter,Arial,sans-serif">' +
    '<span>Satang Budsai · Résumé</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
})
await browser.close()
console.log('wrote', out)
