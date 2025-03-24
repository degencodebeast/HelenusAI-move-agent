import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class Database {
  private db: any = null;
  
  async initialize() {
    this.db = await open({
      filename: './data/helenus.db',
      driver: sqlite3.Database
    });
    
    await this.createTables();
  }
  
  async createTables() {
    // Create necessary tables if they don't exist
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS rebalancing_plans (
        id TEXT PRIMARY KEY,
        address TEXT NOT NULL,
        risk_tolerance TEXT NOT NULL,
        plan_data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS transactions (
        tx_hash TEXT PRIMARY KEY,
        address TEXT NOT NULL,
        plan_id TEXT,
        asset TEXT NOT NULL,
        action TEXT NOT NULL,
        amount TEXT NOT NULL,
        status TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (plan_id) REFERENCES rebalancing_plans(id)
      );
    `);
  }
  
  // Methods for CRUD operations
}

export const database = new Database();
