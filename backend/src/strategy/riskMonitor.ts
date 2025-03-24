import * as dfd from 'danfojs';
import { RiskManager } from './riskManager';

export interface Alert {
  type: 'info' | 'warning' | 'danger';
  message: string;
  timestamp: Date;
  threshold: number;
  currentValue: number;
}

export interface VolatilityMetrics {
  dailyVolatility: number;
  weeklyVolatility: number;
  monthlyVolatility: number;
  annualizedVolatility: number;
}

export class RiskMonitor {
  private riskManager: RiskManager;
  private alertThresholds: Record<string, number>;
  private alerts: Alert[];
  
  constructor(riskManager: RiskManager) {
    this.riskManager = riskManager;
    this.alerts = [];
    
    // Default alert thresholds
    this.alertThresholds = {
      drawdown: 0.05,      // 5% drawdown
      volatility: 0.20,    // 20% volatility 
      valueAtRisk: 0.05,   // 5% VaR
      concentration: 0.30, // 30% max in one asset
      leverage: 2.0,       // 2x max leverage
    };
  }
  
  // Set custom alert thresholds
  setAlertThresholds(thresholds: Partial<Record<string, number>>) {
    // Only assign defined values
    Object.entries(thresholds).forEach(([key, value]) => {
      if (value !== undefined) {
        this.alertThresholds[key] = value;
      }
    });
  }
  
  // Monitor portfolio and generate alerts
  async monitorPortfolio(
    portfolio: any, 
    historicalData: any[] = []
  ): Promise<Alert[]> {
    const newAlerts: Alert[] = [];
    const now = new Date();
    
    // Check for drawdown alert
    if (portfolio.highWaterMark && portfolio.currentValue) {
      const drawdown = (portfolio.highWaterMark - portfolio.currentValue) / portfolio.highWaterMark;
      
      if (drawdown > this.alertThresholds.drawdown) {
        newAlerts.push({
          type: drawdown > this.alertThresholds.drawdown * 1.5 ? 'danger' : 'warning',
          message: `Portfolio drawdown of ${(drawdown * 100).toFixed(2)}% exceeds threshold of ${(this.alertThresholds.drawdown * 100).toFixed(2)}%`,
          timestamp: now,
          threshold: this.alertThresholds.drawdown,
          currentValue: drawdown
        });
      }
    }
    
    // Calculate volatility if historical data is provided
    if (historicalData.length > 0) {
      const volatilityMetrics = this.calculateVolatilityMetrics(historicalData);
      
      if (volatilityMetrics.dailyVolatility > this.alertThresholds.volatility) {
        newAlerts.push({
          type: 'warning',
          message: `Daily volatility of ${(volatilityMetrics.dailyVolatility * 100).toFixed(2)}% exceeds threshold of ${(this.alertThresholds.volatility * 100).toFixed(2)}%`,
          timestamp: now,
          threshold: this.alertThresholds.volatility,
          currentValue: volatilityMetrics.dailyVolatility
        });
      }
    }
    
    // Check for concentration risk
    if (portfolio.assets) {
      const assets = Object.values(portfolio.assets) as any[];
      
      for (const asset of assets) {
        if (asset.allocation > this.alertThresholds.concentration) {
          newAlerts.push({
            type: 'info',
            message: `High concentration of ${(asset.allocation * 100).toFixed(2)}% in ${asset.symbol}`,
            timestamp: now,
            threshold: this.alertThresholds.concentration,
            currentValue: asset.allocation
          });
        }
      }
    }
    
    // Add new alerts to the history
    this.alerts = [...this.alerts, ...newAlerts];
    
    // Return only new alerts
    return newAlerts;
  }
  
  calculateVolatilityMetrics(historicalData: any[]): VolatilityMetrics {
    try {
      // Create DataFrame from historical data
      const df = new dfd.DataFrame(historicalData);
      
      // Calculate returns
      const returns: number[] = [];
      for (let i = 1; i < historicalData.length; i++) {
        returns.push(historicalData[i].value / historicalData[i-1].value - 1);
      }
      
      // Calculate volatilities
      const dailyVolatility = Number(math.std(returns));
      const weeklyVolatility = dailyVolatility * Math.sqrt(5);
      const monthlyVolatility = dailyVolatility * Math.sqrt(21);
      const annualizedVolatility = dailyVolatility * Math.sqrt(252);
      
      return {
        dailyVolatility,
        weeklyVolatility,
        monthlyVolatility,
        annualizedVolatility
      };
    } catch (error) {
      console.error("Error calculating volatility metrics:", error);
      return {
        dailyVolatility: 0,
        weeklyVolatility: 0,
        monthlyVolatility: 0,
        annualizedVolatility: 0
      };
    }
  }
  
  // Get all alerts for a time period
  getAlerts(days: number = 7): Alert[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return this.alerts.filter(alert => alert.timestamp >= cutoffDate);
  }
  
  // Check for critical conditions that require immediate action
  hasCriticalAlerts(): boolean {
    const recentAlerts = this.getAlerts(1); // Last 24 hours
    return recentAlerts.some(alert => alert.type === 'danger');
  }
  
  // Clear all alerts
  clearAlerts(): void {
    this.alerts = [];
  }
}

// Use an import of math here to fix the reference
import * as math from 'mathjs';

export const riskMonitor = new RiskMonitor(new RiskManager());
