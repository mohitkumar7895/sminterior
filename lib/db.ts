import mysql, { Pool, PoolOptions, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// Global cache for connection pool in development to prevent exhausting pool connections during hot-reloads
declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: Pool | undefined;
}

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'svinterior',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  namedPlaceholders: false,
  connectTimeout: 5000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
};

let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = mysql.createPool(poolOptions);
} else {
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool(poolOptions);
  }
  pool = global._mysqlPool;
}

export { pool };

/**
 * Check if an error is a database connection/network failure
 */
function isConnectionFailure(error: any): boolean {
  if (!error) return false;
  const code = error.code || '';
  const message = error.message || '';
  return (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'ETIMEDOUT' ||
    code === 'EACCES' ||
    code === 'EHOSTUNREACH' ||
    code === 'PROTOCOL_CONNECTION_LOST' ||
    code === 'ER_ACCESS_DENIED_ERROR' ||
    message.includes('ECONNREFUSED') ||
    message.includes('connect EACCES')
  );
}

/**
 * Execute a SELECT query and return typed array of rows
 * If database is unreachable (e.g. during Vercel static build), returns empty array instead of crashing
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[] & T[]>(sql, params);
    return rows as T[];
  } catch (error: any) {
    if (isConnectionFailure(error)) {
      console.warn(`[MySQL Server Notice] Database offline or unreachable (${error.code || error.message}) for query: ${sql.trim().slice(0, 60)}... Falling back to safe empty dataset.`);
      return [] as T[];
    }
    console.error('MySQL query error:', { sql, params, error });
    throw error;
  }
}

/**
 * Execute a query expecting a single row or null
 */
export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  try {
    const rows = await query<T>(sql, params);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (error: any) {
    if (isConnectionFailure(error)) {
      return null;
    }
    throw error;
  }
}

/**
 * Execute an INSERT, UPDATE, or DELETE statement and return ResultSetHeader
 */
export async function execute(sql: string, params: any[] = []): Promise<ResultSetHeader> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, params);
    return result;
  } catch (error) {
    console.error('MySQL execute error:', { sql, params, error });
    throw error;
  }
}

/**
 * Helper to run transactions with an acquired connection
 */
export async function transaction<T>(callback: (conn: mysql.PoolConnection) => Promise<T>): Promise<T> {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

