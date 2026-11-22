import type { ReactNode } from 'react'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { cn } from '@/lib/utils'

export function SectionTitle({
  before,
  accent,
  after,
  as: Tag = 'h2',
  className
}: {
  before?: string
  accent?: string
  after?: string
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <Tag className={cn('display text-[clamp(44px,7vw,116px)]', className)}>
      {before}
      {accent ? (
        <>
          {before ? ' ' : null}
          <span className='accent-serif'>{accent}</span>
        </>
      ) : null}
      {after ? <> {after}</> : null}
    </Tag>
  )
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-foreground',
        className
      )}>
      {children}
      <Icon icon={appIcons.arrowUpRight} className='size-4' aria-hidden='true' />
    </a>
  )
}
