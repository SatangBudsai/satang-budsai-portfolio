'use client'

import { useEffect, useState } from 'react'

import { PixelItem } from './pixel'

/**
 * A small panel for trying colour palettes and visual styles on the real
 * site. Shown in development, or in production with `?design` in the URL.
 * The choice is stored in this browser only.
 */
export const palettes = [
  { id: 'violet', name: 'Violet night', swatch: ['#0b0a10', '#9b6dff'] },
  { id: 'mint', name: 'Mint terminal', swatch: ['#07100e', '#4ee6b0'] },
  { id: 'sunset', name: 'Sunset', swatch: ['#120c0a', '#ff8a4c'] },
  { id: 'ocean', name: 'Ocean', swatch: ['#070b14', '#5ab4ff'] },
  { id: 'arcade', name: 'Arcade', swatch: ['#0d0820', '#ffd23f'] },
  { id: 'sakura', name: 'Sakura', swatch: ['#100a0e', '#ff7eb6'] },
  { id: 'paper', name: 'Paper (light)', swatch: ['#f6f3ec', '#6d3fe0'] }
] as const

export const styles = [
  { id: 'soft', name: 'Soft', note: 'rounded, calm' },
  { id: 'pixel', name: 'Pixel', note: 'square, hard shadows' },
  { id: 'editorial', name: 'Editorial', note: 'serif headlines' }
] as const

const KEY = 'design-choice'

export function applyDesign(palette: string, style: string) {
  const root = document.documentElement
  root.dataset.palette = palette
  root.dataset.style = style
  root.style.colorScheme = palette === 'paper' ? 'light' : 'dark'
}

/** Runs before React so a saved choice shows without a flash. */
export const designBootScript = `try{var d=JSON.parse(localStorage.getItem('${KEY}')||'null');var q=new URLSearchParams(location.search);var p=q.get('palette')||(d&&d.palette);var s=q.get('style')||(d&&d.style);if(p){document.documentElement.dataset.palette=p;document.documentElement.style.colorScheme=p==='paper'?'light':'dark'}if(s)document.documentElement.dataset.style=s}catch(e){}`

export default function DesignPicker({ always }: { always: boolean }) {
  const [visible, setVisible] = useState(always)
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState({ palette: 'violet', style: 'soft' })

  useEffect(() => {
    const root = document.documentElement
    const params = new URLSearchParams(window.location.search)
    // Reading the DOM and URL once on mount; the boot script already applied them.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice({ palette: root.dataset.palette ?? 'violet', style: root.dataset.style ?? 'soft' })
    if (params.has('design')) setVisible(true)
  }, [])

  const pick = (next: Partial<typeof choice>) => {
    const value = { ...choice, ...next }
    setChoice(value)
    applyDesign(value.palette, value.style)
    try {
      localStorage.setItem(KEY, JSON.stringify(value))
    } catch {}
  }

  if (!visible) return null

  return (
    <div className='fixed bottom-4 left-4 z-[90] flex flex-col items-start gap-2 print:hidden'>
      {open ? (
        <div
          role='dialog'
          aria-label='Design options'
          className='w-[17rem] rounded-2xl border border-line-strong bg-card p-4 text-sm text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.5)]'>
          <p className='eyebrow mb-2'>Palette</p>
          <div className='grid grid-cols-2 gap-1.5'>
            {palettes.map(item => (
              <button
                key={item.id}
                type='button'
                aria-pressed={choice.palette === item.id}
                onClick={() => pick({ palette: item.id })}
                className='flex items-center gap-2 rounded-lg border border-line px-2 py-1.5 text-left text-xs transition-colors hover:border-line-strong aria-pressed:border-primary aria-pressed:bg-primary/10'>
                <span className='flex shrink-0 overflow-hidden rounded-full border border-white/20'>
                  <span className='size-3.5' style={{ background: item.swatch[0] }} />
                  <span className='size-3.5' style={{ background: item.swatch[1] }} />
                </span>
                {item.name}
              </button>
            ))}
          </div>
          <p className='eyebrow mt-4 mb-2'>Style</p>
          <div className='flex flex-col gap-1.5'>
            {styles.map(item => (
              <button
                key={item.id}
                type='button'
                aria-pressed={choice.style === item.id}
                onClick={() => pick({ style: item.id })}
                className='flex items-baseline justify-between rounded-lg border border-line px-3 py-1.5 text-left text-xs transition-colors hover:border-line-strong aria-pressed:border-primary aria-pressed:bg-primary/10'>
                <span className='font-semibold'>{item.name}</span>
                <span className='text-muted-foreground'>{item.note}</span>
              </button>
            ))}
          </div>
          <p className='mt-3 text-[11px] leading-snug text-muted-foreground'>
            Saved in this browser. Share a combo with <code>?palette=…&amp;style=…</code>
          </p>
        </div>
      ) : null}
      <button
        type='button'
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
        className='inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3 py-2 text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.4)]'>
        <PixelItem name='wand' size={24} />
        Design
      </button>
    </div>
  )
}
