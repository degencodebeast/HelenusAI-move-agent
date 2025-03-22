import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Filter, Plus, RefreshCw } from "lucide-react"

export function PortfolioHeader() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Value</p>
              <p className="text-2xl font-bold">$24,856.78</p>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span className="text-sm">+12.4%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Assets</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="rounded-full p-2 bg-muted">
              <Plus className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Rebalance</p>
              <p className="text-2xl font-bold">7 days ago</p>
            </div>
            <div className="rounded-full p-2 bg-muted">
              <RefreshCw className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Risk Level</p>
              <p className="text-2xl font-bold">Moderate</p>
            </div>
            <div className="rounded-full p-2 bg-muted">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

