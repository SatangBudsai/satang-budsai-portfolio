'use client'

import { Provider as ReduxProvider } from 'react-redux'
import store from '@/store'
import ReactQueryProvider from '@/providers/react-query'
import { TolgeeNextProvider } from '@/tolgee/client'
import type { TolgeeStaticData, CachePublicRecord } from '@tolgee/react'
import { MotionConfig } from 'motion/react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import NprogressProvider from '@/providers/nprogress'
import RootLayoutComponent from '@/layouts/root-layout'

export default function Providers({
  children,
  language,
  staticData
}: {
  children: React.ReactNode
  language: string
  staticData: TolgeeStaticData | CachePublicRecord[]
}) {
  return (
    <ReactQueryProvider>
      <ReduxProvider store={store}>
        <NprogressProvider>
          <MotionConfig reducedMotion='user'>
            <ThemeProvider>
              <Toaster />
              <TolgeeNextProvider language={language} staticData={staticData}>
                <RootLayoutComponent>{children}</RootLayoutComponent>
              </TolgeeNextProvider>
            </ThemeProvider>
          </MotionConfig>
        </NprogressProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  )
}
