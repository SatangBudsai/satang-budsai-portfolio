import type { Metadata, Viewport } from 'next'
import {
  Caveat,
  Inter_Tight,
  Instrument_Serif,
  Itim,
  JetBrains_Mono,
  Noto_Sans_Thai,
  Pixelify_Sans,
  Silkscreen
} from 'next/font/google'
import { getTolgee } from '@/tolgee/server'
import { getI18n } from '@/lib/lang'
import { profile } from '@/content/site'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EasterEggs } from '@/components/site/playful'
import DesignPicker, { designBootScript } from '@/components/site/design-picker'
import Providers from './providers'
import '@/styles/globals.css'

const interTight = Inter_Tight({ subsets: ['latin', 'latin-ext'], variable: '--font-inter-tight', display: 'swap' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap'
})
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' })
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-noto-thai', display: 'swap' })
// Handwritten notes: Caveat for Latin, Itim for Thai.
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-caveat', display: 'swap' })
// Pixel UI text (speech bubbles, item labels). Thai falls back to Noto Sans Thai.
const silkscreen = Silkscreen({ subsets: ['latin'], weight: '400', variable: '--font-silkscreen', display: 'swap' })
// Headings in the "Pixel" style.
const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-pixelify',
  display: 'swap',
  preload: false
})
const itim = Itim({ subsets: ['thai'], weight: '400', variable: '--font-itim', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  const description = t(
    'common.meta.description',
    'Full-stack developer in Chiang Mai building government systems, university platforms and my own developer tools.'
  )
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3031'),
    title: {
      default: `${profile.name} — ${t('common.meta.role', 'Full-stack developer')}`,
      template: `%s — ${profile.name}`
    },
    description,
    icons: { icon: '/favicon.ico' },
    openGraph: { type: 'website', title: profile.name, description }
  }
}

export const viewport: Viewport = { themeColor: '#0b0a10', colorScheme: 'dark' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang, t } = await getI18n()
  const tolgee = await getTolgee()
  const staticData = await tolgee.loadRequired()

  const nav = {
    work: t('common.nav.work', 'Work'),
    services: t('common.nav.services', 'Services'),
    experience: t('common.nav.experience', 'Experience'),
    learning: t('common.nav.learning', 'Learning'),
    about: t('common.nav.about', 'About'),
    resume: t('common.nav.resume', 'Resume'),
    talk: t('common.nav.talk', 'Let’s talk'),
    openMenu: t('common.nav.open-menu', 'Open menu'),
    closeMenu: t('common.nav.close-menu', 'Close menu'),
    switchLanguage: t('common.nav.switch-language', 'เปลี่ยนเป็นภาษาไทย'),
    home: t('common.nav.home', 'Home')
  }

  return (
    <html
      lang={lang}
      className={`dark ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${notoSansThai.variable} ${caveat.variable} ${itim.variable} ${silkscreen.variable} ${pixelify.variable}`}
      data-scroll-behavior='smooth'
      suppressHydrationWarning>
      {/* Browser extensions often add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: designBootScript }} />
        <a
          href='#main'
          className='sr-only z-[100] rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4'>
          {t('common.nav.skip', 'Skip to content')}
        </a>
        <Providers language={lang} staticData={staticData}>
          <SiteHeader labels={nav} lang={lang} />
          <main id='main'>{children}</main>
          <SiteFooter />
          <EasterEggs
            consoleLines={[
              'สวัสดี / Hello, fellow developer 👋',
              'This site: Next.js 16, Tailwind 4, Motion — source at https://github.com/SatangBudsai',
              'Try typing "ship" anywhere on the page.'
            ]}
          />
          <DesignPicker always={process.env.NODE_ENV !== 'production'} />
        </Providers>
        <div className='grain' aria-hidden='true' />
      </body>
    </html>
  )
}
