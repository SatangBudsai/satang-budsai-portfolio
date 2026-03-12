import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import type { ProjectStatus } from '@/types/project'

type Props = { params: Promise<{ slug: string }> }

const STATUS_COLOR: Record<ProjectStatus, string> = {
  COMPLETED: 'var(--px-green)',
  'IN-PROGRESS': 'var(--px-gold)',
  ARCHIVED: 'var(--px-text-muted)'
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }
  return { title: `${project.title} — Portfolio`, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--px-bg-base)',
        padding: '100px 24px 80px'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Back button */}
        <Link
          href='/#projects'
          style={{
            fontFamily: 'var(--font-press-start)',
            fontSize: '8px',
            color: 'var(--px-gold)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            border: '2px solid var(--px-border)',
            padding: '8px 14px',
            boxShadow: 'var(--px-shadow)'
          }}
        >
          ◀ BACK
        </Link>

        {/* Cover image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/7',
            border: '3px solid var(--px-border)',
            boxShadow: 'var(--px-shadow-lg)',
            marginBottom: '32px',
            background: 'var(--px-bg-overlay)',
            overflow: 'hidden'
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            style={{ objectFit: 'cover', imageRendering: 'pixelated' }}
            priority
          />
        </div>

        {/* Header */}
        <div
          style={{
            border: '3px solid var(--px-border)',
            boxShadow: 'var(--px-shadow)',
            background: 'var(--px-bg-panel)',
            padding: '24px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-press-start)',
                fontSize: '8px',
                color: STATUS_COLOR[project.status],
                border: `2px solid ${STATUS_COLOR[project.status]}`,
                padding: '4px 8px'
              }}
            >
              {project.status}
            </span>
            <span style={{ fontFamily: 'var(--font-press-start)', fontSize: '10px', color: 'var(--px-gold)' }}>
              {Array.from({ length: 5 }, (_, i) => (i < project.difficulty ? '★' : '☆')).join('')}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: 'clamp(13px, 3vw, 20px)',
              color: 'var(--px-gold)',
              textShadow: '3px 3px 0 var(--px-orange)',
              margin: '0 0 16px',
              lineHeight: 1.5
            }}
          >
            {project.title}
          </h1>

          <p style={{ fontSize: '15px', color: 'var(--px-text-secondary)', lineHeight: 1.8, margin: '0 0 20px' }}>
            {project.longDescription ?? project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.tags.map((tag, i) => {
              const colors = ['var(--px-cyan)', 'var(--px-pink)', 'var(--px-green)', 'var(--px-gold)']
              const c = colors[i % colors.length]
              return (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-press-start)',
                    fontSize: '8px',
                    color: c,
                    border: `2px solid ${c}`,
                    padding: '4px 8px'
                  }}
                >
                  {tag}
                </span>
              )
            })}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '9px',
                  color: 'var(--px-bg-base)',
                  background: 'var(--px-cyan)',
                  border: '3px solid var(--px-cyan)',
                  boxShadow: '4px 4px 0 var(--px-border-subtle)',
                  padding: '10px 20px',
                  textDecoration: 'none'
                }}
              >
                ▶ LIVE DEMO
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '9px',
                  color: 'var(--px-gold)',
                  background: 'transparent',
                  border: '3px solid var(--px-gold)',
                  boxShadow: '4px 4px 0 var(--px-border-subtle)',
                  padding: '10px 20px',
                  textDecoration: 'none'
                }}
              >
                {'</> VIEW CODE'}
              </a>
            )}
          </div>
        </div>

        {/* Markdown content */}
        {project.content && (
          <div
            className='px-prose'
            style={{
              border: '3px solid var(--px-border-subtle)',
              background: 'var(--px-bg-panel)',
              padding: '24px'
            }}
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}
      </div>
    </main>
  )
}
