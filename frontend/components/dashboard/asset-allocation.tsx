"use client"

import { ErrorBoundary } from 'react-error-boundary'
import { ChartComponents, ChartContainer } from "@/components/ui/chart-components"

const data = [
  { name: "Bitcoin", value: 45, color: "#FF9F00" },
  { name: "Ethereum", value: 25, color: "#3C78DB" },
  { name: "Solana", value: 15, color: "#00C48C" },
  { name: "Cardano", value: 10, color: "#0066A5" },
  { name: "Others", value: 5, color: "#1E2659" },
]

function ChartErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-[250px] text-red-500">
      <p>Error loading chart: {error.message}</p>
    </div>
  )
}

export function AssetAllocation() {
  return (
    <div className="glass-card p-6 animate-fade-in opacity-0 animate-once stagger-1">
      <h3 className="text-xl font-semibold mb-6">Asset Allocation</h3>

      <div className="flex flex-col md:flex-row items-center">
        <ErrorBoundary FallbackComponent={ChartErrorFallback}>
          <ChartContainer className="w-full md:w-1/2 h-[250px]">
            <ChartComponents.PieChart>
              <ChartComponents.Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <ChartComponents.Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </ChartComponents.Pie>
              <ChartComponents.Tooltip
                formatter={(value: number) => [`${value}%`, "Allocation"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <ChartComponents.Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value: string) => <span className="text-sm">{value}</span>}
              />
            </ChartComponents.PieChart>
          </ChartContainer>
        </ErrorBoundary>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <div className="space-y-4">
            {data.map((asset, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }} />
                  <span className="text-sm font-medium">{asset.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold">{asset.value}%</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full ml-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${asset.value}%`,
                        backgroundColor: asset.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="text-brand-blue text-sm font-medium mt-6 hover:underline">Adjust Allocation</button>
        </div>
      </div>
    </div>
  )
}

