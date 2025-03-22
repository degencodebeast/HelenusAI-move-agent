import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-brand-gray/30 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">{children}</div>
    </div>
  )
}

