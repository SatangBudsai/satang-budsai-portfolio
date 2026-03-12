'use client'

import { useInView } from '@/hooks/useInView'
import ProjectCard from '@/components/portfolio/ProjectCard'
import PixelDivider from '@/components/ui/PixelDivider'
import type { Project } from '@/types/project'

type Props = {
  projects: Project[]
}

export default function ProjectsSection({ projects }: Props) {
  const { ref: titleRef, inView: titleInView } = useInView<HTMLHeadingElement>(0.3)

  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <>
      <section
        id='projects'
        style={{
          background: 'var(--px-bg-panel)',
          padding: '80px 24px'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: 'clamp(12px, 3vw, 18px)',
              color: 'var(--px-gold)',
              textShadow: '3px 3px 0 var(--px-orange)',
              marginBottom: '48px',
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.4s steps(4), transform 0.4s steps(4)'
            }}
          >
            {'[ QUEST LOG ]'}
          </h2>

          {/* Featured projects — 2-col large */}
          {featured.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}
            >
              {featured.map((p, i) => (
                <CardReveal key={p.slug} delay={i * 100}>
                  <ProjectCard project={p} large />
                </CardReveal>
              ))}
            </div>
          )}

          {/* Divider label */}
          {others.length > 0 && (
            <div
              style={{
                fontFamily: 'var(--font-press-start)',
                fontSize: '8px',
                color: 'var(--px-text-muted)',
                borderBottom: '2px solid var(--px-border-subtle)',
                paddingBottom: '8px',
                marginBottom: '24px'
              }}
            >
              — SIDE QUESTS —
            </div>
          )}

          {/* Other projects — 3-col smaller */}
          {others.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '16px'
              }}
            >
              {others.map((p, i) => (
                <CardReveal key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </CardReveal>
              ))}
            </div>
          )}

          {projects.length === 0 && (
            <div
              style={{
                fontFamily: 'var(--font-press-start)',
                fontSize: '10px',
                color: 'var(--px-text-muted)',
                textAlign: 'center',
                padding: '60px 0'
              }}
            >
              NO QUESTS FOUND
            </div>
          )}
        </div>
      </section>
      <PixelDivider color='var(--px-bg-base)' flip />
    </>
  )
}

function CardReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'rotateY(0deg)' : 'rotateY(90deg)',
        transition: `opacity 0.3s steps(3) ${delay}ms, transform 0.3s steps(3) ${delay}ms`,
        willChange: 'transform',
        height: '100%'
      }}
    >
      {children}
    </div>
  )
}
