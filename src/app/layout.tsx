import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import Providers from './providers'
import { getLocale } from 'next-intl/server'
import { getTolgee } from '@/tolgee/server'
import '@/styles/globals.css'

const prompt = Prompt({
  subsets: ['latin', 'latin-ext', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME ?? 'Portfolio',
  description: '',
  icons: { icon: '/favicon.ico' }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const language = await getLocale()
  const tolgee = await getTolgee()
  const staticData = await tolgee.loadRequired()

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={prompt.className}>
        <Providers language={language} staticData={staticData}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
