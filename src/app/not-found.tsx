import Link from 'next/link'

import { Doodle } from '@/components/site/doodle'
import { PixelItem } from '@/components/site/pixel'
import { getI18n } from '@/lib/lang'

export default async function NotFound() {
  const { t } = await getI18n()
  return (
    <section className='container-page flex min-h-[80svh] flex-col justify-center gap-8 pt-32 pb-20'>
      <span className='eyebrow flex items-center gap-3 text-primary'>
        <PixelItem name='map' size={48} className='pixel-bob' />
        404 · {t('common.notfound.lost', 'off the map')}
      </span>
      <h1 className='display text-[clamp(56px,10vw,168px)]'>
        {t('common.notfound.title-before', 'Nothing')}{' '}
        <span className='accent-serif'>{t('common.notfound.title-accent', 'here.')}</span>
      </h1>
      <Doodle className='ml-[4%]'>{t('common.note.notfound', 'consolation prize: type “ship”')}</Doodle>
      <p className='max-w-xl text-lg text-soft'>{t('common.notfound.body', 'The page moved or never existed.')}</p>
      <div className='flex flex-wrap items-center gap-3'>
        <Link
          href='/work'
          className='inline-flex min-h-12 w-fit items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground'>
          {t('common.notfound.work', 'See all work')}
        </Link>
        <Link
          href='/'
          className='inline-flex min-h-12 w-fit items-center rounded-full border border-line-strong px-6 transition-colors hover:border-foreground'>
          {t('common.notfound.home', 'Back home')}
        </Link>
      </div>
    </section>
  )
}
