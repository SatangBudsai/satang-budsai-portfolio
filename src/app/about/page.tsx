import type { Metadata } from 'next'

import ProfilePhoto from '@/components/site/profile-photo'
import CopyEmail from '@/components/site/copy-email'
import { Reveal } from '@/components/site/motion'
import { principles, profile, stackGroups, timeline } from '@/content/site'
import { tr } from '@/content/types'
import { getI18n } from '@/lib/lang'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return { title: t('common.nav.about', 'About') }
}

const H2 = 'display mb-8 text-[clamp(30px,3.4vw,48px)]'

export default async function About() {
  const { lang, t } = await getI18n()

  return (
    <>
      <header className='container-page grid items-center gap-10 pt-32 pb-20 sm:pt-40 lg:grid-cols-[auto_1fr] lg:gap-14'>
        <Reveal>
          <ProfilePhoto
            src={profile.photo}
            alt={profile.name}
            caption={t('common.hero.photo-caption', 'hi, that’s me!')}
            className='w-48 sm:w-56'
            priority
          />
        </Reveal>
        <div className='flex flex-col gap-6'>
          <Reveal delay={0.05}>
            <span className='eyebrow text-primary'>
              {profile.name} · {tr(profile.location, lang)}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className='display text-[clamp(40px,5.2vw,80px)] leading-[0.98]'>
              {t('common.about.title-before', 'I like turning')}{' '}
              <span className='accent-serif text-primary'>{t('common.about.title-accent', 'messy problems')}</span>{' '}
              {t('common.about.title-after', 'into tools.')}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className='max-w-3xl text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-soft'>
              {t(
                'common.about.intro',
                'Full-stack developer at Chanwanich (intern from 2022, full-time since 2024), based in Chiang Mai. I work across .NET services, Next.js front ends and mobile — and in my own time I ship products under the qorstack name.'
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <CopyEmail
              email={profile.email}
              label={profile.email}
              copiedLabel={t('common.footer.copied', 'Copied to clipboard')}
            />
          </Reveal>
        </div>
      </header>

      <section className='container-page pb-20'>
        <h2 className={H2}>{t('common.about.path', 'Path')}</h2>
        <ol className='grid gap-3 md:grid-cols-2'>
          {timeline.map((item, index) => (
            <Reveal
              as='li'
              key={index}
              delay={(index % 2) * 0.05}
              className='flex flex-col gap-2 rounded-2xl border border-line bg-card/50 p-6'>
              <span className='font-mono text-xs text-primary'>{tr(item.when, lang)}</span>
              <span className='text-xl font-semibold tracking-tight'>{tr(item.title, lang)}</span>
              <span className='leading-relaxed text-soft'>{tr(item.body, lang)}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className='container-page pb-20'>
        <h2 className={H2}>
          {t('common.about.how-before', 'How I')}{' '}
          <span className='accent-serif'>{t('common.about.how-accent', 'work')}</span>
        </h2>
        <ul className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          {principles.map((item, index) => (
            <Reveal
              as='li'
              key={index}
              delay={index * 0.05}
              className='flex flex-col gap-3 rounded-2xl border border-line p-6'>
              <span className='eyebrow text-primary'>{tr(item.tag, lang)}</span>
              <p className='leading-relaxed text-soft'>{tr(item.body, lang)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className='container-page pb-28'>
        <h2 className={H2}>{t('common.about.stack', 'Stack')}</h2>
        <dl className='grid gap-3 md:grid-cols-3'>
          {stackGroups.map(group => (
            <div key={group.items} className='flex flex-col gap-3 rounded-2xl border border-line p-6'>
              <dt className='eyebrow'>{tr(group.label, lang)}</dt>
              <dd className='flex flex-wrap gap-2'>
                {group.items.split(' · ').map(item => (
                  <span key={item} className='pill text-soft'>
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
