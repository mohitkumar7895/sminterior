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

async function checkImages() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST || '127.0.0.1',
    port: parseInt(env.DB_PORT || '3306', 10),
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'svinterior',
  });

  console.log('Checking for blank image URLs...');

  const [products] = await connection.query(`
    SELECT p.id, p.name, p.slug,
      (SELECT COUNT(*) FROM product_images WHERE product_id = p.id) as img_count
    FROM products p
  `);
  console.log('Products without images:', products.filter(p => p.img_count === 0));

  const [services] = await connection.query(`
    SELECT id, name, slug, hero_image FROM services WHERE hero_image IS NULL OR hero_image = ''
  `);
  console.log('Services with blank hero_image:', services);

  const [projects] = await connection.query(`
    SELECT id, title, slug, hero_image, before_image, after_image FROM projects
    WHERE hero_image IS NULL OR hero_image = '' OR before_image IS NULL OR after_image IS NULL
  `);
  console.log('Projects with blank images:', projects);

  const [categories] = await connection.query(`
    SELECT id, name, slug, image FROM categories WHERE image IS NULL OR image = ''
  `);
  console.log('Categories with blank image:', categories);

  await connection.end();
}

checkImages().catch(console.error);

