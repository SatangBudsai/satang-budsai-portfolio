import { cn } from '@/lib/utils'

/** Sprite strips cut from the same PixelLab character as the hero (scripts in README). */
const PALS = {
  waving: { src: '/pixel/pal-waving.webp', frames: 8, width: 52, height: 88, duration: 1.1 },
  cheer: { src: '/pixel/pal-cheer.webp', frames: 8, width: 64, height: 89, duration: 1 },
  walk: { src: '/pixel/pal-walk.webp', frames: 6, width: 46, height: 85, duration: 0.7 }
} as const

/**
 * The hero character turning up around the page: one horizontal strip moved in
 * whole-frame steps with CSS (`.pal` in globals.css). No JavaScript; the strip
 * loads lazily and stands still under reduced motion.
 */
export default function PixelPal({
  pose,
  scale = 1,
  className
}: {
  pose: keyof typeof PALS
  scale?: 1 | 1.5 | 2
  className?: string
}) {
  const pal = PALS[pose]
  return (
    <span
      className={cn('pal', className)}
      aria-hidden='true'
      style={
        {
          width: pal.width * scale,
          height: pal.height * scale,
          '--frames': pal.frames,
          '--duration': `${pal.duration}s`
        } as React.CSSProperties
      }>
      {/* eslint-disable-next-line @next/next/no-img-element -- a sprite strip, not a photo */}
      <img src={pal.src} alt='' width={pal.width * pal.frames} height={pal.height} loading='lazy' decoding='async' />
    </span>
  )
}
