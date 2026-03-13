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

  // Clouds move faster when scrolling down for deeper parallax effect
  const yCloudLeft = useTransform(scrollY, [0, 1000], [0, 500])
  const xCloudLeft = useTransform(scrollY, [0, 1000], [0, -100])
  const yCloudRight = useTransform(scrollY, [0, 1000], [0, 600])
  const xCloudRight = useTransform(scrollY, [0, 1000], [0, 100])

  return (
    <div className='w-full bg-[#f0ece4] font-["Press_Start_2P"] text-[#2a2a3a]'>
      <Navbar />
      {/* HERO SECTION */}
      <section className='relative h-screen min-h-[700px] w-full overflow-hidden bg-[#78A7D0]'>
        {/* Sky Background (Fixed) */}
        <div className="absolute inset-0 z-0 bg-[url('/images/background.png')] bg-cover bg-bottom bg-no-repeat" />

        {/* Cloud Left (Parallax) */}
        <motion.div
          className='pointer-events-none absolute inset-0 z-10'
          style={{ y: yCloudLeft, x: xCloudLeft }}>
          <div className="absolute inset-0 bg-[url('/images/cloud-left.png')] bg-cover bg-bottom bg-no-repeat opacity-90 mix-blend-screen" />
        </motion.div>

        {/* Cloud Right (Parallax) */}
        <motion.div
          className='pointer-events-none absolute inset-0 z-10'
          style={{ y: yCloudRight, x: xCloudRight }}>
          <div className="absolute inset-0 bg-[url('/images/cloud-right.png')] bg-cover bg-bottom bg-no-repeat opacity-90 mix-blend-screen" />
        </motion.div>

        {/* Main Content Layout Container */}
        <div className='pointer-events-none relative z-20 mx-auto flex h-full w-full max-w-[1700px] flex-col items-center justify-center px-6 pt-20 lg:flex-row lg:justify-between lg:px-20'>
          
          {/* Text Section */}
          <div className='pointer-events-auto z-30 flex w-full flex-1 flex-col items-center justify-center text-center lg:items-start lg:text-left'>
            <h1 className='mb-2 whitespace-nowrap font-["Press_Start_2P"] text-[2rem] font-bold leading-none text-white drop-shadow-[4px_4px_0_#435a74] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] lg:drop-shadow-[6px_6px_0_#435a74] xl:text-[6rem]'>
              SATANG
            </h1>
            <h2 className='mb-4 whitespace-nowrap font-["Press_Start_2P"] text-sm font-bold tracking-widest text-white drop-shadow-[3px_3px_0_#435a74] sm:text-lg md:text-xl lg:mb-8 lg:text-2xl lg:tracking-[0.2em] lg:drop-shadow-[4px_4px_0_#435a74] xl:text-3xl'>
              FULL STACK <br className='lg:hidden' />
              DEVELOPER
            </h2>
            <p className='mb-8 max-w-xl font-["Press_Start_2P"] text-[8px] leading-[2] text-white drop-shadow-[2px_2px_0_#222635] sm:text-[10px] md:text-[12px] lg:text-[14px] lg:leading-[2]'>
              PASSIONATELY CRAFTING DIGITAL EXPERIENCES.
              <br />
              AVAILABLE FOR NEW VENTURES.
            </p>

            <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start lg:gap-8'>
              <button className='pixel-btn text-[12px] md:text-[14px]'>
                <svg className='pixel-icon' width='16' height='22' viewBox='0 0 11 16' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                  <path fill='#222635' d='M0,0 h1 v16 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h2 v-1 h1 v-3 h-1 v-1 h-1 v-1 h1 v-1 h1 v-1 h1 v-6 h-1 v-1 h-3 v-1 h-4 v1 h-1 v-1 h-1 v-1 z' />
                  <path fill='#ffffff' d='M1,1 h1 v14 h1 v-2 h1 v1 h1 v1 h2 v-1 h1 v-3 h-1 v-1 h-1 v-1 h1 v-1 h1 v-5 h-2 v-1 h-3 v1 h-1 z' />
                </svg>
                VIEW PROJECTS
              </button>
              <button className='pixel-btn text-[12px] md:text-[14px]'>
                <svg className='pixel-icon' width='22' height='16' viewBox='0 0 10 7' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
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
                  <div className='absolute left-[8%] top-[38%] animate-pulse font-["Press_Start_2P"] text-[10px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[12px]'>
                    FRONTEND
                  </div>
                  <div className='absolute right-[0%] top-[30%] animate-pulse font-["Press_Start_2P"] text-[10px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[12px]'>
                    BACKEND
                  </div>
                  <div className='absolute bottom-[18%] right-[22%] animate-pulse font-["Press_Start_2P"] text-[10px] text-white drop-shadow-[2px_2px_0_#222635] xl:text-[12px]'>
                    DATABASE
                  </div>
                </>
              )}

              {/* Floating Coin 1 (Top Center) */}
              <div
                className='absolute right-[35%] top-[5%] z-30 animate-[bounce_2.5s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[4px_4px_0_rgba(147,99,22,0.8)] md:right-[38%] md:top-[8%] lg:right-[40%] lg:top-[5%]'
                style={{ animationDelay: '0s' }}>
                <svg width='32' height='32' viewBox='0 0 16 16' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
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
                <svg width='24' height='24' viewBox='0 0 16 16' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
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
                <svg width='28' height='28' viewBox='0 0 16 16' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
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
        <div className='absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-4 z-40'>
          <span className='font-["Press_Start_2P"] text-[12px] md:text-[16px] text-white drop-shadow-[2px_2px_0_#222635]'>SCROLL</span>
          <svg className='pixel-icon' width='32' height='32' viewBox='0 0 16 16' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
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
        <div className='pixel-divider border-t-4 border-b-4 border-[#222635]' />

        {/* About Section */}
        <section id='about' className='mx-auto max-w-5xl px-6 py-20'>
          <h2 className="mb-4 inline-block font-['Press_Start_2P'] text-[16px] text-[#2a2a3a] before:text-[#e85090] before:content-['>_'] md:text-[24px]">
            ABOUT ME
          </h2>
          <p className="mb-12 pl-4 font-['Press_Start_2P'] text-[10px] text-[#6a6050]">FULL STACK DEVELOPER LEVEL 99</p>

          <div className='pixel-card mb-8 bg-white p-6 border-b-[6px] border-r-[6px] border-[#a8a090]'>
            <h3 className="mb-6 border-b-2 border-dashed border-[#d0c8b8] pb-4 font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">CHARACTER STATS</h3>
            <p className="font-['Press_Start_2P'] text-[10px] leading-[2.5] text-[#555040]">
              HELLO! I'M SATANG, A PIXEL ART LOVING DEVELOPER FOCUSED ON CREATING IMMERSIVE WEB EXPERIENCES. WITH DEEP
              TECHNICAL SKILLS ACROSS THE ENTIRE STACK, I BUILD APPLICATIONS THAT ARE AS FUNCTIONALLY ROBUST AS THEY ARE
              VISUALLY STRIKING. I CRAFT SCALABLE BACKENDS AND BEAUTIFUL FRONTENDS CAPABLE OF HANDLING ANY QUEST.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
            <div className='pixel-card bg-[#faf6ee] p-5 text-center transition-transform hover:-translate-y-2 border-b-[4px] border-r-[4px] border-[#a8a090]'>
              <span className="mb-3 block font-['Press_Start_2P'] text-[24px] text-[#e85090]">8+</span>
              <span className="font-['Press_Start_2P'] text-[8px] text-[#888070]">YEARS EXP</span>
            </div>
            <div className='pixel-card bg-[#faf6ee] p-5 text-center transition-transform hover:-translate-y-2 border-b-[4px] border-r-[4px] border-[#a8a090]'>
              <span className="mb-3 block font-['Press_Start_2P'] text-[24px] text-[#3388dd]">50</span>
              <span className="font-['Press_Start_2P'] text-[8px] text-[#888070]">PROJECTS</span>
            </div>
            <div className='pixel-card bg-[#faf6ee] p-5 text-center transition-transform hover:-translate-y-2 border-b-[4px] border-r-[4px] border-[#a8a090]'>
              <span className="mb-3 block font-['Press_Start_2P'] text-[24px] text-[#e8a020]">100%</span>
              <span className="font-['Press_Start_2P'] text-[8px] text-[#888070]">COMMITMENT</span>
            </div>
            <div className='pixel-card bg-[#faf6ee] p-5 text-center transition-transform hover:-translate-y-2 border-b-[4px] border-r-[4px] border-[#a8a090]'>
              <span className="mb-3 block font-['Press_Start_2P'] text-[24px] text-[#44bb44]">∞</span>
              <span className="font-['Press_Start_2P'] text-[8px] text-[#888070]">COFFEE</span>
            </div>
          </div>
        </section>

        <div className='mx-auto w-[90%] border-t-4 border-dashed border-[#d8d0c0]' />

        {/* Skills Section */}
        <section id='skills' className='mx-auto max-w-5xl px-6 py-20'>
          <h2 className="mb-4 inline-block font-['Press_Start_2P'] text-[16px] text-[#2a2a3a] before:text-[#3388dd] before:content-['>_'] md:text-[24px]">
            SKILL TREE
          </h2>
          <p className="mb-12 pl-4 font-['Press_Start_2P'] text-[10px] text-[#6a6050]">
            MASTERED ABILITIES & TECHNOLOGIES
          </p>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className='pixel-card bg-white p-6 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="mb-4 flex justify-between font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">
                <span>FRONTEND</span>
                <span className='text-[#e85090]'>90%</span>
              </div>
              <div className='skill-bar-track w-full'>
                <div className='skill-bar-fill fe w-[90%]' />
              </div>
            </div>

            <div className='pixel-card bg-white p-6 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="mb-4 flex justify-between font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">
                <span>BACKEND</span>
                <span className='text-[#3388dd]'>85%</span>
              </div>
              <div className='skill-bar-track w-full'>
                <div className='skill-bar-fill be w-[85%]' />
              </div>
            </div>

            <div className='pixel-card bg-white p-6 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="mb-4 flex justify-between font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">
                <span>DATABASE</span>
                <span className='text-[#e8a020]'>80%</span>
              </div>
              <div className='skill-bar-track w-full'>
                <div className='skill-bar-fill db w-[80%]' />
              </div>
            </div>

            <div className='pixel-card bg-white p-6 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="mb-4 flex justify-between font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">
                <span>DEVOPS</span>
                <span className='text-[#44bb44]'>70%</span>
              </div>
              <div className='skill-bar-track w-full'>
                <div className='skill-bar-fill dv w-[70%]' />
              </div>
            </div>
          </div>
        </section>

        <div className='mx-auto w-[90%] border-t-4 border-dashed border-[#d8d0c0]' />

        {/* Projects Section */}
        <section id='projects' className='mx-auto max-w-5xl px-6 py-20'>
          <h2 className="mb-4 inline-block font-['Press_Start_2P'] text-[16px] text-[#2a2a3a] before:text-[#e8a020] before:content-['>_'] md:text-[24px]">
            INVENTORY
          </h2>
          <p className="mb-12 pl-4 font-['Press_Start_2P'] text-[10px] text-[#6a6050]">EQUIPPED ITEMS & CREATIONS</p>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='pixel-card flex cursor-pointer flex-col bg-white p-0 transition-transform hover:-translate-y-2 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="flex h-40 w-full items-center justify-center border-b-4 border-[#222635] bg-[#3a3a4a] font-['Press_Start_2P'] text-[40px] text-[#ffffff40]">
                ?
              </div>
              <div className='flex-1 p-5'>
                <h3 className="mb-4 font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">E-COMMERCE</h3>
                <div className='flex flex-wrap gap-2'>
                  <span className="inline-block border-2 border-[#d0c8b8] bg-[#f0ece4] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] text-[#6a6050]">
                    NEXT.JS
                  </span>
                  <span className="inline-block border-2 border-[#d0c8b8] bg-[#f0ece4] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] text-[#6a6050]">
                    STRIPE
                  </span>
                </div>
              </div>
            </div>

            <div className='pixel-card flex cursor-pointer flex-col bg-white p-0 transition-transform hover:-translate-y-2 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="flex h-40 w-full items-center justify-center border-b-4 border-[#222635] bg-[#2a4a3a] font-['Press_Start_2P'] text-[40px] text-[#ffffff40]">
                ?
              </div>
              <div className='flex-1 p-5'>
                <h3 className="mb-4 font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">DASHBOARD</h3>
                <div className='flex flex-wrap gap-2'>
                  <span className="inline-block border-2 border-[#d0c8b8] bg-[#f0ece4] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] text-[#6a6050]">
                    REACT
                  </span>
                  <span className="inline-block border-2 border-[#d0c8b8] bg-[#f0ece4] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] text-[#6a6050]">
                    NODE.JS
                  </span>
                </div>
              </div>
            </div>

            <div className='pixel-card flex cursor-pointer flex-col bg-white p-0 transition-transform hover:-translate-y-2 border-b-[6px] border-r-[6px] border-[#a8a090]'>
              <div className="flex h-40 w-full items-center justify-center border-b-4 border-[#222635] bg-[#4a2a3a] font-['Press_Start_2P'] text-[40px] text-[#ffffff40]">
                ?
              </div>
              <div className='flex-1 p-5'>
                <h3 className="mb-4 font-['Press_Start_2P'] text-[12px] text-[#2a2a3a]">PORTFOLIO V1</h3>
                <div className='flex flex-wrap gap-2'>
                  <span className="inline-block border-2 border-[#d0c8b8] bg-[#f0ece4] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] text-[#6a6050]">
                    HTML/CSS
                  </span>
                  <span className="inline-block border-2 border-[#d0c8b8] bg-[#f0ece4] px-2 py-1.5 font-['Press_Start_2P'] text-[8px] text-[#6a6050]">
                    JS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='pixel-divider border-t-4 border-b-4 border-[#222635]' />

        {/* Footer / Contact */}
        <footer id='contact' className='bg-[#2a2a3a] pb-12 pt-20 text-center text-white'>
          <h2 className="mb-12 font-['Press_Start_2P'] text-xl drop-shadow-[4px_4px_0_#000] md:text-3xl">
            CONTACT ME
          </h2>
          <div className='mb-16 flex justify-center gap-4'>
            <button className='pixel-btn text-[14px] hover:-translate-y-1 hover:shadow-lg'>
              <svg className='pixel-icon' width='22' height='16' viewBox='0 0 10 7' style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
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
