import { Fragment, ReactElement, useEffect } from 'react'
import '@/styles/globals.css'

//SetUp Store redux
import { Provider as ReduxProvider } from 'react-redux'
import store from '@/store'

import { AppPropsWithLayoutType } from '@/types/layout/AppPropsWithLayout'
import NprogressProvider from '@/providers/nprogress'
import ReactQueryProvider from '@/providers/react-query'
import DayjsProvider from '@/providers/dayjs'
import NextUIProvider from '@/providers/next-ui/index'
import AuthGuard from '@/providers/auth'
import RootLayout from '@/layouts/root-layout'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { initLightboxJS } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import '@/configs/i18n'

import '@/iconify-bundle/icons-bundle-react'

import { Prompt } from 'next/font/google'
const prompt = Prompt({
  subsets: ['latin', 'latin-ext', 'thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap'
})

export default function App({ Component, pageProps }: AppPropsWithLayoutType) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)
  const auth = Component.auth ?? false

  useEffect(() => {
    initLightboxJS('4CE0-406C-E8EC-5F69', 'Individual')
  })

  return (
    <Fragment>
      <ReactQueryProvider>
        <ReduxProvider store={store}>
          {/* <SocketProvider> */}
          <NprogressProvider>
            <NextUIProvider>
              <DayjsProvider>
                <AuthGuard isAuth={auth}>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                      * {
                        font-family: ${prompt.style.fontFamily};
                      }
                    `
                    }}
                  />
                  <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
                </AuthGuard>
              </DayjsProvider>
            </NextUIProvider>
          </NprogressProvider>
          {/* </SocketProvider> */}
        </ReduxProvider>
      </ReactQueryProvider>
    </Fragment>
  )
}
