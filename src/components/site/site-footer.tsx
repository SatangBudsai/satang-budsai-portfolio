import { Icon } from '@/components/ui/icon'
import { appIcons } from '@/config/icons'
import { profile } from '@/content/site'
import { getI18n } from '@/lib/lang'

import CopyEmail from './copy-email'
import { Magnetic, Reveal } from './motion'
import { RotatingWord } from './playful'

export default async function SiteFooter() {
  const { t } = await getI18n()
  const year = new Date().getFullYear()

  return (
    <footer id='contact' className='relative border-t border-line'>
      <div className='container-page flex flex-col gap-16 pt-24 pb-10 sm:pt-28'>
        <div className='grid gap-3 md:grid-cols-2'>
          <Reveal className='flex flex-col gap-3 rounded-[1.75rem] border border-line bg-card/50 p-6 sm:p-8'>
            <span className='eyebrow text-primary'>{t('common.footer.clients-eyebrow', 'For clients')}</span>
            <p className='text-xl leading-snug font-semibold tracking-tight'>
              {t('common.footer.clients-title', 'Have a system, a report or a tool in mind?')}
            </p>
            <p className='leading-relaxed text-soft'>
              {t(
                'common.footer.clients-body',
                'Send a short brief — what it should do, who will use it, and when you need it — and I’ll come back with questions and a plan.'
              )}
            </p>
          </Reveal>
          <Reveal
            delay={0.05}
            className='flex flex-col gap-3 rounded-[1.75rem] border border-line bg-card/50 p-6 sm:p-8'>
            <span className='eyebrow text-primary'>{t('common.footer.teams-eyebrow', 'For teams hiring')}</span>
            <p className='text-xl leading-snug font-semibold tracking-tight'>
              {t('common.footer.teams-title', 'Full-stack: .NET, Next.js, Flutter, PostgreSQL.')}
            </p>
            <p className='leading-relaxed text-soft'>
              {t(
                'common.footer.teams-body',
                'Government systems by day, products after hours. Email me for my résumé and references.'
              )}
            </p>
          </Reveal>
        </div>
        <Reveal className='flex flex-col gap-8'>
          <span className='eyebrow'>{t('common.footer.eyebrow', 'Have a project or a role?')}</span>
          <a
            href={`mailto:${profile.email}`}
            className='group display block text-[clamp(44px,7vw,112px)] leading-[0.95]'>
            {t('common.footer.title', 'Let’s build')}
            <br />
            <RotatingWord
              className='accent-serif text-primary transition-colors group-hover:text-foreground'
              words={t('common.footer.words', 'a back office.|a report engine.|your next tool.|something.').split('|')}
            />
          </a>
          <div className='flex flex-wrap items-center gap-3'>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className='inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground'>
                <Icon icon={appIcons.mail} className='size-4' aria-hidden='true' />
                {t('common.footer.email', 'Email me')}
              </a>
            </Magnetic>
            <CopyEmail
              email={profile.email}
              label={profile.email}
              copiedLabel={t('common.footer.copied', 'Copied to clipboard')}
            />
            {profile.resumeHref ? (
              <a
                href={profile.resumeHref}
                download
                className='inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm transition-colors hover:border-foreground'>
                <Icon icon={appIcons.download} className='size-4' aria-hidden='true' />
                {t('common.footer.resume', 'Download resume')}
              </a>
            ) : null}
          </div>
        </Reveal>

        <div className='flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8 text-sm text-muted-foreground'>
          <div className='flex flex-wrap gap-6'>
            <a
              href={profile.github}
              target='_blank'
              rel='noreferrer'
              className='link-draw inline-flex items-center gap-2 hover:text-foreground'>
              <Icon icon={appIcons.github} className='size-4' aria-hidden='true' />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target='_blank'
              rel='noreferrer'
              className='link-draw inline-flex items-center gap-2 hover:text-foreground'>
              <Icon icon={appIcons.linkedin} className='size-4' aria-hidden='true' />
              LinkedIn
            </a>
          </div>
          <span>
            © {year} {profile.name} · {t('common.footer.place', 'Chiang Mai')}
          </span>
        </div>
      </div>
    </footer>
  )
}
