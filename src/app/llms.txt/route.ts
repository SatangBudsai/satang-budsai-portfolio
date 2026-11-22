import { education, roles } from '@/content/experience'
import { allProjects } from '@/content/projects'
import { profile, stackGroups } from '@/content/site'
import { absolute, SITE_DESCRIPTION } from '@/lib/seo'

/**
 * llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI assistants —
 * who this is, what they have done, and where the full details live.
 */
export function GET() {
  const day = roles.filter(role => !role.side)
  const side = roles.filter(role => role.side)
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `Contact: ${profile.email} · GitHub: ${profile.github} · LinkedIn: ${profile.linkedin} · ${profile.location.en} (UTC+7).`,
    'Open to full-time roles and freelance projects. Facts below are kept in sync with the résumé.',
    '',
    '## Experience',
    ...day.map(
      role =>
        `- ${role.role.en}, ${role.org.en} (${role.when.en.replace(' — now', ' – present').replace(' — ', ' – ')}): ${role.summary.en}`
    ),
    '',
    '## Outside working hours',
    ...side.map(
      role =>
        `- ${role.role.en} (${role.when.en.replace(' — now', ' – present').replace(' — ', ' – ')}): ${role.summary.en}`
    ),
    '',
    '## Education',
    `- ${education.degree.en}, ${education.school.en} (${education.when.en})`,
    '',
    '## Skills',
    ...stackGroups.map(group => `- ${group.label.en}: ${group.items}`),
    '',
    '## Pages',
    `- [Résumé (one page)](${absolute('/resume')}): the full CV; plain text at ${absolute('/resume.txt')}, PDF at ${absolute('/Satang-Budsai-Resume.pdf')}`,
    `- [Experience](${absolute('/experience')}): every role with outcomes`,
    `- [Work](${absolute('/work')}): all projects and case studies`,
    `- [About](${absolute('/about')}): background and how I work`,
    '',
    '## Projects',
    ...allProjects.map(project => `- [${project.title}](${absolute(`/work/${project.slug}`)}): ${project.tagline.en}`),
    ''
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
  })
}
