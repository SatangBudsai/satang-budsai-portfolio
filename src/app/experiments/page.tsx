import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/site/motion'
import { GallerySection, ObstaclesSection, ResultsSection } from '@/components/site/story'
import { experimentGalleries } from '@/content/galleries'
import { experimentStories } from '@/content/stories'
import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { experiments } from '@/content/site'
import { tr } from '@/content/types'
import { getI18n } from '@/lib/lang'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t('common.nav.experiments', 'Experiments'),
    description: t('common.exp.meta', 'Studies in building unfamiliar software by directing AI coding agents.')
  }
}

export default async function Experiments() {
  const { lang, t } = await getI18n()
  const testing = [
    t('common.exp.test-1', 'Can agents follow architecture decisions over hundreds of commits?'),
    t('common.exp.test-2', 'How should work be split between more than one agent?'),
    t('common.exp.test-3', 'What still needs a human to decide?')
  ]

  return (
    <>
      <header className='container-page flex flex-col gap-10 pt-32 pb-20 sm:pt-40'>
        <Reveal>
          <span className='eyebrow text-primary'>
            {t('common.exp.page-eyebrow', 'Study log · AI-assisted development')}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className='display max-w-[16ch] text-[clamp(40px,5.2vw,80px)] leading-[1]'>
            {t('common.exp.page-title-before', 'Building what I’ve')}{' '}
            <span className='accent-serif text-primary'>{t('common.exp.page-title-accent', 'never')}</span>{' '}
            {t('common.exp.page-title-after', 'built.')}
          </h1>
        </Reveal>
        <div className='grid gap-10 lg:grid-cols-[3fr_2fr]'>
          <Reveal delay={0.1}>
            <p className='text-xl leading-relaxed text-soft'>
              {t(
                'common.exp.intro',
                'I’m a web developer, not a game developer. These projects are deliberate experiments: pick a domain I have no experience in — real-time multiplayer, game engines — and see how far planning, written rules and AI coding agents can carry me.'
              )}
            </p>
          </Reveal>
          <Reveal delay={0.15} className='flex flex-col gap-4 rounded-3xl border border-line p-7'>
            <span className='eyebrow'>{t('common.exp.testing', 'What I’m testing')}</span>
            <ul className='flex flex-col gap-3 text-soft'>
              {testing.map(item => (
                <li key={item} className='flex gap-3'>
                  <span className='mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary' aria-hidden='true' />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </header>

      {experiments.map((experiment, index) => (
        <section
          key={experiment.slug}
          id={experiment.slug}
          aria-labelledby={`${experiment.slug}-title`}
          className='container-page scroll-mt-24 border-t border-line py-20 sm:py-28'>
          <Reveal className='mb-12 flex flex-wrap items-end justify-between gap-6'>
            <div className='flex flex-col gap-4'>
              <span className='eyebrow'>
                {t('common.exp.experiment', 'Experiment')} {String(index + 1).padStart(2, '0')} ·{' '}
                {tr(experiment.status, lang)}
              </span>
              <h2 id={`${experiment.slug}-title`} className='display text-[clamp(32px,3.8vw,56px)]'>
                {experiment.title}
              </h2>
            </div>
            {experiment.fact ? (
              <div className='flex flex-col gap-1 text-right'>
                <span className='text-5xl font-extrabold tracking-[-0.04em]'>{experiment.fact.value}</span>
                <span className='text-sm text-muted-foreground'>{tr(experiment.fact.label, lang)}</span>
              </div>
            ) : null}
          </Reveal>

          <Reveal>
            <Image
              src={experiment.media[0].src}
              alt={tr(experiment.media[0].alt, lang)}
              width={experiment.media[0].width}
              height={experiment.media[0].height}
              sizes='(min-width: 1440px) 1300px, 92vw'
              className='h-auto w-full rounded-2xl border border-line'
            />
          </Reveal>

          <div className='mt-14 grid gap-10 md:grid-cols-3'>
            <Reveal className='flex flex-col gap-3'>
              <span className='eyebrow text-primary'>{t('common.exp.question', 'The question')}</span>
              <p className='text-lg leading-relaxed text-soft'>{tr(experiment.question, lang)}</p>
            </Reveal>
            <Reveal delay={0.06} className='flex flex-col gap-3'>
              <span className='eyebrow text-primary'>{t('common.exp.setup', 'How I steered the agents')}</span>
              <p className='text-lg leading-relaxed text-soft'>{tr(experiment.setup, lang)}</p>
            </Reveal>
            <Reveal delay={0.12} className='flex flex-col gap-3'>
              <span className='eyebrow text-primary'>{t('common.exp.rules', 'Rules that held')}</span>
              <ul className='flex flex-col gap-3 text-lg leading-relaxed text-soft'>
                {experiment.learned.map((item, itemIndex) => (
                  <li key={itemIndex}>{tr(item, lang)}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <p className='mt-10 font-mono text-xs text-muted-foreground'>{experiment.stack.join(' · ')}</p>
          <div className='-mx-4 mt-16 sm:-mx-6 lg:-mx-[4vw]'>
            <ResultsSection
              results={experimentStories[experiment.slug]?.results}
              timeline={experimentStories[experiment.slug]?.timeline}
              lang={lang}
              t={t}
            />
            <ObstaclesSection obstacles={experimentStories[experiment.slug]?.obstacles} lang={lang} t={t} />
            <GallerySection media={experimentGalleries[experiment.slug]} lang={lang} t={t} />
          </div>
        </section>
      ))}

      <section className='container-page border-t border-line py-20 sm:py-28'>
        <Reveal className='flex flex-wrap items-center justify-between gap-8'>
          <p className='max-w-3xl text-[clamp(20px,2vw,28px)] leading-[1.35]'>
            {t('common.exp.sage-before', 'The same idea — rules written down where agents can read them — is behind')}{' '}
            <span className='accent-serif text-primary'>Sage</span>
            {t('common.exp.sage-after', ', the ruleset I use for AI coding every day.')}
          </p>
          <a
            href='https://sage.qorstack.com'
            target='_blank'
            rel='noreferrer'
            className='inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 transition-colors hover:border-foreground'>
            sage.qorstack.com
            <Icon icon={appIcons.arrowUpRight} className='size-4' aria-hidden='true' />
          </a>
        </Reveal>
        <Link href='/work' className='link-draw mt-16 inline-flex items-center gap-2 text-sm'>
          <Icon icon={appIcons.arrowLeft} className='size-4' aria-hidden='true' />
          {t('common.detail.back', 'All work')}
        </Link>
      </section>
    </>
  )
}
