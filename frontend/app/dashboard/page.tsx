import { Header } from "@/components/dashboard/header"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { AssetAllocation } from "@/components/dashboard/asset-allocation"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { AIAssistant } from "@/components/dashboard/ai-assistant"

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 p-6">
        <PortfolioSummary />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PortfolioChart />
          <AssetAllocation />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <AIAssistant />
        </div>
      </main>
    </>
  )
}

