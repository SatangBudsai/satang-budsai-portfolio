'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-["Press_Start_2P"] ${scrolled ? 'bg-[#78A7D0]/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className={`text-[16px] md:text-[20px] font-bold cursor-pointer transition-colors text-white drop-shadow-[2px_2px_0_#435a74]`}>
              S
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
               <a href="#" className={`text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#435a74] hover:text-[#f5a524]`}>HOME</a>
               <a href="#about" className={`text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#435a74] hover:text-[#f5a524]`}>ABOUT</a>
               <a href="#projects" className={`text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#435a74] hover:text-[#f5a524]`}>PROJECTS</a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-white hover:scale-110 transition-transform focus:outline-none drop-shadow-[2px_2px_0_#435a74]`}
            >
              <Icon icon={menuOpen ? "pixelarticons:close" : "pixelarticons:menu"} width="28" height="28" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#78A7D0]/95 backdrop-blur-md border-t-4 border-[#435a74]">
          <div className="px-4 py-6 space-y-4 text-center">
            <a href="#" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#435a74]">HOME</a>
            <a href="#about" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#435a74]">ABOUT</a>
            <a href="#projects" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#435a74]">PROJECTS</a>
          </div>
        </div>
      )}
    </nav>
  )
}
