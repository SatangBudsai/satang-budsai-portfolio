/**
 * Work history for the home page, Experience page and résumé.
 *
 * Written the way résumé guides and hiring managers ask for it: each bullet
 * leads with the outcome in plain words, then how; numbers only where the
 * repos or reports have them, with the baseline or caveat that goes with
 * them. Freelance and own products are outside working hours and marked so.
 * Thai is written for Thai readers, not translated line by line.
 */
import type { L } from './types'

export type Role = {
  id: string
  /** Display range ("— now"); the résumé turns "now" into "Present". */
  when: L
  /** "YYYY-MM"; used for the duration label. */
  start: string
  end?: string
  role: L
  org: L
  kind: L
  /** A PixelLab item from public/pixel/items. */
  icon: string
  summary: L
  highlights: L[]
  /** Case-study or product slugs shown as links under the role. */
  projects: string[]
  stack: string[]
  current?: boolean
  /** Done outside working hours, alongside the day job. */
  side?: boolean
}

export const roles: Role[] = [
  {
    id: 'chanwanich-senior',
    start: '2026-04',
    when: { en: 'Apr 2026 — now' },
    role: { en: 'Senior Software Engineer' },
    org: { en: 'Chanwanich' },
    kind: { en: 'Full-time · government systems' },
    icon: 'laptop',
    current: true,
    summary: {
      en: 'Promoted in April 2026 to lead services, standards and reviews on EEC e-Customs (customs, payments and scheduling for companies and officers).'
    },
    highlights: [
      {
        en: 'Bootstrapped five .NET microservices (payment, scheduling, workers, reports, integrations), from first commit to GitLab CI and Kubernetes manifests.'
      },
      {
        en: 'Main author of the payment service (79% of commits): idempotent payments and webhooks, constant-time callback checks, expiry and a full audit trail; ~250 unit tests.'
      },
      {
        en: 'Set team standards: PostgreSQL advisory locks for document numbers (now used by five teammates) and Sage, our AI-agent rules and decision records, across 5+ repos.'
      },
      {
        en: 'Review and approve merge requests for a team of ~10 (about 130 approved since May 2026); main contributor to the 275-case Playwright suite run in every UAT round.'
      },
      {
        en: 'Owned SSO and sign-in audit logging (no tokens or personal data in logs) and verified the pentest fixes for e-Customs phase 1.'
      }
    ],
    projects: ['eec-e-customs'],
    stack: ['.NET / C#', 'Next.js', 'PostgreSQL', 'RabbitMQ', 'Hangfire', 'Kubernetes', 'GitLab CI', 'Playwright']
  },
  {
    id: 'chanwanich',
    start: '2024-04',
    end: '2026-03',
    when: { en: 'Apr 2024 — Mar 2026' },
    role: { en: 'Full-Stack Developer' },
    org: { en: 'Chanwanich' },
    kind: { en: 'Full-time · web and mobile' },
    icon: 'compass',
    summary: {
      en: 'Built web and mobile systems in React/Next.js, Flutter and .NET — across the EEC ID microservices (mobile app, document signing, identity, scheduling) and an airport website.'
    },
    highlights: [
      {
        en: 'Built the EEC ID Flutter app (97% of commits) and its .NET backend (92%), letting workers verify their identity on a phone instead of at an office — ePassport chip reading, face match and sign-in for partner apps; signed off in SIT and UAT, ahead of launch.'
      },
      {
        en: 'Built EEC ID’s document-signing service (.NET 8): visa, work-permit, immigration and NIA documents from Word templates to signed PDFs, one generator for all types.'
      },
      {
        en: 'Extended the ZITADEL sign-in with custom OIDC endpoints and TOTP 2FA, made one-tap partner sign-in work on iPhone, and started the Hangfire service for visa-review SLA alerts.'
      },
      {
        en: 'Built the Suvarnabhumi Airport Gate website (Next.js, .NET) and set up its FastReport export reports as a pattern the team followed.'
      }
    ],
    projects: ['eec-id', 'suvarnabhumi-airport-gate'],
    stack: ['Flutter', '.NET / C#', 'Next.js', 'ZITADEL / OIDC', 'Hangfire', 'PostgreSQL', 'FastReport']
  },
  {
    id: 'freelance',
    start: '2025-08',
    when: { en: 'Aug 2025 — now' },
    role: { en: 'Freelance Full-Stack Developer' },
    org: { en: 'Independent' },
    kind: { en: 'Freelance · outside working hours' },
    icon: 'compass',
    current: true,
    side: true,
    summary: {
      en: 'Solo builds for universities and companies — research portals, a journal platform, exam and training systems, a reading app — from database design to production.'
    },
    highlights: [
      {
        en: 'Sole developer of a university research-office portal and researcher directory (NestJS, Prisma/PostgreSQL, two Next.js 16 sites): 68 schema migrations, full legacy import, PDPA consent and ORCID onboarding, ~780 automated tests.'
      },
      {
        en: 'Rebuilt a university research journal alone: 1,014 articles moved with nothing lost (25 integrity checks), SSO with rotating refresh tokens and RBAC, ~210 tests including security E2E; article list 41 s → ~0.1 s.'
      },
      {
        en: 'Load-tested an exam platform with k6 before launch: 0% errors at 600 concurrent users and a breaking point at 800, reported to the client before exam day.'
      },
      {
        en: 'Built most of an English e-book reader (word-by-word read-aloud, offline reading) and a course marketplace front end; moved pronunciation scoring to on-device Whisper.'
      }
    ],
    projects: ['cmu-journal', 'cmu-research-gallery', 'ora-cmu', 'junior-bootcamp', 'readitgo'],
    stack: ['Next.js', 'NestJS', 'Express', 'Prisma', 'PostgreSQL', 'k6']
  },
  {
    id: 'products',
    start: '2026-01',
    when: { en: 'Jan 2026 — now' },
    role: { en: 'Open-Source Developer' },
    org: { en: 'Personal projects' },
    kind: { en: 'Personal projects · outside working hours' },
    icon: 'rocket',
    current: true,
    side: true,
    summary: {
      en: 'Build and maintain open-source developer tools I use every day, directing AI coding agents under written rules and reviewing what they write.'
    },
    highlights: [
      {
        en: 'Qorstack Report: self-hostable Word/Excel-to-PDF API (.NET, Next.js, PostgreSQL, S3), v2.0–2.4, SDKs on NuGet and npm and an MCP server; renders certificates in a government e-service.'
      },
      {
        en: 'Git Control for Orca: a Git client on Orca’s plugin marketplace — PRs/MRs and pipelines for GitHub, GitLab and Bitbucket, 22 integration suites; merged outside pull requests, including an XSS fix.'
      },
      {
        en: 'ScanHub: one container that runs seven security scanners, diffs each scan against the last and gates CI.'
      },
      {
        en: 'Clipath: a Rust/Tauri capture tool for Windows; cut my own first build’s idle memory from 506 MB to 28 MB.'
      },
      { en: 'Six tools shipped, 29 feature releases.' }
    ],
    projects: ['git-control-orca', 'qorstack-report', 'scanhub', 'clipath', 'thai-pdf-fixer', 'sage'],
    stack: ['.NET', 'TypeScript', 'Rust (Tauri)', 'Python', 'Docker']
  },
  {
    id: 'intern',
    start: '2022-12',
    end: '2024-03',
    when: { en: 'Dec 2022 — Mar 2024' },
    role: { en: 'Junior Full-Stack Developer (Internship)' },
    org: { en: 'Chanwanich' },
    kind: { en: 'Internship · while finishing my degree' },
    icon: 'lantern',
    summary: {
      en: 'Built websites with React and Node.js (Express), designed a platform where users browse, compare and contact OEM brand manufacturers, and kept 200+ sub-district hospital websites in Lampang running.'
    },
    highlights: [],
    projects: ['lampang-health-network'],
    stack: ['React', 'Node.js', 'Express']
  }
]

export const education = {
  when: { en: 'Mar 2024' },
  degree: { en: 'B.Sc. Digital Industry Integration' },
  school: { en: 'Chiang Mai University · First-class honours' }
}
