import type { MetadataRoute } from 'next'

import { allProjects } from '@/content/projects'
import { absolute } from '@/lib/seo'

/** Every public page, home first. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/experience', priority: 0.9 },
    { path: '/work', priority: 0.9 },
    { path: '/resume', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/learning', priority: 0.5 }
  ]
  return [
    ...pages.map(page => ({ url: absolute(page.path), lastModified: now, priority: page.priority })),
    ...allProjects.map(project => ({ url: absolute(`/work/${project.slug}`), lastModified: now, priority: 0.7 })),
    { url: absolute('/Satang-Budsai-Resume.pdf'), lastModified: now, priority: 0.6 }
  ]
}
