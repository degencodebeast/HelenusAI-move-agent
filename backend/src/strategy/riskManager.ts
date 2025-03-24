import * as dfd from 'danfojs';
import * as math from 'mathjs';

// Define risk tolerance levels
export type RiskTolerance = 'low' | 'medium' | 'high';

// Define interfaces for our risk management
export interface RiskParameters {
  maxDrawdown: number;
  maxVolatility: number;
  stopLoss: number;
  targetProfit: number;
}

export interface RiskAssessment {
  volatility: number;
  valueAtRisk: number;
  maxDrawdown: number;
  riskScore: number;
  riskLevel: string;
}

export interface PositionSize {
  asset: string;
  amount: number;
  percentage: number;
}

export class RiskManager {
  private riskTolerance: RiskTolerance;
  private riskParameters: RiskParameters;
  
  constructor(riskTolerance: RiskTolerance = 'medium') {
    this.riskTolerance = riskTolerance;
    this.riskParameters = this.getRiskParametersByProfile(riskTolerance);
  }
  
  private getRiskParametersByProfile(profile: RiskTolerance): RiskParameters {
    // Risk parameters based on risk tolerance
    const profiles: Record<RiskTolerance, RiskParameters> = {
      'low': {
        maxDrawdown: 0.05,    // 5% maximum drawdown
        maxVolatility: 0.10,   // 10% max volatility
        stopLoss: 0.03,        // 3% stop loss
        targetProfit: 0.05     // 5% target profit
      },
      'medium': {
        maxDrawdown: 0.10,    // 10% maximum drawdown
        maxVolatility: 0.20,   // 20% max volatility
        stopLoss: 0.05,        // 5% stop loss
        targetProfit: 0.10     // 10% target profit
      },
      'high': {
        maxDrawdown: 0.20,    // 20% maximum drawdown
        maxVolatility: 0.30,   // 30% max volatility
        stopLoss: 0.08,        // 8% stop loss
        targetProfit: 0.15     // 15% target profit
      }
    };
    
    return profiles[profile];
  }
  
  async calculatePortfolioRisk(portfolioData: any[]): Promise<RiskAssessment> {
    try {
      // Convert portfolio data to DataFrame
      const df = new dfd.DataFrame(portfolioData);
      
      // Calculate volatility (standard deviation of returns)
      let volatility = 0;
      try {
        // Assuming portfolio data contains returns
        volatility = Number(df.std().values[0]);
      } catch (error) {
        console.error("Error calculating volatility:", error);
        volatility = 0.15; // Default value if calculation fails
      }
      
      // Calculate Value at Risk
      const valueAtRisk = this.calculateVaR(portfolioData, 0.95);
      
      // Calculate risk score (0-100)
      const riskScore = this.calculateRiskScore(volatility, valueAtRisk);
      
      // Determine risk level
      const riskLevel = this.determineRiskLevel(riskScore);
      
      return {
        volatility,
        valueAtRisk,
        maxDrawdown: this.riskParameters.maxDrawdown,
        riskScore,
        riskLevel
      };
    } catch (error) {
      console.error("Error in portfolio risk calculation:", error);
      // Return default values if calculation fails
      return {
        volatility: 0.15,
        valueAtRisk: 0.05,
        maxDrawdown: this.riskParameters.maxDrawdown,
        riskScore: 50,
        riskLevel: 'medium'
      };
    }
  }
  
  private calculateVaR(portfolioData: any[], confidenceLevel: number): number {
    try {
      // Create array of returns from portfolio data
      // This is a simplified approach - in a real system you'd use historical returns
      const returns: number[] = [];
      
      for (let i = 1; i < portfolioData.length; i++) {
        // Calculate daily return
        const previousValue = portfolioData[i-1].value;
        const currentValue = portfolioData[i].value;
        if (previousValue && previousValue > 0) {
          returns.push(currentValue / previousValue - 1);
        }
      }
      
      // If no returns data, return a default
      if (returns.length === 0) return 0.05;
      
      // Sort returns in ascending order
      const sortedReturns = returns.sort((a, b) => a - b);
      
      // Calculate VaR at the specified confidence level
      const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
      return Math.abs(sortedReturns[index]);
    } catch (error) {
      console.error("Error calculating VaR:", error);
      return 0.05; // Default VaR if calculation fails
    }
  }
  
  calculateRiskScore(volatility: number, valueAtRisk: number): number {
    // Convert volatility and VaR to a risk score between 0-100
    // Higher score means higher risk
    const volComponent = Math.min(volatility / 0.3, 1) * 50; // Max volatility contribution is 50
    const varComponent = Math.min(valueAtRisk / 0.1, 1) * 50; // Max VaR contribution is 50
    
    return Math.round(volComponent + varComponent);
  }
  
  determineRiskLevel(riskScore: number): string {
    if (riskScore < 30) return 'low';
    if (riskScore < 70) return 'medium';
    return 'high';
  }
  
  calculatePositionSize(
    totalCapital: number, 
    assets: string[], 
    assetRisks: number[]
  ): PositionSize[] {
    // Inverse risk weighting - allocate less capital to higher risk assets
    const riskSum = assetRisks.reduce((sum, risk) => sum + (1 / risk), 0);
    
    return assets.map((asset, i) => {
      const weight = (1 / assetRisks[i]) / riskSum;
      const amount = totalCapital * weight;
      
      return {
        asset,
        amount,
        percentage: weight * 100
      };
    });
  }
  
  getStopLoss(entryPrice: number): number {
    return entryPrice * (1 - this.riskParameters.stopLoss);
  }
  
  getTakeProfit(entryPrice: number): number {
    return entryPrice * (1 + this.riskParameters.targetProfit);
  }
  
  // Check if drawdown exceeds maximum allowed
  isDrawdownExceeded(portfolioValue: number, highWaterMark: number): boolean {
    const drawdown = (highWaterMark - portfolioValue) / highWaterMark;
    return drawdown > this.riskParameters.maxDrawdown;
  }
}

export const riskManager = new RiskManager();
