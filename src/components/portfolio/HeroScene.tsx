'use client'

import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  isCoin: boolean
}

interface Building {
  x: number
  y: number
  w: number
  h: number
  lit: boolean[][]
}

interface CodeDrop {
  x: number
  y: number
  speed: number
  text: string
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export default function HeroScene({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const scrollRef = useRef(0)
  const targetMouseRef = useRef(0)
  const lerpMouseRef = useRef(0)
  const dataRef = useRef<{ stars: Star[]; buildings: Building[]; drops: CodeDrop[]; ready: boolean }>({
    stars: [],
    buildings: [],
    drops: [],
    ready: false
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const dpr = window.devicePixelRatio || 1
    const isMobile = window.innerWidth < 768
    const density = isMobile ? 0.5 : 1

    function initData(W: number, H: number) {
      const starCount = Math.floor(70 * density)
      dataRef.current.stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.75,
        isCoin: Math.random() > 0.85
      }))

      const buildingCount = Math.floor(14 * density)
      dataRef.current.buildings = Array.from({ length: buildingCount }, (_, i) => {
        const w = Math.floor((Math.random() * 40 + 30) / 4) * 4
        const h = Math.floor((Math.random() * 140 + 60) / 4) * 4
        const x = Math.floor((i * W) / buildingCount + (Math.random() - 0.5) * 20)
        const rows = Math.floor(h / 16)
        const cols = Math.floor(w / 16)
        const lit = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => Math.random() > 0.55)
        )
        return { x, y: H - h - 50, w, h, lit }
      })

      const dropCount = Math.floor(18 * density)
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/\\'
      dataRef.current.drops = Array.from({ length: dropCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H - H,
        speed: Math.random() * 1.5 + 0.8,
        text: Array.from({ length: Math.floor(Math.random() * 8 + 4) }, () =>
          charset[Math.floor(Math.random() * charset.length)]
        ).join('')
      }))

      dataRef.current.ready = true
    }

    function resize() {
      if (!canvas) return
      const W = canvas.parentElement?.clientWidth || window.innerWidth
      const H = canvas.parentElement?.clientHeight || 600
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      initData(W, H)
    }

    let isVisible = true
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(canvas)

    function draw() {
      rafRef.current = requestAnimationFrame(draw)
      if (!isVisible || !dataRef.current.ready) return

      const c = canvasRef.current
      if (!c) return
      const ctx = c.getContext('2d')
      if (!ctx) return

      const W = c.width / dpr
      const H = c.height / dpr

      lerpMouseRef.current = lerp(lerpMouseRef.current, targetMouseRef.current, 0.04)

      const style = getComputedStyle(document.documentElement)
      const bg = style.getPropertyValue('--px-bg-base').trim() || '#0a0a0f'
      const gold = style.getPropertyValue('--px-gold').trim() || '#FFD700'
      const cyan = style.getPropertyValue('--px-cyan').trim() || '#00F5FF'
      const purple = style.getPropertyValue('--px-purple').trim() || '#7B2FBE'
      const green = style.getPropertyValue('--px-green').trim() || '#39FF14'

      const scroll = scrollRef.current

      ctx.save()
      ctx.scale(dpr, dpr)

      // Clear
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ── Layer 1: Stars / coins  (scroll 0.1x) ────────────────────────
      const starOY = scroll * 0.1
      dataRef.current.stars.forEach(star => {
        let sy = (star.y - starOY) % H
        if (sy < 0) sy += H
        if (star.isCoin) {
          ctx.fillStyle = gold
          ctx.fillRect(Math.floor(star.x), Math.floor(sy), 6, 6)
          ctx.fillStyle = '#FFF176'
          ctx.fillRect(Math.floor(star.x) + 2, Math.floor(sy) + 1, 2, 2)
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.6)'
          ctx.fillRect(Math.floor(star.x), Math.floor(sy), 2, 2)
        }
      })

      // ── Layer 2: City skyline  (scroll 0.4x + mouse parallax) ────────
      const skyOY = scroll * 0.4
      const mouseOX = ((lerpMouseRef.current - W / 2) / (W / 2)) * 20

      ctx.save()
      ctx.translate(mouseOX, 0)

      dataRef.current.buildings.forEach(b => {
        const by = Math.floor(b.y - skyOY)

        ctx.fillStyle = purple
        ctx.fillRect(Math.floor(b.x), by, b.w, b.h)

        // Pixel highlight top
        ctx.fillStyle = '#9B4FDE'
        ctx.fillRect(Math.floor(b.x), by, b.w, 4)

        // Left edge shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)'
        ctx.fillRect(Math.floor(b.x), by, 4, b.h)

        // Window lights
        b.lit.forEach((row, ri) =>
          row.forEach((isLit, ci) => {
            if (!isLit) return
            ctx.fillStyle = ri % 3 === 0 ? cyan : gold
            ctx.fillRect(Math.floor(b.x + ci * 16 + 4), by + ri * 16 + 6, 8, 8)
          })
        )
      })

      // Ground
      const gY = Math.floor(H - 52 - skyOY)
      ctx.fillStyle = '#12121a'
      ctx.fillRect(0, gY + 4, W, H)

      // Ground pixel edge (cyan zigzag)
      ctx.fillStyle = cyan
      for (let gx = 0; gx < W; gx += 8) {
        ctx.fillRect(gx, gY + (gx % 16 === 0 ? 0 : 4), 8, 4)
      }

      ctx.restore()

      // ── Layer 3: Code rain  (independent scroll) ─────────────────────
      ctx.font = `${Math.floor(10 * dpr) / dpr}px monospace`
      dataRef.current.drops.forEach(drop => {
        drop.y += drop.speed
        if (drop.y > H + 160) {
          drop.y = -160
          drop.x = Math.random() * W
        }
        drop.text.split('').forEach((ch, i) => {
          const alpha = Math.max(0, 1 - i / drop.text.length)
          ctx.fillStyle = i === 0 ? `rgba(0,245,255,${alpha})` : `rgba(57,255,20,${alpha * 0.55})`
          ctx.fillText(ch, Math.floor(drop.x), Math.floor(drop.y - i * 14))
        })
      })

      ctx.restore()
    }

    resize()
    draw()

    const handleScroll = () => { scrollRef.current = window.scrollY }
    const handleMouse = (e: MouseEvent) => { targetMouseRef.current = e.clientX }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', willChange: 'transform', ...style }}
    />
  )
}
