import { Router } from 'express';
import { checkBalance, transferTokens, processQuery } from './controllers';
import {
  analyzePortfolio,
  generateRebalancingPlan,
  executeRebalancing
} from '../api/controllers';

const router = Router();

// Move Agent endpoints
router.get('/balance/:address', checkBalance);
router.post('/transfer', transferTokens);

// LLM query endpoint
router.post('/query', processQuery);

// Rebalancing endpoints
router.get('/portfolio/:address', analyzePortfolio);
router.post('/portfolio/rebalance', generateRebalancingPlan);
router.post('/portfolio/execute', executeRebalancing);

export default router; 