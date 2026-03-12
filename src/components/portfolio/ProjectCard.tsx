'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Project, ProjectStatus } from '@/types/project'

type Props = {
  project: Project
  large?: boolean
}

const STATUS_COLORS: Record<ProjectStatus, string> = {
  COMPLETED: 'var(--px-green)',
  'IN-PROGRESS': 'var(--px-gold)',
  ARCHIVED: 'var(--px-text-muted)'
}

function DifficultyStars({ value }: { value: number }) {
  return (
    <span style={{ color: 'var(--px-gold)', fontFamily: 'var(--font-press-start)', fontSize: '8px' }}>
      {Array.from({ length: 5 }, (_, i) => (i < value ? '★' : '☆')).join('')}
    </span>
  )
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const color = STATUS_COLORS[status]
  return (
    <span
      style={{
        fontFamily: 'var(--font-press-start)',
        fontSize: '7px',
        color,
        border: `2px solid ${color}`,
        padding: '2px 6px',
        animation: status === 'IN-PROGRESS' ? 'px-blink 1.2s steps(1) infinite' : 'none'
      }}
    >
      {status}
    </span>
  )
}

const TAG_COLORS = [
  'var(--px-cyan)',
  'var(--px-pink)',
  'var(--px-green)',
  'var(--px-gold)',
  'var(--px-purple)'
]

export default function ProjectCard({ project, large = false }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{ textDecoration: 'none' }}
      className='px-card-link'
    >
      <article
        className='px-card'
        style={{
          background: 'var(--px-bg-panel)',
          border: '3px solid var(--px-border)',
          boxShadow: 'var(--px-shadow)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'inherit',
          willChange: 'transform',
          transition: 'transform steps(1), box-shadow steps(1), border-color steps(1)'
        }}
      >
        {/* Cover image with pixel frame */}
        <div
          style={{
            position: 'relative',
            aspectRatio: large ? '16/7' : '16/9',
            overflow: 'hidden',
            borderBottom: '3px solid var(--px-border)',
            background: 'var(--px-bg-overlay)'
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            style={{
              objectFit: 'cover',
              imageRendering: 'pixelated',
              filter: 'grayscale(1)',
              transition: 'filter steps(1)'
            }}
            className='px-card-img'
          />
          {/* Pixel scan-line overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Card body */}
        <div style={{ padding: large ? '20px' : '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Top row: status + difficulty */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <StatusBadge status={project.status} />
            <DifficultyStars value={project.difficulty} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: large ? '11px' : '9px',
              color: 'var(--px-text-heading)',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: large ? '13px' : '12px',
              color: 'var(--px-text-secondary)',
              lineHeight: 1.6,
              margin: 0,
              flex: 1
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className='px-tag'
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '7px',
                  color: TAG_COLORS[i % TAG_COLORS.length],
                  border: `2px solid ${TAG_COLORS[i % TAG_COLORS.length]}`,
                  padding: '2px 6px',
                  transition: 'none'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => e.stopPropagation()}
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '8px',
                  color: 'var(--px-bg-base)',
                  background: 'var(--px-cyan)',
                  border: '2px solid var(--px-cyan)',
                  padding: '5px 10px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                ▶ DEMO
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => e.stopPropagation()}
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '8px',
                  color: 'var(--px-gold)',
                  background: 'transparent',
                  border: '2px solid var(--px-gold)',
                  padding: '5px 10px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                {'</> CODE'}
              </a>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
