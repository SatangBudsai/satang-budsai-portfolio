'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  isAuth: boolean
}

const AuthGuard = (props: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setLoading] = useState(true)

  const handleCheckAuth = () => {
    const token = sessionStorage.getItem('token') // or Redux or Cookie or Other
    if (!token && props.isAuth) {
      router.push('/') // Path Login
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleCheckAuth()
  }, [pathname])

  if (isLoading) {
    return null // Or you can return a loading
  } else {
    return <>{props.children}</>
  }
}

export default AuthGuard
