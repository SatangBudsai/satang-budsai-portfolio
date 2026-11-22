'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * A timeline line beside a list that fills with the accent colour as you read
 * down it — so moving from one job to the next is something you can see.
 */
export default function ScrollRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <div ref={ref} className='relative sm:pl-6'>
      <span className='absolute top-2 bottom-2 left-0 hidden w-px bg-line sm:block' aria-hidden='true' />
      <motion.span
        className='absolute top-2 bottom-2 left-0 hidden w-px origin-top bg-primary sm:block'
        style={{ scaleY }}
        aria-hidden='true'
      />
      {children}
    </div>
  )
}
