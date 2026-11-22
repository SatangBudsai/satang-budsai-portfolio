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
  /** Display range ("— now" / "— ปัจจุบัน"); the résumé turns "now" into "Present". */
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
    when: { th: 'เม.ย. 2026 — ปัจจุบัน', en: 'Apr 2026 — now' },
    role: { th: 'Senior Software Engineer', en: 'Senior Software Engineer' },
    org: { th: 'Chanwanich', en: 'Chanwanich' },
    kind: { th: 'งานประจำ · ระบบภาครัฐ', en: 'Full-time · government systems' },
    icon: 'laptop',
    current: true,
    summary: {
      th: 'ได้เลื่อนตำแหน่งเมื่อ เม.ย. 2026 ดูแล EEC e-Customs ระบบศุลกากร การชำระเงิน และงานตั้งเวลาที่บริษัทและเจ้าหน้าที่ใช้ นอกจากเขียนโค้ดแล้วยังวางโครง service แบบแผนที่ทีมใช้ร่วมกัน และกติกาการใช้ AI ของทีม',
      en: 'Promoted in April 2026. On EEC e-Customs — the customs, payment and scheduling system companies and officers use — I set up services, team patterns and the rules our AI agents follow, as well as writing code.'
    },
    highlights: [
      {
        th: 'ตั้งต้น .NET microservice ให้ e-Customs 5 ตัว (ชำระเงิน ตั้งเวลา worker รายงาน และเชื่อมระบบภายนอก) ตั้งแต่ commit แรกจนถึง GitLab CI และ Kubernetes manifest',
        en: 'Bootstrapped five .NET microservices for e-Customs (payment, scheduling, workers, reports, external integrations) — from the first commit to GitLab CI and Kubernetes manifests.'
      },
      {
        th: 'เป็นคนเขียนหลักของระบบชำระเงิน (79% ของ commit) กดจ่ายซ้ำหรือ webhook ส่งซ้ำก็ไม่ตัดเงินซ้ำ ตรวจ callback แบบ constant-time มีวันหมดอายุของรายการ และบันทึก audit ทุกครั้งแม้จะล้มเหลว มี unit test ราว 250 ชุด',
        en: 'Main author of the payment service (79% of commits): idempotent payment initiation and webhooks, constant-time callback checks, payment expiry and an audit row for every attempt — about 250 unit tests.'
      },
      {
        th: 'นำ PostgreSQL advisory lock มาใช้กันเลขเอกสารซ้ำ และเขียนเป็นข้อตกลงของทีม จากนั้นเพื่อนร่วมทีมอีก 5 คนนำแบบเดียวกันไปใช้ต่อ (ราว 25 จุด)',
        en: 'Introduced PostgreSQL advisory locks for running document numbers and wrote it up as a team decision; five teammates have since applied the pattern (about 25 lock classes).'
      },
      {
        th: 'สร้าง Sage กติกาให้ AI coding agent ต้องจัดประเภทงานและวางแผนก่อนแก้โค้ด มีคำสั่งรีวิว รีวิวความปลอดภัย และเขียนเทสต์ พร้อมบันทึกข้อตกลงของทีม ใช้อยู่ใน e-Customs มากกว่า 5 repo และเพื่อนในทีมช่วยเพิ่มต่อ',
        en: 'Created Sage, an AI-agent protocol (classify and plan before code; review, security-review and test commands; binding decision records), rolled out across 5+ e-Customs repos and extended by teammates.'
      },
      {
        th: 'เป็นผู้รีวิวและ approve MR ของทีมประมาณ 10 คน merge งานของเพื่อนเข้า dev ไปแล้วราว 130 รายการ และเป็นคนเขียนหลักของชุดทดสอบ Playwright 275 เคสที่ใช้ในรอบ UAT พร้อมเครื่องมือ clone ข้อมูลทดสอบสำหรับทดสอบซ้ำ',
        en: 'Review and approve merge requests for a team of about 10 — about 130 teammates’ MRs merged into dev; main contributor to the 275-case Playwright suite used in UAT, plus a tool that clones test data for retests.'
      },
      {
        th: 'ดูแลระบบ SSO และ audit log ของการล็อกอิน (ไม่เก็บ token หรือข้อมูลส่วนบุคคลใน log) และตรวจยืนยันการแก้ไขตามผล pentest ของ e-Customs เฟส 1',
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
    when: { th: 'เม.ย. 2024 — มี.ค. 2026', en: 'Apr 2024 — Mar 2026' },
    role: { th: 'Full-Stack Developer', en: 'Full-Stack Developer' },
    org: { th: 'Chanwanich', en: 'Chanwanich' },
    kind: { th: 'งานประจำ · เว็บและแอปมือถือ', en: 'Full-time · web and mobile' },
    icon: 'compass',
    summary: {
      th: 'ทำเว็บและแอปมือถือด้วย React/Next.js, Flutter และ .NET ตั้งแต่เว็บสนามบินไปจนถึงแอปยืนยันตัวตนของภาครัฐ',
      en: 'Built web and mobile systems in React/Next.js, Flutter and .NET — from an airport website to a government identity app.'
    },
    highlights: [
      {
        th: 'ทำแอป Flutter ของ EEC ID (97% ของ commit) และ backend .NET ของแอป (92%) ให้แรงงานยืนยันตัวตนผ่านมือถือได้โดยไม่ต้องไปสำนักงาน ทั้งอ่านชิปหนังสือเดินทาง เทียบใบหน้า และล็อกอินเข้าแอปพันธมิตร ลูกค้าทดสอบและรับรองแล้ว (SIT และ UAT) รอเปิดใช้งานจริง',
        en: 'Built the EEC ID Flutter app (97% of commits) and its .NET backend (92%), letting workers verify their identity on a phone instead of at an office — ePassport chip reading, face match and sign-in for partner apps; signed off in SIT and UAT, ahead of launch.'
      },
      {
        th: 'ทำให้ล็อกอินจากแอปพันธมิตรด้วยการกดครั้งเดียวใช้ได้บน iPhone ซึ่ง cookie ข้ามแอปไม่ได้ ทดสอบมา 7 แนวทางก่อนเลือกวิธีที่ใช้',
        en: 'Got one-tap sign-in from partner apps working on iPhone, where cookies don’t carry across apps — tested 7 approaches before choosing one.'
      },
      {
        th: 'ย้ายการออกรายงานไปทำเป็น background process เพื่อแก้ปัญหา timeout',
        en: 'Moved report generation to background processing to fix timeouts.'
      },
      {
        th: 'ทำเว็บ Suvarnabhumi Airport Gate ด้วย Next.js และ .NET และวางโครงรายงาน export ด้วย FastReport ให้ทั้งทีมใช้แบบเดียวกัน',
        en: 'Built the Suvarnabhumi Airport Gate website (Next.js, .NET) and set up its FastReport export reports as a pattern the team followed.'
      }
    ],
    projects: ['eec-id', 'suvarnabhumi-airport-gate'],
    stack: ['Flutter', 'React', 'Next.js', '.NET / C#', 'PostgreSQL', 'FastReport']
  },
  {
    id: 'freelance',
    start: '2025-08',
    when: { th: 'ส.ค. 2025 — ปัจจุบัน', en: 'Aug 2025 — now' },
    role: { th: 'Freelance Full-Stack Developer', en: 'Freelance Full-Stack Developer' },
    org: { th: 'รับงานเอง', en: 'Independent' },
    kind: { th: 'ฟรีแลนซ์ · นอกเวลางาน', en: 'Freelance · outside working hours' },
    icon: 'compass',
    current: true,
    side: true,
    summary: {
      th: 'รับงานหลายแบบ ทั้งแพลตฟอร์มเว็บ ย้ายข้อมูลจากระบบเก่า ระบบสอบและอบรม และแอปอ่านหนังสือบนมือถือ ทำครบตั้งแต่ออกแบบฐานข้อมูลจนขึ้น production',
      en: 'Web platforms, legacy data migrations, exam and training systems and a mobile reading app — delivered end to end, from database design to production.'
    },
    highlights: [
      {
        th: 'ย้ายวารสารวิจัยของมหาวิทยาลัยขึ้นระบบใหม่ครบ 1,014 บทความ ไม่มีบทความไหนหาย ตรวจความครบถ้วนของข้อมูล 25 ข้อ เปิดใช้งานจริงเมื่อ พ.ย. 2026',
        en: 'Moved a university research journal to a new platform with nothing lost — 1,014 articles, checked by 25 integrity tests — live since Nov 2026.'
      },
      {
        th: 'ทำให้หน้ารายการบทความโหลดในราว 0.1 วินาทีแทน 41 วินาที โดยโหลดเฉพาะที่อยู่บนจอ (วัดจาก build จริงในเครื่อง)',
        en: 'Made the journal’s article list load in about 0.1 s instead of 41 s by loading only what’s on screen (measured on a production build).'
      },
      {
        th: 'ทดสอบโหลดระบบสอบด้วย k6 ก่อนเปิดใช้ เข้าพร้อมกัน 600 คนไม่มีข้อผิดพลาดเลย และเจอจุดที่ระบบรับไม่ไหวที่ 800 คน แจ้งลูกค้าก่อนวันสอบจริง',
        en: 'Load-tested an exam platform with k6 before launch: 0% errors at 600 concurrent users and a breaking point at 800, reported to the client before exam day.'
      },
      {
        th: 'จัดฐานข้อมูลงานวิจัยให้เรียบง่ายขึ้น จาก 90 ตารางเหลือ 72 และทำ index ครบทุกความเชื่อมโยง',
        en: 'Simplified a research database from 90 to 72 tables, with every foreign key indexed.'
      },
      {
        th: 'เขียนแอปอ่าน e-book ReadItGo เกือบทั้งหมด มีอ่านออกเสียงพร้อมไฮไลต์ทีละคำ และอ่านได้แม้ไม่มีเน็ต',
        en: 'Built most of the ReadItGo e-book app: word-by-word read-aloud and offline reading.'
      }
    ],
    projects: ['cmu-journal', 'cmu-research-gallery', 'ora-cmu', 'junior-bootcamp', 'readitgo'],
    stack: ['Next.js', 'NestJS', 'Express', 'Prisma', 'PostgreSQL', 'k6']
  },
  {
    id: 'products',
    start: '2026-01',
    when: { th: 'ม.ค. 2026 — ปัจจุบัน', en: 'Jan 2026 — now' },
    role: { th: 'Open-Source Developer', en: 'Open-Source Developer' },
    org: { th: 'โปรเจกต์ส่วนตัว', en: 'Personal projects' },
    kind: { th: 'โปรเจกต์ส่วนตัว · นอกเวลางาน', en: 'Personal projects · outside working hours' },
    icon: 'rocket',
    current: true,
    side: true,
    summary: {
      th: 'ทำและดูแลเครื่องมือโอเพนซอร์สสำหรับนักพัฒนาที่ตัวเองใช้ทุกวัน',
      en: 'Build and maintain open-source developer tools I use every day.'
    },
    highlights: [
      {
        th: 'Qorstack Report: API แปลง template Word/Excel เป็น PDF มี SDK บน NuGet และ npm ใช้ออกใบรับรองจริงในระบบ e-service ภาครัฐ (43 ดาวบน GitHub)',
        en: 'Qorstack Report: a Word/Excel-to-PDF document API with SDKs on NuGet and npm; renders certificates in a government e-service (43 GitHub stars).'
      },
      {
        th: 'Git Control for Orca: Git client ที่ทำ PR/MR และ pipeline ได้ทั้ง GitHub, GitLab และ Bitbucket วัดด้วย perf script ได้ git status จาก 162 เหลือราว 106 ms และมีคนนอกส่ง PR มา merge แล้ว',
        en: 'Git Control for Orca: PRs/MRs and pipelines for GitHub, GitLab and Bitbucket; checking changes about a third faster (162 → ~106 ms); outside pull requests merged.'
      },
      {
        th: 'Clipath: เครื่องมือจับภาพหน้าจอบน Windows (Rust/Tauri) ลด memory ตอน idle ของเวอร์ชันแรกของเราเองจาก 506 MB เหลือ 28 MB',
        en: 'Clipath: a Rust/Tauri capture tool for Windows; cut my own first build’s idle memory from 506 MB to 28 MB.'
      },
      { th: 'ปล่อยไปแล้ว 6 ตัว รวม 29 feature release', en: 'Six tools shipped, 29 feature releases.' }
    ],
    projects: ['git-control-orca', 'qorstack-report', 'scanhub', 'clipath', 'thai-pdf-fixer', 'sage'],
    stack: ['.NET', 'TypeScript', 'Rust (Tauri)', 'Python', 'Docker']
  },
  {
    id: 'intern',
    start: '2022-12',
    end: '2024-03',
    when: { th: 'ธ.ค. 2022 — มี.ค. 2024', en: 'Dec 2022 — Mar 2024' },
    role: { th: 'Junior Full-Stack Developer (ฝึกงาน)', en: 'Junior Full-Stack Developer (Internship)' },
    org: { th: 'Chanwanich', en: 'Chanwanich' },
    kind: { th: 'ฝึกงาน · ระหว่างเรียนปริญญาตรี', en: 'Internship · while finishing my degree' },
    icon: 'lantern',
    summary: {
      th: 'ทำเว็บด้วย React และ Node.js (Express) ออกแบบแพลตฟอร์มให้ผู้ใช้ค้นหา เปรียบเทียบ และติดต่อผู้ผลิตแบรนด์ OEM และดูแลเว็บโรงพยาบาลส่งเสริมสุขภาพตำบลกว่า 200 แห่งในจังหวัดลำปาง',
      en: 'Built websites with React and Node.js (Express), designed a platform where users browse, compare and contact OEM brand manufacturers, and kept 200+ sub-district hospital websites in Lampang running.'
    },
    highlights: [],
    projects: ['lampang-health-network'],
    stack: ['React', 'Node.js', 'Express']
  }
]

export const education = {
  when: { th: 'มี.ค. 2024', en: 'Mar 2024' },
  degree: { th: 'วท.บ. Digital Industry Integration', en: 'B.Sc. Digital Industry Integration' },
  school: { th: 'มหาวิทยาลัยเชียงใหม่ · เกียรตินิยมอันดับ 1', en: 'Chiang Mai University · First-class honours' }
}
