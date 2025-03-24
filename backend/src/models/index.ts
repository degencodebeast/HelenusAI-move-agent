export interface TransferRequest {
  recipientAddress: string;
  amount: string;
}

export interface BalanceRequest {
  address: string;
}

export interface QueryRequest {
  query: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface BalanceResponse {
  address: string;
  balance: string;
}

export interface TransferResponse {
  txHash: string;
  status: string;
}

export interface QueryResponse {
  response: string;
} 