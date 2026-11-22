import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, isAppLocale } from './routing'

export default getRequestConfig(async () => {
  const preferredLocale = (await cookies()).get('NEXT_LOCALE')?.value
  const locale = preferredLocale && isAppLocale(preferredLocale) ? preferredLocale : defaultLocale
  return { locale }
})
