'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/use-lang'
import { setLocale } from '@/i18n/actions'

const SwitchLanguage = () => {
  const { lang } = useLang()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const nextLanguage = lang === 'th' ? 'en' : 'th'

  return (
    <div className='relative flex'>
      <Button
        size='icon'
        variant='ghost'
        disabled={isPending}
        aria-label={nextLanguage === 'en' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        onClick={() =>
          startTransition(async () => {
            await setLocale(nextLanguage)
            router.refresh()
          })
        }>
        {nextLanguage.toUpperCase()}
      </Button>
    </div>
  )
}

export default SwitchLanguage
