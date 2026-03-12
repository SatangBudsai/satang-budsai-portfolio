'use client'

import { useInView } from '@/hooks/useInView'
import PixelDivider from '@/components/ui/PixelDivider'

interface Skill {
  name: string
  level: number // 0-5
  icon: string
}

interface SkillCategory {
  label: string
  color: string
  skills: Skill[]
}

const CATEGORIES: SkillCategory[] = [
  {
    label: 'FRONTEND',
    color: 'var(--px-cyan)',
    skills: [
      { name: 'React', level: 5, icon: '⚛' },
      { name: 'TypeScript', level: 5, icon: 'TS' },
      { name: 'Next.js', level: 4, icon: '▲' },
      { name: 'Tailwind', level: 5, icon: '🌊' },
      { name: 'Framer', level: 3, icon: '◈' },
      { name: 'CSS', level: 5, icon: '#' }
    ]
  },
  {
    label: 'BACKEND',
    color: 'var(--px-green)',
    skills: [
      { name: 'Node.js', level: 4, icon: '⬡' },
      { name: 'Python', level: 3, icon: '🐍' },
      { name: 'PostgreSQL', level: 4, icon: '🐘' },
      { name: 'REST API', level: 5, icon: '↔' },
      { name: 'GraphQL', level: 3, icon: '◉' },
      { name: 'Redis', level: 3, icon: '⬢' }
    ]
  },
  {
    label: 'DEVOPS & TOOLS',
    color: 'var(--px-gold)',
    skills: [
      { name: 'Git', level: 5, icon: '⑂' },
      { name: 'Docker', level: 4, icon: '🐳' },
      { name: 'CI/CD', level: 3, icon: '⚙' },
      { name: 'Vercel', level: 4, icon: '▲' },
      { name: 'Figma', level: 3, icon: '◈' },
      { name: 'Linux', level: 3, icon: '🐧' }
    ]
  }
]

function SkillSlot({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)

  return (
    <div
      ref={ref}
      style={{
        border: '2px solid var(--px-border-subtle)',
        background: 'var(--px-bg-surface)',
        padding: '12px 8px',
        textAlign: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.3s steps(3) ${delay}ms, transform 0.3s steps(3) ${delay}ms`,
        willChange: 'transform',
        position: 'relative'
      }}
      className='px-skill-slot'
    >
      {/* Slot frame corners */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: 4, background: color }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 4, height: 4, background: color }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 4, height: 4, background: color }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 4, height: 4, background: color }} />

      {/* Icon */}
      <div
        style={{
          fontSize: '20px',
          marginBottom: '8px',
          lineHeight: 1,
          minHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span
          style={{
            fontFamily: skill.icon.length <= 2 ? 'var(--font-press-start)' : 'inherit',
            fontSize: skill.icon.length <= 2 ? '11px' : '20px',
            color
          }}
        >
          {skill.icon}
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: 'var(--font-press-start)',
          fontSize: '7px',
          color: 'var(--px-text-secondary)',
          marginBottom: '8px',
          lineHeight: 1.4
        }}
      >
        {skill.name}
      </div>

      {/* Level pips */}
      <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              background: i < skill.level ? color : 'var(--px-border-subtle)',
              imageRendering: 'pixelated'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const { ref: titleRef, inView: titleInView } = useInView<HTMLHeadingElement>(0.3)

  return (
    <>
      <section
        id='skills'
        style={{
          background: 'var(--px-bg-base)',
          padding: '80px 24px'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
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
            {'[ SKILL TREE ]'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.label}>
                {/* Category label */}
                <div
                  style={{
                    fontFamily: 'var(--font-press-start)',
                    fontSize: '8px',
                    color: cat.color,
                    borderLeft: `4px solid ${cat.color}`,
                    paddingLeft: '12px',
                    marginBottom: '16px'
                  }}
                >
                  {cat.label}
                </div>

                {/* Skill grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '8px'
                  }}
                >
                  {cat.skills.map((skill, i) => (
                    <SkillSlot key={skill.name} skill={skill} color={cat.color} delay={i * 60} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PixelDivider color='var(--px-bg-panel)' />
    </>
  )
}
