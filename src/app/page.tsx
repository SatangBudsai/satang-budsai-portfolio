import Link from 'next/link'

import ActivityCard from '@/components/site/activity-card'
import HeroSprite from '@/components/site/hero-sprite'
import { PixelItem } from '@/components/site/pixel'
import { LocalTime, Reveal } from '@/components/site/motion'
import { Doodle, Marked, PlayfulName } from '@/components/site/playful'
import WorkGrid from '@/components/site/work-grid'
import { buildWorkItems } from '@/components/site/work-items'
import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import activity from '@/content/activity.json'
import { featureReleases, profile, services, shipped } from '@/content/site'
import { tr } from '@/content/types'
import { getI18n } from '@/lib/lang'

export default async function Home() {
  const { lang, t } = await getI18n()
  const activeDays = Object.keys(activity.days).length
  const allWork = buildWorkItems(lang, t).length
  const featuredKeys = new Set(buildWorkItems(lang, t, { featured: true }).map(item => item.key))

  return (
    <>
      {/* HERO: a person, honest numbers, and the proof next to them */}
      <section className='container-page grid items-center gap-x-12 gap-y-10 pt-24 pb-14 sm:pt-28 lg:min-h-[min(100svh,860px)] lg:grid-cols-[0.95fr_1.05fr] lg:pb-10'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase'>
            <span>
              {tr(profile.location, lang)} · <LocalTime timeZone={profile.timeZone} />
            </span>
            {profile.availability ? (
              <a href='#contact' className='inline-flex items-center gap-2 text-primary hover:underline'>
                <span className='animate-pulse-dot size-2 rounded-full bg-primary' aria-hidden='true' />
                {tr(profile.availability, lang)}
              </a>
            ) : null}
          </div>
          <div className='mt-14 flex items-end gap-4 sm:gap-6'>
            <HeroSprite
              sheet='/pixel/hero-typing.png'
              frames={6}
              cell={96}
              alt={t('common.hero.sprite-alt', 'Pixel-art Satang typing on a laptop')}
              lines={[
                t('common.hero.bubble-1', 'hi, that’s me!'),
                t('common.hero.bubble-2', 'move your mouse — I’ll look'),
                t('common.hero.bubble-3', 'shipping Orca v0.12.1…'),
                t('common.hero.bubble-4', 'git commit -m "fix it for real"'),
                t('common.hero.bubble-5', 'coffee → code → coffee'),
                t('common.hero.bubble-6', 'open for freelance & full-time')
              ]}
              className='-ml-2'
            />
            <h1 className='display pb-3 text-[clamp(44px,5vw,80px)] leading-[0.92]'>
              <PlayfulName lines={['Satang', 'Budsai']} />
            </h1>
          </div>

          <Reveal delay={0.4} y={14}>
            <p className='max-w-[34rem] text-[clamp(17px,1.35vw,20px)] leading-[1.6] text-soft'>
              {t('common.hero.day', 'By day I build government systems at Chanwanich.')}{' '}
              {t(
                'common.hero.side',
                'On the side I freelance for universities and businesses, and after hours I ship my own tools.'
              )}{' '}
              {t('common.hero.year', 'The last 12 months:')}{' '}
              <Marked>{t('common.hero.num-days', '{count} days of commits', { count: activeDays })}</Marked>{' '}
              {t('common.hero.across', 'across')}{' '}
              <Marked>{t('common.hero.num-repos', '{count} repos', { count: activity.repos })}</Marked>.
            </p>
          </Reveal>

          <Reveal delay={0.5} y={12} className='flex flex-wrap items-center gap-3'>
            <a
              href='#contact'
              className='inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-transform active:scale-95 sm:flex-none'>
              {t('common.hero.cta-client', 'Start a project')}
            </a>
            <Link
              href='/experience'
              className='order-last inline-flex min-h-12 w-full items-center justify-center rounded-full border border-line-strong px-6 transition-colors hover:border-foreground sm:order-none sm:w-auto'>
              {t('common.hero.cta-hire', 'Hiring? See my experience')}
            </Link>
            <a
              href={profile.github}
              target='_blank'
              rel='noreferrer'
              aria-label='GitHub'
              className='inline-flex size-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-foreground'>
              <Icon icon={appIcons.github} className='size-5' aria-hidden='true' />
            </a>
            <a
              href={profile.linkedin}
              target='_blank'
              rel='noreferrer'
              aria-label='LinkedIn'
              className='inline-flex size-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-foreground'>
              <Icon icon={appIcons.linkedin} className='size-5' aria-hidden='true' />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={24} className='relative'>
          <Doodle flip className='absolute -top-12 right-2 hidden sm:inline-flex'>
            {t('common.hero.chart-note', 'every square is a real day of commits')}
          </Doodle>
          <ActivityCard
            lang={lang}
            days={activity.days}
            until={activity.until}
            repos={activity.repos}
            featureReleases={featureReleases}
            products={shipped}
            labels={{
              period: t('common.activity.period', 'Last 12 months · all my repos'),
              commits: t('common.activity.commits', 'commits'),
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
              chart: t(
                'common.activity.label',
                'Commit activity over the last 12 months: day job, freelance and my own products'
              )
            }}
          />
        </Reveal>
      </section>

      {/* SELECTED WORK: six pieces, the rest one click away */}
      <section id='work' className='container-page scroll-mt-24 pb-24'>
        <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
          <h2 className='display flex items-center gap-3 text-[clamp(32px,4vw,56px)]'>
            <PixelItem name='chest' size={48} className='pixel-bob' />
            {t('common.home.work-before', 'Selected')}{' '}
            <span className='accent-serif'>{t('common.home.work-accent', 'work')}</span>
          </h2>
          <Link href='/work' className='link-draw inline-flex items-center gap-2 pb-0.5 text-sm text-soft'>
            {t('common.home.all-work', 'All {count} projects', { count: allWork })}
            <Icon icon={appIcons.arrowRight} className='size-4' aria-hidden='true' />
          </Link>
        </div>
        <WorkGrid
          lang={lang}
          items={buildWorkItems(lang, t, { featured: true })}
          more={{
            href: '/work',
            count: allWork,
            previews: buildWorkItems(lang, t)
              .filter(item => !featuredKeys.has(item.key) && item.visual.kind === 'image')
              .slice(0, 4)
              .map(item => (item.visual.kind === 'image' ? { src: item.visual.src, alt: item.title } : null))
              .filter((preview): preview is { src: string; alt: string } => preview !== null),
            title: t('common.home.more-title', 'See all projects'),
            line: t(
              'common.home.more-line',
              'Products, client systems for government and universities, and AI experiments — filterable.'
            )
          }}
        />
      </section>

      {/* HOW I CAN HELP: for clients and teams hiring */}
      <section id='services' className='container-page scroll-mt-24 pb-28'>
        <div className='grid gap-4 rounded-[2rem] border border-line bg-card/50 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10'>
          <Reveal className='flex flex-col justify-between gap-6'>
            <div className='flex flex-col gap-3'>
              <span className='eyebrow text-primary'>{t('common.home.help-eyebrow', 'How I can help')}</span>
              <h2 className='text-[clamp(26px,2.6vw,38px)] leading-[1.15] font-semibold tracking-[-0.02em]'>
                {t('common.home.help-title', 'Hiring, or have a project? Here’s what I’m good at.')}
              </h2>
            </div>
            <div className='flex flex-wrap gap-3'>
              <a
                href='#contact'
                className='inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-transform active:scale-95'>
                {t('common.nav.talk', 'Let’s talk')}
              </a>
              <Link
                href='/about'
                className='inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 transition-colors hover:border-foreground'>
                {t('common.home.more-about', 'More about me')}
              </Link>
            </div>
          </Reveal>
          <ul className='grid gap-3 sm:grid-cols-3 lg:grid-cols-1'>
            {services.map((service, index) => (
              <Reveal
                as='li'
                key={index}
                delay={index * 0.05}
                className='flex gap-4 rounded-2xl border border-line p-5 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong'>
                <PixelItem name={['laptop', 'scroll', 'wrench'][index] ?? 'gear'} size={32} />
                <span className='flex flex-col gap-1'>
                  <span className='font-semibold'>{tr(service.title, lang)}</span>
                  <span className='text-sm leading-relaxed text-muted-foreground'>{tr(service.body, lang)}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
