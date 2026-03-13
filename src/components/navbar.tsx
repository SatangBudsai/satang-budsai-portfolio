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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-["Press_Start_2P"] ${scrolled ? 'bg-[#222635]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`text-[16px] md:text-[20px] font-bold cursor-pointer transition-colors text-white drop-shadow-[2px_2px_0_#000]`}>
              S
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
               <a href="#" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]`}>HOME</a>
               <a href="#about" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]`}>ABOUT</a>
               <a href="#projects" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]`}>PROJECTS</a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-white hover:scale-110 transition-transform focus:outline-none drop-shadow-[2px_2px_0_#000]`}
            >
              <Icon icon={menuOpen ? "pixelarticons:close" : "pixelarticons:menu"} width="32" height="32" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#222635]/95 backdrop-blur-md border-t-4 border-[#1a1c29]">
          <div className="px-4 py-8 space-y-6 text-center">
            <a href="#" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">HOME</a>
            <a href="#about" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">ABOUT</a>
            <a href="#projects" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">PROJECTS</a>
          </div>
        </div>
      )}
    </nav>
  )
}
