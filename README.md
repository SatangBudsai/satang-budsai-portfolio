# Satang Budsai Portfolio

A dark-only, editorial portfolio: big-type home page, product pages for my own tools, case studies for client work, and an AI-coding experiments log. The shared stack and package versions follow CMU Journal; the development port is 3031.

## Content

All portfolio content lives in typed files, in Thai and English side by side:

- src/content/projects.ts: products (/work/[slug] product template) and case studies (case-study template).
- src/content/site.ts: profile, contact links, services, timeline, experiments and lab cards.
- public/work/{slug}/: project media as WebP. Animated WebP files are served as-is.

Confidential client work (confidential: true) uses drawn diagrams from src/components/site/diagram.tsx, never screenshots. Search for TODO(satang) for facts that still need filling in. The resume buttons stay hidden until profile.resumeHref points at a public PDF.

## Stack

- Next.js 16.4.5 App Router, React 19.2.8, TypeScript 5.9.3
- Tailwind CSS 4.3.3 with CSS theme tokens in src/styles/globals.css
- shadcn/ui base-nova components built on Base UI 1.8.0; ReUI registry configured
- Motion 13.2.0, next-themes, Sonner, and offline Iconify icons
- Redux Toolkit, TanStack Query, Axios, React Hook Form, date-fns
- next-intl for request locale and Tolgee for English/Thai translations
- pnpm 10.13.1, ESLint 9, Prettier, Playwright

HeroUI, Vite/Vinext, Tailwind 3, Framer Motion imports, i18next, Day.js, and unused template dependencies have been removed. The existing API, socket, and progress helpers remain available.

## Development

Use Node.js 22 or newer and pnpm 10.13.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3031. Environment variables are optional for the portfolio; see .env.example for API helpers and Tolgee development settings. Keep API credentials server-side.

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm format:check
pnpm ui:check-icons
pnpm build
pnpm test
```

Playwright tests use the production build on port 3131. Run pnpm build before pnpm test. If Chromium is missing, run pnpm exec playwright install chromium.

## Components and icons

Add components with pnpm ui:add <component>. The wrapper converts generated Lucide imports to the shared Iconify component. Add icon IDs to src/config/icons.ts and run pnpm icons:generate. Development regenerates icons; builds check that the generated data is current.

## Translations

Translations live in langs/{namespace}/{en,th}.json with flat keys and ICU placeholders, for example {username}. Register new namespaces in src/tolgee/config.ts. Use useLang() on the client or getTranslate() from src/tolgee/server.tsx on the server, with namespace.key names.

The NEXT_LOCALE cookie selects English or Thai without changing the existing URLs. SwitchLanguage updates it through a server action. Translations work locally without Tolgee credentials. Optional CLI commands: pnpm i18n:extract, pnpm i18n:pull, and pnpm i18n:push. Remote operations require your own Tolgee project credentials in .env.local.

## API generation

Run pnpm generate to preprocess the checked-in Swagger schema, regenerate its Axios client, and apply the existing postprocessor. The scripts use ESM and the current Swagger CLI syntax.
