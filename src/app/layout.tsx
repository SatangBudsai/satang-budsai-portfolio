import type { Metadata, Viewport } from 'next'
import { Caveat, Inter_Tight, Instrument_Serif, JetBrains_Mono, Pixelify_Sans, Silkscreen } from 'next/font/google'
import { getI18n } from '@/lib/lang'
import { KEYWORDS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/seo'
import { profile } from '@/content/site'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EasterEggs } from '@/components/site/playful'
import Providers from './providers'
import '@/styles/globals.css'

const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: false
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false
})
// Handwritten notes.
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
  preload: false
})
// Pixel UI text (speech bubbles, item labels).
const silkscreen = Silkscreen({ subsets: ['latin'], weight: '400', variable: '--font-silkscreen', display: 'swap' })
// Headings in the "Pixel" style.
const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-pixelify',
  display: 'swap',
  preload: false
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${profile.name}` },
  description: SITE_DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: KEYWORDS,
  alternates: {
    canonical: '/',
    types: { 'text/plain': '/resume.txt', 'text/markdown': '/llms.txt' }
  },
  openGraph: {
    type: 'profile',
    siteName: profile.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'en_US',
    firstName: 'Satang',
    lastName: 'Budsai'
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0a10' },
    { media: '(prefers-color-scheme: light)', color: '#f7f5fb' }
  ],
  colorScheme: 'dark light'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang, t } = await getI18n()

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
    home: t('common.nav.home', 'Home'),
    themeDark: t('common.nav.theme-dark', 'Switch to dark mode'),
    themeLight: t('common.nav.theme-light', 'Switch to light mode')
  }

  return (
    <html
      lang={lang}
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${caveat.variable} ${silkscreen.variable} ${pixelify.variable}`}
      data-scroll-behavior='smooth'
      suppressHydrationWarning>
      {/* Browser extensions often add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <a
          href='#main'
          className='sr-only z-[100] rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4'>
          {t('common.nav.skip', 'Skip to content')}
        </a>
        <Providers>
          <SiteHeader labels={nav} lang={lang} />
          <main id='main'>{children}</main>
          <SiteFooter />
          <EasterEggs
            consoleLines={[
              'Hello, fellow developer 👋',
              'This site: Next.js 16, Tailwind 4, Motion — source at https://github.com/SatangBudsai',
              'Try typing "ship" anywhere on the page.'
            ]}
          />
        </Providers>
      </body>
    </html>
  )
}
