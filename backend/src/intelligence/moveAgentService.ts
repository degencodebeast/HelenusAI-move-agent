import { Aptos, AptosConfig, Network, Ed25519PrivateKey, PrivateKey, PrivateKeyVariants, AccountAddress } from '@aptos-labs/ts-sdk';
import { LocalSigner, AgentRuntime, createAptosTools } from 'move-agent-kit';
import dotenv from 'dotenv';

dotenv.config();

export class MoveAgentService {
  private aptos: Aptos;
  private agentRuntime: AgentRuntime | null = null;
  
  constructor() {
    const network = process.env.APTOS_NETWORK === 'mainnet' 
      ? Network.MAINNET 
      : (process.env.APTOS_NETWORK === 'testnet' ? Network.TESTNET : Network.DEVNET);
    
    const aptosConfig = new AptosConfig({ network });
    this.aptos = new Aptos(aptosConfig);
  }
  
  async initialize(privateKeyStr?: string): Promise<void> {
    // Use provided key or env variable
    const pkString = privateKeyStr || process.env.APTOS_PRIVATE_KEY;
    if (!pkString) throw new Error('No private key provided');
    
    // Create account from private key
    const privateKey = new Ed25519PrivateKey(
      PrivateKey.formatPrivateKey(pkString, PrivateKeyVariants.Ed25519)
    );
    
    const account = await this.aptos.deriveAccountFromPrivateKey({ privateKey });
    
    // Create signer and agent runtime
    const signer = new LocalSigner(account, this.aptos.config.network);
    this.agentRuntime = new AgentRuntime(signer, this.aptos, {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY
    });
    
    console.log(`Initialized agent with wallet: ${account.accountAddress.toString()}`);
  }
  
  getAgentRuntime(): AgentRuntime {
    if (!this.agentRuntime) throw new Error('Agent runtime not initialized');
    return this.agentRuntime;
  }
  
  async getBalance(address?: string): Promise<any> {
    if (!this.agentRuntime) throw new Error('Agent runtime not initialized');
    return this.agentRuntime.getBalance(address);
  }
  
  async transferTokens(toAddress: string, amount: number, mint: string = '0x1::aptos_coin::AptosCoin'): Promise<any> {
    if (!this.agentRuntime) throw new Error('Agent runtime not initialized');
    return this.agentRuntime.transferTokens(AccountAddress.fromString(toAddress), amount, mint);
  }
}

// Create singleton instance
export const moveAgentService = new MoveAgentService(); 