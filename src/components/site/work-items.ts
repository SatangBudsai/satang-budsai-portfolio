import { cases, products } from '@/content/projects'
import { experiments, lab } from '@/content/site'
import { tr, type L, type Lang, type Media } from '@/content/types'
import type { AppTranslate } from '@/tolgee/translate'

import type { WorkItem, WorkVisual } from './work-grid'

const toneBySlug: Record<string, string> = {
  'eec-id': '#b79cff',
  'eec-e-customs': '#d8b4fe',
  'suvarnabhumi-airport-gate': '#7dd3fc',
  'lampang-health-network': '#86efac',
  'cmu-journal': '#f9a8d4',
  'cmu-research-gallery': '#c4b5fd',
  'ora-cmu': '#a78bfa',
  'zoo-together': '#fdba74',
  'age-of-lost-knowledge': '#93c5fd',
  sage: '#fbbf24',
  'junior-bootcamp': '#fcd34d',
  readitgo: '#fb7185'
}

const shortClient: Record<string, L> = {
  'eec-id': { en: 'Gov · EEC' },
  'eec-e-customs': { en: 'Gov · EEC' },
  'suvarnabhumi-airport-gate': { en: 'Airport' },
  'lampang-health-network': { en: 'Health' },
  'cmu-journal': { en: 'CMU' },
  'cmu-research-gallery': { en: 'CMU' },
  'ora-cmu': { en: 'CMU' },
  'junior-bootcamp': { en: 'CMU' },
  readitgo: { en: 'Engenius' }
}

function visualOf(media: Media, lang: Lang): WorkVisual {
  if (media.kind === 'art') return { kind: 'art', id: media.id, alt: tr(media.alt, lang) }
  if (media.kind === 'image')
    return {
      kind: 'image',
      src: media.src,
      width: media.width,
      height: media.height,
      alt: tr(media.alt, lang),
      animated: media.animated
    }
  // Diagrams don't work as thumbnails; nothing in the grid uses one as a cover.
  throw new Error(`No thumbnail for diagram ${media.id}`)
}

/**
 * Every project as a card, in the order the grid shows them. The order pairs
 * one large card with two medium ones so large cards alternate sides.
 */
export function buildWorkItems(lang: Lang, t: AppTranslate, options: { featured?: boolean } = {}): WorkItem[] {
  const productTag = t('common.grid.tag-product', 'Product')
  const clientTag = t('common.grid.tag-client', 'Client')
  const experimentTag = t('common.grid.tag-experiment', 'Experiment')

  const items = new Map<string, WorkItem>()

  for (const product of products) {
    items.set(product.slug, {
      key: product.slug,
      href: `/work/${product.slug}`,
      group: 'product',
      size: 'lg',
      title: product.title,
      line: tr(product.tagline, lang),
      tag: `${productTag} · ${tr(product.category, lang)} · ${product.version}`,
      tone: product.stage.tone,
      visual: { kind: 'stage', stage: product.stage }
    })
  }

  for (const item of cases) {
    items.set(item.slug, {
      key: item.slug,
      href: `/work/${item.slug}`,
      group: 'client',
      size: 'md',
      title: item.title,
      line: tr(item.tagline, lang),
      tag: `${clientTag} · ${tr(shortClient[item.slug] ?? item.client, lang)}`,
      tone: toneBySlug[item.slug] ?? '#9b6dff',
      visual: visualOf(item.cover, lang)
    })
  }

  for (const experiment of experiments) {
    items.set(experiment.slug, {
      key: experiment.slug,
      href: `/learning#${experiment.slug}`,
      group: 'experiment',
      size: 'md',
      title: experiment.title,
      line: tr(experiment.question, lang),
      tag: `${experimentTag} · AI`,
      tone: toneBySlug[experiment.slug] ?? '#9b6dff',
      visual: visualOf(experiment.media[0], lang)
    })
  }

  for (const entry of lab) {
    if (!entry.media) continue
    items.set(entry.slug, {
      key: entry.slug,
      href: entry.href ?? '/work',
      external: Boolean(entry.href),
      group: entry.slug === 'sage' ? 'product' : 'client',
      size: 'md',
      title: entry.title,
      line: tr(entry.body, lang),
      tag:
        entry.slug === 'sage'
          ? `${productTag} · ${tr(entry.tag, lang)}`
          : `${clientTag} · ${tr(shortClient[entry.slug], lang)}`,
      tone: toneBySlug[entry.slug] ?? '#9b6dff',
      visual: visualOf(entry.media, lang)
    })
  }

  // Only three cards run large, so the rhythm stays one large card to two medium ones.
  const medium = new Set(['clipath', 'thai-pdf-fixer', 'sage'])
  const large = new Set(['eec-id'])
  const badges: Record<string, string> = {
    'git-control-orca': t('common.grid.badge-orca', 'my daily Git client'),
    'qorstack-report': t('common.grid.badge-qorstack', '43 ★ on GitHub'),
    'thai-pdf-fixer': t('common.grid.badge-pdf', 'for blind users'),
    'age-of-lost-knowledge': t('common.grid.badge-3d', 'now in 3D!')
  }

  const featured = ['git-control-orca', 'eec-id', 'cmu-journal', 'scanhub', 'qorstack-report', 'thai-pdf-fixer']
  const order = options.featured
    ? featured
    : [
        'eec-id',
        'eec-e-customs',
        'cmu-journal',
        'git-control-orca',
        'cmu-research-gallery',
        'clipath',
        'qorstack-report',
        'scanhub',
        'age-of-lost-knowledge',
        'ora-cmu',
        'thai-pdf-fixer',
        'suvarnabhumi-airport-gate',
        'zoo-together',
        'lampang-health-network',
        'sage',
        'junior-bootcamp',
        'readitgo'
      ]

  return order.flatMap(key => {
    const item = items.get(key)
    if (!item) return []
    return [{ ...item, size: large.has(key) ? 'lg' : medium.has(key) ? 'md' : item.size, badge: badges[key] }]
  })
}
