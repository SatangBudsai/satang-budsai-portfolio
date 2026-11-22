import Image from 'next/image'

import { tr, type Lang, type Stage } from '@/content/types'
import { cn } from '@/lib/utils'

import MediaView from './media'

/**
 * A product shown like a launch page: a glow in the product's colour over a
 * faint grid, the main visual bleeding off the bottom edge, a floating second
 * visual and a few short chips.
 */
export default function ProductStage({
  stage,
  lang,
  className,
  priority,
  still = false,
  sizes = '(min-width: 1024px) 45vw, 90vw'
}: {
  stage: Stage
  lang: Lang
  className?: string
  priority?: boolean
  /** Leave out animated floats (used for small cards, to keep pages light). */
  still?: boolean
  sizes?: string
}) {
  const { tone, main, chips } = stage
  const float = still && stage.float?.animated ? undefined : stage.float
  return (
    <div
      className={cn(
        '@container relative aspect-[16/11] overflow-hidden rounded-3xl border border-line bg-[#0d0b13]',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(55% 60% at 72% 28%, ${tone}55, transparent 70%), radial-gradient(45% 55% at 0% 100%, ${tone}26, transparent 70%)`
      }}>
      <div className='stage-grid absolute inset-0' aria-hidden='true' />

      <div
        className={cn(
          'absolute drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]',
          main.kind === 'diagram'
            ? 'stage-diagram top-[55%] right-[6%] left-[6%] -translate-y-1/2'
            : 'top-[13%] right-[5%] left-[13%]'
        )}>
        <MediaView media={main} lang={lang} sizes={sizes} priority={priority} />
      </div>

      {float ? (
        <div
          className={cn(
            'art-float absolute drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)]',
            main.kind === 'diagram' ? 'top-[5%] right-[5%]' : 'bottom-[6%] left-[4%]',
            float.tile ? 'w-[18%] rotate-[-6deg]' : 'w-[42%] rotate-[-3deg]'
          )}>
          {float.tile ? (
            <div className='rounded-[22%] border border-line-strong bg-card p-[12%]'>
              <Image
                src={float.src}
                alt={tr(float.alt, lang)}
                width={float.width}
                height={float.height}
                sizes='12vw'
                className='block h-auto w-full'
              />
            </div>
          ) : (
            <MediaView media={float} lang={lang} sizes='(min-width: 1024px) 20vw, 40vw' />
          )}
        </div>
      ) : null}

      <ul
        className='absolute top-[4.5%] left-[4%] flex flex-wrap gap-2 max-sm:[&>li:nth-child(n+3)]:hidden'
        aria-label='Highlights'>
        {chips.map((chip, index) => (
          <li
            key={chip}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-[11px] backdrop-blur-md sm:text-xs',
              index === 0 ? 'border-transparent text-[#0a0a0b]' : 'border-white/15 bg-black/40 text-foreground'
            )}
            style={index === 0 ? { backgroundColor: tone } : undefined}>
            {chip}
          </li>
        ))}
      </ul>
    </div>
  )
}
