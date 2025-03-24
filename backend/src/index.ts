import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expressWs from 'express-ws';
import routes from './api/routes';
import { moveAgentService } from './intelligence/moveAgentService';
import { agentService } from './intelligence/agentService';

// Load environment variables
dotenv.config();

// Initialize Express app with WebSocket support
const app = express();
const wsInstance = expressWs(app);
const appWithWs = wsInstance.app;

// Configure middleware
app.use(cors());
app.use(express.json());

// Initialize services
async function initialize() {
  try {
    // Initialize Move Agent Service
    await moveAgentService.initialize();
    console.log('Move Agent Service initialized successfully');
    
    // Initialize Agent Service with custom tools
    await agentService.initialize();
    console.log('Agent Service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

// API routes
app.use('/api', routes);

// WebSocket endpoint for real-time queries
appWithWs.ws('/ws/query', (ws, req) => {
  ws.on('message', async (msg) => {
    try {
      const { query } = JSON.parse(msg.toString());
      if (!query) {
        ws.send(JSON.stringify({ error: 'Query is required' }));
        return;
      }
      
      // Use the agent service to process queries
      const response = await agentService.processQuery(query);
      ws.send(JSON.stringify({ success: true, data: response }));
    } catch (error) {
      ws.send(JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Error processing query' 
      }));
    }
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    ws.send(JSON.stringify({ success: false, error: 'WebSocket error occurred' }));
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initialize();
});