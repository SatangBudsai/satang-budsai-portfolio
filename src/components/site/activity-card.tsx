'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useSyncExternalStore } from 'react'

import { GLYPHS } from '@/lib/pixel-font'
import { cn } from '@/lib/utils'

type Category = 'work' | 'freelance' | 'own'
type Day = Partial<Record<Category, number>>
type Product = { key: string; title: string; icon: string; href: string; version: string; tone: string }

// Series colours follow the active palette (see globals.css).
export const categoryTone: Record<Category, string> = {
  work: 'var(--primary)',
  freelance: 'var(--series-2)',
  own: 'var(--series-3)'
}
const order: Category[] = ['work', 'freelance', 'own']
const heat = [
  'color-mix(in oklab, var(--foreground) 7%, var(--card))',
  'color-mix(in oklab, var(--primary) 36%, var(--card))',
  'color-mix(in oklab, var(--primary) 52%, var(--card))',
  'color-mix(in oklab, var(--primary) 80%, var(--card))',
  'color-mix(in oklab, var(--primary) 70%, white)'
]

/** Which (week, weekday) cells fall inside the letters of `word`, centred in 53 weeks. */
function wordMask(word: string) {
  const width = word.length * 6 - 1
  const left = Math.floor((53 - width) / 2)
  const cells = new Set<string>()
  ;[...word].forEach((letter, index) =>
    GLYPHS[letter]?.forEach((row, d) =>
      [...row].forEach((pixel, x) => pixel === '#' && cells.add(`${left + index * 6 + x}:${d}`))
    )
  )
  return cells
}
const MASK = wordMask('SATANG')

const sum = (day: Day | undefined) => (day ? order.reduce((total, key) => total + (day[key] ?? 0), 0) : 0)
const iso = (date: Date) => date.toISOString().slice(0, 10)

/**
 * Twelve months of commits across day job, freelance and own repos: headline
 * numbers, a contribution heatmap and monthly bars. Every number is counted
 * from the repos' git history by scripts/activity/collect-activity.mts.
 */
