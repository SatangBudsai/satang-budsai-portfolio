'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 1.2, delay }
  })
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLImageElement>(null)
  const particlesRef = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }>
  >([])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Custom cursor (DOM-based for crisp rendering)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      const target = e.target as HTMLElement
      const isPointer = target.closest('a, button, [role="button"], input[type="submit"], .pixel-btn, .cursor-pointer')
      cursor.src = isPointer ? '/images/cursor-pointer.svg' : '/images/cursor.svg'
      cursor.style.transform = isPointer ? 'translate(-5px, -1px)' : 'translate(-1px, -1px)'
    }

    const onLeave = () => {
      cursor.style.opacity = '0'
    }
    const onEnter = () => {
      cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  // Sparkle trail effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#ffd700', '#ffec80', '#fff4b8', '#ffa500', '#ffffff']
    const mousePos = { x: -100, y: -100 }

    const spawnParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          maxLife: 0.6 + Math.random() * 0.4,
          size: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY
      const target = e.target as HTMLElement
      const isPointer = target.closest('a, button, [role="button"], input[type="submit"], .pixel-btn, .cursor-pointer')
      spawnParticles(mousePos.x, mousePos.y, isPointer ? 5 : 3)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Continuously emit sparkles even when mouse is still (more when hovering interactive elements)
    const idleInterval = setInterval(() => {
      if (mousePos.x > 0) {
        const el = document.elementFromPoint(mousePos.x, mousePos.y)
        const isPointer = el?.closest('a, button, [role="button"], input[type="submit"], .pixel-btn, .cursor-pointer')
        spawnParticles(mousePos.x, mousePos.y, isPointer ? 4 : 1)
      }
    }, 60)

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        const alpha = p.life / p.maxLife
        ctx.globalAlpha = Math.min(alpha, 1)
        ctx.fillStyle = p.color
        // Draw a pixel-style sparkle (small square)
        const s = p.size * alpha
        ctx.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), Math.round(s), Math.round(s))
      }
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(idleInterval)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const { scrollY } = useScroll()

  // Cloud parallax + fade out as user scrolls
  const yCloudLeft = useTransform(scrollY, [0, 800], [0, 500])
  const xCloudLeft = useTransform(scrollY, [0, 800], [0, -100])
  const yCloudRight = useTransform(scrollY, [0, 800], [0, 600])
  const xCloudRight = useTransform(scrollY, [0, 800], [0, 100])
  const cloudOpacity = useTransform(scrollY, [0, 300, 600], [0.9, 0.4, 0])

  return (
    <div
      className={`${isDark ? 'theme-dark' : 'theme-light'} relative w-full overflow-x-hidden bg-[var(--bg-outer)] font-["Press_Start_2P"] text-[#2a2a3a]`}>
      {/* Custom Cursor */}
      <img
        ref={cursorRef}
        src='/images/cursor.svg'
        alt=''
        className='pointer-events-none fixed z-[10000]'
        style={{ imageRendering: 'pixelated', width: 32, height: 28, transform: 'translate(-1px, -1px)' }}
        draggable={false}
      />

      {/* Sparkle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className='pointer-events-none fixed inset-0 z-[9999]'
        style={{ width: '100%', height: '100%' }}
      />

      {/* Theme Toggle Switch */}
      <div
        onClick={() => setIsDark(d => !d)}
        className='fixed right-4 top-4 z-[9998] flex border-3 border-[#222635] shadow-[3px_3px_0_rgba(0,0,0,0.4)]'
        style={{ imageRendering: 'pixelated' }}
        role='button'
        aria-label='Toggle theme'>
        {/* Track background with both icons */}
        <div className='relative flex h-[32px] w-[75px] items-center justify-between bg-[#181a28] px-2'>
          {/* Sun icon (left, always visible) */}
          <svg
            width='14'
            height='14'
            viewBox='0 0 8 8'
            className='relative z-10'
            style={{ shapeRendering: 'crispEdges' }}>
            <rect x='3' y='0' width='2' height='1' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='3' y='7' width='2' height='1' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='0' y='3' width='1' height='2' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='7' y='3' width='1' height='2' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='1' y='1' width='1' height='1' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='6' y='1' width='1' height='1' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='1' y='6' width='1' height='1' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='6' y='6' width='1' height='1' fill={!isDark ? '#f5a524' : '#555'} />
            <rect x='2' y='2' width='4' height='4' fill={!isDark ? '#ffec80' : '#666'} />
          </svg>
          {/* Moon icon (right, always visible) — crescent facing right */}
          <svg
            width='14'
            height='14'
            viewBox='0 0 10 10'
            className='relative z-10'
            style={{ shapeRendering: 'crispEdges' }}>
            {/* Outer crescent shape */}
            <rect x='3' y='0' width='3' height='1' fill={isDark ? '#e8e0ff' : '#555'} />
            <rect x='5' y='1' width='3' height='1' fill={isDark ? '#e8e0ff' : '#555'} />
            <rect x='7' y='2' width='2' height='1' fill={isDark ? '#e8e0ff' : '#555'} />
            <rect x='8' y='3' width='1' height='4' fill={isDark ? '#e8e0ff' : '#555'} />
            <rect x='7' y='7' width='2' height='1' fill={isDark ? '#e8e0ff' : '#555'} />
            <rect x='5' y='8' width='3' height='1' fill={isDark ? '#e8e0ff' : '#555'} />
            <rect x='3' y='9' width='3' height='1' fill={isDark ? '#e8e0ff' : '#555'} />
            {/* Inner fill for crescent thickness */}
            <rect x='6' y='2' width='1' height='1' fill={isDark ? '#d0c8f0' : '#444'} />
            <rect x='7' y='3' width='1' height='4' fill={isDark ? '#d0c8f0' : '#444'} />
            <rect x='6' y='7' width='1' height='1' fill={isDark ? '#d0c8f0' : '#444'} />
            {/* Stars */}
            <rect x='2' y='2' width='1' height='1' fill={isDark ? '#fffbe6' : '#666'} />
            <rect x='1' y='6' width='1' height='1' fill={isDark ? '#fffbe6' : '#666'} />
            <rect x='4' y='5' width='1' height='1' fill={isDark ? '#fffbe6' : '#666'} />
          </svg>
          {/* Sliding highlight knob */}
          <div
            className='absolute top-0 h-full w-[38px] border-r-3 border-[#222635] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
            style={{
              left: isDark ? '37px' : '0px',
              background: isDark ? '#252850' : '#fffbe6',
              boxShadow: isDark
                ? 'inset 2px 2px 0 #353870, inset -2px -2px 0 #151838'
                : 'inset 2px 2px 0 #fff, inset -2px -2px 0 #e0d8b0',
              borderLeft: isDark ? '3px solid #222635' : 'none',
              borderRight: !isDark ? '3px solid #222635' : 'none'
            }}
          />
        </div>
      </div>

      {/* HERO SECTION */}
      <section ref={heroRef} className='relative h-screen min-h-[700px] w-full overflow-hidden bg-[#78A7D0]'>
        {/* Sky Background (Animated GIF) */}
        <div className="absolute inset-0 z-0 bg-[url('/images/background.gif')] bg-cover bg-bottom bg-no-repeat" />

        {/* Clouds: single cloud.png on mobile, split left/right on desktop */}
        {isMobile ? (
          <motion.div
            className='pointer-events-none absolute inset-0 z-10'
            style={{ y: yCloudLeft, opacity: cloudOpacity }}>
            <div className="absolute inset-0 bg-[url('/images/cloud.png')] bg-cover bg-bottom bg-no-repeat mix-blend-screen" />
          </motion.div>
        ) : (
          <>
            <motion.div
              className='pointer-events-none absolute inset-0 z-10'
              style={{ y: yCloudLeft, x: xCloudLeft, opacity: cloudOpacity }}>
              <div className="absolute inset-0 bg-[url('/images/cloud-left.png')] bg-cover bg-bottom bg-no-repeat mix-blend-screen" />
            </motion.div>
            <motion.div
              className='pointer-events-none absolute inset-0 z-10'
              style={{ y: yCloudRight, x: xCloudRight, opacity: cloudOpacity }}>
              <div className="absolute inset-0 bg-[url('/images/cloud-right.png')] bg-cover bg-bottom bg-no-repeat mix-blend-screen" />
            </motion.div>
          </>
        )}

        {/* Content Layer */}
        <div className='pointer-events-none relative z-20 mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-4 lg:flex-row lg:justify-between lg:px-8'>
          {/* Text Section */}
          <div className='pointer-events-auto z-30 flex w-full flex-1 flex-col items-center justify-center text-center lg:items-start lg:text-left'>
            <motion.h1
              variants={fadeUp}
              initial='hidden'
              animate='visible'
              custom={0.2}
              className='mb-2 whitespace-nowrap font-["Press_Start_2P"] text-[1.5rem] font-bold leading-none text-white drop-shadow-[4px_4px_0_#07233e] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] lg:drop-shadow-[6px_6px_0_#07233e] xl:text-[3.5rem]'>
              SATANG
            </motion.h1>
            <motion.h2
              variants={fadeUp}
              initial='hidden'
              animate='visible'
              custom={0.4}
              className='mb-3 whitespace-nowrap font-["Press_Start_2P"] text-[8px] font-bold tracking-widest text-white drop-shadow-[3px_3px_0_#07233e] sm:text-xs md:text-sm lg:mb-5 lg:text-base lg:tracking-[0.2em] lg:drop-shadow-[4px_4px_0_#07233e] xl:text-lg'>
              FULL STACK <br className='lg:hidden' />
              DEVELOPER
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial='hidden'
              animate='visible'
              custom={0.6}
              className='mb-6 max-w-md font-["Press_Start_2P"] text-[6px] leading-[2] text-white drop-shadow-[2px_2px_0_#222635] sm:text-[8px] md:text-[10px] lg:text-[12px] lg:leading-[2]'>
              PASSIONATELY CRAFTING DIGITAL EXPERIENCES.
              <br />
              AVAILABLE FOR NEW VENTURES.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate='visible'
              custom={0.8}
              className='flex flex-col justify-center gap-3 sm:flex-row lg:justify-start lg:gap-6'>
              <button className='pixel-btn flex items-center gap-3 text-[12px] md:text-[14px]'>
                <img
                  src='/images/cursor.svg'
                  alt='cursor'
                  className='-ml-1 h-4 w-4 object-contain'
                  style={{ imageRendering: 'pixelated' }}
                />
                <span>VIEW PROJECTS</span>
              </button>
              <button className='pixel-btn text-[10px] md:text-[12px]'>
                <svg
                  className='pixel-icon'
                  width='18'
                  height='13'
                  viewBox='0 0 10 7'
                  style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                  <rect x='1' y='0' width='8' height='7' fill='#222635' />
                  <rect x='0' y='1' width='10' height='5' fill='#222635' />
                  <rect x='1' y='1' width='8' height='5' fill='#ffffff' />
                  <rect x='1' y='1' width='1' height='1' fill='#222635' />
                  <rect x='2' y='2' width='1' height='1' fill='#222635' />
                  <rect x='3' y='3' width='1' height='1' fill='#222635' />
                  <rect x='4' y='4' width='2' height='1' fill='#222635' />
                  <rect x='6' y='3' width='1' height='1' fill='#222635' />
                  <rect x='7' y='2' width='1' height='1' fill='#222635' />
                  <rect x='8' y='1' width='1' height='1' fill='#222635' />
                  <rect x='1' y='5' width='1' height='1' fill='#222635' />
                  <rect x='2' y='4' width='1' height='1' fill='#222635' />
                  <rect x='8' y='5' width='1' height='1' fill='#222635' />
                  <rect x='7' y='4' width='1' height='1' fill='#222635' />
                </svg>
                CONTACT ME
              </button>
            </motion.div>
          </div>

          {/* 3D Block Section */}
          <motion.div
            variants={scaleIn}
            initial='hidden'
            animate='visible'
            custom={0.5}
            className='pointer-events-none relative mt-2 flex h-[30vh] w-full flex-1 items-center justify-center lg:mt-0 lg:h-[60%] lg:justify-end'>
            <div
              className='relative h-full w-full max-w-[320px] bg-contain bg-center bg-no-repeat lg:max-w-[350px] lg:bg-right'
              style={{ backgroundImage: `url('/images/block.png')` }}>
              {/* Text Labels */}
              {!isMobile && (
                <>
                  <div className='absolute left-[5%] top-[35%] font-["Press_Start_2P"] text-[8px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[10px]'>
                    FRONTEND
                  </div>
                  <div className='absolute right-[-2%] top-[28%] font-["Press_Start_2P"] text-[8px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[10px]'>
                    BACKEND
                  </div>
                  <div className='absolute bottom-[15%] right-[18%] font-["Press_Start_2P"] text-[8px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[10px]'>
                    DATABASE
                  </div>
                </>
              )}

              {/* Floating Coin 1 (Top Center) */}
              <div
                className='absolute right-[35%] top-[3%] z-30 animate-[bounce_2.5s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:right-[38%] md:top-[5%] lg:right-[40%] lg:top-[3%]'
                style={{ animationDelay: '0s' }}>
                <svg
                  width='26'
                  height='26'
                  viewBox='0 0 16 16'
                  style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                  <rect x='4' y='0' width='8' height='16' fill='currentColor' />
                  <rect x='2' y='2' width='12' height='12' fill='currentColor' />
                  <rect x='0' y='4' width='16' height='8' fill='currentColor' />
                  <rect x='6' y='2' width='4' height='12' fill='#fff' />
                  <rect x='4' y='4' width='8' height='8' fill='#fff' />
                  <rect x='6' y='4' width='4' height='8' fill='#e9b426' />
                </svg>
              </div>

              {/* Floating Coin 2 (Left Frontend) */}
              <div
                className='absolute left-[18%] top-[40%] z-30 animate-[bounce_2s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:left-[22%] md:top-[40%] lg:left-[22%] lg:top-[35%]'
                style={{ animationDelay: '0.8s' }}>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 16 16'
                  style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                  <rect x='4' y='0' width='8' height='16' fill='currentColor' />
                  <rect x='2' y='2' width='12' height='12' fill='currentColor' />
                  <rect x='0' y='4' width='16' height='8' fill='currentColor' />
                  <rect x='6' y='2' width='4' height='12' fill='#fff' />
                  <rect x='4' y='4' width='8' height='8' fill='#fff' />
                  <rect x='6' y='4' width='4' height='8' fill='#e9b426' />
                </svg>
              </div>

              {/* Floating Coin 3 (Right Backend) */}
              <div
                className='absolute right-[10%] top-[32%] z-30 animate-[bounce_3s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:right-[12%] md:top-[35%] lg:right-[12%] lg:top-[30%]'
                style={{ animationDelay: '1.5s' }}>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 16 16'
                  style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                  <rect x='4' y='0' width='8' height='16' fill='currentColor' />
                  <rect x='2' y='2' width='12' height='12' fill='currentColor' />
                  <rect x='0' y='4' width='16' height='8' fill='currentColor' />
                  <rect x='6' y='2' width='4' height='12' fill='#fff' />
                  <rect x='4' y='4' width='8' height='8' fill='#fff' />
                  <rect x='6' y='4' width='4' height='8' fill='#e9b426' />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          variants={fadeUp}
          initial='hidden'
          animate='visible'
          custom={1.2}
          className='absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 scale-100 animate-bounce flex-col items-center gap-4 md:scale-125'>
          <span className='font-["Press_Start_2P"] text-[8px] text-white drop-shadow-[2px_2px_0_#222635] md:text-[10px]'>
            SCROLL
          </span>
          <svg
            className='pixel-icon'
            width='36'
            height='36'
            viewBox='0 0 16 16'
            style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
            <rect x='6' y='0' width='4' height='12' fill='#fff' />
            <rect x='4' y='8' width='8' height='4' fill='#fff' />
            <rect x='2' y='6' width='12' height='4' fill='#fff' />
            <rect x='0' y='4' width='16' height='4' fill='#fff' />

            <rect x='6' y='2' width='4' height='10' fill='#222635' />
            <rect x='4' y='6' width='8' height='4' fill='#222635' />
            <rect x='2' y='4' width='12' height='4' fill='#222635' />
          </svg>
        </motion.div>
      </section>

      {/* CONTENT AREA */}
      <div className='relative z-30 w-full overflow-hidden bg-[var(--bg-content)] transition-colors duration-300'>
        <div className='h-1.5 bg-gradient-to-r from-[#e06c75] via-[#f5a524] to-[#61afef]' />

        {/* CONTENT SECTIONS */}
        <div className='relative z-10 mx-auto w-full max-w-5xl px-4 py-16'>
          {/* About Section */}
          <motion.section
            id='about'
            className='mb-20'
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-80px' }}>
            <div className='mb-8 flex items-center justify-center gap-3'>
              <div className='h-1 w-10 bg-[#f5a524]'></div>
              <h2 className='text-xl font-bold tracking-widest text-[var(--text-heading)] drop-shadow-[2px_2px_0_var(--shadow-text)] md:text-2xl'>
                ABOUT ME
              </h2>
              <div className='h-1 w-10 bg-[#f5a524]'></div>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:gap-10'>
              {/* Portrait Box */}
              <motion.div
                className='relative flex aspect-square items-center justify-center border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-3 shadow-[6px_6px_0_var(--shadow-card)] transition-colors duration-300'
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}>
                <div className='flex h-full w-full items-center justify-center overflow-hidden border-3 border-dashed border-[var(--border-card-inner)] bg-[var(--bg-card-inner)] transition-colors duration-300'>
                  <div className='h-3/4 w-3/4 bg-[#555] opacity-10'></div>
                </div>
              </motion.div>

              <motion.div
                className='flex flex-col justify-center space-y-4'
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}>
                <div className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-5 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'>
                  <p className='text-[9px] leading-relaxed text-[var(--text-body)] md:text-[11px] md:leading-loose'>
                    Hello! I am <span className='font-bold text-[#f5a524]'>Satang</span>, a passionate Full Stack
                    Developer with a deep love for creating digital experiences.
                    <br />
                    <br />I specialize in bridging the gap between elegant frontend interfaces and robust backend
                    architectures. When I&#39;m not coding, you can find me exploring new technologies or enjoying
                    vintage pixel art games.
                  </p>
                </div>
                <div className='flex gap-3'>
                  <a
                    href='#projects'
                    className='pixel-btn flex-1 border-2 border-[#f5a524] bg-[#f5a524] py-3 text-center text-[9px] text-[#1a1c2b] shadow-[3px_3px_0_var(--shadow-card)] hover:brightness-110 md:text-[11px]'>
                    VIEW WORK
                  </a>
                  <a
                    href='#contact'
                    className='pixel-btn flex-1 border-2 border-[var(--border-card-inner)] bg-[var(--bg-card-inner)] py-3 text-center text-[9px] text-[var(--text-body)] shadow-[3px_3px_0_var(--shadow-card)] md:text-[11px]'>
                    RESUME
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Skills Section — Tag based */}
          <motion.section
            id='skills'
            className='mb-20'
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-80px' }}>
            <div className='mb-8 flex items-center justify-center gap-3'>
              <div className='h-1 w-10 bg-[#98c379]'></div>
              <h2 className='text-xl font-bold tracking-widest text-[var(--text-heading)] drop-shadow-[2px_2px_0_var(--shadow-text)] md:text-2xl'>
                SKILLS
              </h2>
              <div className='h-1 w-10 bg-[#98c379]'></div>
            </div>

            <div className='space-y-5'>
              {/* Front-End */}
              <motion.div
                className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}>
                <h3 className='mb-3 text-[11px] font-bold text-[#98c379] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                  FRONT-END
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Bootstrap', 'Tailwind', 'SASS', 'Redux'].map(
                    s => (
                      <span
                        key={s}
                        className='border-2 border-[#98c379]/40 bg-[#98c379]/10 px-2.5 py-1 text-[8px] text-[#98c379] transition-colors hover:bg-[#98c379]/20 md:text-[9px]'>
                        {s}
                      </span>
                    )
                  )}
                </div>
              </motion.div>

              {/* Back-End */}
              <motion.div
                className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}>
                <h3 className='mb-3 text-[11px] font-bold text-[#e06c75] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                  BACK-END
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {['Node.js', 'Express.js', '.Net', 'C#', 'MVC', 'Rest-API'].map(s => (
                    <span
                      key={s}
                      className='border-2 border-[#e06c75]/40 bg-[#e06c75]/10 px-2.5 py-1 text-[8px] text-[#e06c75] transition-colors hover:bg-[#e06c75]/20 md:text-[9px]'>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Database */}
              <motion.div
                className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}>
                <h3 className='mb-3 text-[11px] font-bold text-[#61afef] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                  DATABASE
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis'].map(s => (
                    <span
                      key={s}
                      className='border-2 border-[#61afef]/40 bg-[#61afef]/10 px-2.5 py-1 text-[8px] text-[#61afef] transition-colors hover:bg-[#61afef]/20 md:text-[9px]'>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Version Control */}
              <motion.div
                className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}>
                <h3 className='mb-3 text-[11px] font-bold text-[#c678dd] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                  VERSION CONTROL
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {['Git', 'GitHub', 'GitLab'].map(s => (
                    <span
                      key={s}
                      className='border-2 border-[#c678dd]/40 bg-[#c678dd]/10 px-2.5 py-1 text-[8px] text-[#c678dd] transition-colors hover:bg-[#c678dd]/20 md:text-[9px]'>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* DevOps & Security */}
              <motion.div
                className='grid gap-5 sm:grid-cols-2'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}>
                <div className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'>
                  <h3 className='mb-3 text-[11px] font-bold text-[#f5a524] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                    DEVOPS
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {['CI/CD', 'Docker'].map(s => (
                      <span
                        key={s}
                        className='border-2 border-[#f5a524]/40 bg-[#f5a524]/10 px-2.5 py-1 text-[8px] text-[#f5a524] transition-colors hover:bg-[#f5a524]/20 md:text-[9px]'>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'>
                  <h3 className='mb-3 text-[11px] font-bold text-[#e5c07b] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                    SECURITY
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {['OWASP Standards'].map(s => (
                      <span
                        key={s}
                        className='border-2 border-[#e5c07b]/40 bg-[#e5c07b]/10 px-2.5 py-1 text-[8px] text-[#e5c07b] transition-colors hover:bg-[#e5c07b]/20 md:text-[9px]'>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Other Tools */}
              <motion.div
                className='border-3 border-[var(--border-card)] bg-[var(--bg-card)] p-4 shadow-[4px_4px_0_var(--shadow-card)] transition-colors duration-300'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                viewport={{ once: true }}>
                <h3 className='mb-3 text-[11px] font-bold text-[#56b6c2] drop-shadow-[1px_1px_0_var(--shadow-text)] md:text-[13px]'>
                  OTHER TOOLS & TECHNOLOGIES
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {[
                    'Swagger',
                    'Socket.io',
                    'Unit Testing (Playwright)',
                    'Responsive Design',
                    'Fusion Auth',
                    'Minio',
                    'Fast Report',
                    'GraphQL'
                  ].map(s => (
                    <span
                      key={s}
                      className='border-2 border-[#56b6c2]/40 bg-[#56b6c2]/10 px-2.5 py-1 text-[8px] text-[#56b6c2] transition-colors hover:bg-[#56b6c2]/20 md:text-[9px]'>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            id='projects'
            className='mb-20'
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-80px' }}>
            <div className='mb-8 flex items-center justify-center gap-3'>
              <div className='h-1 w-10 bg-[#e06c75]'></div>
              <h2 className='text-xl font-bold tracking-widest text-[var(--text-heading)] drop-shadow-[2px_2px_0_var(--shadow-text)] md:text-2xl'>
                PROJECTS
              </h2>
              <div className='h-1 w-10 bg-[#e06c75]'></div>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
              {/* Project 1 */}
              <motion.div
                className='group border-3 border-[var(--border-card)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--shadow-card)]'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}>
                <div className='relative aspect-video w-full overflow-hidden border-b-3 border-[var(--border-card)] bg-[var(--bg-preview)]'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='font-["Silkscreen"] text-3xl text-[var(--text-muted)] opacity-40'>E-COMMERCE</span>
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='mb-1.5 text-base font-bold text-[#e06c75]'>PIXEL STORE</h3>
                  <p className='mb-4 text-[9px] leading-relaxed text-[var(--text-muted)] md:text-[10px]'>
                    A full-stack e-commerce platform built with Next.js, Stripe, and PostgreSQL.
                  </p>
                  <div className='mb-4 flex flex-wrap gap-1.5'>
                    <span className='border border-[#98c379]/40 bg-[#98c379]/10 px-2 py-0.5 text-[7px] text-[#98c379]'>
                      NEXT.JS
                    </span>
                    <span className='border border-[#e06c75]/40 bg-[#e06c75]/10 px-2 py-0.5 text-[7px] text-[#e06c75]'>
                      STRIPE
                    </span>
                    <span className='border border-[#61afef]/40 bg-[#61afef]/10 px-2 py-0.5 text-[7px] text-[#61afef]'>
                      POSTGRES
                    </span>
                  </div>
                  <a
                    href='#'
                    className='inline-block border-b border-[var(--border-card)] pb-0.5 text-[9px] text-[var(--text-muted)] hover:border-[#e06c75] hover:text-[#e06c75]'>
                    VIEW SOURCE -{`>`}
                  </a>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                className='group border-3 border-[var(--border-card)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--shadow-card)]'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}>
                <div className='relative aspect-video w-full overflow-hidden border-b-3 border-[var(--border-card)] bg-[var(--bg-preview)]'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='font-["Silkscreen"] text-3xl text-[var(--text-muted)] opacity-40'>DASHBOARD</span>
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='mb-1.5 text-base font-bold text-[#61afef]'>ANALYTICS HUB</h3>
                  <p className='mb-4 text-[9px] leading-relaxed text-[var(--text-muted)] md:text-[10px]'>
                    Real-time analytics dashboard utilizing WebSockets and Redis caching.
                  </p>
                  <div className='mb-4 flex flex-wrap gap-1.5'>
                    <span className='border border-[#98c379]/40 bg-[#98c379]/10 px-2 py-0.5 text-[7px] text-[#98c379]'>
                      REACT
                    </span>
                    <span className='border border-[#f5a524]/40 bg-[#f5a524]/10 px-2 py-0.5 text-[7px] text-[#f5a524]'>
                      WEBSOCKETS
                    </span>
                    <span className='border border-[#61afef]/40 bg-[#61afef]/10 px-2 py-0.5 text-[7px] text-[#61afef]'>
                      REDIS
                    </span>
                  </div>
                  <a
                    href='#'
                    className='inline-block border-b border-[var(--border-card)] pb-0.5 text-[9px] text-[var(--text-muted)] hover:border-[#61afef] hover:text-[#61afef]'>
                    VIEW SOURCE -{`>`}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>

        <div className='h-1.5 bg-gradient-to-r from-[#61afef] via-[#c678dd] to-[#e06c75]' />

        {/* Footer / Contact */}
        <footer
          id='contact'
          className='bg-[var(--bg-footer)] pb-8 pt-14 text-center text-[var(--text-heading)] transition-colors duration-300'>
          <h2 className="mb-8 font-['Press_Start_2P'] text-lg drop-shadow-[3px_3px_0_var(--shadow-text)] md:text-2xl">
            CONTACT ME
          </h2>
          <div className='mb-10 flex justify-center gap-4'>
            <button className='pixel-btn border-2 border-[var(--border-card-inner)] text-[12px] hover:-translate-y-1 hover:shadow-lg'>
              <svg
                className='pixel-icon'
                width='18'
                height='13'
                viewBox='0 0 10 7'
                style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                <rect x='1' y='0' width='8' height='7' fill='#222635' />
                <rect x='0' y='1' width='10' height='5' fill='#222635' />
                <rect x='1' y='1' width='8' height='5' fill='#ffffff' />
                <rect x='1' y='1' width='1' height='1' fill='#222635' />
                <rect x='2' y='2' width='1' height='1' fill='#222635' />
                <rect x='3' y='3' width='1' height='1' fill='#222635' />
                <rect x='4' y='4' width='2' height='1' fill='#222635' />
                <rect x='6' y='3' width='1' height='1' fill='#222635' />
                <rect x='7' y='2' width='1' height='1' fill='#222635' />
                <rect x='8' y='1' width='1' height='1' fill='#222635' />
                <rect x='1' y='5' width='1' height='1' fill='#222635' />
                <rect x='2' y='4' width='1' height='1' fill='#222635' />
                <rect x='8' y='5' width='1' height='1' fill='#222635' />
                <rect x='7' y='4' width='1' height='1' fill='#222635' />
              </svg>
              SEND EMAIL
            </button>
          </div>
          <p className="font-['Press_Start_2P'] text-[8px] text-[var(--text-footer)]">
            © {new Date().getFullYear()} SATANG. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  )
}
