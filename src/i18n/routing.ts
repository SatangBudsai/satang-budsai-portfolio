export const locales = ['en', 'th'] as const
export type AppLocale = (typeof locales)[number]
export const defaultLocale: AppLocale = 'th'

export function isAppLocale(locale: string): locale is AppLocale {
  return locales.some(value => value === locale)
}
