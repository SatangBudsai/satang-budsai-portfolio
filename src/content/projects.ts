import { galleries } from './galleries'
import { stories } from './stories'
import type { CaseStudy, Product, Project } from './types'

const browser = 'browser' as const

export const products: Product[] = [
  {
    kind: 'product',
    slug: 'git-control-orca',
    title: 'Git Control for Orca',
    category: { th: 'ปลั๊กอิน Git', en: 'Git plugin' },
    version: 'v0.12.1',
    tagline: {
      th: 'Git ทั้งหมด รวม PR/MR และ pipeline อยู่ใน editor เดียว ใช้งานจริงทุกวัน',
      en: 'All of Git — PRs, MRs and pipelines included — inside the editor. In daily use.'
    },
    summary: {
      th: 'Git client ใน Orca: commit graph, commit, branch, stash, merge request และ pipeline ของ GitHub และ GitLab อยู่ในแท็บเดียวกับโค้ด ใช้ได้ทั้งโปรเจกต์ในเครื่องและบน server ผ่าน SSH ใช้ git และบัญชี Git ที่มีอยู่แล้ว ไม่ต้องสร้าง token',
      en: 'A Git client inside Orca: the commit graph, commits, branches, stashes, merge requests and pipelines for GitHub and GitLab, in the same tab as your code — for projects on your machine and on SSH servers. It uses your installed git and the login you already have, so there are no tokens to create.'
    },
    facts: [
      {
        value: 'PR + MR',
        label: { th: 'รีวิว อนุมัติ และ merge ได้จากใน editor', en: 'review, approve and merge from the editor' }
      },
      {
        value: 'Queue',
        label: { th: 'merge หลาย MR ต่อคิวใน background', en: 'merges several MRs in the background' }
      },
      { value: 'SSH', label: { th: 'ใช้กับโปรเจกต์บน server ได้', en: 'works with projects on servers' } },
      { value: '0', label: { th: 'token ที่ต้องสร้างเพิ่ม', en: 'tokens to create' } }
    ],
    why: {
      th: 'งานรีวิวและ merge ทำให้ต้องสลับไปมาระหว่าง editor กับเว็บ GitHub/GitLab ตลอด Git Control ย้ายทุกอย่างมาไว้ข้างโค้ด ตั้งแต่ดูประวัติ commit ไปจนถึงกด merge เมื่อ pipeline ผ่าน',
      en: 'Reviewing and merging meant bouncing between the editor and GitHub or GitLab all day. Git Control brings it next to the code — from reading history to merging when the pipeline passes.'
    },
    features: [
      {
        title: { th: 'รีวิว MR/PR เหมือนอยู่บน GitLab', en: 'Review MRs and PRs like on GitLab' },
        body: {
          th: 'อ่านคำอธิบาย ผู้รีวิว การอนุมัติ คอมเมนต์ในโค้ด และ pipeline แล้วกด Approve หรือ Merge ได้ทันที มีปุ่ม Explain และ AI review',
          en: 'Description, reviewers, approvals, inline comments and the pipeline — then Approve or Merge right there, with Explain and AI review.'
        },
        media: {
          kind: 'image',
          src: '/work/orca-git/mr.webp',
          width: 1440,
          height: 900,
          alt: { th: 'หน้ารายละเอียด merge request', en: 'A merge request’s detail page' },
          frame: 'browser'
        }
      },
      {
        title: { th: 'Merge queue ที่ไม่ชนกัน', en: 'A merge queue that never collides' },
        body: {
          th: 'เลือกหลาย MR แล้วกด Approve & merge ระบบ merge ให้ทีละตัวในแต่ละโปรเจกต์ และ rebase ให้เมื่อ GitLab ต้องการ',
          en: 'Tick several MRs and Approve & merge: they go one at a time per project, rebasing when GitLab asks, while you keep working.'
        }
      },
      {
        title: { th: 'pipeline ทุก branch ในหน้าเดียว', en: 'Every branch’s pipeline on one page' },
        body: {
          th: 'ดูสถานะ commit คนเริ่ม และทุก stage ของ pipeline บน GitHub และ GitLab',
          en: 'Status, commit, who started it and every stage, for GitHub and GitLab.'
        },
        media: {
          kind: 'image',
          src: '/work/orca-git/pipelines.webp',
          width: 1440,
          height: 900,
          alt: { th: 'หน้ารวม pipeline', en: 'The pipelines page' },
          frame: 'browser'
        }
      },
      {
        title: { th: 'ตรวจก่อน commit', en: 'A second look before each commit' },
        body: {
          th: 'เตือนเมื่อมีไฟล์ secret, token หรือ key ไฟล์ใหญ่มาก หรือ commit ตรงเข้า main และให้ AI ช่วยร่างข้อความ commit',
          en: 'Flags secrets, tokens or keys, very big files and commits straight to main — and AI drafts the message.'
        }
      }
    ],
    how: {
      title: { th: 'ใช้ git ที่มีอยู่ ไม่ต้องตั้งค่าใหม่', en: 'Your git, your login. Nothing new to set up.' },
      steps: [
        { th: 'ติดตั้งจาก plugin marketplace ของ Orca', en: 'Install from Orca’s plugin marketplace' },
        { th: 'เปิดโปรเจกต์ Git ในเครื่องหรือบน SSH', en: 'Open a Git project, local or over SSH' },
        {
          th: 'ล็อกอินด้วยบัญชี Git, gh หรือ glab ที่มีอยู่',
          en: 'Sign in with the Git login, gh or glab you already have'
        },
        {
          th: 'รีวิว merge และดู pipeline โดยไม่ออกจาก editor',
          en: 'Review, merge and watch pipelines without leaving the editor'
        }
      ],
      media: {
        kind: 'image',
        src: '/work/orca-git/repos.webp',
        width: 1440,
        height: 900,
        alt: { th: 'หน้ารวม repository ทั้งหมด', en: 'All repositories on one page' },
        frame: 'browser'
      }
    },
    role: {
      th: 'ทำคนเดียวทั้งหมด: ออกแบบ, ปลั๊กอิน, worker และชุดทดสอบ',
      en: 'Solo — design, the plugin, its worker and the test harness'
    },
    stage: {
      tone: '#8f7cff',
      chips: ['PR · MR', 'GitHub + GitLab', 'SSH'],
      main: {
        kind: 'image',
        src: '/work/orca-git/cover.webp',
        width: 1600,
        height: 1000,
        alt: { th: 'Git Control for Orca', en: 'Git Control for Orca' },
        frame: 'none'
      },
      float: {
        kind: 'image',
        src: '/work/orca-git/icon.webp',
        width: 256,
        height: 256,
        alt: { th: 'ไอคอน Git Control', en: 'Git Control icon' },
        tile: true
      }
    },
    stack: ['JavaScript', 'Node worker', 'Orca plugin API', 'GitHub API', 'GitLab API', 'SSH'],
    links: [{ label: { th: 'GitHub', en: 'GitHub' }, href: 'https://github.com/SatangBudsai/orca-git-extension' }],
    cover: {
      kind: 'image',
      src: '/work/orca-git/cover.webp',
      width: 1600,
      height: 1000,
      alt: { th: 'Git Control for Orca', en: 'Git Control for Orca' },
      frame: 'none'
    }
  },
  {
    kind: 'product',
    slug: 'qorstack-report',
    title: 'Qorstack Report',
    category: { th: 'เครื่องสร้างเอกสาร', en: 'Document engine' },
    version: 'v2.4',
    tagline: {
      th: 'ใส่ template ได้เอกสาร เปลี่ยน Word/Excel template กับข้อมูลให้เป็น PDF, Word หรือ Excel ผ่าน API เดียว',
      en: 'Templates in, documents out. Word/Excel templates plus data become PDF, Word or Excel through one API.'
    },
    summary: {
      th: 'ออกแบบเอกสารใน Word หรือ Excel ส่ง JSON เข้ามาที่ endpoint เดียว แล้วได้ไฟล์ PDF, DOCX หรือ XLSX กลับไป จะติดตั้งบน server ของตัวเองหรือใช้แบบ cloud ก็ได้ มี SDK สำหรับ Node และ .NET และมี MCP server ให้ AI agent เรียกใช้',
      en: 'Design documents in Word or Excel, send JSON to one endpoint, and get a finished PDF, DOCX or XLSX back — self-hosted or in the cloud, with Node and .NET SDKs and an MCP server for AI agents.'
    },
    facts: [
      { value: '3', label: { th: 'รูปแบบไฟล์: PDF · DOCX · XLSX', en: 'output formats: PDF · DOCX · XLSX' } },
      { value: '2', label: { th: 'SDK ทางการ: Node และ .NET', en: 'official SDKs: Node and .NET' } },
      {
        value: 'MCP',
        label: { th: 'server ให้ AI agent สร้างเอกสารได้เอง', en: 'server so AI agents can render documents' }
      },
      {
        value: 'Gov',
        label: { th: 'ใช้ออกใบรับรองในระบบ e-service ภาครัฐ', en: 'renders certificates in a government e-service' }
      }
    ],
    why: {
      th: 'ระบบธุรกิจส่วนใหญ่ต้องออกเอกสาร และหน้าตาเอกสารมักถูกเขียนฝังไว้ในโค้ด Qorstack Report ให้คนที่ใช้ Word เป็นคนออกแบบหน้าตาเอง ส่วนนักพัฒนาแค่ส่งข้อมูลเข้ามา',
      en: 'Most business systems have to produce documents, and the layout usually ends up hard-coded. Qorstack Report lets whoever knows Word own the layout — developers only send data.'
    },
    features: [
      {
        title: { th: 'ต่อ API ได้ในไม่กี่นาที', en: 'Wire up the API in minutes' },
        body: {
          th: 'ทุก template มีโค้ดตัวอย่างพร้อมคัดลอก ทั้ง cURL, Node.js และ .NET ใส่ API key ส่ง JSON แล้วได้ไฟล์กลับไป มี SDK แบบมี type ที่สร้างจาก OpenAPI และ MCP server ให้ AI agent เรียกใช้เอง',
          en: 'Every template comes with copy-ready code for cURL, Node.js and .NET: add your API key, send JSON, get the file back. Typed SDKs generated from the OpenAPI spec, and an MCP server for AI agents.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/api.webp',
          width: 1440,
          height: 900,
          alt: { th: 'โค้ดเรียก API แบบ cURL, Node.js และ .NET', en: 'API calls in cURL, Node.js and .NET' },
          frame: browser
        }
      },
      {
        title: { th: 'หน้ากด Generate ที่เห็นผลทันที', en: 'A generate page with a live preview' },
        body: {
          th: 'ระบบอ่านช่อง {{placeholder}} จากไฟล์ Word ให้เอง กรอกค่า ตาราง รูป QR และบาร์โค้ด แล้วกด Generate PDF ดูผลข้าง ๆ ได้เลย ก่อนเขียนโค้ดสักบรรทัด',
          en: 'It reads the {{placeholders}} from your Word file, you fill in values, tables, images, QR codes and barcodes, press Generate PDF and see the result beside it — before writing a line of code.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/demo.webp',
          width: 1280,
          height: 720,
          animated: true,
          alt: { th: 'กรอกข้อมูลแล้วกด Generate PDF', en: 'Filling fields and pressing Generate PDF' },
          frame: browser
        }
      },
      {
        title: { th: 'ออกแบบใน Word เรียก API ได้เอกสาร', en: 'Design in Word, call the API, get the document' },
        body: {
          th: 'Template คือไฟล์ Word/Excel ธรรมดา เรนเดอร์ด้วย OpenXML/ClosedXML และแปลงเป็น PDF ผ่าน Gotenberg หน้าตาจึงตรงกับต้นฉบับ',
          en: 'Templates are plain Word/Excel files, rendered with OpenXML/ClosedXML and converted through Gotenberg, so the output matches the original.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/design-api.webp',
          width: 1280,
          height: 720,
          alt: { th: 'template Word คู่กับโค้ดเรียก API', en: 'A Word template next to the API call' },
          frame: browser
        }
      },
      {
        title: { th: 'ติดตั้งเองด้วย compose ไฟล์เดียว', en: 'Self-host with one compose file' },
        body: {
          th: 'ข้อมูลเอกสารอยู่ในเครือข่ายของคุณ ใช้ storage แบบ S3 ตัวไหนก็ได้ มี API key แยกตามโปรเจกต์ และเก็บประวัติการสร้างเอกสาร',
          en: 'Documents stay in your network: any S3-compatible storage, API keys per project, and a history of every render.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/selfhost.webp',
          width: 1440,
          height: 900,
          alt: { th: 'คำสั่งติดตั้งแบบ self-host', en: 'The self-host install commands' },
          frame: browser
        }
      },
      {
        title: { th: 'งานใหญ่ส่งเป็น job', en: 'Big jobs run async' },
        body: {
          th: 'เรียกแบบรอผลหรือส่งเป็น job แล้วรับ webhook ที่มีลายเซ็นเมื่อเสร็จ ลิงก์ดาวน์โหลดมีลายเซ็นและหมดอายุได้ ไม่เปิด S3 ตรง ๆ',
          en: 'Call it synchronously or as a job with a signed webhook; download links are signed and time-limited, so S3 is never exposed.'
        }
      },
      {
        title: { th: 'เอกสารครบตั้งแต่เริ่ม', en: 'Docs from day one' },
        body: {
          th: 'Quick start, ตัวแปร, ตาราง, รูป, QR, บาร์โค้ด และการตั้งค่าไฟล์ มีตัวอย่าง request พร้อมคัดลอกทุกหัวข้อ',
          en: 'Quick start, variables, tables, images, QR codes, barcodes and file settings — each with a copy-ready request.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/docs.webp',
          width: 1440,
          height: 900,
          alt: { th: 'หน้าเอกสาร Quick start', en: 'The quick start docs' },
          frame: browser
        }
      }
    ],
    how: {
      title: { th: 'ส่ง template กับ JSON ได้เอกสารกลับไป', en: 'Template + JSON in. Document out.' },
      steps: [
        { th: 'อัปโหลด template ที่ทำใน Word หรือ Excel', en: 'Upload a template made in Word or Excel' },
        { th: 'คัดลอกโค้ดของ template นั้นไปวางในแอปของคุณ', en: 'Copy that template’s request into your app' },
        { th: 'ส่ง JSON ผ่าน REST, SDK หรือ MCP', en: 'Send JSON over REST, an SDK or MCP' },
        { th: 'ได้ลิงก์ดาวน์โหลดแบบมีลายเซ็น หรือ webhook', en: 'Get a signed download link — or a webhook' }
      ],
      media: {
        kind: 'image',
        src: '/work/qorstack-report/how.webp',
        width: 1440,
        height: 700,
        alt: { th: 'ขั้นตอน: อัปโหลด template ส่ง JSON ได้ไฟล์', en: 'Upload a template, send JSON, get the file' },
        frame: browser
      }
    },
    role: {
      th: 'ทำคนเดียวทั้งหมด: ออกแบบผลิตภัณฑ์, API, หน้าเว็บ, SDK และ DevOps',
      en: 'Solo — product, API, web app, SDKs and DevOps'
    },
    stage: {
      tone: '#ff7a45',
      chips: ['Generate PDF', 'cURL · Node · .NET', 'MCP'],
      main: {
        kind: 'image',
        src: '/work/qorstack-report/generate.webp',
        width: 1280,
        height: 720,
        alt: { th: 'หน้ากด Generate PDF ของ Qorstack Report', en: 'The Qorstack Report generate page' },
        frame: 'browser'
      },
      float: {
        kind: 'image',
        src: '/work/qorstack-report/api-code.webp',
        width: 720,
        height: 452,
        alt: { th: 'โค้ดเรียก API ด้วย cURL', en: 'The API call in cURL' },
        frame: 'none'
      }
    },
    stack: ['.NET 10', 'Clean Architecture', 'MediatR', 'EF Core', 'PostgreSQL', 'Gotenberg', 'S3', 'Next.js 16'],
    links: [
      { label: { th: 'เว็บไซต์', en: 'Website' }, href: 'https://report.qorstack.com' },
      { label: { th: 'GitHub', en: 'GitHub' }, href: 'https://github.com/qorstack/qorstack-report' }
    ],
    cover: {
      kind: 'image',
      src: '/work/qorstack-report/overview.webp',
      width: 1280,
      height: 720,
      animated: true,
      alt: { th: 'ภาพรวมการใช้งาน Qorstack Report', en: 'Qorstack Report overview' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'scanhub',
    title: 'ScanHub',
    category: { th: 'DevSecOps', en: 'DevSecOps' },
    version: 'v1.2',
    tagline: {
      th: 'ผลสแกนความปลอดภัยทุกเครื่องมือ สรุปเป็นคำตอบเดียว ใช้ scanner 7 ตัวใน container เดียว',
      en: 'Every security scanner, one verdict. Seven scanners in one container.'
    },
    summary: {
      th: 'รวมผลจาก SonarQube, Trivy, Semgrep, Gitleaks, Grype, Checkov และ OWASP Dependency-Check ไว้ที่เดียว จัดตามโปรเจกต์และ repo รวมผลทุกเครื่องมือเป็นรายการเดียว แล้วเทียบกับการสแกนครั้งก่อน จะได้เห็นทันทีว่าปัญหาไหนใหม่ และปัญหาไหนแก้แล้ว',
      en: 'Results from SonarQube, Trivy, Semgrep, Gitleaks, Grype, Checkov and OWASP Dependency-Check in one place, organised by project and repo, merged into one list and compared with the previous scan — so you see what is new and what got fixed.'
    },
    facts: [
      { value: '7', label: { th: 'scanner รวมใน container เดียว', en: 'scanners in one container' } },
      { value: '1', label: { th: 'ไฟล์สำหรับติดตั้ง: docker-compose.yml', en: 'file to install: docker-compose.yml' } },
      { value: '6', label: { th: 'แพลตฟอร์ม CI ที่รองรับ', en: 'CI platforms supported' } },
      { value: 'arm64', label: { th: 'และ amd64 บน GHCR', en: 'and amd64 images on GHCR' } }
    ],
    why: {
      th: 'Scanner แต่ละตัวมีหน้าจอของตัวเองและรูปแบบผลลัพธ์ของตัวเอง ScanHub รวมทุกอย่างไว้ที่เดียว แล้วให้ pipeline ถามแค่คำถามเดียว: ผ่านหรือไม่ผ่าน',
      en: 'Every scanner has its own dashboard and its own format. ScanHub puts them in one place and lets the pipeline ask a single question: pass or block?'
    },
    features: [
      {
        title: { th: 'ตั้งค่า CI ในคลิกเดียว', en: 'One-click CI setup' },
        body: {
          th: 'สำหรับ GitHub และ GitLab ScanHub ตั้ง secret และเปิด Pull Request สำหรับตั้งค่าให้เอง แพลตฟอร์มอื่นได้ snippet พร้อมคัดลอก',
          en: 'For GitHub and GitLab, ScanHub sets the secret and opens the setup Pull Request itself. Other platforms get a ready-made snippet.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/auto-setup.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: {
            th: 'ScanHub เปิด Pull Request ตั้งค่า CI ให้อัตโนมัติ',
            en: 'ScanHub opening a CI setup pull request'
          },
          frame: browser
        }
      },
      {
        title: { th: 'บล็อก pipeline หรือแค่รายงาน', en: 'Block or just report' },
        body: {
          th: 'เปลี่ยนโหมดได้ใน ScanHub โดยไม่ต้องแก้ pipeline',
          en: 'Change the gate in ScanHub — no pipeline edit.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/ci-gate.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { th: 'การตั้งค่า CI gate ใน ScanHub', en: 'CI gate settings in ScanHub' },
          frame: browser
        }
      },
      {
        title: { th: 'อะไรใหม่ อะไรแก้แล้ว', en: 'New vs fixed' },
        body: {
          th: 'เก็บประวัติทุกการสแกน และเทียบกับครั้งก่อนเสมอ',
          en: 'Every scan kept in history and diffed against the last.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/history.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { th: 'ประวัติการสแกนใน ScanHub', en: 'Scan history in ScanHub' },
          frame: browser
        }
      },
      {
        title: { th: 'รายงานพร้อมส่งลูกค้า', en: 'Client-ready reports' },
        body: {
          th: 'Export เป็น PDF หรือ HTML และแชร์ลิงก์แบบตั้งรหัสผ่านได้',
          en: 'PDF or HTML export, and password-protected share links.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/report-export.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { th: 'การ export รายงานใน ScanHub', en: 'Exporting a report in ScanHub' },
          frame: browser
        }
      }
    ],
    how: {
      title: { th: 'CI ส่งแค่ซอร์สโค้ด ที่เหลือ ScanHub ทำให้', en: 'CI uploads source. ScanHub does the rest.' },
      steps: [
        { th: 'Pipeline ส่งไฟล์ซอร์สโค้ดเข้ามา', en: 'The pipeline sends the source archive' },
        { th: 'Scanner ทุกตัวรันใน container เดียว', en: 'All scanners run inside one container' },
        {
          th: 'รวมผล ตัดรายการซ้ำ และเทียบกับการสแกนครั้งก่อน',
          en: 'Findings merged, de-duplicated, diffed with the last scan'
        },
        { th: 'ส่งผล ผ่าน หรือ บล็อก กลับไปที่ pipeline', en: 'Pass or block goes back to the pipeline' }
      ],
      media: {
        kind: 'image',
        src: '/work/scanhub/architecture.webp',
        width: 1100,
        height: 619,
        animated: true,
        alt: { th: 'สถาปัตยกรรมของ ScanHub', en: 'ScanHub architecture' }
      }
    },
    role: {
      th: 'ทำคนเดียวทั้งหมด: ผลิตภัณฑ์, หลังบ้าน, หน้าบ้าน และ DevOps',
      en: 'Solo — product, backend, frontend and DevOps'
    },
    stage: {
      tone: '#6f9bff',
      chips: ['7 scanners', '1 container', 'CI gate'],
      main: {
        kind: 'image',
        src: '/work/scanhub/banner.webp',
        width: 1600,
        height: 800,
        alt: { th: 'แดชบอร์ดความปลอดภัย ScanHub', en: 'ScanHub security dashboard' },
        frame: 'none'
      },
      float: {
        kind: 'image',
        src: '/work/scanhub/results.webp',
        width: 1280,
        height: 800,
        animated: true,
        alt: { th: 'หน้าสรุปผลสแกนของ ScanHub', en: 'ScanHub results overview' },
        frame: 'browser'
      }
    },
    stack: ['Node 22', 'Express', 'PostgreSQL', 'Docker', 'GHCR', 'Playwright'],
    links: [{ label: { th: 'GitHub', en: 'GitHub' }, href: 'https://github.com/SatangBudsai/scanhub' }],
    cover: {
      kind: 'image',
      src: '/work/scanhub/results.webp',
      width: 1280,
      height: 800,
      animated: true,
      alt: { th: 'หน้าสรุปผลสแกนของ ScanHub', en: 'ScanHub results overview' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'clipath',
    title: 'Clipath',
    category: { th: 'แอปเดสก์ท็อป', en: 'Desktop utility' },
    version: 'v1.0',
    tagline: {
      th: 'จับภาพ เขียนโน้ต แล้ววาง path ได้ทันที โปรแกรม screenshot บน Windows สำหรับคนที่ทำงานกับ AI CLI',
      en: 'Capture. Annotate. Paste the path. A Windows screenshot tool for AI-CLI workflows.'
    },
    summary: {
      th: 'ทุกภาพที่จับจะบันทึกลงโฟลเดอร์ที่เลือกไว้อัตโนมัติ และคัดลอก path ของไฟล์ไว้ในคลิปบอร์ดทันที พร้อมวางใน Claude Code, Codex CLI, terminal, IDE หรือ issue tracker',
      en: 'Every capture is saved to a folder you choose and its file path is copied instantly — ready to paste into Claude Code, Codex CLI, terminals, IDEs and issue trackers.'
    },
    facts: [
      { value: '~180 ms', label: { th: 'จากกดคีย์ลัดถึงเลือกพื้นที่', en: 'from shortcut to selection' } },
      { value: '26 MB', label: { th: 'หน่วยความจำตอนไม่ได้ใช้งาน', en: 'memory while idle' } },
      { value: '0%', label: { th: 'CPU ตอนไม่ได้ใช้งาน', en: 'CPU while idle' } },
      { value: 'Multi-DPI', label: { th: 'ครอปแม่นข้ามจอที่ DPI ต่างกัน', en: 'accurate crops across monitors' } }
    ],
    why: {
      th: 'การทำงานกับ AI coding agent ต้องส่งภาพหน้าจอให้ดูบ่อยมาก และทุกครั้งต้องเปิด Explorer หาไฟล์ที่เพิ่งจับไว้ Clipath ทำให้ทั้งหมดนี้จบในคีย์ลัดเดียว',
      en: 'Working with AI coding agents means handing them screenshots constantly — and hunting through Explorer for the file you just took. Clipath makes it one keystroke.'
    },
    features: [
      {
        title: { th: 'เขียนโน้ตบนภาพได้ทันที', en: 'Annotate in place' },
        body: {
          th: 'มีเบลอ, pixelate, ตัวเลขลำดับขั้นตอน และ eyedropper เขียนด้วย Konva',
          en: 'Blur, pixelate, step counters and an eyedropper, built on Konva.'
        }
      },
      {
        title: { th: 'เร็วตั้งแต่เริ่มกด', en: 'Fast from the first keystroke' },
        body: {
          th: 'เตรียม WebView ไว้ล่วงหน้าระหว่างใช้งาน และคืนหน่วยความจำเมื่อไม่ได้ใช้ 10 นาที',
          en: 'WebViews stay warm while you capture and are released after 10 idle minutes.'
        }
      },
      {
        title: { th: 'Build เล็กด้วย Rust', en: 'Small Rust build' },
        body: {
          th: 'ใช้ xcap จับภาพ ใช้ arboard จัดการคลิปบอร์ด และใช้ Windows API โดยตรง',
          en: 'xcap for capture, arboard for the clipboard, the Windows API directly.'
        }
      }
    ],
    how: {
      title: { th: 'กดคีย์ลัด ได้ path ในคลิปบอร์ด', en: 'Shortcut in. Path on the clipboard.' },
      steps: [
        { th: 'กดคีย์ลัดแล้วลากเลือกพื้นที่', en: 'Press the shortcut and drag a region' },
        { th: 'เขียนโน้ตบนภาพถ้าต้องการ', en: 'Annotate if you need to' },
        { th: 'ภาพถูกบันทึกลงโฟลเดอร์ของคุณ', en: 'The capture is saved to your folder' },
        { th: 'วาง path ใน prompt ได้ทันที', en: 'Paste the path into your prompt' }
      ],
      media: {
        kind: 'image',
        src: '/work/clipath/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'หน้าเว็บ Clipath', en: 'Clipath website' },
        frame: browser
      }
    },
    role: {
      th: 'ทำคนเดียวทั้งหมด: ออกแบบ, Rust, UI และเว็บไซต์',
      en: 'Solo — design, Rust, UI and the website'
    },
    stage: {
      tone: '#67e8f9',
      chips: ['~180 ms', '26 MB idle', 'Windows'],
      main: {
        kind: 'image',
        src: '/work/clipath/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'หน้าเว็บ Clipath', en: 'Clipath website' },
        frame: 'browser'
      },
      float: {
        kind: 'image',
        src: '/work/clipath/logo.webp',
        width: 1254,
        height: 1254,
        alt: { th: 'ไอคอนแอป Clipath', en: 'Clipath app icon' },
        tile: true
      }
    },
    stack: ['Tauri 2', 'Rust', 'React 18', 'Konva', 'Windows API'],
    links: [
      { label: { th: 'เว็บไซต์', en: 'Website' }, href: 'https://clipath.qorstack.com' },
      { label: { th: 'ดาวน์โหลด', en: 'Download' }, href: 'https://github.com/qorstack/clipath/releases/latest' },
      { label: { th: 'GitHub', en: 'GitHub' }, href: 'https://github.com/qorstack/clipath' }
    ],
    cover: {
      kind: 'image',
      src: '/work/clipath/site.webp',
      width: 1440,
      height: 900,
      alt: { th: 'หน้าเว็บ Clipath', en: 'Clipath website' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'thai-pdf-fixer',
    title: 'Thai PDF Fixer',
    category: { th: 'การเข้าถึง', en: 'Accessibility' },
    version: 'v1.2',
    tagline: {
      th: 'ทำให้ PDF ภาษาไทยที่ตัวอักษรเพี้ยนกลับมาอ่านได้ สำหรับผู้พิการทางสายตาที่ใช้ NVDA และ JAWS',
      en: 'Broken Thai PDFs, readable again — for blind users on NVDA and JAWS.'
    },
    summary: {
      th: 'แปลงไฟล์ PDF ภาษาไทยที่ตัวอักษรเพี้ยนให้เป็นไฟล์ Word ที่โปรแกรมอ่านหน้าจออ่านได้ถูกต้อง ใช้คีย์บอร์ดได้ทุกขั้นตอน ทุกขั้นตอนมีเสียงบอก และรวม Python มาในตัวติดตั้งแล้ว ไม่ต้องติดตั้งอะไรเพิ่ม',
      en: 'Turns Thai PDFs with broken text into Word files that screen readers read correctly. Every step works from the keyboard and is announced, and Python is bundled — nothing else to install.'
    },
    facts: [
      { value: '100%', label: { th: 'ใช้ได้ด้วยคีย์บอร์ด', en: 'keyboard operable' } },
      { value: 'NVDA', label: { th: 'และ JAWS อ่านทุกขั้นตอนให้ฟัง', en: 'and JAWS announce every step' } },
      { value: '0', label: { th: 'โปรแกรมที่ต้องติดตั้งเพิ่ม', en: 'extra things to install' } },
      { value: 'Auto', label: { th: 'อัปเดตตัวเอง', en: 'updates itself' } }
    ],
    why: {
      th: 'PDF ภาษาไทยจำนวนมากเก็บตัวอักษรผิดลำดับ ตาเห็นปกติ แต่โปรแกรมอ่านหน้าจออ่านออกมาเป็นคำที่ไม่มีความหมาย โปรแกรมนี้ซ่อมข้อความให้ก่อนถึงมือผู้ใช้',
      en: 'Many Thai PDFs store characters in the wrong order: they look fine but a screen reader reads gibberish. This repairs the text before it reaches the user.'
    },
    features: [
      {
        title: { th: 'ซ่อมสระและวรรณยุกต์', en: 'Repairs vowels and tone marks' },
        body: {
          th: 'แก้สระอำและตำแหน่งวรรณยุกต์ที่เพี้ยน และใช้ PyThaiNLP ช่วยตัดคำ',
          en: 'Fixes split sara am and misplaced tone marks, with PyThaiNLP for word boundaries.'
        },
        media: {
          kind: 'diagram',
          id: 'pdf-fixer',
          alt: { th: 'ตัวอย่างข้อความก่อนและหลังแก้', en: 'Text before and after the fix' }
        }
      },
      {
        title: { th: 'เก็บตารางและรูปไว้ครบ', en: 'Keeps tables and images' },
        body: {
          th: 'ดึงตารางและรูปภาพจาก PDF ไปใส่ในไฟล์ Word ด้วย',
          en: 'Tables and images come across into the Word file too.'
        }
      },
      {
        title: { th: 'ออกแบบสำหรับโปรแกรมอ่านหน้าจอ', en: 'Built for screen readers' },
        body: {
          th: 'ทุกขั้นตอนประกาศสถานะ และมีเสียงแจ้งเมื่อสำเร็จหรือผิดพลาด',
          en: 'Each step is announced, with sounds for success and errors.'
        }
      }
    ],
    how: {
      title: { th: 'PDF ที่เพี้ยนเข้า Word ที่อ่านได้ออก', en: 'Broken PDF in. Readable Word out.' },
      steps: [
        { th: 'เลือกไฟล์ PDF ด้วยคีย์บอร์ด', en: 'Pick a PDF with the keyboard' },
        {
          th: 'ดึงข้อความ ตาราง และรูปด้วย PyMuPDF และ pdfplumber',
          en: 'Text, tables and images extracted with PyMuPDF and pdfplumber'
        },
        { th: 'ซ่อมลำดับตัวอักษรไทย', en: 'Thai character order repaired' },
        { th: 'บันทึกเป็น .docx แล้วโปรแกรมอ่านหน้าจอแจ้งผล', en: 'Saved as .docx, announced by the screen reader' }
      ]
    },
    role: {
      th: 'ทำคนเดียวทั้งหมด: ออกแบบ, Python pipeline และแอป Tauri',
      en: 'Solo — design, the Python pipeline and the Tauri app'
    },
    stage: {
      tone: '#f5c033',
      chips: ['NVDA', 'JAWS', '100% keyboard'],
      main: {
        kind: 'diagram',
        id: 'pdf-fixer',
        alt: { th: 'ข้อความภาษาไทยก่อนและหลังแก้', en: 'Thai text before and after the fix' }
      },
      float: {
        kind: 'image',
        src: '/work/thai-pdf-fixer/logo.webp',
        width: 512,
        height: 512,
        alt: { th: 'ไอคอนแอป Thai PDF Fixer', en: 'Thai PDF Fixer app icon' },
        tile: true
      }
    },
    stack: ['Tauri', 'Next.js', 'Python', 'PyMuPDF', 'pdfplumber', 'PyThaiNLP', 'python-docx'],
    links: [
      {
        label: { th: 'ดาวน์โหลด', en: 'Download' },
        href: 'https://github.com/SatangBudsai/thai-pdf-fixer-for-the-blind/releases/latest'
      },
      { label: { th: 'GitHub', en: 'GitHub' }, href: 'https://github.com/SatangBudsai/thai-pdf-fixer-for-the-blind' }
    ],
    cover: {
      kind: 'diagram',
      id: 'pdf-fixer',
      alt: { th: 'ข้อความภาษาไทยก่อนและหลังแก้', en: 'Thai text before and after the fix' }
    }
  },
  {
    kind: 'product',
    slug: 'sage',
    title: 'Sage',
    category: { th: 'ชุดกติกาสำหรับ AI agent', en: 'AI agent ruleset' },
    version: 'v1.9',
    tagline: {
      th: 'ทำให้ AI เขียนโค้ดเหมือน senior dev ที่เก่งที่สุดในทีม ด้วยคำถาม 4 ข้อก่อนแก้โค้ดทุกครั้ง',
      en: 'Make your AI code like your most senior dev — four questions before every change.'
    },
    summary: {
      th: 'protocol แบบไฟล์ Markdown ที่ coding agent อ่านก่อนลงมือ: จำเป็นไหม อยู่ได้นานไหม ปลอดภัยไหม และตกลงกันไว้แล้วหรือยัง ติดตั้งด้วยคำสั่งเดียว ใช้ได้กับ agent หลายเจ้า',
      en: 'A plain-Markdown protocol coding agents read before they act: is it needed, will it last, is it safe, did we already agree? One-command install, works across agents.'
    },
    facts: [
      { value: '4', label: { th: 'คำถามก่อนแก้โค้ดทุกครั้ง', en: 'questions before every change' } },
      { value: '6+', label: { th: 'agent ที่รองรับ', en: 'agents supported' } },
      { value: '1', label: { th: 'คำสั่งติดตั้ง', en: 'install command' } },
      { value: '0', label: { th: 'runtime ที่ต้องรัน', en: 'runtimes to run' } }
    ],
    why: {
      th: 'AI เขียนโค้ดได้เร็ว แต่ข้ามบริบทของทีม สร้างของซ้ำ และบอกว่าเสร็จโดยไม่มีหลักฐาน Sage ทำให้ agent คิดแบบ senior ก่อนพิมพ์',
      en: 'AI writes code fast but skips the team’s context, reinvents what exists and claims “done” without evidence. Sage makes the agent think like a senior before it types.'
    },
    features: [
      {
        title: { th: 'อ่านบริบทของทีมก่อน', en: 'Reads the team’s context first' },
        body: {
          th: 'agent ต้องอ่านการตัดสินใจและ pattern ที่มีอยู่ก่อนเสนอสิ่งใหม่',
          en: 'The agent reads existing decisions and patterns before proposing anything new.'
        }
      },
      {
        title: { th: 'บอกความเสี่ยงก่อนลงมือ', en: 'Names the risk before acting' },
        body: {
          th: 'งานที่แตะเงิน สิทธิ์ ข้อมูล หรือ API สาธารณะต้องหยุดถามก่อน',
          en: 'Work touching money, permissions, data or public APIs stops for a decision first.'
        }
      },
      {
        title: { th: '"เสร็จ" ต้องมีหลักฐาน', en: '“Done” needs evidence' },
        body: {
          th: 'ต้องรัน build, test หรือ check จริง และรายงานความเสี่ยงที่เหลือ',
          en: 'It has to run real builds, tests or checks and report the risk that’s left.'
        }
      }
    ],
    how: {
      title: { th: 'Markdown ไฟล์เดียว ไม่มี runtime', en: 'One Markdown file. No runtime.' },
      steps: [
        { th: 'ติดตั้งด้วยคำสั่งเดียว เลือก agent ที่ใช้', en: 'Install with one command and pick your agents' },
        { th: 'agent อ่าน AGENTS.md ก่อนทุกงาน', en: 'The agent reads AGENTS.md before every task' },
        {
          th: 'ถามคำถาม 4 ข้อ แล้วเลือกเส้นทางที่เล็กที่สุด',
          en: 'It asks the four questions and picks the smallest path'
        },
        { th: 'ตรวจผลจริงและบันทึกสิ่งที่เรียนรู้', en: 'It validates for real and records what it learned' }
      ]
    },
    role: { th: 'ทำคนเดียวทั้งหมด', en: 'Solo' },
    stage: {
      tone: '#f472b6',
      chips: ['AGENTS.md', 'Claude · Codex · Cursor', 'v1.9'],
      main: {
        kind: 'image',
        src: '/work/sage/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'หน้าเว็บ Sage', en: 'Sage website' },
        frame: 'browser'
      }
    },
    stack: ['Markdown', 'Bash', 'PowerShell', 'jsDelivr'],
    links: [{ label: { th: 'เว็บไซต์', en: 'Website' }, href: 'https://sage.qorstack.com' }],
    cover: {
      kind: 'image',
      src: '/work/sage/site.webp',
      width: 1440,
      height: 900,
      alt: { th: 'หน้าเว็บ Sage', en: 'Sage website' },
      frame: 'browser'
    }
  }
]

export const cases: CaseStudy[] = [
  {
    kind: 'case',
    slug: 'eec-id',
    title: 'EEC ID',
    client: {
      th: 'สำนักงานคณะกรรมการนโยบายเขตพัฒนาพิเศษภาคตะวันออก (EEC) · ผ่าน Chanwanich',
      en: 'Eastern Economic Corridor (EEC) Office · via Chanwanich'
    },
    tagline: {
      th: 'แรงงานต่างชาติยืนยันตัวตนด้วยมือถือ ไม่ต้องไปที่สำนักงาน',
      en: 'Foreign workers prove who they are with their phone — no office visit.'
    },
    tech: 'NFC passport chip · face match · OIDC · Flutter',
    summary: {
      th: 'แพลตฟอร์มตัวตนดิจิทัลและใบอนุญาตทำงานสำหรับแรงงานต่างชาติในเขต EEC มือถืออ่านชิปในหนังสือเดินทาง แล้วเทียบใบหน้ากับคนที่ถืออยู่',
      en: 'A digital identity and work-permit platform for foreign workers in Thailand’s Eastern Economic Corridor — where a phone reads the passport chip and matches the face holding it.'
    },
    role: {
      th: 'Full-stack · ทำแอป Flutter และ mobile service เกือบทั้งหมด',
      en: 'Full-stack · wrote nearly all of the Flutter app and mobile service'
    },
    confidential: true,
    problem: {
      th: 'แรงงานต้องยืนยันตัวตนต่อหน้าเจ้าหน้าที่ และระบบอื่นของรัฐเชื่อถือแค่รูปถ่ายหนังสือเดินทางไม่ได้',
      en: 'Workers had to prove identity in person, and other government systems couldn’t trust a photo of a passport.'
    },
    did: {
      th: 'ทำแอป Flutter และ service ของมัน: อ่านชิป, OCR, เทียบใบหน้า และระบบล็อกอินให้แอปพันธมิตร',
      en: 'Built the Flutter app and its service: chip reading, OCR, face match, and sign-in for partner apps.'
    },
    challenges: [
      {
        title: { th: 'อ่านชิปหนังสือเดินทางผ่าน NFC', en: 'Reading the ePassport chip over NFC' },
        body: {
          th: 'สแกน MRZ ด้วย OCR บนเครื่อง (ML Kit) เพื่อได้กุญแจเปิดชิป แล้วอ่านชิปด้วย dmrtd เพื่อตรวจข้อมูลจริง แทนการเชื่อรูปถ่าย',
          en: 'The MRZ, scanned with on-device OCR (ML Kit), gives the access key; the app then reads the chip with dmrtd and checks the data instead of trusting an image.'
        }
      },
      {
        title: { th: 'เทียบใบหน้ากับรูปในชิป', en: 'Matching the face to the chip' },
        body: {
          th: 'ตรวจจับใบหน้าบนเครื่อง แล้วส่งให้ service เทียบใบหน้ากับรูปที่อยู่ในชิป',
          en: 'On-device face detection, then a dedicated face-match service compares the live capture with the chip photo.'
        }
      },
      {
        title: { th: 'เป็นผู้ให้บริการตัวตน', en: 'Becoming an identity provider' },
        body: {
          th: 'OIDC provider ที่ปรับแต่งบน ZITADEL พร้อมล็อกอินข้ามแอปแบบ PKCE ให้แอปพันธมิตรใช้ EEC ID ล็อกอินได้',
          en: 'A custom OIDC provider on ZITADEL, with app-to-app sign-in (PKCE) so partner apps can log users in with their EEC ID.'
        }
      },
      {
        title: { th: 'บัตรสร้างจาก template', en: 'Cards generated, not drawn' },
        body: {
          th: 'บัตร eID และใบอนุญาตทำงานเรนเดอร์จาก SVG template ฝั่ง server หน้าตาตรงกันทั้งในแอป หน้าเว็บ และงานพิมพ์',
          en: 'eID and work-permit cards are rendered from SVG templates on the server — identical in the app, the portal and print.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'ตรวจชิป ไม่ใช่ตรวจรูป', en: 'Verify the chip, not the picture' },
        body: {
          th: 'ผู้ใช้มีขั้นตอนเพิ่ม (สแกน MRZ แล้วแตะหนังสือเดินทาง) แต่ได้ข้อมูลที่ประเทศผู้ออกเป็นคนลงลายเซ็น',
          en: 'More steps for the user (scan the MRZ, then tap the passport) — but the data is signed by the issuing country.'
        }
      },
      {
        title: { th: 'ต่อยอดจาก ZITADEL ไม่เขียน auth เอง', en: 'Build on ZITADEL instead of writing auth' },
        body: {
          th: 'พันธมิตรใช้ OIDC มาตรฐาน ส่วนหน้าจอและ claim ปรับเฉพาะจุดที่ขั้นตอนของรัฐต่างออกไป',
          en: 'Standard OIDC for partners; custom screens and claims only where the government flow differs.'
        }
      }
    ],
    owned: [
      {
        th: 'แอป Flutter ทั้งแอป (Riverpod, Freezed, Dio)',
        en: 'The Flutter app, end to end (Riverpod, Freezed, Dio)'
      },
      { th: 'Mobile service ฝั่ง .NET', en: 'The .NET mobile service' },
      { th: 'ฟีเจอร์ในเว็บสำหรับเจ้าหน้าที่', en: 'Features in the officer web portal' }
    ],
    gallery: [],
    stack: ['Flutter', '.NET 8', 'Next.js', 'ZITADEL', 'Kafka', 'SignalR', 'PostgreSQL', 'FastAPI'],
    links: [],
    architecture: { kind: 'diagram', id: 'eec-id', alt: { th: 'สถาปัตยกรรมของ EEC ID', en: 'EEC ID architecture' } },
    cover: {
      kind: 'art',
      id: 'eec-id',
      alt: {
        th: 'ภาพประกอบ: มือถืออ่านชิปหนังสือเดินทางและสแกนใบหน้า',
        en: 'Illustration: a phone reading a passport chip and scanning a face'
      }
    }
  },
  {
    kind: 'case',
    slug: 'eec-e-customs',
    title: 'EEC e-Customs',
    client: { th: 'สำนักงาน EEC · ผ่าน Chanwanich', en: 'Eastern Economic Corridor Office · via Chanwanich' },
    tagline: {
      th: 'บริษัทยื่นขอสิทธิประโยชน์ทางศุลกากรออนไลน์ เจ้าหน้าที่อนุมัติได้ในที่เดียว',
      en: 'Companies apply for customs privileges online; officers approve in one place.'
    },
    tech: '.NET 10 microservices · RabbitMQ · Kubernetes',
    summary: {
      th: 'ระบบ e-service สิทธิประโยชน์ทางศุลกากรของเขต EEC บริษัทยื่นคำขอนำเข้าเครื่องจักรและวัตถุดิบ, BOQ, การปล่อยสินค้าแบบ fast-track และชำระเงินออนไลน์ ส่วนเจ้าหน้าที่ตรวจและอนุมัติ',
      en: 'The customs-privilege e-service for Thailand’s Eastern Economic Corridor: companies submit machinery and raw-material imports, BOQs, fast-track releases and e-payments; officers review and approve.'
    },
    role: {
      th: 'Full-stack · หน้าเว็บ, service หลัก และ payment service',
      en: 'Full-stack · web app, core service and most of the payment service'
    },
    confidential: true,
    problem: {
      th: 'Phase 2 ต้องปรับโครงสร้างจาก Phase 1 เป็น microservices และต้องคุยกับระบบภายนอก ทั้งลายเซ็นดิจิทัลของ DGA และระบบศุลกากร NSW ที่ตอบกลับแบบ async',
      en: 'Phase 2 re-architected Phase 1 into microservices, and had to talk to outside systems — DGA digital signatures and the asynchronous NSW customs gateway.'
    },
    did: {
      th: 'ร่วมออกแบบโครงสร้าง Phase 2 และเขียนหน้าเว็บ, service หลัก และ payment service',
      en: 'Helped shape the Phase 2 structure and built across the web app, the core service and the payment service.'
    },
    challenges: [
      {
        title: { th: 'ระบบภายนอกที่ช้า', en: 'Slow outside systems' },
        body: {
          th: 'External service เป็นประตูเดียวที่คุยกับภายนอก: DGA เรียกแบบรอผล ส่วน NSW ส่งผ่าน RabbitMQ แล้ว polling รอคำตอบ',
          en: 'One external service is the only door out: DGA is called synchronously; NSW goes through RabbitMQ with polling for the answer.'
        }
      },
      {
        title: { th: 'งานตามเวลา', en: 'Work on a schedule' },
        body: {
          th: 'Schedule service ใช้ Hangfire รันงาน ทั้งแบบ command ภายในและแบบ HTTP callback',
          en: 'A schedule service runs Hangfire jobs as internal commands or HTTP callbacks.'
        }
      },
      {
        title: { th: 'ใบรับรองที่เชื่อถือได้', en: 'Certificates you can trust' },
        body: {
          th: 'PDF ใบรับรองเรนเดอร์ด้วย Qorstack Report ผ่าน Gotenberg',
          en: 'Certificate PDFs are rendered by Qorstack Report through Gotenberg.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'CQRS ใน Clean Architecture', en: 'CQRS inside Clean Architecture' },
        body: {
          th: 'แยกคำสั่งกับการอ่านด้วย MediatR และตรวจข้อมูลด้วย FluentValidation ทุก service ใช้โครงเดียวกัน คนในทีมย้ายข้าม service ได้ง่าย',
          en: 'Commands and queries split with MediatR, validated with FluentValidation — the same shape in every service, so people move between them easily.'
        }
      },
      {
        title: { th: 'GitOps สำหรับ workload ประมาณ 14 ตัว', en: 'GitOps for ~14 workloads' },
        body: {
          th: 'Kustomize กับ Fleet ทำให้การ deploy ทุกครั้งตรวจสอบย้อนหลังได้จาก git',
          en: 'Kustomize and Fleet make every deploy reviewable in git.'
        }
      }
    ],
    owned: [
      { th: 'ฟีเจอร์ในหน้าเว็บ Next.js 16', en: 'Features across the Next.js 16 web app' },
      { th: 'Endpoint ใน service หลัก .NET 10', en: 'Endpoints in the .NET 10 core service' },
      { th: 'Payment service เกือบทั้งหมด', en: 'Most of the payment service' }
    ],
    gallery: [],
    stack: [
      '.NET 10',
      'CQRS',
      'Next.js 16',
      'PostgreSQL 17',
      'Redis',
      'RabbitMQ',
      'MinIO',
      'Hangfire',
      'OpenTelemetry',
      'Kubernetes'
    ],
    links: [],
    architecture: {
      kind: 'diagram',
      id: 'eec-customs',
      alt: { th: 'สถาปัตยกรรมของ EEC e-Customs', en: 'EEC e-Customs architecture' }
    },
    cover: {
      kind: 'art',
      id: 'eec-customs',
      alt: {
        th: 'ภาพประกอบ: คำขอไหลจากยื่นคำขอ ตรวจ ไปจนอนุมัติ',
        en: 'Illustration: applications flowing from submitted to approved'
      }
    }
  },
  {
    kind: 'case',
    slug: 'suvarnabhumi-airport-gate',
    title: 'Suvarnabhumi Airport Gate',
    client: { th: 'ผ่าน Chanwanich', en: 'via Chanwanich' },
    // TODO(satang): add what the gate system does, who uses it, and the report speed-up numbers.
    tagline: {
      th: 'วางโครงระบบรายงาน export ของเว็บ Suvarnabhumi Airport Gate ด้วย FastReport และทำให้ออกรายงานได้เร็วขึ้น',
      en: 'Export reporting for the Suvarnabhumi Airport Gate website — structured with FastReport, then made faster.'
    },
    tech: 'Next.js · C# .NET · FastReport',
    summary: {
      th: 'พัฒนาเว็บ Suvarnabhumi Airport Gate ด้วย Next.js และ C# .NET ร่วมวางโครงสร้างระบบ export รายงานด้วย FastReport และปรับให้รายงานออกเร็วขึ้น',
      en: 'Developed the Suvarnabhumi Airport Gate website with Next.js and C# .NET, helped structure its export reporting with FastReport, and made those exports faster.'
    },
    role: { th: 'Full-stack developer', en: 'Full-stack developer' },
    confidential: true,
    problem: {
      th: 'รายงาน export ต้องออกได้เร็วและหน้าตาถูกต้อง ทั้งที่ข้อมูลมีปริมาณมาก',
      en: 'Export reports had to be fast and correct on large data.'
    },
    did: {
      th: 'เขียนทั้งหน้าเว็บและ API วางโครงสร้างงานรายงาน และปรับประสิทธิภาพการ export',
      en: 'Built web and API features, structured the reporting work, and tuned export performance.'
    },
    challenges: [
      {
        title: { th: 'โครงสร้างงานรายงาน', en: 'Structuring the reports' },
        body: {
          th: 'วางรูปแบบการทำรายงานด้วย FastReport ให้ทั้งทีมใช้รูปแบบเดียวกัน',
          en: 'Set up a FastReport pattern the whole team could follow.'
        }
      },
      {
        title: { th: 'Export ที่เร็วขึ้น', en: 'Faster exports' },
        body: {
          th: 'ปรับประสิทธิภาพการ export รายงานที่มีข้อมูลจำนวนมาก',
          en: 'Optimised report exports over large data sets.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'ฟีเจอร์หน้าเว็บ Next.js', en: 'Next.js web features' },
      { th: 'API ฝั่ง C# .NET', en: 'C# .NET API' },
      { th: 'โครงสร้างและประสิทธิภาพของรายงาน', en: 'Report structure and performance' }
    ],
    gallery: [],
    stack: ['Next.js', 'C#', '.NET', 'FastReport'],
    links: [],
    architecture: { kind: 'diagram', id: 'airport-gate', alt: { th: 'โครงสร้างระบบรายงาน', en: 'Reporting flow' } },
    cover: {
      kind: 'art',
      id: 'airport-gate',
      alt: {
        th: 'ภาพประกอบ: ป้ายเที่ยวบินและไฟล์รายงานที่ export',
        en: 'Illustration: a departures board and exported reports'
      }
    }
  },
  {
    kind: 'case',
    slug: 'lampang-health-network',
    title: 'Lampang Health Network',
    client: { th: 'ผ่าน Chanwanich · ช่วงฝึกงาน', en: 'via Chanwanich · internship' },
    // TODO(satang): add what the hospital systems do and any numbers you can share.
    tagline: {
      th: 'ดูแลเว็บโรงพยาบาลส่งเสริมสุขภาพตำบลกว่า 200 แห่งให้ทำงานและออกรายงานได้',
      en: 'Kept 200+ sub-district hospital websites running and reporting.'
    },
    tech: 'React · .NET · background reports · Cognito ↔ FusionAuth',
    summary: {
      th: 'ดูแลและพัฒนาระบบเว็บของโรงพยาบาลส่งเสริมสุขภาพตำบลกว่า 200 แห่งในจังหวัดลำปาง ร่วมกับทีมด้วย React และ .NET',
      en: 'Maintained and extended the web systems of 200+ sub-district hospitals in Lampang province, with the team, in React and .NET.'
    },
    role: { th: 'นักศึกษาฝึกงาน Full-stack', en: 'Full-stack intern' },
    period: { th: 'ธ.ค. 2022 — มี.ค. 2024', en: 'Dec 2022 — Mar 2024' },
    confidential: true,
    problem: {
      th: 'รายงานใหญ่ timeout ระหว่างรอ และระบบต้องเปลี่ยนผู้ให้บริการล็อกอินได้',
      en: 'Big reports timed out mid-request, and the system needed to switch identity providers.'
    },
    did: {
      th: 'ย้ายการสร้างรายงานไปทำใน background และทำให้ระบบสลับระหว่าง Cognito กับ FusionAuth ได้',
      en: 'Moved report generation to a background process, and made the system switchable between Cognito and FusionAuth.'
    },
    challenges: [
      {
        title: { th: 'รายงานที่ไม่ timeout', en: 'Reports that don’t time out' },
        body: {
          th: 'รายงานไม่ได้สร้างใน request อีกต่อไป แต่รันใน background แล้วให้ผู้ใช้กลับมารับไฟล์',
          en: 'Reports no longer render inside the request — they run in the background and the user picks the file up when ready.'
        }
      },
      {
        title: { th: 'เปลี่ยนผู้ให้บริการล็อกอินได้', en: 'Swappable sign-in' },
        body: {
          th: 'ซ่อนผู้ให้บริการไว้หลัง interface เดียว ระบบเลือกใช้ Cognito หรือ FusionAuth ได้',
          en: 'The provider sits behind one interface, so the system can use Cognito or FusionAuth.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'ฟีเจอร์ใหม่และแก้บั๊กที่ได้รับมอบหมาย', en: 'New features and assigned bug fixes' },
      { th: 'รายงานแบบ background', en: 'Background report processing' },
      { th: 'การสลับผู้ให้บริการล็อกอิน', en: 'The identity-provider switch' }
    ],
    gallery: [],
    stack: ['React', '.NET', 'Cognito', 'FusionAuth'],
    links: [],
    architecture: {
      kind: 'diagram',
      id: 'lampang-health',
      alt: { th: 'การสร้างรายงานแบบ background', en: 'Background report flow' }
    },
    cover: {
      kind: 'art',
      id: 'lampang-health',
      alt: {
        th: 'ภาพประกอบ: เว็บโรงพยาบาลกว่า 200 แห่งส่งรายงานเข้าระบบ',
        en: 'Illustration: 200+ hospital sites feeding a background report'
      }
    }
  },
  {
    kind: 'case',
    slug: 'cmu-journal',
    title: 'CMU Journal',
    client: { th: 'มหาวิทยาลัยเชียงใหม่ · ฟรีแลนซ์', en: 'Chiang Mai University · freelance' },
    tagline: {
      th: 'ย้ายวารสารของมหาวิทยาลัยออกจากเว็บเก่า 1,014 บทความ ไม่มีชิ้นไหนหาย',
      en: 'A university journal moved off a legacy site — 1,014 articles, nothing lost.'
    },
    tech: 'NestJS · Next.js 16 · SHA-256 verified migration',
    summary: {
      th: 'สร้างเว็บวารสารวิชาการของมหาวิทยาลัยเชียงใหม่ใหม่ทั้งหมด แทนเว็บ CodeIgniter เดิม มีหน้าอ่านบทความสำหรับผู้อ่าน และระบบบรรณาธิการเต็มรูปแบบ',
      en: 'A rebuild of Chiang Mai University’s academic journal, replacing a legacy CodeIgniter site, with a public reader and a full editorial back office.'
    },
    role: { th: 'ทำคนเดียว: หลังบ้าน, หน้าบ้าน และย้ายข้อมูล', en: 'Solo — backend, frontend and the data migration' },
    confidential: false,
    problem: {
      th: 'บทความหลายปีอยู่ใน MySQL ของระบบ CodeIgniter เดิม และบรรณาธิการต้องการระบบที่จัดการขั้นตอนรีวิวได้จริง',
      en: 'Years of articles lived in the old CodeIgniter site’s MySQL, and editors needed a system that handled review properly.'
    },
    did: {
      th: 'ออกแบบ API และหน้าเว็บใหม่ เขียนสคริปต์ย้ายข้อมูลที่ตรวจทุกไฟล์ และสร้างระบบหลังบ้านสำหรับบรรณาธิการ',
      en: 'Designed the new API and site, wrote a migration that checks every file, and built the editorial back office.'
    },
    result: {
      th: 'ย้ายครบ 1,014 บทความ 25 เล่ม 76 ฉบับ และผ่าน integrity check หลังย้าย 25 รายการ',
      en: 'All 1,014 articles, 25 volumes and 76 issues migrated, with 25 post-import integrity checks passing.'
    },
    challenges: [
      {
        title: { th: 'ย้ายข้อมูลโดยไม่ทำหาย', en: 'A migration that loses nothing' },
        body: {
          th: 'ไฟล์ทุกไฟล์ตรวจด้วย SHA-256 เทียบกับต้นฉบับ ไม่ได้แค่นับจำนวน',
          en: 'Every asset is verified against its source by SHA-256, not just counted.'
        }
      },
      {
        title: { th: 'บรรณาธิการแก้พร้อมกันได้ปลอดภัย', en: 'Safe concurrent editing' },
        body: {
          th: 'การเผยแพร่ตรวจเลข revision และใช้ transaction lock คนแก้ทีหลังจะไม่เขียนทับงานคนอื่นโดยไม่รู้ตัว',
          en: 'Publishing checks revisions under transaction locks, so a late editor can’t silently overwrite someone else.'
        }
      },
      {
        title: { th: 'ความปลอดภัยของการล็อกอิน', en: 'Sign-in security' },
        body: {
          th: 'ล็อกอินผ่าน CMU SSO ใช้ token แบบ JWE และ refresh token แบบหมุนเวียน ถ้าตรวจพบ token ถูกใช้ซ้ำ จะเพิกถอนทั้งชุด',
          en: 'CMU SSO, compact JWE tokens and rotating refresh tokens — a replayed token revokes its whole family.'
        }
      },
      {
        title: { th: 'เขียนสมการได้', en: 'Math in the editor' },
        body: {
          th: 'Editor ใช้ TipTap ร่วมกับ KaTeX และ MathLive สำหรับบทความวิทยาศาสตร์',
          en: 'A TipTap editor with KaTeX and MathLive for scientific articles.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'ปรับดีไซน์หลังบ้านจากของจริง', en: 'Redesign the back office from evidence' },
        body: {
          th: 'ทำ design review แบบ ก่อน/หลัง ทั้ง desktop และ mobile ก่อนเลือกทิศทาง',
          en: 'Ran a before/after design review on desktop and mobile before picking a direction.'
        }
      }
    ],
    owned: [
      { th: 'NestJS API, Prisma และ PostgreSQL', en: 'NestJS API, Prisma and PostgreSQL' },
      { th: 'หน้าเว็บ Next.js 16 และระบบหลังบ้าน', en: 'The Next.js 16 site and back office' },
      { th: 'สคริปต์ย้ายข้อมูลและการตรวจสอบ', en: 'The migration and its verification' },
      { th: 'Playwright test', en: 'Playwright tests' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/cmu-journal/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'หน้าแรกของวารสาร', en: 'The journal’s home page' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/dashboard-before.webp',
        width: 1440,
        height: 900,
        alt: { th: 'แดชบอร์ดหลังบ้าน ก่อนปรับ', en: 'Back-office dashboard, before' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/dashboard-after.webp',
        width: 1440,
        height: 900,
        alt: { th: 'แดชบอร์ดหลังบ้าน หลังปรับ', en: 'Back-office dashboard, after' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/admin.webp',
        width: 1440,
        height: 1000,
        alt: { th: 'หน้าจัดการบทความ', en: 'Article management' },
        frame: browser
      }
    ],
    stack: [
      'NestJS 11',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'MinIO',
      'Next.js 16',
      'Tailwind v4',
      'TipTap',
      'Playwright'
    ],
    // TODO(satang): add the public journal URL once it is the production domain.
    links: [],
    cover: {
      kind: 'image',
      src: '/work/cmu-journal/site.webp',
      width: 1440,
      height: 900,
      alt: { th: 'หน้าแรกของวารสาร', en: 'The journal’s home page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'cmu-research-gallery',
    title: 'CMU Research Gallery',
    client: {
      th: 'สำนักงานบริหารงานวิจัย มช. · ฟรีแลนซ์',
      en: 'CMU Office of Research Administration · freelance'
    },
    tagline: {
      th: 'ทำเนียบนักวิจัยของ มช. ที่ข้อมูลตรงกับระบบกลางเสมอ และนักวิจัยเลือกเองว่าจะแสดงอะไร',
      en: 'Chiang Mai University’s researcher directory — always in sync, and researchers choose what is public.'
    },
    tech: 'Sync from CMU Central · PDPA onboarding · RBAC · audit trail',
    summary: {
      th: 'เว็บสาธารณะสำหรับค้นหานักวิจัยของมหาวิทยาลัยเชียงใหม่ พร้อมพื้นที่ส่วนตัวให้นักวิจัยดูแลโปรไฟล์ตัวเอง และระบบหลังบ้านสำหรับเจ้าหน้าที่',
      en: 'A public directory of Chiang Mai University researchers, with a private workspace where researchers manage their own profile and an admin portal for the office.'
    },
    role: {
      th: 'Full-stack · หลังบ้าน หน้าเว็บ และพื้นที่นักวิจัย',
      en: 'Full-stack · backend, public site and researcher workspace'
    },
    confidential: false,
    problem: {
      th: 'ข้อมูลนักวิจัยต้องตรงกับระบบกลางของมหาวิทยาลัย และต้องเคารพสิทธิ์ของนักวิจัยตาม PDPA ก่อนเผยแพร่',
      en: 'Researcher data had to match the university’s central system, and nothing could go public without the researcher’s consent under PDPA.'
    },
    did: {
      th: 'ซิงก์ข้อมูลจาก CMU Central ทุกสัปดาห์และสั่งเองได้ ทำ onboarding สองขั้นที่ขอความยินยอมก่อน และสร้างหลังบ้านที่บันทึกทุกการเปลี่ยนแปลง',
      en: 'Synced from CMU Central weekly or on demand, built a two-step onboarding that asks for consent first, and an admin that logs every change.'
    },
    challenges: [
      {
        title: { th: 'ซิงก์จาก CMU Central', en: 'Sync from CMU Central' },
        body: {
          th: 'งานซิงก์รายสัปดาห์ด้วย @nestjs/schedule และสั่งรันเองได้ ทุกการเปลี่ยนแปลงบันทึกค่าก่อนและหลังไว้ใน audit log',
          en: 'A weekly job on @nestjs/schedule that can also run on demand; every change is logged before and after.'
        }
      },
      {
        title: { th: 'ความยินยอมมาก่อนการเผยแพร่', en: 'Consent before publishing' },
        body: {
          th: 'onboarding สองขั้น: แจ้งเรื่องข้อมูลส่วนบุคคลก่อน แล้วค่อยกรอกโปรไฟล์ มีพรีวิวการ์ดนักวิจัยให้เห็นก่อนกดเผยแพร่',
          en: 'Two-step onboarding: the privacy notice first, then the profile — with a live preview of the directory card before anything goes public.'
        }
      },
      {
        title: { th: 'ไฟล์ที่อัปโหลดต้องปลอดภัย', en: 'Safe uploads' },
        body: {
          th: 'ไฟล์ถูกตรวจจาก magic bytes ไม่ใช่แค่นามสกุล แล้วเก็บใน MinIO และ API มี rate limit',
          en: 'Files are checked by magic bytes, not extension, before they reach MinIO, and the API is rate-limited.'
        }
      },
      {
        title: { th: 'API แบบสัญญามาก่อน', en: 'Contract-first API' },
        body: {
          th: 'Client ฝั่งหน้าเว็บสร้างอัตโนมัติจาก Swagger ของหลังบ้านด้วย swagger-typescript-api',
          en: 'The front-end client is generated from the backend’s Swagger with swagger-typescript-api.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'สิทธิ์แบบปรับได้', en: 'Dynamic roles' },
        body: {
          th: 'RBAC ที่กำหนดสิทธิ์ได้จากหลังบ้าน เจ้าหน้าที่แต่ละฝ่ายเห็นเฉพาะส่วนที่ดูแล',
          en: 'RBAC configured from the admin, so each team sees only what it manages.'
        }
      },
      {
        title: { th: 'หลังบ้านเดียวใช้ร่วมกับเว็บ ORA', en: 'One backend, shared with the ORA site' },
        body: {
          th: 'ทำเนียบนักวิจัยและเว็บ ORA ใช้ API, RBAC และ audit log ชุดเดียวกัน',
          en: 'The directory and the ORA site share one API, one RBAC model and one audit log.'
        }
      }
    ],
    owned: [
      { th: 'NestJS API, Prisma และงานซิงก์', en: 'NestJS API, Prisma and the sync jobs' },
      { th: 'หน้าเว็บทำเนียบนักวิจัย', en: 'The public directory' },
      { th: 'พื้นที่นักวิจัยและ onboarding', en: 'The researcher workspace and onboarding' },
      { th: 'หลังบ้านสำหรับเจ้าหน้าที่', en: 'The admin portal' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/login.webp',
        width: 1600,
        height: 900,
        alt: { th: 'หน้าเข้าสู่พื้นที่นักวิจัย', en: 'Researcher workspace sign-in' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/onboarding.webp',
        width: 1424,
        height: 890,
        alt: { th: 'onboarding ขั้นที่ 2: กรอกโปรไฟล์', en: 'Onboarding step 2: the researcher profile' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/privacy.webp',
        width: 1600,
        height: 799,
        alt: { th: 'การตั้งค่าความเป็นส่วนตัวของนักวิจัย', en: 'Researcher privacy settings' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/admin.webp',
        width: 1600,
        height: 755,
        alt: { th: 'หลังบ้านจัดการนักวิจัย', en: 'Admin researcher management' },
        frame: browser
      }
    ],
    stack: ['NestJS 11', 'Fastify', 'Prisma 6', 'PostgreSQL', 'MinIO', 'Next.js 16', 'Tailwind', 'shadcn/ui', 'Tolgee'],
    // TODO(satang): add the public URL once the production domain is confirmed.
    links: [],
    cover: {
      kind: 'image',
      src: '/work/cmu-research-gallery/landing.webp',
      width: 1600,
      height: 756,
      alt: { th: 'หน้าแรกทำเนียบนักวิจัย มช.', en: 'CMU Research Gallery landing page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'ora-cmu',
    title: 'ORA CMU',
    client: {
      th: 'สำนักงานบริหารงานวิจัย มช. · ฟรีแลนซ์',
      en: 'CMU Office of Research Administration · freelance'
    },
    tagline: {
      th: 'หากำหนดส่งทุนวิจัยให้เจอภายใน 10 วินาที',
      en: 'Find a funding deadline in ten seconds.'
    },
    tech: 'Next.js 16 · GSAP · CMS · shared NestJS backend',
    summary: {
      th: 'เว็บใหม่ของสำนักงานบริหารงานวิจัย มหาวิทยาลัยเชียงใหม่ รวมประกาศทุน ปฏิทินกิจกรรม ข่าว และเอกสาร พร้อม CMS ที่สำนักงานแก้เนื้อหาได้เอง',
      en: 'The new site for Chiang Mai University’s Office of Research Administration: funding calls, an events calendar, news and documents, with a CMS the office runs itself.'
    },
    role: {
      th: 'Full-stack · หน้าเว็บ, CMS และการย้ายเนื้อหา',
      en: 'Full-stack · site, CMS and content migration'
    },
    confidential: false,
    problem: {
      th: 'นักวิจัยต้องหาทุนที่ใกล้ปิดรับให้เจอเร็ว และสำนักงานต้องแก้หน้าเว็บเองได้โดยไม่ต้องพึ่งนักพัฒนา',
      en: 'Researchers needed to spot closing funding calls fast, and the office needed to update the site without a developer.'
    },
    did: {
      th: 'วางหน้าแรกรอบกำหนดส่งทุน ทำปฏิทินและคลังเอกสาร และสร้าง CMS ที่ครอบคลุมทุกส่วนของเว็บ',
      en: 'Built the home page around funding deadlines, added a calendar and a document library, and a CMS covering every part of the site.'
    },
    challenges: [
      {
        title: { th: 'กำหนดส่งต้องเห็นก่อนอย่างอื่น', en: 'Deadlines first' },
        body: {
          th: 'หน้าแรกแสดงทุนที่กำลังจะปิดรับ และไทม์ไลน์ 90 วันข้างหน้า',
          en: 'The home page leads with calls about to close and a 90-day timeline.'
        }
      },
      {
        title: { th: 'CMS ที่ครอบคลุมทั้งเว็บ', en: 'A CMS for the whole site' },
        body: {
          th: 'สไลด์หน้าแรก เครือข่ายวิจัย ประกาศทุน เอกสาร และสิทธิ์ผู้ใช้ จัดการได้จากหลังบ้านทั้งหมด',
          en: 'Hero slides, consortiums, funding calls, documents and user roles are all managed from the admin.'
        }
      },
      {
        title: { th: 'ย้ายเนื้อหาจากเว็บเดิม', en: 'Content from the old site' },
        body: {
          th: 'มีเครื่องมือย้ายข่าวและเอกสารจากเว็บเดิมเข้ามาในระบบใหม่',
          en: 'Migration tooling brought news and documents across from the old site.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'ใช้หลังบ้านร่วมกับ Research Gallery', en: 'Share the Research Gallery backend' },
        body: {
          th: 'ไม่สร้าง API ใหม่ ทั้งสองเว็บใช้ข้อมูลนักวิจัย สิทธิ์ และ audit log ชุดเดียวกัน',
          en: 'No second API: both sites share researcher data, roles and the audit log.'
        }
      }
    ],
    owned: [
      { th: 'หน้าเว็บ Next.js 16', en: 'The Next.js 16 site' },
      { th: 'CMS และสิทธิ์ผู้ใช้', en: 'The CMS and user roles' },
      { th: 'การย้ายเนื้อหาจากเว็บเดิม', en: 'Content migration from the old site' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/ora-cmu/closing.webp',
        width: 1440,
        height: 900,
        alt: { th: 'ทุนที่กำลังจะปิดรับ และไทม์ไลน์ 90 วัน', en: 'Funding calls closing soon and the 90-day timeline' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/funding.webp',
        width: 1440,
        height: 900,
        alt: { th: 'หน้าค้นหาทุนวิจัย', en: 'Funding search' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/calendar.webp',
        width: 1440,
        height: 900,
        alt: { th: 'ปฏิทินกิจกรรมวิจัย', en: 'Research events calendar' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/resources.webp',
        width: 1440,
        height: 900,
        alt: { th: 'คลังดาวน์โหลดเอกสาร', en: 'Document library' },
        frame: browser
      }
    ],
    stack: ['Next.js 16', 'GSAP', 'Motion', 'Swiper', 'TipTap', 'Tolgee', 'NestJS 11', 'PostgreSQL'],
    // TODO(satang): add the public URL once the production domain is confirmed.
    links: [],
    cover: {
      kind: 'image',
      src: '/work/ora-cmu/home.webp',
      width: 1440,
      height: 900,
      alt: { th: 'หน้าแรกเว็บ ORA', en: 'ORA home page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'junior-bootcamp',
    title: 'Junior Bootcamp CMU',
    client: { th: 'สำนักงานบริหารงานวิจัย มช. · ฟรีแลนซ์', en: 'CMU Research Administration · freelance' },
    tagline: {
      th: 'ระบบอบรมที่รู้ขีดจำกัดก่อนวันสอบจริง: เช็กอินด้วย QR สอบจับเวลา และติดตามสด',
      en: 'A training portal that knew its limits before exam day: QR check-in, timed exams and a live monitor.'
    },
    tech: 'Next.js full-stack · Prisma · SSE · k6 load tests',
    summary: {
      th: 'ระบบอบรมนักวิจัยรุ่นใหม่ของมหาวิทยาลัยเชียงใหม่ มีรุ่นอบรม โมดูล เช็กอินด้วย QR ข้อสอบจับเวลา ใบประกาศ และหน้าติดตามสดสำหรับผู้ดูแลและผู้สอน',
      en: 'Chiang Mai University’s training portal for junior researchers: cohorts, modules, QR check-in, timed exams, certificates and live monitors for admins and teachers.'
    },
    role: { th: 'ทำคนเดียวทั้งหมด', en: 'Solo' },
    confidential: false,
    problem: {
      th: 'วันสอบมีคนเข้าพร้อมกันหลายร้อยคน ระบบต้องไม่ล่มกลางสอบ และเช็กอินต้องเร็ว',
      en: 'Hundreds of people sit the exam at once; the system can’t fall over mid-exam, and check-in has to be quick.'
    },
    did: {
      th: 'สร้างทั้งระบบ แล้ว load test ด้วย k6 กับ production จนรู้จุดที่รับไม่ไหว และปรับก่อนวันจริง',
      en: 'Built the whole system, then load-tested production with k6 until it broke, and tuned it before the real day.'
    },
    result: {
      th: '600 คนสอบพร้อมกันได้โดยไม่มี error และรู้ว่าพังที่ 800 คน ก่อนถึงวันจริง',
      en: '600 concurrent exam-takers with 0% errors — and a known breaking point at 800, before the real day.'
    },
    challenges: [
      {
        title: { th: 'เช็กอินด้วย QR', en: 'QR check-in' },
        body: {
          th: 'QR ขนาดใหญ่สำหรับฉายขึ้นจอ หมดอายุได้ และตรงกันทุกเครื่อง',
          en: 'A large projector-ready QR that expires and matches on every device.'
        }
      },
      {
        title: { th: 'ข้อสอบจับเวลา', en: 'Timed exams' },
        body: {
          th: 'เปิดปิดตามเวลา ส่งคำตอบให้อัตโนมัติ และต้องทำ pre-test ก่อน post-test',
          en: 'Scheduled open and close, auto-submit, and pre-test before post-test.'
        }
      },
      {
        title: { th: 'ติดตามสด', en: 'Live monitoring' },
        body: {
          th: 'SSE ส่งความคืบหน้าแบบสดให้ผู้ดูแลและผู้สอน',
          en: 'SSE streams progress live to admins and teachers.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'ทั้งระบบ: Next.js, API, ฐานข้อมูล', en: 'The whole system: Next.js, API, database' },
      { th: 'OTP ทางอีเมลและการยืนยันตัวตน', en: 'Email OTP and sign-in security' },
      { th: 'Load test และ E2E test', en: 'Load tests and E2E tests' }
    ],
    stack: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'SSE', 'Resend', 'react-pdf', 'k6', 'Playwright'],
    links: [{ label: { th: 'เว็บไซต์', en: 'Website' }, href: 'https://juniorbootcamp.red-cmu.com' }],
    cover: {
      kind: 'image',
      src: '/work/junior-bootcamp/dashboard.webp',
      width: 1440,
      height: 900,
      alt: { th: 'แดชบอร์ดผู้เข้าอบรม', en: 'Participant dashboard' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'readitgo',
    title: 'ReadItGo',
    client: { th: 'Engenius · ฟรีแลนซ์', en: 'Engenius · freelance' },
    tagline: {
      th: 'แอปอ่าน e-book สำหรับนักเรียน อ่านออกเสียงพร้อมไฮไลต์ทีละคำ และอ่านต่อได้แม้ออฟไลน์',
      en: 'An e-book app for students that reads aloud, highlights each word, and keeps working offline.'
    },
    tech: 'Next.js PWA · ElevenLabs · IndexedDB',
    summary: {
      th: 'ห้องสมุด e-book และวิดีโอสำหรับนักเรียน ใช้ได้ทั้งเว็บและติดตั้งเป็นแอป อ่านออกเสียงพร้อมไฮไลต์ตามเสียงทีละคำ',
      en: 'An e-book and video library for students, on the web or installed as an app, with read-aloud that highlights word by word.'
    },
    role: {
      th: 'เขียนหน้าบ้านเกือบทั้งหมด และงานอ่านออกเสียงฝั่ง API',
      en: 'Wrote nearly all of the front end, plus the read-aloud API work'
    },
    confidential: false,
    problem: {
      th: 'นักเรียนต้องฟังและเห็นคำที่กำลังอ่านไปพร้อมกัน และอ่านได้แม้ไม่มีเน็ต',
      en: 'Students needed to hear and see the current word together, and read without a connection.'
    },
    did: {
      th: 'ทำระบบอ่านออกเสียงที่ไฮไลต์ตรงคำ ทำแอปให้ใช้ออฟไลน์ได้ และทำข้อสอบที่ AI สร้าง',
      en: 'Built word-synced read-aloud, offline reading, and AI-made quizzes.'
    },
    challenges: [
      {
        title: { th: 'อ่านออกเสียงทีละคำ', en: 'Word-by-word read-aloud' },
        body: {
          th: 'เสียงจาก ElevenLabs เก็บ cache ไว้ฝั่ง server พร้อม timing รายคำ',
          en: 'ElevenLabs audio cached on the server with word timings.'
        }
      },
      {
        title: { th: 'อ่านได้แม้ออฟไลน์', en: 'Offline reading' },
        body: {
          th: 'PWA ที่เก็บ e-book และเสียงไว้ในเครื่อง',
          en: 'A PWA that stores e-books and audio on the device.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'หน้าบ้านทั้งแอป', en: 'The app’s front end' },
      { th: 'ระบบอ่านออกเสียงและ PWA ออฟไลน์', en: 'Read-aloud and the offline PWA' }
    ],
    stack: ['Next.js', 'next-pwa', 'IndexedDB', 'ElevenLabs', 'react-reader', 'Express', 'Prisma'],
    links: [{ label: { th: 'เว็บไซต์', en: 'Website' }, href: 'https://library.engeniusapp.com' }],
    cover: {
      kind: 'image',
      src: '/work/readitgo/cover.webp',
      width: 1600,
      height: 1000,
      alt: { th: 'หน้าจอแอป ReadItGo บนมือถือ', en: 'ReadItGo on mobile' },
      frame: 'none'
    }
  }
]

export const allProjects: Project[] = [...products, ...cases]

for (const project of allProjects) {
  Object.assign(project, stories[project.slug] ?? {})
  if (galleries[project.slug]) project.gallery = galleries[project.slug]
}

export function getProject(slug: string) {
  return allProjects.find(project => project.slug === slug)
}

/** The project after this one in its own list, wrapping around. */
export function getNextProject(project: Project): Project {
  const list: Project[] = project.kind === 'product' ? products : cases
  const index = list.findIndex(item => item.slug === project.slug)
  return list[(index + 1) % list.length]
}