export default function ActivityCard({
  days,
  until,
  repos,
  featureReleases,
  products,
  labels
}: {
  days: Record<string, Day>
  until: string
  repos: number
  /** Minor-version releases (patch tags left out). */
  featureReleases: number
  products: readonly Product[]
  lang: 'en'
  labels: {
    period: string
    commits: string
    activeDays: string
    repos: string
    releases: string
    footnote: string
    hintTouch: string
    month: string
    categories: Record<Category, string>
    commitsUnit: string
    hint: string
    shipping: string
    chart: string
    word: string
    raw: string
  }
}) {
  const [hover, setHover] = useState<string | null>(null)
  const [raw, setRaw] = useState(false)
  const touch = useSyncExternalStore(
    onChange => {
      const query = window.matchMedia('(hover: none)')
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(hover: none)').matches,
    () => false
  )
  const locale = 'en-US'

  const { weeks, months, totals, levels, monthLabels } = useMemo(() => {
    // 53 columns of Monday→Sunday, ending with the week that holds `until`.
    const end = new Date(`${until}T00:00:00Z`)
    const endWeekday = (end.getUTCDay() + 6) % 7
    const start = new Date(end)
    start.setUTCDate(start.getUTCDate() - endWeekday - 52 * 7)
    const weeks: { date: string; inRange: boolean }[][] = []
    const cursor = new Date(start)
    for (let w = 0; w < 53; w++) {
      const week = []
      for (let d = 0; d < 7; d++) {
        week.push({ date: iso(cursor), inRange: cursor <= end })
        cursor.setUTCDate(cursor.getUTCDate() + 1)
      }
      weeks.push(week)
    }
    const monthLabels = weeks.map((week, index) => {
      const first = week.find(day => day.date.endsWith('-01') || (index === 0 && day === week[0]))
      return first && index > 0
        ? new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(`${first.date}T00:00:00Z`))
        : ''
    })

    const counts = Object.values(days)
      .map(sum)
      .filter(Boolean)
      .sort((a, b) => a - b)
    const quantile = (q: number) => counts[Math.min(counts.length - 1, Math.floor(q * counts.length))] ?? 1
    const levels = [quantile(0.25), quantile(0.5), quantile(0.8)]

    const months: { month: string; counts: Record<Category, number> }[] = []
    const monthCursor = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 11, 1))
    for (let m = 0; m < 12; m++) {
      months.push({ month: iso(monthCursor).slice(0, 7), counts: { work: 0, freelance: 0, own: 0 } })
      monthCursor.setUTCMonth(monthCursor.getUTCMonth() + 1)
    }
    const totals = { commits: 0, activeDays: 0, work: 0, freelance: 0, own: 0 }
    for (const [date, day] of Object.entries(days)) {
      const total = sum(day)
      if (!total) continue
      totals.commits += total
      totals.activeDays += 1
      for (const key of order) totals[key] += day[key] ?? 0
      const month = months.find(item => item.month === date.slice(0, 7))
      if (month) for (const key of order) month.counts[key] += day[key] ?? 0
    }
    return { weeks, months, totals, levels, monthLabels }
  }, [days, until, locale])

  const level = (count: number) =>
    count === 0 ? 0 : count <= levels[0] ? 1 : count <= levels[1] ? 2 : count <= levels[2] ? 3 : 4
  const maxMonth = Math.max(...months.map(m => sum(m.counts)), 1)
  const number = (value: number) => new Intl.NumberFormat(locale).format(value)

  const hovered = hover ? days[hover] : undefined
  const status = hover
    ? `${new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(
        new Date(`${hover}T00:00:00Z`)
      )} · ${number(sum(hovered))} ${labels.commitsUnit}`
    : touch
      ? labels.hintTouch
      : labels.hint

  // Volume first (commits, days, repos), then what came out of it (tools, releases).
  const stats = [
    { value: number(totals.activeDays), label: labels.activeDays },
    { value: number(repos), label: labels.repos },
    { value: number(products.length), label: labels.commits },
    { value: number(featureReleases), label: labels.releases }
  ]

  return (
    <div className='rounded-[1.75rem] border border-line bg-card p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <span className='font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase'>{labels.period}</span>
      </div>

      <dl className='mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4'>
        {stats.map(stat => (
          <div key={stat.label} className='flex flex-col-reverse justify-end gap-1'>
            <dt className='text-xs text-muted-foreground'>{stat.label}</dt>
            <dd className='text-[clamp(24px,2.2vw,34px)] leading-none font-extrabold tracking-[-0.035em] tabular-nums'>
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Contribution heatmap */}
      <div className='mt-4' role='img' aria-label={labels.chart}>
        <div className='hidden grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] sm:grid' aria-hidden='true'>
          {monthLabels.map((label, index) => (
            <span
              key={index}
              className='h-4 overflow-visible font-mono text-[11px] leading-4 whitespace-nowrap text-muted-foreground sm:text-[12px]'>
              {label}
            </span>
          ))}
        </div>
        <div
          className={cn(
            'heat-word grid grid-flow-col grid-cols-[repeat(53,minmax(0,1fr))] grid-rows-7 gap-[2px] sm:gap-[3px]',
            raw && 'is-raw'
          )}
          aria-hidden='true'>
          {weeks.flatMap((week, w) =>
            week.map((day, d) => {
              const count = sum(days[day.date])
              return (
                <span
                  key={day.date}
                  data-g={MASK.has(`${w}:${d}`) ? '' : undefined}
                  onPointerEnter={() => day.inRange && setHover(day.date)}
                  onPointerLeave={() => setHover(null)}
                  onClick={() => day.inRange && setHover(day.date)}
                  className={cn(
                    'heat-cell block aspect-square rounded-[2px] sm:rounded-[3px]',
                    !day.inRange && 'invisible',
                    hover === day.date && 'ring-1 ring-foreground'
                  )}
                  style={{ backgroundColor: heat[level(count)], '--w': w } as React.CSSProperties}
                />
              )
            })
          )}
        </div>
      </div>
      <div className='mt-2 flex items-center justify-between gap-3'>
        <p className='min-h-4 min-w-0 truncate font-mono text-[12px] text-muted-foreground' aria-hidden='true'>
          {status}
        </p>
        <button
          type='button'
          onClick={() => setRaw(value => !value)}
          aria-pressed={raw}
          className='font-pixel-ui shrink-0 rounded-full border border-line px-2.5 py-0.5 text-[10px] tracking-[0.06em] text-muted-foreground uppercase transition-colors hover:border-primary hover:text-primary'>
          {raw ? labels.word : labels.raw}
        </button>
      </div>

      <div className='sr-only'>
        <table>
          <caption>{labels.chart}</caption>
          <thead>
            <tr>
              <th scope='col'>{labels.month}</th>
              {order.map(key => (
                <th key={key} scope='col'>
                  {labels.categories[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map(month => (
              <tr key={month.month}>
                <th scope='row'>
                  {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
                    new Date(`${month.month}-01T00:00:00Z`)
                  )}
                </th>
                {order.map(key => (
                  <td key={key}>{month.counts[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly bars by category */}
      <div className='mt-3 flex h-20 items-end gap-1.5 sm:gap-2' aria-hidden='true'>
        {months.map((month, index) => (
          <div key={month.month} className='flex h-full flex-1 flex-col justify-end'>
            <div
              className='bar-grow flex w-full flex-col-reverse overflow-hidden rounded-t-[5px]'
              style={{ height: `${(sum(month.counts) / maxMonth) * 100}%`, '--i': index } as React.CSSProperties}>
              <span className='block flex-1 bg-primary/80' />
            </div>
          </div>
        ))}
      </div>
      <div className='mt-1.5 flex gap-1.5 sm:gap-2' aria-hidden='true'>
        {months.map((month, index) => (
          <span
            key={month.month}
            className={cn(
              'flex-1 text-center font-mono text-[11px] text-muted-foreground sm:text-[12px]',
              index % 2 === 1 && 'max-sm:invisible'
            )}>
            {new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(`${month.month}-01T00:00:00Z`))}
          </span>
        ))}
      </div>

      {/* What ships from the "own" slice */}
      <div className='mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line pt-4'>
        <span className='mr-1 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase'>
          {labels.shipping}
        </span>
        {products.map(product => {
          const external = product.href.startsWith('http')
          const body = (
            <>
              <Image
                src={product.icon}
                alt=''
                width={28}
                height={28}
                unoptimized={product.icon.endsWith('.svg')}
                className='size-6 rounded-[7px] border border-white/10 bg-[#17141f] object-contain p-px transition-transform duration-300 group-hover:-rotate-6'
              />
              <span className='text-xs font-medium'>
                {product.title.replace('Git Control for ', '').replace(' Report', '')}
              </span>
            </>
          )
          const className =
            'group inline-flex items-center gap-1.5 rounded-xl py-1 pr-1.5 transition-colors hover:bg-white/[0.04]'
          return external ? (
            <a
              key={product.key}
              href={product.href}
              target='_blank'
              rel='noreferrer'
              aria-label={`${product.title} ${product.version}`}
              title={product.version}
              className={className}>
              {body}
            </a>
          ) : (
            <Link
              key={product.key}
              href={product.href}
              aria-label={`${product.title} ${product.version}`}
              title={product.version}
              className={className}>
              {body}
            </Link>
          )
        })}
      </div>
      <p className='mt-3 text-[12px] leading-relaxed text-muted-foreground'>{labels.footnote}</p>
    </div>
  )
}
