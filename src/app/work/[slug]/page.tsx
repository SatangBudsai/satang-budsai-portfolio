import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseDetail, ProductDetail } from '@/components/site/project-detail'
import { allProjects, getProject } from '@/content/projects'
import { tr } from '@/content/types'
import { getI18n } from '@/lib/lang'

export function generateStaticParams() {
  return allProjects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata(props: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) return {}
  const { lang } = await getI18n()
  const description = tr(project.tagline, lang)
  const image = project.cover.kind === 'image' && !project.cover.animated ? project.cover.src : undefined
  return {
    title: project.title,
    description,
    openGraph: { title: project.title, description, images: image ? [image] : undefined }
  }
}

export default async function WorkDetail(props: PageProps<'/work/[slug]'>) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) notFound()
  const { lang, t } = await getI18n()

  return project.kind === 'product' ? (
    <ProductDetail project={project} lang={lang} t={t} />
  ) : (
    <CaseDetail project={project} lang={lang} t={t} />
  )
}
