'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * A timeline line beside a list that fills with the accent colour as you read
 * down it — so moving from one job to the next is something you can see.
 */
export default function ScrollRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const start = window.innerHeight * 0.75
      const end = window.innerHeight * 0.55
      // 0 when the list's top reaches 75% of the viewport, 1 when its bottom reaches 55%.
      const progress = (start - rect.top) / (rect.height - end + start)
      fill.current?.style.setProperty('scale', `1 ${Math.min(1, Math.max(0, progress))}`)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  return (
    <div ref={ref} className='relative sm:pl-6'>
      <span className='absolute top-2 bottom-2 left-0 hidden w-px bg-line sm:block' aria-hidden='true' />
      <span
        ref={fill}
        className='absolute top-2 bottom-2 left-0 hidden w-px origin-top bg-primary transition-[scale] duration-150 ease-out sm:block'
        style={{ scale: '1 0' }}
        aria-hidden='true'
      />
      {children}
    </div>
  )
}
