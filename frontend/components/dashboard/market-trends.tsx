import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const trends = [
  {
    name: "Bitcoin",
    price: "$27,345.12",
    change: "+5.2%",
    direction: "up",
  },
  {
    name: "Ethereum",
    price: "$1,845.32",
    change: "+3.8%",
    direction: "up",
  },
  {
    name: "Solana",
    price: "$24.56",
    change: "-2.1%",
    direction: "down",
  },
]

export function MarketTrends() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Market Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((trend) => (
            <div key={trend.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{trend.name}</p>
                <p className="text-xs text-muted-foreground">{trend.price}</p>
              </div>
              <div className={`flex items-center ${trend.direction === "up" ? "text-green-500" : "text-red-500"}`}>
                {trend.direction === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                <span className="text-sm">{trend.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

