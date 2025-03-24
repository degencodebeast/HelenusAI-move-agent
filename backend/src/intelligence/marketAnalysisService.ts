import { alloraService } from './alloraService';

export class MarketAnalysisService {
  async analyzeTrends(assets: string[], timeframe: string = '7d') {
    // Fetch historical data
    const historicalData = await Promise.all(
      assets.map(asset => alloraService.getHistoricalPrices(asset, 30))
    );
    
    // Calculate trend indicators
    return assets.map((asset, index) => {
      const prices = historicalData[index].prices.map(p => parseFloat(p.price));
      
      return {
        asset,
        currentPrice: prices[prices.length - 1].toFixed(2),
        priceChange: this.calculatePriceChange(prices),
        volatility: this.calculateVolatility(prices),
        momentum: this.calculateMomentum(prices)
      };
    });
  }
  
  private calculatePriceChange(prices: number[]): string {
    const first = prices[0];
    const last = prices[prices.length - 1];
    const change = ((last - first) / first) * 100;
    return change.toFixed(2) + '%';
  }
  
  private calculateVolatility(prices: number[]): string {
    // Calculate standard deviation
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const coefficient = (stdDev / mean) * 100;
    return coefficient.toFixed(2) + '%';
  }
  
  private calculateMomentum(prices: number[]): string {
    // Simple momentum calculation based on recent price action
    const recent = prices.slice(Math.max(0, prices.length - 7));
    let momentum = 0;
    
    for (let i = 1; i < recent.length; i++) {
      momentum += recent[i] > recent[i-1] ? 1 : -1;
    }
    
    if (momentum > 0) return 'bullish';
    if (momentum < 0) return 'bearish';
    return 'neutral';
  }
}

export const marketAnalysisService = new MarketAnalysisService();
