import * as math from 'mathjs';

export interface BridgeTransaction {
  sourceChain: string;
  destinationChain: string;
  token: string;
  amount: string;
  fee: string;
  estimatedTime: number; // in seconds
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  timestamp: Date;
}

export interface ChainSupport {
  name: string;
  id: string;
  nativeToken: string;
  supportedTokens: string[];
  gasEstimate: number;
}

export class Wormhole {
  private supportedChains: ChainSupport[];
  private transactions: BridgeTransaction[];
  
  constructor() {
    this.transactions = [];
    
    // Initialize supported chains
    this.supportedChains = [
      {
        name: 'Aptos',
        id: 'aptos',
        nativeToken: 'APT',
        supportedTokens: ['USDC', 'USDT', 'WETH', 'WBTC'],
        gasEstimate: 0.001
      },
      {
        name: 'Ethereum',
        id: 'ethereum',
        nativeToken: 'ETH',
        supportedTokens: ['USDC', 'USDT', 'WBTC'],
        gasEstimate: 0.003
      },
      {
        name: 'Solana',
        id: 'solana',
        nativeToken: 'SOL',
        supportedTokens: ['USDC', 'USDT', 'WETH', 'WBTC'],
        gasEstimate: 0.0001
      }
    ];
  }
  
  getSupportedChains(): ChainSupport[] {
    return this.supportedChains;
  }
  
  isBridgeSupported(sourceChain: string, destinationChain: string): boolean {
    const source = this.supportedChains.find(chain => chain.id === sourceChain);
    const destination = this.supportedChains.find(chain => chain.id === destinationChain);
    
    return !!(source && destination);
  }
  
  isTokenSupported(chain: string, token: string): boolean {
    const chainInfo = this.supportedChains.find(c => c.id === chain);
    return chainInfo ? chainInfo.supportedTokens.includes(token) : false;
  }
  
  async estimateFee(
    sourceChain: string, 
    destinationChain: string, 
    token: string, 
    amount: string
  ): Promise<string> {
    // Check support
    if (!this.isBridgeSupported(sourceChain, destinationChain)) {
      throw new Error('Bridge not supported between these chains');
    }
    
    if (!this.isTokenSupported(sourceChain, token)) {
      throw new Error(`${token} not supported on ${sourceChain}`);
    }
    
    if (!this.isTokenSupported(destinationChain, token)) {
      throw new Error(`${token} not supported on ${destinationChain}`);
    }
    
    // In a real implementation, this would call an API to get actual fees
    // For now, use a simple fee model
    const amountValue = parseFloat(amount);
    const baseFee = 0.1; // Base fee in USD
    const percentFee = amountValue * 0.003; // 0.3% fee
    
    return (baseFee + percentFee).toFixed(4);
  }
  
  async estimateTime(sourceChain: string, destinationChain: string): Promise<number> {
    // Estimated time in seconds
    const times: Record<string, Record<string, number>> = {
      'aptos': {
        'ethereum': 300, // 5 minutes
        'solana': 60 // 1 minute
      },
      'ethereum': {
        'aptos': 600, // 10 minutes
        'solana': 300 // 5 minutes
      },
      'solana': {
        'aptos': 60, // 1 minute
        'ethereum': 300 // 5 minutes
      }
    };
    
    return times[sourceChain]?.[destinationChain] || 300; // Default to 5 minutes
  }
  
  async executeBridgeTransaction(
    sourceChain: string,
    destinationChain: string,
    token: string,
    amount: string,
    recipientAddress: string,
    moveAgentService: any // Move Agent Service for blockchain interactions
  ): Promise<BridgeTransaction> {
    try {
      // Validate the bridge transaction
      if (!this.isBridgeSupported(sourceChain, destinationChain)) {
        throw new Error('Bridge not supported between these chains');
      }
      
      if (!this.isTokenSupported(sourceChain, token)) {
        throw new Error(`${token} not supported on ${sourceChain}`);
      }
      
      // Calculate fee
      const fee = await this.estimateFee(sourceChain, destinationChain, token, amount);
      
      // Estimate time
      const estimatedTime = await this.estimateTime(sourceChain, destinationChain);
      
      // Create transaction record
      const transaction: BridgeTransaction = {
        sourceChain,
        destinationChain,
        token,
        amount,
        fee,
        estimatedTime,
        status: 'pending',
        timestamp: new Date()
      };
      
      // In a real implementation, this would:
      // 1. Call the Wormhole bridge contract
      // 2. Track the transaction status
      // 3. Update with completion status
      
      // For now, simulate a transaction hash
      transaction.txHash = `0x${Math.random().toString(16).substring(2, 42)}`;
      
      // Store the transaction
      this.transactions.push(transaction);
      
      // Return the transaction details
      return transaction;
    } catch (error) {
      console.error("Error executing bridge transaction:", error);
      throw error;
    }
  }
  
  async getTransactionStatus(txHash: string): Promise<BridgeTransaction | undefined> {
    const transaction = this.transactions.find(tx => tx.txHash === txHash);
    
    // In a real implementation, this would check the actual status on-chain
    // For now, just return the stored transaction
    return transaction;
  }
  
  async getRecentTransactions(limit: number = 10): Promise<BridgeTransaction[]> {
    // Return the most recent transactions
    return this.transactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export const wormhole = new Wormhole();
