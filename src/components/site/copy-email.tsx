'use client'

import { useState } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'

export default function CopyEmail({
  email,
  label,
  copiedLabel
}: {
  email: string
  label: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type='button'
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2000)
        } catch {
          window.location.href = `mailto:${email}`
        }
      }}
      className='inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm transition-colors hover:border-foreground'>
      <Icon icon={copied ? appIcons.check : appIcons.copy} className='size-4' aria-hidden='true' />
      <span aria-live='polite'>{copied ? copiedLabel : label}</span>
    </button>
  )
}
