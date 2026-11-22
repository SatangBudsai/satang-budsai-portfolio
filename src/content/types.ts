import type { AppLocale } from '@/i18n/routing'

export type Lang = AppLocale

/** A string written in both site languages. */
export type L = Record<Lang, string>

export function tr(value: L, lang: Lang) {
  return value[lang]
}

export type DiagramId = 'eec-id' | 'eec-customs' | 'airport-gate' | 'lampang-health' | 'pdf-fixer'

export type ImageMedia = {
  kind: 'image'
  src: string
  width: number
  height: number
  alt: L
  /** Animated WebP: served as-is, never resized by the image optimizer. */
  animated?: boolean
  /** Chrome drawn around the media: a browser bar, a phone, a plain border, or nothing at all. */
  frame?: 'browser' | 'phone' | 'none' | 'bare'
}

export type DiagramMedia = {
  kind: 'diagram'
  id: DiagramId
  alt: L
}

export type ArtId = 'eec-id' | 'eec-customs' | 'airport-gate' | 'lampang-health'

/** A drawn cover illustration for work that can't be shown as screenshots. */
export type ArtMedia = {
  kind: 'art'
  id: ArtId
  alt: L
}

export type Media = ImageMedia | DiagramMedia | ArtMedia

/**
 * How a product is staged on the home page and its cards: a glow in the
 * product's own colour, a main visual, an optional floating second visual,
 * and a few short chips.
 */
export type Stage = {
  tone: string
  main: Media
  float?: ImageMedia & { tile?: boolean }
  chips: string[]
}

export type Fact = { value: string; label: L }

export type Block = { title: L; body: L; media?: Media }

export type LinkItem = { label: L; href: string }

/** A real problem from the project's history and how it was solved (from the commit log). */
export type Obstacle = { problem: L; fix: L }

type ProjectBase = {
  slug: string
  title: string
  /** One line, plain language. Shown on cards and in the index. */
  tagline: L
  /** Two or three sentences for the detail hero. */
  summary: L
  stack: string[]
  links: LinkItem[]
  cover: Media
  /** Verifiable outcomes only. */
  results?: L[]
  obstacles?: Obstacle[]
  /** Short line on when it was built, e.g. "Jan → Oct 2026 · ~1,000 commits". */
  timeline?: L
  /** More screens from the real product. */
  gallery?: Media[]
}

export type Product = ProjectBase & {
  kind: 'product'
  category: L
  version: string
  facts: Fact[]
  why: L
  features: Block[]
  how: { title: L; steps: L[]; media?: Media }
  role: L
  stage: Stage
}

export type CaseStudy = ProjectBase & {
  kind: 'case'
  client: L
  /** Short tech line under the plain-language tagline in the index. */
  tech: string
  /** Redrawn system diagram, shown in its own section. */
  architecture?: DiagramMedia
  role: L
  period?: L
  confidential: boolean
  problem: L
  did: L
  result?: L
  challenges: Block[]
  decisions: Block[]
  owned: L[]
}

export type Project = Product | CaseStudy

export type Experiment = {
  slug: string
  title: string
  status: L
  question: L
  setup: L
  learned: L[]
  stack: string[]
  media: ImageMedia[]
  fact?: Fact
  results?: L[]
  obstacles?: Obstacle[]
  timeline?: L
}

export type LabItem = {
  slug: string
  title: string
  tag: L
  body: L
  href?: string
  hrefLabel?: string
  media?: ImageMedia
}
