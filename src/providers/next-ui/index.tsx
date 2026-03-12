'use client'

import { HeroUIProvider as NextProvider, ToastProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function HeroUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextProvider navigate={router.push}>
      <ToastProvider />
      <ThemeProvider attribute='class' defaultTheme='light'>
        {children}
      </ThemeProvider>
    </NextProvider>
  )
}
