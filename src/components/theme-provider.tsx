'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

/** Dark by default; visitors can switch to light (remembered in this browser). */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='dark' enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
