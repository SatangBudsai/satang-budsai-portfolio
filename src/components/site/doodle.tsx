import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

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
