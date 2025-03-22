"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link font-medium">
              Home
            </Link>
            <Link href="/features" className="nav-link font-medium">
              Features
            </Link>
            <Link href="/pricing" className="nav-link font-medium">
              Pricing
            </Link>
            <Link href="/about" className="nav-link font-medium">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="secondary-button py-2 px-4">
              Login
            </Link>
            <Link href="/register" className="premium-button py-2 px-4">
              Register
            </Link>
          </div>

          <button className="md:hidden icon-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-white/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          <Link href="/" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/features" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/about" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>

          <div className="flex flex-col w-full space-y-4 mt-8">
            <Link
              href="/login"
              className="secondary-button w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="premium-button w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

