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
      en: 'Built web and mobile systems in React/Next.js, Flutter and .NET — from an airport website to a government identity app.'
    },
    highlights: [
      {
        en: 'Built the EEC ID Flutter app (97% of commits) and its .NET backend (92%), letting workers verify their identity on a phone instead of at an office — ePassport chip reading, face match and sign-in for partner apps; signed off in SIT and UAT, ahead of launch.'
      },
      {
        en: 'Got one-tap sign-in from partner apps working on iPhone, where cookies don’t carry across apps — tested 7 approaches before choosing one.'
      },
      {
        en: 'Built the Suvarnabhumi Airport Gate website (Next.js, .NET) and set up its FastReport export reports as a pattern the team followed.'
      }
    ],
    projects: ['eec-id', 'suvarnabhumi-airport-gate'],
    stack: ['Flutter', 'React', 'Next.js', '.NET / C#', 'PostgreSQL', 'FastReport']
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
      en: 'Web platforms, legacy data migrations, exam and training systems and a mobile reading app — delivered end to end, from database design to production.'
    },
    highlights: [
      {
        en: 'Moved a university research journal to a new platform with nothing lost — 1,014 articles, checked by 25 integrity tests — live since Nov 2026.'
      },
      {
        en: 'Made the journal’s article list load in about 0.1 s instead of 41 s by loading only what’s on screen (measured on a local production build).'
      },
      {
        en: 'Load-tested an exam platform with k6 before launch: 0% errors at 600 concurrent users and a breaking point at 800, reported to the client before exam day.'
      },
      {
        en: 'Simplified a research database from 90 to 72 tables, with every foreign key indexed.'
      },
      {
        en: 'Built most of the ReadItGo e-book app: word-by-word read-aloud and offline reading.'
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
      en: 'Build and maintain open-source developer tools I use every day.'
    },
    highlights: [
      {
        en: 'Qorstack Report: a Word/Excel-to-PDF document API with SDKs on NuGet and npm; renders certificates in a government e-service (43 GitHub stars).'
      },
      {
        en: 'Git Control for Orca: PRs/MRs and pipelines for GitHub, GitLab and Bitbucket; checking changes about a third faster (162 → ~106 ms); outside pull requests merged.'
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
