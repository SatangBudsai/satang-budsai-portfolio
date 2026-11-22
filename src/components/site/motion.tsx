'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

/** Fades and lifts its children the first time they scroll into view. */
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
  // Same element on server and client; MotionConfig (reducedMotion='user') skips the lift.
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: easeOutExpo, delay }}>
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
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 })

  return (
    <motion.span
      className={cn('inline-flex', className)}
      style={{ x: springX, y: springY }}
      onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * strength)
        y.set((event.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}>
      {children}
    </motion.span>
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
