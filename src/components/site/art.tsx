import type { ArtId } from '@/content/types'
import { cn } from '@/lib/utils'

/*
 * Cover illustrations for client work that can't be shown as screenshots.
 * Everything is drawn: no real screens, records or document templates.
 * Motion comes from CSS classes in globals.css and stops under reduced motion.
 */

const ACCENT = '#9b6dff'
const INK = '#f2f2f0'
const LINE = '#2b2637'
const LINE_STRONG = '#3d3750'
const MUTED = '#9a9aa0'
const PANEL = '#16131e'
const MONO = 'var(--font-jetbrains-mono), ui-monospace, monospace'
const SANS = 'var(--font-inter-tight), ui-sans-serif, sans-serif'

/** Small deterministic PRNG so server and client draw the same dots. */
function random(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Backdrop({ id, glowX, glowY }: { id: string; glowX: number; glowY: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx={glowX} cy={glowY} r='700' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor={ACCENT} stopOpacity='0.16' />
          <stop offset='1' stopColor={ACCENT} stopOpacity='0' />
        </radialGradient>
        <pattern id={`${id}-dots`} width='40' height='40' patternUnits='userSpaceOnUse'>
          <circle cx='2' cy='2' r='1.4' fill={LINE_STRONG} />
        </pattern>
      </defs>
      <rect width='1600' height='1000' fill='#0d0b13' />
      <rect width='1600' height='1000' fill={`url(#${id}-dots)`} opacity='0.55' />
      <rect width='1600' height='1000' fill={`url(#${id}-glow)`} />
    </>
  )
}

function Pill({
  x,
  y,
  text,
  accent = false,
  width
}: {
  x: number
  y: number
  text: string
  accent?: boolean
  width?: number
}) {
  const w = width ?? text.length * 13 + 44
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height='48' rx='24' fill={accent ? ACCENT : PANEL} stroke={accent ? ACCENT : LINE_STRONG} />
      <text x={w / 2} y='31' textAnchor='middle' fontFamily={MONO} fontSize='19' fill={accent ? '#0a0a0b' : INK}>
        {text}
      </text>
    </g>
  )
}

function SkeletonLines({ x, y, widths, gap = 22 }: { x: number; y: number; widths: number[]; gap?: number }) {
  return (
    <>
      {widths.map((width, index) => (
        <rect key={index} x={x} y={y + index * gap} width={width} height='9' rx='4.5' fill={LINE_STRONG} />
      ))}
    </>
  )
}

function EecIdArt() {
  return (
    <>
      <Backdrop id='eecid' glowX={760} glowY={480} />

      {/* NFC waves between the phone and the passport */}
      <g transform='translate(830 470)' fill='none' stroke={ACCENT} strokeWidth='5' strokeLinecap='round'>
        {[60, 110, 160].map((radius, index) => (
          <path
            key={radius}
            className='art-wave'
            style={{ animationDelay: `${index * 0.35}s` }}
            d={`M ${radius * Math.cos(-0.7)} ${radius * Math.sin(-0.7)} A ${radius} ${radius} 0 0 1 ${radius * Math.cos(0.7)} ${radius * Math.sin(0.7)}`}
          />
        ))}
      </g>

      {/* Passport */}
      <g transform='translate(1030 230) rotate(9)'>
        <rect width='380' height='520' rx='26' fill='#17141f' stroke={LINE_STRONG} strokeWidth='3' />
        <rect x='18' y='18' width='344' height='484' rx='16' fill='none' stroke={LINE} />
        <circle cx='190' cy='170' r='64' fill='none' stroke={ACCENT} strokeOpacity='0.7' strokeWidth='3' />
        <circle cx='190' cy='170' r='40' fill='none' stroke={ACCENT} strokeOpacity='0.35' strokeWidth='2' />
        <text x='190' y='290' textAnchor='middle' fontFamily={MONO} fontSize='24' letterSpacing='6' fill={INK}>
          PASSPORT
        </text>
        <g transform='translate(150 330)'>
          <rect width='80' height='58' rx='12' fill='none' stroke={ACCENT} strokeWidth='3' />
          <path d='M0 29 H80 M27 0 V58 M53 0 V58' stroke={ACCENT} strokeWidth='2' opacity='0.7' />
        </g>
        <text x='34' y='448' fontFamily={MONO} fontSize='19' fill={MUTED} opacity='0.8'>
          P&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </text>
        <text x='34' y='476' fontFamily={MONO} fontSize='19' fill={MUTED} opacity='0.8'>
          &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </text>
      </g>

      {/* Phone with a face scan */}
      <g transform='translate(420 120)'>
        <rect width='390' height='760' rx='58' fill='#14121b' stroke={LINE_STRONG} strokeWidth='3' />
        <rect x='150' y='22' width='90' height='22' rx='11' fill='#0a0a0b' />
        <g transform='translate(195 300)'>
          <circle r='150' fill='none' stroke={LINE} strokeWidth='2' />
          <circle cy='-28' r='62' fill='none' stroke={INK} strokeOpacity='0.55' strokeWidth='3' />
          <path
            d='M-105 120 C-95 50 -50 30 0 30 C50 30 95 50 105 120'
            fill='none'
            stroke={INK}
            strokeOpacity='0.55'
            strokeWidth='3'
          />
          <g stroke={ACCENT} strokeWidth='6' strokeLinecap='round' fill='none'>
            <path d='M-130 -90 V-130 H-90' />
            <path d='M130 -90 V-130 H90' />
            <path d='M-130 90 V130 H-90' />
            <path d='M130 90 V130 H90' />
          </g>
          <rect className='art-scan' x='-128' y='-4' width='256' height='4' rx='2' fill={ACCENT} opacity='0.8' />
        </g>
        <text x='195' y='520' textAnchor='middle' fontFamily={SANS} fontSize='26' fontWeight='600' fill={INK}>
          Verify identity
        </text>
        <rect x='65' y='560' width='260' height='10' rx='5' fill={LINE} />
        <rect x='65' y='560' width='180' height='10' rx='5' fill={ACCENT} />
        <SkeletonLines x={65} y={605} widths={[260, 200, 230]} />
      </g>

      <Pill x={90} y={160} text='NFC · ICAO 9303' />
      <Pill x={90} y={226} text='MRZ · OCR' />
      <Pill x={1120} y={840} text='FACE MATCH ✓' accent />
    </>
  )
}

