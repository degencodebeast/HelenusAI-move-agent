import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

export function PortfolioValue() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$24,856.78</div>
        <div className="flex items-center mt-1">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          <span className="text-xs text-green-500">+12.4%</span>
          <span className="text-xs text-muted-foreground ml-1">vs last week</span>
        </div>
      </CardContent>
    </Card>
  )
}

