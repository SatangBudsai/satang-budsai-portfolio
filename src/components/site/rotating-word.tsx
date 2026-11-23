'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

/** Cycles through words with a small rise-in (CSS `.word-in`); screen readers get the last word only. */
export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % words.length), 2200)
    return () => window.clearInterval(timer)
  }, [words.length])

  return (
    <span className={cn('relative inline-grid', className)}>
      <span className='sr-only'>{words[words.length - 1]}</span>
      <span key={words[index]} aria-hidden='true' className='word-in col-start-1 row-start-1 inline-block'>
        {words[index]}
      </span>
    </span>
  )
}
