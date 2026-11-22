'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'

const subscribe = () => () => {}

/** Switches between the dark and light themes. Renders a neutral button until mounted. */
export default function ThemeToggle({
  labels,
  compact
}: {
  labels: { dark: string; light: string }
  compact?: boolean
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const dark = !mounted || resolvedTheme !== 'light'
  return (
    <button
      type='button'
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? labels.light : labels.dark}
      title={dark ? labels.light : labels.dark}
      className={
        compact
          ? 'inline-flex size-8 items-center justify-center rounded-full text-soft transition-colors hover:bg-foreground/10 hover:text-foreground'
          : 'inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-soft transition-colors hover:border-foreground hover:text-foreground'
      }>
      <Icon
        icon={dark ? appIcons.sun : appIcons.moon}
        className={compact ? 'size-4' : 'size-[18px]'}
        aria-hidden='true'
      />
    </button>
  )
}
