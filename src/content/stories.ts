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
      en: '5 → 22 Nov 2026 · 136 commits · 38 releases (v0.5 → v0.12.1) · built with AI coding agents'
    },
    results: [
      {
        en: 'PRs/MRs and pipelines for GitHub, GitLab and Bitbucket Cloud'
      },
      {
        en: 'Measured by the perf test: status 162 → ~106 ms, refs 180 → ~34 ms, submodules 519 → 0 ms'
      },
      {
        en: 'History search ~10–40× faster on big repos; pipelines tab ~3× faster'
      },
      {
        en: 'External contributors’ PRs merged (SSH hosts, an XSS fix); five UI languages after a user request'
      },
      {
        en: '~21 test scripts incl. e2e, perf, rate-limit, and 52 Bitbucket checks plus a live read-only run'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'Switching projects stalled: every tab asked Orca for the workspace every 3 s (spawning the CLI) and ran git status every 4 s, even when hidden.'
        },
        fix: {
          en: 'Hidden tabs stop polling, the lookup is skipped when the project is known, and the worker caches the workspace map until a change event.'
        }
      },
      {
        problem: {
          en: 'A repo with 300+ remote branches made the whole app slow.'
        },
        fix: {
          en: 'One git process per status, caching keyed on a refs/HEAD fingerprint, parallel detail fetches, and content-visibility so off-screen rows skip layout.'
        }
      },
      {
        problem: {
          en: 'The plugin channel caps each answer at 1 MiB, so repos with thousands of new files or many tags failed to load.'
        },
        fix: {
          en: 'Collapsed new folders and capped at 3,000 files, then later split oversized answers into UTF-8-byte-counted parts that the panel reassembles.'
        }
      },
      {
        problem: {
          en: 'Security: Markdown in MR descriptions could inject an event handler, and a symlinked file in a repo could make the plugin write outside it.'
        },
        fix: {
          en: 'Render links in a single pass instead of two, and open those files with O_NOFOLLOW.'
        }
      },
      {
        problem: {
          en: 'GitHub and Bitbucket rate limits (HTTP 429), and Bitbucket’s real API behaving differently from its docs.'
        },
        fix: {
          en: 'Share searches across views and pause at the limit while keeping the last lists on screen, and test each case against the real API.'
        }
      }
    ]
  },
  'qorstack-report': {
    timeline: {
      en: 'Jan → Nov 2026 · ~1,060 commits across 4 repos · formerly “Rendox” · v2.0 re-architecture in Oct 2026'
    },
    results: [
      { en: '43 stars and 7 forks on GitHub' },
      {
        en: 'SDKs on NuGet and npm, versioned with the server; one release pipeline to Docker Hub, NuGet and npm'
      },
      {
        en: 'An MCP server with 5 tools so AI agents can render documents'
      },
      {
        en: 'Used for certificates in a government e-service (signed off in UAT, pre-launch)'
      },
      {
        en: 'Customer-driven fixes, e.g. sign-in over plain HTTP on an intranet'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'LibreOffice PDFs didn’t match Word, especially Thai: different line breaks, fallback fonts pushing text down, lost indents.'
        },
        fix: {
          en: 'A generated WordFontMetrics table for Word’s line heights and glyph widths, compensation for thaiDistribute, and break points at Thai/Latin boundaries.'
        }
      },
      {
        problem: { en: 'PDF generation and uploads were slow.' },
        fix: {
          en: 'Dropped PDF/A-1b (2–3× slower), disabled Expect: 100-continue, and raised font-upload concurrency from 16 to 64.'
        }
      },
      {
        problem: {
          en: 'The async render queue had to survive restarts and scale out.'
        },
        fix: {
          en: 'Moved the queue into PostgreSQL: FOR UPDATE SKIP LOCKED, LISTEN/NOTIFY, reclaimable leases after crashes, retries, and HMAC-signed webhooks.'
        }
      },
      {
        problem: {
          en: 'Blocking SSRF in image URLs broke self-hosted users on intranets.'
        },
        fix: {
          en: 'Reversed the decision: http(s) only with size and time limits, shipped as a patch release.'
        }
      },
      {
        problem: {
          en: 'The v1 → v2 re-architecture, and fresh upgrades failing with “column does not exist”.'
        },
        fix: {
          en: 'One image and port for web + API, one bucket, a user-run storage migration script, and migrations that run before workers start.'
        }
      }
    ]
  },
  scanhub: {
    timeline: {
      en: '8 → 13 Nov 2026 · 21 commits · v1.2.0 · Apache-2.0'
    },
    results: [
      { en: '7 scanners bundled in one container' },
      {
        en: 'Generates pipelines for GitHub, GitLab, Jenkins, Azure, Bitbucket and CLI'
      },
      { en: 'amd64 and arm64 images on GHCR' },
      { en: '~54 unit/API tests and 13 Playwright E2E specs' }
    ],
    obstacles: [
      {
        problem: {
          en: 'Several tools reported the same issue, and when code moved, old findings looked new.'
        },
        fix: {
          en: 'Dedupe by CVE + package + version, and fingerprint the trimmed line text rather than the line number.'
        }
      },
      {
        problem: {
          en: 'Scans were compared against the wrong baseline across branches, tags and PRs.'
        },
        fix: {
          en: 'Per-repo ref rules that the pipeline asks for first, so rules change without editing the pipeline.'
        }
      },
      {
        problem: {
          en: 'The arm64 build under emulation in GitHub Actions dropped downloads mid-stream (curl error 18).'
        },
        fix: { en: 'Added retries and forced HTTP/1.1.' }
      },
      {
        problem: {
          en: 'SonarQube needed manual setup and shipped with admin/admin.'
        },
        fix: {
          en: 'An idempotent auto-setup that rotates to a random password, issues a token and stores both AES-GCM encrypted.'
        }
      },
      {
        problem: {
          en: 'Semgrep Registry rules carry a licence only the user can accept.'
        },
        fix: {
          en: 'Off by default: an admin accepts it or brings custom rules, plus a licences page.'
        }
      }
    ]
  },
  clipath: {
    timeline: {
      en: 'Aug 2026 · 44 commits · v1.0.13 · CI builds from tags, tests must pass first'
    },
    results: [
      {
        en: 'Measured on two monitors: shortcut to selection 455 → ~170 ms; idle memory 506 MB (9 processes) → 28 MB'
      },
      { en: 'Cold editor open 2.5 s → 115 ms' },
      { en: '62 Rust tests' },
      {
        en: 'At 125% scale, 10 of 10 drags exact to the pixel'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'Slow and heavy: captured frames went to BMP on disk and back.'
        },
        fix: {
          en: 'Keep raw RGBA in memory, split the overlay bundle from 370 kB to 6 kB, and tear down idle WebViews.'
        }
      },
      {
        problem: {
          en: 'The shortcut died after the first capture: Chromium suspended renderers of shrunk hidden windows.'
        },
        fix: {
          en: 'Reverted that change and added a watchdog that rebuilds the overlay when it doesn’t answer.'
        }
      },
      {
        problem: {
          en: 'After the screen slept, drawings were invisible and the app froze.'
        },
        fix: {
          en: 'Turned off WebView occlusion tracking, posted window work to the event loop, and versioned window labels.'
        }
      },
      {
        problem: { en: 'The app showed up in its own screenshots.' },
        fix: { en: 'DWM cloak with transitions forced off.' }
      },
      {
        problem: {
          en: 'At 125% scale a 640×400 selection saved as 646×405, and default shortcuts collided with other apps.'
        },
        fix: {
          en: 'Measure from the frozen frame, and move shortcuts to the Print Screen keys.'
        }
      }
    ]
  },
  'thai-pdf-fixer': {
    timeline: {
      en: '8 → 10 Mar 2026 · 69 commits in 3 days · v1.2.12'
    },
    results: [
      {
        en: 'A self-updating Windows installer; users install no Python'
      },
      {
        en: 'Every step works from the keyboard and is announced to screen readers'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'Garbled Thai from custom font encodings, split sara am and TIS-620/Windows-874 mojibake.'
        },
        fix: {
          en: 'Character remapping, combining-mark reordering, rebuilding sara am and CID-to-Unicode resolution.'
        }
      },
      {
        problem: {
          en: 'The PyInstaller build crashed on start (ModuleNotFoundError).'
        },
        fix: {
          en: 'Forced the pure-Python package instead of the compiled modules.'
        }
      },
      {
        problem: {
          en: 'Thai broke in the converter’s output on Windows.'
        },
        fix: { en: 'Forced UTF-8 on stdout/stderr.' }
      },
      {
        problem: {
          en: 'Auto-update broke: missing signatures, a key corrupted by a newline, and 404s from spaces in the file name.'
        },
        fix: {
          en: 'Build and publish manually, use printf instead of echo, and hyphenate the file name.'
        }
      },
      {
        problem: { en: 'Text-to-speech was unreliable.' },
        fix: {
          en: 'Removed it and used aria-live so the user’s own screen reader speaks.'
        }
      }
    ]
  },
  sage: {
    timeline: {
      en: 'May → Oct 2026 · 231 commits · v1.1 → v1.9'
    },
    results: [
      { en: 'One-command installers for Bash and PowerShell' },
      {
        en: 'Works with Claude Code, Codex, Cursor, Copilot, Gemini and Windsurf'
      },
      { en: 'Used daily, including on client and day-job repos' }
    ],
    obstacles: [
      {
        problem: {
          en: 'The first version was too heavy: a CLI, an MCP server, stores, Docker and CI.'
        },
        fix: {
          en: 'Collapsed it to one AGENTS.md protocol plus conflict-free Markdown knowledge files, and removed the Python code.'
        }
      },
      {
        problem: {
          en: 'The interactive installer failed in some shells (when piped, and in PowerShell).'
        },
        fix: {
          en: 'Read answers from /dev/tty and Read-Host, and fetch the latest version via a CDN.'
        }
      },
      {
        problem: { en: 'Agents asked too many unnecessary questions.' },
        fix: {
          en: 'Added a pre-action clarification pass and made test writing opt-in.'
        }
      }
    ]
  },
  'eec-id': {
    timeline: {
      en: 'Jun 2025 → May 2026 (continued into the Senior role) · built most of the mobile app'
    },
    results: [
      {
        en: 'Foreign workers can prove their identity from a phone instead of queuing at an office — signed off in client testing (SIT and UAT), ahead of launch'
      },
      {
        en: 'One-tap sign-in from partner apps works on iPhone, after 7 approaches were compared'
      },
      {
        en: '28 screens across 11 modules delivered to UAT, from identity checks to app-to-app sign-in'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'On Android, other NFC apps grabbed the passport chip the moment a read finished.'
        },
        fix: {
          en: 'Keep holding NFC for ~2 s after success and tell the user to move the phone away.'
        }
      },
      {
        problem: {
          en: 'Camera and NFC fought each other, sessions overlapped, and the app broke after the background.'
        },
        fix: {
          en: 'A single camera-session manager, a finish-once guard, lifecycle-aware cleanup, plus countdowns and attempt counters.'
        }
      },
      {
        problem: {
          en: 'Images for MRZ and face match had wrong colours, wrong orientation, unknown formats and were too large.'
        },
        fix: {
          en: 'Full still photos instead of preview frames, rotation, chip image-format detection and compression before upload.'
        }
      },
      {
        problem: {
          en: 'Backend verification was slow because steps ran one after another.'
        },
        fix: {
          en: 'Ran uploads and face-match calls in parallel, added per-step timing, and split a slow query in the officer portal.'
        }
      },
      {
        problem: {
          en: 'Silent app-to-app login failed on iOS because cookies are per browser context — 7 approaches tried.'
        },
        fix: {
          en: 'The logged-in app’s backend issues the authorization code and hands a standard PKCE redirect to the calling app.'
        }
      }
    ]
  },
  'eec-e-customs': {
    timeline: {
      en: 'Apr → Nov 2026 · Phase 2 signed off in SIT/UAT, awaiting launch · set up 5 services from scratch · designed and wrote most of the payment service'
    },
    results: [
      {
        en: 'In SIT/UAT, retrying a payment returns the existing payment link instead of charging twice, and document numbers no longer collide under load'
      },
      {
        en: 'Adding a scheduled job is quicker — no queue listener to build in every service — and jobs can only call approved services'
      },
      {
        en: 'Every UAT round re-runs a 275-case Playwright suite; the payment service alone has about 250 unit tests'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'Retrying a payment could create a second payment.'
        },
        fix: {
          en: 'Return the existing payment link when one is active, and guard state transitions so a webhook can’t overwrite a cancelled request.'
        }
      },
      {
        problem: {
          en: 'Scheduled jobs replied over a queue, so every service needed its own consumer.'
        },
        fix: {
          en: 'Hangfire calls services back over HTTP, with an exact-host allow-list (SSRF protection) and callback authentication.'
        }
      },
      {
        problem: {
          en: 'Notifications succeeded on some channels and failed on others.'
        },
        fix: {
          en: 'A bounded retry queue with dead-lettering, and delivery logs so retries skip channels that already succeeded.'
        }
      },
      {
        problem: { en: 'Running numbers collided under concurrency.' },
        fix: {
          en: 'A transaction-scoped PostgreSQL advisory lock around count-then-insert.'
        }
      },
      {
        problem: {
          en: 'Stale cache, cleared by hand with key prefixes.'
        },
        fix: {
          en: 'A save interceptor that clears tagged Redis entries only after commit, covering 57 cached queries.'
        }
      }
    ]
  },
  'cmu-journal': {
    timeline: {
      en: 'Sep → Nov 2026 · live on 10 Nov 2026 at journal.red-cmu.com'
    },
    results: [
      {
        en: 'All 1,014 articles imported (1,009 published), 25 volumes, 76 issues and 9,707 new files'
      },
      {
        en: '25 post-import integrity checks passed; 7,070 text fields compared with nothing lost'
      },
      {
        en: 'Article list 41,232 ms → ~95–124 ms (local production build) and payload 4.59 → ~3.0 MB'
      },
      { en: 'SonarQube quality gate passed on both repos' }
    ],
    obstacles: [
      {
        problem: {
          en: 'Legacy columns didn’t mean what they said (the “description” held authors), with BMP and base64 images mixed in.'
        },
        fix: {
          en: 'A staged migration that runs in a transaction and always rolls back unless --apply is given with a verified backup.'
        }
      },
      {
        problem: {
          en: '544 old articles failed the new publishing rules (missing emails or affiliations).'
        },
        fix: {
          en: 'Kept their original public state instead of inventing data.'
        }
      },
      {
        problem: { en: 'Every page carried every article (~7 MB).' },
        fix: {
          en: 'Load only what’s shown, abstracts on demand, gzip on the API, and paging in the back office.'
        }
      },
      {
        problem: { en: 'Unsafe legacy HTML and scanner findings.' },
        fix: {
          en: 'Sanitize at import and at read, make parsing linear-time, and harden dependencies.'
        }
      },
      {
        problem: { en: 'Pasting a long Word document froze the editor.' },
        fix: {
          en: 'Moved picture processing to a worker with a progress bar.'
        }
      }
    ]
  },
  'cmu-research-gallery': {
    timeline: {
      en: 'May → Nov 2026 · production deploy in Oct 2026'
    },
    results: [
      {
        en: 'Database clean-up: tables 90 → 72, columns 1,233 → 797, unindexed foreign keys 37 → 0'
      },
      {
        en: '244 researchers and 64 research units imported, with no duplicate or malformed Scopus IDs'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'An earlier backfill left ~245 researchers public with no consent evidence.'
        },
        fix: {
          en: 'Hidden by default (fail closed) on import and sync, with a double check in public queries.'
        }
      },
      {
        problem: { en: 'Client data arrived as Excel files.' },
        fix: {
          en: 'Convert to a committed JSON snapshot and import idempotently, validating Scopus IDs.'
        }
      },
      {
        problem: {
          en: 'The CMU Central sync must never run twice at once.'
        },
        fix: {
          en: 'A scheduled job with a run lock and a 1-hour cooldown for manual runs.'
        }
      },
      {
        problem: {
          en: 'Two sites each had their own cookie and keys.'
        },
        fix: {
          en: 'One shared session, Origin checked against an allow-list, and the dev login kept out of production.'
        }
      }
    ]
  },
  'ora-cmu': {
    timeline: {
      en: 'May → Nov 2026 · production deploy in Oct 2026'
    },
    results: [
      {
        en: 'Migrated from the old WordPress: 796 posts, 88 pages, 143 events and 6,221 attachments from a 71-table dump'
      },
      {
        en: 'A CMS covering slides, funding, documents, news and roles'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'Migrating WordPress content without damaging the original.'
        },
        fix: {
          en: 'A hash-verified snapshot, restore-tested backups, drafts on import, and reruns that must give identical counts.'
        }
      },
      {
        problem: { en: 'Old links and media had to keep working.' },
        fix: {
          en: 'Mapped legacy media URLs and kept redirects inactive until ready.'
        }
      }
    ]
  },
  'junior-bootcamp': {
    timeline: { en: 'May → Jul 2026 · built solo' },
    results: [
      {
        en: 'Load test, 200 users browsing: 31,635 checks passed (100%), p95 66 ms'
      },
      {
        en: 'Full exam simulation: 600 concurrent users with 0% errors (but slow); it broke at 800 — the limit was known before exam day'
      },
      { en: '28 of 28 targeted E2E tests passed' }
    ],
    obstacles: [
      {
        problem: {
          en: 'A capacity ceiling: 10 DB connections over Tailscale, which also dropped idle ones.'
        },
        fix: {
          en: 'Pool raised to 25 with keepAlive and timeouts, then load-tested again.'
        }
      },
      {
        problem: {
          en: 'A refresh or a second device showed a different check-in QR.'
        },
        fix: {
          en: 'One token per module and action, upserted in the database.'
        }
      },
      {
        problem: {
          en: 'Timed exams had to close on time and block re-entry.'
        },
        fix: {
          en: 'Auto-close force-submits open attempts; questions are shuffled once and the order saved, so a refresh resumes.'
        }
      },
      {
        problem: {
          en: 'The live monitor went stale after a dropped connection.'
        },
        fix: {
          en: 'SSE plus a refetch on reconnect or when the tab becomes visible.'
        }
      }
    ]
  },
  readitgo: {
    timeline: {
      en: 'Aug 2025 → Jan 2026 · wrote 410 of the app’s 443 commits'
    },
    obstacles: [
      {
        problem: {
          en: 'ElevenLabs timing data didn’t match expectations (0 words, 0 ms duration).'
        },
        fix: {
          en: 'Build word timings from the character arrays and take duration from the last end time.'
        }
      },
      {
        problem: { en: 'The highlight drifted from the voice.' },
        fix: {
          en: 'Fixed an ms/seconds mismatch, cut the lead to 0.02 s and used binary search for word lookup.'
        }
      },
      {
        problem: { en: 'Students needed to read without a connection.' },
        fix: {
          en: 'E-books in IndexedDB with download progress, storage checks and an online/offline indicator.'
        }
      },
      {
        problem: {
          en: 'AI-made quizzes kept the right answer on the same letter.'
        },
        fix: {
          en: 'Validate at least 3 answer positions across 5 questions, with retries.'
        }
      }
    ]
  }
}

