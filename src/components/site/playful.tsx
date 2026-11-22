'use client'

import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

function Letter({ char, delay, reduced }: { char: string; delay: number; reduced: boolean | null }) {
  const controls = useAnimationControls()
  const [serif, setSerif] = useState(false)
  const busy = useRef(false)

  const bounce = async () => {
    if (reduced || busy.current) return
    busy.current = true
    await controls.start({
      y: ['0%', '-16%', '0%'],
      rotate: [0, -6, 4, 0],
      transition: { duration: 0.55, ease: 'easeOut' }
    })
    busy.current = false
  }

  // The outer span rises in (declarative, so reduced motion simply lands it in
  // place); the inner one bounces on hover.
  return (
    <motion.span
      className='inline-block will-change-transform'
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.1, ease: easeOutExpo, delay }}>
      <motion.span
        className={cn('inline-block cursor-default select-none', serif && 'accent-serif text-primary')}
        animate={controls}
        onPointerEnter={bounce}
        onClick={() => setSerif(value => !value)}>
        {char === ' ' ? ' ' : char}
      </motion.span>
    </motion.span>
  )
}

/**
 * The hero name. Letters rise in on load, bounce when the pointer touches them,
 * and switch to the serif italic when clicked. Purely decorative: screen readers
 * get the plain name.
 */
export function PlayfulName({ lines, className }: { lines: string[]; className?: string }) {
  const reduced = useReducedMotion()
  let order = 0
  return (
    <span className={className}>
      <span className='sr-only'>{lines.join(' ')}</span>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className='block overflow-hidden pb-[0.06em]' aria-hidden='true'>
          {Array.from(line).map((char, index) => (
            <Letter key={index} char={char} delay={0.55 + order++ * 0.035} reduced={reduced} />
          ))}
        </span>
      ))}
    </span>
  )
}

/** A handwritten note with a doodled arrow, pointing at whatever sits below-left of it. */
export function Doodle({
  children,
  className,
  flip = false
}: {
  children: ReactNode
  className?: string
  flip?: boolean
}) {
  return (
    <span
      className={cn('inline-flex items-start gap-1 font-hand text-2xl leading-none text-primary', className)}
      aria-hidden='true'>
      <svg
        viewBox='0 0 80 60'
        className={cn('mt-3 h-10 w-14 shrink-0', flip && '-scale-x-100')}
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'>
        <path className='doodle-draw' d='M74 6 C50 4 26 14 18 40' />
        <path className='doodle-draw' d='M10 30 L18 42 L28 32' />
      </svg>
      <span className='rotate-[-3deg]'>{children}</span>
    </span>
  )
}

/** Cycles through words in place, e.g. "Let’s build [a back office]". */
export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % words.length), 2200)
    return () => window.clearInterval(timer)
  }, [reduced, words.length])

  return (
    <span className={cn('relative inline-grid', className)}>
      <span className='sr-only'>{words[words.length - 1]}</span>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden='true'
          className='col-start-1 row-start-1 inline-block'
          initial={{ y: '60%', opacity: 0, rotate: -4 }}
          animate={{ y: '0%', opacity: 1, rotate: 0 }}
          exit={{ y: '-60%', opacity: 0, rotate: 4 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

type Piece = {
  id: number
  x: number
  drift: number
  spin: number
  size: number
  round: boolean
  delay: number
  duration: number
}

/**
 * Small surprises: type "ship" anywhere for confetti, and a hello in the
 * console for anyone who opens dev tools.
 */
export function EasterEggs({ consoleLines }: { consoleLines: string[] }) {
  const reduced = useReducedMotion()
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    console.log(`%c${consoleLines[0]}`, 'font: 700 20px system-ui; color: #9b6dff')
    for (const line of consoleLines.slice(1)) console.log(line)
  }, [consoleLines])

  useEffect(() => {
    let typed = ''
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
      if (event.key.length !== 1) return
      typed = (typed + event.key.toLowerCase()).slice(-4)
      if (typed === 'ship' && !reduced) {
        typed = ''
        const seed = Date.now()
        setPieces(
          Array.from({ length: 70 }, (_, index) => ({
            id: seed + index,
            x: Math.random() * 100,
            drift: (Math.random() - 0.5) * 30,
            spin: (Math.random() - 0.5) * 720,
            size: 6 + Math.random() * 10,
            round: Math.random() > 0.6,
            delay: Math.random() * 0.4,
            duration: 2.4 + Math.random()
          }))
        )
        window.setTimeout(() => setPieces([]), 3200)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [reduced])

  if (!pieces.length) return null
  return (
    <div className='pointer-events-none fixed inset-0 z-[80] overflow-hidden' aria-hidden='true'>
      {pieces.map(piece => (
        <motion.span
          key={piece.id}
          className={cn('absolute top-0', piece.round ? 'rounded-full bg-foreground' : 'rounded-[2px] bg-primary')}
          style={{ left: `${piece.x}%`, width: piece.size, height: piece.round ? piece.size : piece.size * 0.5 }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '105vh', x: `${piece.drift}vw`, rotate: piece.spin, opacity: [1, 1, 0.8] }}
          transition={{ duration: piece.duration, ease: [0.2, 0.6, 0.4, 1], delay: piece.delay }}
        />
      ))}
    </div>
  )
}

/** A phrase with a hand-drawn marker stroke behind it. */
export function Marked({ children }: { children: ReactNode }) {
  return (
    <span className='relative inline-block font-semibold whitespace-nowrap text-foreground'>
      <svg
        viewBox='0 0 200 24'
        preserveAspectRatio='none'
        className='absolute bottom-[-0.05em] -left-1 h-[0.55em] w-[calc(100%+0.5rem)] text-primary/60'
        aria-hidden='true'>
        <path
          className='doodle-draw'
          d='M3 15 C 50 7, 120 9, 197 12'
          fill='none'
          stroke='currentColor'
          strokeWidth='12'
          strokeLinecap='round'
        />
      </svg>
      <span className='relative'>{children}</span>
    </span>
  )
}
