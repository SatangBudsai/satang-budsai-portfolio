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
  resumeHref: undefined as string | undefined,
  /**
   * Profile photo (from the GitHub profile), cropped 4:5 in /public.
   */
  photo: '/me.webp',
  timeZone: 'Asia/Bangkok',
  role: { th: 'Full-stack developer', en: 'Full-stack developer' } satisfies L,
  location: { th: 'เชียงใหม่ ประเทศไทย', en: 'Chiang Mai, Thailand' } satisfies L,
  /** What the availability dot in the hero says. Set to undefined to hide it. */
  availability: { th: 'รับงานฟรีแลนซ์', en: 'Available for freelance' } as L | undefined
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
    title: { th: 'ระบบเว็บและหลังบ้าน', en: 'Web systems & back offices' },
    body: {
      th: 'เว็บที่ลูกค้าใช้ พร้อมระบบหลังบ้าน การอนุมัติ และข้อมูลที่อยู่เบื้องหลัง ด้วย Next.js กับ .NET หรือ NestJS',
      en: 'Customer-facing sites with the admin, approvals and data behind them. Next.js with .NET or NestJS.'
    }
  },
  {
    title: { th: 'รายงานและเอกสาร', en: 'Reports & documents' },
    body: {
      th: 'ใบรับรอง ใบแจ้งหนี้ และไฟล์ export ที่ออกมาเร็วและหน้าตาถูกต้อง เรื่องนี้ทำเป็นผลิตภัณฑ์ของตัวเองมาแล้ว',
      en: 'Certificates, invoices and exports that are fast and look right. I built a product for exactly this.'
    }
  },
  {
    title: { th: 'แอปเดสก์ท็อปและเครื่องมือนักพัฒนา', en: 'Desktop & developer tools' },
    body: {
      th: 'แอป Windows ขนาดเล็กที่เร็ว และเครื่องมือภายในทีม ด้วย Tauri และ Rust มีตัวติดตั้งและอัปเดตอัตโนมัติ',
      en: 'Small, fast Windows apps and internal tools with Tauri and Rust, installer and auto-update included.'
    }
  }
]

export const timeline: { when: L; title: L; body: L }[] = [
  {
    when: { th: 'เม.ย. 2024 — ปัจจุบัน', en: 'Apr 2024 — now' },
    title: { th: 'Full-stack developer · Chanwanich', en: 'Full-stack developer · Chanwanich' },
    body: {
      th: 'EEC ID, EEC e-Customs และเว็บ Suvarnabhumi Airport Gate',
      en: 'EEC ID, EEC e-Customs and the Suvarnabhumi Airport Gate website'
    }
  },
  {
    when: { th: 'ธ.ค. 2022 — มี.ค. 2024', en: 'Dec 2022 — Mar 2024' },
    title: { th: 'นักศึกษาฝึกงาน Full-stack · Chanwanich', en: 'Full-stack intern · Chanwanich' },
    body: {
      th: 'ดูแลเว็บโรงพยาบาลส่งเสริมสุขภาพตำบลกว่า 200 แห่งในจังหวัดลำปาง',
      en: 'Kept 200+ sub-district hospital websites in Lampang running'
    }
  },
  {
    when: { th: 'มี.ค. 2024', en: 'Mar 2024' },
    title: { th: 'ปริญญาตรี Digital Industry Integration', en: 'B.Sc. Digital Industry Integration' },
    body: { th: 'มหาวิทยาลัยเชียงใหม่ · เกียรตินิยมอันดับ 1', en: 'Chiang Mai University · First-class honors' }
  },
  {
    when: { th: 'งานเสริม', en: 'Alongside' },
    title: { th: 'งานฟรีแลนซ์', en: 'Freelance' },
    body: {
      th: 'มหาวิทยาลัยเชียงใหม่ และ Engenius',
      en: 'Chiang Mai University and Engenius'
    }
  }
]

export const principles: { tag: L; body: L }[] = [
  {
    tag: { th: 'สัญญา API มาก่อน', en: 'Contract-first' },
    body: {
      th: 'เขียน OpenAPI ก่อน แล้วสร้าง client แบบมี type ให้หน้าบ้านอัตโนมัติ ไม่ต้องเขียนโค้ดเชื่อม API เอง',
      en: 'OpenAPI first, then typed clients generated for the front end. No hand-written API glue.'
    }
  },
  {
    tag: { th: 'Starter ของตัวเอง', en: 'My own starters' },
    body: {
      th: 'Template ของ NestJS และ Next.js ที่มี refresh token แบบหมุนเวียน, RBAC และรองรับไทย/อังกฤษตั้งแต่เริ่ม',
      en: 'NestJS and Next.js templates with rotating refresh tokens, RBAC and Thai/English built in.'
    }
  },
  {
    tag: { th: 'ใช้ AI แบบมีกติกา', en: 'AI with rules' },
    body: {
      th: 'ใช้ AI agent ในงานทุกวัน และคุมด้วย Sage: จำเป็นไหม อยู่ได้นานไหม ปลอดภัยไหม ตกลงกันไว้แล้วหรือยัง',
      en: 'AI agents in daily work, kept honest by Sage: is it needed, will it last, is it safe, did we agree?'
    }
  },
  {
    tag: { th: 'ทดสอบครบทั้งเส้นทาง', en: 'Tested end to end' },
    body: {
      th: 'Playwright สำหรับ flow ของผู้ใช้, load test ในจุดที่จำเป็น และสแกนความปลอดภัยใน CI ด้วย ScanHub',
      en: 'Playwright for user flows, load tests where it matters, security scans in CI with ScanHub.'
    }
  }
]

