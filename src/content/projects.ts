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
      th: 'Git ครบทุกอย่าง รวม PR/MR และ pipeline อยู่ใน editor เลย ใช้จริงทุกวัน',
      en: 'All of Git — PRs, MRs and pipelines included — inside the editor. In daily use.'
    },
    summary: {
      th: 'Git client ใน Orca มี commit graph, commit, branch, stash, merge request และ pipeline ของ GitHub กับ GitLab อยู่แท็บเดียวกับโค้ด ใช้ได้ทั้งโปรเจกต์ในเครื่องและบน server ผ่าน SSH ใช้ git ที่ลงไว้แล้วกับบัญชีที่ล็อกอินอยู่ เลยไม่ต้องสร้าง token',
      en: 'A Git client inside Orca: the commit graph, commits, branches, stashes, merge requests and pipelines for GitHub and GitLab, in the same tab as your code — for projects on your machine and on SSH servers. It uses your installed git and the login you already have, so there are no tokens to create.'
    },
    facts: [
      {
        value: 'PR + MR',
        label: { th: 'review, approve และ merge ได้ใน editor', en: 'review, approve and merge from the editor' }
      },
      {
        value: 'Queue',
        label: { th: 'merge หลาย MR ต่อคิวให้ใน background', en: 'merges several MRs in the background' }
      },
      { value: 'SSH', label: { th: 'ใช้กับโปรเจกต์บน server ได้ด้วย', en: 'works with projects on servers' } },
      { value: '0', label: { th: 'token ที่ต้องสร้าง', en: 'tokens to create' } }
    ],
    why: {
      th: 'เวลารีวิวหรือ merge ทีไร ต้องสลับไปมาระหว่าง editor กับ GitHub/GitLab ทั้งวัน Git Control เลยยกทุกอย่างมาไว้ข้างโค้ด ตั้งแต่ไล่ดูประวัติไปจนถึงกด merge ตอน pipeline ผ่าน',
      en: 'Reviewing and merging meant bouncing between the editor and GitHub or GitLab all day. Git Control brings it next to the code — from reading history to merging when the pipeline passes.'
    },
    features: [
      {
        title: { th: 'รีวิว MR/PR ได้เหมือนบน GitLab', en: 'Review MRs and PRs like on GitLab' },
        body: {
          th: 'เห็น description, reviewer, approval, inline comment และ pipeline แล้วกด Approve หรือ Merge ได้ตรงนั้นเลย มี Explain กับ AI review ให้ด้วย',
          en: 'Description, reviewers, approvals, inline comments and the pipeline — then Approve or Merge right there, with Explain and AI review.'
        },
        media: {
          kind: 'image',
          src: '/work/orca-git/mr.webp',
          width: 1440,
          height: 900,
          alt: { th: 'หน้ารายละเอียดของ merge request', en: 'A merge request’s detail page' },
          frame: 'browser'
        }
      },
      {
        title: { th: 'Merge queue ที่ไม่มีวันชนกัน', en: 'A merge queue that never collides' },
        body: {
          th: 'ติ๊กหลาย MR แล้วกด Approve & merge ระบบจะ merge ทีละตัวต่อโปรเจกต์ rebase ให้เองเมื่อ GitLab ขอ ระหว่างนั้นก็ทำงานอื่นต่อได้',
          en: 'Tick several MRs and Approve & merge: they go one at a time per project, rebasing when GitLab asks, while you keep working.'
        }
      },
      {
        title: { th: 'pipeline ของทุก branch ในหน้าเดียว', en: 'Every branch’s pipeline on one page' },
        body: {
          th: 'ดูสถานะ, commit, ใครเป็นคนรัน และทุก stage ได้ทั้ง GitHub และ GitLab',
          en: 'Status, commit, who started it and every stage, for GitHub and GitLab.'
        },
        media: {
          kind: 'image',
          src: '/work/orca-git/pipelines.webp',
          width: 1440,
          height: 900,
          alt: { th: 'หน้า pipeline', en: 'The pipelines page' },
          frame: 'browser'
        }
      },
      {
        title: { th: 'ตรวจอีกรอบก่อน commit', en: 'A second look before each commit' },
        body: {
          th: 'เตือนเมื่อเจอ secret, token หรือ key, ไฟล์ใหญ่ผิดปกติ หรือ commit ตรงเข้า main และให้ AI ร่าง commit message ให้',
          en: 'Flags secrets, tokens or keys, very big files and commits straight to main — and AI drafts the message.'
        }
      }
    ],
    how: {
      title: {
        th: 'ใช้ git และบัญชีที่มีอยู่ ไม่ต้องตั้งค่าอะไรใหม่',
        en: 'Your git, your login. Nothing new to set up.'
      },
      steps: [
        { th: 'ติดตั้งจาก plugin marketplace ของ Orca', en: 'Install from Orca’s plugin marketplace' },
        { th: 'เปิดโปรเจกต์ Git ในเครื่อง หรือผ่าน SSH', en: 'Open a Git project, local or over SSH' },
        {
          th: 'ล็อกอินด้วยบัญชี Git, gh หรือ glab ที่มีอยู่แล้ว',
          en: 'Sign in with the Git login, gh or glab you already have'
        },
        {
          th: 'รีวิว merge และดู pipeline ได้โดยไม่ต้องออกจาก editor',
          en: 'Review, merge and watch pipelines without leaving the editor'
        }
      ],
      media: {
        kind: 'image',
        src: '/work/orca-git/repos.webp',
        width: 1440,
        height: 900,
        alt: { th: 'repository ทั้งหมดในหน้าเดียว', en: 'All repositories on one page' },
        frame: 'browser'
      }
    },
    role: {
      th: 'ทำคนเดียว — ออกแบบ, ตัว plugin, worker และ test harness',
      en: 'Solo — design, the plugin, its worker and the test harness'
    },
    stage: {
      tone: '#8f7cff',
      chips: ['PR · MR', 'GitHub · GitLab · Bitbucket', 'SSH'],
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
    category: { th: 'Document engine', en: 'Document engine' },
    version: 'v2.4',
    tagline: {
      th: 'ใส่ template ได้เอกสาร เอา template Word/Excel กับข้อมูลมาออกเป็น PDF, Word หรือ Excel ผ่าน API เดียว',
      en: 'Templates in, documents out. Word/Excel templates plus data become PDF, Word or Excel through one API.'
    },
    summary: {
      th: 'ออกแบบเอกสารใน Word หรือ Excel ส่ง JSON ไปที่ endpoint เดียว แล้วได้ PDF, DOCX หรือ XLSX ที่เสร็จแล้วกลับมา จะ self-host หรือใช้บน cloud ก็ได้ มี SDK ของ Node กับ .NET และ MCP server ให้ AI agent ใช้',
      en: 'Design documents in Word or Excel, send JSON to one endpoint, and get a finished PDF, DOCX or XLSX back — self-hosted or in the cloud, with Node and .NET SDKs and an MCP server for AI agents.'
    },
    facts: [
      { value: '3', label: { th: 'ไฟล์ที่ออกได้: PDF · DOCX · XLSX', en: 'output formats: PDF · DOCX · XLSX' } },
      { value: '2', label: { th: 'SDK official: Node และ .NET', en: 'official SDKs: Node and .NET' } },
      {
        value: 'MCP',
        label: { th: 'server ให้ AI agent สั่ง render เอกสารเองได้', en: 'server so AI agents can render documents' }
      },
      {
        value: 'Gov',
        label: { th: 'ใช้ออกใบรับรองใน e-service ของภาครัฐ', en: 'renders certificates in a government e-service' }
      }
    ],
    why: {
      th: 'ระบบธุรกิจแทบทุกตัวต้องออกเอกสาร แล้ว layout ก็มักจะโดน hard-code ไว้ในโค้ด Qorstack Report ให้คนที่ถนัด Word เป็นเจ้าของ layout ไปเลย ส่วน dev แค่ส่งข้อมูลมา',
      en: 'Most business systems have to produce documents, and the layout usually ends up hard-coded. Qorstack Report lets whoever knows Word own the layout — developers only send data.'
    },
    features: [
      {
        title: { th: 'ต่อ API เสร็จในไม่กี่นาที', en: 'Wire up the API in minutes' },
        body: {
          th: 'ทุก template มีโค้ดพร้อม copy ทั้ง cURL, Node.js และ .NET ใส่ API key ส่ง JSON แล้วได้ไฟล์กลับมา มี SDK แบบ typed ที่ generate จาก OpenAPI spec และ MCP server ให้ AI agent',
          en: 'Every template comes with copy-ready code for cURL, Node.js and .NET: add your API key, send JSON, get the file back. Typed SDKs generated from the OpenAPI spec, and an MCP server for AI agents.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/api.webp',
          width: 1440,
          height: 900,
          alt: { th: 'เรียก API ด้วย cURL, Node.js และ .NET', en: 'API calls in cURL, Node.js and .NET' },
          frame: browser
        }
      },
      {
        title: { th: 'หน้า generate ที่ดูพรีวิวสดได้', en: 'A generate page with a live preview' },
        body: {
          th: 'ระบบอ่าน {{placeholder}} จากไฟล์ Word มาให้ กรอกค่า ตาราง รูป QR code และบาร์โค้ด แล้วกด Generate PDF ดูผลข้าง ๆ ได้เลย ยังไม่ต้องเขียนโค้ดสักบรรทัด',
          en: 'It reads the {{placeholders}} from your Word file, you fill in values, tables, images, QR codes and barcodes, press Generate PDF and see the result beside it — before writing a line of code.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/demo.webp',
          width: 1280,
          height: 720,
          animated: true,
          alt: { th: 'กรอก field แล้วกด Generate PDF', en: 'Filling fields and pressing Generate PDF' },
          frame: browser
        }
      },
      {
        title: { th: 'ออกแบบใน Word เรียก API แล้วได้เอกสาร', en: 'Design in Word, call the API, get the document' },
        body: {
          th: 'Template เป็นไฟล์ Word/Excel ธรรมดา render ด้วย OpenXML/ClosedXML แล้วแปลงผ่าน Gotenberg ผลที่ได้เลยตรงกับต้นฉบับ',
          en: 'Templates are plain Word/Excel files, rendered with OpenXML/ClosedXML and converted through Gotenberg, so the output matches the original.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/design-api.webp',
          width: 1280,
          height: 720,
          alt: { th: 'template Word วางคู่กับโค้ดเรียก API', en: 'A Word template next to the API call' },
          frame: browser
        }
      },
      {
        title: { th: 'Self-host ได้ด้วย compose ไฟล์เดียว', en: 'Self-host with one compose file' },
        body: {
          th: 'เอกสารไม่ออกนอก network ใช้ storage ที่รองรับ S3 ตัวไหนก็ได้ มี API key แยกต่อโปรเจกต์ และเก็บประวัติการ render ทุกครั้ง',
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
        title: { th: 'งานใหญ่รันแบบ async', en: 'Big jobs run async' },
        body: {
          th: 'จะเรียกแบบรอผลหรือส่งเป็น job แล้วรอ webhook ที่ sign ไว้ก็ได้ ลิงก์ดาวน์โหลดก็ sign และมีวันหมดอายุ S3 เลยไม่เคยถูกเปิดออกไปตรง ๆ',
          en: 'Call it synchronously or as a job with a signed webhook; download links are signed and time-limited, so S3 is never exposed.'
        }
      },
      {
        title: { th: 'มี docs ตั้งแต่วันแรก', en: 'Docs from day one' },
        body: {
          th: 'Quick start, ตัวแปร, ตาราง, รูป, QR code, บาร์โค้ด และการตั้งค่าไฟล์ ทุกหัวข้อมี request พร้อม copy',
          en: 'Quick start, variables, tables, images, QR codes, barcodes and file settings — each with a copy-ready request.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/docs.webp',
          width: 1440,
          height: 900,
          alt: { th: 'หน้า docs Quick start', en: 'The quick start docs' },
          frame: browser
        }
      }
    ],
    how: {
      title: { th: 'ส่ง template + JSON เข้าไป ได้เอกสารออกมา', en: 'Template + JSON in. Document out.' },
      steps: [
        { th: 'อัปโหลด template ที่ทำใน Word หรือ Excel', en: 'Upload a template made in Word or Excel' },
        { th: 'copy request ของ template นั้นไปใส่ในแอป', en: 'Copy that template’s request into your app' },
        { th: 'ส่ง JSON ผ่าน REST, SDK หรือ MCP', en: 'Send JSON over REST, an SDK or MCP' },
        { th: 'ได้ลิงก์ดาวน์โหลดที่ sign แล้ว — หรือรับเป็น webhook', en: 'Get a signed download link — or a webhook' }
      ],
      media: {
        kind: 'image',
        src: '/work/qorstack-report/how.webp',
        width: 1440,
        height: 700,
        alt: { th: 'อัปโหลด template ส่ง JSON แล้วได้ไฟล์', en: 'Upload a template, send JSON, get the file' },
        frame: browser
      }
    },
    role: {
      th: 'ทำคนเดียว — product, API, เว็บแอป, SDK และ DevOps',
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
        alt: { th: 'หน้า generate ของ Qorstack Report', en: 'The Qorstack Report generate page' },
        frame: 'browser'
      },
      float: {
        kind: 'image',
        src: '/work/qorstack-report/api-code.webp',
        width: 720,
        height: 452,
        alt: { th: 'เรียก API ด้วย cURL', en: 'The API call in cURL' },
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
      alt: { th: 'ภาพรวมของ Qorstack Report', en: 'Qorstack Report overview' },
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
      th: 'scanner ความปลอดภัยทุกตัว สรุปเป็นคำตอบเดียว scanner 7 ตัวอยู่ใน container เดียว',
      en: 'Every security scanner, one verdict. Seven scanners in one container.'
    },
    summary: {
      th: 'ผลจาก SonarQube, Trivy, Semgrep, Gitleaks, Grype, Checkov และ OWASP Dependency-Check มารวมที่เดียว แยกตามโปรเจกต์และ repo รวมเป็นรายการเดียว แล้วเทียบกับรอบสแกนก่อน จะได้รู้ว่าอะไรเพิ่งโผล่มาใหม่ อะไรแก้ไปแล้ว',
      en: 'Results from SonarQube, Trivy, Semgrep, Gitleaks, Grype, Checkov and OWASP Dependency-Check in one place, organised by project and repo, merged into one list and compared with the previous scan — so you see what is new and what got fixed.'
    },
    facts: [
      { value: '7', label: { th: 'scanner ใน container เดียว', en: 'scanners in one container' } },
      { value: '1', label: { th: 'ไฟล์ที่ใช้ติดตั้ง: docker-compose.yml', en: 'file to install: docker-compose.yml' } },
      { value: '6', label: { th: 'แพลตฟอร์ม CI ที่รองรับ', en: 'CI platforms supported' } },
      { value: 'arm64', label: { th: 'และ amd64 image บน GHCR', en: 'and amd64 images on GHCR' } }
    ],
    why: {
      th: 'scanner แต่ละตัวมี dashboard ของตัวเอง format ก็ของใครของมัน ScanHub เอามารวมไว้ที่เดียว แล้วให้ pipeline ถามแค่ข้อเดียว: ผ่านหรือบล็อก',
      en: 'Every scanner has its own dashboard and its own format. ScanHub puts them in one place and lets the pipeline ask a single question: pass or block?'
    },
    features: [
      {
        title: { th: 'ตั้งค่า CI คลิกเดียว', en: 'One-click CI setup' },
        body: {
          th: 'ถ้าเป็น GitHub หรือ GitLab ScanHub จะตั้ง secret และเปิด Pull Request สำหรับ setup ให้เอง แพลตฟอร์มอื่นได้ snippet สำเร็จรูปไป',
          en: 'For GitHub and GitLab, ScanHub sets the secret and opens the setup Pull Request itself. Other platforms get a ready-made snippet.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/auto-setup.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: {
            th: 'ScanHub เปิด pull request สำหรับ setup CI ให้',
            en: 'ScanHub opening a CI setup pull request'
          },
          frame: browser
        }
      },
      {
        title: { th: 'จะบล็อก หรือแค่รายงานก็ได้', en: 'Block or just report' },
        body: {
          th: 'เปลี่ยน gate ใน ScanHub ได้เลย ไม่ต้องแก้ pipeline',
          en: 'Change the gate in ScanHub — no pipeline edit.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/ci-gate.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { th: 'ตั้งค่า CI gate ใน ScanHub', en: 'CI gate settings in ScanHub' },
          frame: browser
        }
      },
      {
        title: { th: 'ของใหม่ vs ที่แก้แล้ว', en: 'New vs fixed' },
        body: {
          th: 'เก็บทุกรอบสแกนไว้เป็นประวัติ แล้ว diff กับรอบก่อนให้',
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
        title: { th: 'รายงานพร้อมส่งให้ลูกค้า', en: 'Client-ready reports' },
        body: {
          th: 'export เป็น PDF หรือ HTML และแชร์ลิงก์แบบมีรหัสผ่านได้',
          en: 'PDF or HTML export, and password-protected share links.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/report-export.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { th: 'export รายงานใน ScanHub', en: 'Exporting a report in ScanHub' },
          frame: browser
        }
      }
    ],
    how: {
      title: { th: 'CI แค่อัปโหลด source ที่เหลือ ScanHub จัดการเอง', en: 'CI uploads source. ScanHub does the rest.' },
      steps: [
        { th: 'pipeline ส่ง source archive มา', en: 'The pipeline sends the source archive' },
        { th: 'scanner ทุกตัวรันอยู่ใน container เดียว', en: 'All scanners run inside one container' },
        {
          th: 'รวม finding ตัดตัวซ้ำ แล้ว diff กับรอบสแกนก่อน',
          en: 'Findings merged, de-duplicated, diffed with the last scan'
        },
        { th: 'ส่งผลผ่านหรือบล็อกกลับไปให้ pipeline', en: 'Pass or block goes back to the pipeline' }
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
      th: 'ทำคนเดียว — product, backend, frontend และ DevOps',
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
        alt: { th: 'แดชบอร์ดความปลอดภัยของ ScanHub', en: 'ScanHub security dashboard' },
        frame: 'none'
      },
      float: {
        kind: 'image',
        src: '/work/scanhub/results.webp',
        width: 1280,
        height: 800,
        animated: true,
        alt: { th: 'หน้าสรุปผลของ ScanHub', en: 'ScanHub results overview' },
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
      alt: { th: 'หน้าสรุปผลของ ScanHub', en: 'ScanHub results overview' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'clipath',
    title: 'Clipath',
    category: { th: 'Desktop utility', en: 'Desktop utility' },
    version: 'v1.0',
    tagline: {
      th: 'จับภาพ annotate แล้ววาง path เครื่องมือ screenshot บน Windows สำหรับคนที่ทำงานกับ AI CLI',
      en: 'Capture. Annotate. Paste the path. A Windows screenshot tool for AI-CLI workflows.'
    },
    summary: {
      th: 'ทุกภาพที่จับจะเซฟลงโฟลเดอร์ที่ตั้งไว้ แล้ว copy path ของไฟล์ให้ทันที เอาไปวางใน Claude Code, Codex CLI, terminal, IDE หรือ issue tracker ได้เลย',
      en: 'Every capture is saved to a folder you choose and its file path is copied instantly — ready to paste into Claude Code, Codex CLI, terminals, IDEs and issue trackers.'
    },
    facts: [
      { value: '~170 ms', label: { th: 'จากกดคีย์ลัดจนเลือกพื้นที่ได้', en: 'from shortcut to selection' } },
      { value: '28 MB', label: { th: 'memory ตอน idle', en: 'memory while idle' } },
      { value: '0%', label: { th: 'CPU ตอน idle', en: 'CPU while idle' } },
      { value: 'Multi-DPI', label: { th: 'crop แม่นแม้ข้ามจอ', en: 'accurate crops across monitors' } }
    ],
    why: {
      th: 'ทำงานกับ AI coding agent ทีไร ต้องส่ง screenshot ให้มันดูตลอด แล้วก็ต้องเปิด Explorer ไล่หาไฟล์ที่เพิ่งแคปไป Clipath ทำให้ทั้งหมดนี้เหลือแค่กดคีย์เดียว',
      en: 'Working with AI coding agents means handing them screenshots constantly — and hunting through Explorer for the file you just took. Clipath makes it one keystroke.'
    },
    features: [
      {
        title: { th: 'annotate ได้ในที่เดียว', en: 'Annotate in place' },
        body: {
          th: 'มี blur, pixelate, ตัวเลขลำดับขั้น และ eyedropper ทำบน Konva',
          en: 'Blur, pixelate, step counters and an eyedropper, built on Konva.'
        }
      },
      {
        title: { th: 'เร็วตั้งแต่กดคีย์แรก', en: 'Fast from the first keystroke' },
        body: {
          th: 'ระหว่างใช้งาน WebView จะถูกอุ่นไว้ตลอด และปล่อยทิ้งเมื่อ idle ครบ 10 นาที',
          en: 'WebViews stay warm while you capture and are released after 10 idle minutes.'
        }
      },
      {
        title: { th: 'Rust build ตัวเล็ก', en: 'Small Rust build' },
        body: {
          th: 'xcap ใช้จับภาพ arboard ใช้กับ clipboard และเรียก Windows API ตรง ๆ',
          en: 'xcap for capture, arboard for the clipboard, the Windows API directly.'
        }
      }
    ],
    how: {
      title: { th: 'กดคีย์ลัด ได้ path ใน clipboard', en: 'Shortcut in. Path on the clipboard.' },
      steps: [
        { th: 'กดคีย์ลัดแล้วลากเลือกพื้นที่', en: 'Press the shortcut and drag a region' },
        { th: 'annotate ถ้าต้องการ', en: 'Annotate if you need to' },
        { th: 'ภาพเซฟลงโฟลเดอร์ที่ตั้งไว้', en: 'The capture is saved to your folder' },
        { th: 'วาง path ลงใน prompt ได้เลย', en: 'Paste the path into your prompt' }
      ],
      media: {
        kind: 'image',
        src: '/work/clipath/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'เว็บของ Clipath', en: 'Clipath website' },
        frame: browser
      }
    },
    role: {
      th: 'ทำคนเดียว — ออกแบบ, Rust, UI และเว็บไซต์',
      en: 'Solo — design, Rust, UI and the website'
    },
    stage: {
      tone: '#67e8f9',
      chips: ['~170 ms', '28 MB idle', 'Windows'],
      main: {
        kind: 'image',
        src: '/work/clipath/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'เว็บของ Clipath', en: 'Clipath website' },
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
      alt: { th: 'เว็บของ Clipath', en: 'Clipath website' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'thai-pdf-fixer',
    title: 'Thai PDF Fixer',
    category: { th: 'Accessibility', en: 'Accessibility' },
    version: 'v1.2',
    tagline: {
      th: 'ทำให้ PDF ภาษาไทยที่ข้อความเพี้ยนกลับมาอ่านได้ — สำหรับผู้พิการทางสายตาที่ใช้ NVDA และ JAWS',
      en: 'Broken Thai PDFs, readable again — for blind users on NVDA and JAWS.'
    },
    summary: {
      th: 'แปลง PDF ภาษาไทยที่ข้อความเพี้ยนเป็นไฟล์ Word ที่ screen reader อ่านได้ถูก ใช้คีย์บอร์ดได้ทุกขั้นตอนและมีเสียงบอกทุกขั้น Python ก็ใส่มาในตัวแล้ว ไม่ต้องลงอะไรเพิ่ม',
      en: 'Turns Thai PDFs with broken text into Word files that screen readers read correctly. Every step works from the keyboard and is announced, and Python is bundled — nothing else to install.'
    },
    facts: [
      { value: '100%', label: { th: 'ใช้คีย์บอร์ดได้ทั้งหมด', en: 'keyboard operable' } },
      { value: 'NVDA', label: { th: 'และ JAWS อ่านบอกทุกขั้นตอน', en: 'and JAWS announce every step' } },
      { value: '0', label: { th: 'ของที่ต้องลงเพิ่ม', en: 'extra things to install' } },
      { value: 'Auto', label: { th: 'อัปเดตตัวเองได้', en: 'updates itself' } }
    ],
    why: {
      th: 'PDF ไทยหลายไฟล์เก็บตัวอักษรผิดลำดับ ตาเห็นปกติดี แต่ screen reader อ่านออกมาเป็นภาษาต่างดาว ตัวนี้เลยซ่อมข้อความให้ก่อนจะถึงมือผู้ใช้',
      en: 'Many Thai PDFs store characters in the wrong order: they look fine but a screen reader reads gibberish. This repairs the text before it reaches the user.'
    },
    features: [
      {
        title: { th: 'ซ่อมสระและวรรณยุกต์', en: 'Repairs vowels and tone marks' },
        body: {
          th: 'แก้สระอำที่แตกและวรรณยุกต์ที่วางผิดที่ แล้วใช้ PyThaiNLP ช่วยตัดคำ',
          en: 'Fixes split sara am and misplaced tone marks, with PyThaiNLP for word boundaries.'
        },
        media: {
          kind: 'diagram',
          id: 'pdf-fixer',
          alt: { th: 'ข้อความก่อนและหลังแก้', en: 'Text before and after the fix' }
        }
      },
      {
        title: { th: 'ตารางและรูปยังอยู่ครบ', en: 'Keeps tables and images' },
        body: {
          th: 'ตารางกับรูปจะตามไปอยู่ในไฟล์ Word ด้วย',
          en: 'Tables and images come across into the Word file too.'
        }
      },
      {
        title: { th: 'ทำมาเพื่อ screen reader', en: 'Built for screen readers' },
        body: {
          th: 'ทุกขั้นตอนมีเสียงบอก มีเสียงแยกตอนสำเร็จและตอน error',
          en: 'Each step is announced, with sounds for success and errors.'
        }
      }
    ],
    how: {
      title: { th: 'ใส่ PDF ที่เพี้ยน ได้ Word ที่อ่านได้', en: 'Broken PDF in. Readable Word out.' },
      steps: [
        { th: 'เลือกไฟล์ PDF ด้วยคีย์บอร์ด', en: 'Pick a PDF with the keyboard' },
        {
          th: 'ดึงข้อความ ตาราง และรูปด้วย PyMuPDF กับ pdfplumber',
          en: 'Text, tables and images extracted with PyMuPDF and pdfplumber'
        },
        { th: 'เรียงลำดับตัวอักษรไทยใหม่ให้ถูก', en: 'Thai character order repaired' },
        { th: 'เซฟเป็น .docx แล้ว screen reader อ่านบอกผล', en: 'Saved as .docx, announced by the screen reader' }
      ]
    },
    role: {
      th: 'ทำคนเดียว — ออกแบบ, Python pipeline และแอป Tauri',
      en: 'Solo — design, the Python pipeline and the Tauri app'
    },
    stage: {
      tone: '#f5c033',
      chips: ['NVDA', 'JAWS', '100% keyboard'],
      main: {
        kind: 'diagram',
        id: 'pdf-fixer',
        alt: { th: 'ข้อความไทยก่อนและหลังแก้', en: 'Thai text before and after the fix' }
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
      alt: { th: 'ข้อความไทยก่อนและหลังแก้', en: 'Thai text before and after the fix' }
    }
  },
  {
    kind: 'product',
    slug: 'sage',
    title: 'Sage',
    category: { th: 'ruleset สำหรับ AI agent', en: 'AI agent ruleset' },
    version: 'v1.9',
    tagline: {
      th: 'ให้ AI เขียนโค้ดเหมือน senior dev ที่เก่งที่สุดในทีม — ถาม 4 ข้อก่อนแก้ทุกครั้ง',
      en: 'Make your AI code like your most senior dev — four questions before every change.'
    },
    summary: {
      th: 'protocol ที่เป็น Markdown ธรรมดา ให้ coding agent อ่านก่อนลงมือ: จำเป็นไหม อยู่ยาวไหม ปลอดภัยไหม ตกลงกันไว้แล้วหรือยัง ติดตั้งคำสั่งเดียว ใช้ได้กับหลาย agent',
      en: 'A plain-Markdown protocol coding agents read before they act: is it needed, will it last, is it safe, did we already agree? One-command install, works across agents.'
    },
    facts: [
      { value: '4', label: { th: 'คำถามก่อนแก้ทุกครั้ง', en: 'questions before every change' } },
      { value: '6+', label: { th: 'agent ที่รองรับ', en: 'agents supported' } },
      { value: '1', label: { th: 'คำสั่งติดตั้ง', en: 'install command' } },
      { value: '0', label: { th: 'runtime ที่ต้องรัน', en: 'runtimes to run' } }
    ],
    why: {
      th: 'AI เขียนโค้ดเร็วก็จริง แต่ไม่ดู context ของทีม ทำของที่มีอยู่แล้วซ้ำ แล้วก็บอกว่า "เสร็จแล้ว" ทั้งที่ไม่มีหลักฐาน Sage ทำให้ agent คิดแบบ senior ก่อนจะเริ่มพิมพ์',
      en: 'AI writes code fast but skips the team’s context, reinvents what exists and claims “done” without evidence. Sage makes the agent think like a senior before it types.'
    },
    features: [
      {
        title: { th: 'อ่าน context ของทีมก่อน', en: 'Reads the team’s context first' },
        body: {
          th: 'agent ต้องอ่าน decision และ pattern ที่มีอยู่ ก่อนจะเสนออะไรใหม่',
          en: 'The agent reads existing decisions and patterns before proposing anything new.'
        }
      },
      {
        title: { th: 'บอกความเสี่ยงก่อนลงมือ', en: 'Names the risk before acting' },
        body: {
          th: 'งานที่แตะเรื่องเงิน สิทธิ์ ข้อมูล หรือ public API ต้องหยุดให้คนตัดสินใจก่อน',
          en: 'Work touching money, permissions, data or public APIs stops for a decision first.'
        }
      },
      {
        title: { th: '"เสร็จ" ต้องมีหลักฐาน', en: '“Done” needs evidence' },
        body: {
          th: 'ต้องรัน build, test หรือ check จริง แล้วรายงานความเสี่ยงที่ยังเหลืออยู่',
          en: 'It has to run real builds, tests or checks and report the risk that’s left.'
        }
      }
    ],
    how: {
      title: { th: 'Markdown ไฟล์เดียว ไม่มี runtime', en: 'One Markdown file. No runtime.' },
      steps: [
        { th: 'ติดตั้งคำสั่งเดียว แล้วเลือก agent ที่ใช้', en: 'Install with one command and pick your agents' },
        { th: 'agent อ่าน AGENTS.md ก่อนเริ่มทุกงาน', en: 'The agent reads AGENTS.md before every task' },
        {
          th: 'ถาม 4 ข้อ แล้วเลือกทางที่แก้น้อยที่สุด',
          en: 'It asks the four questions and picks the smallest path'
        },
        { th: 'ตรวจผลจริง แล้วจดสิ่งที่ได้เรียนรู้ไว้', en: 'It validates for real and records what it learned' }
      ]
    },
    role: { th: 'ทำคนเดียว', en: 'Solo' },
    stage: {
      tone: '#f472b6',
      chips: ['AGENTS.md', 'Claude · Codex · Cursor', 'v1.9'],
      main: {
        kind: 'image',
        src: '/work/sage/site.webp',
        width: 1440,
        height: 900,
        alt: { th: 'เว็บของ Sage', en: 'Sage website' },
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
      alt: { th: 'เว็บของ Sage', en: 'Sage website' },
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
      th: 'แรงงานต่างชาติยืนยันตัวตนผ่านมือถือได้ ไม่ต้องเดินทางไปสำนักงาน',
      en: 'Foreign workers prove who they are with their phone — no office visit.'
    },
    tech: 'NFC passport chip · face match · OIDC · Flutter',
    summary: {
      th: 'แพลตฟอร์ม digital identity และใบอนุญาตทำงานสำหรับแรงงานต่างชาติในเขต EEC ใช้มือถืออ่านชิปในพาสปอร์ต แล้วเทียบกับใบหน้าของคนที่ถืออยู่',
      en: 'A digital identity and work-permit platform for foreign workers in Thailand’s Eastern Economic Corridor — where a phone reads the passport chip and matches the face holding it.'
    },
    role: {
      th: 'Full-stack · เขียนแอป Flutter และ mobile service เกือบทั้งหมด',
      en: 'Full-stack · wrote nearly all of the Flutter app and mobile service'
    },
    confidential: true,
    problem: {
      th: 'แรงงานต้องไปยืนยันตัวตนกับเจ้าหน้าที่ด้วยตัวเอง และระบบอื่นของรัฐก็เชื่อแค่รูปถ่ายพาสปอร์ตไม่ได้',
      en: 'Workers had to prove identity in person, and other government systems couldn’t trust a photo of a passport.'
    },
    did: {
      th: 'ทำแอป Flutter และ service เบื้องหลัง: อ่านชิป, OCR, face match และ sign-in ให้แอปพาร์ตเนอร์',
      en: 'Built the Flutter app and its service: chip reading, OCR, face match, and sign-in for partner apps.'
    },
    challenges: [
      {
        title: { th: 'อ่านชิป ePassport ผ่าน NFC', en: 'Reading the ePassport chip over NFC' },
        body: {
          th: 'สแกน MRZ ด้วย OCR บนเครื่อง (ML Kit) เพื่อเอา access key จากนั้นแอปอ่านชิปด้วย dmrtd แล้วตรวจข้อมูลจริง ไม่ได้เชื่อแค่รูปภาพ',
          en: 'The MRZ, scanned with on-device OCR (ML Kit), gives the access key; the app then reads the chip with dmrtd and checks the data instead of trusting an image.'
        }
      },
      {
        title: { th: 'เทียบใบหน้ากับรูปในชิป', en: 'Matching the face to the chip' },
        body: {
          th: 'detect ใบหน้าบนเครื่องก่อน แล้วให้ face-match service เทียบภาพที่ถ่ายสดกับรูปในชิป',
          en: 'On-device face detection, then a dedicated face-match service compares the live capture with the chip photo.'
        }
      },
      {
        title: { th: 'เป็น identity provider เอง', en: 'Becoming an identity provider' },
        body: {
          th: 'ทำ OIDC provider บน ZITADEL มี app-to-app sign-in (PKCE) ให้แอปพาร์ตเนอร์ล็อกอินผู้ใช้ด้วย EEC ID ได้',
          en: 'A custom OIDC provider on ZITADEL, with app-to-app sign-in (PKCE) so partner apps can log users in with their EEC ID.'
        }
      },
      {
        title: { th: 'บัตร generate ขึ้นมา ไม่ได้วาดเอง', en: 'Cards generated, not drawn' },
        body: {
          th: 'บัตร eID และใบอนุญาตทำงาน render จาก SVG template ฝั่ง server หน้าตาเหมือนกันทั้งในแอป, portal และตอนพิมพ์',
          en: 'eID and work-permit cards are rendered from SVG templates on the server — identical in the app, the portal and print.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'ตรวจที่ชิป ไม่ใช่ที่รูป', en: 'Verify the chip, not the picture' },
        body: {
          th: 'ผู้ใช้มีขั้นตอนเพิ่ม (สแกน MRZ แล้วแตะพาสปอร์ต) — แต่ข้อมูลที่ได้ถูก sign โดยประเทศที่ออกพาสปอร์ต',
          en: 'More steps for the user (scan the MRZ, then tap the passport) — but the data is signed by the issuing country.'
        }
      },
      {
        title: { th: 'ต่อยอดจาก ZITADEL แทนการเขียน auth เอง', en: 'Build on ZITADEL instead of writing auth' },
        body: {
          th: 'พาร์ตเนอร์ใช้ OIDC มาตรฐานได้เลย ส่วนหน้าจอและ claim ทำเองเฉพาะจุดที่ flow ของรัฐไม่เหมือนชาวบ้าน',
          en: 'Standard OIDC for partners; custom screens and claims only where the government flow differs.'
        }
      }
    ],
    owned: [
      {
        th: 'แอป Flutter ทั้งตัว (Riverpod, Freezed, Dio)',
        en: 'The Flutter app, end to end (Riverpod, Freezed, Dio)'
      },
      { th: 'mobile service ฝั่ง .NET', en: 'The .NET mobile service' },
      { th: 'ฟีเจอร์ใน web portal ของเจ้าหน้าที่', en: 'Features in the officer web portal' }
    ],
    gallery: [],
    stack: ['Flutter', '.NET 8', 'Next.js', 'ZITADEL', 'SignalR', 'PostgreSQL', 'FastAPI'],
    links: [],
    architecture: { kind: 'diagram', id: 'eec-id', alt: { th: 'สถาปัตยกรรมของ EEC ID', en: 'EEC ID architecture' } },
    cover: {
      kind: 'art',
      id: 'eec-id',
      alt: {
        th: 'ภาพประกอบ: มือถืออ่านชิปพาสปอร์ตและสแกนใบหน้า',
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
      th: 'บริษัทยื่นขอสิทธิประโยชน์ทางศุลกากรออนไลน์ เจ้าหน้าที่อนุมัติได้จากที่เดียว',
      en: 'Companies apply for customs privileges online; officers approve in one place.'
    },
    tech: '.NET 10 microservices · RabbitMQ · Kubernetes',
    summary: {
      th: 'e-service สิทธิประโยชน์ทางศุลกากรของเขต EEC บริษัทยื่นนำเข้าเครื่องจักรและวัตถุดิบ, BOQ, ขอปล่อยของแบบ fast-track และจ่ายเงินออนไลน์ ฝั่งเจ้าหน้าที่ก็ตรวจและอนุมัติในระบบ',
      en: 'The customs-privilege e-service for Thailand’s Eastern Economic Corridor: companies submit machinery and raw-material imports, BOQs, fast-track releases and e-payments; officers review and approve.'
    },
    role: {
      th: 'Full-stack · เว็บแอป, core service, ระบบงานตั้งเวลา (ทำเองตั้งแต่ศูนย์) และ payment service ส่วนใหญ่',
      en: 'Full-stack · web app, core service, the scheduling service (from scratch) and most of the payment service'
    },
    confidential: true,
    problem: {
      th: 'Phase 2 ต้องรื้อ Phase 1 มาเป็น microservices และต้องคุยกับระบบข้างนอก ทั้งลายเซ็นดิจิทัลของ DGA และ customs gateway ของ NSW ที่ตอบกลับแบบ async',
      en: 'Phase 2 re-architected Phase 1 into microservices, and had to talk to outside systems — DGA digital signatures and the asynchronous NSW customs gateway.'
    },
    did: {
      th: 'ช่วยวางโครง Phase 2 และเขียนงานทั้งในเว็บแอป, core service และ payment service',
      en: 'Helped shape the Phase 2 structure and built across the web app, the core service and the payment service.'
    },
    challenges: [
      {
        title: { th: 'ระบบข้างนอกที่ช้า', en: 'Slow outside systems' },
        body: {
          th: 'มี external service ตัวเดียวที่เป็นทางออกไปข้างนอก: DGA เรียกแบบ synchronous ส่วน NSW ส่งผ่าน RabbitMQ แล้ว poll รอคำตอบ',
          en: 'One external service is the only door out: DGA is called synchronously; NSW goes through RabbitMQ with polling for the answer.'
        }
      },
      {
        title: { th: 'งานที่รันตามเวลา', en: 'Work on a schedule' },
        body: {
          th: 'schedule service รัน job ด้วย Hangfire ได้ทั้งแบบ internal command และ HTTP callback',
          en: 'A schedule service runs Hangfire jobs as internal commands or HTTP callbacks.'
        }
      },
      {
        title: { th: 'ใบรับรองที่เชื่อถือได้', en: 'Certificates you can trust' },
        body: {
          th: 'PDF ใบรับรอง render ด้วย Qorstack Report ผ่าน Gotenberg',
          en: 'Certificate PDFs are rendered by Qorstack Report through Gotenberg.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'CQRS ใน Clean Architecture', en: 'CQRS inside Clean Architecture' },
        body: {
          th: 'แยก command กับ query ด้วย MediatR แล้ว validate ด้วย FluentValidation ทุก service หน้าตาโครงเดียวกัน คนในทีมเลยย้ายไปมาระหว่าง service ได้ง่าย',
          en: 'Commands and queries split with MediatR, validated with FluentValidation — the same shape in every service, so people move between them easily.'
        }
      },
      {
        title: { th: 'GitOps สำหรับ workload ราว 14 ตัว', en: 'GitOps for ~14 workloads' },
        body: {
          th: 'ใช้ Kustomize กับ Fleet ทุกการ deploy เลยรีวิวได้ใน git',
          en: 'Kustomize and Fleet make every deploy reviewable in git.'
        }
      }
    ],
    owned: [
      { th: 'ฟีเจอร์ในเว็บแอป Next.js 16', en: 'Features across the Next.js 16 web app' },
      { th: 'endpoint ใน core service .NET 10', en: 'Endpoints in the .NET 10 core service' },
      { th: 'payment service ส่วนใหญ่', en: 'Most of the payment service' }
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
        th: 'ภาพประกอบ: คำขอเดินจากยื่นเรื่องไปจนอนุมัติ',
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
      th: 'รายงาน export ของเว็บ Suvarnabhumi Airport Gate — วางโครงด้วย FastReport แล้วจูนให้เร็วขึ้น',
      en: 'Export reporting for the Suvarnabhumi Airport Gate website — structured with FastReport, then made faster.'
    },
    tech: 'Next.js · C# .NET · FastReport',
    summary: {
      th: 'พัฒนาเว็บ Suvarnabhumi Airport Gate ด้วย Next.js และ C# .NET ช่วยวางโครงระบบ export รายงานด้วย FastReport และทำให้ export เร็วขึ้น',
      en: 'Developed the Suvarnabhumi Airport Gate website with Next.js and C# .NET, helped structure its export reporting with FastReport, and made those exports faster.'
    },
    role: { th: 'Full-stack developer', en: 'Full-stack developer' },
    confidential: true,
    problem: {
      th: 'รายงาน export ต้องออกเร็วและถูกต้อง แม้ข้อมูลจะเยอะ',
      en: 'Export reports had to be fast and correct on large data.'
    },
    did: {
      th: 'ทำฟีเจอร์ทั้งเว็บและ API วางโครงงานรายงาน และจูน performance ของการ export',
      en: 'Built web and API features, structured the reporting work, and tuned export performance.'
    },
    challenges: [
      {
        title: { th: 'วางโครงงานรายงาน', en: 'Structuring the reports' },
        body: {
          th: 'วาง pattern ของ FastReport ให้ทั้งทีมทำตามแบบเดียวกัน',
          en: 'Set up a FastReport pattern the whole team could follow.'
        }
      },
      {
        title: { th: 'export ที่เร็วขึ้น', en: 'Faster exports' },
        body: {
          th: 'จูนการ export รายงานที่ข้อมูลเยอะให้เร็วขึ้น',
          en: 'Optimised report exports over large data sets.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'ฟีเจอร์เว็บฝั่ง Next.js', en: 'Next.js web features' },
      { th: 'API ฝั่ง C# .NET', en: 'C# .NET API' },
      { th: 'โครงและ performance ของรายงาน', en: 'Report structure and performance' }
    ],
    gallery: [],
    stack: ['Next.js', 'C#', '.NET', 'FastReport'],
    links: [],
    architecture: { kind: 'diagram', id: 'airport-gate', alt: { th: 'flow ของงานรายงาน', en: 'Reporting flow' } },
    cover: {
      kind: 'art',
      id: 'airport-gate',
      alt: {
        th: 'ภาพประกอบ: ป้ายเที่ยวบินขาออกกับไฟล์รายงานที่ export',
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
      th: 'ดูแลเว็บ รพ.สต. กว่า 200 แห่งให้ใช้งานและออกรายงานได้',
      en: 'Kept 200+ sub-district hospital websites running and reporting.'
    },
    tech: 'React · .NET · background reports · Cognito ↔ FusionAuth',
    summary: {
      th: 'ดูแลและต่อยอดระบบเว็บของ รพ.สต. กว่า 200 แห่งในจังหวัดลำปางร่วมกับทีม ด้วย React และ .NET',
      en: 'Maintained and extended the web systems of 200+ sub-district hospitals in Lampang province, with the team, in React and .NET.'
    },
    role: { th: 'นักศึกษาฝึกงาน Full-stack', en: 'Full-stack intern' },
    period: { th: 'ธ.ค. 2022 — มี.ค. 2024', en: 'Dec 2022 — Mar 2024' },
    confidential: true,
    problem: {
      th: 'รายงานใหญ่ ๆ timeout กลางทาง และระบบต้องเปลี่ยน identity provider ได้',
      en: 'Big reports timed out mid-request, and the system needed to switch identity providers.'
    },
    did: {
      th: 'ย้ายการสร้างรายงานไปรันเป็น background process และทำให้ระบบสลับใช้ Cognito หรือ FusionAuth ได้',
      en: 'Moved report generation to a background process, and made the system switchable between Cognito and FusionAuth.'
    },
    challenges: [
      {
        title: { th: 'รายงานที่ไม่ timeout แล้ว', en: 'Reports that don’t time out' },
        body: {
          th: 'รายงานไม่ได้ render ใน request แล้ว แต่ไปรันใน background พอเสร็จผู้ใช้ค่อยมาหยิบไฟล์',
          en: 'Reports no longer render inside the request — they run in the background and the user picks the file up when ready.'
        }
      },
      {
        title: { th: 'สลับระบบล็อกอินได้', en: 'Swappable sign-in' },
        body: {
          th: 'ซ่อน provider ไว้หลัง interface เดียว ระบบจะใช้ Cognito หรือ FusionAuth ก็ได้',
          en: 'The provider sits behind one interface, so the system can use Cognito or FusionAuth.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'ฟีเจอร์ใหม่ และบั๊กที่ได้รับมอบหมาย', en: 'New features and assigned bug fixes' },
      { th: 'ประมวลผลรายงานใน background', en: 'Background report processing' },
      { th: 'การสลับ identity provider', en: 'The identity-provider switch' }
    ],
    gallery: [],
    stack: ['React', '.NET', 'Cognito', 'FusionAuth'],
    links: [],
    architecture: {
      kind: 'diagram',
      id: 'lampang-health',
      alt: { th: 'flow รายงานแบบ background', en: 'Background report flow' }
    },
    cover: {
      kind: 'art',
      id: 'lampang-health',
      alt: {
        th: 'ภาพประกอบ: เว็บ รพ.สต. กว่า 200 แห่งส่งข้อมูลเข้ารายงานใน background',
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
      th: 'ย้ายวารสารของมหาวิทยาลัยออกจากเว็บเก่า 1,014 บทความ ไม่หายสักชิ้น',
      en: 'A university journal moved off a legacy site — 1,014 articles, nothing lost.'
    },
    tech: 'NestJS · Next.js 16 · SHA-256 verified migration',
    summary: {
      th: 'ทำเว็บวารสารวิชาการของมหาวิทยาลัยเชียงใหม่ใหม่ แทนเว็บ CodeIgniter ตัวเก่า มีหน้าอ่านสำหรับคนทั่วไป และหลังบ้านสำหรับงานบรรณาธิการครบชุด',
      en: 'A rebuild of Chiang Mai University’s academic journal, replacing a legacy CodeIgniter site, with a public reader and a full editorial back office.'
    },
    role: {
      th: 'ทำคนเดียว — backend, frontend และการย้ายข้อมูล',
      en: 'Solo — backend, frontend and the data migration'
    },
    confidential: false,
    problem: {
      th: 'บทความหลายปีเก็บอยู่ใน MySQL ของเว็บ CodeIgniter เก่า และบรรณาธิการต้องการระบบที่จัดการงานรีวิวได้จริงจัง',
      en: 'Years of articles lived in the old CodeIgniter site’s MySQL, and editors needed a system that handled review properly.'
    },
    did: {
      th: 'ออกแบบ API กับเว็บใหม่ เขียน migration ที่ตรวจทุกไฟล์ และทำหลังบ้านสำหรับบรรณาธิการ',
      en: 'Designed the new API and site, wrote a migration that checks every file, and built the editorial back office.'
    },
    result: {
      th: 'ย้ายครบทั้ง 1,014 บทความ 25 เล่ม 76 ฉบับ และผ่าน integrity check หลัง import ทั้ง 25 ข้อ',
      en: 'All 1,014 articles, 25 volumes and 76 issues migrated, with 25 post-import integrity checks passing.'
    },
    challenges: [
      {
        title: { th: 'migration ที่ไม่ทำอะไรหาย', en: 'A migration that loses nothing' },
        body: {
          th: 'ทุกไฟล์ถูกเช็ก SHA-256 เทียบกับต้นทาง ไม่ใช่แค่นับจำนวน',
          en: 'Every asset is verified against its source by SHA-256, not just counted.'
        }
      },
      {
        title: { th: 'แก้พร้อมกันได้โดยไม่ทับกัน', en: 'Safe concurrent editing' },
        body: {
          th: 'ตอน publish จะเช็ก revision ภายใต้ transaction lock คนที่มาแก้ทีหลังเลยเขียนทับงานคนอื่นเงียบ ๆ ไม่ได้',
          en: 'Publishing checks revisions under transaction locks, so a late editor can’t silently overwrite someone else.'
        }
      },
      {
        title: { th: 'ความปลอดภัยตอนล็อกอิน', en: 'Sign-in security' },
        body: {
          th: 'CMU SSO, token แบบ compact JWE และ rotating refresh token — ถ้ามี token โดน replay จะ revoke ทั้ง family',
          en: 'CMU SSO, compact JWE tokens and rotating refresh tokens — a replayed token revokes its whole family.'
        }
      },
      {
        title: { th: 'พิมพ์สมการใน editor ได้', en: 'Math in the editor' },
        body: {
          th: 'editor ใช้ TipTap กับ KaTeX และ MathLive สำหรับบทความวิทยาศาสตร์',
          en: 'A TipTap editor with KaTeX and MathLive for scientific articles.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'รีดีไซน์หลังบ้านจากหลักฐาน', en: 'Redesign the back office from evidence' },
        body: {
          th: 'ทำ design review เทียบ before/after ทั้ง desktop และ mobile ก่อนจะเลือกทาง',
          en: 'Ran a before/after design review on desktop and mobile before picking a direction.'
        }
      }
    ],
    owned: [
      { th: 'NestJS API, Prisma และ PostgreSQL', en: 'NestJS API, Prisma and PostgreSQL' },
      { th: 'เว็บ Next.js 16 และหลังบ้าน', en: 'The Next.js 16 site and back office' },
      { th: 'migration และการตรวจสอบหลังย้าย', en: 'The migration and its verification' },
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
        alt: { th: 'แดชบอร์ดหลังบ้าน ก่อนรีดีไซน์', en: 'Back-office dashboard, before' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/dashboard-after.webp',
        width: 1440,
        height: 900,
        alt: { th: 'แดชบอร์ดหลังบ้าน หลังรีดีไซน์', en: 'Back-office dashboard, after' },
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
      th: 'ทำเนียบนักวิจัยของ มช. — ข้อมูล sync ตลอด และนักวิจัยเลือกเองว่าจะเปิดอะไรให้คนเห็น',
      en: 'Chiang Mai University’s researcher directory — always in sync, and researchers choose what is public.'
    },
    tech: 'Sync from CMU Central · PDPA onboarding · RBAC · audit trail',
    summary: {
      th: 'ทำเนียบนักวิจัยมหาวิทยาลัยเชียงใหม่ที่ใครก็เข้าดูได้ มีพื้นที่ส่วนตัวให้นักวิจัยดูแลโปรไฟล์เอง และ admin portal สำหรับสำนักงาน',
      en: 'A public directory of Chiang Mai University researchers, with a private workspace where researchers manage their own profile and an admin portal for the office.'
    },
    role: {
      th: 'Full-stack · backend, เว็บสาธารณะ และพื้นที่ของนักวิจัย',
      en: 'Full-stack · backend, public site and researcher workspace'
    },
    confidential: false,
    problem: {
      th: 'ข้อมูลนักวิจัยต้องตรงกับระบบกลางของมหาวิทยาลัย และจะเผยแพร่อะไรก็ต้องได้ consent จากนักวิจัยตาม PDPA ก่อน',
      en: 'Researcher data had to match the university’s central system, and nothing could go public without the researcher’s consent under PDPA.'
    },
    did: {
      th: 'sync ข้อมูลจาก CMU Central ทุกสัปดาห์หรือสั่งเองก็ได้ ทำ onboarding สองขั้นที่ขอ consent ก่อน และทำ admin ที่ log ทุกการเปลี่ยนแปลง',
      en: 'Synced from CMU Central weekly or on demand, built a two-step onboarding that asks for consent first, and an admin that logs every change.'
    },
    challenges: [
      {
        title: { th: 'sync จาก CMU Central', en: 'Sync from CMU Central' },
        body: {
          th: 'job รายสัปดาห์บน @nestjs/schedule ที่สั่งรันเองได้ด้วย ทุกการเปลี่ยนแปลงเก็บค่าก่อนและหลังไว้ใน log',
          en: 'A weekly job on @nestjs/schedule that can also run on demand; every change is logged before and after.'
        }
      },
      {
        title: { th: 'ขอ consent ก่อนเผยแพร่', en: 'Consent before publishing' },
        body: {
          th: 'onboarding สองขั้น: อ่านประกาศความเป็นส่วนตัวก่อน แล้วค่อยกรอกโปรไฟล์ — มีพรีวิวการ์ดในทำเนียบให้ดูก่อนจะมีอะไรขึ้นไปจริง',
          en: 'Two-step onboarding: the privacy notice first, then the profile — with a live preview of the directory card before anything goes public.'
        }
      },
      {
        title: { th: 'อัปโหลดไฟล์อย่างปลอดภัย', en: 'Safe uploads' },
        body: {
          th: 'เช็กไฟล์จาก magic bytes ไม่ใช่ดูแค่นามสกุล ก่อนจะเข้า MinIO และ API มี rate limit',
          en: 'Files are checked by magic bytes, not extension, before they reach MinIO, and the API is rate-limited.'
        }
      },
      {
        title: { th: 'API แบบ contract-first', en: 'Contract-first API' },
        body: {
          th: 'client ฝั่งหน้าบ้าน generate จาก Swagger ของ backend ด้วย swagger-typescript-api',
          en: 'The front-end client is generated from the backend’s Swagger with swagger-typescript-api.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'role แบบปรับได้', en: 'Dynamic roles' },
        body: {
          th: 'ตั้งค่า RBAC ได้จาก admin แต่ละทีมเลยเห็นเฉพาะส่วนที่ตัวเองดูแล',
          en: 'RBAC configured from the admin, so each team sees only what it manages.'
        }
      },
      {
        title: { th: 'backend ตัวเดียว ใช้ร่วมกับเว็บ ORA', en: 'One backend, shared with the ORA site' },
        body: {
          th: 'ทำเนียบนักวิจัยกับเว็บ ORA ใช้ API, RBAC model และ audit log ชุดเดียวกัน',
          en: 'The directory and the ORA site share one API, one RBAC model and one audit log.'
        }
      }
    ],
    owned: [
      { th: 'NestJS API, Prisma และ sync job', en: 'NestJS API, Prisma and the sync jobs' },
      { th: 'ทำเนียบนักวิจัยฝั่งสาธารณะ', en: 'The public directory' },
      { th: 'พื้นที่นักวิจัยและ onboarding', en: 'The researcher workspace and onboarding' },
      { th: 'admin portal', en: 'The admin portal' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/login.webp',
        width: 1600,
        height: 900,
        alt: { th: 'หน้าล็อกอินเข้าพื้นที่นักวิจัย', en: 'Researcher workspace sign-in' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/onboarding.webp',
        width: 1424,
        height: 890,
        alt: { th: 'onboarding ขั้นที่ 2: โปรไฟล์นักวิจัย', en: 'Onboarding step 2: the researcher profile' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/privacy.webp',
        width: 1600,
        height: 799,
        alt: { th: 'ตั้งค่าความเป็นส่วนตัวของนักวิจัย', en: 'Researcher privacy settings' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/admin.webp',
        width: 1600,
        height: 755,
        alt: { th: 'admin จัดการนักวิจัย', en: 'Admin researcher management' },
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
      th: 'หา deadline ทุนวิจัยเจอใน 10 วินาที',
      en: 'Find a funding deadline in ten seconds.'
    },
    tech: 'Next.js 16 · GSAP · CMS · shared NestJS backend',
    summary: {
      th: 'เว็บใหม่ของสำนักงานบริหารงานวิจัย มหาวิทยาลัยเชียงใหม่ มีประกาศทุน ปฏิทินกิจกรรม ข่าว และเอกสาร พร้อม CMS ที่สำนักงานดูแลเองได้',
      en: 'The new site for Chiang Mai University’s Office of Research Administration: funding calls, an events calendar, news and documents, with a CMS the office runs itself.'
    },
    role: {
      th: 'Full-stack · เว็บ, CMS และการย้ายเนื้อหา',
      en: 'Full-stack · site, CMS and content migration'
    },
    confidential: false,
    problem: {
      th: 'นักวิจัยต้องเห็นทุนที่ใกล้ปิดรับให้เร็ว และสำนักงานต้องอัปเดตเว็บเองได้โดยไม่ต้องรอ dev',
      en: 'Researchers needed to spot closing funding calls fast, and the office needed to update the site without a developer.'
    },
    did: {
      th: 'ออกแบบหน้าแรกโดยเอา deadline ทุนเป็นตัวตั้ง เพิ่มปฏิทินกับคลังเอกสาร และทำ CMS ที่คุมได้ทุกส่วนของเว็บ',
      en: 'Built the home page around funding deadlines, added a calendar and a document library, and a CMS covering every part of the site.'
    },
    challenges: [
      {
        title: { th: 'deadline มาก่อน', en: 'Deadlines first' },
        body: {
          th: 'หน้าแรกขึ้นทุนที่ใกล้ปิดรับก่อนเลย พร้อมไทม์ไลน์ 90 วัน',
          en: 'The home page leads with calls about to close and a 90-day timeline.'
        }
      },
      {
        title: { th: 'CMS ที่คุมได้ทั้งเว็บ', en: 'A CMS for the whole site' },
        body: {
          th: 'hero slide, เครือข่ายวิจัย, ประกาศทุน, เอกสาร และ user role จัดการจาก admin ได้หมด',
          en: 'Hero slides, consortiums, funding calls, documents and user roles are all managed from the admin.'
        }
      },
      {
        title: { th: 'เนื้อหาจากเว็บเก่า', en: 'Content from the old site' },
        body: {
          th: 'เขียน migration tool ย้ายข่าวและเอกสารจากเว็บเก่ามา',
          en: 'Migration tooling brought news and documents across from the old site.'
        }
      }
    ],
    decisions: [
      {
        title: { th: 'ใช้ backend ร่วมกับ Research Gallery', en: 'Share the Research Gallery backend' },
        body: {
          th: 'ไม่ทำ API ตัวที่สอง: สองเว็บใช้ข้อมูลนักวิจัย, role และ audit log ร่วมกัน',
          en: 'No second API: both sites share researcher data, roles and the audit log.'
        }
      }
    ],
    owned: [
      { th: 'เว็บ Next.js 16', en: 'The Next.js 16 site' },
      { th: 'CMS และ user role', en: 'The CMS and user roles' },
      { th: 'ย้ายเนื้อหาจากเว็บเก่า', en: 'Content migration from the old site' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/ora-cmu/closing.webp',
        width: 1440,
        height: 900,
        alt: { th: 'ทุนที่ใกล้ปิดรับและไทม์ไลน์ 90 วัน', en: 'Funding calls closing soon and the 90-day timeline' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/funding.webp',
        width: 1440,
        height: 900,
        alt: { th: 'ค้นหาทุนวิจัย', en: 'Funding search' },
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
        alt: { th: 'คลังเอกสาร', en: 'Document library' },
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
      alt: { th: 'หน้าแรกของเว็บ ORA', en: 'ORA home page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'junior-bootcamp',
    title: 'Junior Bootcamp CMU',
    client: { th: 'สำนักงานบริหารงานวิจัย มช. · ฟรีแลนซ์', en: 'CMU Research Administration · freelance' },
    tagline: {
      th: 'ระบบอบรมที่รู้ขีดจำกัดตัวเองก่อนวันสอบ: QR check-in, สอบจับเวลา และ live monitor',
      en: 'A training portal that knew its limits before exam day: QR check-in, timed exams and a live monitor.'
    },
    tech: 'Next.js full-stack · Prisma · SSE · k6 load tests',
    summary: {
      th: 'ระบบอบรมนักวิจัยรุ่นใหม่ของมหาวิทยาลัยเชียงใหม่ มีรุ่น, โมดูล, QR check-in, สอบจับเวลา, ใบประกาศ และ live monitor ให้แอดมินกับผู้สอน',
      en: 'Chiang Mai University’s training portal for junior researchers: cohorts, modules, QR check-in, timed exams, certificates and live monitors for admins and teachers.'
    },
    role: { th: 'ทำคนเดียว', en: 'Solo' },
    confidential: false,
    problem: {
      th: 'วันสอบคนเข้าพร้อมกันหลายร้อยคน ระบบห้ามล่มกลางสอบ และเช็กอินต้องไว',
      en: 'Hundreds of people sit the exam at once; the system can’t fall over mid-exam, and check-in has to be quick.'
    },
    did: {
      th: 'ทำทั้งระบบ แล้ว load test production ด้วย k6 จนมันพัง จากนั้นจูนก่อนถึงวันจริง',
      en: 'Built the whole system, then load-tested production with k6 until it broke, and tuned it before the real day.'
    },
    result: {
      th: '600 คนสอบพร้อมกัน error 0% — และรู้ว่าจุดพังอยู่ที่ 800 ตั้งแต่ก่อนถึงวันจริง',
      en: '600 concurrent exam-takers with 0% errors — and a known breaking point at 800, before the real day.'
    },
    challenges: [
      {
        title: { th: 'QR check-in', en: 'QR check-in' },
        body: {
          th: 'QR ตัวใหญ่ไว้ฉายจอ มีวันหมดอายุ และตรงกันทุกเครื่อง',
          en: 'A large projector-ready QR that expires and matches on every device.'
        }
      },
      {
        title: { th: 'สอบจับเวลา', en: 'Timed exams' },
        body: {
          th: 'ตั้งเวลาเปิดปิดได้ ส่งคำตอบอัตโนมัติ และต้องทำ pre-test ก่อน post-test',
          en: 'Scheduled open and close, auto-submit, and pre-test before post-test.'
        }
      },
      {
        title: { th: 'live monitor', en: 'Live monitoring' },
        body: {
          th: 'ใช้ SSE ส่ง progress แบบสดให้แอดมินและผู้สอน',
          en: 'SSE streams progress live to admins and teachers.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'ทั้งระบบ: Next.js, API, database', en: 'The whole system: Next.js, API, database' },
      { th: 'OTP ทางอีเมลและความปลอดภัยตอนล็อกอิน', en: 'Email OTP and sign-in security' },
      { th: 'load test และ E2E test', en: 'Load tests and E2E tests' }
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
      th: 'แอป e-book สำหรับนักเรียนที่อ่านออกเสียง ไฮไลต์ทีละคำ และใช้ต่อได้แม้ออฟไลน์',
      en: 'An e-book app for students that reads aloud, highlights each word, and keeps working offline.'
    },
    tech: 'Next.js PWA · ElevenLabs · IndexedDB',
    summary: {
      th: 'คลัง e-book และวิดีโอสำหรับนักเรียน เปิดบนเว็บหรือติดตั้งเป็นแอปก็ได้ มีอ่านออกเสียงที่ไฮไลต์ตามทีละคำ',
      en: 'An e-book and video library for students, on the web or installed as an app, with read-aloud that highlights word by word.'
    },
    role: {
      th: 'เขียนหน้าบ้านเกือบทั้งหมด และงาน read-aloud ฝั่ง API',
      en: 'Wrote nearly all of the front end, plus the read-aloud API work'
    },
    confidential: false,
    problem: {
      th: 'นักเรียนต้องได้ยินและเห็นคำที่กำลังอ่านไปพร้อมกัน และอ่านได้แม้ไม่มีเน็ต',
      en: 'Students needed to hear and see the current word together, and read without a connection.'
    },
    did: {
      th: 'ทำ read-aloud ที่ sync ทีละคำ ทำให้อ่านออฟไลน์ได้ และมีแบบทดสอบที่ AI สร้าง',
      en: 'Built word-synced read-aloud, offline reading, and AI-made quizzes.'
    },
    challenges: [
      {
        title: { th: 'อ่านออกเสียงทีละคำ', en: 'Word-by-word read-aloud' },
        body: {
          th: 'เสียงจาก ElevenLabs cache ไว้ที่ server พร้อม timing ของแต่ละคำ',
          en: 'ElevenLabs audio cached on the server with word timings.'
        }
      },
      {
        title: { th: 'อ่านออฟไลน์ได้', en: 'Offline reading' },
        body: {
          th: 'PWA ที่เก็บ e-book และไฟล์เสียงไว้ในเครื่อง',
          en: 'A PWA that stores e-books and audio on the device.'
        }
      }
    ],
    decisions: [],
    owned: [
      { th: 'หน้าบ้านของแอป', en: 'The app’s front end' },
      { th: 'read-aloud และ PWA แบบออฟไลน์', en: 'Read-aloud and the offline PWA' }
    ],
    stack: ['Next.js', 'next-pwa', 'IndexedDB', 'ElevenLabs', 'react-reader', 'Express', 'Prisma'],
    links: [{ label: { th: 'เว็บไซต์', en: 'Website' }, href: 'https://library.engeniusapp.com' }],
    cover: {
      kind: 'image',
      src: '/work/readitgo/cover.webp',
      width: 1600,
      height: 1000,
      alt: { th: 'ReadItGo บนมือถือ', en: 'ReadItGo on mobile' },
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
