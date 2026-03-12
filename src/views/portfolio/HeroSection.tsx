'use client'

import dynamic from 'next/dynamic'
import StatBar from '@/components/ui/StatBar'
import TypewriterText from '@/components/ui/TypewriterText'

const HeroScene = dynamic(() => import('@/components/portfolio/HeroScene'), { ssr: false })

export default function HeroSection() {
  return (
    <section
      id='hero'
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--px-bg-base)'
      }}
    >
      {/* Canvas background */}
      <HeroScene
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, var(--px-bg-base) 100%)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: '80px 24px 48px',
          width: '100%',
          maxWidth: '560px'
        }}
      >
        {/* Character card */}
        <div
          style={{
            background: 'var(--px-bg-surface)',
            border: '3px solid var(--px-border)',
            boxShadow: 'var(--px-shadow-lg)',
            padding: '24px',
            width: '100%',
            willChange: 'transform'
          }}
        >
          {/* Card header */}
          <div
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: '8px',
              color: 'var(--px-text-muted)',
              borderBottom: '2px solid var(--px-border-subtle)',
              paddingBottom: '8px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>[ HERO SELECT ]</span>
            <span style={{ color: 'var(--px-gold)' }}>LV.07</span>
          </div>

          {/* Name + class */}
          <h1
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: 'clamp(14px, 4vw, 22px)',
              color: 'var(--px-gold)',
              textShadow: '3px 3px 0 var(--px-orange)',
              margin: '0 0 6px',
              lineHeight: 1.4
            }}
          >
            SATANG
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: '9px',
              color: 'var(--px-cyan)',
              marginBottom: '20px',
              lineHeight: 1.6
            }}
          >
            <TypewriterText text='FULL STACK DEVELOPER' speed={80} startDelay={400} />
          </p>

          {/* Stat bars */}
          <div style={{ marginBottom: '4px' }}>
            <StatBar label='HP' value={850} max={1000} color='green' />
            <StatBar label='MP' value={640} max={800} color='cyan' />
            <StatBar label='XP' value={72} max={100} color='gold' showValue={false} />
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href='#projects'
            onClick={e => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: '10px',
              color: 'var(--px-bg-base)',
              background: 'var(--px-gold)',
              border: '3px solid var(--px-gold)',
              boxShadow: '4px 4px 0 var(--px-orange)',
              padding: '12px 24px',
              textDecoration: 'none',
              display: 'inline-block',
              willChange: 'transform',
              cursor: 'inherit'
            }}
            className='px-btn-primary'
          >
            ▶ START GAME
          </a>
          <a
            href='#about'
            onClick={e => {
              e.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: '10px',
              color: 'var(--px-gold)',
              background: 'transparent',
              border: '3px solid var(--px-gold)',
              boxShadow: '4px 4px 0 var(--px-orange)',
              padding: '12px 24px',
              textDecoration: 'none',
              display: 'inline-block',
              willChange: 'transform',
              cursor: 'inherit'
            }}
            className='px-btn-secondary'
          >
            ℹ CHARACTER INFO
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            fontFamily: 'var(--font-press-start)',
            fontSize: '8px',
            color: 'var(--px-text-muted)',
            animation: 'px-bounce 1.2s steps(4) infinite'
          }}
        >
          ▼ SCROLL
        </div>
      </div>
    </section>
  )
}
