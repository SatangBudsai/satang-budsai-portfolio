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
  role: { th: 'Full-stack developer', en: 'Full-stack developer' } satisfies L,
  location: { th: 'เชียงใหม่ ประเทศไทย', en: 'Chiang Mai, Thailand' } satisfies L,
  /** What the availability dot in the hero says. Set to undefined to hide it. */
  availability: { th: 'เปิดรับงานประจำและฟรีแลนซ์', en: 'Open to full-time & freelance' } as L | undefined
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
      th: 'เว็บฝั่งลูกค้า พร้อมระบบหลังบ้าน งานอนุมัติ และข้อมูลที่อยู่ข้างหลัง ใช้ Next.js คู่กับ .NET หรือ NestJS',
      en: 'Customer-facing sites with the admin, approvals and data behind them. Next.js with .NET or NestJS.'
    }
  },
  {
    title: { th: 'รายงานและเอกสาร', en: 'Reports & documents' },
    body: {
      th: 'ใบรับรอง ใบแจ้งหนี้ ไฟล์ export ที่ออกเร็วและหน้าตาถูกต้อง เรื่องนี้เราทำเป็นโปรดักต์ของตัวเองมาแล้ว',
      en: 'Certificates, invoices and exports that are fast and look right. I built a product for exactly this.'
    }
  },
  {
    title: { th: 'แอปเดสก์ท็อปและเครื่องมือนักพัฒนา', en: 'Desktop & developer tools' },
    body: {
      th: 'แอป Windows ตัวเล็กที่เร็ว และเครื่องมือใช้ในทีม ทำด้วย Tauri กับ Rust มี installer และ auto-update ให้ครบ',
      en: 'Small, fast Windows apps and internal tools with Tauri and Rust, installer and auto-update included.'
    }
  }
]

export const timeline: { when: L; title: L; body: L }[] = [
  {
    when: { th: 'เม.ย. 2024 — ปัจจุบัน (Senior ตั้งแต่ เม.ย. 2026)', en: 'Apr 2024 — now (Senior since Apr 2026)' },
    title: { th: 'Senior Software Engineer · Chanwanich', en: 'Senior Software Engineer · Chanwanich' },
    body: {
      th: 'EEC ID, EEC e-Customs และเว็บ Suvarnabhumi Airport Gate',
      en: 'EEC ID, EEC e-Customs and the Suvarnabhumi Airport Gate website'
    }
  },
  {
    when: { th: 'ธ.ค. 2022 — มี.ค. 2024', en: 'Dec 2022 — Mar 2024' },
    title: {
      th: 'Junior Full-Stack Developer (ฝึกงาน) · Chanwanich',
      en: 'Junior Full-Stack Developer (Internship) · Chanwanich'
    },
    body: {
      th: 'ดูแลเว็บโรงพยาบาลส่งเสริมสุขภาพตำบลกว่า 200 แห่งในจังหวัดลำปาง',
      en: 'Kept 200+ sub-district hospital websites in Lampang running'
    }
  },
  {
    when: { th: 'มี.ค. 2024', en: 'Mar 2024' },
    title: { th: 'ปริญญาตรี Digital Industry Integration', en: 'B.Sc. Digital Industry Integration' },
    body: { th: 'มหาวิทยาลัยเชียงใหม่ · เกียรตินิยมอันดับ 1', en: 'Chiang Mai University · First-class honours' }
  },
  {
    when: { th: 'งานเสริม', en: 'Alongside' },
    title: { th: 'งานฟรีแลนซ์', en: 'Freelance' },
    body: {
      th: 'นอกเวลางาน รับทำระบบให้มหาวิทยาลัยและธุรกิจ',
      en: 'Outside working hours, for universities and businesses'
    }
  }
]

export const principles: { tag: L; body: L }[] = [
  {
    tag: { th: 'ตกลงหน้าตา API ก่อน', en: 'Contract-first' },
    body: {
      th: 'เขียน OpenAPI ให้ชัดก่อนลงมือ แล้วให้ระบบสร้าง client ที่มี type ให้หน้าบ้านเอง ไม่ต้องเขียนโค้ดต่อ API ด้วยมือ',
      en: 'OpenAPI first, then typed clients generated for the front end. No hand-written API glue.'
    }
  },
  {
    tag: { th: 'มีโครงตั้งต้นของตัวเอง', en: 'My own starters' },
    body: {
      th: 'template ของ NestJS และ Next.js ที่มีระบบ refresh token แบบหมุน สิทธิ์ผู้ใช้ และสองภาษาไว้พร้อมตั้งแต่แรก',
      en: 'NestJS and Next.js templates with rotating refresh tokens, RBAC and Thai/English built in.'
    }
  },
  {
    tag: { th: 'ใช้ AI แบบมีกติกา', en: 'AI with rules' },
    body: {
      th: 'ใช้ AI agent ทุกวัน แต่คุมด้วย Sage เช็กลิสต์รีวิวที่เราเขียนเอง ให้ถามก่อนเสมอว่า จำเป็นไหม อยู่ได้นานไหม ปลอดภัยไหม และตกลงกันไว้หรือยัง',
      en: 'AI agents in daily work, kept honest by Sage, a review checklist I wrote: is it needed, will it last, is it safe, did we agree?'
    }
  },
  {
    tag: { th: 'เทสครบทั้งเส้นทาง', en: 'Tested end to end' },
    body: {
      th: 'ใช้ Playwright เทส flow ของผู้ใช้ ทำ load test ในจุดที่สำคัญ และสแกนความปลอดภัยใน CI ด้วย ScanHub แดชบอร์ดที่เราทำเอง',
      en: 'Playwright for user flows, load tests where it matters, security scans in CI with ScanHub, my own scan dashboard.'
    }
  }
]

