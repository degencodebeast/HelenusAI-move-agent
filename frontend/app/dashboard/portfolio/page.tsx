import { PortfolioHeader } from "@/components/dashboard/portfolio/portfolio-header"
import { PortfolioTable } from "@/components/dashboard/portfolio/portfolio-table"
import { PortfolioCharts } from "@/components/dashboard/portfolio/portfolio-charts"

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
      <PortfolioHeader />
      <PortfolioCharts />
      <PortfolioTable />
    </div>
  )
}

