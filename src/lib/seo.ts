import { education, roles } from '@/content/experience'
import { allProjects } from '@/content/projects'
import { profile, stackGroups } from '@/content/site'

/** Public origin of the site. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a preview deployment). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://satang.dev').replace(/\/$/, '')

export const absolute = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const SITE_TITLE = `${profile.name} — Senior Software Engineer (.NET, Next.js, Flutter)`

export const SITE_DESCRIPTION =
  'Senior Software Engineer in Chiang Mai, Thailand. Builds government and enterprise systems end to end in .NET, Next.js and Flutter — identity, payments and scheduling services — plus open-source developer tools.'

export const KEYWORDS = [
  'Satang Budsai',
  'Senior Software Engineer',
  'Full-stack developer',
  '.NET developer',
  'Next.js developer',
  'Flutter developer',
  'Chiang Mai',
  'Thailand',
  'government systems',
  'portfolio',
  'résumé'
]

const PERSON_ID = `${SITE_URL}/#person`

/** schema.org Person — the main entity search engines and AI assistants should learn about. */
export function personSchema() {
  const current = roles.find(role => role.current && !role.side)
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    url: absolute('/'),
    image: absolute('/me.webp'),
    email: `mailto:${profile.email}`,
    jobTitle: current?.role.en ?? 'Senior Software Engineer',
    worksFor: { '@type': 'Organization', name: 'Chanwanich Company Limited' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Chiang Mai University' },
    hasCredential: { '@type': 'EducationalOccupationalCredential', name: education.degree.en },
    address: { '@type': 'PostalAddress', addressLocality: 'Chiang Mai', addressCountry: 'TH' },
    knowsAbout: stackGroups.flatMap(group => group.items.split(' · ')),
    sameAs: [profile.github, profile.linkedin]
  }
}

/** Home page graph: the site, the profile page and the person it is about. */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: absolute('/'),
        name: profile.name,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID }
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: absolute('/'),
        name: SITE_TITLE,
        inLanguage: 'en',
        mainEntity: { '@id': PERSON_ID },
        hasPart: allProjects.map(project => ({ '@id': absolute(`/work/${project.slug}`) }))
      },
      personSchema()
    ]
  }
}

/** One project page: software the person built, or a case study they wrote. */
export function projectJsonLd(slug: string) {
  const project = allProjects.find(item => item.slug === slug)
  if (!project) return null
  const url = absolute(`/work/${slug}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': project.kind === 'product' ? 'SoftwareApplication' : 'CreativeWork',
        '@id': url,
        url,
        name: project.title,
        description: project.tagline.en,
        inLanguage: 'en',
        ...(project.kind === 'product' ? { applicationCategory: 'DeveloperApplication' } : {}),
        author: { '@id': PERSON_ID },
        keywords: project.stack.join(', ')
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
          { '@type': 'ListItem', position: 2, name: 'Work', item: absolute('/work') },
          { '@type': 'ListItem', position: 3, name: project.title, item: url }
        ]
      },
      { ...personSchema(), '@id': PERSON_ID }
    ]
  }
}

/** Serialise for a <script type="application/ld+json">, escaping "<" as the Next.js guide recommends. */
export const jsonLdHtml = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
