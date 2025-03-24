# HelenusAI Move Agent - TypeScript Backend

A TypeScript implementation of HelenusAI using Move Agent Kit to interact with Move-based blockchains.

## Features

- Interact with Move-based blockchains using the Move Agent Kit
- Check balances of addresses
- Transfer tokens between addresses
- Process natural language queries using LLM integration

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Anthropic API key
- Aptos private key

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   APTOS_NETWORK=devnet
   APTOS_PRIVATE_KEY=your-private-key
   ANTHROPIC_API_KEY=your-anthropic-api-key
   PORT=8000
   ```

## Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm run build
npm start
```

## API Endpoints

- `GET /api/balance/:address` - Get balance of an address
- `POST /api/transfer` - Transfer tokens
  - Request body: `{ "recipientAddress": "0x...", "amount": "10" }`
- `POST /api/query` - Process a natural language query
  - Request body: `{ "query": "What is my balance?" }`

## WebSocket

- Connect to `/ws/query` to interact with the agent in real-time
- Send message: `{ "query": "Transfer 10 APT to 0x..." }`

## License

MIT 