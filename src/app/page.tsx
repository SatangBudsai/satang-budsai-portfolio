'use client'

import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { scrollY } = useScroll()

  // Clouds move even faster when scrolling down for deeper parallax effect
  const yCloudLeft = useTransform(scrollY, [0, 1000], [0, 800])
  const xCloudLeft = useTransform(scrollY, [0, 1000], [0, -150])
  const yCloudRight = useTransform(scrollY, [0, 1000], [0, 900])
  const xCloudRight = useTransform(scrollY, [0, 1000], [0, 150])

  return (
    <div className='w-full bg-[#f0ece4] font-["Press_Start_2P"] text-[#2a2a3a]'>
      <Navbar />
      {/* HERO SECTION */}
      <section className='relative h-screen min-h-[700px] w-full overflow-hidden bg-[#78A7D0]'>
        {/* Sky Background (Fixed) */}
        <div className="absolute inset-0 z-0 bg-[url('/images/background.png')] bg-cover bg-bottom bg-no-repeat" />

        {/* Cloud Left (Parallax) */}
        <motion.div className='pointer-events-none absolute inset-0 z-10' style={{ y: yCloudLeft, x: xCloudLeft }}>
          <div className="absolute inset-0 bg-[url('/images/cloud-left.png')] bg-cover bg-bottom bg-no-repeat opacity-90 mix-blend-screen" />
        </motion.div>

        {/* Cloud Right (Parallax) */}
        <motion.div className='pointer-events-none absolute inset-0 z-10' style={{ y: yCloudRight, x: xCloudRight }}>
          <div className="absolute inset-0 bg-[url('/images/cloud-right.png')] bg-cover bg-bottom bg-no-repeat opacity-90 mix-blend-screen" />
        </motion.div>

        {/* Main Content Layout Container */}
        <div className='pointer-events-none relative z-20 mx-auto flex h-full w-full max-w-[1700px] flex-col items-center justify-center px-6 pt-20 lg:flex-row lg:justify-between lg:px-20'>
          {/* Text Section */}
          <div className='pointer-events-auto z-30 flex w-full flex-1 flex-col items-center justify-center text-center lg:items-start lg:text-left'>
            <h1 className='mb-2 whitespace-nowrap font-["Press_Start_2P"] text-[1.5rem] font-bold leading-none text-white drop-shadow-[4px_4px_0_#07233e] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] lg:drop-shadow-[6px_6px_0_#07233e] xl:text-[5rem]'>
              SATANG
            </h1>
            <h2 className='mb-4 whitespace-nowrap font-["Press_Start_2P"] text-xs font-bold tracking-widest text-white drop-shadow-[3px_3px_0_#07233e] sm:text-sm md:text-base lg:mb-8 lg:text-xl lg:tracking-[0.2em] lg:drop-shadow-[4px_4px_0_#07233e] xl:text-2xl'>
              FULL STACK <br className='lg:hidden' />
              DEVELOPER
            </h2>
            <p className='mb-8 max-w-xl font-["Press_Start_2P"] text-[8px] leading-[2] text-white drop-shadow-[2px_2px_0_#222635] sm:text-[10px] md:text-[12px] lg:text-[14px] lg:leading-[2]'>
              PASSIONATELY CRAFTING DIGITAL EXPERIENCES.
              <br />
              AVAILABLE FOR NEW VENTURES.
            </p>

            <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start lg:gap-8'>
              <button className='pixel-btn flex items-center gap-2 text-[12px] md:text-[14px]'>
                {/* Minimal pixel arrow icon */}
                <svg
                  className='pixel-icon'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                  <rect x='0' y='6' width='10' height='4' fill='#222635' />
                  <rect x='10' y='4' width='2' height='8' fill='#222635' />
                  <rect x='12' y='6' width='2' height='4' fill='#222635' />
                  <rect x='14' y='7' width='2' height='2' fill='#222635' />
                  <rect x='2' y='8' width='8' height='2' fill='#ffffff' />
                  <rect x='10' y='6' width='2' height='4' fill='#ffffff' />
                  <rect x='12' y='8' width='2' height='2' fill='#ffffff' />
                </svg>
                VIEW PROJECTS
              </button>
              <button className='pixel-btn text-[12px] md:text-[14px]'>
                <svg
                  className='pixel-icon'
                  width='22'
                  height='16'
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
            </div>
          </div>

          {/* 3D Block Section */}
          <div className='pointer-events-none relative mt-8 flex h-[40vh] w-full flex-1 items-center justify-center lg:mt-0 lg:h-full lg:justify-end'>
            <div
              className='relative h-full w-full max-w-[500px] bg-contain bg-center bg-no-repeat lg:bg-right'
              style={{ backgroundImage: `url('/images/${isMobile ? 'block-mobile.png' : 'block.png'}')` }}>
              {/* Text Labels */}
              {!isMobile && (
                <>
                  <div className='absolute left-[8%] top-[38%] font-["Press_Start_2P"] text-[10px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[12px]'>
                    FRONTEND
                  </div>
                  <div className='absolute right-[0%] top-[30%] font-["Press_Start_2P"] text-[10px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[12px]'>
                    BACKEND
                  </div>
                  <div className='absolute bottom-[18%] right-[22%] font-["Press_Start_2P"] text-[10px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[12px]'>
                    DATABASE
                  </div>
                </>
              )}

              {/* Floating Coin 1 (Top Center) */}
              <div
                className='absolute right-[35%] top-[5%] z-30 animate-[bounce_2.5s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:right-[38%] md:top-[8%] lg:right-[40%] lg:top-[5%]'
                style={{ animationDelay: '0s' }}>
                <svg
                  width='32'
                  height='32'
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
                className='absolute left-[20%] top-[40%] z-30 animate-[bounce_2s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:left-[25%] md:top-[42%] lg:left-[25%] lg:top-[38%]'
                style={{ animationDelay: '0.8s' }}>
                <svg
                  width='24'
                  height='24'
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
                className='absolute right-[12%] top-[35%] z-30 animate-[bounce_3s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:right-[15%] md:top-[38%] lg:right-[15%] lg:top-[32%]'
                style={{ animationDelay: '1.5s' }}>
                <svg
                  width='28'
                  height='28'
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
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className='absolute bottom-12 left-1/2 z-40 flex -translate-x-1/2 scale-125 animate-bounce flex-col items-center gap-6 md:scale-150'>
          <span className='font-["Press_Start_2P"] text-[12px] text-white drop-shadow-[2px_2px_0_#222635] md:text-[14px]'>
            SCROLL
          </span>
          <svg
            className='pixel-icon'
            width='48'
            height='48'
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
        </div>
      </section>

      {/* CONTENT AREA (Normal Scrolling Flow) */}
      <div className='relative z-30 w-full overflow-hidden'>
        <div className='pixel-divider border-b-4 border-t-4 border-[#222635]' />

        {/* CONTENT SECTIONS */}
        <div className='relative z-10 mx-auto w-full max-w-6xl px-4 py-24'>
          {/* About Section */}
          <section id='about' className='mb-32'>
            <div className='mb-12 flex items-center justify-center gap-4'>
              <div className='h-2 w-16 bg-[#2a2a3a]'></div>
              <h2 className='text-3xl font-bold tracking-widest text-[#2a2a3a] drop-shadow-[2px_2px_0_#fff] md:text-4xl'>
                ABOUT ME
              </h2>
              <div className='h-2 w-16 bg-[#2a2a3a]'></div>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:gap-16'>
              {/* Minimal Portrait Box */}
              <div className='pixel-border-heavy relative flex aspect-square items-center justify-center bg-[#fff] p-4 shadow-[8px_8px_0_#2a2a3a]'>
                <div className='flex h-full w-full items-center justify-center overflow-hidden border-4 border-dashed border-[#2a2a3a] bg-[#e0d8c8]'>
                  <div className='pixel-portrait mask-pixel-art h-3/4 w-3/4 bg-[#2a2a3a] opacity-10'></div>
                </div>
              </div>

              <div className='flex flex-col justify-center space-y-6'>
                <div className='pixel-border-heavy bg-white p-6 shadow-[6px_6px_0_#2a2a3a]'>
                  <p className='text-[10px] leading-relaxed text-[#2a2a3a] md:text-[12px] md:leading-loose'>
                    Hello! I am <span className='font-bold text-[#e06c75]'>Satang</span>, a passionate Full Stack
                    Developer with a deep love for creating digital experiences.
                    <br />
                    <br />I specialize in bridging the gap between elegant frontend interfaces and robust backend
                    architectures. When I'm not coding, you can find me exploring new technologies or enjoying vintage
                    pixel art games.
                  </p>
                </div>
                <div className='flex gap-4'>
                  <a
                    href='#projects'
                    className='pixel-btn flex-1 border-2 border-[#2a2a3a] bg-[#f5a524] py-4 text-center text-[10px] text-[#2a2a3a] shadow-[4px_4px_0_#2a2a3a] hover:bg-[#d48c1c] md:text-[12px]'>
                    VIEW WORK
                  </a>
                  <a
                    href='#contact'
                    className='pixel-btn flex-1 border-2 border-[#2a2a3a] bg-[#fff] py-4 text-center text-[10px] text-[#2a2a3a] shadow-[4px_4px_0_#2a2a3a] hover:bg-[#e0d8c8] md:text-[12px]'>
                    RESUME
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id='skills' className='mb-32'>
            <div className='mb-12 flex items-center justify-center gap-4'>
              <div className='h-2 w-16 bg-[#2a2a3a]'></div>
              <h2 className='text-3xl font-bold tracking-widest text-[#2a2a3a] drop-shadow-[2px_2px_0_#fff] md:text-4xl'>
                SKILLS
              </h2>
              <div className='h-2 w-16 bg-[#2a2a3a]'></div>
            </div>

            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Skill Category: Frontend */}
              <div className='pixel-border-heavy bg-[#fff] p-6 shadow-[6px_6px_0_#2a2a3a] transition-transform hover:-translate-y-2'>
                <h3 className='mb-6 border-b-4 border-dashed border-[#2a2a3a] pb-4 text-center text-xl text-[#98c379] drop-shadow-[1px_1px_0_#2a2a3a]'>
                  FRONTEND
                </h3>
                <div className='space-y-4'>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>REACT/NEXT.JS</span>
                      <span>90%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#98c379]' style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>TYPESCRIPT</span>
                      <span>85%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#98c379]' style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>TAILWIND CSS</span>
                      <span>95%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#98c379]' style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Category: Backend */}
              <div className='pixel-border-heavy bg-[#fff] p-6 shadow-[6px_6px_0_#2a2a3a] transition-transform hover:-translate-y-2'>
                <h3 className='mb-6 border-b-4 border-dashed border-[#2a2a3a] pb-4 text-center text-xl text-[#e06c75] drop-shadow-[1px_1px_0_#2a2a3a]'>
                  BACKEND
                </h3>
                <div className='space-y-4'>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>NODE.JS</span>
                      <span>85%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#e06c75]' style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>PYTHON</span>
                      <span>75%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#e06c75]' style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>EXPRESS</span>
                      <span>80%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#e06c75]' style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Category: Database */}
              <div className='pixel-border-heavy bg-[#fff] p-6 shadow-[6px_6px_0_#2a2a3a] transition-transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1'>
                <h3 className='mb-6 border-b-4 border-dashed border-[#2a2a3a] pb-4 text-center text-xl text-[#61afef] drop-shadow-[1px_1px_0_#2a2a3a]'>
                  DATABASE
                </h3>
                <div className='space-y-4'>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>POSTGRESQL</span>
                      <span>80%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#61afef]' style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>MONGODB</span>
                      <span>85%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#61afef]' style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2 flex justify-between text-[10px] text-[#2a2a3a]'>
                      <span>REDIS</span>
                      <span>70%</span>
                    </div>
                    <div className='h-4 w-full border-2 border-[#2a2a3a] bg-[#e0d8c8] p-0.5'>
                      <div className='h-full bg-[#61afef]' style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id='projects' className='mb-32'>
            <div className='mb-12 flex items-center justify-center gap-4'>
              <div className='h-2 w-16 bg-[#2a2a3a]'></div>
              <h2 className='text-3xl font-bold tracking-widest text-[#2a2a3a] drop-shadow-[2px_2px_0_#fff] md:text-4xl'>
                PROJECTS
              </h2>
              <div className='h-2 w-16 bg-[#2a2a3a]'></div>
            </div>

            <div className='grid gap-8 md:grid-cols-2'>
              {/* Project 1 */}
              <div className='group relative border-4 border-[#2a2a3a] bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_#2a2a3a]'>
                <div className='relative aspect-video w-full overflow-hidden border-b-4 border-[#2a2a3a] bg-[#07233e]'>
                  {/* Mock image placeholder */}
                  <div className='absolute inset-0 bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzQzNWE3NCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiPjwvY2lyY2xlPgo8L3N2Zz4=")] opacity-20'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='font-["Silkscreen"] text-4xl text-white opacity-30'>E-COMMERCE</span>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='mb-2 text-xl font-bold text-[#e06c75]'>PIXEL STORE</h3>
                  <p className='mb-6 text-[10px] leading-relaxed text-[#2a2a3a]'>
                    A full-stack e-commerce platform built with Next.js, Stripe, and PostgreSQL.
                  </p>
                  <div className='mb-6 flex flex-wrap gap-2'>
                    <span className='pixel-badge border border-[#2a2a3a] bg-[#98c379] px-2 py-1 text-[8px] text-[#2a2a3a]'>
                      NEXT.JS
                    </span>
                    <span className='pixel-badge border border-[#2a2a3a] bg-[#e06c75] px-2 py-1 text-[8px] text-[#2a2a3a]'>
                      STRIPE
                    </span>
                    <span className='pixel-badge border border-[#2a2a3a] bg-[#61afef] px-2 py-1 text-[8px] text-[#2a2a3a]'>
                      POSTGRES
                    </span>
                  </div>
                  <a
                    href='#'
                    className='inline-block border-b-2 border-[#2a2a3a] pb-1 text-[10px] text-[#2a2a3a] hover:border-[#e06c75] hover:text-[#e06c75]'>
                    VIEW SOURCE -{`>`}
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className='group relative border-4 border-[#2a2a3a] bg-white transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0_#2a2a3a]'>
                <div className='relative aspect-video w-full overflow-hidden border-b-4 border-[#2a2a3a] bg-[#07233e]'>
                  <div className='absolute inset-0 bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzQzNWE3NCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiPjwvY2lyY2xlPgo8L3N2Zz4=")] opacity-20'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='font-["Silkscreen"] text-4xl text-white opacity-30'>DASHBOARD</span>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='mb-2 text-xl font-bold text-[#61afef]'>ANALYTICS HUB</h3>
                  <p className='mb-6 text-[10px] leading-relaxed text-[#2a2a3a]'>
                    Real-time analytics dashboard utilizing WebSockets and Redis caching.
                  </p>
                  <div className='mb-6 flex flex-wrap gap-2'>
                    <span className='pixel-badge border border-[#2a2a3a] bg-[#98c379] px-2 py-1 text-[8px] text-[#2a2a3a]'>
                      REACT
                    </span>
                    <span className='pixel-badge border border-[#2a2a3a] bg-[#f5a524] px-2 py-1 text-[8px] text-[#2a2a3a]'>
                      WEBSOCKETS
                    </span>
                    <span className='pixel-badge border border-[#2a2a3a] bg-[#61afef] px-2 py-1 text-[8px] text-[#2a2a3a]'>
                      REDIS
                    </span>
                  </div>
                  <a
                    href='#'
                    className='inline-block border-b-2 border-[#2a2a3a] pb-1 text-[10px] text-[#2a2a3a] hover:border-[#61afef] hover:text-[#61afef]'>
                    VIEW SOURCE -{`>`}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className='pixel-divider border-b-4 border-t-4 border-[#222635]' />

        {/* Footer / Contact */}
        <footer id='contact' className='bg-[#2a2a3a] pb-12 pt-20 text-center text-white'>
          <h2 className="mb-12 font-['Press_Start_2P'] text-xl drop-shadow-[4px_4px_0_#000] md:text-3xl">CONTACT ME</h2>
          <div className='mb-16 flex justify-center gap-4'>
            <button className='pixel-btn text-[14px] hover:-translate-y-1 hover:shadow-lg'>
              <svg
                className='pixel-icon'
                width='22'
                height='16'
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
          <p className="font-['Press_Start_2P'] text-[10px] text-[#8a8898]">
            © {new Date().getFullYear()} SATANG. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  )
}
