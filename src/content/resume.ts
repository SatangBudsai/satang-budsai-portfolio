/**
 * What the résumé (home page and PDF) shows, and in which order.
 * Everything else comes from projects.ts, stories.ts and experience.ts.
 */
import { getProject } from './projects'
import type { L, Project } from './types'

/** Projects on the résumé: client and day-job work first, then the strongest own products. */
export const resumeProjects = [
  'eec-e-customs',
  'eec-id',
  'qorstack-report',
  'cmu-journal',
  'git-control-orca',
  'junior-bootcamp'
]

/**
 * One outcome per project, in plain words — not a feature list or a count of
 * work. Every fact here also appears in that project's case study.
 */
const OUTCOME: Record<string, L> = {
  'eec-id': {
    en: 'Signed off in SIT and UAT ahead of launch; one-tap sign-in from partner apps works on iPhone.'
  },
  'eec-e-customs': {
    en: 'Set up five services from scratch; idempotent payments, advisory-locked document numbers the team adopted, and a 275-case Playwright suite run in UAT.'
  },
  'cmu-journal': {
    en: 'Live since Nov 2026; SonarQube quality gate and 25 integrity checks passed.'
  },
  'junior-bootcamp': {
    en: '600 people at once with no errors; the breaking point at 800 was found before exam day.'
  },
  'qorstack-report': {
    en: 'Used for certificates in a government e-service (signed off in UAT, pre-launch); SDKs on NuGet and npm.'
  },
  'git-control-orca': {
    en: 'Used daily; git status 162 → ~106 ms; outside pull requests merged.'
  }
}

export function keyResult(project: Project): L | undefined {
  return OUTCOME[project.slug] ?? project.results?.[0]
}

export function selectedProjects(): Project[] {
  return resumeProjects.map(slug => getProject(slug)).filter(project => project !== undefined)
}

/** A picture for a project row: its cover if it is a still picture, otherwise its first still screen. */
export function projectThumb(project: Project) {
  if (project.cover.kind === 'image' && !project.cover.animated)
    return { kind: 'image' as const, src: project.cover.src, alt: project.cover.alt }
  if (project.cover.kind === 'art') return { kind: 'art' as const, id: project.cover.id, alt: project.cover.alt }
  const first = project.gallery?.find(media => media.kind === 'image' && !media.animated)
  return first && first.kind === 'image' ? { kind: 'image' as const, src: first.src, alt: first.alt } : undefined
}

/** File name of the generated PDF in /public (see scripts/resume/export-pdf.mjs). */
export const resumePdf = '/Satang-Budsai-Resume.pdf'
