'use client'

import { useEffect, useState, ReactNode } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: '[ HOME ]' },
  { id: 'about', label: '[ ABOUT ]' },
  { id: 'skills', label: '[ SKILLS ]' },
  { id: 'projects', label: '[ QUESTS ]' },
  { id: 'contact', label: '[ CONTACT ]' }
]

type Props = { children: ReactNode }

export default function MainLayout({ children }: Props) {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sectionEls = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '-15% 0px -15% 0px' }
    )

    sectionEls.forEach(el => observer.observe(el))

    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: 'var(--px-bg-base)' }}>
      {/* Fixed nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 16px',
          background: scrolled ? 'var(--px-bg-surface)' : 'transparent',
          backdropFilter: scrolled ? 'blur(4px)' : 'none',
          borderBottom: scrolled ? '2px solid var(--px-border-subtle)' : '2px solid transparent'
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            fontFamily: 'var(--font-press-start)',
            fontSize: '9px',
            color: 'var(--px-gold)',
            background: 'none',
            border: 'none',
            marginRight: '16px',
            padding: '4px',
            cursor: 'inherit'
          }}
        >
          ★ PX
        </button>

        {/* Nav items */}
        <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '7px',
                  padding: '6px 10px',
                  background: isActive ? 'var(--px-gold)' : 'transparent',
                  color: isActive ? '#000000' : 'var(--px-text-muted)',
                  border: 'none',
                  cursor: 'inherit',
                  lineHeight: 1
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div>{children}</div>
    </div>
  )
}
