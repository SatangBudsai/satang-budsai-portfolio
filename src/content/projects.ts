import { galleries } from './galleries'
import { stories } from './stories'
import type { CaseStudy, Product, Project } from './types'

const browser = 'browser' as const

export const products: Product[] = [
  {
    kind: 'product',
    slug: 'git-control-orca',
    title: 'Git Control for Orca',
    category: { en: 'Git plugin' },
    version: 'v0.12.1',
    tagline: {
      en: 'All of Git — PRs, MRs and pipelines included — inside the editor. In daily use.'
    },
    summary: {
      en: 'A Git client inside Orca: the commit graph, commits, branches, stashes, merge requests and pipelines for GitHub and GitLab, in the same tab as your code — for projects on your machine and on SSH servers. It uses your installed git and the login you already have, so there are no tokens to create.'
    },
    facts: [
      {
        value: 'PR + MR',
        label: { en: 'review, approve and merge from the editor' }
      },
      {
        value: 'Queue',
        label: { en: 'merges several MRs in the background' }
      },
      { value: 'SSH', label: { en: 'works with projects on servers' } },
      { value: '0', label: { en: 'tokens to create' } }
    ],
    why: {
      en: 'Reviewing and merging meant bouncing between the editor and GitHub or GitLab all day. Git Control brings it next to the code — from reading history to merging when the pipeline passes.'
    },
    features: [
      {
        title: { en: 'Review MRs and PRs like on GitLab' },
        body: {
          en: 'Description, reviewers, approvals, inline comments and the pipeline — then Approve or Merge right there, with Explain and AI review.'
        },
        media: {
          kind: 'image',
          src: '/work/orca-git/mr.webp',
          width: 1440,
          height: 900,
          alt: { en: 'A merge request’s detail page' },
          frame: 'browser'
        }
      },
      {
        title: { en: 'A merge queue that never collides' },
        body: {
          en: 'Tick several MRs and Approve & merge: they go one at a time per project, rebasing when GitLab asks, while you keep working.'
        }
      },
      {
        title: { en: 'Every branch’s pipeline on one page' },
        body: {
          en: 'Status, commit, who started it and every stage, for GitHub and GitLab.'
        },
        media: {
          kind: 'image',
          src: '/work/orca-git/pipelines.webp',
          width: 1440,
          height: 900,
          alt: { en: 'The pipelines page' },
          frame: 'browser'
        }
      },
      {
        title: { en: 'A second look before each commit' },
        body: {
          en: 'Flags secrets, tokens or keys, very big files and commits straight to main — and AI drafts the message.'
        }
      }
    ],
    how: {
      title: {
        en: 'Your git, your login. Nothing new to set up.'
      },
      steps: [
        { en: 'Install from Orca’s plugin marketplace' },
        { en: 'Open a Git project, local or over SSH' },
        {
          en: 'Sign in with the Git login, gh or glab you already have'
        },
        {
          en: 'Review, merge and watch pipelines without leaving the editor'
        }
      ],
      media: {
        kind: 'image',
        src: '/work/orca-git/repos.webp',
        width: 1440,
        height: 900,
        alt: { en: 'All repositories on one page' },
        frame: 'browser'
      }
    },
    role: {
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
        alt: { en: 'Git Control for Orca' },
        frame: 'none'
      },
      float: {
        kind: 'image',
        src: '/work/orca-git/icon.webp',
        width: 256,
        height: 256,
        alt: { en: 'Git Control icon' },
        tile: true
      }
    },
    stack: ['JavaScript', 'Node worker', 'Orca plugin API', 'GitHub API', 'GitLab API', 'SSH'],
    links: [{ label: { en: 'GitHub' }, href: 'https://github.com/SatangBudsai/orca-git-extension' }],
    cover: {
      kind: 'image',
      src: '/work/orca-git/cover.webp',
      width: 1600,
      height: 1000,
      alt: { en: 'Git Control for Orca' },
      frame: 'none'
    }
  },
  {
    kind: 'product',
    slug: 'qorstack-report',
    title: 'Qorstack Report',
    category: { en: 'Document engine' },
    version: 'v2.4',
    tagline: {
      en: 'Templates in, documents out. Word/Excel templates plus data become PDF, Word or Excel through one API.'
    },
    summary: {
      en: 'Design documents in Word or Excel, send JSON to one endpoint, and get a finished PDF, DOCX or XLSX back — self-hosted or in the cloud, with Node and .NET SDKs and an MCP server for AI agents.'
    },
    facts: [
      { value: '3', label: { en: 'output formats: PDF · DOCX · XLSX' } },
      { value: '2', label: { en: 'official SDKs: Node and .NET' } },
      {
        value: 'MCP',
        label: { en: 'server so AI agents can render documents' }
      },
      {
        value: 'Gov',
        label: { en: 'renders certificates in a government e-service' }
      }
    ],
    why: {
      en: 'Most business systems have to produce documents, and the layout usually ends up hard-coded. Qorstack Report lets whoever knows Word own the layout — developers only send data.'
    },
    features: [
      {
        title: { en: 'Wire up the API in minutes' },
        body: {
          en: 'Every template comes with copy-ready code for cURL, Node.js and .NET: add your API key, send JSON, get the file back. Typed SDKs generated from the OpenAPI spec, and an MCP server for AI agents.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/api.webp',
          width: 1440,
          height: 900,
          alt: { en: 'API calls in cURL, Node.js and .NET' },
          frame: browser
        }
      },
      {
        title: { en: 'A generate page with a live preview' },
        body: {
          en: 'It reads the {{placeholders}} from your Word file, you fill in values, tables, images, QR codes and barcodes, press Generate PDF and see the result beside it — before writing a line of code.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/demo.webp',
          width: 1280,
          height: 720,
          animated: true,
          alt: { en: 'Filling fields and pressing Generate PDF' },
          frame: browser
        }
      },
      {
        title: { en: 'Design in Word, call the API, get the document' },
        body: {
          en: 'Templates are plain Word/Excel files, rendered with OpenXML/ClosedXML and converted through Gotenberg, so the output matches the original.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/design-api.webp',
          width: 1280,
          height: 720,
          alt: { en: 'A Word template next to the API call' },
          frame: browser
        }
      },
      {
        title: { en: 'Self-host with one compose file' },
        body: {
          en: 'Documents stay in your network: any S3-compatible storage, API keys per project, and a history of every render.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/selfhost.webp',
          width: 1440,
          height: 900,
          alt: { en: 'The self-host install commands' },
          frame: browser
        }
      },
      {
        title: { en: 'Big jobs run async' },
        body: {
          en: 'Call it synchronously or as a job with a signed webhook; download links are signed and time-limited, so S3 is never exposed.'
        }
      },
      {
        title: { en: 'Docs from day one' },
        body: {
          en: 'Quick start, variables, tables, images, QR codes, barcodes and file settings — each with a copy-ready request.'
        },
        media: {
          kind: 'image',
          src: '/work/qorstack-report/docs.webp',
          width: 1440,
          height: 900,
          alt: { en: 'The quick start docs' },
          frame: browser
        }
      }
    ],
    how: {
      title: { en: 'Template + JSON in. Document out.' },
      steps: [
        { en: 'Upload a template made in Word or Excel' },
        { en: 'Copy that template’s request into your app' },
        { en: 'Send JSON over REST, an SDK or MCP' },
        { en: 'Get a signed download link — or a webhook' }
      ],
      media: {
        kind: 'image',
        src: '/work/qorstack-report/how.webp',
        width: 1440,
        height: 700,
        alt: { en: 'Upload a template, send JSON, get the file' },
        frame: browser
      }
    },
    role: {
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
        alt: { en: 'The Qorstack Report generate page' },
        frame: 'browser'
      },
      float: {
        kind: 'image',
        src: '/work/qorstack-report/api-code.webp',
        width: 720,
        height: 452,
        alt: { en: 'The API call in cURL' },
        frame: 'none'
      }
    },
    stack: ['.NET 10', 'Clean Architecture', 'MediatR', 'EF Core', 'PostgreSQL', 'Gotenberg', 'S3', 'Next.js 16'],
    links: [
      { label: { en: 'Website' }, href: 'https://report.qorstack.com' },
      { label: { en: 'GitHub' }, href: 'https://github.com/qorstack/qorstack-report' }
    ],
    cover: {
      kind: 'image',
      src: '/work/qorstack-report/overview.webp',
      width: 1280,
      height: 720,
      animated: true,
      alt: { en: 'Qorstack Report overview' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'scanhub',
    title: 'ScanHub',
    category: { en: 'DevSecOps' },
    version: 'v1.2',
    tagline: {
      en: 'Every security scanner, one verdict. Seven scanners in one container.'
    },
    summary: {
      en: 'Results from SonarQube, Trivy, Semgrep, Gitleaks, Grype, Checkov and OWASP Dependency-Check in one place, organised by project and repo, merged into one list and compared with the previous scan — so you see what is new and what got fixed.'
    },
    facts: [
      { value: '7', label: { en: 'scanners in one container' } },
      { value: '1', label: { en: 'file to install: docker-compose.yml' } },
      { value: '6', label: { en: 'CI platforms supported' } },
      { value: 'arm64', label: { en: 'and amd64 images on GHCR' } }
    ],
    why: {
      en: 'Every scanner has its own dashboard and its own format. ScanHub puts them in one place and lets the pipeline ask a single question: pass or block?'
    },
    features: [
      {
        title: { en: 'One-click CI setup' },
        body: {
          en: 'For GitHub and GitLab, ScanHub sets the secret and opens the setup Pull Request itself. Other platforms get a ready-made snippet.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/auto-setup.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: {
            en: 'ScanHub opening a CI setup pull request'
          },
          frame: browser
        }
      },
      {
        title: { en: 'Block or just report' },
        body: {
          en: 'Change the gate in ScanHub — no pipeline edit.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/ci-gate.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { en: 'CI gate settings in ScanHub' },
          frame: browser
        }
      },
      {
        title: { en: 'New vs fixed' },
        body: {
          en: 'Every scan kept in history and diffed against the last.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/history.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { en: 'Scan history in ScanHub' },
          frame: browser
        }
      },
      {
        title: { en: 'Client-ready reports' },
        body: {
          en: 'PDF or HTML export, and password-protected share links.'
        },
        media: {
          kind: 'image',
          src: '/work/scanhub/report-export.webp',
          width: 1280,
          height: 800,
          animated: true,
          alt: { en: 'Exporting a report in ScanHub' },
          frame: browser
        }
      }
    ],
    how: {
      title: { en: 'CI uploads source. ScanHub does the rest.' },
      steps: [
        { en: 'The pipeline sends the source archive' },
        { en: 'All scanners run inside one container' },
        {
          en: 'Findings merged, de-duplicated, diffed with the last scan'
        },
        { en: 'Pass or block goes back to the pipeline' }
      ],
      media: {
        kind: 'image',
        src: '/work/scanhub/architecture.webp',
        width: 1100,
        height: 619,
        animated: true,
        alt: { en: 'ScanHub architecture' }
      }
    },
    role: {
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
        alt: { en: 'ScanHub security dashboard' },
        frame: 'none'
      },
      float: {
        kind: 'image',
        src: '/work/scanhub/results.webp',
        width: 1280,
        height: 800,
        animated: true,
        alt: { en: 'ScanHub results overview' },
        frame: 'browser'
      }
    },
    stack: ['Node 22', 'Express', 'PostgreSQL', 'Docker', 'GHCR', 'Playwright'],
    links: [{ label: { en: 'GitHub' }, href: 'https://github.com/SatangBudsai/scanhub' }],
    cover: {
      kind: 'image',
      src: '/work/scanhub/results.webp',
      width: 1280,
      height: 800,
      animated: true,
      alt: { en: 'ScanHub results overview' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'clipath',
    title: 'Clipath',
    category: { en: 'Desktop utility' },
    version: 'v1.0',
    tagline: {
      en: 'Capture. Annotate. Paste the path. A Windows screenshot tool for AI-CLI workflows.'
    },
    summary: {
      en: 'Every capture is saved to a folder you choose and its file path is copied instantly — ready to paste into Claude Code, Codex CLI, terminals, IDEs and issue trackers.'
    },
    facts: [
      { value: '~170 ms', label: { en: 'from shortcut to selection' } },
      { value: '28 MB', label: { en: 'memory while idle' } },
      { value: '0%', label: { en: 'CPU while idle' } },
      { value: 'Multi-DPI', label: { en: 'accurate crops across monitors' } }
    ],
    why: {
      en: 'Working with AI coding agents means handing them screenshots constantly — and hunting through Explorer for the file you just took. Clipath makes it one keystroke.'
    },
    features: [
      {
        title: { en: 'Annotate in place' },
        body: {
          en: 'Blur, pixelate, step counters and an eyedropper, built on Konva.'
        }
      },
      {
        title: { en: 'Fast from the first keystroke' },
        body: {
          en: 'WebViews stay warm while you capture and are released after 10 idle minutes.'
        }
      },
      {
        title: { en: 'Small Rust build' },
        body: {
          en: 'xcap for capture, arboard for the clipboard, the Windows API directly.'
        }
      }
    ],
    how: {
      title: { en: 'Shortcut in. Path on the clipboard.' },
      steps: [
        { en: 'Press the shortcut and drag a region' },
        { en: 'Annotate if you need to' },
        { en: 'The capture is saved to your folder' },
        { en: 'Paste the path into your prompt' }
      ],
      media: {
        kind: 'image',
        src: '/work/clipath/site.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Clipath website' },
        frame: browser
      }
    },
    role: {
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
        alt: { en: 'Clipath website' },
        frame: 'browser'
      },
      float: {
        kind: 'image',
        src: '/work/clipath/logo.webp',
        width: 1254,
        height: 1254,
        alt: { en: 'Clipath app icon' },
        tile: true
      }
    },
    stack: ['Tauri 2', 'Rust', 'React 18', 'Konva', 'Windows API'],
    links: [
      { label: { en: 'Website' }, href: 'https://clipath.qorstack.com' },
      { label: { en: 'Download' }, href: 'https://github.com/qorstack/clipath/releases/latest' },
      { label: { en: 'GitHub' }, href: 'https://github.com/qorstack/clipath' }
    ],
    cover: {
      kind: 'image',
      src: '/work/clipath/site.webp',
      width: 1440,
      height: 900,
      alt: { en: 'Clipath website' },
      frame: browser
    }
  },
  {
    kind: 'product',
    slug: 'thai-pdf-fixer',
    title: 'Thai PDF Fixer',
    category: { en: 'Accessibility' },
    version: 'v1.2',
    tagline: {
      en: 'Broken Thai PDFs, readable again — for blind users on NVDA and JAWS.'
    },
    summary: {
      en: 'Turns Thai PDFs with broken text into Word files that screen readers read correctly. Every step works from the keyboard and is announced, and Python is bundled — nothing else to install.'
    },
    facts: [
      { value: '100%', label: { en: 'keyboard operable' } },
      { value: 'NVDA', label: { en: 'and JAWS announce every step' } },
      { value: '0', label: { en: 'extra things to install' } },
      { value: 'Auto', label: { en: 'updates itself' } }
    ],
    why: {
      en: 'Many Thai PDFs store characters in the wrong order: they look fine but a screen reader reads gibberish. This repairs the text before it reaches the user.'
    },
    features: [
      {
        title: { en: 'Repairs vowels and tone marks' },
        body: {
          en: 'Fixes split sara am and misplaced tone marks, with PyThaiNLP for word boundaries.'
        },
        media: {
          kind: 'diagram',
          id: 'pdf-fixer',
          alt: { en: 'Text before and after the fix' }
        }
      },
      {
        title: { en: 'Keeps tables and images' },
        body: {
          en: 'Tables and images come across into the Word file too.'
        }
      },
      {
        title: { en: 'Built for screen readers' },
        body: {
          en: 'Each step is announced, with sounds for success and errors.'
        }
      }
    ],
    how: {
      title: { en: 'Broken PDF in. Readable Word out.' },
      steps: [
        { en: 'Pick a PDF with the keyboard' },
        {
          en: 'Text, tables and images extracted with PyMuPDF and pdfplumber'
        },
        { en: 'Thai character order repaired' },
        { en: 'Saved as .docx, announced by the screen reader' }
      ]
    },
    role: {
      en: 'Solo — design, the Python pipeline and the Tauri app'
    },
    stage: {
      tone: '#f5c033',
      chips: ['NVDA', 'JAWS', '100% keyboard'],
      main: {
        kind: 'diagram',
        id: 'pdf-fixer',
        alt: { en: 'Thai text before and after the fix' }
      },
      float: {
        kind: 'image',
        src: '/work/thai-pdf-fixer/logo.webp',
        width: 512,
        height: 512,
        alt: { en: 'Thai PDF Fixer app icon' },
        tile: true
      }
    },
    stack: ['Tauri', 'Next.js', 'Python', 'PyMuPDF', 'pdfplumber', 'PyThaiNLP', 'python-docx'],
    links: [
      {
        label: { en: 'Download' },
        href: 'https://github.com/SatangBudsai/thai-pdf-fixer-for-the-blind/releases/latest'
      },
      { label: { en: 'GitHub' }, href: 'https://github.com/SatangBudsai/thai-pdf-fixer-for-the-blind' }
    ],
    cover: {
      kind: 'diagram',
      id: 'pdf-fixer',
      alt: { en: 'Thai text before and after the fix' }
    }
  },
  {
    kind: 'product',
    slug: 'sage',
    title: 'Sage',
    category: { en: 'AI agent ruleset' },
    version: 'v1.9',
    tagline: {
      en: 'Make your AI code like your most senior dev — four questions before every change.'
    },
    summary: {
      en: 'A plain-Markdown protocol coding agents read before they act: is it needed, will it last, is it safe, did we already agree? One-command install, works across agents.'
    },
    facts: [
      { value: '4', label: { en: 'questions before every change' } },
      { value: '6+', label: { en: 'agents supported' } },
      { value: '1', label: { en: 'install command' } },
      { value: '0', label: { en: 'runtimes to run' } }
    ],
    why: {
      en: 'AI writes code fast but skips the team’s context, reinvents what exists and claims “done” without evidence. Sage makes the agent think like a senior before it types.'
    },
    features: [
      {
        title: { en: 'Reads the team’s context first' },
        body: {
          en: 'The agent reads existing decisions and patterns before proposing anything new.'
        }
      },
      {
        title: { en: 'Names the risk before acting' },
        body: {
          en: 'Work touching money, permissions, data or public APIs stops for a decision first.'
        }
      },
      {
        title: { en: '“Done” needs evidence' },
        body: {
          en: 'It has to run real builds, tests or checks and report the risk that’s left.'
        }
      }
    ],
    how: {
      title: { en: 'One Markdown file. No runtime.' },
      steps: [
        { en: 'Install with one command and pick your agents' },
        { en: 'The agent reads AGENTS.md before every task' },
        {
          en: 'It asks the four questions and picks the smallest path'
        },
        { en: 'It validates for real and records what it learned' }
      ]
    },
    role: { en: 'Solo' },
    stage: {
      tone: '#f472b6',
      chips: ['AGENTS.md', 'Claude · Codex · Cursor', 'v1.9'],
      main: {
        kind: 'image',
        src: '/work/sage/site.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Sage website' },
        frame: 'browser'
      }
    },
    stack: ['Markdown', 'Bash', 'PowerShell', 'jsDelivr'],
    links: [{ label: { en: 'Website' }, href: 'https://sage.qorstack.com' }],
    cover: {
      kind: 'image',
      src: '/work/sage/site.webp',
      width: 1440,
      height: 900,
      alt: { en: 'Sage website' },
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
      en: 'Eastern Economic Corridor (EEC) Office · via Chanwanich'
    },
    tagline: {
      en: 'Foreign workers prove who they are with their phone — no office visit.'
    },
    tech: 'NFC passport chip · face match · OIDC · Flutter',
    summary: {
      en: 'A digital identity and work-permit platform for foreign workers in Thailand’s Eastern Economic Corridor — where a phone reads the passport chip and matches the face holding it.'
    },
    role: {
      en: 'Full-stack · wrote nearly all of the Flutter app and mobile service'
    },
    confidential: true,
    problem: {
      en: 'Workers had to prove identity in person, and other government systems couldn’t trust a photo of a passport.'
    },
    did: {
      en: 'Built the Flutter app and its service: chip reading, OCR, face match, and sign-in for partner apps.'
    },
    challenges: [
      {
        title: { en: 'Reading the ePassport chip over NFC' },
        body: {
          en: 'The MRZ, scanned with on-device OCR (ML Kit), gives the access key; the app then reads the chip with dmrtd and checks the data instead of trusting an image.'
        }
      },
      {
        title: { en: 'Matching the face to the chip' },
        body: {
          en: 'On-device face detection, then a dedicated face-match service compares the live capture with the chip photo.'
        }
      },
      {
        title: { en: 'Becoming an identity provider' },
        body: {
          en: 'A custom OIDC provider on ZITADEL, with app-to-app sign-in (PKCE) so partner apps can log users in with their EEC ID.'
        }
      },
      {
        title: { en: 'Cards generated, not drawn' },
        body: {
          en: 'eID and work-permit cards are rendered from SVG templates on the server — identical in the app, the portal and print.'
        }
      }
    ],
    decisions: [
      {
        title: { en: 'Verify the chip, not the picture' },
        body: {
          en: 'More steps for the user (scan the MRZ, then tap the passport) — but the data is signed by the issuing country.'
        }
      },
      {
        title: { en: 'Build on ZITADEL instead of writing auth' },
        body: {
          en: 'Standard OIDC for partners; custom screens and claims only where the government flow differs.'
        }
      }
    ],
    owned: [
      {
        en: 'The Flutter app, end to end (Riverpod, Freezed, Dio)'
      },
      { en: 'The .NET mobile service' },
      { en: 'Features in the officer web portal' }
    ],
    gallery: [],
    stack: ['Flutter', '.NET 8', 'Next.js', 'ZITADEL', 'SignalR', 'PostgreSQL', 'FastAPI'],
    links: [],
    architecture: { kind: 'diagram', id: 'eec-id', alt: { en: 'EEC ID architecture' } },
    cover: {
      kind: 'art',
      id: 'eec-id',
      alt: {
        en: 'Illustration: a phone reading a passport chip and scanning a face'
      }
    }
  },
  {
    kind: 'case',
    slug: 'eec-e-customs',
    title: 'EEC e-Customs',
    client: { en: 'Eastern Economic Corridor Office · via Chanwanich' },
    tagline: {
      en: 'Companies apply for customs privileges online; officers approve in one place.'
    },
    tech: '.NET 10 microservices · RabbitMQ · Kubernetes',
    summary: {
      en: 'The customs-privilege e-service for Thailand’s Eastern Economic Corridor: companies submit machinery and raw-material imports, BOQs, fast-track releases and e-payments; officers review and approve.'
    },
    role: {
      en: 'Senior engineer · bootstrapped 5 Phase 2 services · main author of the payment service · MR reviewer for a ~10-person team'
    },
    confidential: true,
    problem: {
      en: 'Phase 2 re-architected Phase 1 into microservices, and had to talk to outside systems — DGA digital signatures and the asynchronous NSW customs gateway.'
    },
    did: {
      en: 'Bootstrapped five Phase 2 services from the first commit, wrote most of the payment service, review and approve the team’s MRs, and built across the web app and core service.'
    },
    challenges: [
      {
        title: { en: 'Slow outside systems' },
        body: {
          en: 'One external service is the only door out: DGA is called synchronously; NSW goes through RabbitMQ with polling for the answer.'
        }
      },
      {
        title: { en: 'Work on a schedule' },
        body: {
          en: 'A schedule service runs Hangfire jobs as internal commands or HTTP callbacks.'
        }
      },
      {
        title: { en: 'Certificates you can trust' },
        body: {
          en: 'Certificate PDFs are rendered by Qorstack Report through Gotenberg.'
        }
      }
    ],
    decisions: [
      {
        title: { en: 'CQRS inside Clean Architecture' },
        body: {
          en: 'Commands and queries split with MediatR, validated with FluentValidation — the same shape in every service, so people move between them easily.'
        }
      },
      {
        title: { en: 'GitOps for ~14 workloads' },
        body: {
          en: 'Kustomize and Fleet make every deploy reviewable in git.'
        }
      }
    ],
    owned: [
      { en: 'Five Phase 2 services bootstrapped (payment, scheduling, workers, reports, integrations)' },
      { en: 'Most of the payment service: idempotency, callback checks, expiry, audit trail' },
      { en: 'Advisory-lock standard for document numbers, adopted by five teammates' },
      { en: 'Sage AI-agent rules and decision records across the repos' },
      { en: 'MR review and approval for the team; the 275-case Playwright UAT suite' },
      { en: 'Features across the Next.js 16 web app and .NET 10 core service' }
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
      alt: { en: 'EEC e-Customs architecture' }
    },
    cover: {
      kind: 'art',
      id: 'eec-customs',
      alt: {
        en: 'Illustration: applications flowing from submitted to approved'
      }
    }
  },
  {
    kind: 'case',
    slug: 'suvarnabhumi-airport-gate',
    title: 'Suvarnabhumi Airport Gate',
    client: { en: 'via Chanwanich' },
    // TODO(satang): add what the gate system does, who uses it, and the report speed-up numbers.
    tagline: {
      en: 'Export reporting for the Suvarnabhumi Airport Gate website — structured with FastReport, then made faster.'
    },
    tech: 'Next.js · C# .NET · FastReport',
    summary: {
      en: 'Developed the Suvarnabhumi Airport Gate website with Next.js and C# .NET, helped structure its export reporting with FastReport, and made those exports faster.'
    },
    role: { en: 'Full-stack developer' },
    confidential: true,
    problem: {
      en: 'Export reports had to be fast and correct on large data.'
    },
    did: {
      en: 'Built web and API features, structured the reporting work, and tuned export performance.'
    },
    challenges: [
      {
        title: { en: 'Structuring the reports' },
        body: {
          en: 'Set up a FastReport pattern the whole team could follow.'
        }
      },
      {
        title: { en: 'Faster exports' },
        body: {
          en: 'Optimised report exports over large data sets.'
        }
      }
    ],
    decisions: [],
    owned: [{ en: 'Next.js web features' }, { en: 'C# .NET API' }, { en: 'Report structure and performance' }],
    gallery: [],
    stack: ['Next.js', 'C#', '.NET', 'FastReport'],
    links: [],
    architecture: { kind: 'diagram', id: 'airport-gate', alt: { en: 'Reporting flow' } },
    cover: {
      kind: 'art',
      id: 'airport-gate',
      alt: {
        en: 'Illustration: a departures board and exported reports'
      }
    }
  },
  {
    kind: 'case',
    slug: 'lampang-health-network',
    title: 'Lampang Health Network',
    client: { en: 'via Chanwanich · internship' },
    // TODO(satang): add what the hospital systems do and any numbers you can share.
    tagline: {
      en: 'Kept 200+ sub-district hospital websites running and reporting.'
    },
    tech: 'React · .NET · background reports · Cognito ↔ FusionAuth',
    summary: {
      en: 'Maintained and extended the web systems of 200+ sub-district hospitals in Lampang province, with the team, in React and .NET.'
    },
    role: { en: 'Full-stack intern' },
    period: { en: 'Dec 2022 — Mar 2024' },
    confidential: true,
    problem: {
      en: 'Big reports timed out mid-request, and the system needed to switch identity providers.'
    },
    did: {
      en: 'Moved report generation to a background process, and made the system switchable between Cognito and FusionAuth.'
    },
    challenges: [
      {
        title: { en: 'Reports that don’t time out' },
        body: {
          en: 'Reports no longer render inside the request — they run in the background and the user picks the file up when ready.'
        }
      },
      {
        title: { en: 'Swappable sign-in' },
        body: {
          en: 'The provider sits behind one interface, so the system can use Cognito or FusionAuth.'
        }
      }
    ],
    decisions: [],
    owned: [
      { en: 'New features and assigned bug fixes' },
      { en: 'Background report processing' },
      { en: 'The identity-provider switch' }
    ],
    gallery: [],
    stack: ['React', '.NET', 'Cognito', 'FusionAuth'],
    links: [],
    architecture: {
      kind: 'diagram',
      id: 'lampang-health',
      alt: { en: 'Background report flow' }
    },
    cover: {
      kind: 'art',
      id: 'lampang-health',
      alt: {
        en: 'Illustration: 200+ hospital sites feeding a background report'
      }
    }
  },
  {
    kind: 'case',
    slug: 'cmu-journal',
    title: 'CMU Journal',
    client: { en: 'Chiang Mai University · freelance' },
    tagline: {
      en: 'A university journal moved off a legacy site — 1,014 articles, nothing lost.'
    },
    tech: 'NestJS · Next.js 16 · SHA-256 verified migration',
    summary: {
      en: 'A rebuild of Chiang Mai University’s academic journal, replacing a legacy CodeIgniter site, with a public reader and a full editorial back office.'
    },
    role: {
      en: 'Solo — backend, frontend and the data migration'
    },
    confidential: false,
    problem: {
      en: 'Years of articles lived in the old CodeIgniter site’s MySQL, and editors needed a system that handled review properly.'
    },
    did: {
      en: 'Designed the new API and site, wrote a migration that checks every file, and built the editorial back office.'
    },
    result: {
      en: 'All 1,014 articles, 25 volumes and 76 issues migrated, with 25 post-import integrity checks passing.'
    },
    challenges: [
      {
        title: { en: 'A migration that loses nothing' },
        body: {
          en: 'Every asset is verified against its source by SHA-256, not just counted.'
        }
      },
      {
        title: { en: 'Safe concurrent editing' },
        body: {
          en: 'Publishing checks revisions under transaction locks, so a late editor can’t silently overwrite someone else.'
        }
      },
      {
        title: { en: 'Sign-in security' },
        body: {
          en: 'CMU SSO, compact JWE tokens and rotating refresh tokens — a replayed token revokes its whole family.'
        }
      },
      {
        title: { en: 'Math in the editor' },
        body: {
          en: 'A TipTap editor with KaTeX and MathLive for scientific articles.'
        }
      }
    ],
    decisions: [
      {
        title: { en: 'Redesign the back office from evidence' },
        body: {
          en: 'Ran a before/after design review on desktop and mobile before picking a direction.'
        }
      }
    ],
    owned: [
      { en: 'NestJS API, Prisma and PostgreSQL' },
      { en: 'The Next.js 16 site and back office' },
      { en: 'The migration and its verification' },
      { en: 'Playwright tests' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/cmu-journal/site.webp',
        width: 1440,
        height: 900,
        alt: { en: 'The journal’s home page' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/dashboard-before.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Back-office dashboard, before' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/dashboard-after.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Back-office dashboard, after' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-journal/admin.webp',
        width: 1440,
        height: 1000,
        alt: { en: 'Article management' },
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
      alt: { en: 'The journal’s home page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'cmu-research-gallery',
    title: 'CMU Research Gallery',
    client: {
      en: 'CMU Office of Research Administration · freelance'
    },
    tagline: {
      en: 'Chiang Mai University’s researcher directory — always in sync, and researchers choose what is public.'
    },
    tech: 'Sync from CMU Central · PDPA onboarding · RBAC · audit trail',
    summary: {
      en: 'A public directory of Chiang Mai University researchers, with a private workspace where researchers manage their own profile and an admin portal for the office.'
    },
    role: {
      en: 'Full-stack · backend, public site and researcher workspace'
    },
    confidential: false,
    problem: {
      en: 'Researcher data had to match the university’s central system, and nothing could go public without the researcher’s consent under PDPA.'
    },
    did: {
      en: 'Synced from CMU Central weekly or on demand, built a two-step onboarding that asks for consent first, and an admin that logs every change.'
    },
    challenges: [
      {
        title: { en: 'Sync from CMU Central' },
        body: {
          en: 'A weekly job on @nestjs/schedule that can also run on demand; every change is logged before and after.'
        }
      },
      {
        title: { en: 'Consent before publishing' },
        body: {
          en: 'Two-step onboarding: the privacy notice first, then the profile — with a live preview of the directory card before anything goes public.'
        }
      },
      {
        title: { en: 'Safe uploads' },
        body: {
          en: 'Files are checked by magic bytes, not extension, before they reach MinIO, and the API is rate-limited.'
        }
      },
      {
        title: { en: 'Contract-first API' },
        body: {
          en: 'The front-end client is generated from the backend’s Swagger with swagger-typescript-api.'
        }
      }
    ],
    decisions: [
      {
        title: { en: 'Dynamic roles' },
        body: {
          en: 'RBAC configured from the admin, so each team sees only what it manages.'
        }
      },
      {
        title: { en: 'One backend, shared with the ORA site' },
        body: {
          en: 'The directory and the ORA site share one API, one RBAC model and one audit log.'
        }
      }
    ],
    owned: [
      { en: 'NestJS API, Prisma and the sync jobs' },
      { en: 'The public directory' },
      { en: 'The researcher workspace and onboarding' },
      { en: 'The admin portal' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/login.webp',
        width: 1600,
        height: 900,
        alt: { en: 'Researcher workspace sign-in' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/onboarding.webp',
        width: 1424,
        height: 890,
        alt: { en: 'Onboarding step 2: the researcher profile' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/privacy.webp',
        width: 1600,
        height: 799,
        alt: { en: 'Researcher privacy settings' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/cmu-research-gallery/admin.webp',
        width: 1600,
        height: 755,
        alt: { en: 'Admin researcher management' },
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
      alt: { en: 'CMU Research Gallery landing page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'ora-cmu',
    title: 'ORA CMU',
    client: {
      en: 'CMU Office of Research Administration · freelance'
    },
    tagline: {
      en: 'Find a funding deadline in ten seconds.'
    },
    tech: 'Next.js 16 · GSAP · CMS · shared NestJS backend',
    summary: {
      en: 'The new site for Chiang Mai University’s Office of Research Administration: funding calls, an events calendar, news and documents, with a CMS the office runs itself.'
    },
    role: {
      en: 'Full-stack · site, CMS and content migration'
    },
    confidential: false,
    problem: {
      en: 'Researchers needed to spot closing funding calls fast, and the office needed to update the site without a developer.'
    },
    did: {
      en: 'Built the home page around funding deadlines, added a calendar and a document library, and a CMS covering every part of the site.'
    },
    challenges: [
      {
        title: { en: 'Deadlines first' },
        body: {
          en: 'The home page leads with calls about to close and a 90-day timeline.'
        }
      },
      {
        title: { en: 'A CMS for the whole site' },
        body: {
          en: 'Hero slides, consortiums, funding calls, documents and user roles are all managed from the admin.'
        }
      },
      {
        title: { en: 'Content from the old site' },
        body: {
          en: 'Migration tooling brought news and documents across from the old site.'
        }
      }
    ],
    decisions: [
      {
        title: { en: 'Share the Research Gallery backend' },
        body: {
          en: 'No second API: both sites share researcher data, roles and the audit log.'
        }
      }
    ],
    owned: [
      { en: 'The Next.js 16 site' },
      { en: 'The CMS and user roles' },
      { en: 'Content migration from the old site' }
    ],
    gallery: [
      {
        kind: 'image',
        src: '/work/ora-cmu/closing.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Funding calls closing soon and the 90-day timeline' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/funding.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Funding search' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/calendar.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Research events calendar' },
        frame: browser
      },
      {
        kind: 'image',
        src: '/work/ora-cmu/resources.webp',
        width: 1440,
        height: 900,
        alt: { en: 'Document library' },
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
      alt: { en: 'ORA home page' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'junior-bootcamp',
    title: 'Junior Bootcamp CMU',
    client: { en: 'CMU Research Administration · freelance' },
    tagline: {
      en: 'A training portal that knew its limits before exam day: QR check-in, timed exams and a live monitor.'
    },
    tech: 'Next.js full-stack · Prisma · SSE · k6 load tests',
    summary: {
      en: 'Chiang Mai University’s training portal for junior researchers: cohorts, modules, QR check-in, timed exams, certificates and live monitors for admins and teachers.'
    },
    role: { en: 'Solo' },
    confidential: false,
    problem: {
      en: 'Hundreds of people sit the exam at once; the system can’t fall over mid-exam, and check-in has to be quick.'
    },
    did: {
      en: 'Built the whole system, then load-tested production with k6 until it broke, and tuned it before the real day.'
    },
    result: {
      en: '600 concurrent exam-takers with 0% errors — and a known breaking point at 800, before the real day.'
    },
    challenges: [
      {
        title: { en: 'QR check-in' },
        body: {
          en: 'A large projector-ready QR that expires and matches on every device.'
        }
      },
      {
        title: { en: 'Timed exams' },
        body: {
          en: 'Scheduled open and close, auto-submit, and pre-test before post-test.'
        }
      },
      {
        title: { en: 'Live monitoring' },
        body: {
          en: 'SSE streams progress live to admins and teachers.'
        }
      }
    ],
    decisions: [],
    owned: [
      { en: 'The whole system: Next.js, API, database' },
      { en: 'Email OTP and sign-in security' },
      { en: 'Load tests and E2E tests' }
    ],
    stack: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'SSE', 'Resend', 'react-pdf', 'k6', 'Playwright'],
    links: [{ label: { en: 'Website' }, href: 'https://juniorbootcamp.red-cmu.com' }],
    cover: {
      kind: 'image',
      src: '/work/junior-bootcamp/dashboard.webp',
      width: 1440,
      height: 900,
      alt: { en: 'Participant dashboard' },
      frame: browser
    }
  },
  {
    kind: 'case',
    slug: 'readitgo',
    title: 'ReadItGo',
    client: { en: 'Engenius · freelance' },
    tagline: {
      en: 'An e-book app for students that reads aloud, highlights each word, and keeps working offline.'
    },
    tech: 'Next.js PWA · ElevenLabs · IndexedDB',
    summary: {
      en: 'An e-book and video library for students, on the web or installed as an app, with read-aloud that highlights word by word.'
    },
    role: {
      en: 'Wrote nearly all of the front end, plus the read-aloud API work'
    },
    confidential: false,
    problem: {
      en: 'Students needed to hear and see the current word together, and read without a connection.'
    },
    did: {
      en: 'Built word-synced read-aloud, offline reading, and AI-made quizzes.'
    },
    challenges: [
      {
        title: { en: 'Word-by-word read-aloud' },
        body: {
          en: 'ElevenLabs audio cached on the server with word timings.'
        }
      },
      {
        title: { en: 'Offline reading' },
        body: {
          en: 'A PWA that stores e-books and audio on the device.'
        }
      }
    ],
    decisions: [],
    owned: [{ en: 'The app’s front end' }, { en: 'Read-aloud and the offline PWA' }],
    stack: ['Next.js', 'next-pwa', 'IndexedDB', 'ElevenLabs', 'react-reader', 'Express', 'Prisma'],
    links: [{ label: { en: 'Website' }, href: 'https://library.engeniusapp.com' }],
    cover: {
      kind: 'image',
      src: '/work/readitgo/cover.webp',
      width: 1600,
      height: 1000,
      alt: { en: 'ReadItGo on mobile' },
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