function EecCustomsArt() {
  const columns = [
    { x: 110, label: 'SUBMITTED', cards: 3 },
    { x: 620, label: 'IN REVIEW', cards: 2 },
    { x: 1130, label: 'APPROVED', cards: 2 }
  ]
  return (
    <>
      <Backdrop id='customs' glowX={1250} glowY={420} />
      {columns.map((column, columnIndex) => (
        <g key={column.label} transform={`translate(${column.x} 150)`}>
          <text fontFamily={MONO} fontSize='20' letterSpacing='4' fill={columnIndex === 2 ? ACCENT : MUTED} y='0'>
            {column.label}
          </text>
          <rect y='22' width='360' height='2' fill={columnIndex === 2 ? ACCENT : LINE_STRONG} />
          {Array.from({ length: column.cards }).map((_, index) => {
            const highlight = columnIndex === 2 && index === 0
            return (
              <g key={index} transform={`translate(0 ${60 + index * 150})`}>
                <rect
                  width='360'
                  height='124'
                  rx='18'
                  fill={PANEL}
                  stroke={highlight ? ACCENT : LINE}
                  strokeWidth={highlight ? 3 : 1.5}
                />
                <rect
                  x='24'
                  y='24'
                  width='44'
                  height='56'
                  rx='8'
                  fill='none'
                  stroke={highlight ? ACCENT : LINE_STRONG}
                  strokeWidth='2.5'
                />
                <path
                  d='M34 42 H58 M34 54 H58 M34 66 H50'
                  stroke={highlight ? ACCENT : LINE_STRONG}
                  strokeWidth='2.5'
                />
                <SkeletonLines x={92} y={30} widths={[200, 150, 110]} gap={24} />
              </g>
            )
          })}
        </g>
      ))}

      {/* Flow arrows */}
      <g fill='none' stroke={ACCENT} strokeWidth='4' strokeLinecap='round'>
        <path className='art-dash' d='M 482 272 C 540 272 560 272 612 272' strokeDasharray='10 14' />
        <path d='M 600 260 L 614 272 L 600 284' strokeDasharray='0' />
        <path className='art-dash' d='M 992 272 C 1050 272 1070 272 1122 272' strokeDasharray='10 14' />
        <path d='M 1110 260 L 1124 272 L 1110 284' strokeDasharray='0' />
      </g>

      {/* Approval stamp */}
      <g transform='translate(1310 640) rotate(-14)' className='art-stamp'>
        <circle r='132' fill='#0d0b13' fillOpacity='0.6' stroke={ACCENT} strokeWidth='7' />
        <circle r='108' fill='none' stroke={ACCENT} strokeWidth='2.5' strokeDasharray='6 8' />
        <text
          y='14'
          textAnchor='middle'
          fontFamily={SANS}
          fontWeight='800'
          fontSize='46'
          letterSpacing='2'
          fill={ACCENT}>
          APPROVED
        </text>
        <text y='58' textAnchor='middle' fontFamily={MONO} fontSize='18' letterSpacing='5' fill={ACCENT}>
          E-CUSTOMS
        </text>
      </g>

      {/* Shipping container */}
      <g transform='translate(110 700)'>
        <rect width='330' height='150' rx='10' fill={PANEL} stroke={LINE_STRONG} strokeWidth='3' />
        {Array.from({ length: 9 }).map((_, index) => (
          <rect key={index} x={26 + index * 32} y='22' width='14' height='106' rx='4' fill={LINE} />
        ))}
        <text y='190' fontFamily={MONO} fontSize='18' letterSpacing='3' fill={MUTED}>
          MACHINERY · RAW MATERIALS
        </text>
      </g>
      <Pill x={560} y={780} text='DGA SIGNATURE' />
      <Pill x={560} y={846} text='NSW · ASYNC' />
    </>
  )
}

