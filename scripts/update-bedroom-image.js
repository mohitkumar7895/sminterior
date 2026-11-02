const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.trim().split('=');
    if (k && v.length) env[k.trim()] = v.join('=').trim();
  });
}

async function update() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST || '127.0.0.1',
    port: parseInt(env.DB_PORT || '3306', 10),
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'svinterior',
  });

  const [res] = await connection.query(`
    UPDATE services
    SET hero_image = '/images/services/bedroom-interior.jpg'
    WHERE slug = 'bedroom-interior' OR slug = 'bedroom-interior-design'
  `);

  console.log('Updated bedroom-interior service image in MySQL:', res.affectedRows);

  const [rows] = await connection.query(`
    SELECT id, name, slug, hero_image FROM services WHERE slug LIKE '%bedroom%'
  `);
  console.log('Result in DB:', rows);

  await connection.end();
}

update().catch(console.error);

