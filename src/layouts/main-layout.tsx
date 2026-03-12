'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' }
]

type Props = {
  children: ReactNode
}

export default function MainLayout(props: Props) {
  const pathname = usePathname()

  return (
    <div className='max-w-screen relative flex min-h-dvh flex-col'>
      <nav className='flex gap-6 border-b border-divider px-8 py-4'>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-medium transition-colors hover:text-primary ${
              pathname === item.href ? 'text-primary' : 'text-default-500'
            }`}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className='flex-1'>{props.children}</div>
    </div>
  )
}
