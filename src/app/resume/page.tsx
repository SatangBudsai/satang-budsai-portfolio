import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import ExportResume from '@/components/site/export-resume'
import { education, roles, type Role } from '@/content/experience'
import { getProject } from '@/content/projects'
import { principles, profile, stackGroups } from '@/content/site'
import { tr, type Lang } from '@/content/types'
import en from '../../../langs/common/en.json'

/**
 * The résumé is English only, whatever language the rest of the site is in.
 * Same call shape as the site's `t`, but always reads the English strings.
 */
const lang = 'en' as const
function t(key: string, fallback: string) {
  return (en as Record<string, string>)[key.replace(/^common\./, '')] ?? fallback
}

export function generateMetadata(): Metadata {
  return {
    title: t('common.nav.resume', 'Resume'),
    description: t(
      'common.resume.meta',
      'Résumé of Satang Budsai, full-stack developer in Chiang Mai: experience, selected projects with results, skills and education.'
    )
  }
}

/** Projects shown on the résumé, strongest first. */
const SELECTED = [
  'eec-id',
  'eec-e-customs',
  'cmu-journal',
  'qorstack-report',
  'git-control-orca',
  'junior-bootcamp',
  'clipath',
  'scanhub'
]

/** Which of a project's results to quote — the most telling one, not always the first. */
const RESULT_INDEX: Record<string, number> = { 'eec-id': 1, 'eec-e-customs': 1, 'junior-bootcamp': 1, scanhub: 1 }

/** The public address, when one is configured. */
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '').replace(/\/$/, '')

