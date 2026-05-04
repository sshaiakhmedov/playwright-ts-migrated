import { Client } from 'pg';

/**
 * PostgreSQL Database Manager
 */
export class DbManager {
  private config: Record<string, unknown>;

  constructor(connectionString: string) {
    this.config = {
      connectionString: connectionString,
      ssl: { rejectUnauthorized: false }, // Common for cloud DBs like AWS RDS
    };
  }

  /**
   * Executes a query and returns the results.
   * USAGE: await db.query('SELECT * FROM users WHERE id = $1', [userId])
   */
  async query(sql: string, params: unknown[] = []): Promise<Record<string, unknown>[]> {
    const client = new Client(this.config);

    try {
      await client.connect();
      // Using parameterized queries ($1, $2) to prevent SQL Injection
      const result = await client.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error('Database Query Error:', error);
      throw error;
    } finally {
      await client.end(); // Always close the connection!
    }
  }

  /**
   * Helper to verify a single record exists
   */
  async getRecordCount(tableName: string, condition: string, params: unknown[] = []): Promise<number> {
    const sql = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${condition}`;
    const rows = await this.query(sql, params);
    return parseInt(rows[0].count as string);
  }
}
