// import * as dfd from 'danfojs';
// import * as math from 'mathjs';

export interface YieldOpportunity {
  protocol: string;
  asset: string;
  apy: number;
  tvl: string;
  risk: string;
  lockupPeriod: number; // In days
  minAmount: string;
  maxAmount: string;
  chain: string;
}

export interface YieldRecommendation {
  opportunity: YieldOpportunity;
  allocation: string;
  expectedYield: string;
  annualReturn: string;
  riskAdjustedReturn: number;
}

export class YieldOptimizer {
  private yieldOpportunities: YieldOpportunity[];
  
  constructor() {
    // Initialize with sample yield opportunities
    // In a real implementation, these would be fetched from DeFi protocols
    this.yieldOpportunities = [
      {
        protocol: 'Aptos Liquidity',
        asset: 'USDC',
        apy: 0.045, // 4.5%
        tvl: '$10,000,000',
        risk: 'low',
        lockupPeriod: 0,
        minAmount: '1',
        maxAmount: '1000000',
        chain: 'aptos'
      },
      {
        protocol: 'Aptos Staking',
        asset: 'APT',
        apy: 0.07, // 7%
        tvl: '$50,000,000',
        risk: 'low',
        lockupPeriod: 30,
        minAmount: '10',
        maxAmount: '100000',
        chain: 'aptos'
      },
      {
        protocol: 'Liquidswap',
        asset: 'APT-USDC LP',
        apy: 0.15, // 15%
        tvl: '$5,000,000',
        risk: 'medium',
        lockupPeriod: 0,
        minAmount: '10',
        maxAmount: '100000',
        chain: 'aptos'
      },
      {
        protocol: 'Tortuga',
        asset: 'tAPT',
        apy: 0.08, // 8%
        tvl: '$20,000,000',
        risk: 'low',
        lockupPeriod: 0,
        minAmount: '5',
        maxAmount: '50000',
        chain: 'aptos'
      },
      {
        protocol: 'Ditto',
        asset: 'stAPT',
        apy: 0.065, // 6.5%
        tvl: '$15,000,000',
        risk: 'low',
        lockupPeriod: 0,
        minAmount: '1',
        maxAmount: '50000',
        chain: 'aptos'
      },
      {
        protocol: 'Abel Finance',
        asset: 'USDC-BTC LP',
        apy: 0.12, // 12%
        tvl: '$3,000,000',
        risk: 'medium',
        lockupPeriod: 7,
        minAmount: '100',
        maxAmount: '500000',
        chain: 'aptos'
      }
    ];
  }
  
  async findYieldOpportunities(assets: any[]): Promise<YieldRecommendation[]> {
    try {
      const recommendations: YieldRecommendation[] = [];
      
      // For each asset in the portfolio, find yield opportunities
      for (const asset of assets) {
        const symbol = asset.symbol || '';
        const amount = parseFloat(asset.balance) || 0;
        
        // Find relevant opportunities for this asset
        const opportunities = this.yieldOpportunities.filter(opp => {
          // Match exact asset or LP tokens containing the asset
          return opp.asset === symbol || opp.asset.includes(symbol);
        });
        
        if (opportunities.length === 0) continue;
        
        // Calculate risk-adjusted returns
        const riskAdjustedOpportunities = opportunities.map(opp => {
          // Apply a risk factor based on risk level
          const riskFactor = this.getRiskFactor(opp.risk);
          const riskAdjustedReturn = opp.apy * riskFactor;
          
          return {
            opportunity: opp,
            riskAdjustedReturn
          };
        });
        
        // Sort by risk-adjusted return in descending order
        riskAdjustedOpportunities.sort((a, b) => 
          b.riskAdjustedReturn - a.riskAdjustedReturn
        );
        
        // Take the top opportunity for this asset
        const bestOpportunity = riskAdjustedOpportunities[0];
        if (!bestOpportunity) continue;
        
        // Calculate allocation based on lockup period and amount limits
        const lockupFactor = this.getLockupFactor(bestOpportunity.opportunity.lockupPeriod);
        const maxAmountToAllocate = Math.min(
          amount,
          parseFloat(bestOpportunity.opportunity.maxAmount)
        );
        
        // Don't recommend if below minimum amount
        if (maxAmountToAllocate < parseFloat(bestOpportunity.opportunity.minAmount)) {
          continue;
        }
        
        // Calculate allocation based on risk and lockup
        const allocation = maxAmountToAllocate * lockupFactor;
        
        // Calculate expected annual yield
        const annualYield = allocation * bestOpportunity.opportunity.apy;
        
        recommendations.push({
          opportunity: bestOpportunity.opportunity,
          allocation: allocation.toFixed(2),
          expectedYield: annualYield.toFixed(2),
          annualReturn: (bestOpportunity.opportunity.apy * 100).toFixed(2) + '%',
          riskAdjustedReturn: bestOpportunity.riskAdjustedReturn
        });
      }
      
      return recommendations;
    } catch (error) {
      console.error("Error finding yield opportunities:", error);
      return [];
    }
  }
  
