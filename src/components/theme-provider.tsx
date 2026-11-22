'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

/** The portfolio is dark only; the provider stays so shared components keep working. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute='class' forcedTheme='dark' enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
