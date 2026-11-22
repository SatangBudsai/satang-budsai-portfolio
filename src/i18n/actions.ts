'use server'

import { cookies } from 'next/headers'
import { isAppLocale } from './routing'

export async function setLocale(locale: string) {
  if (!isAppLocale(locale)) throw new Error('Unsupported locale')
  const cookieStore = await cookies()
  cookieStore.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'lax', maxAge: 31536000 })
}
