const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Read .env manually
const envPath = path.join(__dirname, '..', '.env');
const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.trim().split('=');
    if (k && v.length) env[k.trim()] = v.join('=').trim();
  });
}

async function verify() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST || '127.0.0.1',
    port: parseInt(env.DB_PORT || '3306', 10),
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'svinterior',
  });

  console.log('Connected to MySQL svinterior successfully!');

  const tables = [
    'admins', 'categories', 'subcategories', 'products', 'product_images',
    'product_variants', 'services', 'projects', 'project_images',
    'testimonials', 'blogs', 'banners', 'faqs', 'seo_metadata', 'settings'
  ];

  for (const t of tables) {
    const [rows] = await connection.query(`SELECT COUNT(*) as count FROM ${t}`);
    console.log(`Table ${t.padEnd(20)}: ${rows[0].count} records`);
  }

  // Check admin
  const [admins] = await connection.query('SELECT id, name, email, role FROM admins');
  console.log('\nAdmin users:', admins);

  await connection.end();
}

verify().catch(console.error);
