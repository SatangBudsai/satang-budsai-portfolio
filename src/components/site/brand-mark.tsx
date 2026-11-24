/** The pixel "S + cursor" mark (public/brand/logo-mark.svg), coloured by the theme accent. */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
      <path fill='var(--primary)' d='M16 12H48V20H24V28H40V36H48V44H40V52H8V44H32V36H16V28H8V20H16ZM48 44H56V52H48Z' />
    </svg>
  )
}
