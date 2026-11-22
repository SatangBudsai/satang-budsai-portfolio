import type { Metadata } from 'next'

import { SectionTitle } from '@/components/site/blocks'
import { Reveal } from '@/components/site/motion'
import WorkGrid from '@/components/site/work-grid'
import { buildWorkItems } from '@/components/site/work-items'
import { getI18n } from '@/lib/lang'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t('common.nav.work', 'Work'),
    description:
      'Every project by Satang Budsai: government identity and customs systems, university platforms, and open-source developer tools — with case studies, diagrams and results.',
    alternates: { canonical: '/work' }
  }
}

export default async function Work() {
  const { lang, t } = await getI18n()

  return (
    <section className='container-page pt-32 pb-28 sm:pt-40'>
      <header className='mb-12 flex flex-col gap-6'>
        <Reveal>
          <SectionTitle
            as='h1'
            before={t('common.work.title-before', 'All the')}
            accent={t('common.work.title-accent', 'work')}
            className='text-[clamp(44px,5.6vw,88px)]'
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className='max-w-2xl text-xl leading-relaxed text-soft'>
            {t('common.work.lead', 'Products I ship myself, systems built for clients, and a lab of experiments.')}
          </p>
        </Reveal>
      </header>
      <WorkGrid
        lang={lang}
        items={buildWorkItems(lang, t)}
        filters={{
          label: t('common.grid.filter-label', 'Filter work'),
          all: t('common.grid.all', 'All'),
          product: t('common.grid.products', 'My products'),
          client: t('common.grid.client', 'Client work'),
          experiment: t('common.grid.lab', 'Learning')
        }}
        cta={{
          href: '#contact',
          note: t('common.grid.cta-note', 'psst, this spot is free'),
          title: t('common.grid.cta-title', 'Your project here?'),
          line: t('common.grid.cta-line', 'Let’s talk')
        }}
      />
    </section>
  )
}
