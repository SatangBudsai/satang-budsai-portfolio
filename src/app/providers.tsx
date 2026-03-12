'use client'

import { Provider as ReduxProvider } from 'react-redux'
import store from '@/store'
import ReactQueryProvider from '@/providers/react-query'
import DayjsProvider from '@/providers/dayjs'
import HeroUIProvider from '@/providers/next-ui'
import NprogressProvider from '@/providers/nprogress'
import RootLayoutComponent from '@/layouts/root-layout'
import '@/iconify-bundle/icons-bundle-react'
import '@/configs/i18n'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ReduxProvider store={store}>
        <NprogressProvider>
          <HeroUIProvider>
            <DayjsProvider>
              <RootLayoutComponent>{children}</RootLayoutComponent>
            </DayjsProvider>
          </HeroUIProvider>
        </NprogressProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  )
}
