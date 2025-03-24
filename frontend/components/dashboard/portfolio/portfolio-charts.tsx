"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorBoundary } from 'react-error-boundary'
import { ChartComponents, ChartContainer } from "@/components/ui/chart-components"

const performanceData = [
  { name: "Jan", value: 20000 },
  { name: "Feb", value: 18000 },
  { name: "Mar", value: 22000 },
  { name: "Apr", value: 21000 },
  { name: "May", value: 23000 },
  { name: "Jun", value: 24000 },
  { name: "Jul", value: 24856 },
]

const allocationData = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 15 },
  { name: "ADA", value: 5 },
  { name: "DOT", value: 3 },
  { name: "LINK", value: 2 },
]

function ChartErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-[300px] text-red-500">
      <p>Error loading chart: {error.message}</p>
    </div>
  )
}

export function PortfolioCharts() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Portfolio Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="pt-4">
            <ErrorBoundary FallbackComponent={ChartErrorFallback}>
              <ChartContainer>
                <ChartComponents.AreaChart
                  data={performanceData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <ChartComponents.CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <ChartComponents.XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartComponents.YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `$${value}`}
                  />
                  <ChartComponents.Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [`$${value}`, "Portfolio Value"]}
                  />
                  <ChartComponents.Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary)/0.2)"
                  />
                </ChartComponents.AreaChart>
              </ChartContainer>
            </ErrorBoundary>
          </TabsContent>
          <TabsContent value="allocation" className="pt-4">
            <ErrorBoundary FallbackComponent={ChartErrorFallback}>
              <ChartContainer>
                <ChartComponents.BarChart
                  data={allocationData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <ChartComponents.CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <ChartComponents.XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartComponents.YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `${value}%`}
                  />
                  <ChartComponents.Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [`${value}%`, "Allocation"]}
                  />
                  <ChartComponents.Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </ChartComponents.BarChart>
              </ChartContainer>
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