export const experimentStories: Record<string, Story> = {
  'age-of-lost-knowledge': {
    timeline: {
      en: '15 → 21 Nov 2026 · 419 commits · two agents (Claude + Codex), one worktree each'
    },
    results: [
      { en: '21 ADRs; 1,186 tests passing at HD-2D step 2' },
      {
        en: 'Moved from 2D to 3D milestone by milestone (M0–M7), each gated by a ≥ 99.5% pixel diff'
      },
      {
        en: 'Walking in 3D: mean 3.50 ms per frame, p99 6.87 ms'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'Codex reviewing Claude’s combat code found an exploit: 1,000 requests in one tick gave 1,000 hits.'
        },
        fix: {
          en: '500 ms cooldown, max 8 actions per tick, and EXP only for damage actually dealt (ADR-012).'
        }
      },
      {
        problem: { en: 'Frame stalls.' },
        fix: {
          en: 'Built a per-frame profiler and redrew the HUD only on change — allocations 3.6 → 1.9 GB per run.'
        }
      },
      {
        problem: { en: 'Too many draw calls.' },
        fix: {
          en: 'A shared 2048 atlas and batched name plates — combat draw p95 327 → 248, texture memory 163 → 89 MB.'
        }
      },
      {
        problem: {
          en: 'A flaky network test (2 of 6 under load).'
        },
        fix: {
          en: 'Condition-based waits instead of fixed ones — 12/12 under a 16-core load.'
        }
      },
      {
        problem: {
          en: 'Art direction kept changing (ADR-016 → 020).'
        },
        fix: {
          en: 'Every asset needs owner approval; unapproved art renders as white boxes.'
        }
      }
    ]
  },
  'zoo-together': {
    timeline: {
      en: '24 Oct → 1 Nov 2026 · 20 commits · fully agent-built'
    },
    results: [
      { en: '20 species and 190 hybrids' },
      { en: '60 FPS with ~1,550 sprites' },
      {
        en: 'The zoo reopens from PostgreSQL after a server restart'
      }
    ],
    obstacles: [
      {
        problem: {
          en: 'The economy felt dead: a 10-day headless run gave 55% satisfaction and ~24 visitors a day.'
        },
        fix: {
          en: 'Retuned demand, prices and needs — ~140 visitors a day and 77% satisfaction.'
        }
      },
      {
        problem: {
          en: 'Refreshing was refused as “already connected”.'
        },
        fix: {
          en: 'The newest connection replaces the old one, with a regression test.'
        }
      },
      {
        problem: { en: 'The art weighed 189 MB.' },
        fix: { en: 'WebP and 4K backgrounds scaled down — 43 MB.' }
      },
      {
        problem: {
          en: 'The deploy stalled: the agent couldn’t click through the Dokploy UI.'
        },
        fix: {
          en: 'Lesson: clicking through web UIs is where agents hit their limit; it needs an API key instead.'
        }
      }
    ]
  }
}
