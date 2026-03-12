import type { Metadata } from 'next'
import { Prompt, Press_Start_2P } from 'next/font/google'
import Providers from './providers'
import '@/styles/globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'lightbox.js-react/dist/index.css'

const prompt = Prompt({
  subsets: ['latin', 'latin-ext', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap'
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start'
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME ?? 'Portfolio',
  description: '',
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${prompt.className} ${pressStart2P.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
