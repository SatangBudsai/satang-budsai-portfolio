'use client'

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import type { ArtId, Lang, Stage } from '@/content/types'
import { cn } from '@/lib/utils'

import CoverArt from './art'
import ProductStage from './product-stage'
import { itemIcon, PixelItem } from './pixel'

export type WorkGroup = 'product' | 'client' | 'experiment'

export type WorkVisual =
  | { kind: 'stage'; stage: Stage }
  | { kind: 'image'; src: string; width: number; height: number; alt: string; animated?: boolean }
  | { kind: 'art'; id: ArtId; alt: string }

export type WorkItem = {
  key: string
  href: string
  external?: boolean
  group: WorkGroup
  size: 'lg' | 'md'
  title: string
  line: string
  tag: string
  /** A playful sticker on the card, used sparingly. */
  badge?: string
  tone: string
  visual: WorkVisual
}

function Visual({ visual, lang, size }: { visual: WorkVisual; lang: Lang; size: WorkItem['size'] }) {
  const sizes =
    size === 'lg' ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'
  if (visual.kind === 'stage') {
    return (
      <ProductStage
        stage={visual.stage}
        lang={lang}
        sizes={sizes}
        still
        className='absolute inset-0 aspect-auto h-full w-full rounded-[1.25rem] border-0'
      />
    )
  }
  if (visual.kind === 'art') {
    return <CoverArt id={visual.id} label={visual.alt} fill className='absolute inset-0 rounded-[1.25rem] border-0' />
  }
  // Screenshots are often bright: dim them slightly and fade the bottom edge into the card.
  return (
    <>
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes={sizes}
        unoptimized={visual.animated}
        className='object-cover object-top brightness-[0.88] transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-[1.04] group-hover:brightness-100'
      />
      <span
        className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0d0b13]/70 to-transparent'
        aria-hidden='true'
      />
    </>
  )
}

function Card({ item, index, lang }: { item: WorkItem; index: number; lang: Lang }) {
  const reduced = useReducedMotion()
  const tilt = index % 2 === 0 ? -0.8 : 0.8
  const content = (
    <>
      <div
        className={cn(
          'relative overflow-hidden rounded-[1.25rem] bg-[#0d0b13]',
          item.size === 'lg' ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] lg:flex-1' : 'aspect-[16/10]'
        )}>
        <Visual visual={item.visual} lang={lang} size={item.size} />
      </div>
      <div className='flex items-start justify-between gap-4 px-2 pt-4 pb-2'>
        <div className='flex min-w-0 flex-col gap-1.5'>
          <span className='inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase'>
            {itemIcon[item.key] ? (
              <PixelItem src={itemIcon[item.key]} size={24} />
            ) : (
              <span className='size-2 rounded-full' style={{ backgroundColor: item.tone }} aria-hidden='true' />
            )}
            {item.tag}
          </span>
          <h3 className={cn('font-semibold tracking-[-0.02em]', item.size === 'lg' ? 'text-3xl' : 'text-2xl')}>
            {item.title}
          </h3>
          <p className='line-clamp-3 leading-relaxed text-soft'>{item.line}</p>
        </div>
        <span
          className='relative mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:text-primary-foreground'
          style={{ ['--tone' as string]: item.tone }}>
          <span
            className='absolute size-10 scale-0 rounded-full bg-[var(--tone)] transition-transform duration-500 group-hover:scale-100'
            aria-hidden='true'
          />
          <Icon icon={appIcons.arrowUpRight} className='relative size-4' aria-hidden='true' />
        </span>
      </div>
      {item.badge ? (
        <span
          className='pointer-events-none absolute -top-3 right-6 z-10 rotate-[6deg] rounded-full px-4 py-1.5 font-hand text-xl text-[#0a0a0b] shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:rotate-[-4deg]'
          style={{ backgroundColor: item.tone }}>
          {item.badge}
        </span>
      ) : null}
    </>
  )

  const className =
    'group relative flex h-full flex-col rounded-[1.75rem] border border-line bg-card/60 p-3 transition-colors duration-500 hover:border-line-strong hover:bg-card'

  return (
    <motion.li
      layout={!reduced}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
      whileHover={reduced ? undefined : { y: -6, rotate: tilt }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className={cn(item.size === 'lg' && 'sm:col-span-2 lg:row-span-2')}>
      {item.external ? (
        <a href={item.href} target='_blank' rel='noreferrer' className={className}>
          {content}
        </a>
      ) : (
        <Link href={item.href} className={className}>
          {content}
        </Link>
      )}
    </motion.li>
  )
}

