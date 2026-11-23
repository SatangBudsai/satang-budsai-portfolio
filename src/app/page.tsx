import Image from 'next/image'
import { preload } from 'react-dom'
import Link from 'next/link'

import ActivityCard from '@/components/site/activity-card'
import CoverArt from '@/components/site/art'
import HeroSprite from '@/components/site/hero-sprite'
import { Reveal } from '@/components/site/motion'
import { itemIcon, PixelItem } from '@/components/site/pixel'
import ScrollRail from '@/components/site/scroll-rail'
import SectionNav from '@/components/site/section-nav'
import ThemeToggle from '@/components/site/theme-toggle'
import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import activity from '@/content/activity.json'
import { education, roles } from '@/content/experience'
import { keyResult, projectThumb, resumePdf, selectedProjects } from '@/content/resume'
import { allProjects } from '@/content/projects'
import { experiments, featureReleases, principles, profile, services, shipped, stackGroups } from '@/content/site'
import { tr } from '@/content/types'
import { briefHref } from '@/lib/brief'
import { duration } from '@/lib/duration'
import { homeJsonLd, jsonLdHtml } from '@/lib/seo'
import { getI18n } from '@/lib/lang'
import type { AppTranslate } from '@/tolgee/translate'

/**
 * The home page is the résumé: a fixed column with who I am and a table of
 * contents, and a reading column with About, Experience, Projects, Learning
 * and Skills. Layout pattern after brittanychiang.com.
 */
