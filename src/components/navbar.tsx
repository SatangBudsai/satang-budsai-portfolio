'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Remove scrolled state as per user request to never change

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-["Press_Start_2P"] bg-transparent py-4`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Boxed 'S' Logo */}
            <span className={`text-[14px] md:text-[18px] font-bold cursor-pointer transition-colors text-white drop-shadow-[2px_2px_0_#000] border-2 border-white/50 px-2.5 py-1.5 flex items-center justify-center`}>
              S
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
               {/* Active State Underline for HOME */}
               <a href="#home" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524] border-b-2 border-white pb-1`}>HOME</a>
               <a href="#about" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]`}>ABOUT</a>
               <a href="#projects" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]`}>PROJECTS</a>
               <a href="#contact" className={`text-[10px] md:text-[12px] hover:-translate-y-1 transition-transform text-white drop-shadow-[2px_2px_0_#000] hover:text-[#f5a524]`}>CONTACT</a>
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
            <a href="#home" className="text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">HOME</a>
            <a href="#about" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">ABOUT</a>
            <a href="#projects" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">PROJECTS</a>
            <a href="#contact" className="text-white hover:text-[#f5a524] block px-3 py-2 text-[14px] drop-shadow-[2px_2px_0_#000]">CONTACT</a>
          </div>
        </div>
      )}
    </nav>
  )
}
