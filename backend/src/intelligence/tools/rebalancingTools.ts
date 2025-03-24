// src/intelligence/tools/rebalancingTools.ts
import { Tool } from "@langchain/core/tools";
import { AgentRuntime, parseJson } from "move-agent-kit";
import { RebalancingService } from "../rebalancingService";

export class AnalyzePortfolioTool extends Tool {
  name = "analyze_portfolio";
  description = `This tool analyzes a user's portfolio to determine current asset allocation and performance.
  
  Inputs (input is a JSON string):
  address: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa" (required)`;
  
  constructor(private agent: AgentRuntime, private rebalancingService: RebalancingService) {
    super();
  }
  
  async _call(args: string): Promise<string> {
    try {
      const { address } = parseJson(args);
      
      if (!address) {
        return JSON.stringify({ error: "Address is required" });
      }
      
      const analysis = await this.rebalancingService.analyzePortfolio(address);
      return JSON.stringify({ data: analysis });
    } catch (error) {
      console.error("Error in analyze_portfolio tool:", error);
      return JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error in portfolio analysis" 
      });
    }
  }
}

export class GenerateRebalancingPlanTool extends Tool {
  name = "generate_rebalancing_plan";
  description = `This tool generates a rebalancing plan based on statistical analysis and market predictions.
  
  Inputs (input is a JSON string):
  address: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa" (required)
  riskTolerance: string, one of "low", "medium", "high" (optional, defaults to "medium")`;
  
  constructor(private agent: AgentRuntime, private rebalancingService: RebalancingService) {
    super();
  }
  
  async _call(args: string): Promise<string> {
    try {
      const { address, riskTolerance = "medium" } = parseJson(args);
      
      if (!address) {
        return JSON.stringify({ error: "Address is required" });
      }
      
      // First analyze the portfolio
      const portfolio = await this.rebalancingService.analyzePortfolio(address);
      
      // Then generate rebalancing plan
      const plan = await this.rebalancingService.calculateRebalancing(portfolio, riskTolerance);
      
      return JSON.stringify({ data: plan });
    } catch (error) {
      console.error("Error in generate_rebalancing_plan tool:", error);
      return JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error in rebalancing plan generation" 
      });
    }
  }
}

export class ExecuteRebalancingTool extends Tool {
  name = "execute_rebalancing";
  description = `This tool executes a previously generated rebalancing plan by performing the necessary trades.
  
  Inputs (input is a JSON string):
  address: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa" (required)
  planId: string, the ID of the rebalancing plan to execute (required)`;
  
  constructor(private agent: AgentRuntime, private rebalancingService: RebalancingService) {
    super();
  }
  
  async _call(args: string): Promise<string> {
    try {
      const { address, planId } = parseJson(args);
      
      if (!address) {
        return JSON.stringify({ error: "Address is required" });
      }
      
      if (!planId) {
        return JSON.stringify({ error: "Plan ID is required" });
      }
      
      const result = await this.rebalancingService.executeRebalancing(address, planId);
      
      return JSON.stringify({ data: result });
    } catch (error) {
      console.error("Error in execute_rebalancing tool:", error);
      return JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error in rebalancing execution" 
      });
    }
  }
}