function FlapRow({ x, y, text, color, cells }: { x: number; y: number; text: string; color: string; cells: number }) {
  const chars = text.padEnd(cells, ' ').slice(0, cells).split('')
  return (
    <g transform={`translate(${x} ${y})`}>
      {chars.map((char, index) => (
        <g key={index} transform={`translate(${index * 38} 0)`}>
          <rect width='34' height='54' rx='5' fill='#1e1a28' />
          <rect y='26' width='34' height='2' fill='#0d0b13' />
          <text x='17' y='39' textAnchor='middle' fontFamily={MONO} fontSize='30' fontWeight='500' fill={color}>
            {char}
          </text>
        </g>
      ))}
    </g>
  )
}

function AirportGateArt() {
  const rows = [
    { gate: 'A1', time: '08:15', status: 'BOARDING', accent: true },
    { gate: 'B4', time: '08:40', status: 'ON TIME' },
    { gate: 'C2', time: '09:05', status: 'GATE OPEN' },
    { gate: 'D7', time: '09:30', status: 'ON TIME' }
  ]
  return (
    <>
      <Backdrop id='gate' glowX={500} glowY={300} />
      <g transform='translate(270 110)'>
        <rect width='1060' height='560' rx='30' fill='#14121b' stroke={LINE} strokeWidth='2' />
        <g transform='translate(60 70)'>
          <path
            d='M0 18 L46 18 L70 -6 L82 -6 L70 18 L96 18 L106 6 L114 6 L108 24 L114 42 L106 42 L96 30 L70 30 L82 54 L70 54 L46 30 L0 30 Z'
            fill={ACCENT}
          />
          <text x='140' y='38' fontFamily={SANS} fontSize='40' fontWeight='800' letterSpacing='1' fill={INK}>
            DEPARTURES
          </text>
        </g>
        {['GATE', 'TIME', 'STATUS'].map((label, index) => (
          <text
            key={label}
            x={[60, 230, 500][index]}
            y='170'
            fontFamily={MONO}
            fontSize='18'
            letterSpacing='4'
            fill={MUTED}>
            {label}
          </text>
        ))}
        {rows.map((row, index) => (
          <g key={row.gate}>
            <FlapRow x={60} y={195 + index * 86} text={row.gate} color={INK} cells={2} />
            <FlapRow x={230} y={195 + index * 86} text={row.time} color={INK} cells={5} />
            <FlapRow x={500} y={195 + index * 86} text={row.status} color={row.accent ? ACCENT : INK} cells={10} />
            {row.accent ? <circle className='art-blink' cx='980' cy={222 + index * 86} r='10' fill={ACCENT} /> : null}
          </g>
        ))}
      </g>

      {/* Export */}
      <g transform='translate(270 730)'>
        <text y='30' fontFamily={MONO} fontSize='20' letterSpacing='4' fill={MUTED}>
          FASTREPORT EXPORT
        </text>
        <path
          className='art-dash'
          d='M 330 22 H 540'
          stroke={ACCENT}
          strokeWidth='4'
          strokeDasharray='10 14'
          fill='none'
        />
        {[
          { x: 580, label: 'PDF' },
          { x: 760, label: 'XLSX' },
          { x: 940, label: 'PDF' }
        ].map((file, index) => (
          <g
            key={index}
            transform={`translate(${file.x} -36)`}
            className='art-float'
            style={{ animationDelay: `${index * 0.4}s` }}>
            <path
              d='M0 0 H100 L132 32 V150 H0 Z'
              fill={PANEL}
              stroke={index === 0 ? ACCENT : LINE_STRONG}
              strokeWidth='3'
            />
            <path d='M100 0 V32 H132' fill='none' stroke={index === 0 ? ACCENT : LINE_STRONG} strokeWidth='3' />
            <text
              x='66'
              y='110'
              textAnchor='middle'
              fontFamily={MONO}
              fontSize='26'
              fontWeight='600'
              fill={index === 0 ? ACCENT : INK}>
              {file.label}
            </text>
          </g>
        ))}
      </g>
    </>
  )
}

