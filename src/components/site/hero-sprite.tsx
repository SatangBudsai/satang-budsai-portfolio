'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

/** Row order of the sprite sheet, matching Math.round(angle / 45) from east, clockwise on screen. */
const DIRECTIONS = ['east', 'south-east', 'south', 'south-west', 'west', 'north-west', 'north', 'north-east'] as const
const SOUTH = 2

type Props = {
  /** One PNG: a row per direction (order above), a column per typing frame. */
  sheet: string
  frames: number
  /** Native height of one frame in pixels (frames are 2:3). */
  cell: number
  alt: string
  /** Lines the speech bubble types out, one after another. */
  lines: string[]
  className?: string
}

/**
 * The pixel "me" in the hero: always typing, turns to look at the pointer,
 * and chats in a speech bubble. Goes back to facing the visitor after a few
 * idle seconds. Animation stops for reduced motion (CSS handles it).
 */
export default function HeroSprite({ sheet, frames, cell, alt, lines, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState(SOUTH)
  const text = useTypewriter(lines)

  useEffect(() => {
    let idle: ReturnType<typeof setTimeout> | undefined
    const onMove = (event: PointerEvent) => {
      const box = ref.current?.getBoundingClientRect()
      if (!box) return
      const dx = event.clientX - (box.left + box.width / 2)
      const dy = event.clientY - (box.top + box.height * 0.4)
      // Close to the face: look at the visitor.
      const next =
        Math.hypot(dx, dy) < box.width * 0.35 ? SOUTH : (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8
      setDirection(next)
      clearTimeout(idle)
      idle = setTimeout(() => setDirection(SOUTH), 4000)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      clearTimeout(idle)
    }
  }, [])

  return (
    <div className={cn('relative w-[128px] shrink-0', className)}>
      <p
        aria-hidden='true'
        className='pixel-bubble font-pixel-ui absolute bottom-[calc(100%+10px)] left-2 z-10 min-h-9 w-max max-w-[min(17rem,calc(100vw-3rem))] min-w-[7.5rem] px-3 py-2 text-[12px] leading-snug text-[#120d1d]'>
        {text}
        <span className='pixel-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[#120d1d]' />
      </p>
      <div
        ref={ref}
        role='img'
        aria-label={alt}
        data-direction={DIRECTIONS[direction]}
        className='pixel-sprite relative z-[1] aspect-[2/3] w-full'
        style={
          {
            backgroundImage: `url(${sheet})`,
            backgroundSize: `${frames * 100}% ${DIRECTIONS.length * 100}%`,
            backgroundPositionY: `${(direction / (DIRECTIONS.length - 1)) * 100}%`,
            '--sprite-steps': frames,
            '--sprite-cell': `${cell}px`
          } as React.CSSProperties
        }
      />
      {/* A stepped pixel shadow under the feet. */}
      <span className='pixel-shadow absolute -bottom-1 left-1/2 h-3 w-20 -translate-x-1/2' aria-hidden='true' />
    </div>
  )
}

/** Types each line, holds it, then moves on. Shows whole lines when motion is reduced. */
function useTypewriter(lines: string[]) {
  const [state, setState] = useState({ line: 0, chars: 0 })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const current = lines[state.line] ?? ''
    const chars = Array.from(current).length
    let delay: number
    let next: { line: number; chars: number }
    if (reduce) {
      delay = state.chars === 0 ? 0 : 4000
      next = state.chars === 0 ? { line: state.line, chars } : { line: (state.line + 1) % lines.length, chars: 0 }
    } else if (state.chars < chars) {
      delay = 45
      next = { line: state.line, chars: state.chars + 1 }
    } else {
      delay = 2600
      next = { line: (state.line + 1) % lines.length, chars: 0 }
    }
    const timer = setTimeout(() => setState(next), delay)
    return () => clearTimeout(timer)
  }, [state, lines])

  return Array.from(lines[state.line] ?? '')
    .slice(0, state.chars)
    .join('')
}
