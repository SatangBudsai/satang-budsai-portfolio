'use client'

import { Icon as IconifyIcon, type IconProps } from '@iconify/react'

import { offlineIcons } from '@/config/icon-data'

function Icon(props: IconProps) {
  const bundledIcon = typeof props.icon === 'string' ? offlineIcons[props.icon as keyof typeof offlineIcons] : undefined

  // Bundled data is available on the server: reserve and render the actual SVG
  // before hydration instead of adding icons (and changing control widths) later.
  return <IconifyIcon ssr={Boolean(bundledIcon)} {...props} icon={bundledIcon ?? props.icon} />
}

export { Icon }
export type { IconProps }
