import { TrendingUp, DollarSign, AlertCircle } from "lucide-react"

export function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass-card p-6 animate-scale-in opacity-0 animate-once">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-brand-darkGray/70 text-sm">Total Portfolio Value</p>
            <h3 className="text-3xl font-semibold mt-1">$42,384.75</h3>
          </div>
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp size={24} className="text-green-600" />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-green-600 font-medium text-sm mr-2">+5.6%</span>
          <span className="text-xs text-brand-darkGray/60">Last 30 days</span>
        </div>
      </div>

      <div className="glass-card p-6 animate-scale-in opacity-0 animate-once stagger-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-brand-darkGray/70 text-sm">Today's Profit/Loss</p>
            <h3 className="text-3xl font-semibold mt-1">+$783.20</h3>
          </div>
          <div className="bg-green-100 p-2 rounded-lg">
            <DollarSign size={24} className="text-green-600" />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-green-600 font-medium text-sm mr-2">+1.8%</span>
          <span className="text-xs text-brand-darkGray/60">Since yesterday</span>
        </div>
      </div>

      <div className="glass-card p-6 animate-scale-in opacity-0 animate-once stagger-2">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-brand-darkGray/70 text-sm">Risk Level</p>
            <h3 className="text-3xl font-semibold mt-1">Moderate</h3>
          </div>
          <div className="bg-amber-100 p-2 rounded-lg">
            <AlertCircle size={24} className="text-amber-600" />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-amber-600 font-medium text-sm mr-2">Balanced</span>
          <span className="text-xs text-brand-darkGray/60">Based on portfolio diversity</span>
        </div>
      </div>
    </div>
  )
}

