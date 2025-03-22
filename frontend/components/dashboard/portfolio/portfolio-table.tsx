import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const assets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    amount: "0.45 BTC",
    value: "$12,305.30",
    allocation: "45%",
    change: "+5.2%",
    direction: "up",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    amount: "4.32 ETH",
    value: "$7,971.78",
    allocation: "30%",
    change: "+3.8%",
    direction: "up",
  },
  {
    name: "Solana",
    symbol: "SOL",
    amount: "156.78 SOL",
    value: "$3,850.52",
    allocation: "15%",
    change: "-2.1%",
    direction: "down",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    amount: "2,450.45 ADA",
    value: "$1,225.23",
    allocation: "5%",
    change: "+1.3%",
    direction: "up",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    amount: "125.34 DOT",
    value: "$751.78",
    allocation: "3%",
    change: "-0.8%",
    direction: "down",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    amount: "78.23 LINK",
    value: "$625.84",
    allocation: "2%",
    change: "+4.5%",
    direction: "up",
  },
]

export function PortfolioTable() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Allocation</TableHead>
              <TableHead>24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.symbol}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{asset.name}</span>
                    <span className="text-xs text-muted-foreground">{asset.symbol}</span>
                  </div>
                </TableCell>
                <TableCell>{asset.amount}</TableCell>
                <TableCell>{asset.value}</TableCell>
                <TableCell>{asset.allocation}</TableCell>
                <TableCell>
                  <div className={`flex items-center ${asset.direction === "up" ? "text-green-500" : "text-red-500"}`}>
                    {asset.direction === "up" ? (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    )}
                    <span>{asset.change}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

