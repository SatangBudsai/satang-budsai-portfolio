'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** Renders its children everywhere except the home page, which has its own call to action. */
export default function HideOnHome({ children }: { children: ReactNode }) {
  return usePathname() === '/' ? null : <>{children}</>
}
