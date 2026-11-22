import type { MetadataRoute } from 'next'

import { absolute } from '@/lib/seo'

/** Open to search engines and AI assistants alike: the point of the site is to be found and cited. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot'
        ],
        allow: '/'
      }
    ],
    sitemap: absolute('/sitemap.xml')
  }
}
