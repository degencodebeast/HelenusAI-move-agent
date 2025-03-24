import * as dfd from 'danfojs';
import * as math from 'mathjs';
import { RiskManager } from './riskManager';
import { YieldOptimizer } from './yieldOptimizer';

// Asset categories
export enum AssetCategory {
  STABLECOIN = 'stablecoin',
  LARGE_CAP = 'large_cap',
  MID_CAP = 'mid_cap',
  SMALL_CAP = 'small_cap',
  DEFI = 'defi',
  NFT = 'nft',
  INFRASTRUCTURE = 'infrastructure'
}

// Define portfolio allocation
export interface AssetAllocation {
  asset: string;
  symbol: string;
  category: AssetCategory;
  target: number; // Target percentage (0-1)
  current: number; // Current percentage (0-1)
  minAllocation: number; // Minimum allocation
  maxAllocation: number; // Maximum allocation
}

export interface RebalancingStrategy {
  name: string;
  allocations: AssetAllocation[];
  rebalancingThreshold: number; // Trigger rebalancing when deviation exceeds this value
  rebalancingFrequency: number; // In days
}

export interface RebalancingAction {
  asset: string;
  symbol: string;
  action: 'buy' | 'sell';
  amount: string;
  amountUsd: string;
  fromPercent: number;
  toPercent: number;
}

export interface RebalancingPlan {
  id: string;
  timestamp: Date;
  portfolio: any;
  strategy: RebalancingStrategy;
  actions: RebalancingAction[];
  estimatedGasCost: string;
  expectedImprovement: string;
}

export class StrategyEngine {
  private riskManager: RiskManager;
  private yieldOptimizer: YieldOptimizer;
  private strategies: Map<string, RebalancingStrategy>;
  private lastRebalances: Map<string, Date>; // Track last rebalance by portfolio ID
  
  constructor() {
    this.riskManager = new RiskManager();
    this.yieldOptimizer = new YieldOptimizer();
    this.strategies = new Map();
    this.lastRebalances = new Map();
    
    // Initialize with default strategies
    this.initializeDefaultStrategies();
  }
  
  private initializeDefaultStrategies() {
    // Conservative strategy
    this.strategies.set('conservative', {
      name: 'Conservative',
      allocations: [
        { asset: 'USDC', symbol: 'USDC', category: AssetCategory.STABLECOIN, target: 0.6, current: 0, minAllocation: 0.5, maxAllocation: 0.7 },
        { asset: 'APT', symbol: 'APT', category: AssetCategory.LARGE_CAP, target: 0.25, current: 0, minAllocation: 0.2, maxAllocation: 0.3 },
        { asset: 'BTC', symbol: 'BTC', category: AssetCategory.LARGE_CAP, target: 0.1, current: 0, minAllocation: 0.05, maxAllocation: 0.15 },
        { asset: 'ETH', symbol: 'ETH', category: AssetCategory.LARGE_CAP, target: 0.05, current: 0, minAllocation: 0.02, maxAllocation: 0.1 }
      ],
      rebalancingThreshold: 0.05, // 5% deviation
      rebalancingFrequency: 30 // Monthly
    });
    
    // Balanced strategy
    this.strategies.set('balanced', {
      name: 'Balanced',
      allocations: [
        { asset: 'USDC', symbol: 'USDC', category: AssetCategory.STABLECOIN, target: 0.4, current: 0, minAllocation: 0.3, maxAllocation: 0.5 },
        { asset: 'APT', symbol: 'APT', category: AssetCategory.LARGE_CAP, target: 0.3, current: 0, minAllocation: 0.2, maxAllocation: 0.4 },
        { asset: 'BTC', symbol: 'BTC', category: AssetCategory.LARGE_CAP, target: 0.15, current: 0, minAllocation: 0.1, maxAllocation: 0.2 },
        { asset: 'ETH', symbol: 'ETH', category: AssetCategory.LARGE_CAP, target: 0.15, current: 0, minAllocation: 0.1, maxAllocation: 0.2 }
      ],
      rebalancingThreshold: 0.075, // 7.5% deviation
      rebalancingFrequency: 15 // Bi-weekly
    });
    
    // Aggressive strategy
    this.strategies.set('aggressive', {
      name: 'Aggressive',
      allocations: [
        { asset: 'USDC', symbol: 'USDC', category: AssetCategory.STABLECOIN, target: 0.2, current: 0, minAllocation: 0.1, maxAllocation: 0.3 },
        { asset: 'APT', symbol: 'APT', category: AssetCategory.LARGE_CAP, target: 0.4, current: 0, minAllocation: 0.3, maxAllocation: 0.5 },
        { asset: 'BTC', symbol: 'BTC', category: AssetCategory.LARGE_CAP, target: 0.2, current: 0, minAllocation: 0.1, maxAllocation: 0.3 },
        { asset: 'ETH', symbol: 'ETH', category: AssetCategory.LARGE_CAP, target: 0.2, current: 0, minAllocation: 0.1, maxAllocation: 0.3 }
      ],
      rebalancingThreshold: 0.1, // 10% deviation
      rebalancingFrequency: 7 // Weekly
    });
  }
  