  private getRiskFactor(risk: string): number {
    // Risk factors adjust the yield based on perceived risk
    // Lower factors for higher risk opportunities
    switch (risk.toLowerCase()) {
      case 'low':
        return 1.0;
      case 'medium':
        return 0.8;
      case 'high':
        return 0.6;
      default:
        return 0.7;
    }
  }
  
  private getLockupFactor(lockupPeriods: number): number {
    // Lockup factor determines how much of an asset to allocate based on lockup period
    // Longer lockups means lower allocation
    if (lockupPeriods === 0) return 0.8; // No lockup - can allocate up to 80%
    if (lockupPeriods <= 7) return 0.6; // Short lockup - allocate up to 60%
    if (lockupPeriods <= 30) return 0.4; // Medium lockup - allocate up to 40%
    return 0.2; // Long lockup - allocate only 20%
  }
  
  async optimizeYield(
    portfolio: any,
    riskTolerance: string = 'medium'
  ): Promise<YieldRecommendation[]> {
    try {
      // Get all assets in the portfolio
      const assets = Object.values(portfolio.assets || {});
      
      // Find all possible yield opportunities for these assets
      const allOpportunities = await this.findYieldOpportunities(assets);
      
      // Apply risk filters based on user's risk tolerance
      const filteredOpportunities = this.filterByRiskTolerance(
        allOpportunities,
        riskTolerance
      );
      
      // Sort by risk-adjusted return
      filteredOpportunities.sort((a, b) => 
        b.riskAdjustedReturn - a.riskAdjustedReturn
      );
      
      // Return the best opportunities
      return filteredOpportunities.slice(0, 5); // Return top 5 opportunities
    } catch (error) {
      console.error("Error optimizing yield:", error);
      return [];
    }
  }
  
  private filterByRiskTolerance(
    opportunities: YieldRecommendation[],
    riskTolerance: string
  ): YieldRecommendation[] {
    // Filter opportunities based on risk tolerance
    switch (riskTolerance.toLowerCase()) {
      case 'low':
        return opportunities.filter(opp => 
          opp.opportunity.risk.toLowerCase() === 'low'
        );
      case 'medium':
        return opportunities.filter(opp => 
          ['low', 'medium'].includes(opp.opportunity.risk.toLowerCase())
        );
      case 'high':
        // Allow all risk levels for high risk tolerance
        return opportunities;
      default:
        // Default to medium risk tolerance
        return opportunities.filter(opp => 
          ['low', 'medium'].includes(opp.opportunity.risk.toLowerCase())
        );
    }
  }
  
  addYieldOpportunity(opportunity: YieldOpportunity): void {
    this.yieldOpportunities.push(opportunity);
  }
  
  getAllOpportunities(): YieldOpportunity[] {
    return this.yieldOpportunities;
  }
  
  getOpportunitiesByAsset(asset: string): YieldOpportunity[] {
    return this.yieldOpportunities.filter(opp => 
      opp.asset === asset || opp.asset.includes(asset)
    );
  }
  
  getOpportunitiesByChain(chain: string): YieldOpportunity[] {
    return this.yieldOpportunities.filter(opp => opp.chain === chain);
  }
}

export const yieldOptimizer = new YieldOptimizer();
