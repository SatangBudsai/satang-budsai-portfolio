'use client'

import { useInView } from '@/hooks/useInView'
import PixelDivider from '@/components/ui/PixelDivider'
import { HERO_SPRITE, spriteToSvg } from '@/lib/heroSprites'

const heroSvg = spriteToSvg(HERO_SPRITE, 6)
const heroDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(heroSvg)}`

const BIO = `Hello! I'm a full-stack developer who crafts scalable web applications with clean architecture and pixel-perfect UIs. I love turning complex problems into elegant, user-friendly experiences.`

const STATS = [
  { label: 'YRS EXP', value: '3+' },
  { label: 'PROJECTS', value: '20+' },
  { label: 'COMMITS', value: '1K+' },
  { label: 'COFFEE', value: '∞' }
]

export default function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>(0.2)

  return (
    <>
      <PixelDivider color='var(--px-bg-panel)' />
      <section
        id='about'
        ref={ref}
        style={{
          background: 'var(--px-bg-panel)',
          padding: '80px 24px'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Section title */}
          <h2
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: 'clamp(12px, 3vw, 18px)',
              color: 'var(--px-gold)',
              textShadow: '3px 3px 0 var(--px-orange)',
              marginBottom: '48px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.4s steps(4), transform 0.4s steps(4)'
            }}
          >
            {'[ CHARACTER INFO ]'}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '32px',
              alignItems: 'start'
            }}
            className='px-about-grid'
          >
            {/* Portrait */}
            <div
              style={{
                border: '3px solid var(--px-border)',
                boxShadow: 'var(--px-shadow)',
                padding: '16px',
                background: 'var(--px-bg-overlay)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-32px)',
                transition: 'opacity 0.4s steps(4) 0.1s, transform 0.4s steps(4) 0.1s'
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroDataUri}
                alt='Hero sprite'
                width={96}
                height={96}
                style={{ display: 'block', imageRendering: 'pixelated' }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '7px',
                  color: 'var(--px-gold)',
                  marginTop: '8px',
                  textAlign: 'center'
                }}
              >
                LV.07
              </div>
            </div>

            {/* Dialog box + stats */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.4s steps(4) 0.2s, transform 0.4s steps(4) 0.2s'
              }}
            >
              {/* RPG dialog box */}
              <div
                style={{
                  border: '3px solid var(--px-border)',
                  boxShadow: 'var(--px-shadow)',
                  background: 'var(--px-bg-overlay)',
                  padding: '20px',
                  marginBottom: '24px',
                  position: 'relative'
                }}
              >
                {/* Dialog triangle pointer */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '24px',
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '12px solid var(--px-border)'
                  }}
                />
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--px-text-primary)',
                    lineHeight: 2,
                    margin: 0,
                    fontFamily: 'inherit'
                  }}
                >
                  {BIO}
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-press-start)',
                    fontSize: '7px',
                    color: 'var(--px-gold)',
                    marginTop: '12px',
                    animation: 'px-blink 0.8s steps(1) infinite'
                  }}
                >
                  ▼
                </div>
              </div>

              {/* Stat boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {STATS.map(stat => (
                  <div
                    key={stat.label}
                    style={{
                      border: '2px solid var(--px-border-subtle)',
                      background: 'var(--px-bg-surface)',
                      padding: '12px 8px',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-press-start)',
                        fontSize: '16px',
                        color: 'var(--px-cyan)',
                        marginBottom: '6px'
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-press-start)',
                        fontSize: '6px',
                        color: 'var(--px-text-muted)'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <PixelDivider color='var(--px-bg-base)' flip />
    </>
  )
}