  getStrategy(name: string): RebalancingStrategy | undefined {
    return this.strategies.get(name);
  }
  
  addStrategy(strategy: RebalancingStrategy): void {
    this.strategies.set(strategy.name.toLowerCase(), strategy);
  }
  
  listStrategies(): string[] {
    return Array.from(this.strategies.keys());
  }
  
  async analyzePortfolio(portfolio: any): Promise<any> {
    try {
      // Convert portfolio to DataFrame for analysis
      const df = new dfd.DataFrame(portfolio.assets);
      
      // Calculate basic statistics
      const totalValue = portfolio.totalValue || 0;
      const assetCount = Object.keys(portfolio.assets || {}).length;
      
      // Calculate allocation percentages
      const assets = Object.values(portfolio.assets || {}).map((asset: any) => {
        return {
          ...asset,
          allocation: parseFloat(asset.value) / totalValue
        };
      });
      
      // Calculate risk metrics
      const riskAssessment = await this.riskManager.calculatePortfolioRisk(assets);
      
      // Calculate yield opportunities
      const yieldOpportunities = await this.yieldOptimizer.findYieldOpportunities(assets);
      
      return {
        totalValue,
        assetCount,
        assets,
        riskAssessment,
        yieldOpportunities
      };
    } catch (error) {
      console.error("Error analyzing portfolio:", error);
      throw error;
    }
  }
  
  async generateRebalancingPlan(
    portfolio: any, 
    strategyName: string = 'balanced'
  ): Promise<RebalancingPlan> {
    try {
      const strategy = this.strategies.get(strategyName.toLowerCase());
      
      if (!strategy) {
        throw new Error(`Strategy '${strategyName}' not found`);
      }
      
      // Check if rebalancing is needed
      const shouldRebalance = this.shouldRebalance(portfolio, strategy);
      
      if (!shouldRebalance) {
        throw new Error('Rebalancing not needed at this time');
      }
      
      // Update current allocations in the strategy
      const updatedStrategy = this.updateCurrentAllocations(portfolio, strategy);
      
      // Calculate rebalancing actions
      const actions = this.calculateRebalancingActions(portfolio, updatedStrategy);
      
      // Estimate gas costs (simplified)
      const estimatedGasCost = this.estimateGasCost(actions).toString();
      
      // Calculate expected improvement in risk-adjusted return
      const expectedImprovement = this.calculateExpectedImprovement(portfolio, actions);
      
      // Create rebalancing plan
      const plan: RebalancingPlan = {
        id: `plan-${Date.now()}`,
        timestamp: new Date(),
        portfolio,
        strategy: updatedStrategy,
        actions,
        estimatedGasCost,
        expectedImprovement
      };
      
      return plan;
    } catch (error) {
      console.error("Error generating rebalancing plan:", error);
      throw error;
    }
  }
  
