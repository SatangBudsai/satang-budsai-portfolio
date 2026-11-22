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
      th: '5 → 22 พ.ย. 2026 · 136 commits · 38 releases (v0.5 → v0.12.1) · ทำคู่กับ AI coding agent',
      en: '5 → 22 Nov 2026 · 136 commits · 38 releases (v0.5 → v0.12.1) · built with AI coding agents'
    },
    results: [
      {
        th: 'PR/MR และ pipeline ของ GitHub, GitLab และ Bitbucket Cloud',
        en: 'PRs/MRs and pipelines for GitHub, GitLab and Bitbucket Cloud'
      },
      {
        th: 'วัดด้วย perf test: status 162 → ~106 ms, refs 180 → ~34 ms, submodules 519 → 0 ms',
        en: 'Measured by the perf test: status 162 → ~106 ms, refs 180 → ~34 ms, submodules 519 → 0 ms'
      },
      {
        th: 'ค้น history บน repo ใหญ่เร็วขึ้น ~10–40 เท่า แท็บ pipeline เร็วขึ้น ~3 เท่า',
        en: 'History search ~10–40× faster on big repos; pipelines tab ~3× faster'
      },
      {
        th: 'มีคนนอกส่ง PR มาและ merge เข้าไปแล้ว (SSH hosts, แก้ XSS) และเพิ่ม UI เป็น 5 ภาษาเพราะผู้ใช้ขอมา',
        en: 'External contributors’ PRs merged (SSH hosts, an XSS fix); five UI languages after a user request'
      },
      {
        th: 'test ~21 สคริปต์ ทั้ง e2e, perf, rate limit และ 52 check ของ Bitbucket พร้อมรันแบบ read-only กับของจริง',
        en: '~21 test scripts incl. e2e, perf, rate-limit, and 52 Bitbucket checks plus a live read-only run'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'สลับโปรเจกต์แล้วค้าง: ทุกแท็บถาม workspace จาก Orca ทุก 3 วินาที (spawn CLI ทุกรอบ) แถมรัน git status ทุก 4 วินาที ทั้งที่แท็บซ่อนอยู่',
          en: 'Switching projects stalled: every tab asked Orca for the workspace every 3 s (spawning the CLI) and ran git status every 4 s, even when hidden.'
        },
        fix: {
          th: 'แท็บที่ซ่อนอยู่เลิก poll ถ้ารู้โปรเจกต์อยู่แล้วก็ไม่ต้องถาม และให้ worker cache workspace map ไว้จนกว่าจะมี change event',
          en: 'Hidden tabs stop polling, the lookup is skipped when the project is known, and the worker caches the workspace map until a change event.'
        }
      },
      {
        problem: {
          th: 'repo ที่มี remote branch 300+ ตัวทำให้ทั้งแอปช้าไปหมด',
          en: 'A repo with 300+ remote branches made the whole app slow.'
        },
        fix: {
          th: 'รัน git process เดียวต่อ status, cache โดยใช้ fingerprint ของ refs/HEAD เป็น key, ดึง detail แบบขนาน และใช้ content-visibility ให้แถวที่อยู่นอกจอไม่ต้องคำนวณ layout',
          en: 'One git process per status, caching keyed on a refs/HEAD fingerprint, parallel detail fetches, and content-visibility so off-screen rows skip layout.'
        }
      },
      {
        problem: {
          th: 'ช่องทางของ plugin รับคำตอบได้ไม่เกิน 1 MiB ต่อครั้ง repo ที่มีไฟล์ใหม่เป็นพันหรือมี tag เยอะเลยโหลดไม่ขึ้น',
          en: 'The plugin channel caps each answer at 1 MiB, so repos with thousands of new files or many tags failed to load.'
        },
        fix: {
          th: 'ยุบโฟลเดอร์ใหม่ให้เหลือบรรทัดเดียวและจำกัดที่ 3,000 ไฟล์ ต่อมาก็แบ่งคำตอบที่ใหญ่เกินเป็นหลายท่อนโดยนับ byte แบบ UTF-8 แล้วให้ panel ประกอบกลับ',
          en: 'Collapsed new folders and capped at 3,000 files, then later split oversized answers into UTF-8-byte-counted parts that the panel reassembles.'
        }
      },
      {
        problem: {
          th: 'Security: Markdown ใน description ของ MR ฝัง event handler ได้ และไฟล์ symlink ใน repo ทำให้ plugin เขียนไฟล์ออกไปนอก repo ได้',
          en: 'Security: Markdown in MR descriptions could inject an event handler, and a symlinked file in a repo could make the plugin write outside it.'
        },
        fix: {
          th: 'render ลิงก์รอบเดียวแทนสองรอบ และเปิดไฟล์พวกนั้นด้วย O_NOFOLLOW',
          en: 'Render links in a single pass instead of two, and open those files with O_NOFOLLOW.'
        }
      },
      {
        problem: {
          th: 'โดน rate limit ของ GitHub และ Bitbucket (HTTP 429) แล้ว API จริงของ Bitbucket ก็ไม่ได้ทำงานตาม docs',
          en: 'GitHub and Bitbucket rate limits (HTTP 429), and Bitbucket’s real API behaving differently from its docs.'
        },
        fix: {
          th: 'ใช้ผลค้นหาร่วมกันข้ามหน้าจอ ถึง limit ก็หยุดรอโดยยังโชว์รายการล่าสุดไว้ แล้วไล่เทสต์ทีละเคสกับ API จริง',
          en: 'Share searches across views and pause at the limit while keeping the last lists on screen, and test each case against the real API.'
        }
      }
    ]
  },
  'qorstack-report': {
    timeline: {
      th: 'ม.ค. → พ.ย. 2026 · ~1,060 commits ใน 4 repo · เดิมชื่อ "Rendox" · รื้อ architecture เป็น v2.0 เมื่อ ต.ค. 2026',
      en: 'Jan → Nov 2026 · ~1,060 commits across 4 repos · formerly “Rendox” · v2.0 re-architecture in Oct 2026'
    },
    results: [
      { th: '43 stars และ 7 forks บน GitHub', en: '43 stars and 7 forks on GitHub' },
      {
        th: 'SDK อยู่บน NuGet และ npm เวอร์ชันตรงกับ server มี release pipeline เดียวส่งขึ้น Docker Hub, NuGet และ npm',
        en: 'SDKs on NuGet and npm, versioned with the server; one release pipeline to Docker Hub, NuGet and npm'
      },
      {
        th: 'MCP server 5 tools ให้ AI agent สั่ง render เอกสารได้',
        en: 'An MCP server with 5 tools so AI agents can render documents'
      },
      {
        th: 'ใช้ออกใบรับรองจริงใน e-service ของภาครัฐ',
        en: 'Renders real certificates inside a government e-service'
      },
      {
        th: 'แก้ตามที่ลูกค้าเจอจริง เช่น ล็อกอินผ่าน HTTP ธรรมดาบน intranet',
        en: 'Customer-driven fixes, e.g. sign-in over plain HTTP on an intranet'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'PDF จาก LibreOffice ไม่ตรงกับ Word โดยเฉพาะภาษาไทย: ตัดบรรทัดไม่เหมือนกัน ฟอนต์สำรองดันข้อความลง indent หาย',
          en: 'LibreOffice PDFs didn’t match Word, especially Thai: different line breaks, fallback fonts pushing text down, lost indents.'
        },
        fix: {
          th: 'generate ตาราง WordFontMetrics เก็บความสูงบรรทัดและความกว้าง glyph แบบที่ Word ใช้ ชดเชย thaiDistribute และแทรกจุดตัดตรงรอยต่อไทย/อังกฤษ',
          en: 'A generated WordFontMetrics table for Word’s line heights and glyph widths, compensation for thaiDistribute, and break points at Thai/Latin boundaries.'
        }
      },
      {
        problem: { th: 'สร้าง PDF กับอัปโหลดช้า', en: 'PDF generation and uploads were slow.' },
        fix: {
          th: 'เลิกใช้ PDF/A-1b (ช้ากว่า 2–3 เท่า) ปิด Expect: 100-continue และเพิ่ม concurrency ตอนอัปโหลดฟอนต์จาก 16 เป็น 64',
          en: 'Dropped PDF/A-1b (2–3× slower), disabled Expect: 100-continue, and raised font-upload concurrency from 16 to 64.'
        }
      },
      {
        problem: {
          th: 'คิว render แบบ async ต้องไม่หายตอนรีสตาร์ต และต้อง scale out ได้',
          en: 'The async render queue had to survive restarts and scale out.'
        },
        fix: {
          th: 'ย้ายคิวไปไว้ใน PostgreSQL: FOR UPDATE SKIP LOCKED, LISTEN/NOTIFY, lease ที่ดึงคืนได้หลัง crash, retry และ webhook ที่ sign ด้วย HMAC',
          en: 'Moved the queue into PostgreSQL: FOR UPDATE SKIP LOCKED, LISTEN/NOTIFY, reclaimable leases after crashes, retries, and HMAC-signed webhooks.'
        }
      },
      {
        problem: {
          th: 'พอบล็อก SSRF จาก URL รูปภาพ ผู้ใช้ที่ self-host บน intranet ก็ใช้ไม่ได้',
          en: 'Blocking SSRF in image URLs broke self-hosted users on intranets.'
        },
        fix: {
          th: 'กลับคำตัดสินใจ: อนุญาตแค่ http(s) แต่จำกัดขนาดและเวลา แล้วออกเป็น patch release',
          en: 'Reversed the decision: http(s) only with size and time limits, shipped as a patch release.'
        }
      },
      {
        problem: {
          th: 'รื้อ architecture จาก v1 → v2 และเครื่องที่อัปเกรดใหม่เจอ error "column does not exist"',
          en: 'The v1 → v2 re-architecture, and fresh upgrades failing with “column does not exist”.'
        },
        fix: {
          th: 'รวม web + API เป็น image และ port เดียว ใช้ bucket เดียว มีสคริปต์ย้าย storage ให้ผู้ใช้รันเอง และให้ migration รันก่อน worker เริ่ม',
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
      { th: 'scanner 7 ตัวรวมอยู่ใน container เดียว', en: '7 scanners bundled in one container' },
      {
        th: 'generate pipeline ให้ GitHub, GitLab, Jenkins, Azure, Bitbucket และ CLI',
        en: 'Generates pipelines for GitHub, GitLab, Jenkins, Azure, Bitbucket and CLI'
      },
      { th: 'image ทั้ง amd64 และ arm64 บน GHCR', en: 'amd64 and arm64 images on GHCR' },
      { th: 'unit/API test ~54 ตัว และ Playwright E2E 13 spec', en: '~54 unit/API tests and 13 Playwright E2E specs' }
    ],
    obstacles: [
      {
        problem: {
          th: 'หลายเครื่องมือรายงานปัญหาเดียวกันซ้ำ ๆ และพอโค้ดขยับ finding เก่าก็ดูเหมือนของใหม่',
          en: 'Several tools reported the same issue, and when code moved, old findings looked new.'
        },
        fix: {
          th: 'dedupe ด้วย CVE + package + version และทำ fingerprint จากข้อความในบรรทัด (ตัดช่องว่างแล้ว) แทนเลขบรรทัด',
          en: 'Dedupe by CVE + package + version, and fingerprint the trimmed line text rather than the line number.'
        }
      },
      {
        problem: {
          th: 'ผลสแกนไปเทียบกับ baseline ผิดตัว เวลาข้าม branch, tag และ PR',
          en: 'Scans were compared against the wrong baseline across branches, tags and PRs.'
        },
        fix: {
          th: 'มีกฎ ref แยกต่อ repo ที่ pipeline มาถามก่อน จะเปลี่ยนกฎก็ไม่ต้องแก้ pipeline',
          en: 'Per-repo ref rules that the pipeline asks for first, so rules change without editing the pipeline.'
        }
      },
      {
        problem: {
          th: 'build arm64 ที่รันผ่าน emulation บน GitHub Actions ดาวน์โหลดหลุดกลางทาง (curl error 18)',
          en: 'The arm64 build under emulation in GitHub Actions dropped downloads mid-stream (curl error 18).'
        },
        fix: { th: 'ใส่ retry และบังคับใช้ HTTP/1.1', en: 'Added retries and forced HTTP/1.1.' }
      },
      {
        problem: {
          th: 'SonarQube ต้อง setup เอง และมากับ admin/admin',
          en: 'SonarQube needed manual setup and shipped with admin/admin.'
        },
        fix: {
          th: 'ทำ auto-setup ที่รันซ้ำได้ เปลี่ยนเป็นรหัสผ่านสุ่ม ออก token แล้วเก็บทั้งคู่แบบเข้ารหัส AES-GCM',
          en: 'An idempotent auto-setup that rotates to a random password, issues a token and stores both AES-GCM encrypted.'
        }
      },
      {
        problem: {
          th: 'rule จาก Semgrep Registry มี licence ที่ผู้ใช้ต้องกดยอมรับเอง',
          en: 'Semgrep Registry rules carry a licence only the user can accept.'
        },
        fix: {
          th: 'ปิดไว้เป็น default: ให้แอดมินยอมรับเองหรือใช้ rule ของตัวเอง และเพิ่มหน้ารวม licence',
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
        th: 'วัดบนสองจอ: กดคีย์ลัดจนเลือกพื้นที่ได้ 455 → ~170 ms, memory ตอน idle 506 MB (9 process) → 28 MB',
        en: 'Measured on two monitors: shortcut to selection 455 → ~170 ms; idle memory 506 MB (9 processes) → 28 MB'
      },
      { th: 'เปิด editor แบบ cold 2.5 s → 115 ms', en: 'Cold editor open 2.5 s → 115 ms' },
      { th: 'Rust test 62 ตัว', en: '62 Rust tests' },
      {
        th: 'ที่ scale 125% ลากเลือก 10 ครั้ง ตรงเป๊ะทุกพิกเซลทั้ง 10 ครั้ง',
        en: 'At 125% scale, 10 of 10 drags exact to the pixel'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'ช้าและหนัก: เฟรมที่จับได้ถูกเขียนเป็น BMP ลงดิสก์แล้วอ่านกลับขึ้นมา',
          en: 'Slow and heavy: captured frames went to BMP on disk and back.'
        },
        fix: {
          th: 'เก็บ RGBA ดิบไว้ใน memory แยก bundle ของ overlay จาก 370 kB เหลือ 6 kB และปิด WebView ที่ idle ทิ้ง',
          en: 'Keep raw RGBA in memory, split the overlay bundle from 370 kB to 6 kB, and tear down idle WebViews.'
        }
      },
      {
        problem: {
          th: 'คีย์ลัดตายหลังจับภาพครั้งแรก: Chromium พัก renderer ของหน้าต่างที่ซ่อนและถูกย่อไว้',
          en: 'The shortcut died after the first capture: Chromium suspended renderers of shrunk hidden windows.'
        },
        fix: {
          th: 'revert การแก้นั้น แล้วเพิ่ม watchdog ที่สร้าง overlay ใหม่ถ้ามันไม่ตอบ',
          en: 'Reverted that change and added a watchdog that rebuilds the overlay when it doesn’t answer.'
        }
      },
      {
        problem: {
          th: 'พอจอ sleep แล้วตื่น สิ่งที่วาดไว้มองไม่เห็น และแอปค้าง',
          en: 'After the screen slept, drawings were invisible and the app froze.'
        },
        fix: {
          th: 'ปิด occlusion tracking ของ WebView โยนงานที่เกี่ยวกับหน้าต่างไปทำใน event loop และใส่เวอร์ชันให้ label ของหน้าต่าง',
          en: 'Turned off WebView occlusion tracking, posted window work to the event loop, and versioned window labels.'
        }
      },
      {
        problem: { th: 'ตัวแอปเองไปติดอยู่ใน screenshot', en: 'The app showed up in its own screenshots.' },
        fix: { th: 'ใช้ DWM cloak และบังคับปิด transition', en: 'DWM cloak with transitions forced off.' }
      },
      {
        problem: {
          th: 'ที่ scale 125% เลือก 640×400 แต่เซฟออกมาเป็น 646×405 และคีย์ลัด default ชนกับแอปอื่น',
          en: 'At 125% scale a 640×400 selection saved as 646×405, and default shortcuts collided with other apps.'
        },
        fix: {
          th: 'วัดจากเฟรมที่ freeze ไว้ และย้ายคีย์ลัดไปใช้ปุ่ม Print Screen',
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
        th: 'installer สำหรับ Windows ที่อัปเดตตัวเองได้ ผู้ใช้ไม่ต้องลง Python',
        en: 'A self-updating Windows installer; users install no Python'
      },
      {
        th: 'ใช้คีย์บอร์ดได้ทุกขั้นตอน และ screen reader อ่านบอกทุกขั้น',
        en: 'Every step works from the keyboard and is announced to screen readers'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'ภาษาไทยเพี้ยนเพราะฟอนต์ใช้ encoding เฉพาะ สระอำแตก และ mojibake จาก TIS-620/Windows-874',
          en: 'Garbled Thai from custom font encodings, split sara am and TIS-620/Windows-874 mojibake.'
        },
        fix: {
          th: 'map ตัวอักษรใหม่ เรียง combining mark ใหม่ ประกอบสระอำกลับ และแปลง CID เป็น Unicode',
          en: 'Character remapping, combining-mark reordering, rebuilding sara am and CID-to-Unicode resolution.'
        }
      },
      {
        problem: {
          th: 'ตัว build จาก PyInstaller crash ตั้งแต่เปิด (ModuleNotFoundError)',
          en: 'The PyInstaller build crashed on start (ModuleNotFoundError).'
        },
        fix: {
          th: 'บังคับใช้ package แบบ pure-Python แทน module ที่ compile ไว้',
          en: 'Forced the pure-Python package instead of the compiled modules.'
        }
      },
      {
        problem: {
          th: 'ภาษาไทยใน output ของตัวแปลงแตกบน Windows',
          en: 'Thai broke in the converter’s output on Windows.'
        },
        fix: { th: 'บังคับ stdout/stderr ให้เป็น UTF-8', en: 'Forced UTF-8 on stdout/stderr.' }
      },
      {
        problem: {
          th: 'auto-update พัง: ไม่มีไฟล์ signature, key เสียเพราะมี newline ติดมา และได้ 404 เพราะชื่อไฟล์มีช่องว่าง',
          en: 'Auto-update broke: missing signatures, a key corrupted by a newline, and 404s from spaces in the file name.'
        },
        fix: {
          th: 'build กับ publish เอง ใช้ printf แทน echo และเปลี่ยนชื่อไฟล์ให้ใช้ขีดแทนช่องว่าง',
          en: 'Build and publish manually, use printf instead of echo, and hyphenate the file name.'
        }
      },
      {
        problem: { th: 'text-to-speech ไม่เสถียร', en: 'Text-to-speech was unreliable.' },
        fix: {
          th: 'ตัดออก แล้วใช้ aria-live ให้ screen reader ที่ผู้ใช้มีอยู่แล้วเป็นคนอ่าน',
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
      { th: 'installer คำสั่งเดียว ทั้ง Bash และ PowerShell', en: 'One-command installers for Bash and PowerShell' },
      {
        th: 'ใช้ได้กับ Claude Code, Codex, Cursor, Copilot, Gemini และ Windsurf',
        en: 'Works with Claude Code, Codex, Cursor, Copilot, Gemini and Windsurf'
      },
      { th: 'ใช้จริงทุกวัน ทั้งใน repo ของลูกค้าและงานประจำ', en: 'Used daily, including on client and day-job repos' }
    ],
    obstacles: [
      {
        problem: {
          th: 'เวอร์ชันแรกหนักเกิน: มีทั้ง CLI, MCP server, store, Docker และ CI',
          en: 'The first version was too heavy: a CLI, an MCP server, stores, Docker and CI.'
        },
        fix: {
          th: 'ยุบเหลือ protocol ใน AGENTS.md ไฟล์เดียว กับไฟล์ความรู้แบบ Markdown ที่ไม่ conflict กัน แล้วลบโค้ด Python ทิ้ง',
          en: 'Collapsed it to one AGENTS.md protocol plus conflict-free Markdown knowledge files, and removed the Python code.'
        }
      },
      {
        problem: {
          th: 'installer แบบ interactive พังในบาง shell (ตอน pipe และใน PowerShell)',
          en: 'The interactive installer failed in some shells (when piped, and in PowerShell).'
        },
        fix: {
          th: 'อ่านคำตอบจาก /dev/tty และ Read-Host แล้วดึงเวอร์ชันล่าสุดผ่าน CDN',
          en: 'Read answers from /dev/tty and Read-Host, and fetch the latest version via a CDN.'
        }
      },
      {
        problem: { th: 'agent ถามเรื่องที่ไม่จำเป็นเยอะเกิน', en: 'Agents asked too many unnecessary questions.' },
        fix: {
          th: 'เพิ่มรอบเคลียร์คำถามก่อนลงมือ และให้การเขียน test เป็น opt-in',
          en: 'Added a pre-action clarification pass and made test writing opt-in.'
        }
      }
    ]
  },
  'eec-id': {
    timeline: {
      th: 'มิ.ย. 2025 → พ.ค. 2026 · เขียน 486 จาก 502 commits ของแอปมือถือ',
      en: 'Jun 2025 → May 2026 · wrote 486 of the mobile app’s 502 commits'
    },
    results: [
      {
        th: 'แรงงานต่างชาติยืนยันตัวตนจากมือถือได้เลย ไม่ต้องไปต่อคิวที่สำนักงาน ลูกค้าทดสอบและรับรองแล้ว (SIT และ UAT)',
        en: 'Foreign workers can prove their identity from a phone instead of queuing at an office — signed off in client testing (SIT and UAT)'
      },
      {
        th: 'ล็อกอินข้ามแอปด้วยการกดครั้งเดียวใช้ได้บน iPhone หลังเทียบมา 7 วิธี',
        en: 'One-tap sign-in from partner apps works on iPhone, after 7 approaches were compared'
      },
      {
        th: 'ส่งครบ 28 หน้าจอใน 11 โมดูลเข้าสู่ UAT ตั้งแต่ตรวจตัวตนจนถึงล็อกอินข้ามแอป',
        en: '28 screens across 11 modules delivered to UAT, from identity checks to app-to-app sign-in'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'บน Android พออ่านเสร็จปุ๊บ แอป NFC ตัวอื่นก็แย่งชิปพาสปอร์ตไปทันที',
          en: 'On Android, other NFC apps grabbed the passport chip the moment a read finished.'
        },
        fix: {
          th: 'ถือ NFC ค้างไว้อีก ~2 วินาทีหลังอ่านสำเร็จ แล้วบอกผู้ใช้ให้ยกมือถือออก',
          en: 'Keep holding NFC for ~2 s after success and tell the user to move the phone away.'
        }
      },
      {
        problem: {
          th: 'กล้องกับ NFC แย่งกัน session ซ้อนกัน และแอปพังหลังกลับมาจาก background',
          en: 'Camera and NFC fought each other, sessions overlapped, and the app broke after the background.'
        },
        fix: {
          th: 'มี camera-session manager ตัวเดียว, guard ให้ finish ได้ครั้งเดียว, cleanup ตาม lifecycle และมีนับถอยหลังกับตัวนับจำนวนครั้ง',
          en: 'A single camera-session manager, a finish-once guard, lifecycle-aware cleanup, plus countdowns and attempt counters.'
        }
      },
      {
        problem: {
          th: 'ภาพที่ใช้กับ MRZ และ face match สีเพี้ยน หมุนผิด format ไม่รู้จัก และไฟล์ใหญ่เกิน',
          en: 'Images for MRZ and face match had wrong colours, wrong orientation, unknown formats and were too large.'
        },
        fix: {
          th: 'ถ่ายภาพนิ่งเต็ม ๆ แทนเฟรม preview หมุนภาพให้ถูก detect format ของรูปในชิป และบีบอัดก่อนอัปโหลด',
          en: 'Full still photos instead of preview frames, rotation, chip image-format detection and compression before upload.'
        }
      },
      {
        problem: {
          th: 'การ verify ฝั่ง backend ช้า เพราะทุกขั้นรันต่อกันทีละขั้น',
          en: 'Backend verification was slow because steps ran one after another.'
        },
        fix: {
          th: 'รันอัปโหลดกับ face match แบบขนาน ใส่ timing ทุกขั้น และแยก query ที่ช้าใน portal เจ้าหน้าที่',
          en: 'Ran uploads and face-match calls in parallel, added per-step timing, and split a slow query in the officer portal.'
        }
      },
      {
        problem: {
          th: 'app-to-app login แบบเงียบ ๆ บน iOS ไม่ผ่าน เพราะ cookie แยกตาม browser context — ลองไป 7 วิธี',
          en: 'Silent app-to-app login failed on iOS because cookies are per browser context — 7 approaches tried.'
        },
        fix: {
          th: 'ให้ backend ของแอปที่ล็อกอินอยู่เป็นคนออก authorization code แล้วส่ง redirect แบบ PKCE มาตรฐานกลับไปให้แอปที่เรียก',
          en: 'The logged-in app’s backend issues the authorization code and hands a standard PKCE redirect to the calling app.'
        }
      }
    ]
  },
  'eec-e-customs': {
    timeline: {
      th: 'เม.ย. → พ.ย. 2026 · ~1,550 commits ใน 10 repo · เขียน schedule service ขึ้นมาเองตั้งแต่ศูนย์',
      en: 'Apr → Nov 2026 · ~1,550 commits across 10 repos · built the schedule service from scratch'
    },
    results: [
      {
        th: 'กดจ่ายซ้ำแล้วไม่โดนตัดเงินซ้ำ และเลขเอกสารไม่ซ้ำกันแม้มีคำขอพร้อมกัน',
        en: 'Retrying a payment no longer charges twice, and document numbers no longer collide under load'
      },
      {
        th: 'เพิ่มงานตั้งเวลาใหม่ได้เร็วขึ้น เพราะไม่ต้องสร้างตัวรับคิวในทุกระบบ และงานเรียกได้เฉพาะระบบที่อนุญาตไว้',
        en: 'Adding a scheduled job is quicker — no queue listener to build in every service — and jobs can only call approved services'
      },
      {
        th: 'ทุกรอบ UAT รันชุดทดสอบ Playwright 275 เคสทั้งเส้นทางของผู้ใช้ และระบบชำระเงินตัวเดียวก็มี unit test ราว 250 ชุด',
        en: 'Every UAT round re-runs a 275-case Playwright suite; the payment service alone has about 250 unit tests'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'กดจ่ายเงินซ้ำแล้วอาจได้ payment ซ้อนขึ้นมาอีกรายการ',
          en: 'Retrying a payment could create a second payment.'
        },
        fix: {
          th: 'ถ้ามีลิงก์จ่ายเงินที่ยัง active อยู่ก็คืนลิงก์เดิมไป และ guard การเปลี่ยน state ไม่ให้ webhook มาทับคำขอที่ยกเลิกไปแล้ว',
          en: 'Return the existing payment link when one is active, and guard state transitions so a webhook can’t overwrite a cancelled request.'
        }
      },
      {
        problem: {
          th: 'job ตามเวลาตอบกลับผ่านคิว ทุก service เลยต้องมี consumer ของตัวเอง',
          en: 'Scheduled jobs replied over a queue, so every service needed its own consumer.'
        },
        fix: {
          th: 'ให้ Hangfire เรียกกลับ service ผ่าน HTTP มี allow-list แบบตรง host (กัน SSRF) และ authenticate ตัว callback',
          en: 'Hangfire calls services back over HTTP, with an exact-host allow-list (SSRF protection) and callback authentication.'
        }
      },
      {
        problem: {
          th: 'notification ส่งผ่านบางช่องทาง แต่บางช่องทางล้ม',
          en: 'Notifications succeeded on some channels and failed on others.'
        },
        fix: {
          th: 'ทำ retry queue ที่จำกัดรอบพร้อม dead-letter และเก็บ delivery log ไว้ ตอน retry จะได้ข้ามช่องทางที่ส่งสำเร็จไปแล้ว',
          en: 'A bounded retry queue with dead-lettering, and delivery logs so retries skip channels that already succeeded.'
        }
      },
      {
        problem: { th: 'เลข running ชนกันเวลามีคำขอเข้ามาพร้อมกัน', en: 'Running numbers collided under concurrency.' },
        fix: {
          th: 'ใช้ advisory lock ของ PostgreSQL ระดับ transaction ครอบตอนนับแล้ว insert',
          en: 'A transaction-scoped PostgreSQL advisory lock around count-then-insert.'
        }
      },
      {
        problem: {
          th: 'cache ค้าง ต้องมานั่งล้างเองด้วย key prefix',
          en: 'Stale cache, cleared by hand with key prefixes.'
        },
        fix: {
          th: 'ทำ save interceptor ที่ล้าง Redis entry ตาม tag หลัง commit เท่านั้น ครอบคลุม 57 query ที่ cache ไว้',
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
        th: 'import ครบ 1,014 บทความ (เผยแพร่ 1,009) 25 เล่ม 76 ฉบับ และไฟล์ใหม่ 9,707 ไฟล์',
        en: 'All 1,014 articles imported (1,009 published), 25 volumes, 76 issues and 9,707 new files'
      },
      {
        th: 'ผ่าน integrity check หลัง import 25 ข้อ เทียบ text field 7,070 ช่อง ไม่มีอะไรหาย',
        en: '25 post-import integrity checks passed; 7,070 text fields compared with nothing lost'
      },
      {
        th: 'หน้ารายการบทความ 41,232 ms → ~95–124 ms (production build บนเครื่อง local) และ payload 4.59 → ~3.0 MB',
        en: 'Article list 41,232 ms → ~95–124 ms (local production build) and payload 4.59 → ~3.0 MB'
      },
      { th: 'ผ่าน SonarQube quality gate ทั้งสอง repo', en: 'SonarQube quality gate passed on both repos' }
    ],
    obstacles: [
      {
        problem: {
          th: 'คอลัมน์เก่าไม่ได้เก็บตามชื่อ (คอลัมน์ "description" เก็บชื่อผู้แต่ง) แถมมีรูป BMP กับ base64 ปนอยู่',
          en: 'Legacy columns didn’t mean what they said (the “description” held authors), with BMP and base64 images mixed in.'
        },
        fix: {
          th: 'ทำ migration เป็นหลาย stage รันใน transaction และ rollback ทุกครั้ง เว้นแต่จะสั่ง --apply พร้อม backup ที่ตรวจแล้ว',
          en: 'A staged migration that runs in a transaction and always rolls back unless --apply is given with a verified backup.'
        }
      },
      {
        problem: {
          th: 'บทความเก่า 544 ชิ้นไม่ผ่านกฎการเผยแพร่ใหม่ (ไม่มีอีเมลหรือสังกัด)',
          en: '544 old articles failed the new publishing rules (missing emails or affiliations).'
        },
        fix: {
          th: 'คงสถานะการเผยแพร่เดิมไว้ ไม่ไปแต่งข้อมูลขึ้นมาเอง',
          en: 'Kept their original public state instead of inventing data.'
        }
      },
      {
        problem: { th: 'ทุกหน้าโหลดบทความทั้งหมดมาด้วย (~7 MB)', en: 'Every page carried every article (~7 MB).' },
        fix: {
          th: 'โหลดแค่ที่โชว์ abstract ค่อยโหลดเมื่อเปิดดู เปิด gzip ที่ API และแบ่งหน้าในหลังบ้าน',
          en: 'Load only what’s shown, abstracts on demand, gzip on the API, and paging in the back office.'
        }
      },
      {
        problem: { th: 'HTML เก่าไม่ปลอดภัย และ scanner เจอ finding', en: 'Unsafe legacy HTML and scanner findings.' },
        fix: {
          th: 'sanitize ทั้งตอน import และตอนอ่าน ทำ parsing ให้เป็น linear-time และอัปเดต dependency ให้แน่นขึ้น',
          en: 'Sanitize at import and at read, make parsing linear-time, and harden dependencies.'
        }
      },
      {
        problem: { th: 'วางเอกสาร Word ยาว ๆ แล้ว editor ค้าง', en: 'Pasting a long Word document froze the editor.' },
        fix: {
          th: 'ย้ายการประมวลผลรูปไปทำใน worker แล้วโชว์ progress bar',
          en: 'Moved picture processing to a worker with a progress bar.'
        }
      }
    ]
  },
  'cmu-research-gallery': {
    timeline: {
      th: 'พ.ค. → พ.ย. 2026 · deploy production เมื่อ ต.ค. 2026',
      en: 'May → Nov 2026 · production deploy in Oct 2026'
    },
    results: [
      {
        th: 'เคลียร์ database: ตาราง 90 → 72, คอลัมน์ 1,233 → 797, foreign key ที่ไม่มี index 37 → 0',
        en: 'Database clean-up: tables 90 → 72, columns 1,233 → 797, unindexed foreign keys 37 → 0'
      },
      {
        th: 'import นักวิจัย 244 คน และหน่วยวิจัย 64 หน่วย ไม่มี Scopus ID ซ้ำหรือผิด format',
        en: '244 researchers and 64 research units imported, with no duplicate or malformed Scopus IDs'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'backfill รอบก่อนทำให้นักวิจัย ~245 คนขึ้นเป็นสาธารณะโดยไม่มีหลักฐาน consent',
          en: 'An earlier backfill left ~245 researchers public with no consent evidence.'
        },
        fix: {
          th: 'ซ่อนไว้เป็น default (fail closed) ทั้งตอน import และ sync แล้วเช็กซ้ำอีกชั้นใน public query',
          en: 'Hidden by default (fail closed) on import and sync, with a double check in public queries.'
        }
      },
      {
        problem: { th: 'ข้อมูลจากลูกค้ามาเป็นไฟล์ Excel', en: 'Client data arrived as Excel files.' },
        fix: {
          th: 'แปลงเป็น JSON snapshot แล้ว commit เก็บไว้ จากนั้น import แบบ idempotent พร้อม validate Scopus ID',
          en: 'Convert to a committed JSON snapshot and import idempotently, validating Scopus IDs.'
        }
      },
      {
        problem: {
          th: 'sync จาก CMU Central ห้ามรันซ้อนกันเด็ดขาด',
          en: 'The CMU Central sync must never run twice at once.'
        },
        fix: {
          th: 'scheduled job ที่มี run lock และ cooldown 1 ชั่วโมงสำหรับการสั่งรันเอง',
          en: 'A scheduled job with a run lock and a 1-hour cooldown for manual runs.'
        }
      },
      {
        problem: {
          th: 'สองเว็บต่างคนต่างมี cookie และ key ของตัวเอง',
          en: 'Two sites each had their own cookie and keys.'
        },
        fix: {
          th: 'รวมเป็น session เดียว เช็ก Origin กับ allow-list และไม่ให้ dev login หลุดไป production',
          en: 'One shared session, Origin checked against an allow-list, and the dev login kept out of production.'
        }
      }
    ]
  },
  'ora-cmu': {
    timeline: {
      th: 'พ.ค. → พ.ย. 2026 · deploy production เมื่อ ต.ค. 2026',
      en: 'May → Nov 2026 · production deploy in Oct 2026'
    },
    results: [
      {
        th: 'ย้ายจาก WordPress เก่า: 796 post, 88 page, 143 event และไฟล์แนบ 6,221 ไฟล์ จาก dump 71 ตาราง',
        en: 'Migrated from the old WordPress: 796 posts, 88 pages, 143 events and 6,221 attachments from a 71-table dump'
      },
      {
        th: 'CMS ที่คุมได้ทั้งสไลด์ ทุน เอกสาร ข่าว และ role',
        en: 'A CMS covering slides, funding, documents, news and roles'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'ย้ายเนื้อหาจาก WordPress โดยไม่ให้ของเดิมเสียหาย',
          en: 'Migrating WordPress content without damaging the original.'
        },
        fix: {
          th: 'ทำ snapshot ที่ตรวจ hash, backup ที่ลอง restore แล้ว, import เข้ามาเป็น draft และรันซ้ำต้องได้จำนวนเท่าเดิมทุกครั้ง',
          en: 'A hash-verified snapshot, restore-tested backups, drafts on import, and reruns that must give identical counts.'
        }
      },
      {
        problem: { th: 'ลิงก์และไฟล์ media เก่าต้องยังใช้ได้', en: 'Old links and media had to keep working.' },
        fix: {
          th: 'map URL ของ media เก่า และปิด redirect ไว้ก่อนจนกว่าจะพร้อม',
          en: 'Mapped legacy media URLs and kept redirects inactive until ready.'
        }
      }
    ]
  },
  'junior-bootcamp': {
    timeline: { th: 'พ.ค. → ก.ค. 2026 · ทำคนเดียว', en: 'May → Jul 2026 · built solo' },
    results: [
      {
        th: 'load test 200 user เข้าดูเว็บ: ผ่าน 31,635 check (100%), p95 66 ms',
        en: 'Load test, 200 users browsing: 31,635 checks passed (100%), p95 66 ms'
      },
      {
        th: 'จำลองวันสอบเต็ม ๆ: 600 คนพร้อมกัน error 0% (แต่ช้า) แล้วพังที่ 800 — รู้ลิมิตตั้งแต่ก่อนวันสอบ',
        en: 'Full exam simulation: 600 concurrent users with 0% errors (but slow); it broke at 800 — the limit was known before exam day'
      },
      { th: 'E2E ที่เจาะจงไว้ผ่าน 28 จาก 28', en: '28 of 28 targeted E2E tests passed' }
    ],
    obstacles: [
      {
        problem: {
          th: 'เพดานรับโหลดต่ำ: DB connection แค่ 10 ตัวผ่าน Tailscale แถม Tailscale ยังตัด connection ที่ idle ทิ้ง',
          en: 'A capacity ceiling: 10 DB connections over Tailscale, which also dropped idle ones.'
        },
        fix: {
          th: 'เพิ่ม pool เป็น 25 ใส่ keepAlive กับ timeout แล้ว load test ใหม่อีกรอบ',
          en: 'Pool raised to 25 with keepAlive and timeouts, then load-tested again.'
        }
      },
      {
        problem: {
          th: 'รีเฟรชหรือเปิดอีกเครื่อง QR เช็กอินก็ไม่ตรงกัน',
          en: 'A refresh or a second device showed a different check-in QR.'
        },
        fix: {
          th: 'token เดียวต่อโมดูลและ action แล้ว upsert ลง database',
          en: 'One token per module and action, upserted in the database.'
        }
      },
      {
        problem: {
          th: 'สอบจับเวลาต้องปิดตรงเวลา และห้ามเข้าซ้ำ',
          en: 'Timed exams had to close on time and block re-entry.'
        },
        fix: {
          th: 'ปิดอัตโนมัติแล้วบังคับส่ง attempt ที่ยังเปิดอยู่ สลับข้อครั้งเดียวแล้วเก็บลำดับไว้ รีเฟรชก็ทำต่อจากเดิมได้',
          en: 'Auto-close force-submits open attempts; questions are shuffled once and the order saved, so a refresh resumes.'
        }
      },
      {
        problem: {
          th: 'live monitor ค้างหลัง connection หลุด',
          en: 'The live monitor went stale after a dropped connection.'
        },
        fix: {
          th: 'ใช้ SSE แล้ว refetch ตอน reconnect หรือตอนกลับมาที่แท็บ',
          en: 'SSE plus a refetch on reconnect or when the tab becomes visible.'
        }
      }
    ]
  },
  readitgo: {
    timeline: {
      th: 'ส.ค. 2025 → ม.ค. 2026 · เขียน 410 จาก 443 commits ของแอป',
      en: 'Aug 2025 → Jan 2026 · wrote 410 of the app’s 443 commits'
    },
    obstacles: [
      {
        problem: {
          th: 'timing data จาก ElevenLabs ไม่ได้เป็นอย่างที่คิด (ได้ 0 คำ ความยาว 0 ms)',
          en: 'ElevenLabs timing data didn’t match expectations (0 words, 0 ms duration).'
        },
        fix: {
          th: 'สร้าง timing รายคำจาก array รายตัวอักษร แล้วเอาความยาวจาก end time ตัวสุดท้าย',
          en: 'Build word timings from the character arrays and take duration from the last end time.'
        }
      },
      {
        problem: { th: 'ไฮไลต์วิ่งไม่ตรงกับเสียง', en: 'The highlight drifted from the voice.' },
        fix: {
          th: 'แก้หน่วย ms/วินาทีที่ปนกัน ลด lead เหลือ 0.02 s และใช้ binary search หาคำ',
          en: 'Fixed an ms/seconds mismatch, cut the lead to 0.02 s and used binary search for word lookup.'
        }
      },
      {
        problem: { th: 'นักเรียนต้องอ่านได้แม้ไม่มีเน็ต', en: 'Students needed to read without a connection.' },
        fix: {
          th: 'เก็บ e-book ใน IndexedDB มี progress ตอนดาวน์โหลด เช็กพื้นที่เก็บ และมีตัวบอกสถานะ online/offline',
          en: 'E-books in IndexedDB with download progress, storage checks and an online/offline indicator.'
        }
      },
      {
        problem: {
          th: 'ข้อสอบที่ AI สร้าง คำตอบที่ถูกชอบไปกองอยู่ตัวเลือกเดิม',
          en: 'AI-made quizzes kept the right answer on the same letter.'
        },
        fix: {
          th: 'validate ว่าใน 5 ข้อ คำตอบถูกต้องกระจายอย่างน้อย 3 ตำแหน่ง ไม่ผ่านก็ให้สร้างใหม่',
          en: 'Validate at least 3 answer positions across 5 questions, with retries.'
        }
      }
    ]
  }
}