function LampangHealthArt() {
  const next = random(2048)
  const dots: { x: number; y: number; r: number; lit: boolean }[] = []
  let guard = 0
  while (dots.length < 220 && guard++ < 6000) {
    const angle = next() * Math.PI * 2
    const edge = 300 * (1 + 0.16 * Math.sin(3 * angle) + 0.09 * Math.cos(5 * angle + 1))
    const distance = Math.sqrt(next()) * edge
    const x = 560 + Math.cos(angle) * distance * 1.05
    const y = 520 + Math.sin(angle) * distance * 0.95
    if (dots.some(dot => (dot.x - x) ** 2 + (dot.y - y) ** 2 < 26 ** 2)) continue
    dots.push({ x, y, r: 4 + next() * 3, lit: false })
  }
  dots.forEach((dot, index) => {
    if (index % 12 === 0) dot.lit = true
  })
  const linked = dots.filter(dot => dot.lit).slice(0, 7)

  return (
    <>
      <Backdrop id='health' glowX={560} glowY={520} />
      <g fill='none' stroke={ACCENT} strokeOpacity='0.35' strokeWidth='2'>
        {linked.map((dot, index) => (
          <path
            key={index}
            d={`M ${dot.x} ${dot.y} C ${dot.x + 200} ${dot.y}, 980 ${420 + index * 40}, 1090 ${420 + index * 40}`}
          />
        ))}
      </g>
      {dots.map((dot, index) =>
        dot.lit ? (
          <g key={index}>
            <circle
              className='art-ping'
              cx={dot.x}
              cy={dot.y}
              r='16'
              fill='none'
              stroke={ACCENT}
              strokeWidth='2'
              style={{ animationDelay: `${(index % 7) * 0.4}s`, transformOrigin: `${dot.x}px ${dot.y}px` }}
            />
            <circle cx={dot.x} cy={dot.y} r={dot.r + 1.5} fill={ACCENT} />
          </g>
        ) : (
          <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} fill={LINE_STRONG} />
        )
      )}

      <text x='110' y='150' fontFamily={SANS} fontSize='110' fontWeight='800' letterSpacing='-4' fill={INK}>
        200+
      </text>
      <text x='116' y='196' fontFamily={MONO} fontSize='20' letterSpacing='4' fill={MUTED}>
        HOSPITAL SITES · LAMPANG
      </text>

      {/* Report generated in the background */}
      <g transform='translate(1090 300)'>
        <rect width='390' height='460' rx='24' fill={PANEL} stroke={LINE_STRONG} strokeWidth='2.5' />
        <text x='34' y='62' fontFamily={MONO} fontSize='20' letterSpacing='4' fill={MUTED}>
          REPORT
        </text>
        <SkeletonLines x={34} y={100} widths={[300, 250, 280, 190]} gap={30} />
        <g transform='translate(34 250)'>
          {[90, 140, 70, 170, 120, 150].map((height, index) => (
            <rect
              key={index}
              x={index * 52}
              y={170 - height}
              width='34'
              height={height}
              rx='6'
              fill={index === 3 ? ACCENT : LINE_STRONG}
            />
          ))}
        </g>
        <text x='34' y='450' fontFamily={MONO} fontSize='16' fill={ACCENT}>
          background job · done
        </text>
        <circle cx='340' cy='52' r='24' fill={ACCENT} />
        <path
          d='M329 52 L337 60 L352 44'
          fill='none'
          stroke='#0a0a0b'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <Pill x={1090} y={800} text='COGNITO ↔ FUSIONAUTH' />
    </>
  )
}

const arts: Record<ArtId, () => React.ReactNode> = {
  'eec-id': EecIdArt,
  'eec-customs': EecCustomsArt,
  'airport-gate': AirportGateArt,
  'lampang-health': LampangHealthArt
}

export default function CoverArt({
  id,
  label,
  className,
  fill = false
}: {
  id: ArtId
  label: string
  className?: string
  /** Cover the parent box (cropping the edges) instead of keeping 16:10. */
  fill?: boolean
}) {
  const Art = arts[id]
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line', className)}>
      <svg
        viewBox='0 0 1600 1000'
        // Decorative when there's no label (e.g. a thumbnail next to the project title): hide it instead of an unnamed image.
        {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
        preserveAspectRatio={fill ? 'xMidYMid slice' : undefined}
        className={fill ? 'block h-full w-full' : 'block h-auto w-full'}>
        <Art />
      </svg>
    </div>
  )
}
