'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Sky moves very slowly
  const ySky = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Clouds move slowly horizontally and vertically
  const yCloudLeft = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const xCloudLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const yCloudRight = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const xCloudRight = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  // Block moves up faster than sky
  const yBlock = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // Text content moving up slightly faster than block
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '70%'])

  return (
    <div ref={containerRef} className='relative h-[200vh] w-full overflow-hidden bg-[#78A7D0]'>
      {/* Sky Background */}
      <motion.div className='fixed inset-0 z-0 h-screen w-full' style={{ y: ySky }}>
        <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-bottom bg-no-repeat" />
      </motion.div>

      {/* Cloud Left */}
      <motion.div
        className='pointer-events-none fixed inset-0 z-10 h-screen w-full'
        style={{ y: yCloudLeft, x: xCloudLeft }}>
        <div className="absolute inset-0 bg-[url('/images/cloud-left.png')] bg-cover bg-bottom bg-no-repeat opacity-90 mix-blend-screen" />
      </motion.div>

      {/* Cloud Right */}
      <motion.div
        className='pointer-events-none fixed inset-0 z-10 h-screen w-full'
        style={{ y: yCloudRight, x: xCloudRight }}>
        <div className="absolute inset-0 bg-[url('/images/cloud-right.png')] bg-cover bg-bottom bg-no-repeat opacity-90 mix-blend-screen" />
      </motion.div>

      {/* Main Content Layout Container */}
      <div className='pointer-events-none fixed inset-0 top-16 z-20 mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[1700px] flex-col items-center justify-center px-6 lg:flex-row lg:justify-between lg:px-20'>
        {/* Text Section */}
        <motion.div
          className='pointer-events-auto z-30 flex w-full flex-1 flex-col items-center justify-center pt-12 text-center lg:items-start lg:pt-0 lg:text-left'
          style={{ y: yText }}>
          <h1 className='mb-4 whitespace-nowrap text-[3rem] font-bold leading-none text-white drop-shadow-[4px_4px_0_#435a74] sm:text-6xl md:text-7xl lg:text-8xl lg:drop-shadow-[8px_8px_0_#435a74] xl:text-[8rem]'>
            SATANG
          </h1>
          <h2 className='mb-4 whitespace-nowrap text-xl font-bold tracking-widest text-white drop-shadow-[3px_3px_0_#435a74] sm:text-2xl md:text-3xl lg:mb-8 lg:text-4xl lg:tracking-[0.2em] lg:drop-shadow-[5px_5px_0_#435a74] xl:text-5xl'>
            FULL STACK <br className='lg:hidden' />
            DEVELOPER
          </h2>
          <p className='text-md mb-8 max-w-xl font-semibold leading-relaxed text-white drop-shadow-[2px_2px_0_#222635] sm:text-lg md:text-xl lg:text-2xl lg:leading-[1.6]'>
            Passionately crafting digital experiences.
            <br />
            Available for new ventures.
          </p>

          <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start lg:gap-8'>
            <button className='pixel-btn'>
              {/* Mouse pointer icon from reference */}
              <svg
                className='pixel-icon'
                width='16'
                height='22'
                viewBox='0 0 11 16'
                style={{ shapeRendering: 'crispEdges', fillRule: 'evenodd' }}>
                <path
                  fill='#222635'
                  d='M0,0 h1 v16 h1 v-1 h1 v-1 h1 v1 h1 v1 h1 v1 h2 v-1 h1 v-3 h-1 v-1 h-1 v-1 h1 v-1 h1 v-1 h1 v-6 h-1 v-1 h-3 v-1 h-4 v1 h-1 v-1 h-1 v-1 z'
                />
                <path
                  fill='#ffffff'
                  d='M1,1 h1 v14 h1 v-2 h1 v1 h1 v1 h2 v-1 h1 v-3 h-1 v-1 h-1 v-1 h1 v-1 h1 v-5 h-2 v-1 h-3 v1 h-1 z'
                />
              </svg>
              VIEW PROJECTS
            </button>
            <button className='pixel-btn'>
              {/* Mail icon from reference */}
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
        </motion.div>

        {/* 3D Block Section */}
        <motion.div
          className='pointer-events-none relative right-0 z-20 mt-2 flex h-[45vh] w-full flex-1 items-center justify-center lg:mt-0 lg:h-full lg:justify-end'
          style={{ y: yBlock }}>
          {/* Main 3D Block Image */}
          <div
            className='relative h-full w-full max-w-[850px] bg-contain bg-center bg-no-repeat lg:bg-right'
            style={{ backgroundImage: `url('/images/${isMobile ? 'block-mobile.png' : 'block.png'}')` }}>
            {/* Floating Coin Animation inside the block container */}
            <div className='absolute right-[30%] top-[10%] z-30 animate-[bounce_2s_infinite_ease-in-out] text-[#f5a524] drop-shadow-[5px_5px_0_rgba(147,99,22,0.8)] md:right-[35%] md:top-[10%] lg:right-[35%] lg:top-[12%] xl:right-[40%]'>
              <svg
                width='48'
                height='48'
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

      {/* Additional content spacer to allow scrolling */}
      <div className='absolute top-[100vh] z-30 w-full border-t-8 border-[#222635] bg-[#1e293b] shadow-[0_-15px_40px_rgba(0,0,0,0.6)]'>
        <div className='mx-auto max-w-7xl px-4 py-32 text-center text-white'>
          <h2 className='mb-8 text-4xl font-bold text-white drop-shadow-[4px_4px_0_#435a74] md:text-5xl'>
            MORE PROJECTS
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-300 drop-shadow-[2px_2px_0_#000] md:text-2xl'>
            Scroll deeply to discover pixel art wonders... (Coming Soon)
          </p>
        </div>
        <div className='h-64' />
      </div>
    </div>
  )
}
