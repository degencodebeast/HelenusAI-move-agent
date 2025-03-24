import { Request, Response } from 'express';
import { moveAgentService } from '../intelligence/moveAgentService';
import { llmService } from '../intelligence/llmService';
import { 
  ApiResponse, 
  BalanceResponse, 
  TransferResponse, 
  QueryResponse 
} from '../models';
import { rebalancingService } from '../intelligence/rebalancingService';

export async function checkBalance(req: Request, res: Response) {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'Address is required'
      });
    }
    
    const balance = await moveAgentService.getBalance(address);
    
    const response: ApiResponse<BalanceResponse> = {
      success: true,
      data: {
        address,
        balance
      }
    };
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check balance'
    });
  }
}

export async function transferTokens(req: Request, res: Response) {
  try {
    const { recipientAddress, amount } = req.body;
    
    if (!recipientAddress || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Recipient address and amount are required'
      });
    }
    
    const txResult = await moveAgentService.transferTokens(recipientAddress, amount);
    
    const response: ApiResponse<TransferResponse> = {
      success: true,
      data: {
        txHash: txResult.hash,
        status: txResult.status
      }
    };
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to transfer tokens'
    });
  }
}

export async function processQuery(req: Request, res: Response) {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      });
    }
    
    const result = await llmService.processQuery(query);
    
    const response: ApiResponse<QueryResponse> = {
      success: true,
      data: {
        response: String(result.messages[result.messages.length - 1].content)
      }
    };
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process query'
    });
  }
}

export async function analyzePortfolio(req: Request, res: Response) {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'Address is required'
      });
    }
    
    const analysis = await rebalancingService.analyzePortfolio(address);
    
    const response: ApiResponse<any> = {
      success: true,
      data: analysis
    };
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze portfolio'
    });
  }
}

export async function generateRebalancingPlan(req: Request, res: Response) {
  try {
    const { address, riskTolerance } = req.body;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'Address is required'
      });
    }
    
    // First analyze the portfolio
    const portfolio = await rebalancingService.analyzePortfolio(address);
    
    // Then generate the rebalancing plan
    const plan = await rebalancingService.calculateRebalancing(
      portfolio, 
      riskTolerance || 'medium'
    );
    
    const response: ApiResponse<any> = {
      success: true,
      data: plan
    };
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate rebalancing plan'
    });
  }
}

export async function executeRebalancing(req: Request, res: Response) {
  try {
    const { address, planId } = req.body;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'Address is required'
      });
    }
    
    if (!planId) {
      return res.status(400).json({
        success: false,
        error: 'Plan ID is required'
      });
    }
    
    const result = await rebalancingService.executeRebalancing(address, planId);
    
    const response: ApiResponse<any> = {
      success: true,
      data: result
    };
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to execute rebalancing'
    });
  }
}

// Similar implementations for generateRebalancingPlan and executeRebalancing 
