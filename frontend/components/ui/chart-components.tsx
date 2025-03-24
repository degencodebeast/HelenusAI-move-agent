"use client"

import dynamic from 'next/dynamic'
import { ComponentType, ReactNode } from 'react'

// Create empty placeholder components for SSR
const EmptyComponent = () => null

// Create dynamic imports for recharts components
const DynamicAreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading chart...</div>
})

const DynamicArea = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false })
const DynamicBarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false })
const DynamicBar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false })
const DynamicXAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const DynamicYAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const DynamicCartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false })
const DynamicTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const DynamicResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })
const DynamicPieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false })
const DynamicPie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false })
const DynamicCell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false })
const DynamicLegend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false })

// Create a wrapper with typed components
export const ChartComponents = {
  AreaChart: DynamicAreaChart as ComponentType<any>,
  Area: DynamicArea as ComponentType<any>,
  BarChart: DynamicBarChart as ComponentType<any>,
  Bar: DynamicBar as ComponentType<any>,
  XAxis: DynamicXAxis as ComponentType<any>,
  YAxis: DynamicYAxis as ComponentType<any>,
  CartesianGrid: DynamicCartesianGrid as ComponentType<any>,
  Tooltip: DynamicTooltip as ComponentType<any>,
  ResponsiveContainer: DynamicResponsiveContainer as ComponentType<any>,
  PieChart: DynamicPieChart as ComponentType<any>,
  Pie: DynamicPie as ComponentType<any>,
  Cell: DynamicCell as ComponentType<any>,
  Legend: DynamicLegend as ComponentType<any>,
}

// Wrapper component for charts that ensures client-side only rendering
interface ChartContainerProps {
  children: ReactNode;
  className?: string;
  height?: string | number;
}

export function ChartContainer({ children, className = "h-[300px]", height = "100%" }: ChartContainerProps) {
  return (
    <div className={className}>
      <DynamicResponsiveContainer width="100%" height={height}>
        {children}
      </DynamicResponsiveContainer>
    </div>
  )
} 