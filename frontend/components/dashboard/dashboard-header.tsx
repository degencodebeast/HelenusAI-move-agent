"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        {showSearch ? (
          <div className="flex-1 md:max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-[300px]" />
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowSearch(!showSearch)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

