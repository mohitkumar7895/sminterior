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

  const [products] = await connection.query(`
    SELECT id FROM products WHERE slug = 'sovereign-solid-teak-brass-bed' LIMIT 1
  `);

  if (products.length > 0) {
    const prodId = products[0].id;

    // Reset primary and orders
    await connection.query('DELETE FROM product_images WHERE product_id = ?', [prodId]);

    // Insert the two generated images as primary and secondary
    await connection.query(`
      INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order)
      VALUES
      (?, '/images/products/sovereign-bed-main.jpg', 'The Sovereign Solid Teak & Brass Bed - Master Suite Hero', 1, 0),
      (?, '/images/products/sovereign-bed-detail.jpg', 'The Sovereign Bed - Handcrafted Teak Flutes & Brushed Brass Inlay Detail', 0, 1),
      (?, 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80', 'The Sovereign Bed - Atelier Bedroom Setting', 0, 2)
    `, [prodId, prodId, prodId]);

    console.log('Successfully updated Sovereign bed gallery images!');

    const [imgs] = await connection.query(`
      SELECT id, image_url, is_primary, display_order FROM product_images WHERE product_id = ? ORDER BY display_order ASC
    `, [prodId]);
    console.log('Updated images:', imgs);
  }

  await connection.end();
}

update().catch(console.error);
