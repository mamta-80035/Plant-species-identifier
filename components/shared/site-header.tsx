"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3">
          <Image
            src="/plant-logo.png"
            alt="Plant Species Identifier"
            width={32}
            height={32}
            className="rounded-sm"
            priority
          />
          <span className="font-semibold text-gray-800">Plant Species Identifier</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/identify?mode=upload" className="text-gray-600 hover:text-gray-900">Identify</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur-sm">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
            <Link href="/" className="text-gray-700 hover:text-gray-900" onClick={closeMobileMenu}>Home</Link>
            <Link href="/identify?mode=upload" className="text-gray-700 hover:text-gray-900" onClick={closeMobileMenu}>Identify</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900" onClick={closeMobileMenu}>About</Link>
            <Link href="/privacy" className="text-gray-700 hover:text-gray-900" onClick={closeMobileMenu}>Privacy</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900" onClick={closeMobileMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  )
}


