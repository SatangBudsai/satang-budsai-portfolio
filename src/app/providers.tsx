'use client'

import { ThemeProvider } from '@/components/theme-provider'
import NprogressProvider from '@/providers/nprogress'

/**
 * Client providers the site actually uses. Translations are resolved on the server
 * (getI18n), so no store, query client, toaster or client i18n runtime is shipped.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NprogressProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NprogressProvider>
  )
}
