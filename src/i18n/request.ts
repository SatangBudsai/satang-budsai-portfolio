import { getRequestConfig } from 'next-intl/server'
import { defaultLocale } from './routing'

/** The site is English only. */
export default getRequestConfig(async () => ({ locale: defaultLocale }))
