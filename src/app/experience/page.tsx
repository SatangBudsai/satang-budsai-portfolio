import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal } from '@/components/site/motion'
import { PixelItem } from '@/components/site/pixel'
import { education, roles, type Role } from '@/content/experience'
import { getProject } from '@/content/projects'
import { tr } from '@/content/types'
import type { Lang } from '@/content/types'
import { duration } from '@/lib/duration'
import { getI18n } from '@/lib/lang'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t('common.nav.experience', 'Experience'),
    alternates: { canonical: '/experience' },
    description: t(
      'common.exp2.meta',
      'Where Satang Budsai has worked: government systems at Chanwanich, freelance for Chiang Mai University, and own developer tools.'
    )
  }
}

export default async function Experience() {
  const { lang, t } = await getI18n()
  const dayJob = roles.filter(role => !role.side && role.id !== 'intern')
  const side = roles.filter(role => role.side)
  const past = roles.filter(role => role.id === 'intern')

  const stats = [
    {
      icon: 'laptop',
      value: '2.5+',
      label: t('common.exp2.stat-years', 'years full-time at Chanwanich (since Apr 2024)')
    },
    { icon: 'book', value: '1,014', label: t('common.exp2.stat-articles', 'journal articles migrated, none lost') },
    { icon: 'rocket', value: '6', label: t('common.exp2.stat-tools', 'open-source tools shipped') },
    {
      icon: 'trophy',
      value: t('common.exp2.honors-value', '1st'),
      label: t('common.exp2.stat-honors', 'class honours, Chiang Mai University')
    }
  ]

  return (
    <>
      <header className='container-page flex flex-col gap-8 pt-32 pb-16 sm:pt-40'>
        <Reveal className='flex items-center gap-3'>
          <PixelItem name='laptop' size={32} className='pixel-bob' />
          <span className='eyebrow text-primary'>{t('common.exp2.eyebrow', 'Experience · for teams hiring')}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className='display max-w-5xl text-[clamp(40px,5.2vw,80px)] leading-[0.98]'>
            {t('common.exp2.title-before', 'Four years of')}{' '}
            <span className='accent-serif text-primary'>{t('common.exp2.title-accent', 'shipping real systems')}</span>
            {t('common.exp2.title-after', '.')}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className='max-w-3xl text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-soft'>
            {t(
              'common.exp2.intro',
              'Government systems by day at Chanwanich since 2022, freelance work for Chiang Mai University, and my own developer tools after hours. Every role below links to the case studies.'
            )}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
            {stats.map(stat => (
              <li key={stat.label} className='flex flex-col gap-3 rounded-3xl border border-line bg-card/50 p-5 sm:p-6'>
                <PixelItem name={stat.icon} size={32} />
                <span className='text-[clamp(28px,3vw,40px)] leading-none font-extrabold tracking-[-0.04em]'>
                  {stat.value}
                </span>
                <span className='text-sm text-muted-foreground'>{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      {/* NOW: everything that is current, together in one box */}
      <section aria-labelledby='now-title' className='container-page pb-14'>
        <Reveal className='rounded-[2rem] border border-primary/40 bg-card/60 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8'>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
            <h2
              id='now-title'
              className='flex items-center gap-3 text-[clamp(24px,2.4vw,32px)] font-semibold tracking-[-0.02em]'>
              <span className='animate-pulse-dot size-2.5 rounded-full bg-primary' aria-hidden='true' />
              {t('common.exp2.now', 'Now')}
            </h2>
            <span className='text-sm text-soft'>{t('common.exp2.now-note', 'Day job, full-time')}</span>
          </div>
          <div className='grid gap-4'>
            {dayJob.map(role => (
              <RoleCard key={role.id} role={role} lang={lang} />
            ))}
          </div>
          <div className='mt-8 mb-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6'>
            <h3 className='text-xl font-semibold'>{t('common.exp2.side', 'Outside working hours')}</h3>
            <span className='text-sm text-soft'>
              {t('common.exp2.side-note', 'Evenings and weekends, alongside the day job')}
            </span>
          </div>
          <div className='grid gap-4 xl:grid-cols-2'>
            {side.map(role => (
              <RoleCard key={role.id} role={role} lang={lang} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* BEFORE: past roles and education */}
      <section aria-labelledby='before-title' className='container-page pb-20'>
        <h2 id='before-title' className='display mb-6 text-[clamp(26px,2.8vw,40px)]'>
          {t('common.exp2.before', 'Before')}
        </h2>
        <ol className='grid gap-4 md:grid-cols-2'>
          {past.map((role, index) => (
            <Reveal as='li' key={role.id} delay={index * 0.05}>
              <RoleCard role={role} lang={lang} />
            </Reveal>
          ))}
          <Reveal as='li' delay={0.05}>
            <article className='flex h-full flex-col gap-3 rounded-3xl border border-dashed border-line-strong p-6'>
              <div className='flex items-center justify-between gap-3'>
                <PixelItem name='trophy' size={48} />
                <span className='font-mono text-xs tracking-[0.06em] text-soft uppercase'>
                  {tr(education.when, lang)}
                </span>
              </div>
              <h3 className='text-xl font-semibold'>{tr(education.degree, lang)}</h3>
              <span className='text-soft'>{tr(education.school, lang)}</span>
            </article>
          </Reveal>
        </ol>
      </section>
    </>
  )
}

/** One role: icon, dates, title, what I did, the case studies, and the stack. */
function RoleCard({ role, lang }: { role: Role; lang: Lang }) {
  return (
    <article className='flex h-full flex-col gap-4 rounded-3xl border border-line bg-background/40 p-5 sm:p-6'>
      <div className='flex items-start justify-between gap-3'>
        <PixelItem name={role.icon} size={48} />
        <span className='font-mono text-xs tracking-[0.06em] text-soft uppercase'>
          {tr(role.when, lang)} · {duration(role.start, role.end)}
        </span>
      </div>
      <div className='flex flex-col gap-1'>
        <h3 className='text-xl leading-snug font-semibold tracking-[-0.015em]'>{tr(role.role, lang)}</h3>
        <span className='text-sm font-medium text-primary'>{tr(role.org, lang)}</span>
        <span className='text-sm text-muted-foreground'>{tr(role.kind, lang)}</span>
      </div>
      <p className='max-w-[72ch] leading-relaxed text-soft'>{tr(role.summary, lang)}</p>
      {role.highlights.length ? (
        <ul className='flex max-w-[72ch] flex-col gap-2.5 text-[15px] leading-relaxed'>
          {role.highlights.map((item, index) => (
            <li key={index} className='flex gap-2.5'>
              <span className='mt-[0.6em] size-1.5 shrink-0 bg-primary' aria-hidden='true' />
              {tr(item, lang)}
            </li>
          ))}
        </ul>
      ) : null}
      <div className='mt-auto flex flex-col gap-3 border-t border-line pt-4'>
        <div className='flex flex-wrap gap-2'>
          {role.projects.map(slug => {
            const project = getProject(slug)
            if (!project) return null
            return (
              <Link
                key={slug}
                href={`/work/${slug}`}
                className='inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary'>
                {project.title}
                <span aria-hidden='true'>↗</span>
              </Link>
            )
          })}
        </div>
        {role.stack.length ? <p className='font-mono text-xs text-muted-foreground'>{role.stack.join(' · ')}</p> : null}
      </div>
    </article>
  )
}
