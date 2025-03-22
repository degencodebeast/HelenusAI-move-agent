"use client"

import { useState } from "react"
import { Bell, Search, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 w-full px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-brand-navy">{title}</h1>

        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="hidden md:flex items-center bg-brand-gray rounded-lg px-3 py-2">
            <Search size={18} className="text-brand-darkGray/60 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-48" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="relative icon-button" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} className="text-brand-darkGray" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-100 z-50">
                <h4 className="font-semibold mb-2">Recent Notifications</h4>
                <div className="divide-y">
                  <div className="py-3">
                    <p className="text-sm font-medium">Portfolio Alert</p>
                    <p className="text-xs text-brand-darkGray/70">Bitcoin increased by 5% in the last hour</p>
                    <p className="text-xs text-brand-darkGray/50 mt-1">10 min ago</p>
                  </div>
                  <div className="py-3">
                    <p className="text-sm font-medium">New Feature</p>
                    <p className="text-xs text-brand-darkGray/70">Check out our new AI prediction tool</p>
                    <p className="text-xs text-brand-darkGray/50 mt-1">2 hours ago</p>
                  </div>
                  <div className="py-3">
                    <p className="text-sm font-medium">Transaction Complete</p>
                    <p className="text-xs text-brand-darkGray/70">Your purchase of ETH has been completed</p>
                    <p className="text-xs text-brand-darkGray/50 mt-1">Yesterday</p>
                  </div>
                </div>
                <button className="text-brand-blue text-sm font-medium w-full text-center mt-2">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-brand-darkGray/70">Premium Plan</p>
            </div>
            <ChevronDown size={16} className="ml-2 text-brand-darkGray/70" />
          </div>
        </div>
      </div>
    </header>
  )
}

