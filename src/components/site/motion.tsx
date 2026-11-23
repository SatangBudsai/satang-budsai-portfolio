'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/*
 * Small motion helpers without an animation library: they run on every page, so they
 * stay out of the first-load JavaScript. (motion/react is still used by a few
 * page-specific components.)
 */

/** Fades and lifts its children the first time they scroll into view (`.reveal` in globals.css). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = 'div'
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const Component = as as 'div'
  return (
    <Component
      ref={ref}
      data-shown={shown || undefined}
      className={cn('reveal', className)}
      style={{ '--reveal-y': `${y}px`, '--reveal-delay': `${delay}s` } as CSSProperties}>
      {children}
    </Component>
  )
}

/** Pulls its child toward the pointer on devices with a fine pointer. */
export function Magnetic({
  children,
  strength = 0.3,
  className
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const move = (x: number, y: number) => {
    if (ref.current) ref.current.style.translate = `${x}px ${y}px`
  }
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex transition-[translate] duration-300 ease-out motion-reduce:transition-none',
        className
      )}
      onPointerMove={event => {
        if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const rect = event.currentTarget.getBoundingClientRect()
        move(
          (event.clientX - rect.left - rect.width / 2) * strength,
          (event.clientY - rect.top - rect.height / 2) * strength
        )
      }}
      onPointerLeave={() => move(0, 0)}>
      {children}
    </span>
  )
}

/** The current time in a given time zone, rendered after mount to avoid a hydration mismatch. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' })
    const update = () => setTime(format.format(new Date()))
    update()
    const timer = window.setInterval(update, 15_000)
    return () => window.clearInterval(timer)
  }, [timeZone])
  return (
    <time suppressHydrationWarning className='tabular-nums'>
      {time ?? '--:--'}
    </time>
  )
}