export const experimentStories: Record<string, Story> = {
  'age-of-lost-knowledge': {
    timeline: {
      th: '15 → 21 พ.ย. 2026 · 419 commits · agent สองตัว (Claude + Codex) ตัวละ worktree',
      en: '15 → 21 Nov 2026 · 419 commits · two agents (Claude + Codex), one worktree each'
    },
    results: [
      { th: '21 ADR · test ผ่าน 1,186 ตัวที่ HD-2D step 2', en: '21 ADRs; 1,186 tests passing at HD-2D step 2' },
      {
        th: 'ย้ายจาก 2D ไป 3D ทีละ milestone (M0–M7) แต่ละขั้นต้องผ่าน pixel diff ≥ 99.5%',
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
          th: 'Codex รีวิวโค้ด combat ของ Claude แล้วเจอ exploit: ยิง 1,000 request ใน tick เดียวได้ 1,000 hit',
          en: 'Codex reviewing Claude’s combat code found an exploit: 1,000 requests in one tick gave 1,000 hits.'
        },
        fix: {
          th: 'cooldown 500 ms, ไม่เกิน 8 action ต่อ tick และให้ EXP เฉพาะดาเมจที่เข้าจริง (ADR-012)',
          en: '500 ms cooldown, max 8 actions per tick, and EXP only for damage actually dealt (ADR-012).'
        }
      },
      {
        problem: { th: 'เฟรมกระตุก', en: 'Frame stalls.' },
        fix: {
          th: 'เขียน profiler รายเฟรม และวาด HUD ใหม่เฉพาะตอนมีอะไรเปลี่ยน — allocation ต่อรอบ 3.6 → 1.9 GB',
          en: 'Built a per-frame profiler and redrew the HUD only on change — allocations 3.6 → 1.9 GB per run.'
        }
      },
      {
        problem: { th: 'draw call เยอะเกิน', en: 'Too many draw calls.' },
        fix: {
          th: 'ใช้ atlas 2048 ร่วมกัน และ batch ป้ายชื่อ — combat draw p95 327 → 248, texture memory 163 → 89 MB',
          en: 'A shared 2048 atlas and batched name plates — combat draw p95 327 → 248, texture memory 163 → 89 MB.'
        }
      },
      {
        problem: {
          th: 'network test ล้มแบบสุ่ม (2 ใน 6 ตอนเครื่องโหลดหนัก)',
          en: 'A flaky network test (2 of 6 under load).'
        },
        fix: {
          th: 'เปลี่ยนจากรอตามเวลาตายตัวเป็นรอตามเงื่อนไข — ผ่าน 12/12 ตอนโหลดเต็ม 16 core',
          en: 'Condition-based waits instead of fixed ones — 12/12 under a 16-core load.'
        }
      },
      {
        problem: {
          th: 'art direction เปลี่ยนไปเรื่อย ๆ (ADR-016 → 020)',
          en: 'Art direction kept changing (ADR-016 → 020).'
        },
        fix: {
          th: 'asset ทุกชิ้นต้องให้เจ้าของโปรเจกต์อนุมัติก่อน ชิ้นที่ยังไม่อนุมัติจะขึ้นเป็นกล่องสีขาว',
          en: 'Every asset needs owner approval; unapproved art renders as white boxes.'
        }
      }
    ]
  },
  'zoo-together': {
    timeline: {
      th: '24 ต.ค. → 1 พ.ย. 2026 · 20 commits · ให้ agent ทำทั้งหมด',
      en: '24 Oct → 1 Nov 2026 · 20 commits · fully agent-built'
    },
    results: [
      { th: 'สัตว์ 20 สายพันธุ์ และลูกผสม 190 แบบ', en: '20 species and 190 hybrids' },
      { th: '60 FPS ที่ sprite ~1,550 ตัว', en: '60 FPS with ~1,550 sprites' },
      {
        th: 'รีสตาร์ต server แล้วสวนสัตว์โหลดกลับจาก PostgreSQL ได้ครบ',
        en: 'The zoo reopens from PostgreSQL after a server restart'
      }
    ],
    obstacles: [
      {
        problem: {
          th: 'เศรษฐกิจในเกมเงียบเหงา: รันแบบ headless 10 วัน ได้ความพอใจ 55% กับคนเข้าชม ~24 คนต่อวัน',
          en: 'The economy felt dead: a 10-day headless run gave 55% satisfaction and ~24 visitors a day.'
        },
        fix: {
          th: 'จูน demand, ราคา และ need ใหม่ — ได้คนเข้าชม ~140 คนต่อวัน ความพอใจ 77%',
          en: 'Retuned demand, prices and needs — ~140 visitors a day and 77% satisfaction.'
        }
      },
      {
        problem: {
          th: 'รีเฟรชหน้าแล้วโดนปฏิเสธว่า "เชื่อมต่ออยู่แล้ว"',
          en: 'Refreshing was refused as “already connected”.'
        },
        fix: {
          th: 'ให้ connection ใหม่สุดแทนที่ตัวเก่า และเพิ่ม regression test',
          en: 'The newest connection replaces the old one, with a regression test.'
        }
      },
      {
        problem: { th: 'ไฟล์ art รวมกันหนัก 189 MB', en: 'The art weighed 189 MB.' },
        fix: { th: 'แปลงเป็น WebP และย่อพื้นหลัง 4K — เหลือ 43 MB', en: 'WebP and 4K backgrounds scaled down — 43 MB.' }
      },
      {
        problem: {
          th: 'deploy ค้าง: agent คลิกผ่าน UI ของ Dokploy ไม่ได้',
          en: 'The deploy stalled: the agent couldn’t click through the Dokploy UI.'
        },
        fix: {
          th: 'บทเรียน: การคลิกผ่าน web UI คือจุดที่ agent ไปต่อไม่ได้ ต้องให้ API key แทน',
          en: 'Lesson: clicking through web UIs is where agents hit their limit; it needs an API key instead.'
        }
      }
    ]
  }
}
