import type { MetadataRoute } from 'next'

import { profile } from '@/content/site'
import { SITE_DESCRIPTION } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: 'Satang',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'browser',
    background_color: '#0b0a10',
    theme_color: '#0b0a10',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' }
    ]
  }
}
