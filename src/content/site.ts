import type { Experiment, L, LabItem } from './types'

export const profile = {
  name: 'Satang Budsai',
  shortName: 'SATANG.B',
  email: 'satang.budsai@gmail.com',
  github: 'https://github.com/SatangBudsai',
  linkedin: 'https://www.linkedin.com/in/satang-budsai-9290a72b0',
  /**
   * The resume PDF in the repo root carries a phone number and home address.
   * Export a public copy without them, put it in /public, and set the path here
   * to show the resume buttons, e.g. '/satang-budsai-resume.pdf'.
   */
  /**
   * Profile photo (from the GitHub profile), cropped 4:5 in /public.
   */
  photo: '/me.webp',
  timeZone: 'Asia/Bangkok',
  role: { en: 'Full-stack developer' } satisfies L,
  location: { en: 'Chiang Mai, Thailand' } satisfies L,
  /** What the availability dot in the hero says. Set to undefined to hide it. */
  availability: { en: 'Open to full-time & freelance' } as L | undefined
}

/** The six products I ship, with their latest release (from each repo's git tags). */
export const shipped = [
  {
    key: 'orca',
    title: 'Git Control for Orca',
    icon: '/icons/orca.webp',
    href: '/work/git-control-orca',
    version: 'v0.12.1',
    tone: '#8f7cff'
  },
  {
    key: 'qorstack',
    title: 'Qorstack Report',
    icon: '/icons/qorstack.webp',
    href: '/work/qorstack-report',
    version: 'v2.4.0',
    tone: '#ff7a45'
  },
  {
    key: 'scanhub',
    title: 'ScanHub',
    icon: '/icons/scanhub.svg',
    href: '/work/scanhub',
    version: 'v1.2.0',
    tone: '#6f9bff'
  },
  {
    key: 'clipath',
    title: 'Clipath',
    icon: '/icons/clipath.webp',
    href: '/work/clipath',
    version: 'v1.0.13',
    tone: '#67e8f9'
  },
  {
    key: 'pdf',
    title: 'Thai PDF Fixer',
    icon: '/icons/thai-pdf.webp',
    href: '/work/thai-pdf-fixer',
    version: 'v1.2.12',
    tone: '#f5c033'
  },
  {
    key: 'sage',
    title: 'Sage',
    icon: '/icons/sage.webp',
    href: 'https://sage.qorstack.com',
    version: 'v1.9.0',
    tone: '#f472b6'
  }
] as const

/**
 * Feature releases across the six product repos, counting each minor version
 * once (Orca 8, Qorstack 5, ScanHub 2, Clipath 1, Thai PDF Fixer 3, Sage 10).
 * Patch tags are left out on purpose.
 */
export const featureReleases = 29

export const services: { title: L; body: L }[] = [
  {
    title: { en: 'Web systems & back offices' },
    body: {
      en: 'Customer-facing sites with the admin, approvals and data behind them. Next.js with .NET or NestJS.'
    }
  },
  {
    title: { en: 'Reports & documents' },
    body: {
      en: 'Certificates, invoices and exports that are fast and look right. I built a product for exactly this.'
    }
  },
  {
    title: { en: 'Desktop & developer tools' },
    body: {
      en: 'Small, fast Windows apps and internal tools with Tauri and Rust, installer and auto-update included.'
    }
  }
]

export const timeline: { when: L; title: L; body: L }[] = [
  {
    when: { en: 'Apr 2024 — now (Senior since Apr 2026)' },
    title: { en: 'Senior Software Engineer · Chanwanich' },
    body: {
      en: 'EEC ID, EEC e-Customs and the Suvarnabhumi Airport Gate website'
    }
  },
  {
    when: { en: 'Dec 2022 — Mar 2024' },
    title: {
      en: 'Junior Full-Stack Developer (Internship) · Chanwanich'
    },
    body: {
      en: 'Kept 200+ sub-district hospital websites in Lampang running'
    }
  },
  {
    when: { en: 'Mar 2024' },
    title: { en: 'B.Sc. Digital Industry Integration' },
    body: { en: 'Chiang Mai University · First-class honours' }
  },
  {
    when: { en: 'Alongside' },
    title: { en: 'Freelance' },
    body: {
      en: 'Outside working hours, for universities and businesses'
    }
  }
]

