import { education, roles } from '@/content/experience'
import { profile, stackGroups } from '@/content/site'
import { duration } from '@/lib/duration'

import en from '../../../langs/common/en.json'

/** The résumé as plain text — for applicant-tracking systems, AI screeners and copy-paste. */
export function GET() {
  const t = (key: string) => (en as Record<string, string>)[key] ?? ''
  const lines: string[] = [
    profile.name,
    t('resume.title'),
    `${profile.email} · ${profile.github} · ${profile.linkedin} · ${profile.location.en} (UTC+7)`,
    '',
    'SUMMARY',
    t('resume.summary-body'),
    '',
    'EXPERIENCE'
  ]
  for (const role of roles) {
    const range = role.when.en.replace(' — now', ' – Present').replace(' — ', ' – ')
    lines.push(
      '',
      `${role.role.en} · ${role.org.en}${role.side ? ' (outside working hours)' : ''}`,
      `${range} · ${duration(role.start, role.end, 'en')} · ${role.kind.en}`,
      role.summary.en,
      ...role.highlights.map(item => `- ${item.en}`)
    )
    if (role.stack.length) lines.push(`Stack: ${role.stack.join(', ')}`)
  }
  lines.push(
    '',
    'EDUCATION',
    `${education.degree.en} · ${education.school.en} · ${education.when.en}`,
    '',
    'SKILLS',
    ...stackGroups.map(group => `${group.label.en}: ${group.items.replaceAll(' · ', ', ')}`),
    '',
    'AVAILABILITY',
    t('resume.avail-1'),
    t('resume.avail-3')
  )
  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
  })
}
