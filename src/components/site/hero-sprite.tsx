'use client'

import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { cn } from '@/lib/utils'

/** Row order of the sprite sheet, matching Math.round(angle / 45) from east, clockwise on screen. */
const DIRECTIONS = ['east', 'south-east', 'south', 'south-west', 'west', 'north-west', 'north', 'north-east'] as const
const SOUTH = 2

/** Fired by the section menu when the reader reaches a new section (detail: section id). */
export const SECTION_EVENT = 'cv:section'

type Props = {
  /** One PNG: a row per direction (order above), a column per typing frame. */
  sheet: string
  frames: number
  /** Frame size in pixels (drawn at exactly 2×). */
  cellWidth: number
  cellHeight: number
  alt: string
  /** Lines the speech bubble cycles through. */
  lines: string[]
  /** A line to say when the reader reaches each section, by section id. */
  sectionLines?: Record<string, string>
  labels: { pause: string; play: string }
  /** Shown to the right of the character (the name block). */
  children?: React.ReactNode
  className?: string
}

/**
 * The pixel "me" behind a desk: types, turns to look at the pointer, and talks
 * about whichever section you're reading. It stops when it's off screen or the
 * tab is hidden, and the visitor can pause it (WCAG 2.2.2).
 */
export default function HeroSprite({
  sheet,
  frames,
  cellWidth,
  cellHeight,
  alt,
  lines,
  sectionLines,
  labels,
  children,
  className
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState(SOUTH)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [idle, setIdle] = useState(false)
  const running = !paused && visible && !idle
  const text = useTypewriter(lines, sectionLines, running)

  // Rest after 30 seconds without the pointer moving; wake on the next movement.
  useEffect(() => {
    let timer = setTimeout(() => setIdle(true), 30000)
    const wake = () => {
      setIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIdle(true), 30000)
    }
    window.addEventListener('pointermove', wake, { passive: true })
    window.addEventListener('keydown', wake)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [])

  // Only animate while on screen and while the tab is showing.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let onScreen = true
    const update = () => setVisible(onScreen && document.visibilityState === 'visible')
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    observer.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  // Face the pointer, at most once per frame.
  useEffect(() => {
    if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let idle: ReturnType<typeof setTimeout> | undefined
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        const dx = event.clientX - (box.left + box.width / 2)
        const dy = event.clientY - (box.top + box.height * 0.35)
        const next =
          Math.hypot(dx, dy) < box.width * 0.4 ? SOUTH : (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8
        setDirection(next)
        clearTimeout(idle)
        idle = setTimeout(() => setDirection(SOUTH), 4000)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      cancelAnimationFrame(frame)
      clearTimeout(idle)
    }
  }, [paused, visible])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className='flex items-end gap-2'>
        {/* The full line sits invisibly underneath, so the bubble doesn't resize while typing. */}
        <p
          aria-hidden='true'
          className='pixel-bubble font-pixel-ui relative ml-2 grid w-max max-w-[min(20rem,calc(100%-1rem))] min-w-[7.5rem] px-3 py-2 text-[12px] leading-snug text-[#120d1d]'>
          <span className='invisible col-start-1 row-start-1'>{text.full}▮</span>
          <span className='col-start-1 row-start-1'>
            {text.shown}
            {running ? (
              <span className='pixel-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[#120d1d]' />
            ) : null}
          </span>
        </p>
        <button
          type='button'
          onClick={() => setPaused(value => !value)}
          aria-pressed={paused}
          aria-label={paused ? labels.play : labels.pause}
          title={paused ? labels.play : labels.pause}
          className='sr-only inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-background text-muted-foreground focus:not-sr-only focus:relative'>
          <Icon icon={paused ? appIcons.play : appIcons.pause} className='size-3.5' aria-hidden='true' />
        </button>
      </div>
      <div className='flex items-end gap-4 sm:gap-5'>
        <div className='relative shrink-0' style={{ width: cellWidth * 2 }}>
          <div
            ref={ref}
            role='img'
            aria-label={alt}
            data-direction={DIRECTIONS[direction]}
            className='pixel-sprite relative z-[1] w-full'
            style={
              {
                aspectRatio: `${cellWidth} / ${cellHeight}`,
                backgroundImage: `url(${sheet})`,
                backgroundSize: `${frames * 100}% ${DIRECTIONS.length * 100}%`,
                backgroundPositionY: `${(direction / (DIRECTIONS.length - 1)) * 100}%`,
                animationPlayState: running ? 'running' : 'paused',
                '--sprite-steps': frames
              } as React.CSSProperties
            }
          />
          {/* The desk the laptop rests on. */}
          <span
            className='pixel-desk absolute -bottom-3 left-1/2 z-[2] h-4 w-[calc(100%+1rem)] -translate-x-1/2'
            aria-hidden='true'
          />
        </div>
        {children}
      </div>
    </div>
  )
}

/** Types each line, holds it, then moves on; jumps to a section's line when one is announced. */
function useTypewriter(lines: string[], sectionLines: Record<string, string> | undefined, running: boolean) {
  const [state, setState] = useState({ text: lines[0] ?? '', next: 1, chars: 0 })

  useEffect(() => {
    if (!sectionLines) return
    const onSection = (event: Event) => {
      const line = sectionLines[(event as CustomEvent<string>).detail]
      if (line) setState(current => (current.text === line ? current : { ...current, text: line, chars: 0 }))
    }
    window.addEventListener(SECTION_EVENT, onSection)
    return () => window.removeEventListener(SECTION_EVENT, onSection)
  }, [sectionLines])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const length = Array.from(state.text).length
    const typing = state.chars < length
    // Paused or reduced motion: show the whole line and stop cycling.
    if (!running || reduce) {
      if (!typing) return
      const timer = setTimeout(() => setState(current => ({ ...current, chars: length })), 0)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(
      () =>
        setState(current =>
          typing
            ? { ...current, chars: current.chars + 1 }
            : { text: lines[current.next % lines.length] ?? '', next: current.next + 1, chars: 0 }
        ),
      typing ? 40 : 3200
    )
    return () => clearTimeout(timer)
  }, [state, lines, running])

  return { full: state.text, shown: Array.from(state.text).slice(0, state.chars).join('') }
}
