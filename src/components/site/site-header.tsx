'use client'

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import type { Lang } from '@/content/types'
import { setLocale } from '@/i18n/actions'
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
  switchLanguage: string
  themeDark: string
  themeLight: string
  home: string
}

const easeInOut = [0.76, 0, 0.24, 1] as const

export function LanguageSwitch({ lang, label, compact }: { lang: Lang; label: string; compact?: boolean }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const next: Lang = lang === 'th' ? 'en' : 'th'
  return (
    <button
      type='button'
      disabled={pending}
      aria-label={label}
      onClick={() =>
        startTransition(async () => {
          await setLocale(next)
          router.refresh()
        })
      }
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-mono text-xs transition-colors disabled:opacity-50',
        compact ? 'h-8 px-3 hover:bg-foreground/10' : 'min-h-11 border border-line-strong px-4 hover:border-foreground'
      )}>
      <span className={lang === 'th' ? 'text-foreground' : 'text-muted-foreground'}>TH</span>
      <span className='text-muted-foreground'>/</span>
      <span className={lang === 'en' ? 'text-foreground' : 'text-muted-foreground'}>EN</span>
    </button>
  )
}

export default function SiteHeader({ labels, lang }: { labels: Labels; lang: Lang }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // The menu remembers the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean | ((current: boolean) => boolean)) =>
    setOpenOn(typeof value === 'function' ? (value(open) ? pathname : null) : value ? pathname : null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useMotionValueEvent(scrollY, 'change', current => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(current > 24)
    setHidden(current > 320 && current > previous)
  })

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
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 print:hidden',
          // On the home page the sidebar is the navigation on large screens.
          pathname === '/' && 'lg:hidden',
          scrolled || open ? 'border-line bg-background/80 backdrop-blur-xl' : 'border-transparent'
        )}
        animate={{ y: hidden && !open && !reduced ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: easeInOut }}>
        <div className='container-page flex h-[4.5rem] items-center justify-between gap-4'>
          <Link href='/' className='font-mono text-sm tracking-[0.04em]' aria-label={labels.home}>
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
            <LanguageSwitch lang={lang} label={labels.switchLanguage} />
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
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id='mobile-menu'
            className='fixed inset-0 z-40 flex flex-col bg-background pt-[4.5rem] lg:hidden'
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: easeInOut }}>
            <nav aria-label='Mobile' className='container-page flex flex-1 flex-col justify-center gap-2'>
              {[{ href: '/', label: labels.home }, ...links].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: easeInOut, delay: 0.15 + index * 0.05 }}>
                  <Link
                    ref={index === 0 ? firstLink : undefined}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className='display block py-2 text-[clamp(44px,13vw,88px)]'>
                    {link.label}
                  </Link>
                </motion.div>
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
