/**
 * What the résumé (home page and PDF) shows, and in which order.
 * Everything else comes from projects.ts, stories.ts and experience.ts.
 */
import { getProject } from './projects'
import type { L, Project } from './types'

/** Projects on the résumé: client and day-job work first, then the strongest own products. */
export const resumeProjects = [
  'eec-id',
  'cmu-journal',
  'junior-bootcamp',
  'qorstack-report',
  'git-control-orca',
  'eec-e-customs'
]

/**
 * One outcome per project, in plain words — not a feature list or a count of
 * work. Every fact here also appears in that project's case study.
 */
const OUTCOME: Record<string, L> = {
  'eec-id': {
    th: 'ลูกค้าทดสอบและรับรองแล้ว (SIT และ UAT) และแก้ล็อกอินข้ามแอปบน iPhone ได้หลังเทียบมา 7 วิธี',
    en: 'Signed off in client testing (SIT and UAT); one-tap sign-in on iPhone solved after comparing 7 approaches.'
  },
  'eec-e-customs': {
    th: 'ไม่มีการตัดเงินซ้ำเมื่อกดจ่ายอีกรอบ เลขเอกสารไม่ชนกัน และมี test ครอบ 4 service',
    en: 'No double charges on payment retries, no colliding document numbers, and test suites across four services.'
  },
  'cmu-journal': {
    th: 'ขึ้น production เมื่อ พ.ย. 2026 ผ่าน SonarQube quality gate และ integrity check 25 ข้อ',
    en: 'Live since Nov 2026; SonarQube quality gate and 25 integrity checks passed.'
  },
  'junior-bootcamp': {
    th: 'เข้าพร้อมกัน 600 คนไม่มีข้อผิดพลาด และเจอจุดที่ระบบรับไม่ไหวที่ 800 คน ก่อนวันสอบจริง',
    en: '600 people at once with no errors; the breaking point at 800 was found before exam day.'
  },
  'qorstack-report': {
    th: 'ใช้ออกใบรับรองจริงในระบบ e-service ภาครัฐ มี SDK บน NuGet และ npm',
    en: 'Renders certificates in a government e-service; SDKs on NuGet and npm.'
  },
  'git-control-orca': {
    th: 'ใช้เองทุกวัน git status จาก 162 เหลือราว 106 ms และมีคนนอกส่ง PR มา merge แล้ว',
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
