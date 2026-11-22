'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { SECTION_EVENT } from './hero-sprite'

/**
 * The résumé's table of contents: highlights the section being read.
 * A line grows next to the active item, like a cursor in a document.
 */
export default function SectionNav({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter(el => el !== null)
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActive(visible[0].target.id)
          if (window.matchMedia('(min-width: 1024px)').matches)
            window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: visible[0].target.id }))
        }
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label={label}>
      <ul className='flex flex-col gap-1'>
        {items.map((item, index) => {
          const current = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? 'location' : undefined}
                className='group flex min-h-9 items-center gap-4'>
                <span
                  className={cn(
                    'h-px transition-all duration-300 group-hover:w-16 group-hover:bg-foreground',
                    current ? 'w-16 bg-primary' : 'w-8 bg-line-strong'
                  )}
                  aria-hidden='true'
                />
                <span
                  className={cn(
                    'font-mono text-xs tracking-[0.14em] uppercase transition-colors group-hover:text-foreground',
                    current ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                  <span className='mr-2 text-primary/70'>{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
