export const locales = ['en'] as const
export type AppLocale = (typeof locales)[number]
export const defaultLocale: AppLocale = 'en'

export function isAppLocale(locale: string): locale is AppLocale {
  return locales.some(value => value === locale)
}
