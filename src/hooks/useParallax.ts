'use client'

import { useState, useEffect, useRef } from 'react'

export function useParallax(speed: number = 0.5): number {
  const [offsetY, setOffsetY] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * speed)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [speed])

  return offsetY
}
