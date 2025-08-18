import type React from "react"
import Link from "next/link"

export function Footer(): React.ReactElement {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>© {year} Plant Species Identifier.</span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>
        <nav className="flex items-center gap-3">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="opacity-50">|</span>
          <Link href="/identify?mode=upload" className="hover:text-foreground">Identify</Link>
          <span className="opacity-50">|</span>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <span className="opacity-50">|</span>
          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <span className="opacity-50">|</span>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
      </div>
    </footer>
  )
} 