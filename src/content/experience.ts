/**
 * Work history for the Experience page. Dates and numbers come from the
 * résumé and the repos' commit history; nothing here is estimated.
 */
import type { L } from './types'

export type Role = {
  id: string
  when: L
  role: L
  org: string
  kind: L
  /** A PixelLab item from public/pixel/items. */
  icon: string
  summary: L
  highlights: L[]
  /** Case-study or product slugs shown as links under the role. */
  projects: string[]
  stack: string[]
  current?: boolean
}

export const roles: Role[] = [
  {
    id: 'chanwanich',
    when: { th: 'เม.ย. 2024 — ปัจจุบัน', en: 'Apr 2024 — now' },
    role: { th: 'Full-stack developer', en: 'Full-stack developer' },
    org: 'Chanwanich',
    kind: { th: 'งานประจำ · ระบบภาครัฐ', en: 'Full-time · government systems' },
    icon: 'laptop',
    current: true,
    summary: {
      th: 'ทำระบบให้หน่วยงานรัฐในเขตพัฒนาพิเศษภาคตะวันออก (EEC) ทั้งแอปมือถือ เว็บ และ service หลังบ้าน',
      en: 'Systems for government agencies in Thailand’s Eastern Economic Corridor — mobile app, web and back-end services.'
    },
    highlights: [
      {
        th: 'EEC ID: เขียนแอปมือถือ 486 จาก 502 commits — อ่านชิปหนังสือเดินทางด้วย NFC, เทียบใบหน้า และล็อกอินข้ามแอป',
        en: 'EEC ID: wrote 486 of the mobile app’s 502 commits — NFC passport reading, face match and app-to-app login'
      },
      {
        th: 'EEC e-Customs: ~1,550 commits ใน 10 repo และสร้าง schedule service ตั้งแต่ศูนย์',
        en: 'EEC e-Customs: ~1,550 commits across 10 repos, and built the schedule service from scratch'
      },
      {
        th: 'แก้ปัญหาชำระเงินซ้ำ เลขเอกสารชนกัน และ cache ค้าง พร้อมเพิ่ม test ทั้ง unit และ E2E',
        en: 'Fixed duplicate payments, colliding running numbers and stale cache, with unit and E2E tests added'
      }
    ],
    projects: ['eec-id', 'eec-e-customs', 'suvarnabhumi-airport-gate'],
    stack: ['Flutter', '.NET / C#', 'Next.js', 'PostgreSQL', 'RabbitMQ', 'Redis', 'Hangfire', 'Playwright']
  },
  {
    id: 'freelance',
    when: { th: 'ส.ค. 2025 — ปัจจุบัน', en: 'Aug 2025 — now' },
    role: { th: 'Full-stack developer ฟรีแลนซ์', en: 'Freelance full-stack developer' },
    org: 'Chiang Mai University · Engenius',
    kind: { th: 'ฟรีแลนซ์ · มหาวิทยาลัยและธุรกิจ', en: 'Freelance · universities and businesses' },
    icon: 'compass',
    current: true,
    summary: {
      th: 'รับทำระบบให้มหาวิทยาลัยเชียงใหม่และ Engenius ตั้งแต่ออกแบบฐานข้อมูลจนขึ้น production',
      en: 'Systems for Chiang Mai University and Engenius, from database design to production.'
    },
    highlights: [
      {
        th: 'CMU Journal: ย้ายวารสารครบ 1,014 บทความ ขึ้น production พ.ย. 2026',
        en: 'CMU Journal: moved all 1,014 articles to a new platform, live in Nov 2026'
      },
      {
        th: 'Junior Bootcamp: load test จนรู้ว่ารับสอบพร้อมกันได้ 600 คนก่อนวันจริง',
        en: 'Junior Bootcamp: load-tested to a known 600 concurrent exam-takers before exam day'
      },
      {
        th: 'ReadItGo: เขียนแอป 410 จาก 443 commits — อ่านออกเสียงพร้อมไฮไลต์ทีละคำ และอ่านออฟไลน์ได้',
        en: 'ReadItGo: wrote 410 of the app’s 443 commits — word-synced read-aloud and offline reading'
      }
    ],
    projects: ['cmu-journal', 'cmu-research-gallery', 'ora-cmu', 'junior-bootcamp', 'readitgo'],
    stack: ['Next.js', 'NestJS', 'Express', 'Prisma', 'PostgreSQL', 'k6']
  },
  {
    id: 'products',
    when: { th: 'ม.ค. 2026 — ปัจจุบัน', en: 'Jan 2026 — now' },
    role: { th: 'ผู้สร้างผลิตภัณฑ์', en: 'Product builder' },
    org: 'Git Control · Qorstack · ScanHub · Clipath',
    kind: { th: 'หลังเลิกงาน · โอเพนซอร์ส', en: 'After hours · open source' },
    icon: 'rocket',
    current: true,
    summary: {
      th: 'เครื่องมือสำหรับนักพัฒนาที่ใช้จริงทุกวัน ปล่อยเป็นโอเพนซอร์สหรือให้ดาวน์โหลด',
      en: 'Developer tools I use every day, released as open source or downloads.'
    },
    highlights: [
      { th: 'ปล่อยผลิตภัณฑ์ 6 ตัว รวม 29 feature release', en: '6 products shipped, 29 feature releases' },
      {
        th: 'Qorstack Report ได้ 43 ดาวบน GitHub และใช้ในระบบภาครัฐจริง',
        en: 'Qorstack Report: 43 GitHub stars, used in a real government e-service'
      },
      {
        th: 'Git Control for Orca: มีคนนอกส่ง PR เข้ามาและถูก merge แล้ว',
        en: 'Git Control for Orca: pull requests from outside contributors merged'
      }
    ],
    projects: ['git-control-orca', 'qorstack-report', 'scanhub', 'clipath', 'thai-pdf-fixer', 'sage'],
    stack: ['.NET', 'TypeScript', 'Rust (Tauri)', 'Python', 'Docker']
  },
  {
    id: 'intern',
    when: { th: 'ธ.ค. 2022 — มี.ค. 2024', en: 'Dec 2022 — Mar 2024' },
    role: { th: 'นักศึกษาฝึกงาน Full-stack', en: 'Full-stack intern' },
    org: 'Chanwanich',
    kind: { th: 'ฝึกงาน · ระบบสาธารณสุข', en: 'Internship · health systems' },
    icon: 'lantern',
    summary: {
      th: 'ดูแลเว็บโรงพยาบาลส่งเสริมสุขภาพตำบลกว่า 200 แห่งในจังหวัดลำปาง',
      en: 'Kept 200+ sub-district hospital websites in Lampang running.'
    },
    highlights: [],
    projects: ['lampang-health-network'],
    stack: []
  }
]

export const education = {
  when: { th: 'มี.ค. 2024', en: 'Mar 2024' },
  degree: { th: 'ปริญญาตรี Digital Industry Integration', en: 'B.Sc. Digital Industry Integration' },
  school: { th: 'มหาวิทยาลัยเชียงใหม่ · เกียรตินิยมอันดับ 1', en: 'Chiang Mai University · First-class honors' }
}