export default function Resume() {
  const current = roles.filter(role => role.current)
  const past = roles.filter(role => !role.current)
  const projects = SELECTED.map(slug => getProject(slug)).filter(project => project !== undefined)

  const contacts = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: 'github.com/SatangBudsai', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: tr(profile.location, lang), href: undefined }
  ]

  return (
    <div lang='en' className='container-page pt-28 pb-24 sm:pt-32 print:p-0'>
      {/* Toolbar: only on screen */}
      <div className='mx-auto mb-6 flex max-w-[56rem] flex-wrap items-center justify-between gap-4 print:hidden'>
        <div className='flex flex-col gap-1'>
          <span className='eyebrow text-primary'>{t('common.resume.eyebrow', 'Résumé · ready to print')}</span>
          <span className='text-sm text-muted-foreground'>
            {t('common.resume.hint', 'Export opens the print dialog — choose “Save as PDF”.')}
          </span>
        </div>
        <ExportResume label={t('common.resume.export', 'Export PDF')} fileName='Satang-Budsai-Resume' />
      </div>

      <article className='resume-sheet mx-auto flex max-w-[56rem] flex-col gap-9 rounded-[1.75rem] border border-line bg-card/70 p-6 sm:p-10 print:max-w-none print:gap-6 print:rounded-none print:border-0 print:bg-transparent print:p-0'>
        {/* Header */}
        <header className='flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-center gap-5'>
            <Image
              src={profile.photo}
              alt={profile.name}
              width={96}
              height={120}
              className='h-[7.5rem] w-24 shrink-0 rounded-2xl border border-line object-cover print:h-[6.5rem] print:w-[5.2rem]'
            />
            <div className='flex flex-col gap-1.5'>
              <h1 className='text-[clamp(32px,4vw,44px)] leading-none font-extrabold tracking-[-0.035em] print:text-[30px]'>
                {profile.name}
              </h1>
              <p className='text-lg font-medium text-primary print:text-base'>
                {t('common.resume.title', 'Full-stack developer · .NET, Next.js, Flutter')}
              </p>
              {profile.availability ? (
                <p className='text-sm text-muted-foreground'>
                  {t('common.resume.open', 'Open to full-time roles and freelance projects')}
                </p>
              ) : null}
            </div>
          </div>
          <ul className='flex flex-col gap-1 text-sm sm:items-end sm:text-right print:text-[11px]'>
            {contacts.map(contact => (
              <li key={contact.label}>
                {contact.href ? (
                  <a href={contact.href} className='text-soft hover:text-primary'>
                    {contact.label}
                  </a>
                ) : (
                  <span className='text-soft'>{contact.label}</span>
                )}
              </li>
            ))}
            {SITE ? (
              <li className='hidden print:block'>
                <span className='text-soft'>{SITE}</span>
              </li>
            ) : null}
          </ul>
        </header>

        <Section title={t('common.resume.summary', 'Summary')}>
          <p className='leading-relaxed text-soft'>
            {t(
              'common.resume.summary-body',
              'Full-stack developer at Chanwanich since 2022 (intern, then full-time from April 2024), building government systems for Thailand’s Eastern Economic Corridor: identity verification on mobile with NFC and face match, customs workflows, payments and scheduled services. Alongside, I build university platforms as a freelancer and ship my own developer tools. I work across .NET, Next.js and Flutter, test end to end, and use AI coding agents with written rules.'
            )}
          </p>
        </Section>

        <Section title={t('common.resume.experience', 'Experience')}>
          <div className='flex flex-col gap-6 print:gap-4'>
            {[...current, ...past].map(role => (
              <RoleEntry key={role.id} role={role} lang={lang} now={t('common.exp2.now', 'Now')} />
            ))}
          </div>
        </Section>

        <Section title={t('common.resume.projects', 'Selected projects')}>
          <div className='grid gap-x-8 gap-y-5 sm:grid-cols-2 print:grid-cols-2 print:gap-y-3'>
            {projects.map(project => (
              <div key={project.slug} className='resume-entry flex flex-col gap-1'>
                <div className='flex flex-wrap items-baseline justify-between gap-x-3'>
                  <Link href={`/work/${project.slug}`} className='font-semibold hover:text-primary'>
                    {project.title}
                  </Link>
                  <span className='font-mono text-[11px] text-muted-foreground uppercase'>
                    {project.kind === 'product'
                      ? `${t('common.resume.own', 'Own product')} · ${project.version}`
                      : tr(project.client, lang)}
                  </span>
                </div>
                <p className='text-sm leading-relaxed text-soft'>{tr(project.tagline, lang)}</p>
                {project.results?.[RESULT_INDEX[project.slug] ?? 0] ? (
                  <p className='text-sm leading-relaxed'>
                    <span className='text-primary'>→ </span>
                    {tr(project.results[RESULT_INDEX[project.slug] ?? 0], lang)}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          {SITE ? (
            <p className='mt-4 text-sm text-muted-foreground'>
              {t('common.resume.more', 'Case studies with screens, results and the problems I solved:')}{' '}
              <span className='text-primary'>{SITE}/work</span>
            </p>
          ) : null}
        </Section>

        <div className='grid gap-9 sm:grid-cols-2 print:grid-cols-2 print:gap-6'>
          <Section title={t('common.resume.skills', 'Skills')}>
            <dl className='flex flex-col gap-3 text-sm'>
              {stackGroups.map(group => (
                <div key={tr(group.label, lang)} className='resume-entry'>
                  <dt className='font-semibold'>{tr(group.label, lang)}</dt>
                  <dd className='text-soft'>{group.items}</dd>
                </div>
              ))}
              <div className='resume-entry'>
                <dt className='font-semibold'>{t('common.resume.quality', 'Quality & tooling')}</dt>
                <dd className='text-soft'>Playwright · k6 · SonarQube · CI/CD · Claude Code · Codex</dd>
              </div>
            </dl>
          </Section>
          <Section title={t('common.resume.how', 'How I work')}>
            <ul className='flex flex-col gap-2.5 text-sm'>
              {principles.map(item => (
                <li key={tr(item.tag, lang)} className='resume-entry'>
                  <span className='font-semibold'>{tr(item.tag, lang)}</span>{' '}
                  <span className='text-soft'>— {tr(item.body, lang)}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <Section title={t('common.resume.education', 'Education')}>
          <div className='resume-entry grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6 print:grid-cols-[7.5rem_1fr]'>
            <span className='font-mono text-xs text-muted-foreground uppercase'>{tr(education.when, lang)}</span>
            <div>
              <p className='font-semibold'>{tr(education.degree, lang)}</p>
              <p className='text-sm text-soft'>{tr(education.school, lang)}</p>
            </div>
          </div>
        </Section>
      </article>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='flex flex-col gap-4 print:gap-2.5'>
      <h2 className='flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-primary uppercase'>
        {title}
        <span className='h-px flex-1 bg-line' aria-hidden='true' />
      </h2>
      {children}
    </section>
  )
}

function RoleEntry({ role, lang, now }: { role: Role; lang: Lang; now: string }) {
  return (
    <div className='resume-entry grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6 print:grid-cols-[7.5rem_1fr]'>
      <div className='flex flex-col gap-1'>
        <span className='font-mono text-xs text-muted-foreground uppercase'>{tr(role.when, lang)}</span>
        {role.current ? (
          <span className='w-fit rounded-full border border-primary/50 px-2 py-0.5 font-mono text-[10px] text-primary uppercase'>
            {now}
          </span>
        ) : null}
      </div>
      <div className='flex flex-col gap-2'>
        <div>
          <h3 className='font-semibold'>
            {tr(role.role, lang)} <span className='text-primary'>· {role.org}</span>
          </h3>
          <p className='text-sm text-muted-foreground'>{tr(role.kind, lang)}</p>
        </div>
        <p className='text-sm leading-relaxed text-soft'>{tr(role.summary, lang)}</p>
        {role.highlights.length ? (
          <ul className='flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed marker:text-primary'>
            {role.highlights.map((item, index) => (
              <li key={index}>{tr(item, lang)}</li>
            ))}
          </ul>
        ) : null}
        {role.stack.length ? (
          <p className='font-mono text-[11px] text-muted-foreground'>{role.stack.join(' · ')}</p>
        ) : null}
      </div>
    </div>
  )
}