export const stackGroups: { label: L; items: string }[] = [
  { label: { th: 'หน้าบ้าน', en: 'Front end' }, items: 'TypeScript · Next.js · React · Tailwind · Flutter · Dart' },
  { label: { th: 'หลังบ้าน', en: 'Back end' }, items: '.NET / C# · NestJS · Express · Rust (Tauri)' },
  {
    label: { th: 'Data และ infra', en: 'Data & infra' },
    items: 'SQL · PostgreSQL · Redis · RabbitMQ · MinIO · Docker · Kubernetes · GitLab CI'
  }
]

export const experiments: Experiment[] = [
  {
    slug: 'zoo-together',
    title: 'Zoo Together',
    status: { th: 'ฟีเจอร์ครบแล้ว แต่ยังไม่ได้ deploy', en: 'Feature-complete, not deployed' },
    question: {
      th: 'ไม่เคยเขียน netcode มาก่อน เลยอยากลองดูว่าจะทำเกม real-time 4 คน ที่ให้ server เป็นตัวตัดสินทุกอย่างได้ไหม',
      en: 'I had never written netcode. Could I build a 4-player real-time game where the server owns the truth?'
    },
    setup: {
      th: 'วางไว้ 10 เฟส แยก simulation เป็นแพ็กเกจ deterministic ล้วน ๆ เช็กข้อมูลเกมทุกชิ้นด้วย Zod และให้ test เป็นสัญญาที่ agent ต้องผ่าน',
      en: 'Ten planned phases, a pure deterministic simulation package, every piece of content validated with Zod, and tests as the contract agents had to pass.'
    },
    learned: [
      {
        th: 'Client ส่งแค่ intent ไป server ตรวจแล้วส่ง delta เล็ก ๆ กลับมา — กฎข้อนี้ทำให้ agent หลุดทางได้ยาก',
        en: 'Clients send intents, the server validates and returns small deltas — a rule that made it hard for agents to drift.'
      },
      {
        th: 'ตัวละครที่กำลังเดินส่งไปแค่ path + tick เริ่ม + ความเร็ว แล้วให้ client interpolate ต่อเอง',
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
          th: 'หน้าจอเกม Zoo Together สวนสัตว์มุมมอง isometric',
          en: 'Zoo Together gameplay, isometric zoo view'
        },
        frame: 'browser'
      },
      {
        kind: 'image',
        src: '/work/zoo-together/restored.webp',
        width: 1280,
        height: 800,
        alt: { th: 'Zoo Together หลังโหลดเซฟสวนสัตว์กลับมา', en: 'Zoo Together after restoring a saved zoo' },
        frame: 'browser'
      }
    ]
  },
  {
    slug: 'age-of-lost-knowledge',
    title: 'The Age of Lost Knowledge',
    status: { th: 'กำลังทำ', en: 'In progress' },
    question: {
      th: 'AI agent สองตัวคนละเจ้า ทำงานใน codebase ใหญ่ชุดเดียวกันโดยไม่เหยียบเท้ากันได้ไหม',
      en: 'Can two different AI agents work on one large codebase without stepping on each other?'
    },
    setup: {
      th: 'AGENTS.md แบ่งไว้ว่าส่วนไหน Claude ดูแล ส่วนไหน Codex ดูแล ทุกการตัดสินใจด้าน architecture จดเป็น ADR ตัวเกมย้ายจาก 2D ไปเป็นโลก 3D แบบ HD-2D (ตัวละคร 2D ในฉาก 3D) บน Godot 4 .NET มี core เป็น C# ล้วน และมี dedicated server',
      en: 'AGENTS.md splits ownership between Claude and Codex; every architecture decision is an ADR. The game moved from 2D to a 3D HD-2D world (2D characters in 3D scenes) on Godot 4 .NET, with a pure C# core and a dedicated server.'
    },
    learned: [
      {
        th: 'กฎทุกข้ออยู่ใน repo ไม่ได้อยู่ในแชต เปิด session ใหม่เมื่อไรก็เริ่มจาก context เดียวกัน',
        en: 'Every rule lives in the repo, not in a chat — each new session starts from the same context.'
      },
      {
        th: 'Client ไม่เคยถือ game state: input → intent → simulation → snapshot',
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
          th: 'ป่าใน The Age of Lost Knowledge เวอร์ชัน 3D (HD-2D) ตอนเช้า',
          en: 'The grove in the 3D (HD-2D) version of The Age of Lost Knowledge, morning'
        }
      },
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/boss-3d.webp',
        width: 1600,
        height: 900,
        alt: { th: 'ฉากบอสโผล่ในป่า', en: 'A boss intro in the grove' }
      },
      {
        kind: 'image',
        src: '/work/age-of-lost-knowledge/healer-3d.webp',
        width: 1600,
        height: 900,
        alt: { th: 'คุยกับหมอประจำเมือง', en: 'Talking to the town healer' }
      }
    ]
  }
]

export const lab: LabItem[] = []
