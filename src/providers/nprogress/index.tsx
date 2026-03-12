'use client'

import NProgress from 'nprogress'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, Suspense, useEffect } from 'react'

function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return null
}

type Props = {
  children: React.ReactNode
}

const NprogressProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      {children}
    </Fragment>
  )
}

export default NprogressProvider
