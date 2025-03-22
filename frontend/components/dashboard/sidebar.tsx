"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { Home, LineChart, MessageSquare, CreditCard, Settings, Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active: boolean
  onClick?: () => void
}

const NavItem = ({ icon, label, href, active, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
        active ? "bg-white text-brand-navy shadow-sm" : "text-white/90 hover:bg-white/10",
      )}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActiveRoute = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <LineChart size={20} />, label: "Portfolio", href: "/dashboard/portfolio" },
    { icon: <MessageSquare size={20} />, label: "AI Chat", href: "/dashboard/chat" },
    { icon: <CreditCard size={20} />, label: "Transactions", href: "/dashboard/transactions" },
    { icon: <Settings size={20} />, label: "Settings", href: "/dashboard/settings" },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-brand-navy p-2 rounded-lg text-white shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-gradient-premium w-72 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="mb-8">
            <Logo className="!text-white" />
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isActiveRoute(item.href)}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <NavItem
              icon={<LogOut size={20} />}
              label="Logout"
              href="/logout"
              active={false}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </aside>

      {/* Spacer div for large screens */}
      <div className="hidden lg:block w-72" />
    </>
  )
}

