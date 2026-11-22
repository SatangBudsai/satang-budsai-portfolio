import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, isAppLocale, type AppLocale } from './routing'

/**
 * Visitors without a NEXT_LOCALE cookie get Thai when their browser lists Thai,
 * and English otherwise, so international readers don't land on a Thai page.
 */
function localeFromAcceptLanguage(header: string | null): AppLocale {
  if (!header) return defaultLocale
  const languages = header
    .split(',')
    .map(part => part.split(';')[0].trim().toLowerCase())
    .filter(Boolean)
  if (!languages.length) return defaultLocale
  return languages.some(language => language === 'th' || language.startsWith('th-')) ? 'th' : 'en'
}

export default getRequestConfig(async () => {
  const preferredLocale = (await cookies()).get('NEXT_LOCALE')?.value
  const locale =
    preferredLocale && isAppLocale(preferredLocale)
      ? preferredLocale
      : localeFromAcceptLanguage((await headers()).get('accept-language'))
  return { locale }
})