export default function WorkGrid({
  items,
  lang,
  filters,
  cta,
  more
}: {
  items: WorkItem[]
  lang: Lang
  /** Leave out to hide the filter row (the home page shows a fixed selection). */
  filters?: { all: string; product: string; client: string; experiment: string; label: string }
  /** A last card linking to the full list. */
  more?: { href: string; title: string; line: string; count: number; previews: { src: string; alt: string }[] }
  /** A last card inviting the visitor to get in touch, shown in the "All" view. */
  cta?: { title: string; line: string; note: string; href: string }
}) {
  const [filter, setFilter] = useState<'all' | WorkGroup>('all')
  const shown = filter === 'all' ? items : items.filter(item => item.group === filter)
  const options: { value: 'all' | WorkGroup; label: string; count: number }[] = filters
    ? [
        { value: 'all', label: filters.all, count: items.length },
        { value: 'product', label: filters.product, count: items.filter(item => item.group === 'product').length },
        { value: 'client', label: filters.client, count: items.filter(item => item.group === 'client').length },
        {
          value: 'experiment',
          label: filters.experiment,
          count: items.filter(item => item.group === 'experiment').length
        }
      ]
    : []

  return (
    <div className='flex flex-col gap-8'>
      {filters ? (
        <div role='group' aria-label={filters.label} className='flex flex-wrap gap-2'>
          {options.map(option => (
            <button
              key={option.value}
              type='button'
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm transition-all active:scale-95',
                filter === option.value
                  ? 'border-primary bg-primary font-semibold text-primary-foreground'
                  : 'border-line-strong text-soft hover:border-foreground hover:text-foreground'
              )}>
              {option.label}
              <span
                className={cn('font-mono text-xs', filter === option.value ? 'opacity-70' : 'text-muted-foreground')}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      ) : null}
      <LayoutGroup>
        <ul className='grid grid-flow-row-dense gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          <AnimatePresence mode='popLayout'>
            {shown.map((item, index) => (
              <Card key={item.key} item={item} index={index} lang={lang} />
            ))}
            {cta && filter === 'all' ? (
              <motion.li key='cta' layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link
                  href={cta.href}
                  className='group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-primary p-8 text-primary-foreground transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 hover:rotate-[0.8deg]'>
                  <span className='rotate-[-4deg] font-hand text-3xl'>{cta.note}</span>
                  <span className='flex flex-col gap-2'>
                    <span className='display text-[clamp(36px,3.4vw,56px)]'>{cta.title}</span>
                    <span className='inline-flex items-center gap-2 font-medium'>
                      {cta.line}
                      <Icon
                        icon={appIcons.arrowRight}
                        className='size-5 transition-transform duration-500 group-hover:translate-x-2'
                        aria-hidden='true'
                      />
                    </span>
                  </span>
                </Link>
              </motion.li>
            ) : null}
            {more ? (
              <motion.li key='more' layout className='lg:row-span-2'>
                <Link
                  href={more.href}
                  className='group relative flex h-full min-h-80 flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] border border-line bg-card/60 p-6 transition-colors duration-500 hover:border-primary/60 hover:bg-card sm:p-7'>
                  <span
                    className='pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl transition-opacity duration-700 group-hover:opacity-80'
                    aria-hidden='true'
                  />
                  {/* A loose stack of projects that aren't on the home page. */}
                  <span className='relative block h-44 sm:h-52' aria-hidden='true'>
                    {more.previews.slice(0, 4).map((preview, index) => (
                      <span
                        key={preview.src}
                        className='absolute w-[62%] overflow-hidden rounded-xl border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out-expo'
                        style={{
                          left: `${[2, 34, 10, 30][index]}%`,
                          top: `${[0, 10, 46, 52][index]}%`,
                          transform: `rotate(${[-7, 5, 3, -4][index]}deg)`,
                          zIndex: index
                        }}>
                        <Image
                          src={preview.src}
                          alt=''
                          width={480}
                          height={300}
                          sizes='200px'
                          className='aspect-[16/10] h-auto w-full object-cover object-top brightness-90 group-hover:brightness-100'
                        />
                      </span>
                    ))}
                  </span>
                  <span className='relative flex flex-col gap-3'>
                    <PixelItem name='map' size={48} className='pixel-bob' />
                    <span className='text-[clamp(56px,6vw,88px)] leading-none font-extrabold tracking-[-0.05em]'>
                      {more.count}
                    </span>
                    <span className='text-2xl font-semibold tracking-[-0.02em]'>{more.title}</span>
                    <span className='leading-relaxed text-soft'>{more.line}</span>
                    <span className='mt-2 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:translate-x-1'>
                      <Icon icon={appIcons.arrowRight} className='size-5' aria-hidden='true' />
                    </span>
                  </span>
                </Link>
              </motion.li>
            ) : null}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
    </div>
  )
}
