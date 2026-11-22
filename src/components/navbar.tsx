'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Remove scrolled state as per user request to never change

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-[100] bg-transparent py-4 font-["Press_Start_2P"] transition-all duration-300`}>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            {/* Boxed 'S' Logo */}
            <span
              className={`flex cursor-pointer items-center justify-center border-2 border-white/50 px-2.5 py-1.5 text-[14px] font-bold text-white drop-shadow-[2px_2px_0_#000] transition-colors md:text-[18px]`}>
              S
            </span>
          </div>

          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-12'>
              {/* Active State Underline for HOME */}
              <a
                href='#home'
                className={`border-b-2 border-white pb-1 text-[10px] text-white drop-shadow-[2px_2px_0_#000] transition-transform hover:-translate-y-1 hover:text-[#f5a524] md:text-[12px]`}>
                HOME
              </a>
              <a
                href='#about'
                className={`text-[10px] text-white drop-shadow-[2px_2px_0_#000] transition-transform hover:-translate-y-1 hover:text-[#f5a524] md:text-[12px]`}>
                ABOUT
              </a>
              <a
                href='#projects'
                className={`text-[10px] text-white drop-shadow-[2px_2px_0_#000] transition-transform hover:-translate-y-1 hover:text-[#f5a524] md:text-[12px]`}>
                PROJECTS
              </a>
              <a
                href='#contact'
                className={`text-[10px] text-white drop-shadow-[2px_2px_0_#000] transition-transform hover:-translate-y-1 hover:text-[#f5a524] md:text-[12px]`}>
                CONTACT
              </a>
            </div>
          </div>

          <div className='flex items-center md:hidden'>
            <Button
              variant='ghost'
              size='icon'
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`inline-flex items-center justify-center rounded-md p-2 text-white drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 focus:outline-none`}>
              <Icon icon={menuOpen ? 'pixelarticons:close' : 'pixelarticons:menu'} width='32' height='32' />
            </Button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className='border-t-4 border-[#1a1c29] bg-[#222635]/95 backdrop-blur-md md:hidden'>
          <div className='space-y-6 px-4 py-8 text-center'>
            <a href='#home' className='block px-3 py-2 text-[14px] text-[#f5a524] drop-shadow-[2px_2px_0_#000]'>
              HOME
            </a>
            <a
              href='#about'
              className='block px-3 py-2 text-[14px] text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]'>
              ABOUT
            </a>
            <a
              href='#projects'
              className='block px-3 py-2 text-[14px] text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]'>
              PROJECTS
            </a>
            <a
              href='#contact'
              className='block px-3 py-2 text-[14px] text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]'>
              CONTACT
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
