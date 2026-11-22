import Link from 'next/link'

import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { getNextProject } from '@/content/projects'
import { itemIcon, PixelItem } from './pixel'
import { tr, type CaseStudy, type Lang, type Product, type Project } from '@/content/types'
import type { AppTranslate } from '@/tolgee/translate'

import { ExternalLink } from './blocks'
import MediaView from './media'
import ProductStage from './product-stage'
import { Reveal } from './motion'
import { GallerySection, ObstaclesSection, ResultsSection } from './story'

type Props<T> = { project: T; lang: Lang; t: AppTranslate }

function BackBar({ t, label }: { t: AppTranslate; label: string }) {
  return (
    <div className='container-page flex items-center justify-between gap-4 pt-28'>
      <Link
        href='/work'
        className='link-draw inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase'>
        <Icon icon={appIcons.arrowLeft} className='size-4' aria-hidden='true' />
        {t('common.detail.back', 'All work')}
      </Link>
      <span className='eyebrow'>{label}</span>
    </div>
  )
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-2'>
      <dt className='eyebrow'>{label}</dt>
      <dd className='leading-relaxed'>{children}</dd>
    </div>
  )
}

function NextProject({ project, lang, t }: Props<Project>) {
  const next = getNextProject(project)
  return (
    <div className='container-page pb-24'>
      <Link
        href={`/work/${next.slug}`}
        className='group flex flex-wrap items-center justify-between gap-6 rounded-[1.75rem] border border-line bg-card/50 p-6 transition-colors duration-500 hover:border-line-strong hover:bg-card sm:p-8'>
        <span className='flex flex-col gap-2'>
          <span className='eyebrow flex items-center gap-2'>
            <PixelItem name='boots' size={24} />
            {project.kind === 'product'
              ? t('common.detail.next-product', 'Next product')
              : t('common.detail.next-case', 'Next case study')}
          </span>
          <span className='text-[clamp(26px,3vw,40px)] leading-tight font-semibold tracking-[-0.025em]'>
            {next.title}
          </span>
          <span className='max-w-2xl text-soft'>{tr(next.tagline, lang)}</span>
        </span>
        <span className='flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:translate-x-1'>
          <Icon icon={appIcons.arrowRight} className='size-6' aria-hidden='true' />
        </span>
      </Link>
    </div>
  )
}

