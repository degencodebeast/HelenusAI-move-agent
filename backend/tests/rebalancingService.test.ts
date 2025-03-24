import { rebalancingService } from '../src/intelligence/rebalancingService';
import { moveAgentService } from '../src/intelligence/moveAgentService';
import { describe, expect, test, beforeAll, jest } from '@jest/globals';

// Mock dependencies
jest.mock('../src/intelligence/moveAgentService');
jest.mock('../src/intelligence/alloraService');

describe('RebalancingService', () => {
  beforeAll(() => {
    // Mock the runtime
    const mockRuntime = {};
    (moveAgentService.getAgentRuntime as jest.Mock).mockReturnValue(mockRuntime);
    
    // Initialize service
    rebalancingService.initialize(mockRuntime as any);
  });
  
  test('analyzePortfolio should return portfolio data', async () => {
    const address = '0x123';
    const portfolio = await rebalancingService.analyzePortfolio(address);
    
    expect(portfolio).toBeDefined();
    expect(portfolio.address).toBe(address);
    expect(portfolio.totalValue).toBeDefined();
    expect(portfolio.assets).toBeDefined();
  });
  
  // Additional tests for other methods
});
