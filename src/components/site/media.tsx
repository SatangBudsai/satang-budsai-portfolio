import Image from 'next/image'

import { tr, type Lang, type Media } from '@/content/types'
import { cn } from '@/lib/utils'

import CoverArt from './art'
import Diagram from './diagram'

type Props = {
  media: Media
  lang: Lang
  className?: string
  sizes?: string
  priority?: boolean
}

/** Renders a project image in its frame (browser bar, phone, none, bare), a drawn diagram or cover art. */
export default function MediaView({
  media,
  lang,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority
}: Props) {
  if (media.kind === 'diagram') {
    return <Diagram id={media.id} lang={lang} label={tr(media.alt, lang)} className={className} />
  }

  if (media.kind === 'art') {
    return <CoverArt id={media.id} label={tr(media.alt, lang)} className={className} />
  }

  const image = (
    <Image
      src={media.src}
      alt={tr(media.alt, lang)}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
      unoptimized={media.animated}
      className='block h-auto w-full'
    />
  )

  if (media.frame === 'phone') {
    return (
      <div
        className={cn(
          'mx-auto w-full max-w-[17rem] rounded-[2.25rem] border border-line-strong bg-card p-2',
          className
        )}>
        <div className='overflow-hidden rounded-[1.75rem]'>{image}</div>
      </div>
    )
  }

  if (media.frame === 'browser') {
    return (
      <div className={cn('overflow-hidden rounded-2xl border border-line bg-card', className)}>
        <div className='flex h-8 items-center gap-1.5 border-b border-line px-3' aria-hidden='true'>
          <span className='size-2.5 rounded-full bg-line-strong' />
          <span className='size-2.5 rounded-full bg-line-strong' />
          <span className='size-2.5 rounded-full bg-line-strong' />
        </div>
        {image}
      </div>
    )
  }

  if (media.frame === 'bare') return <div className={className}>{image}</div>

  return <div className={cn('overflow-hidden rounded-2xl border border-line', className)}>{image}</div>
}