export function ProductDetail({ project, lang, t }: Props<Product>) {
  return (
    <article>
      <BackBar t={t} label={t('common.detail.product', 'Product')} />

      <header className='container-page grid items-center gap-x-12 gap-y-10 pt-12 pb-16 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='flex flex-col gap-6'>
          <Reveal className='flex flex-wrap gap-2'>
            <span className='pill text-primary'>
              {project.version} · {t('common.detail.shipped', 'shipped')}
            </span>
            <span className='pill'>{tr(project.category, lang)}</span>
          </Reveal>
          <h1 className='display flex flex-wrap items-center gap-4 text-[clamp(44px,5.6vw,88px)] leading-[0.95]'>
            {itemIcon[project.slug] ? <PixelItem src={itemIcon[project.slug]} size={72} className='pixel-bob' /> : null}
            {project.title}
          </h1>
          <p className='text-[clamp(19px,1.7vw,24px)] leading-[1.45]'>{tr(project.tagline, lang)}</p>
          <Reveal delay={0.15}>
            <p className='leading-relaxed text-muted-foreground'>{tr(project.summary, lang)}</p>
          </Reveal>
          <Reveal delay={0.2} className='flex flex-wrap gap-3'>
            {project.links.map((link, index) => (
              <ExternalLink
                key={link.href}
                href={link.href}
                className={
                  index === 0
                    ? 'border-primary bg-primary font-semibold text-primary-foreground hover:border-primary'
                    : undefined
                }>
                {tr(link.label, lang)}
              </ExternalLink>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ProductStage stage={project.stage} lang={lang} priority sizes='(min-width: 1024px) 50vw, 92vw' />
        </Reveal>
      </header>

      <section aria-label={t('common.detail.facts', 'Key facts')} className='container-page pb-20'>
        <dl className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
          {project.facts.map((fact, index) => (
            <div
              key={index}
              className='flex flex-col-reverse gap-2 rounded-2xl border border-line bg-card/50 p-5 sm:p-6'>
              <dt className='text-sm text-muted-foreground'>{tr(fact.label, lang)}</dt>
              <dd className='text-[clamp(26px,2.8vw,40px)] leading-none font-extrabold tracking-[-0.035em]'>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className='container-page pb-24'>
        <Reveal className='grid gap-4 rounded-[1.75rem] border border-line bg-card/50 p-6 sm:p-10 lg:grid-cols-[1fr_3fr] lg:gap-10'>
          <span className='eyebrow text-primary'>{t('common.detail.why', 'Why I built it')}</span>
          <p className='text-[clamp(20px,2vw,28px)] leading-[1.4]'>{tr(project.why, lang)}</p>
        </Reveal>
      </section>

      <ResultsSection results={project.results} timeline={project.timeline} lang={lang} t={t} />

      <section className='container-page flex flex-col gap-8 pb-24'>
        <h2 className='display text-[clamp(30px,3.4vw,48px)]'>{t('common.detail.what', 'What it does')}</h2>
        <ul className='grid items-start gap-4 md:grid-cols-2'>
          {project.features.map((feature, index) => (
            <Reveal
              as='li'
              key={index}
              delay={(index % 2) * 0.08}
              className={
                feature.media
                  ? 'flex flex-col gap-5 rounded-3xl border border-line bg-card p-6 sm:p-8 md:col-span-2 lg:col-span-1'
                  : 'flex flex-col gap-4 rounded-3xl border border-line p-6 sm:p-8'
              }>
              <h3 className='text-2xl font-semibold tracking-tight'>{tr(feature.title, lang)}</h3>
              <p className='leading-relaxed text-soft'>{tr(feature.body, lang)}</p>
              {feature.media ? <MediaView media={feature.media} lang={lang} className='mt-2' /> : null}
            </Reveal>
          ))}
        </ul>
      </section>

      <GallerySection media={project.gallery} lang={lang} t={t} />

      <ObstaclesSection obstacles={project.obstacles} lang={lang} t={t} />

      <section className='container-page grid items-center gap-12 pb-24 lg:grid-cols-[1fr_1.3fr]'>
        <Reveal className='flex flex-col gap-6'>
          <span className='eyebrow text-primary'>{t('common.detail.how', 'Under the hood')}</span>
          <h2 className='display text-[clamp(30px,3.4vw,48px)] leading-[1.02]'>{tr(project.how.title, lang)}</h2>
          <ol className='flex flex-col'>
            {project.how.steps.map((step, index) => (
              <li key={index} className='flex gap-5 border-t border-line py-4 text-lg text-soft'>
                <span className='font-mono text-sm text-primary'>{String(index + 1).padStart(2, '0')}</span>
                {tr(step, lang)}
              </li>
            ))}
          </ol>
        </Reveal>
        {project.how.media ? (
          <Reveal delay={0.1}>
            <MediaView media={project.how.media} lang={lang} />
          </Reveal>
        ) : null}
      </section>

      <section className='container-page pb-16'>
        <dl className='grid gap-8 rounded-[1.75rem] border border-line p-6 sm:p-8 md:grid-cols-3'>
          <MetaItem label={t('common.detail.role', 'Role')}>{tr(project.role, lang)}</MetaItem>
          <MetaItem label={t('common.detail.stack', 'Stack')}>{project.stack.join(' · ')}</MetaItem>
          <MetaItem label={t('common.detail.links', 'Links')}>
            <span className='flex flex-wrap gap-x-5 gap-y-2'>
              {project.links.map(link => (
                <a key={link.href} href={link.href} target='_blank' rel='noreferrer' className='link-draw'>
                  {tr(link.label, lang)} ↗
                </a>
              ))}
            </span>
          </MetaItem>
        </dl>
      </section>

      <NextProject project={project} lang={lang} t={t} />
    </article>
  )
}

export function CaseDetail({ project, lang, t }: Props<CaseStudy>) {
  const tldr = [
    { label: t('common.detail.problem', 'Problem'), body: tr(project.problem, lang) },
    { label: t('common.detail.did', 'What I did'), body: tr(project.did, lang) },
    ...(project.result ? [{ label: t('common.detail.result', 'Result'), body: tr(project.result, lang) }] : [])
  ]

  return (
    <article>
      <BackBar t={t} label={t('common.detail.case', 'Case study')} />

      <header className='container-page grid items-center gap-x-12 gap-y-10 pt-12 pb-14 sm:pt-16 lg:grid-cols-[0.95fr_1.05fr]'>
        <div className='flex flex-col gap-6'>
          <Reveal>
            <span className='eyebrow text-primary'>{tr(project.client, lang)}</span>
          </Reveal>
          <h1 className='display text-[clamp(44px,5.6vw,88px)] leading-[0.95]'>{project.title}</h1>
          <Reveal delay={0.1}>
            <p className='text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-soft'>{tr(project.summary, lang)}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className='grid gap-5 border-t border-line pt-6 sm:grid-cols-2'>
              <MetaItem label={t('common.detail.role', 'Role')}>{tr(project.role, lang)}</MetaItem>
              {project.period ? (
                <MetaItem label={t('common.detail.period', 'Period')}>{tr(project.period, lang)}</MetaItem>
              ) : (
                <MetaItem label={t('common.detail.stack', 'Stack')}>{project.stack.slice(0, 4).join(' · ')}</MetaItem>
              )}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <MediaView media={project.cover} lang={lang} priority sizes='(min-width: 1024px) 52vw, 92vw' />
        </Reveal>
      </header>

      <section aria-label='TL;DR' className='container-page pb-20'>
        <Reveal>
          <dl
            className={`grid gap-px overflow-hidden rounded-3xl border border-line bg-line ${tldr.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {tldr.map(item => (
              <div key={item.label} className='flex flex-col gap-3 bg-card p-6 sm:p-7'>
                <dt className='eyebrow text-primary'>{item.label}</dt>
                <dd className='leading-relaxed'>{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <ResultsSection results={project.results} timeline={project.timeline} lang={lang} t={t} />

      {project.architecture ? (
        <section className='container-page pb-24'>
          <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
            <h2 className='display text-[clamp(30px,3.4vw,48px)]'>
              {t('common.detail.architecture', 'How it fits together')}
            </h2>
            <span className='eyebrow'>{t('common.detail.redrawn', 'Redrawn diagram')}</span>
          </div>
          <Reveal>
            <MediaView media={project.architecture} lang={lang} />
          </Reveal>
        </section>
      ) : null}

      <section className='container-page pb-24'>
        <h2 className='display mb-8 text-[clamp(30px,3.4vw,48px)]'>{t('common.detail.hard', 'How it works')}</h2>
        <ol>
          {project.challenges.map((challenge, index) => (
            <Reveal
              as='li'
              key={index}
              className='grid gap-3 border-t border-line py-7 last:border-b md:grid-cols-[4rem_minmax(0,2fr)_minmax(0,3fr)] md:gap-8'>
              <span className='font-mono text-sm text-primary'>{String(index + 1).padStart(2, '0')}</span>
              <h3 className='text-[clamp(20px,1.8vw,26px)] leading-tight font-semibold tracking-tight'>
                {tr(challenge.title, lang)}
              </h3>
              <p className='leading-relaxed text-soft'>{tr(challenge.body, lang)}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <ObstaclesSection obstacles={project.obstacles} lang={lang} t={t} />

      {project.decisions.length ? (
        <section className='container-page pb-24'>
          <h2 className='display mb-8 text-[clamp(30px,3.4vw,48px)]'>
            {t('common.detail.decisions', 'Decisions & trade-offs')}
          </h2>
          <ul className='grid gap-4 md:grid-cols-2'>
            {project.decisions.map((decision, index) => (
              <Reveal
                as='li'
                key={index}
                delay={index * 0.08}
                className='flex flex-col gap-3 rounded-3xl border border-line p-7 sm:p-8'>
                <h3 className='text-xl font-semibold'>{tr(decision.title, lang)}</h3>
                <p className='leading-relaxed text-soft'>{tr(decision.body, lang)}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      ) : null}

      <GallerySection media={project.gallery} lang={lang} t={t} />

      <section className='container-page grid gap-10 pb-20 md:grid-cols-2'>
        <div className='flex flex-col gap-5 rounded-3xl border border-line p-7 sm:p-8'>
          <span className='eyebrow'>{t('common.detail.owned', 'What I owned')}</span>
          <ul className='flex flex-col gap-3 text-lg text-soft'>
            {project.owned.map((item, index) => (
              <li key={index} className='flex gap-3'>
                <span className='mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary' aria-hidden='true' />
                {tr(item, lang)}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-5 rounded-3xl border border-line p-7 sm:p-8'>
          <span className='eyebrow'>{t('common.detail.stack', 'Stack')}</span>
          <ul className='flex flex-wrap gap-2'>
            {project.stack.map(item => (
              <li key={item} className='pill'>
                {item}
              </li>
            ))}
          </ul>
          {project.links.length ? (
            <div className='mt-auto flex flex-wrap gap-3 pt-4'>
              {project.links.map(link => (
                <ExternalLink key={link.href} href={link.href}>
                  {tr(link.label, lang)}
                </ExternalLink>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {project.confidential ? (
        <section className='container-page pb-24'>
          <p className='flex items-start gap-3 rounded-2xl border border-line p-5 text-sm leading-relaxed text-muted-foreground'>
            <Icon icon={appIcons.lock} className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden='true' />
            {t(
              'common.detail.confidential',
              'Client system with private data — the visuals on this page are redrawn diagrams, not screenshots.'
            )}
          </p>
        </section>
      ) : null}

      <NextProject project={project} lang={lang} t={t} />
    </article>
  )
}
