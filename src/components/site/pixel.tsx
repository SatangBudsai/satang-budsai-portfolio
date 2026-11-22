import Image from 'next/image'

import { cn } from '@/lib/utils'

/** Pixel-art item icons (PixelLab, 48×48). Products get their own "item". */
export const itemIcon: Record<string, string> = {
  'git-control-orca': '/pixel/items/git-crystal.png',
  'qorstack-report': '/pixel/items/scroll.png',
  scanhub: '/pixel/items/shield.png',
  clipath: '/pixel/items/camera.png',
  'thai-pdf-fixer': '/pixel/items/book.png',
  sage: '/pixel/items/lotus-scroll.png'
}

/** A 48×48 sprite drawn at a whole-number scale so the pixels stay square. */
export function PixelItem({
  name,
  src,
  size = 24,
  className,
  alt = ''
}: {
  name?: string
  src?: string
  size?: 24 | 32 | 48 | 72 | 96
  className?: string
  alt?: string
}) {
  return (
    <Image
      src={src ?? `/pixel/items/${name}.png`}
      alt={alt}
      width={48}
      height={48}
      unoptimized
      aria-hidden={alt ? undefined : true}
      className={cn('pixelated inline-block shrink-0 select-none', className)}
      style={{ width: size, height: size }}
    />
  )
}
