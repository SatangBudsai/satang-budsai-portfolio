'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import type { Lang } from '@/content/types'
import { cn } from '@/lib/utils'

import ThemeToggle from './theme-toggle'

type Labels = {
  work: string
  services: string
  experience: string
  learning: string
  about: string
  resume: string
  talk: string
  openMenu: string
  closeMenu: string
  themeDark: string
  themeLight: string
  home: string
}

/** The pixel "S + cursor" mark (public/brand/logo-mark.svg), coloured by the theme accent. */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
      <path fill='var(--primary)' d='M16 12H48V20H24V28H40V36H48V44H40V52H8V44H32V36H16V28H8V20H16ZM48 44H56V52H48Z' />
    </svg>
  )
}

export default function SiteHeader({ labels }: { labels: Labels; lang: Lang }) {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // The menu remembers the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean | ((current: boolean) => boolean)) =>
    setOpenOn(typeof value === 'function' ? (value(open) ? pathname : null) : value ? pathname : null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  // Hide on the way down, show on the way up; a plain scroll listener keeps this off the animation library.
  useEffect(() => {
    let previous = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const current = window.scrollY
      setScrolled(current > 24)
      setHidden(current > 320 && current > previous)
      previous = current
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenOn(null)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const links = [
    { href: '/work', label: labels.work },
    { href: '/experience', label: labels.experience },
    { href: '/learning', label: labels.learning },
    { href: '/about', label: labels.about },
    { href: '/resume', label: labels.resume }
  ]

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,translate] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:translate-y-0 print:hidden',
          // On the home page the sidebar is the navigation on large screens.
          pathname === '/' && 'lg:hidden',
          scrolled || open ? 'border-line bg-background/80 backdrop-blur-xl' : 'border-transparent',
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        )}>
        <div className='container-page flex h-[4.5rem] items-center justify-between gap-4'>
          <Link
            href='/'
            className='inline-flex items-center gap-2.5 font-mono text-sm tracking-[0.04em]'
            aria-label={labels.home}>
            <BrandMark className='size-7' />
            SATANG.B
          </Link>

          <nav aria-label='Primary' className='hidden items-center gap-8 text-[15px] lg:flex'>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'link-draw pb-0.5',
                  pathname === link.href ? 'text-foreground' : 'text-soft hover:text-foreground'
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <ThemeToggle labels={{ dark: labels.themeDark, light: labels.themeLight }} />
            <Link
              href='/#contact'
              className='hidden min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex'>
              {labels.talk}
            </Link>
            <button
              ref={menuButton}
              type='button'
              aria-label={open ? labels.closeMenu : labels.openMenu}
              aria-expanded={open}
              aria-controls='mobile-menu'
              onClick={() => setOpen(value => !value)}
              className='inline-flex size-11 items-center justify-center rounded-full border border-line-strong lg:hidden'>
              <Icon icon={open ? appIcons.close : appIcons.menu} className='size-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id='mobile-menu'
          className='menu-open fixed inset-0 z-40 flex flex-col bg-background pt-[4.5rem] lg:hidden'>
          <nav aria-label='Mobile' className='container-page flex flex-1 flex-col justify-center gap-2'>
            {[{ href: '/', label: labels.home }, ...links].map((link, index) => (
              <div key={link.href} className='menu-link' style={{ '--i': index } as React.CSSProperties}>
                <Link
                  ref={index === 0 ? firstLink : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className='display block py-2 text-[clamp(44px,13vw,88px)]'>
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>
          <div className='container-page flex flex-wrap items-center justify-between gap-4 border-t border-line py-6'>
            <Link
              href='/#contact'
              onClick={() => setOpen(false)}
              className='inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground'>
              {labels.talk}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