export default async function Home() {
  const { lang, t } = await getI18n()
  // The sprite sheet is the largest thing on first paint; fetch it with the HTML.
  preload('/pixel/hero-typing.webp', { as: 'image', fetchPriority: 'high' })
  const projects = selectedProjects()
  const sections = [
    { id: 'about', label: t('common.cv.about', 'About') },
    { id: 'experience', label: t('common.cv.experience', 'Experience') },
    { id: 'projects', label: t('common.cv.projects', 'Projects') },
    { id: 'learning', label: t('common.cv.learning', 'Learning') },
    { id: 'skills', label: t('common.cv.skills', 'Skills') }
  ]
  const workCount = allProjects.length + experiments.length
  const brief = briefHref(profile.email, t)

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: jsonLdHtml(homeJsonLd()) }} />
      <div className='container-page lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16 xl:gap-24'>
        {/* LEFT: who, what, where — stays in view on large screens */}
        <aside className='flex flex-col gap-7 pt-28 pb-12 sm:pt-32 lg:sticky lg:top-0 lg:h-svh lg:justify-between lg:gap-5 lg:pt-12 lg:pb-10'>
          <div className='flex flex-col gap-6 lg:gap-5'>
            <div className='flex items-center justify-between gap-3'>
              <div className='flex flex-wrap items-center gap-2'>
                {profile.availability ? (
                  <a
                    href='#contact'
                    className='inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[12px] tracking-[0.04em] text-primary uppercase hover:bg-primary/20'>
                    <span className='animate-pulse-dot size-1.5 rounded-full bg-primary' aria-hidden='true' />
                    {tr(profile.availability, lang)}
                  </a>
                ) : null}
              </div>
              <span className='hidden shrink-0 items-center gap-0.5 rounded-full border border-line p-0.5 lg:flex'>
                <ThemeToggle
                  compact
                  labels={{
                    dark: t('common.nav.theme-dark', 'Switch to dark mode'),
                    light: t('common.nav.theme-light', 'Switch to light mode')
                  }}
                />
              </span>
            </div>

            <div className='hero-card overflow-hidden rounded-3xl border border-line'>
              <div className='hero-stage px-5 pt-5 pb-7 sm:px-6'>
                <HeroSprite
                  sheet='/pixel/hero-typing.webp'
                  frames={6}
                  cellWidth={64}
                  cellHeight={72}
                  sectionLines={{
                    about: t('common.cv.say-about', 'hi, I’m Satang!'),
                    experience: t('common.cv.say-experience', 'where I’ve worked ↓'),
                    projects: t('common.cv.say-projects', 'my favourite part: projects'),
                    services: t('common.cv.say-services', 'got a project? let’s talk'),
                    learning: t('common.cv.say-learning', 'I learn by building things'),
                    skills: t('common.cv.say-skills', 'my everyday toolbox')
                  }}
                  alt={t('common.hero.sprite-alt', 'Pixel-art Satang typing on a laptop')}
                  lines={[
                    t('common.hero.bubble-1', 'hi, that’s me!'),
                    t('common.hero.bubble-2', 'move your mouse — I’ll look'),
                    t('common.hero.bubble-3', 'shipping Orca v0.12.1…'),
                    t('common.hero.bubble-4', 'git commit -m "fix it for real"'),
                    t('common.hero.bubble-5', 'coffee → code → coffee'),
                    t('common.hero.bubble-6', 'open for freelance & full-time')
                  ]}
                  labels={{
                    pause: t('common.cv.pause', 'Pause animation'),
                    play: t('common.cv.play', 'Play animation')
                  }}>
                  <div className='flex min-w-0 flex-col gap-2 pb-0.5'>
                    <h1
                      lang='en'
                      className='text-[clamp(40px,4vw,58px)] leading-[0.92] font-extrabold tracking-[-0.045em]'>
                      Satang <br />
                      Budsai
                    </h1>
                    <p className='text-base font-semibold text-primary sm:text-lg'>
                      {t('common.cv.role', 'Senior Software Engineer')}
                    </p>
                  </div>
                </HeroSprite>
              </div>

              <dl className='grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-1 border-t border-line px-5 py-4 text-[13px] sm:px-6 [@media(min-width:1024px)_and_(max-height:820px)]:hidden'>
                {[
                  ['at', t('common.cv.fact-at', 'Chanwanich · Senior Software Engineer')],
                  ['path', t('common.cv.fact-path', 'Intern → Full-stack developer → Senior')],
                  ['focus', t('common.cv.fact-focus', 'Government & enterprise systems')],
                  ['edu', t('common.cv.fact-edu', 'Chiang Mai University · first-class honours')],
                  ['loc', t('common.cv.fact-loc', 'Chiang Mai, Thailand · UTC+7')]
                ].map(([key, value]) => (
                  <div key={key} className='contents'>
                    <dt className='font-mono text-[12px] leading-6 text-primary/80'>{key}</dt>
                    <dd className='leading-6 text-soft'>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className='hidden flex-col lg:flex'>
              <SectionNav items={sections} label={t('common.cv.contents', 'Contents')} />
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2.5'>
            <a
              href={resumePdf}
              download
              className='inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-foreground transition-transform active:scale-95 sm:px-5'>
              <Icon icon={appIcons.download} className='size-[18px]' aria-hidden='true' />
              {t('common.cv.download', 'Résumé PDF')}
            </a>
            {[
              { href: `mailto:${profile.email}`, label: profile.email, icon: appIcons.mail, external: false },
              { href: profile.github, label: 'GitHub', icon: appIcons.github, external: true },
              { href: profile.linkedin, label: 'LinkedIn', icon: appIcons.linkedin, external: true }
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className='inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-soft transition-colors hover:border-primary hover:text-primary sm:size-11'>
                <Icon icon={link.icon} className='size-[18px]' aria-hidden='true' />
              </a>
            ))}
          </div>
        </aside>

        {/* RIGHT: the résumé itself */}
        <div className='flex flex-col gap-16 pb-24 lg:gap-24 lg:pt-12'>
          <Section id='about' index='01' title={sections[0].label}>
            <div className='flex flex-col gap-5 text-[17px] leading-[1.75] text-soft'>
              {['about-1', 'about-2', 'about-3'].map(key => (
                <p key={key}>
                  <Emphasis text={t(`common.cv.${key}`, ABOUT[key])} />
                </p>
              ))}
            </div>
            <div className='mt-10'>
              <ActivityCard
                lang={lang}
                days={activity.days}
                until={activity.until}
                repos={activity.repos}
                featureReleases={featureReleases}
                products={shipped}
                labels={activityLabels(t)}
              />
            </div>
          </Section>

          <Section id='experience' index='02' title={sections[1].label}>
            <ScrollRail>
              <ol className='group/list flex flex-col gap-2'>
                {roles.map(role => (
                  <li key={role.id}>
                    <Entry
                      when={`${tr(role.when, lang)}
${duration(role.start, role.end)}`}>
                      <div className='flex items-start gap-3'>
                        <PixelItem name={role.icon} size={32} className='mt-0.5' />
                        <div>
                          <h3 className='text-lg leading-snug font-semibold'>
                            {tr(role.role, lang)} <span className='text-primary'>· {tr(role.org, lang)}</span>
                          </h3>
                          <p className='text-sm text-muted-foreground'>{tr(role.kind, lang)}</p>
                        </div>
                      </div>
                      <p className='leading-relaxed text-soft'>{tr(role.summary, lang)}</p>
                      {role.highlights.length ? (
                        <Bullets
                          items={role.highlights.map(item => tr(item, lang))}
                          more={count => t('common.cv.more', '{count} more', { count })}
                        />
                      ) : null}
                      {role.projects.length ? (
                        <p className='flex flex-wrap gap-2'>
                          {role.projects.slice(0, 2).map(slug => {
                            const project = allProjects.find(item => item.slug === slug)
                            return project ? (
                              <Link
                                key={slug}
                                href={`/work/${slug}`}
                                className='inline-flex min-h-9 items-center gap-1 rounded-full border border-line-strong px-3 text-sm transition-colors hover:border-primary hover:text-primary'>
                                {project.title}
                                <span aria-hidden='true'>↗</span>
                              </Link>
                            ) : null
                          })}
                        </p>
                      ) : null}
                      <Chips items={role.stack} />
                    </Entry>
                  </li>
                ))}
                <li>
                  <Entry when={tr(education.when, lang)}>
                    <div className='flex items-start gap-3'>
                      <PixelItem name='trophy' size={32} className='mt-0.5' />
                      <div>
                        <h3 className='text-lg leading-snug font-semibold'>{tr(education.degree, lang)}</h3>
                        <p className='text-sm text-muted-foreground'>{tr(education.school, lang)}</p>
                      </div>
                    </div>
                  </Entry>
                </li>
              </ol>
            </ScrollRail>
            <Link href='/resume' className='group mt-8 inline-flex items-center gap-2 font-semibold'>
              <span className='link-draw pb-0.5'>{t('common.cv.full-resume', 'View the full résumé')}</span>
              <Icon
                icon={appIcons.arrowRight}
                className='size-4 transition-transform group-hover:translate-x-1'
                aria-hidden='true'
              />
            </Link>
          </Section>

          <Section id='projects' index='03' title={sections[2].label}>
            <ul className='group/list flex flex-col gap-2'>
              {projects.map(project => {
                const thumb = projectThumb(project)
                const result = keyResult(project)
                return (
                  <li key={project.slug}>
                    <Link
                      href={`/work/${project.slug}`}
                      className='group grid gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-line hover:bg-card/60 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] sm:grid-cols-[9.5rem_1fr] sm:gap-6 sm:p-5'>
                      <span className='relative block aspect-[16/10] overflow-hidden rounded-lg border border-line bg-[#0d0b13] sm:mt-1'>
                        {thumb?.kind === 'image' ? (
                          <Image
                            src={thumb.src}
                            alt=''
                            fill
                            sizes='(min-width: 640px) 160px, 90vw'
                            className='object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]'
                          />
                        ) : thumb?.kind === 'art' ? (
                          <CoverArt id={thumb.id} label='' fill className='pointer-events-none' />
                        ) : null}
                      </span>
                      <span className='flex flex-col gap-2'>
                        <span className='flex items-center gap-2'>
                          {itemIcon[project.slug] ? <PixelItem src={itemIcon[project.slug]} size={24} /> : null}
                          <span className='text-lg leading-snug font-semibold transition-colors group-hover:text-primary'>
                            {project.title}
                          </span>
                          <Icon
                            icon={appIcons.arrowUpRight}
                            className='size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary'
                            aria-hidden='true'
                          />
                        </span>
                        <span className='text-[13px] text-muted-foreground'>
                          {project.kind === 'product'
                            ? `${tr(project.category, lang)} · ${project.version}`
                            : tr(project.client, lang)}
                        </span>
                        <span className='leading-relaxed text-soft'>{tr(project.tagline, lang)}</span>
                        {result ? (
                          <span className='text-[15px] leading-relaxed'>
                            <span className='text-primary'>→ </span>
                            {tr(result, lang)}
                          </span>
                        ) : null}
                        <Chips items={project.stack.slice(0, 5)} />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link href='/work' className='group mt-8 inline-flex items-center gap-2 font-semibold'>
              <span className='link-draw pb-0.5'>
                {t('common.cv.all-projects', 'All {count} projects, with case studies', { count: workCount })}
              </span>
              <Icon
                icon={appIcons.arrowRight}
                className='size-4 transition-transform group-hover:translate-x-1'
                aria-hidden='true'
              />
            </Link>
          </Section>

          <Section id='learning' index='04' title={sections[3].label}>
            <p className='mb-6 text-[17px] leading-relaxed text-soft'>
              {t(
                'common.cv.learning-intro',
                'I learn by building. Two studies in domains I had never worked in — real-time multiplayer and a game engine — built by directing AI coding agents with written rules.'
              )}
            </p>
            <ul className='grid gap-3 sm:grid-cols-2'>
              {experiments.map(experiment => {
                const result = {
                  'zoo-together': t(
                    'common.cv.learn-zoo',
                    'A 4-player online zoo game — my first real-time multiplayer code, with the server in charge.'
                  ),
                  'age-of-lost-knowledge': t(
                    'common.cv.learn-rpg',
                    'An RPG built to test whether AI agents keep to design rules over hundreds of commits; 1,186 automated tests pass.'
                  )
                }[experiment.slug]
                return (
                  <li key={experiment.slug}>
                    <Link
                      href={`/learning#${experiment.slug}`}
                      className='group flex h-full flex-col gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-line-strong hover:bg-card/60'>
                      <span className='relative block aspect-[16/9] overflow-hidden rounded-lg border border-line'>
                        <Image
                          src={experiment.media[0].src}
                          alt=''
                          fill
                          sizes='(min-width: 640px) 320px, 90vw'
                          className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
                        />
                      </span>
                      <span className='font-semibold group-hover:text-primary'>{experiment.title}</span>
                      <span className='text-sm text-muted-foreground'>{tr(experiment.status, lang)}</span>
                      {result ? <span className='text-sm leading-relaxed text-soft'>{result}</span> : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Section>

          <Section id='skills' index='05' title={sections[4].label}>
            <dl className='grid gap-x-8 gap-y-5 sm:grid-cols-2'>
              {stackGroups.map(group => (
                <div key={tr(group.label, lang)} className='flex flex-col gap-2'>
                  <dt className='font-semibold'>{tr(group.label, lang)}</dt>
                  <dd>
                    <Chips items={group.items.split(' · ')} />
                  </dd>
                </div>
              ))}
              <div className='flex flex-col gap-2'>
                <dt className='font-semibold'>{t('common.resume.quality', 'Quality & tooling')}</dt>
                <dd>
                  <Chips items={['Playwright', 'k6', 'SonarQube', 'CI/CD', 'Claude Code', 'Codex']} />
                </dd>
              </div>
            </dl>
            <h3 className='mt-12 mb-4 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase'>
              {t('common.resume.how', 'How I work')}
            </h3>
            <ul className='grid gap-3 sm:grid-cols-2'>
              {principles.map(item => (
                <li key={tr(item.tag, lang)} className='rounded-2xl border border-line p-5'>
                  <p className='font-semibold'>{tr(item.tag, lang)}</p>
                  <p className='mt-1.5 text-[15px] leading-relaxed text-soft'>{tr(item.body, lang)}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id='services' title={t('common.cv.services', 'Work with me')}>
            <p className='mb-6 text-[17px] leading-relaxed text-soft'>
              {t(
                'common.cv.services-intro',
                'Outside my day job I take on a few projects at a time — small tools to complete systems, for businesses, universities and teams.'
              )}
            </p>
            <ul className='grid gap-3 sm:grid-cols-3'>
              {services.map((service, index) => (
                <li key={index} className='flex flex-col gap-3 rounded-2xl border border-line p-5'>
                  <PixelItem name={['laptop', 'scroll', 'wrench'][index] ?? 'gear'} size={32} />
                  <p className='font-semibold'>{tr(service.title, lang)}</p>
                  <p className='text-[15px] leading-relaxed text-soft'>{tr(service.body, lang)}</p>
                </li>
              ))}
            </ul>
            <ol className='mt-6 grid gap-3 sm:grid-cols-4'>
              {[
                t('common.cv.step-1', 'Send a brief'),
                t('common.cv.step-2', 'A short call'),
                t('common.cv.step-3', 'Fixed scope and quote'),
                t('common.cv.step-4', 'Progress demos as we go')
              ].map((step, index) => (
                <li key={step} className='flex items-center gap-3 text-[15px]'>
                  <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs text-primary'>
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href={brief}
              className='mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground transition-transform active:scale-95'>
              <Icon icon={appIcons.mail} className='size-[18px]' aria-hidden='true' />
              {t('common.cv.send-brief', 'Send a brief')}
            </a>
          </Section>
        </div>
      </div>
    </>
  )
}

const ABOUT: Record<string, string> = {
  'about-1':
    'I build government and enterprise systems end to end — the kind where identity checks, payments and long forms have to be **right the first time**.',
  'about-2':
    'At my day job I build government systems: an identity app that **reads NFC passports and matches faces**, plus the customs and payment services behind it. Outside working hours I take on **freelance projects** — journals, exam platforms, reading apps.',
  'about-3':
    'After hours I ship the **developer tools I use myself**, with AI coding agents under written rules — and I measure before I say anything got faster.'
}

/** Renders **bold** spans as bright text, so the key facts can be skimmed. */
function Emphasis({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
    part.startsWith('**') ? (
      <strong key={index} className='font-semibold text-foreground'>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  )
}

/** A résumé section with a heading that sticks on small screens while you read it. */
function Section({
  id,
  index,
  title,
  children
}: {
  id: string
  index?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className='scroll-mt-20 lg:scroll-mt-28'>
      <h2
        id={`${id}-title`}
        className='sticky top-[4.5rem] z-10 -mx-4 mb-6 flex items-center gap-4 bg-background/85 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none'>
        {index ? <span className='font-mono text-xs text-primary'>{index}</span> : null}
        <span className='text-[clamp(20px,1.8vw,26px)] font-semibold tracking-[-0.02em]'>{title}</span>
        <span className='section-rule h-px flex-1 bg-line-strong' aria-hidden='true' />
      </h2>
      <Reveal y={24}>{children}</Reveal>
    </section>
  )
}

/** One row: date on the left, content on the right; lights up on hover. */
function Entry({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <div className='grid gap-3 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-line hover:bg-card/60 sm:grid-cols-[9.5rem_1fr] sm:gap-6 sm:p-5'>
      <span className='font-mono text-xs leading-5 whitespace-pre-line text-muted-foreground sm:mt-1.5'>{when}</span>
      <div className='flex flex-col gap-3'>{children}</div>
    </div>
  )
}

/** The first three bullets, and the rest behind "N more" so long roles don't bury the page. */
function Bullets({ items, more }: { items: string[]; more: (count: number) => string }) {
  const row = (text: string, index: number) => (
    <li key={index} className='flex gap-2.5'>
      <span className='mt-[0.65em] size-1.5 shrink-0 bg-primary' aria-hidden='true' />
      {text}
    </li>
  )
  const rest = items.slice(3)
  return (
    <div className='flex flex-col gap-1.5 text-[15px] leading-relaxed'>
      <ul className='flex flex-col gap-1.5'>{items.slice(0, 3).map(row)}</ul>
      {rest.length ? (
        <details className='group/more'>
          <summary className='inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 text-sm text-primary hover:underline [&::-webkit-details-marker]:hidden'>
            <span className='transition-transform group-open/more:rotate-90' aria-hidden='true'>
              ›
            </span>
            {more(rest.length)}
          </summary>
          <ul className='mt-1.5 flex flex-col gap-1.5'>{rest.map((text, index) => row(text, index + 3))}</ul>
        </details>
      ) : null}
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className='flex flex-wrap gap-1.5'>
      {items.map(item => (
        <li key={item} className='rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[12px] text-primary'>
          {item}
        </li>
      ))}
    </ul>
  )
}

function activityLabels(t: AppTranslate) {
  return {
    period: t('common.activity.period', 'Last 12 months · all my repos'),
    commits: t('common.activity.commits', 'tools shipped'),
    activeDays: t('common.activity.active-days', 'days with commits'),
    repos: t('common.activity.repos', 'repositories'),
    releases: t('common.activity.releases', 'feature releases'),
    categories: {
      work: t('common.activity.work', 'Day job'),
      freelance: t('common.activity.freelance', 'Freelance'),
      own: t('common.activity.own', 'My products')
    },
    commitsUnit: t('common.activity.unit', 'commits'),
    hint: t('common.activity.hint', 'Hover a square to see that day'),
    hintTouch: t('common.activity.hint-touch', 'Tap a square to see that day'),
    month: t('common.activity.month', 'Month'),
    shipping: t('common.activity.shipping', 'Shipping'),
    footnote: t(
      'common.activity.footnote',
      '* Includes commits made by the AI coding agents I direct. Releases count each minor version once.'
    ),
    chart: t('common.activity.label', 'Commit activity over the last 12 months: day job, freelance and my own products')
  }
}
