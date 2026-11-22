/**
 * Results, timelines and real obstacles for each project, taken from the
 * repos' commit history, changelogs and reports. Nothing here is estimated:
 * if a number is not written down in the project, it is not on this page.
 */
import type { L, Obstacle } from './types'

export type Story = { timeline?: L; results?: L[]; obstacles?: Obstacle[] }

export const stories: Record<string, Story> = {
  'git-control-orca': {
    timeline: {
      th: '5 → 22 พ.ย. 2026 · 136 commits · 38 releases (v0.5 → v0.12.1) · ทำร่วมกับ AI coding agent',
      en: '5 → 22 Nov 2026 · 136 commits · 38 releases (v0.5 → v0.12.1) · built with AI coding agents'
    },
    results: [
      {
        th: 'รองรับ PR/MR และ pipeline ของ GitHub, GitLab และ Bitbucket Cloud',
        en: 'PRs/MRs and pipelines for GitHub, GitLab and Bitbucket Cloud'
      },
      {
        th: 'วัดจริงด้วย perf test: status 162 → ~106 ms, refs 180 → ~34 ms, submodules 519 → 0 ms',
        en: 'Measured by the perf test: status 162 → ~106 ms, refs 180 → ~34 ms, submodules 519 → 0 ms'
      },
      {
        th: 'ค้นประวัติบน repo ใหญ่เร็วขึ้น ~10–40 เท่า และแท็บ pipeline เร็วขึ้น ~3 เท่า',
        en: 'History search ~10–40× faster on big repos; pipelines tab ~3× faster'
      },
      {
        th: 'มีคนนอกส่ง PR เข้ามาและถูก merge แล้ว (SSH hosts, แก้ช่องโหว่ XSS) และรองรับ 5 ภาษาตามที่ผู้ใช้ขอ',
        en: 'External contributors’ PRs merged (SSH hosts, an XSS fix); five UI languages after a user request'
      },
      {
        th: 'ชุดทดสอบ ~21 สคริปต์ รวม e2e, perf, rate limit และ 52 checks สำหรับ Bitbucket พร้อมรันกับ API จริง',
        en: '~21 test scripts incl. e2e, perf, rate-limit, and 52 Bitbucket checks plus a live read-only run'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'สลับโปรเจกต์แล้วค้าง: ทุกแท็บถาม Orca ทุก 3 วินาที (เรียก CLI ทุกครั้ง) และรัน git status ทุก 4 วินาที แม้แท็บถูกซ่อนอยู่',
          en: 'Switching projects stalled: every tab asked Orca for the workspace every 3 s (spawning the CLI) and ran git status every 4 s, even when hidden.'
        },
        fix: {
          th: 'แท็บที่ซ่อนหยุด poll, ข้ามการถามเมื่อรู้โปรเจกต์อยู่แล้ว และ worker เก็บ cache ของ workspace แล้วล้างเมื่อมี event เปลี่ยน',
          en: 'Hidden tabs stop polling, the lookup is skipped when the project is known, and the worker caches the workspace map until a change event.'
        }
      },
      {
        problem: {
          th: 'repo ที่มี remote branch 300+ ตัวทำให้ทั้งแอปช้า',
          en: 'A repo with 300+ remote branches made the whole app slow.'
        },
        fix: {
          th: 'git process เดียวต่อ status, cache ตาม fingerprint ของ refs/HEAD, ดึงรายละเอียด commit แบบขนาน และใช้ content-visibility ให้แถวนอกจอไม่ต้องคำนวณ layout',
          en: 'One git process per status, caching keyed on a refs/HEAD fingerprint, parallel detail fetches, and content-visibility so off-screen rows skip layout.'
        }
      },
      {
        problem: {
          th: 'ช่องทางของ plugin รับข้อมูลได้แค่ 1 MiB ต่อคำตอบ repo ที่มีไฟล์ใหม่หลายพันไฟล์หรือ tag เยอะจึงโหลดไม่ขึ้น',
          en: 'The plugin channel caps each answer at 1 MiB, so repos with thousands of new files or many tags failed to load.'
        },
        fix: {
          th: 'ย่อโฟลเดอร์ใหม่เหลือบรรทัดเดียวและจำกัด 3,000 ไฟล์ แล้วต่อมาแบ่งคำตอบใหญ่เป็นชิ้นตามจำนวน byte ของ UTF-8 แล้วประกอบคืนฝั่ง panel',
          en: 'Collapsed new folders and capped at 3,000 files, then later split oversized answers into UTF-8-byte-counted parts that the panel reassembles.'
        }
      },
      {
        problem: {
          th: 'ช่องโหว่: Markdown ในคำอธิบาย MR ฝัง event handler ได้ และ repo ที่ใส่ symlink ทำให้ plugin เขียนไฟล์นอกโฟลเดอร์ได้',
          en: 'Security: Markdown in MR descriptions could inject an event handler, and a symlinked file in a repo could make the plugin write outside it.'
        },
        fix: {
          th: 'เรนเดอร์ลิงก์ในรอบเดียวแทนสองรอบ และเปิดไฟล์ด้วย O_NOFOLLOW',
          en: 'Render links in a single pass instead of two, and open those files with O_NOFOLLOW.'
        }
      },
      {
        problem: {
          th: 'ชน rate limit ของ GitHub และ Bitbucket (HTTP 429) และ API จริงของ Bitbucket ทำงานต่างจากเอกสาร',
          en: 'GitHub and Bitbucket rate limits (HTTP 429), and Bitbucket’s real API behaving differently from its docs.'
        },
        fix: {
          th: 'แชร์การค้นหาข้ามหน้าจอและหยุดรอเมื่อถึง limit เก็บรายการล่าสุดไว้บนจอ และไล่ทดสอบทีละกรณีกับ API จริง',
          en: 'Share searches across views and pause at the limit while keeping the last lists on screen, and test each case against the real API.'
        }
      }
    ]
  },
  'qorstack-report': {
    timeline: {
      th: 'ม.ค. → พ.ย. 2026 · ~1,060 commits ใน 4 repo · เดิมชื่อ Rendox · v2.0 (เปลี่ยนสถาปัตยกรรม) ต.ค. 2026',
      en: 'Jan → Nov 2026 · ~1,060 commits across 4 repos · formerly “Rendox” · v2.0 re-architecture in Oct 2026'
    },
    results: [
      { th: '43 ดาวและ 7 fork บน GitHub', en: '43 stars and 7 forks on GitHub' },
      {
        th: 'SDK เผยแพร่บน NuGet และ npm เวอร์ชันตรงกับ server และ release pipeline ส่งขึ้น Docker Hub, NuGet, npm',
        en: 'SDKs on NuGet and npm, versioned with the server; one release pipeline to Docker Hub, NuGet and npm'
      },
      {
        th: 'MCP server 5 เครื่องมือ ให้ AI agent สร้างเอกสารได้เอง',
        en: 'An MCP server with 5 tools so AI agents can render documents'
      },
      {
        th: 'ใช้ออกใบรับรองจริงในระบบ e-service ภาครัฐ',
        en: 'Renders real certificates inside a government e-service'
      },
      {
        th: 'แก้ปัญหาตามที่ลูกค้าแจ้ง เช่น ล็อกอินผ่าน HTTP บน intranet',
        en: 'Customer-driven fixes, e.g. sign-in over plain HTTP on an intranet'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'PDF ที่แปลงด้วย LibreOffice หน้าตาไม่ตรงกับ Word โดยเฉพาะภาษาไทย: ตัดบรรทัดต่าง ฟอนต์สำรองดันเนื้อหาลง ย่อหน้าหาย',
          en: 'LibreOffice PDFs didn’t match Word, especially Thai: different line breaks, fallback fonts pushing text down, lost indents.'
        },
        fix: {
          th: 'สร้างตารางค่าฟอนต์ (WordFontMetrics) เพื่อเลียนความสูงบรรทัดและความกว้างตัวอักษรของ Word ชดเชย thaiDistribute และแทรกจุดตัดคำระหว่างไทยกับอังกฤษ',
          en: 'A generated WordFontMetrics table for Word’s line heights and glyph widths, compensation for thaiDistribute, and break points at Thai/Latin boundaries.'
        }
      },
      {
        problem: { th: 'สร้าง PDF และอัปโหลดช้า', en: 'PDF generation and uploads were slow.' },
        fix: {
          th: 'เลิกใช้ PDF/A-1b ที่ช้ากว่า 2–3 เท่า ปิด Expect: 100-continue และเพิ่ม concurrency ของการอัปโหลดฟอนต์จาก 16 เป็น 64',
          en: 'Dropped PDF/A-1b (2–3× slower), disabled Expect: 100-continue, and raised font-upload concurrency from 16 to 64.'
        }
      },
      {
        problem: {
          th: 'คิวงาน async ต้องรอดเมื่อ server รีสตาร์ตและขยายได้',
          en: 'The async render queue had to survive restarts and scale out.'
        },
        fix: {
          th: 'ย้ายคิวไปไว้ใน PostgreSQL ใช้ FOR UPDATE SKIP LOCKED, LISTEN/NOTIFY, lease ที่คืนได้เมื่อ worker ล่ม, retry และ webhook ที่มีลายเซ็น HMAC',
          en: 'Moved the queue into PostgreSQL: FOR UPDATE SKIP LOCKED, LISTEN/NOTIFY, reclaimable leases after crashes, retries, and HMAC-signed webhooks.'
        }
      },
      {
        problem: {
          th: 'กัน SSRF จากลิงก์รูปภาพแล้ว แต่ผู้ใช้ที่ติดตั้งเองบน intranet ใช้งานไม่ได้',
          en: 'Blocking SSRF in image URLs broke self-hosted users on intranets.'
        },
        fix: {
          th: 'ยอมรับว่าเลือกผิด เปลี่ยนเป็นอนุญาตเฉพาะ http(s) พร้อมจำกัดขนาดและเวลา แล้วออกเป็น patch release',
          en: 'Reversed the decision: http(s) only with size and time limits, shipped as a patch release.'
        }
      },
      {
        problem: {
          th: 'อัปเกรด v1 → v2 เปลี่ยนโครงสร้างใหญ่ และบางเครื่องเจอ "column does not exist" ตอนเริ่มระบบ',
          en: 'The v1 → v2 re-architecture, and fresh upgrades failing with “column does not exist”.'
        },
        fix: {
          th: 'รวมเว็บกับ API เป็น image เดียว ใช้ bucket เดียว มีสคริปต์ย้าย storage ให้ผู้ใช้รันเอง และรัน migration ก่อน worker เริ่มทำงาน',
          en: 'One image and port for web + API, one bucket, a user-run storage migration script, and migrations that run before workers start.'
        }
      }
    ]
  },
  scanhub: {
    timeline: {
      th: '8 → 13 พ.ย. 2026 · 21 commits · v1.2.0 · Apache-2.0',
      en: '8 → 13 Nov 2026 · 21 commits · v1.2.0 · Apache-2.0'
    },
    results: [
      { th: 'รวม scanner 7 ตัวไว้ใน container เดียว', en: '7 scanners bundled in one container' },
      {
        th: 'สร้าง pipeline ให้ GitHub, GitLab, Jenkins, Azure, Bitbucket และ CLI',
        en: 'Generates pipelines for GitHub, GitLab, Jenkins, Azure, Bitbucket and CLI'
      },
      { th: 'image สำหรับ amd64 และ arm64 บน GHCR', en: 'amd64 and arm64 images on GHCR' },
      { th: '~54 unit/API tests และ 13 Playwright E2E specs', en: '~54 unit/API tests and 13 Playwright E2E specs' }
    ],
    obstacles: [
      {
        problem: {
          th: 'หลายเครื่องมือรายงานปัญหาเดียวกันซ้ำ และพอโค้ดเลื่อนบรรทัด ปัญหาเดิมดูเหมือนปัญหาใหม่',
          en: 'Several tools reported the same issue, and when code moved, old findings looked new.'
        },
        fix: {
          th: 'รวมตาม CVE + package + version และสร้าง fingerprint จากเนื้อหาบรรทัด ไม่ใช่เลขบรรทัด',
          en: 'Dedupe by CVE + package + version, and fingerprint the trimmed line text rather than the line number.'
        }
      },
      {
        problem: {
          th: 'เทียบผลกับ baseline ผิด branch, tag หรือ PR',
          en: 'Scans were compared against the wrong baseline across branches, tags and PRs.'
        },
        fix: {
          th: 'กฎ ref แยกต่อ repo ที่ pipeline ถามก่อนทุกครั้ง จึงเปลี่ยนกฎได้โดยไม่ต้องแก้ pipeline',
          en: 'Per-repo ref rules that the pipeline asks for first, so rules change without editing the pipeline.'
        }
      },
      {
        problem: {
          th: 'build arm64 บน GitHub Actions หลุดกลางการดาวน์โหลด (curl error 18)',
          en: 'The arm64 build under emulation in GitHub Actions dropped downloads mid-stream (curl error 18).'
        },
        fix: { th: 'เพิ่ม retry และบังคับ HTTP/1.1', en: 'Added retries and forced HTTP/1.1.' }
      },
      {
        problem: {
          th: 'การตั้งค่า SonarQube ต้องทำมือและมีรหัสผ่านเริ่มต้น admin/admin',
          en: 'SonarQube needed manual setup and shipped with admin/admin.'
        },
        fix: {
          th: 'ตั้งค่าอัตโนมัติแบบรันซ้ำได้ เปลี่ยนรหัสผ่านแบบสุ่ม ออก token และเก็บแบบเข้ารหัส AES-GCM',
          en: 'An idempotent auto-setup that rotates to a random password, issues a token and stores both AES-GCM encrypted.'
        }
      },
      {
        problem: {
          th: 'กฎของ Semgrep Registry มี licence ที่ผู้ใช้ต้องยอมรับเอง',
          en: 'Semgrep Registry rules carry a licence only the user can accept.'
        },
        fix: {
          th: 'ปิดเป็นค่าเริ่มต้น ให้ผู้ดูแลยอมรับเองหรือใช้กฎของตัวเอง และเพิ่มหน้ารวม licence',
          en: 'Off by default: an admin accepts it or brings custom rules, plus a licences page.'
        }
      }
    ]
  },
  clipath: {
    timeline: {
      th: 'ส.ค. 2026 · 44 commits · v1.0.13 · CI build จาก tag และต้องผ่าน test ก่อน',
      en: 'Aug 2026 · 44 commits · v1.0.13 · CI builds from tags, tests must pass first'
    },
    results: [
      {
        th: 'วัดบนสองจอ: จากกดคีย์ลัดถึงเลือกพื้นที่ 455 → ~170 ms และหน่วยความจำตอนว่าง 506 MB (9 process) → 28 MB',
        en: 'Measured on two monitors: shortcut to selection 455 → ~170 ms; idle memory 506 MB (9 processes) → 28 MB'
      },
      { th: 'เปิด editor ครั้งแรก 2.5 s → 115 ms', en: 'Cold editor open 2.5 s → 115 ms' },
      { th: '62 Rust tests', en: '62 Rust tests' },
      {
        th: 'ที่ 125% scale ลากเลือก 10 จาก 10 ครั้งได้ขนาดตรงทุกพิกเซล',
        en: 'At 125% scale, 10 of 10 drags exact to the pixel'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'ช้าและกินหน่วยความจำ: ภาพที่จับเขียนเป็น BMP ลงดิสก์แล้วอ่านกลับ',
          en: 'Slow and heavy: captured frames went to BMP on disk and back.'
        },
        fix: {
          th: 'เก็บ RGBA ไว้ในหน่วยความจำ แยกโค้ด overlay จาก 370 kB เหลือ 6 kB และปิด WebView ที่ไม่ได้ใช้',
          en: 'Keep raw RGBA in memory, split the overlay bundle from 370 kB to 6 kB, and tear down idle WebViews.'
        }
      },
      {
        problem: {
          th: 'คีย์ลัดใช้ไม่ได้หลังจับภาพครั้งแรก เพราะ Chromium หยุด renderer ของหน้าต่างที่ถูกย่อ',
          en: 'The shortcut died after the first capture: Chromium suspended renderers of shrunk hidden windows.'
        },
        fix: {
          th: 'ถอยการแก้นั้นออก และเพิ่ม watchdog ที่สร้าง overlay ใหม่เมื่อไม่ตอบ',
          en: 'Reverted that change and added a watchdog that rebuilds the overlay when it doesn’t answer.'
        }
      },
      {
        problem: {
          th: 'หลังจอหลับแล้วตื่น ภาพที่วาดมองไม่เห็นและแอปค้าง',
          en: 'After the screen slept, drawings were invisible and the app froze.'
        },
        fix: {
          th: 'ปิด occlusion tracking ของ WebView ส่งงานหน้าต่างกลับไปที่ event loop และใส่ generation number ให้ชื่อหน้าต่าง',
          en: 'Turned off WebView occlusion tracking, posted window work to the event loop, and versioned window labels.'
        }
      },
      {
        problem: { th: 'ตัวแอปไปโผล่ในภาพหน้าจอของตัวเอง', en: 'The app showed up in its own screenshots.' },
        fix: { th: 'ซ่อนด้วย DWM cloak และปิด transition', en: 'DWM cloak with transitions forced off.' }
      },
      {
        problem: {
          th: 'ที่ 125% scale เลือก 640×400 แต่ได้ภาพ 646×405 และคีย์ลัดเริ่มต้นชนกับแอปอื่น',
          en: 'At 125% scale a 640×400 selection saved as 646×405, and default shortcuts collided with other apps.'
        },
        fix: {
          th: 'วัดจากเฟรมที่หยุดภาพไว้ และย้ายคีย์ลัดไปใช้ปุ่ม Print Screen',
          en: 'Measure from the frozen frame, and move shortcuts to the Print Screen keys.'
        }
      }
    ]
  },
  'thai-pdf-fixer': {
    timeline: {
      th: '8 → 10 มี.ค. 2026 · 69 commits ใน 3 วัน · v1.2.12',
      en: '8 → 10 Mar 2026 · 69 commits in 3 days · v1.2.12'
    },
    results: [
      {
        th: 'ตัวติดตั้ง Windows ที่อัปเดตตัวเองได้ ผู้ใช้ไม่ต้องติดตั้ง Python',
        en: 'A self-updating Windows installer; users install no Python'
      },
      {
        th: 'ใช้คีย์บอร์ดได้ทุกขั้นตอน และโปรแกรมอ่านหน้าจออ่านสถานะทุกขั้น',
        en: 'Every step works from the keyboard and is announced to screen readers'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'ภาษาไทยเพี้ยนจาก encoding ของฟอนต์ สระอำแตก และ TIS-620/Windows-874',
          en: 'Garbled Thai from custom font encodings, split sara am and TIS-620/Windows-874 mojibake.'
        },
        fix: {
          th: 'แมปตัวอักษรใหม่ เรียงลำดับวรรณยุกต์ใหม่ ประกอบสระอำคืน และแปลง CID เป็น Unicode',
          en: 'Character remapping, combining-mark reordering, rebuilding sara am and CID-to-Unicode resolution.'
        }
      },
      {
        problem: {
          th: 'โปรแกรมที่ build ด้วย PyInstaller ล่มตอนเปิด (ModuleNotFoundError)',
          en: 'The PyInstaller build crashed on start (ModuleNotFoundError).'
        },
        fix: {
          th: 'บังคับใช้ package แบบ pure-Python แทน module ที่ compile แล้ว',
          en: 'Forced the pure-Python package instead of the compiled modules.'
        }
      },
      {
        problem: { th: 'ภาษาไทยในผลลัพธ์แตกบน Windows', en: 'Thai broke in the converter’s output on Windows.' },
        fix: { th: 'บังคับ stdout/stderr เป็น UTF-8', en: 'Forced UTF-8 on stdout/stderr.' }
      },
      {
        problem: {
          th: 'ระบบอัปเดตอัตโนมัติพัง: ไม่มีไฟล์ลายเซ็น, key เสียเพราะ newline และได้ 404 เพราะชื่อไฟล์มีช่องว่าง',
          en: 'Auto-update broke: missing signatures, a key corrupted by a newline, and 404s from spaces in the file name.'
        },
        fix: {
          th: 'build และ publish เอง ใช้ printf แทน echo และเปลี่ยนชื่อไฟล์เป็นแบบมีขีด',
          en: 'Build and publish manually, use printf instead of echo, and hyphenate the file name.'
        }
      },
      {
        problem: { th: 'เสียงอ่าน (text-to-speech) ไม่เสถียร', en: 'Text-to-speech was unreliable.' },
        fix: {
          th: 'ตัดออกแล้วใช้ aria-live ให้โปรแกรมอ่านหน้าจอที่ผู้ใช้มีอยู่แล้วเป็นคนอ่าน',
          en: 'Removed it and used aria-live so the user’s own screen reader speaks.'
        }
      }
    ]
  },
  sage: {
    timeline: {
      th: 'พ.ค. → ต.ค. 2026 · 231 commits · v1.1 → v1.9',
      en: 'May → Oct 2026 · 231 commits · v1.1 → v1.9'
    },
    results: [
      { th: 'ติดตั้งด้วยคำสั่งเดียวทั้ง Bash และ PowerShell', en: 'One-command installers for Bash and PowerShell' },
      {
        th: 'ใช้กับ Claude Code, Codex, Cursor, Copilot, Gemini และ Windsurf',
        en: 'Works with Claude Code, Codex, Cursor, Copilot, Gemini and Windsurf'
      },
      { th: 'ใช้จริงทุกวัน รวมถึงในงานลูกค้าและงานประจำ', en: 'Used daily, including on client and day-job repos' }
    ],
    obstacles: [
      {
        problem: {
          th: 'เวอร์ชันแรกหนักเกินไป: CLI, MCP server, ฐานข้อมูล, Docker และ CI',
          en: 'The first version was too heavy: a CLI, an MCP server, stores, Docker and CI.'
        },
        fix: {
          th: 'ยุบเหลือ AGENTS.md ไฟล์เดียวกับไฟล์ Markdown ความรู้ที่ไม่ชนกัน และตัดโค้ด Python ทิ้งทั้งหมด',
          en: 'Collapsed it to one AGENTS.md protocol plus conflict-free Markdown knowledge files, and removed the Python code.'
        }
      },
      {
        problem: {
          th: 'ตัวติดตั้งแบบเลือกได้ใช้ไม่ได้ในบาง shell (ตอน pipe และใน PowerShell)',
          en: 'The interactive installer failed in some shells (when piped, and in PowerShell).'
        },
        fix: {
          th: 'อ่านคำตอบจาก /dev/tty และ Read-Host และดึงเวอร์ชันล่าสุดผ่าน CDN',
          en: 'Read answers from /dev/tty and Read-Host, and fetch the latest version via a CDN.'
        }
      },
      {
        problem: { th: 'agent ถามคำถามที่ไม่จำเป็นบ่อยเกินไป', en: 'Agents asked too many unnecessary questions.' },
        fix: {
          th: 'เพิ่มขั้นเคลียร์คำถามก่อนลงมือ และให้การเขียน test เป็นตัวเลือก',
          en: 'Added a pre-action clarification pass and made test writing opt-in.'
        }
      }
    ]
  },
  'eec-id': {
    timeline: {
      th: 'มิ.ย. 2025 → พ.ค. 2026 · แอปมือถือเขียน 486 จาก 502 commits',
      en: 'Jun 2025 → May 2026 · wrote 486 of the mobile app’s 502 commits'
    },
    results: [
      {
        th: 'แอปมือถือ v0.0.2 → v0.0.16 ผ่านรอบ SIT และ UAT',
        en: 'Mobile app v0.0.2 → v0.0.16 through SIT and UAT rounds'
      },
      {
        th: '28 หน้าจอใน 11 โมดูล ตั้งแต่ยืนยันตัวตนจนถึงล็อกอินข้ามแอป',
        en: '28 screens across 11 feature modules, from identity checks to app-to-app login'
      },
      {
        th: 'เขียนเอกสารวิศวกรรมเปรียบเทียบ 7 แนวทาง OIDC และวิเคราะห์ความปลอดภัยของวิธีที่เลือก',
        en: 'Engineering write-ups comparing 7 OIDC approaches and the chosen fix’s security'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'บน Android แอปอื่นแย่งชิปหนังสือเดินทางทันทีที่อ่านเสร็จ',
          en: 'On Android, other NFC apps grabbed the passport chip the moment a read finished.'
        },
        fix: {
          th: 'ให้แอปถือ NFC ไว้อีก ~2 วินาทีหลังอ่านเสร็จ และบอกให้ผู้ใช้ยกโทรศัพท์ออก',
          en: 'Keep holding NFC for ~2 s after success and tell the user to move the phone away.'
        }
      },
      {
        problem: {
          th: 'กล้องกับ NFC แย่งกันทำงาน session ซ้อนกัน และแอปพังเมื่อกลับมาจาก background',
          en: 'Camera and NFC fought each other, sessions overlapped, and the app broke after the background.'
        },
        fix: {
          th: 'ตัวจัดการกล้องตัวเดียว, guard ให้จบได้ครั้งเดียว, cleanup ตาม lifecycle และตัวนับเวลา/จำนวนครั้ง',
          en: 'A single camera-session manager, a finish-once guard, lifecycle-aware cleanup, plus countdowns and attempt counters.'
        }
      },
      {
        problem: {
          th: 'ภาพสำหรับ MRZ และเทียบใบหน้าสีเพี้ยน กลับด้าน ไม่รู้ format และใหญ่เกินจะอัปโหลด',
          en: 'Images for MRZ and face match had wrong colours, wrong orientation, unknown formats and were too large.'
        },
        fix: {
          th: 'ถ่ายภาพนิ่งแทนเฟรม preview หมุนภาพ ตรวจ format ของภาพในชิป และบีบอัดก่อนส่ง',
          en: 'Full still photos instead of preview frames, rotation, chip image-format detection and compression before upload.'
        }
      },
      {
        problem: {
          th: 'การยืนยันตัวตนฝั่ง backend ช้า เพราะทำทีละขั้น',
          en: 'Backend verification was slow because steps ran one after another.'
        },
        fix: {
          th: 'อัปโหลดและเทียบใบหน้าแบบขนาน เพิ่ม log จับเวลาแต่ละขั้น และแยก query ที่ช้าในหน้าเจ้าหน้าที่',
          en: 'Ran uploads and face-match calls in parallel, added per-step timing, and split a slow query in the officer portal.'
        }
      },
      {
        problem: {
          th: 'ล็อกอินข้ามแอปแบบเงียบบน iOS ล้มเหลว เพราะ cookie แยกตาม browser context — ลองมา 7 วิธี',
          en: 'Silent app-to-app login failed on iOS because cookies are per browser context — 7 approaches tried.'
        },
        fix: {
          th: 'ให้ backend ของแอปที่ล็อกอินอยู่ออก authorization code แล้วส่ง redirect แบบ PKCE มาตรฐานให้แอปที่เรียก',
          en: 'The logged-in app’s backend issues the authorization code and hands a standard PKCE redirect to the calling app.'
        }
      }
    ]
  },
  'eec-e-customs': {
    timeline: {
      th: 'เม.ย. → พ.ย. 2026 · ~1,550 commits ใน 10 repo · สร้าง schedule service ตั้งแต่ศูนย์',
      en: 'Apr → Nov 2026 · ~1,550 commits across 10 repos · built the schedule service from scratch'
    },
    results: [
      {
        th: 'ผ่านรอบ UAT ต่อเนื่อง (core service ถึง uat_v1.0.53, เว็บถึง uat_v1.0.59)',
        en: 'Continuous UAT releases (core service to uat_v1.0.53, web to uat_v1.0.59)'
      },
      {
        th: 'เพิ่มไฟล์ test เอง: core 79, payment 55, schedule 60, worker 54 และ Playwright E2E 35 specs',
        en: 'Test files added: core 79, payment 55, schedule 60, worker 54, plus 35 Playwright E2E specs'
      },
      {
        th: 'เครื่องมือสร้างข้อมูลทดสอบและรายงานหลักฐาน E2E สำหรับทีม',
        en: 'An E2E test-data and evidence-report tool for the team'
      }
    ],
    obstacles: [
      {
        problem: { th: 'กดชำระเงินซ้ำแล้วเกิดรายการชำระซ้ำ', en: 'Retrying a payment could create a second payment.' },
        fix: {
          th: 'ถ้ามีรายการที่ยังใช้ได้ คืนลิงก์เดิมทันที และป้องกันการเปลี่ยนสถานะไม่ให้ webhook ทับรายการที่ยกเลิกแล้ว',
          en: 'Return the existing payment link when one is active, and guard state transitions so a webhook can’t overwrite a cancelled request.'
        }
      },
      {
        problem: {
          th: 'งานตามเวลาข้าม service ทำให้ทุก service ต้องมี consumer ของคิวเอง',
          en: 'Scheduled jobs replied over a queue, so every service needed its own consumer.'
        },
        fix: {
          th: 'ให้ Hangfire เรียกกลับผ่าน HTTP พร้อม allow-list ของ host (กัน SSRF) และยืนยันตัวตนของ callback',
          en: 'Hangfire calls services back over HTTP, with an exact-host allow-list (SSRF protection) and callback authentication.'
        }
      },
      {
        problem: {
          th: 'แจ้งเตือนสำเร็จบางช่องทางแต่ล้มบางช่องทาง',
          en: 'Notifications succeeded on some channels and failed on others.'
        },
        fix: {
          th: 'คิว retry แบบจำกัดจำนวนด้วย dead-letter และ log การส่งเพื่อข้ามช่องทางที่ส่งสำเร็จแล้ว',
          en: 'A bounded retry queue with dead-lettering, and delivery logs so retries skip channels that already succeeded.'
        }
      },
      {
        problem: { th: 'เลขเอกสารซ้ำเมื่อมีคำขอพร้อมกัน', en: 'Running numbers collided under concurrency.' },
        fix: {
          th: 'ใช้ advisory lock ของ PostgreSQL ครอบขั้นนับแล้วบันทึก',
          en: 'A transaction-scoped PostgreSQL advisory lock around count-then-insert.'
        }
      },
      {
        problem: {
          th: 'cache เก่าค้าง เพราะต้องล้างเองด้วย prefix',
          en: 'Stale cache, cleared by hand with key prefixes.'
        },
        fix: {
          th: 'interceptor ที่ล้าง cache ตาม tag หลัง commit สำเร็จเท่านั้น ครอบคลุม 57 query',
          en: 'A save interceptor that clears tagged Redis entries only after commit, covering 57 cached queries.'
        }
      }
    ]
  },
  'cmu-journal': {
    timeline: {
      th: 'ก.ย. → พ.ย. 2026 · ขึ้น production 10 พ.ย. 2026 ที่ journal.red-cmu.com',
      en: 'Sep → Nov 2026 · live on 10 Nov 2026 at journal.red-cmu.com'
    },
    results: [
      {
        th: 'ย้ายครบทุก 1,014 บทความ (เผยแพร่ 1,009) 25 เล่ม 76 ฉบับ และไฟล์ใหม่ 9,707 ไฟล์',
        en: 'All 1,014 articles imported (1,009 published), 25 volumes, 76 issues and 9,707 new files'
      },
      {
        th: 'ผ่าน integrity check หลังย้าย 25 รายการ และเทียบข้อความ 7,070 ช่องโดยไม่มีข้อความหาย',
        en: '25 post-import integrity checks passed; 7,070 text fields compared with nothing lost'
      },
      {
        th: 'หน้ารายการบทความ 41,232 ms → ~95–124 ms (วัดบน production build เครื่องท้องถิ่น) และข้อมูลต่อหน้า 4.59 → ~3.0 MB',
        en: 'Article list 41,232 ms → ~95–124 ms (local production build) and payload 4.59 → ~3.0 MB'
      },
      { th: 'ผ่าน SonarQube quality gate ทั้งสอง repo', en: 'SonarQube quality gate passed on both repos' }
    ],
    obstacles: [
      {
        problem: {
          th: 'ข้อมูลเดิมความหมายไม่ตรงชื่อ เช่น คอลัมน์ description เก็บรายชื่อผู้แต่ง และมีภาพ BMP กับ base64 ปน',
          en: 'Legacy columns didn’t mean what they said (the “description” held authors), with BMP and base64 images mixed in.'
        },
        fix: {
          th: 'pipeline ย้ายข้อมูลแบบหลายขั้นที่รันใน transaction และ rollback เสมอ ยกเว้นสั่ง --apply พร้อม backup ที่ตรวจแล้ว',
          en: 'A staged migration that runs in a transaction and always rolls back unless --apply is given with a verified backup.'
        }
      },
      {
        problem: {
          th: 'บทความเก่า 544 บทความไม่ผ่านกฎการเผยแพร่ใหม่ เพราะขาดอีเมลหรือสังกัด',
          en: '544 old articles failed the new publishing rules (missing emails or affiliations).'
        },
        fix: {
          th: 'เก็บสถานะเดิมไว้ แทนการแต่งข้อมูลที่ไม่มีอยู่',
          en: 'Kept their original public state instead of inventing data.'
        }
      },
      {
        problem: { th: 'ทุกหน้าแบกบทความทั้งหมด ~7 MB', en: 'Every page carried every article (~7 MB).' },
        fix: {
          th: 'โหลดเฉพาะที่แสดง บทคัดย่อโหลดเมื่อขอ บีบอัดด้วย gzip และแบ่งหน้าในหลังบ้าน',
          en: 'Load only what’s shown, abstracts on demand, gzip on the API, and paging in the back office.'
        }
      },
      {
        problem: { th: 'HTML เก่าไม่ปลอดภัย และ scanner พบช่องโหว่', en: 'Unsafe legacy HTML and scanner findings.' },
        fix: {
          th: 'sanitize ทั้งตอนนำเข้าและตอนแสดง ทำ parser ให้เป็นเชิงเส้น และอัปเดต dependency',
          en: 'Sanitize at import and at read, make parsing linear-time, and harden dependencies.'
        }
      },
      {
        problem: { th: 'วางข้อความยาวจาก Word แล้ว editor ค้าง', en: 'Pasting a long Word document froze the editor.' },
        fix: {
          th: 'ย้ายการประมวลผลรูปไปทำใน worker พร้อมแสดงความคืบหน้า',
          en: 'Moved picture processing to a worker with a progress bar.'
        }
      }
    ]
  },
  'cmu-research-gallery': {
    timeline: {
      th: 'พ.ค. → พ.ย. 2026 · deploy production ต.ค. 2026',
      en: 'May → Nov 2026 · production deploy in Oct 2026'
    },
    results: [
      {
        th: 'จัดฐานข้อมูลใหม่: ตาราง 90 → 72, คอลัมน์ 1,233 → 797 และ foreign key ไม่มี index 37 → 0',
        en: 'Database clean-up: tables 90 → 72, columns 1,233 → 797, unindexed foreign keys 37 → 0'
      },
      {
        th: 'นำเข้านักวิจัย 244 คน 64 หน่วยวิจัย โดยไม่มี Scopus ID ซ้ำหรือผิดรูปแบบ',
        en: '244 researchers and 64 research units imported, with no duplicate or malformed Scopus IDs'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'การนำเข้ารอบก่อนทำให้นักวิจัย ~245 คนแสดงต่อสาธารณะโดยไม่มีหลักฐานความยินยอม',
          en: 'An earlier backfill left ~245 researchers public with no consent evidence.'
        },
        fix: {
          th: 'ค่าเริ่มต้นเป็นซ่อน (fail closed) ทั้งตอนนำเข้าและซิงก์ และ query สาธารณะตรวจสองชั้น',
          en: 'Hidden by default (fail closed) on import and sync, with a double check in public queries.'
        }
      },
      {
        problem: { th: 'ข้อมูลจากลูกค้ามาเป็นไฟล์ Excel', en: 'Client data arrived as Excel files.' },
        fix: {
          th: 'แปลงเป็น JSON snapshot ที่ commit ไว้ และนำเข้าแบบรันซ้ำได้ พร้อมตรวจ Scopus ID',
          en: 'Convert to a committed JSON snapshot and import idempotently, validating Scopus IDs.'
        }
      },
      {
        problem: {
          th: 'ซิงก์จาก CMU Central ต้องไม่รันซ้อนกัน',
          en: 'The CMU Central sync must never run twice at once.'
        },
        fix: {
          th: 'job ตามเวลาที่ล็อกการรันซ้อน และ cooldown 1 ชั่วโมงสำหรับการสั่งเอง',
          en: 'A scheduled job with a run lock and a 1-hour cooldown for manual runs.'
        }
      },
      {
        problem: { th: 'สองเว็บมี cookie และ key ของตัวเอง', en: 'Two sites each had their own cookie and keys.' },
        fix: {
          th: 'รวมเป็น session เดียว ตรวจ Origin จาก allow-list และปิด dev login ใน production',
          en: 'One shared session, Origin checked against an allow-list, and the dev login kept out of production.'
        }
      }
    ]
  },
  'ora-cmu': {
    timeline: {
      th: 'พ.ค. → พ.ย. 2026 · deploy production ต.ค. 2026',
      en: 'May → Nov 2026 · production deploy in Oct 2026'
    },
    results: [
      {
        th: 'ย้ายจาก WordPress เดิม: บทความ 796, หน้า 88, กิจกรรม 143 และไฟล์แนบ 6,221 จาก dump 71 ตาราง',
        en: 'Migrated from the old WordPress: 796 posts, 88 pages, 143 events and 6,221 attachments from a 71-table dump'
      },
      {
        th: 'CMS ครอบคลุมสไลด์ ทุน เอกสาร ข่าว และสิทธิ์ผู้ใช้',
        en: 'A CMS covering slides, funding, documents, news and roles'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'ย้ายเนื้อหาจาก WordPress โดยไม่ทำของเดิมเสียหาย',
          en: 'Migrating WordPress content without damaging the original.'
        },
        fix: {
          th: 'snapshot ที่ตรวจ hash แล้ว ทดสอบ restore ก่อนและหลัง นำเข้าเป็น draft และรันซ้ำต้องได้จำนวนเท่าเดิม',
          en: 'A hash-verified snapshot, restore-tested backups, drafts on import, and reruns that must give identical counts.'
        }
      },
      {
        problem: { th: 'ลิงก์และไฟล์จากเว็บเดิมต้องยังใช้ได้', en: 'Old links and media had to keep working.' },
        fix: {
          th: 'map URL ของไฟล์เดิมและเก็บ redirect ไว้ปิดจนกว่าจะพร้อม',
          en: 'Mapped legacy media URLs and kept redirects inactive until ready.'
        }
      }
    ]
  },
  'junior-bootcamp': {
    timeline: { th: 'พ.ค. → ก.ค. 2026 · ทำคนเดียวทั้งหมด', en: 'May → Jul 2026 · built solo' },
    results: [
      {
        th: 'load test 200 ผู้ใช้ท่องเว็บ: 31,635 checks ผ่าน 100% และ p95 66 ms',
        en: 'Load test, 200 users browsing: 31,635 checks passed (100%), p95 66 ms'
      },
      {
        th: 'จำลองวันสอบเต็มรูปแบบ: 600 คนพร้อมกันไม่มี error แต่ช้า และพังที่ 800 คน — รู้ขีดจำกัดก่อนวันจริง',
        en: 'Full exam simulation: 600 concurrent users with 0% errors (but slow); it broke at 800 — the limit was known before exam day'
      },
      { th: 'E2E ที่เจาะจง 28 จาก 28 ผ่าน', en: '28 of 28 targeted E2E tests passed' }
    ],
    obstacles: [
      {
        problem: {
          th: 'รับผู้ใช้ได้จำกัด: pool ฐานข้อมูลมีแค่ 10 connection ผ่าน Tailscale และ connection ว่างถูกตัด',
          en: 'A capacity ceiling: 10 DB connections over Tailscale, which also dropped idle ones.'
        },
        fix: {
          th: 'เพิ่ม pool เป็น 25 พร้อม keepAlive และ timeout แล้ว load test ซ้ำ',
          en: 'Pool raised to 25 with keepAlive and timeouts, then load-tested again.'
        }
      },
      {
        problem: {
          th: 'รีเฟรชหรือเปิดอีกเครื่องแล้ว QR เช็กอินไม่ตรงกัน',
          en: 'A refresh or a second device showed a different check-in QR.'
        },
        fix: {
          th: 'token เดียวต่อโมดูลและการกระทำ เก็บในฐานข้อมูลด้วย upsert',
          en: 'One token per module and action, upserted in the database.'
        }
      },
      {
        problem: {
          th: 'สอบแบบจับเวลาต้องปิดตรงเวลาและกันเข้าซ้ำ',
          en: 'Timed exams had to close on time and block re-entry.'
        },
        fix: {
          th: 'ปิดอัตโนมัติพร้อมส่งคำตอบที่ค้าง และสลับข้อแบบเก็บลำดับไว้ รีเฟรชแล้วได้ลำดับเดิม',
          en: 'Auto-close force-submits open attempts; questions are shuffled once and the order saved, so a refresh resumes.'
        }
      },
      {
        problem: { th: 'หน้าติดตามสดค้างเมื่อเน็ตหลุด', en: 'The live monitor went stale after a dropped connection.' },
        fix: {
          th: 'SSE พร้อมดึงใหม่เมื่อกลับมาออนไลน์หรือกลับมาที่แท็บ',
          en: 'SSE plus a refetch on reconnect or when the tab becomes visible.'
        }
      }
    ]
  },
  readitgo: {
    timeline: {
      th: 'ส.ค. 2025 → ม.ค. 2026 · เขียนแอป 410 จาก 443 commits',
      en: 'Aug 2025 → Jan 2026 · wrote 410 of the app’s 443 commits'
    },
    obstacles: [
      {
        problem: {
          th: 'ข้อมูล timing จาก ElevenLabs ไม่ตรงที่คาด (ได้ 0 คำและความยาว 0 ms)',
          en: 'ElevenLabs timing data didn’t match expectations (0 words, 0 ms duration).'
        },
        fix: {
          th: 'สร้าง timing รายคำจากข้อมูลรายตัวอักษร และเอาความยาวจากเวลาสิ้นสุดตัวสุดท้าย',
          en: 'Build word timings from the character arrays and take duration from the last end time.'
        }
      },
      {
        problem: { th: 'ไฮไลต์วิ่งไม่ตรงกับเสียง', en: 'The highlight drifted from the voice.' },
        fix: {
          th: 'แก้หน่วย ms/วินาทีที่ไม่ตรงกัน ลดการนำหน้าเหลือ 0.02 s และใช้ binary search หาคำ',
          en: 'Fixed an ms/seconds mismatch, cut the lead to 0.02 s and used binary search for word lookup.'
        }
      },
      {
        problem: { th: 'นักเรียนต้องอ่านได้แม้ไม่มีเน็ต', en: 'Students needed to read without a connection.' },
        fix: {
          th: 'เก็บ e-book ใน IndexedDB พร้อมแสดงความคืบหน้าการดาวน์โหลด ตรวจพื้นที่ และบอกสถานะออนไลน์',
          en: 'E-books in IndexedDB with download progress, storage checks and an online/offline indicator.'
        }
      },
      {
        problem: {
          th: 'ข้อสอบที่ AI สร้าง คำตอบถูกมักอยู่ข้อเดียวกัน',
          en: 'AI-made quizzes kept the right answer on the same letter.'
        },
        fix: {
          th: 'ตรวจว่าคำตอบถูกกระจายอย่างน้อย 3 ตำแหน่งใน 5 ข้อ และให้สร้างใหม่ถ้าไม่ผ่าน',
          en: 'Validate at least 3 answer positions across 5 questions, with retries.'
        }
      }
    ]
  }
}

