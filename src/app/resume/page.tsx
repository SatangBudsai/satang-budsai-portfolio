import type { Metadata } from 'next'
import Image from 'next/image'

import ExportResume from '@/components/site/export-resume'
import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { education, roles, type Role } from '@/content/experience'
import { resumePdf } from '@/content/resume'
import { profile, stackGroups } from '@/content/site'
import { tr } from '@/content/types'
import { duration } from '@/lib/duration'

import en from '../../../langs/common/en.json'

/**
 * The résumé is English only, whatever language the rest of the site is in.
 * Same call shape as the site's `t`, but always reads the English strings.
 */
const lang = 'en' as const
function t(key: string, fallback: string) {
  return (en as Record<string, string>)[key.replace(/^common\./, '')] ?? fallback
}

/** The public address, when one is configured. */
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '').replace(/\/$/, '')

export function generateMetadata(): Metadata {
  return {
    title: t('common.nav.resume', 'Resume'),
    alternates: { canonical: '/resume' },
    description: t(
      'common.resume.meta',
      'Résumé of Satang Budsai, full-stack developer in Chiang Mai: experience, selected projects with results, skills and education.'
    )
  }
}

export default function Resume() {
  const contacts = [
    { icon: appIcons.mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: appIcons.github, label: 'github.com/SatangBudsai', href: profile.github },
    {
      icon: appIcons.linkedin,
      label: profile.linkedin.replace(/^https:\/\/(www\.)?linkedin\.com\//, 'linkedin: '),
      href: profile.linkedin
    },
    ...(SITE ? [{ icon: appIcons.globe, label: SITE, href: `https://${SITE}` }] : []),
    { icon: appIcons.mapPin, label: tr(profile.location, lang), href: undefined }
  ]

  return (
    <div lang='en' className='container-page pt-28 pb-24 sm:pt-32 print:p-0'>
      {/* Toolbar: only on screen */}
      <div className='mx-auto mb-6 flex max-w-[60rem] flex-wrap items-center justify-between gap-4 print:hidden'>
        <div className='flex flex-col gap-1'>
          <span className='eyebrow text-primary'>{t('common.resume.eyebrow', 'Résumé · ready to print')}</span>
          <span className='text-sm text-muted-foreground'>
            {t('common.resume.hint2', 'A4, one page. Download the PDF, or print this page.')}{' '}
            <a href='/resume.txt' className='text-primary underline-offset-4 hover:underline'>
              {t('common.resume.plain', 'Plain text')}
            </a>
          </span>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <a
            href={resumePdf}
            download
            className='inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-transform active:scale-95'>
            <Icon icon={appIcons.download} className='size-5' aria-hidden='true' />
            {t('common.resume.download', 'Download PDF')}
          </a>
          <ExportResume label={t('common.resume.print', 'Print')} fileName='Satang-Budsai-Resume' />
          <a
            href='/Satang-Budsai-Resume-no-photo.pdf'
            download
            className='text-sm text-primary underline-offset-4 hover:underline'>
            PDF without photo
          </a>
        </div>
      </div>

      <article className='resume-sheet mx-auto max-w-[60rem] overflow-hidden rounded-[1.75rem] border border-line bg-card/70 print:max-w-none print:overflow-visible print:rounded-none print:border-0 print:bg-transparent'>
        {/* Header band */}
        <header className='flex flex-col gap-6 border-b-[3px] border-primary p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9 print:flex-row print:items-center print:justify-between print:px-0 print:pt-0 print:pb-5'>
          <div className='flex items-center gap-5'>
            <Image
              src={profile.photo}
              alt={profile.name}
              width={96}
              height={120}
              className='resume-photo h-28 w-[5.6rem] shrink-0 rounded-xl object-cover print:h-[5.4rem] print:w-[4.3rem]'
            />
            <div className='flex flex-col gap-1.5'>
              <h1 className='text-[clamp(32px,4vw,46px)] leading-none font-extrabold tracking-[-0.04em] print:text-[30px]'>
                {profile.name}
              </h1>
              <p className='text-lg font-semibold text-primary print:text-[14px]'>
                {t('common.resume.title', 'Senior Software Engineer · Full-stack: .NET, Next.js, Flutter')}
              </p>
              <p className='text-sm text-muted-foreground print:text-[11px]'>
                {t('common.resume.open', '2.5+ years full-time · open to full-time roles and freelance projects')}
              </p>
            </div>
          </div>
          <ul className='flex flex-col gap-1.5 text-sm print:gap-1 print:text-[10.5px]'>
            {contacts.map(contact => (
              <li key={contact.label} className='flex items-center gap-2'>
                <Icon icon={contact.icon} className='size-3.5 shrink-0 text-primary' aria-hidden='true' />
                {contact.href ? (
                  <a href={contact.href} className='text-soft hover:text-primary'>
                    {contact.label}
                  </a>
                ) : (
                  <span className='text-soft'>{contact.label}</span>
                )}
              </li>
            ))}
          </ul>
        </header>

        <div className='grid gap-10 p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_15rem] print:grid-cols-[minmax(0,1fr)_12.5rem] print:gap-8 print:px-0 print:pt-5 print:pb-0'>
          {/* Main column */}
          <div className='flex flex-col gap-8 print:gap-5'>
            <Section title={t('common.resume.summary', 'Summary')}>
              <p className='text-[15px] leading-relaxed text-soft print:text-[11px] print:leading-snug'>
                {t(
                  'common.resume.summary-body',
                  'Senior Software Engineer at Chanwanich Company Limited, a Thai software house building government systems for the Eastern Economic Corridor. Full-stack in .NET, Next.js and Flutter: I bootstrapped five e-Customs microservices, wrote most of its payment service and set the locking and AI-agent patterns my team of about ten now follows; before that I built the EEC ID identity app (97% of commits). Outside working hours: freelance systems and open-source developer tools.'
                )}
              </p>
            </Section>

            <Section title={t('common.resume.experience', 'Experience')}>
              <div className='flex flex-col gap-6 print:gap-3'>
                {roles
                  .filter(role => !role.side && role.id !== 'intern')
                  .map(role => (
                    <RoleEntry key={role.id} role={role} />
                  ))}
                <p className='-mb-2 text-xs font-semibold tracking-[0.04em] text-muted-foreground uppercase print:text-[9.5px]'>
                  {t('common.resume.side', 'Outside working hours')}
                </p>
                {roles
                  .filter(role => role.side)
                  .map(role => (
                    <RoleEntry key={role.id} role={role} />
                  ))}
                {roles
                  .filter(role => role.id === 'intern')
                  .map(role => (
                    <RoleEntry key={role.id} role={role} />
                  ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <aside className='flex flex-col gap-8 print:gap-5'>
            <Section title={t('common.resume.skills', 'Skills')}>
              <dl className='flex flex-col gap-3'>
                {stackGroups.map(group => (
                  <div key={tr(group.label, lang)} className='resume-entry flex flex-col gap-1.5'>
                    <dt className='text-sm font-semibold print:text-[10.5px]'>{tr(group.label, lang)}</dt>
                    <dd>
                      <Chips items={group.items.split(' · ')} />
                    </dd>
                  </div>
                ))}
                <div className='resume-entry flex flex-col gap-1.5'>
                  <dt className='text-sm font-semibold print:text-[10.5px]'>
                    {t('common.resume.quality', 'Quality & tooling')}
                  </dt>
                  <dd>
                    <Chips items={['Playwright', 'k6', 'SonarQube', 'OpenAPI']} />
                  </dd>
                </div>
              </dl>
            </Section>

            <Section title={t('common.resume.education', 'Education')}>
              <div className='resume-entry flex flex-col gap-0.5 text-sm print:text-[10.5px]'>
                <p className='font-semibold'>{tr(education.degree, lang)}</p>
                <p className='text-soft'>{tr(education.school, lang)}</p>
                <p className='text-muted-foreground'>{tr(education.when, lang)}</p>
              </div>
            </Section>

            <Section title={t('common.resume.availability', 'Availability')}>
              <ul className='flex flex-col gap-1.5 text-sm print:text-[10.5px]'>
                <li>{t('common.resume.avail-1', 'Open to full-time roles and freelance projects')}</li>
                <li className='text-soft'>{t('common.resume.avail-2', 'Chiang Mai, Thailand · UTC+7')}</li>
                <li className='text-soft'>
                  {t('common.resume.avail-3', 'Freelance and open source are done outside working hours')}
                </li>
              </ul>
            </Section>
          </aside>
        </div>
      </article>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='flex flex-col gap-3 print:gap-2'>
      <h2 className='flex items-center gap-3 text-xs font-bold tracking-[0.14em] text-primary uppercase print:text-[10px] print:tracking-[0.04em]'>
        {title}
        <span className='h-px flex-1 bg-line' aria-hidden='true' />
      </h2>
      {children}
    </section>
  )
}

function RoleEntry({ role }: { role: Role }) {
  return (
    <div className={`resume-entry flex flex-col gap-1.5 ${role.side ? 'resume-side' : ''}`}>
      <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
        <h3 className='font-semibold print:text-[12px]'>
          {tr(role.role, lang)} <span className='text-primary'>· {tr(role.org, lang)}</span>
        </h3>
        <span className='flex items-center gap-2 text-sm text-muted-foreground tabular-nums print:text-[10.5px]'>
          {tr(role.when, lang).replace(' — now', ' – Present').replace(' — ', ' – ')} · {duration(role.start, role.end)}
        </span>
      </div>
      <p className='text-sm text-muted-foreground print:text-[10.5px]'>{tr(role.kind, lang)}</p>
      <p className='resume-summary text-sm leading-relaxed text-soft print:text-[10.5px] print:leading-snug'>
        {tr(role.summary, lang)}
      </p>
      {role.highlights.length ? (
        <ul className='flex list-disc flex-col gap-0.5 pl-4 text-sm leading-relaxed marker:text-primary print:text-[10.5px] print:leading-snug'>
          {role.highlights.map((item, index) => (
            <li key={index}>{tr(item, lang)}</li>
          ))}
        </ul>
      ) : null}
      {role.stack.length ? (
        <div className='print:hidden'>
          <Chips items={role.stack} />
        </div>
      ) : null}
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className='flex flex-wrap gap-1'>
      {items.map(item => (
        <li
          key={item}
          className='rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary print:bg-[#efe9fd] print:text-[9px] print:text-[#5b2fd0]'>
          {item}
        </li>
      ))}
    </ul>
  )
}