  private shouldRebalance(portfolio: any, strategy: RebalancingStrategy): boolean {
    // Check if enough time has passed since last rebalance
    const lastRebalance = this.lastRebalances.get(portfolio.address);
    if (lastRebalance) {
      const daysSinceLastRebalance = Math.floor(
        (new Date().getTime() - lastRebalance.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastRebalance < strategy.rebalancingFrequency) {
        return false;
      }
    }
    
    // Check if any asset deviates from target allocation beyond threshold
    const updatedStrategy = this.updateCurrentAllocations(portfolio, strategy);
    
    return updatedStrategy.allocations.some(allocation => {
      return Math.abs(allocation.current - allocation.target) > strategy.rebalancingThreshold;
    });
  }
  
  private updateCurrentAllocations(
    portfolio: any, 
    strategy: RebalancingStrategy
  ): RebalancingStrategy {
    const totalValue = portfolio.totalValue || 0;
    if (totalValue === 0) return strategy;
    
    const updatedAllocations = strategy.allocations.map(allocation => {
      const asset = portfolio.assets[allocation.symbol];
      const current = asset ? parseFloat(asset.value) / totalValue : 0;
      
      return {
        ...allocation,
        current
      };
    });
    
    return {
      ...strategy,
      allocations: updatedAllocations
    };
  }
  
  private calculateRebalancingActions(
    portfolio: any, 
    strategy: RebalancingStrategy
  ): RebalancingAction[] {
    const actions: RebalancingAction[] = [];
    const totalValue = portfolio.totalValue || 0;
    
    if (totalValue === 0) return actions;
    
    for (const allocation of strategy.allocations) {
      const deviation = allocation.current - allocation.target;
      
      // Skip if deviation is within threshold
      if (Math.abs(deviation) <= strategy.rebalancingThreshold) {
        continue;
      }
      
      const asset = portfolio.assets[allocation.symbol] || {
        price: '0',
        value: '0'
      };
      
      const targetValue = totalValue * allocation.target;
      const currentValue = totalValue * allocation.current;
      const amountUsd = Math.abs(targetValue - currentValue).toFixed(2);
      
      // Calculate amount in token units
      const price = parseFloat(asset.price) || 1;
      const amount = (Math.abs(targetValue - currentValue) / price).toFixed(6);
      
      actions.push({
        asset: allocation.asset,
        symbol: allocation.symbol,
        action: deviation > 0 ? 'sell' : 'buy',
        amount,
        amountUsd,
        fromPercent: allocation.current * 100,
        toPercent: allocation.target * 100
      });
    }
    
    return actions;
  }
  
  private estimateGasCost(actions: RebalancingAction[]): number {
    // Simplified gas cost estimation
    // In a real implementation, this would consider current gas prices and transaction complexity
    const baseGasCost = 0.005; // Base gas in APT
    const costPerAction = 0.002; // Additional gas per action
    
    return baseGasCost + (actions.length * costPerAction);
  }
  
  private calculateExpectedImprovement(portfolio: any, actions: RebalancingAction[]): string {
    // Simplified calculation of expected improvement
    // In a real implementation, this would use historical data and risk models
    
    if (actions.length === 0) return '0%';
    
    // Calculate weighted average deviation reduction
    let totalDeviation = 0;
    let totalValue = 0;
    
    for (const action of actions) {
      const deviation = Math.abs(action.fromPercent - action.toPercent);
      const value = parseFloat(action.amountUsd);
      
      totalDeviation += deviation * value;
      totalValue += value;
    }
    
    const averageDeviation = totalValue > 0 ? totalDeviation / totalValue : 0;
    
    // Assume that reducing deviation improves risk-adjusted return
    const expectedImprovement = (averageDeviation * 0.1).toFixed(2) + '%';
    
    return expectedImprovement;
  }
  
  async executeRebalancing(
    planId: string, 
    moveAgentService: any
  ): Promise<any> {
    // This would be implemented to execute the rebalancing plan
    // using the Move Agent Service to perform the transactions
    
    // For now, just return a success response
    return {
      success: true,
      planId,
      status: 'completed',
      timestamp: new Date()
    };
  }
}

export const strategyEngine = new StrategyEngine();
