"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const dummyData = [
  { name: "Jan", value: 24000 },
  { name: "Feb", value: 26000 },
  { name: "Mar", value: 25000 },
  { name: "Apr", value: 28000 },
  { name: "May", value: 29000 },
  { name: "Jun", value: 32000 },
  { name: "Jul", value: 34000 },
  { name: "Aug", value: 36000 },
  { name: "Sep", value: 39000 },
  { name: "Oct", value: 42000 },
  { name: "Nov", value: 40000 },
  { name: "Dec", value: 42500 },
]

const timeFilters = ["1D", "1W", "1M", "3M", "1Y", "All"]

export function PortfolioChart() {
  const [activeFilter, setActiveFilter] = useState("1Y")

  return (
    <div className="glass-card p-6 mb-8 animate-fade-in opacity-0 animate-once">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Portfolio Performance</h3>
          <p className="text-sm text-brand-darkGray/70">Track your investment growth over time</p>
        </div>
        <div className="flex bg-brand-gray rounded-lg p-1 mt-4 sm:mt-0">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                activeFilter === filter
                  ? "bg-white text-brand-navy shadow-sm"
                  : "text-brand-darkGray/70 hover:text-brand-darkGray"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066A5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0066A5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
              labelStyle={{ color: "#1f2937", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0066A5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