export const experimentStories: Record<string, Story> = {
  'age-of-lost-knowledge': {
    timeline: {
      th: '15 → 21 พ.ย. 2026 · 419 commits · agent สองตัว (Claude + Codex) คนละ worktree',
      en: '15 → 21 Nov 2026 · 419 commits · two agents (Claude + Codex), one worktree each'
    },
    results: [
      { th: '21 ADR และ test ผ่าน 1,186 ตัว ณ ขั้น HD-2D step 2', en: '21 ADRs; 1,186 tests passing at HD-2D step 2' },
      {
        th: 'ย้ายจาก 2D เป็น 3D ทีละ milestone (M0–M7) โดยแต่ละขั้นต้องผ่าน pixel diff ≥ 99.5%',
        en: 'Moved from 2D to 3D milestone by milestone (M0–M7), each gated by a ≥ 99.5% pixel diff'
      },
      {
        th: 'เดินในโลก 3D: เฉลี่ย 3.50 ms ต่อเฟรม, p99 6.87 ms',
        en: 'Walking in 3D: mean 3.50 ms per frame, p99 6.87 ms'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'Codex รีวิวโค้ดต่อสู้ของ Claude แล้วเจอช่องโหว่: ส่ง 1,000 request ในหนึ่ง tick ได้ 1,000 hit',
          en: 'Codex reviewing Claude’s combat code found an exploit: 1,000 requests in one tick gave 1,000 hits.'
        },
        fix: {
          th: 'cooldown 500 ms, จำกัด 8 action ต่อ tick และให้ EXP ตามดาเมจที่ทำจริง (ADR-012)',
          en: '500 ms cooldown, max 8 actions per tick, and EXP only for damage actually dealt (ADR-012).'
        }
      },
      {
        problem: { th: 'เฟรมกระตุก', en: 'Frame stalls.' },
        fix: {
          th: 'สร้าง profiler รายเฟรม และวาด HUD ใหม่เฉพาะเมื่อข้อมูลเปลี่ยน — หน่วยความจำต่อรอบ 3.6 → 1.9 GB',
          en: 'Built a per-frame profiler and redrew the HUD only on change — allocations 3.6 → 1.9 GB per run.'
        }
      },
      {
        problem: { th: 'draw call มากเกินไป', en: 'Too many draw calls.' },
        fix: {
          th: 'texture atlas 2048 ร่วมกันและรวมป้ายชื่อ — combat draw p95 327 → 248 และ texture memory 163 → 89 MB',
          en: 'A shared 2048 atlas and batched name plates — combat draw p95 327 → 248, texture memory 163 → 89 MB.'
        }
      },
      {
        problem: {
          th: 'test เครือข่ายล้มแบบสุ่ม (2 ใน 6 รอบตอนเครื่องหนัก)',
          en: 'A flaky network test (2 of 6 under load).'
        },
        fix: {
          th: 'รอตามเงื่อนไขแทนการรอเวลาคงที่ — ผ่าน 12/12 บน CPU 16 core ที่โหลดเต็ม',
          en: 'Condition-based waits instead of fixed ones — 12/12 under a 16-core load.'
        }
      },
      {
        problem: { th: 'ทิศทางภาพเปลี่ยนไปมา (ADR-016 → 020)', en: 'Art direction kept changing (ADR-016 → 020).' },
        fix: {
          th: 'ทุก asset ต้องให้เจ้าของอนุมัติ ไม่อย่างนั้นจะแสดงเป็นกล่องสีขาว',
          en: 'Every asset needs owner approval; unapproved art renders as white boxes.'
        }
      }
    ]
  },
  'zoo-together': {
    timeline: {
      th: '24 ต.ค. → 1 พ.ย. 2026 · 20 commits · ทำร่วมกับ AI agent ทั้งหมด',
      en: '24 Oct → 1 Nov 2026 · 20 commits · fully agent-built'
    },
    results: [
      { th: 'สัตว์ 20 สายพันธุ์และลูกผสม 190 แบบ', en: '20 species and 190 hybrids' },
      { th: '60 FPS กับ sprite ~1,550 ตัว', en: '60 FPS with ~1,550 sprites' },
      {
        th: 'รีสตาร์ต server แล้วสวนสัตว์กลับมาครบจาก PostgreSQL',
        en: 'The zoo reopens from PostgreSQL after a server restart'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'เศรษฐกิจในเกมไม่มีชีวิต: จำลอง 10 วันได้ความพอใจ 55% และ ~24 ผู้เข้าชมต่อวัน',
          en: 'The economy felt dead: a 10-day headless run gave 55% satisfaction and ~24 visitors a day.'
        },
        fix: {
          th: 'ปรับความต้องการ ราคา และความจำเป็นใหม่ — ได้ ~140 คนต่อวัน และความพอใจ 77%',
          en: 'Retuned demand, prices and needs — ~140 visitors a day and 77% satisfaction.'
        }
      },
      {
        problem: {
          th: 'รีเฟรชหน้าแล้วถูกปฏิเสธว่า "เชื่อมต่ออยู่แล้ว"',
          en: 'Refreshing was refused as “already connected”.'
        },
        fix: {
          th: 'การเชื่อมต่อใหม่แทนที่อันเก่า พร้อม regression test',
          en: 'The newest connection replaces the old one, with a regression test.'
        }
      },
      {
        problem: { th: 'ไฟล์ภาพรวม 189 MB', en: 'The art weighed 189 MB.' },
        fix: { th: 'แปลงเป็น WebP และย่อพื้นหลัง 4K — เหลือ 43 MB', en: 'WebP and 4K backgrounds scaled down — 43 MB.' }
      },
      {
        problem: {
          th: 'deploy ไม่สำเร็จ เพราะ agent กดปุ่มในหน้า Dokploy ไม่ได้',
          en: 'The deploy stalled: the agent couldn’t click through the Dokploy UI.'
        },
        fix: {
          th: 'บทเรียน: งานที่ต้องคลิกผ่าน UI คือขีดจำกัดของ agent ตอนนี้ต้องใช้ API key แทน',
          en: 'Lesson: clicking through web UIs is where agents hit their limit; it needs an API key instead.'
        }
      }
    ]
  }
}