export const stackGroups: { label: L; items: string }[] = [
  { label: { th: 'หน้าบ้าน', en: 'Front end' }, items: 'Next.js · React · Tailwind · Flutter' },
  { label: { th: 'หลังบ้าน', en: 'Back end' }, items: '.NET / C# · NestJS · Express · Rust (Tauri)' },
  {
    label: { th: 'ข้อมูลและโครงสร้างระบบ', en: 'Data & infra' },
    items: 'PostgreSQL · Redis · RabbitMQ · Kafka · MinIO · Docker · Kubernetes'
  }
]

export const experiments: Experiment[] = [
  {
    slug: 'zoo-together',
    title: 'Zoo Together',
    status: { th: 'ทำครบทุกฟีเจอร์ ยังไม่ได้ deploy', en: 'Feature-complete, not deployed' },
    question: {
      th: 'ไม่เคยเขียน netcode มาก่อน จะสร้างเกมเล่นพร้อมกัน 4 คนแบบ real-time ที่ server เป็นผู้ตัดสินสถานะเกมได้ไหม',
      en: 'I had never written netcode. Could I build a 4-player real-time game where the server owns the truth?'
    },
    setup: {
      th: 'แบ่งงานเป็น 10 เฟส แยก simulation เป็นแพ็กเกจที่ deterministic ล้วน ตรวจข้อมูลเกมทั้งหมดด้วย Zod และใช้ test เป็นสัญญาที่ agent ต้องผ่าน',
      en: 'Ten planned phases, a pure deterministic simulation package, every piece of content validated with Zod, and tests as the contract agents had to pass.'
    },
    learned: [
      {
        th: 'Client ส่งแค่ "ความตั้งใจ" ให้ server ตรวจ แล้วรับผลกลับเป็นส่วนต่างเล็ก ๆ — กติกานี้ทำให้ agent เขียนโค้ดผิดทางได้ยากขึ้น',
        en: 'Clients send intents, the server validates and returns small deltas — a rule that made it hard for agents to drift.'
      },
      {
        th: 'ตัวละครที่เดินอยู่ส่งเป็น เส้นทาง + tick เริ่ม + ความเร็ว แล้วให้ client คำนวณตำแหน่งเอง',
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
          th: 'ภาพหน้าจอเกม Zoo Together ฉากสวนสัตว์มุมมองไอโซเมตริก',
          en: 'Zoo Together gameplay, isometric zoo view'
        },
        frame: 'browser'
      },
      {
        kind: 'image',
        src: '/work/zoo-together/restored.webp',
        width: 1280,
        height: 800,
        alt: { th: 'Zoo Together หลังกู้คืนเซฟเกม', en: 'Zoo Together after restoring a saved zoo' },
        frame: 'browser'
      }
    ]
  },
  {
    slug: 'age-of-lost-knowledge',
    title: 'The Age of Lost Knowledge',
    status: { th: 'กำลังทำ', en: 'In progress' },
    question: {
      th: 'AI agent สองตัวจากคนละค่าย จะทำงานบน codebase ขนาดใหญ่ชุดเดียวกันโดยไม่ชนกันได้ไหม',
      en: 'Can two different AI agents work on one large codebase without stepping on each other?'
    },
    setup: {
      th: 'AGENTS.md แบ่งความรับผิดชอบระหว่าง Claude กับ Codex ชัดเจน ทุกการตัดสินใจเชิงสถาปัตยกรรมเขียนเป็น ADR ตัวเกมย้ายจาก 2D มาเป็นโลก 3D แบบ HD-2D (ตัวละคร 2D ในฉาก 3D) บน Godot 4 .NET, core เขียนด้วย C# ล้วน และมี dedicated server แยก',
      en: 'AGENTS.md splits ownership between Claude and Codex; every architecture decision is an ADR. The game moved from 2D to a 3D HD-2D world (2D characters in 3D scenes) on Godot 4 .NET, with a pure C# core and a dedicated server.'
    },
    learned: [
      {
        th: 'กติกาทั้งหมดอยู่ใน repo ไม่ใช่ในแชต เปิด session ใหม่เมื่อไรก็เริ่มจาก context เดียวกัน',
        en: 'Every rule lives in the repo, not in a chat — each new session starts from the same context.'
      },
      {
        th: 'Client ไม่เคยถือสถานะเกม: input → intent → simulation → snapshot',
        en: 'Clients never own game state: input → intent → simulation → snapshot.'
      }
    ],
    stack: ['Godot 4 .NET', 'HD-2D (3D)', 'C#', 'LiteNetLib', 'MemoryPack', 'xUnit'],
    fact: { value: '21', label: { th: 'ADR ที่ agent ต้องทำตาม', en: 'ADRs the agents must follow' } },
    media: [
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/grove-3d.webp',
        width: 1600,
        height: 900,
        alt: {
          th: 'ป่าในเกม The Age of Lost Knowledge เวอร์ชัน 3D (HD-2D) ตอนเช้า',
          en: 'The grove in the 3D (HD-2D) version of The Age of Lost Knowledge, morning'
        }
      },
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/boss-3d.webp',
        width: 1600,
        height: 900,
        alt: { th: 'ฉากเปิดตัวบอสในป่า', en: 'A boss intro in the grove' }
      },
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/healer-3d.webp',
        width: 1600,
        height: 900,
        alt: { th: 'คุยกับ NPC หมอในเมือง', en: 'Talking to the town healer' }
      }
    ]
  }
]

export const lab: LabItem[] = []
