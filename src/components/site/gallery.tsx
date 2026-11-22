'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { cn } from '@/lib/utils'

export type GalleryItem = { src: string; width: number; height: number; alt: string; animated?: boolean }

/**
 * A grid of screens. Clicking one opens it full size in a native <dialog>
 * (focus trap and Esc for free) with previous/next and arrow-key support.
 */
export default function Gallery({
  items,
  labels,
  columns = 3
}: {
  items: GalleryItem[]
  labels: { open: string; close: string; previous: string; next: string; counter: string }
  columns?: 2 | 3
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number) => {
    setIndex(i)
    dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()
  const step = useCallback(
    (delta: number) => setIndex(current => (current === null ? null : (current + delta + items.length) % items.length)),
    [items.length]
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, step])

  const current = index === null ? null : items[index]

  return (
    <>
      <ul className={cn('grid gap-3 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3')}>
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type='button'
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${item.alt}`}
              className='group block w-full overflow-hidden rounded-2xl border border-line bg-card text-left transition-colors hover:border-line-strong'>
              <span className='relative block aspect-[16/10] overflow-hidden'>
                <Image
                  src={item.src}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'
                  unoptimized={item.animated}
                  className='object-cover object-top brightness-[0.9] transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:brightness-100'
                />
              </span>
              <span className='block px-4 py-3 text-sm text-soft'>{item.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={event => {
          if (event.target === dialog.current) close()
        }}
        className='m-auto max-h-[94vh] w-[min(96vw,1400px)] max-w-none overflow-visible bg-transparent p-0 text-foreground backdrop:bg-black/85 backdrop:backdrop-blur-sm'>
        {current ? (
          <figure className='flex flex-col gap-3'>
            <div className='relative overflow-hidden rounded-2xl border border-line bg-card'>
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes='96vw'
                unoptimized={current.animated}
                className='mx-auto block max-h-[80vh] w-auto object-contain'
              />
            </div>
            <figcaption className='flex flex-wrap items-center justify-between gap-3'>
              <span className='text-soft'>
                <span className='mr-3 font-mono text-xs text-muted-foreground'>
                  {labels.counter
                    .replace('{current}', String((index ?? 0) + 1))
                    .replace('{total}', String(items.length))}
                </span>
                {current.alt}
              </span>
              <span className='flex gap-2'>
                <button
                  type='button'
                  onClick={() => step(-1)}
                  aria-label={labels.previous}
                  className='inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-background hover:border-foreground'>
                  <Icon icon={appIcons.arrowLeft} className='size-5' aria-hidden='true' />
                </button>
                <button
                  type='button'
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className='inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-background hover:border-foreground'>
                  <Icon icon={appIcons.arrowRight} className='size-5' aria-hidden='true' />
                </button>
                <button
                  type='button'
                  onClick={close}
                  aria-label={labels.close}
                  className='inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <Icon icon={appIcons.close} className='size-5' aria-hidden='true' />
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  )
}
