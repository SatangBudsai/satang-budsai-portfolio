'use client'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'

/** Opens the print dialog with a sensible file name ("Save as PDF" works too). */
export default function ExportResume({ label, fileName }: { label: string; fileName: string }) {
  const print = () => {
    const title = document.title
    document.title = fileName
    window.print()
    document.title = title
  }
  return (
    <button
      type='button'
      onClick={print}
      className='inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 transition-colors hover:border-foreground print:hidden'>
      <Icon icon={appIcons.printer} className='size-5' aria-hidden='true' />
      {label}
    </button>
  )
}
