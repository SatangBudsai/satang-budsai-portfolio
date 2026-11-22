import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const alt = 'Satang Budsai — Senior Software Engineer (.NET, Next.js, Flutter), Chiang Mai'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The social card shared for every page that has no card of its own. */
export default async function Image() {
  const mark = await readFile(join(process.cwd(), 'public/brand/logo-mark.svg'), 'utf-8')
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(mark).toString('base64')}`
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: 'radial-gradient(900px 520px at 85% -10%, rgba(155,109,255,0.35), rgba(11,10,16,0) 70%), #0b0a10',
        color: '#f2f2f0'
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={72} height={72} alt='' />
        <span style={{ fontSize: 26, color: '#a3a0b3', letterSpacing: 4 }}>PORTFOLIO · RÉSUMÉ</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Satang Budsai</span>
        <span style={{ fontSize: 44, color: '#9b6dff', fontWeight: 700 }}>Senior Software Engineer</span>
        <span style={{ fontSize: 30, color: '#cdcad9', maxWidth: 980 }}>
          Government &amp; enterprise systems in .NET, Next.js and Flutter · open-source developer tools
        </span>
      </div>
      <span style={{ fontSize: 24, color: '#a3a0b3' }}>Chiang Mai, Thailand · open to full-time & freelance</span>
    </div>,
    size
  )
}
