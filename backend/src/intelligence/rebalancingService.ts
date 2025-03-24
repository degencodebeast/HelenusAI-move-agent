import { AgentRuntime } from "move-agent-kit";
import { alloraService } from "../intelligence/alloraService";
import { moveAgentService } from "./moveAgentService";
import { 
  strategyEngine, 
  riskManager, 
  riskMonitor, 
  yieldOptimizer,
  wormhole 
} from "../strategy";

interface Asset {
  symbol: string;
  name: string;
  balance: string;
  price: string;
  value: string;
  allocation: string;
}

interface Portfolio {
  address: string;
  totalValue: string;
  assets: Record<string, Asset>;
}

interface RebalancingPlan {
  planId: string;
  address: string;
  currentAllocation: Record<string, Asset>;
  targetAllocation: Record<string, { symbol: string, target: string }>;
  requiredTrades: Array<{
    asset: string;
    action: "buy" | "sell";
    amount: string;
    currentAllocation: string;
    targetAllocation: string;
  }>;
}

interface RebalancingResult {
  success: boolean;
  planId: string;
  transactions: Array<{
    asset: string;
    action: "buy" | "sell";
    amount: string;
    txHash: string;
    status: string;
  }>;
}

// Risk profiles with asset allocations
const RISK_PROFILES = {
  low: {
    stablecoins: 0.60,
    bluechip: 0.30,
    altcoins: 0.10
  },
  medium: {
    stablecoins: 0.40,
    bluechip: 0.40,
    altcoins: 0.20
  },
  high: {
    stablecoins: 0.20,
    bluechip: 0.40,
    altcoins: 0.40
  }
};

// Asset categories
const ASSET_CATEGORIES = {
  stablecoins: ["USDC", "USDT", "DAI"],
  bluechip: ["APT", "BTC", "ETH"],
  altcoins: ["SOL", "AVAX", "DOT"]
};

export class RebalancingService {
  private runtime: AgentRuntime | null = null;
  private plans: Map<string, RebalancingPlan> = new Map();
  
  constructor() {}
  
  initialize(runtime: AgentRuntime) {
    this.runtime = runtime;
    console.log("Rebalancing service initialized with runtime");
  }
  
  async analyzePortfolio(address: string): Promise<Portfolio> {
    if (!this.runtime) {
      throw new Error("Runtime not initialized");
    }
    
    try {
      console.log(`Analyzing portfolio for address: ${address}`);
      
      // In a real implementation, we would:
      // 1. Fetch token balances from the blockchain
      // 2. Get current prices from market data
      // 3. Calculate value and allocation percentages
      
      // Placeholder implementation
      const mockAssets: Record<string, Asset> = {
        "APT": {
          symbol: "APT",
          name: "Aptos",
          balance: "1000",
          price: "10.50",
          value: "10500.00",
          allocation: "47.73"
        },
        "USDC": {
          symbol: "USDC",
          name: "USD Coin",
          balance: "8000",
          price: "1.00",
          value: "8000.00",
          allocation: "36.36"
        },
        "SOL": {
          symbol: "SOL",
          name: "Solana",
          balance: "100",
          price: "35.00",
          value: "3500.00",
          allocation: "15.91"
        }
      };
      
      // Calculate total value
      let totalValue = 0;
      Object.values(mockAssets).forEach(asset => {
        totalValue += parseFloat(asset.value);
      });
      
      return {
        address,
        totalValue: totalValue.toFixed(2),
        assets: mockAssets
      };
    } catch (error) {
      console.error("Error analyzing portfolio:", error);
      throw new Error("Failed to analyze portfolio");
    }
  }
  
  async calculateRebalancing(portfolio: any, riskTolerance: string = "medium"): Promise<any> {
    try {
      // Use the strategy engine to generate a rebalancing plan
      const plan = await strategyEngine.generateRebalancingPlan(portfolio, riskTolerance);
      
      // Get yield optimization recommendations
      const yieldRecommendations = await yieldOptimizer.optimizeYield(portfolio, riskTolerance);
      
      // Get risk assessment
      const riskAssessment = await riskManager.calculatePortfolioRisk(portfolio.assets);
      
      // Combine the results
      return {
        planId: plan.id,
        currentAllocation: plan.strategy.allocations.map(a => ({
          asset: a.asset,
          symbol: a.symbol,
          current: a.current * 100,
          target: a.target * 100
        })),
        requiredTrades: plan.actions,
        riskAssessment,
        yieldRecommendations,
        estimatedGasCost: plan.estimatedGasCost,
        expectedImprovement: plan.expectedImprovement
      };
    } catch (error) {
      console.error("Error calculating rebalancing:", error);
      throw error;
    }
  }
  
  async executeRebalancing(address: string, planId: string): Promise<RebalancingResult> {
    if (!this.runtime) {
      throw new Error("Runtime not initialized");
    }
    
    try {
      console.log(`Executing rebalancing plan ${planId} for address ${address}`);
      
      // Get the plan
      const plan = this.plans.get(planId);
      if (!plan) {
        throw new Error(`Rebalancing plan ${planId} not found`);
      }
      
      // Check address matches
      if (plan.address !== address) {
        throw new Error("Address mismatch");
      }
      
      // In a real implementation, we would execute each trade
      // using the moveAgentService to interact with the blockchain
      
      // Placeholder for executed transactions
      const transactions = plan.requiredTrades.map(trade => ({
        asset: trade.asset,
        action: trade.action,
        amount: trade.amount,
        txHash: `0x${Math.random().toString(16).substring(2, 42)}`,
        status: "confirmed"
      }));
      
      return {
        success: true,
        planId,
        transactions
      };
    } catch (error) {
      console.error("Error executing rebalancing:", error);
      throw new Error("Failed to execute rebalancing plan");
    }
  }
}

export const rebalancingService = new RebalancingService();
