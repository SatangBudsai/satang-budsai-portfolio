import type { AppTranslate } from '@/tolgee/translate'

/** A mailto link that opens a brief with the three questions already in it (in the visitor's language). */
export function briefHref(email: string, t: AppTranslate) {
  const subject = t('common.cv.brief-subject', 'Project brief')
  const body = t('common.cv.brief-body', 'What should it do?\n\nWho will use it?\n\nWhen do you need it?\n')
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
