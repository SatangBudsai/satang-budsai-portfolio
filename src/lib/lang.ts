import { getLocale } from 'next-intl/server'

import type { Lang } from '@/content/types'
import { defaultLocale, isAppLocale } from '@/i18n/routing'
import { getTranslate } from '@/tolgee/server'

export async function getLang(): Promise<Lang> {
  const locale = await getLocale()
  return isAppLocale(locale) ? locale : defaultLocale
}

/** Language plus the translate function for `common.*` UI strings. */
export async function getI18n() {
  const [lang, t] = await Promise.all([getLang(), getTranslate()])
  return { lang, t }
}
