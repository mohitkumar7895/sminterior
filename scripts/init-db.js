const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function initDB() {
  console.log('Connecting to MySQL...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    console.log('Connected to MySQL. Creating and preparing database `svinterior`...');
    await connection.query('CREATE DATABASE IF NOT EXISTS svinterior CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
    await connection.query('USE svinterior;');

    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing database/schema.sql...');
    await connection.query(sql);

    console.log('Database tables created successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

initDB();

