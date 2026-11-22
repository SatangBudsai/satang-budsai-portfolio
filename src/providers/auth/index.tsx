'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useSyncExternalStore } from 'react'

const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}
const getToken = () => sessionStorage.getItem('token')

type Props = {
  children: React.ReactNode
  isAuth: boolean
}

const AuthGuard = (props: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const token = useSyncExternalStore(subscribe, getToken, () => null)

  useEffect(() => {
    if (props.isAuth && !getToken()) router.replace('/')
  }, [pathname, props.isAuth, router, token])

  if (props.isAuth && !token) {
    return null // Or you can return a loading
  } else {
    return <>{props.children}</>
  }
}

export default AuthGuard