export const principles: { tag: L; body: L }[] = [
  {
    tag: { en: 'Contract-first' },
    body: {
      en: 'OpenAPI first, then typed clients generated for the front end. No hand-written API glue.'
    }
  },
  {
    tag: { en: 'My own starters' },
    body: {
      en: 'NestJS and Next.js templates with rotating refresh tokens, RBAC and Thai/English built in.'
    }
  },
  {
    tag: { en: 'AI with rules' },
    body: {
      en: 'AI agents in daily work, kept honest by Sage, a review checklist I wrote: is it needed, will it last, is it safe, did we agree?'
    }
  },
  {
    tag: { en: 'Tested end to end' },
    body: {
      en: 'Playwright for user flows, load tests where it matters, security scans in CI with ScanHub, my own scan dashboard.'
    }
  }
]

export const stackGroups: { label: L; items: string }[] = [
  { label: { en: 'Front end' }, items: 'TypeScript · Next.js · React · Tailwind · Flutter · Dart' },
  { label: { en: 'Back end' }, items: '.NET / C# · NestJS · Express · Rust (Tauri)' },
  {
    label: { en: 'Data & infra' },
    items: 'SQL · PostgreSQL · Redis · RabbitMQ · MinIO · Docker · Kubernetes · GitLab CI'
  }
]

export const experiments: Experiment[] = [
  {
    slug: 'zoo-together',
    title: 'Zoo Together',
    status: { en: 'Feature-complete, not deployed' },
    question: {
      en: 'I had never written netcode. Could I build a 4-player real-time game where the server owns the truth?'
    },
    setup: {
      en: 'Ten planned phases, a pure deterministic simulation package, every piece of content validated with Zod, and tests as the contract agents had to pass.'
    },
    learned: [
      {
        en: 'Clients send intents, the server validates and returns small deltas — a rule that made it hard for agents to drift.'
      },
      {
        en: 'Moving characters are sent as path + start tick + speed and interpolated on the client.'
      }
    ],
    stack: ['React', 'PixiJS v8', 'Colyseus', 'Prisma', 'PostgreSQL', 'Vitest', 'Playwright'],
    media: [
      {
        kind: 'image',
        src: '/work/zoo-together/game.webp',
        width: 1280,
        height: 800,
        alt: {
          en: 'Zoo Together gameplay, isometric zoo view'
        },
        frame: 'browser'
      },
      {
        kind: 'image',
        src: '/work/zoo-together/restored.webp',
        width: 1280,
        height: 800,
        alt: { en: 'Zoo Together after restoring a saved zoo' },
        frame: 'browser'
      }
    ]
  },
  {
    slug: 'age-of-lost-knowledge',
    title: 'The Age of Lost Knowledge',
    status: { en: 'In progress' },
    question: {
      en: 'Can two different AI agents work on one large codebase without stepping on each other?'
    },
    setup: {
      en: 'AGENTS.md splits ownership between Claude and Codex; every architecture decision is an ADR. The game moved from 2D to a 3D HD-2D world (2D characters in 3D scenes) on Godot 4 .NET, with a pure C# core and a dedicated server.'
    },
    learned: [
      {
        en: 'Every rule lives in the repo, not in a chat — each new session starts from the same context.'
      },
      {
        en: 'Clients never own game state: input → intent → simulation → snapshot.'
      }
    ],
    stack: ['Godot 4 .NET', 'HD-2D (3D)', 'C#', 'LiteNetLib', 'MemoryPack', 'xUnit'],
    fact: { value: '21', label: { en: 'ADRs the agents must follow' } },
    media: [
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/grove-3d.webp',
        width: 1600,
        height: 900,
        alt: {
          en: 'The grove in the 3D (HD-2D) version of The Age of Lost Knowledge, morning'
        }
      },
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/boss-3d.webp',
        width: 1600,
        height: 900,
        alt: { en: 'A boss intro in the grove' }
      },
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/healer-3d.webp',
        width: 1600,
        height: 900,
        alt: { en: 'Talking to the town healer' }
      }
    ]
  }
]

export const lab: LabItem[] = []
