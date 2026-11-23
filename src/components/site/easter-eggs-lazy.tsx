'use client'

import { useEffect, useState, type ComponentType } from 'react'

type EggsProps = { consoleLines: string[] }

/**
 * Loads the easter eggs (and the animation library they use) only after the page has
 * loaded and gone idle, so none of it is part of the first-load JavaScript.
 */
export function LazyEasterEggs(props: EggsProps) {
  const [Eggs, setEggs] = useState<ComponentType<EggsProps> | null>(null)
  useEffect(() => {
    let cancelled = false
    const load = () => {
      const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1500))
      idle(() => {
        import('./playful').then(module => {
          if (!cancelled) setEggs(() => module.EasterEggs)
        })
      })
    }
    if (document.readyState === 'complete') load()
    else window.addEventListener('load', load, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', load)
    }
  }, [])
  return Eggs ? <Eggs {...props} /> : null
}
