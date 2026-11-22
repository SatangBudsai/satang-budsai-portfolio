'use client'

import { Icon } from '@/components/ui/icon'

import { appIcons } from '@/config/icons'

/** Opens the print dialog with a sensible file name; "Save as PDF" gives the résumé. */
export default function ExportResume({ label, fileName }: { label: string; fileName: string }) {
  const exportPdf = () => {
    const title = document.title
    document.title = fileName
    window.print()
    document.title = title
  }
  return (
    <button
      type='button'
      onClick={exportPdf}
      className='inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-transform active:scale-95 print:hidden'>
      <Icon icon={appIcons.download} className='size-5' aria-hidden='true' />
      {label}
    </button>
  )
}
