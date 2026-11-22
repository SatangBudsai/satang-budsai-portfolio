import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { tr, type L, type Lang, type Media, type Obstacle } from '@/content/types'
import type { AppTranslate } from '@/tolgee/translate'

import Gallery from './gallery'
import { Reveal } from './motion'

const H2 = 'display text-[clamp(30px,3.4vw,48px)]'

export function ResultsSection({
  results,
  timeline,
  lang,
  t
}: {
  results?: L[]
  timeline?: L
  lang: Lang
  t: AppTranslate
}) {
  if (!results?.length) return null
  return (
    <section className='container-page pb-24'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <h2 className={H2}>{t('common.story.results', 'Results')}</h2>
        {timeline ? <span className='font-mono text-xs text-muted-foreground'>{tr(timeline, lang)}</span> : null}
      </div>
      <ul className='grid gap-3 sm:grid-cols-2'>
        {results.map((result, index) => (
          <Reveal
            as='li'
            key={index}
            delay={(index % 2) * 0.05}
            className='flex gap-3 rounded-2xl border border-line bg-card/50 p-5'>
            <span className='mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary'>
              <Icon icon={appIcons.check} className='size-3.5' aria-hidden='true' />
            </span>
            <span className='leading-relaxed'>{tr(result, lang)}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export function ObstaclesSection({ obstacles, lang, t }: { obstacles?: Obstacle[]; lang: Lang; t: AppTranslate }) {
  if (!obstacles?.length) return null
  return (
    <section className='container-page pb-24'>
      <div className='mb-8 flex flex-col gap-3'>
        <h2 className={H2}>{t('common.story.obstacles', 'What went wrong — and how I fixed it')}</h2>
        <p className='max-w-2xl text-soft'>
          {t('common.story.obstacles-lead', 'Real problems from the commit history, not a highlight reel.')}
        </p>
      </div>
      <ol className='flex flex-col gap-3'>
        {obstacles.map((obstacle, index) => (
          <Reveal
            as='li'
            key={index}
            className='grid gap-4 rounded-2xl border border-line p-5 sm:p-6 md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-6'>
            <span className='font-mono text-sm text-primary'>{String(index + 1).padStart(2, '0')}</span>
            <div className='flex flex-col gap-2'>
              <span className='eyebrow'>{t('common.story.problem', 'Problem')}</span>
              <p className='leading-relaxed'>{tr(obstacle.problem, lang)}</p>
            </div>
            <div className='flex flex-col gap-2 border-line max-md:border-t max-md:pt-4 md:border-l md:pl-6'>
              <span className='eyebrow text-primary'>{t('common.story.fix', 'How I fixed it')}</span>
              <p className='leading-relaxed text-soft'>{tr(obstacle.fix, lang)}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export function GallerySection({ media, lang, t }: { media?: Media[]; lang: Lang; t: AppTranslate }) {
  const items = (media ?? []).flatMap(item =>
    item.kind === 'image'
      ? [{ src: item.src, width: item.width, height: item.height, alt: tr(item.alt, lang), animated: item.animated }]
      : []
  )
  if (!items.length) return null
  return (
    <section className='container-page pb-24'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <h2 className={H2}>{t('common.story.gallery', 'Screens')}</h2>
        <span className='font-mono text-xs text-muted-foreground'>
          {t('common.story.gallery-hint', '{count} screens · click to enlarge', { count: items.length })}
        </span>
      </div>
      <Gallery items={items} labels={galleryLabels(t)} />
    </section>
  )
}

export function galleryLabels(t: AppTranslate) {
  return {
    open: t('common.story.open', 'Open'),
    close: t('common.story.close', 'Close'),
    previous: t('common.story.previous', 'Previous'),
    next: t('common.story.next', 'Next'),
    // The gallery fills these in on the client.
    counter: t('common.story.counter', '{current} / {total}', { current: '{current}', total: '{total}' })
  }
}
