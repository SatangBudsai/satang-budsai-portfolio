import type { ReactNode } from 'react'

/**
 * A soft fade between pages, done in CSS (`.page-fade` in globals.css) so it starts with the
 * server HTML. A JS-driven fade kept every page invisible until hydration and pushed LCP to ~5 s
 * on mobile. Opacity only: a transform here would trap fixed-position elements.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className='page-fade'>{children}</div>
}
