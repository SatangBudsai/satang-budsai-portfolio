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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-['Silkscreen'] ${scrolled ? 'bg-[#222635]/95 backdrop-blur-sm border-b-4 border-[#222635] shadow-lg' : 'bg-transparent text-[#222635]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className={`text-3xl font-bold cursor-pointer transition-colors ${scrolled ? 'text-white' : 'text-[#222635]'}`}>
              S
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
               <a href="#" className={`text-xl hover:-translate-y-1 transition-transform ${scrolled ? 'text-white drop-shadow-[2px_2px_0_#435a74]' : 'text-[#222635] drop-shadow-[2px_2px_0_white]'} hover:text-[#6a829f]`}>HOME</a>
               <a href="#" className={`text-xl hover:-translate-y-1 transition-transform ${scrolled ? 'text-white drop-shadow-[2px_2px_0_#435a74]' : 'text-[#222635] drop-shadow-[2px_2px_0_white]'} hover:text-[#6a829f]`}>ABOUT</a>
               <a href="#" className={`text-xl hover:-translate-y-1 transition-transform ${scrolled ? 'text-white drop-shadow-[2px_2px_0_#435a74]' : 'text-[#222635] drop-shadow-[2px_2px_0_white]'} hover:text-[#6a829f]`}>PROJECTS</a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled ? 'text-white' : 'text-[#222635] bg-white/50 backdrop-blur-sm'} hover:scale-110 transition-transform focus:outline-none`}
            >
              <Icon icon={menuOpen ? "pixelarticons:close" : "pixelarticons:menu"} width="28" height="28" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#222635] border-t-4 border-[#435a74]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <a href="#" className="text-white hover:bg-[#6a829f] hover:text-white block px-3 py-2 rounded-md text-xl">HOME</a>
            <a href="#" className="text-white hover:bg-[#6a829f] hover:text-white block px-3 py-2 rounded-md text-xl">ABOUT</a>
            <a href="#" className="text-white hover:bg-[#6a829f] hover:text-white block px-3 py-2 rounded-md text-xl">PROJECTS</a>
          </div>
        </div>
      )}
    </nav>
  )
}
