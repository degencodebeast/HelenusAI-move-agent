import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "buy",
    asset: "Bitcoin",
    amount: "0.05 BTC",
    value: "$2,145.00",
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "sell",
    asset: "Ethereum",
    amount: "1.2 ETH",
    value: "$3,210.30",
    date: "Yesterday",
  },
  {
    id: 3,
    type: "buy",
    asset: "Solana",
    amount: "10 SOL",
    value: "$1,050.00",
    date: "3 days ago",
  },
  {
    id: 4,
    type: "buy",
    asset: "Cardano",
    amount: "500 ADA",
    value: "$475.00",
    date: "1 week ago",
  },
]

export function RecentTransactions() {
  return (
    <div className="glass-card p-6 animate-fade-in opacity-0 animate-once stagger-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <button className="text-brand-blue text-sm font-medium hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 text-left text-xs font-medium text-brand-darkGray/70">Type</th>
              <th className="pb-3 text-left text-xs font-medium text-brand-darkGray/70">Asset</th>
              <th className="pb-3 text-left text-xs font-medium text-brand-darkGray/70">Amount</th>
              <th className="pb-3 text-left text-xs font-medium text-brand-darkGray/70">Value</th>
              <th className="pb-3 text-left text-xs font-medium text-brand-darkGray/70">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100">
                <td className="py-4">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      transaction.type === "buy" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "buy" ? (
                      <ArrowDownLeft size={16} className="text-green-600" />
                    ) : (
                      <ArrowUpRight size={16} className="text-red-600" />
                    )}
                  </div>
                </td>
                <td className="py-4">
                  <div className="font-medium">{transaction.asset}</div>
                </td>
                <td className="py-4 text-sm">{transaction.amount}</td>
                <td className="py-4 font-medium">{transaction.value}</td>
                <td className="py-4 text-sm text-brand-darkGray/70">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

