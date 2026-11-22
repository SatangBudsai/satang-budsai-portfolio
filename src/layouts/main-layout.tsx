'use client'

import React, { ReactNode } from 'react'
import Navbar from '@/components/navbar'

type Props = {
  children: ReactNode
}

export default function MainLayout(props: Props) {
  return (
    <div className='relative flex min-h-dvh flex-col font-["Silkscreen"]'>
      <Navbar />
      <main className='flex-1'>{props.children}</main>
    </div>
  )
}
