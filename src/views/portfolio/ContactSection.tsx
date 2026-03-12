'use client'

import { useInView } from '@/hooks/useInView'
import { HERO_WAVE_SPRITE, spriteToSvg } from '@/lib/heroSprites'

const waveSvg = spriteToSvg(HERO_WAVE_SPRITE, 5)
const waveDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(waveSvg)}`

const SOCIAL_LINKS = [
  { label: 'EMAIL', icon: '✉', href: 'mailto:hello@satang.dev', color: 'var(--px-gold)' },
  { label: 'GITHUB', icon: '⑂', href: 'https://github.com/', color: 'var(--px-text-primary)' },
  { label: 'LINKEDIN', icon: 'in', href: 'https://linkedin.com/', color: 'var(--px-cyan)' },
  { label: 'TWITTER', icon: '✕', href: 'https://twitter.com/', color: 'var(--px-pink)' }
]

export default function ContactSection() {
  const { ref, inView } = useInView<HTMLElement>(0.2)

  return (
    <section
      id='contact'
      ref={ref}
      style={{
        background: 'var(--px-bg-base)',
        padding: '80px 24px 120px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
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
          {'[ SEND MESSAGE ]'}
        </h2>

        {/* Pixel character + speech bubble */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.4s steps(4) 0.2s'
          }}
        >
          {/* Waving character */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={waveDataUri}
            alt='Waving pixel character'
            style={{
              imageRendering: 'pixelated',
              flexShrink: 0,
              animation: 'px-wave 1.2s steps(4) infinite'
            }}
          />

          {/* Speech bubble */}
          <div
            style={{
              border: '3px solid var(--px-border)',
              boxShadow: 'var(--px-shadow)',
              background: 'var(--px-bg-panel)',
              padding: '16px 20px',
              position: 'relative',
              textAlign: 'left',
              maxWidth: '320px'
            }}
          >
            {/* Bubble tail */}
            <div
              style={{
                position: 'absolute',
                left: '-12px',
                bottom: '24px',
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '12px solid var(--px-border)'
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-press-start)',
                fontSize: '9px',
                color: 'var(--px-text-primary)',
                lineHeight: 2,
                margin: 0
              }}
            >
              {`Let's build something`}
              <br />
              <span style={{ color: 'var(--px-cyan)' }}>together</span>
              {' ★'}
            </p>
          </div>
        </div>

        {/* Social buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.4s steps(4) 0.35s'
          }}
        >
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel='noopener noreferrer'
              className='px-social-btn'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                border: `3px solid ${link.color}`,
                boxShadow: `4px 4px 0 var(--px-border-subtle)`,
                padding: '16px',
                width: '80px',
                textDecoration: 'none',
                background: 'transparent',
                willChange: 'transform',
                '--social-color': link.color
              } as React.CSSProperties}
            >
              <span
                style={{
                  fontFamily: link.icon.length <= 2 ? 'var(--font-press-start)' : 'inherit',
                  fontSize: link.icon.length <= 2 ? '14px' : '22px',
                  color: link.color
                }}
              >
                {link.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '7px',
                  color: link.color
                }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: 'var(--font-press-start)',
            fontSize: '7px',
            color: 'var(--px-text-muted)',
            marginTop: '60px',
            lineHeight: 2.4
          }}
        >
          MADE WITH ♥ + ☕ · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
