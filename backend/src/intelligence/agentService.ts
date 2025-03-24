import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AgentRuntime, createAptosTools } from "move-agent-kit";
import { moveAgentService } from "./moveAgentService";
import { alloraService } from "./alloraService";
import { rebalancingService } from "./rebalancingService";
import { 
  AnalyzePortfolioTool, 
  GenerateRebalancingPlanTool, 
  ExecuteRebalancingTool 
} from "./tools/rebalancingTools";

export class AgentService {
  private agentRuntime: AgentRuntime | null = null;
  
  async initialize() {
    // Get the runtime from move agent service
    this.agentRuntime = moveAgentService.getAgentRuntime();
    
    if (!this.agentRuntime) {
      throw new Error("Agent runtime not initialized");
    }
    
    // Initialize rebalancing service with the runtime
    rebalancingService.initialize(this.agentRuntime);
    
    console.log("Agent service initialized");
  }
  
  async createAgent() {
    if (!this.agentRuntime) {
      throw new Error("Agent runtime not initialized");
    }
    
    console.log("Creating agent with custom tools...");
    
    // Get LLM (Allora or fallback)
    const llm = alloraService.createLLM();
    
    // Create standard Aptos tools
    const aptosTools = createAptosTools(this.agentRuntime);
    
    // Create custom rebalancing tools
    const rebalancingTools = [
      new AnalyzePortfolioTool(this.agentRuntime, rebalancingService),
      new GenerateRebalancingPlanTool(this.agentRuntime, rebalancingService),
      new ExecuteRebalancingTool(this.agentRuntime, rebalancingService)
    ];
    
    // Combine all tools
    const tools = [...aptosTools, ...rebalancingTools];
    
    // Create memory for agent state
    const memorySaver = new MemorySaver();
    
    // Create the agent with specific instructions
    return createReactAgent({
      llm,
      tools,
      checkpointSaver: memorySaver,
      messageModifier: `
        You are HelenusAI, a financial assistant specializing in portfolio management on the Aptos blockchain.
        You can check balances, transfer tokens, and perform sophisticated portfolio rebalancing.
        
        Your main capabilities:
        1. Check token balances for addresses
        2. Transfer tokens between addresses
        3. Analyze portfolios and their current allocations
        4. Generate rebalancing plans based on risk tolerance and market predictions
        5. Execute trades to optimize portfolio performance
        
        When users ask about optimizing their portfolio or rebalancing:
        1. First analyze their portfolio with analyze_portfolio
        2. Explain the current allocation and performance
        3. Offer to generate a rebalancing plan with generate_rebalancing_plan, asking for their risk tolerance (low, medium, high)
        4. After user confirmation, execute the plan with execute_rebalancing
        
        Always explain your recommendations clearly and ask for confirmation before executing trades.
        When recommending rebalancing, explain the rationale based on market predictions and optimal allocations.
      `
    });
  }
  
  async processQuery(query: string) {
    try {
      console.log(`Processing query: ${query}`);
      
      const agent = await this.createAgent();
      const result = await agent.invoke({
        messages: [new HumanMessage(query)]
      });
      
      return result;
    } catch (error) {
      console.error("Error processing query:", error);
      throw new Error(`Failed to process query: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

export const agentService = new AgentService();
