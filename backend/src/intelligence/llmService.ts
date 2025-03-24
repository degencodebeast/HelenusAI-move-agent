import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { HumanMessage } from '@langchain/core/messages';
import { MemorySaver } from '@langchain/langgraph';
import { Tool } from '@langchain/core/tools';
import { createAptosTools } from 'move-agent-kit';
import { moveAgentService } from './moveAgentService';

export class LlmService {
  private llm: ChatAnthropic;
  
  constructor() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is required');
    }
    
    this.llm = new ChatAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: 'claude-3-sonnet-20240229',
      temperature: 0.7,
    });
  }
  
  async createAgent() {
    const agentRuntime = moveAgentService.getAgentRuntime();
    const tools = createAptosTools(agentRuntime);
    
    // Create memory saver for agent state
    const memorySaver = new MemorySaver();
    
    // Create the agent
    return createReactAgent({
      llm: this.llm,
      tools,
      checkpointer: memorySaver,
      messageModifier: `
        You are HelenusAI, a helpful agent that can interact with Move-based blockchains using Move Agent Kit.
        You can perform operations like transferring tokens, checking balances, and analyzing market data.
        Be concise and helpful with your responses.
      `,
    });
  }
  
  async processQuery(query: string) {
    const agent = await this.createAgent();
    const result = await agent.invoke({
      messages: [new HumanMessage(query)],
    });
    
    return result;
  }
}

export const llmService = new LlmService(); 