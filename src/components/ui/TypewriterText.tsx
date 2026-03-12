'use client'

import { useEffect, useState } from 'react'

type Props = {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  onComplete?: () => void
}

export default function TypewriterText({
  text,
  speed = 60,
  startDelay = 0,
  className = '',
  onComplete
}: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayed(text)
      setDone(true)
      onComplete?.()
      return
    }

    let i = 0
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          onComplete?.()
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [text, speed, startDelay, onComplete])

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            background: 'var(--px-gold)',
            animation: 'px-blink 0.8s steps(1) infinite'
          }}
        >
          &nbsp;
        </span>
      )}
    </span>
  )
}
