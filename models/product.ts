import { query, queryOne, execute } from '@/lib/db';

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  variant_type: string;
  variant_value: string;
  price_adjustment: number;
  sku?: string;
  stock_quantity: number;
  image_url?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  subcategory_id?: number;
  subcategory_name?: string;
  subcategory_slug?: string;
  base_price: number;
  discount_price?: number | null;
  sku?: string;
  stock_quantity: number;
  is_featured: boolean;
  is_in_stock: boolean;
  rating: number;
  reviews_count: number;
  dimensions?: string;
  material?: string;
  finish?: string;
  warranty?: string;
  delivery_time?: string;
  care_instructions?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  primary_image?: string;
}

export interface ProductFilterParams {
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'popular';
  limit?: number;
  offset?: number;
}

export async function getProducts(params: ProductFilterParams = {}): Promise<{ products: Product[]; total: number }> {
  const whereClauses: string[] = ['1=1'];
  const queryParams: any[] = [];

  if (params.category) {
    whereClauses.push('(c.slug = ? OR c.id = ?)');
    queryParams.push(params.category, params.category);
  }

  if (params.subcategory) {
    whereClauses.push('(sc.slug = ? OR sc.id = ?)');
    queryParams.push(params.subcategory, params.subcategory);
  }

  if (params.search) {
    whereClauses.push('(p.name LIKE ? OR p.short_description LIKE ? OR p.tags LIKE ? OR p.material LIKE ?)');
    const searchTerm = `%${params.search}%`;
    queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (params.minPrice !== undefined && !isNaN(params.minPrice)) {
    whereClauses.push('COALESCE(p.discount_price, p.base_price) >= ?');
    queryParams.push(params.minPrice);
  }

  if (params.maxPrice !== undefined && !isNaN(params.maxPrice)) {
    whereClauses.push('COALESCE(p.discount_price, p.base_price) <= ?');
    queryParams.push(params.maxPrice);
  }

  if (params.isFeatured) {
    whereClauses.push('p.is_featured = 1');
  }

  let orderBy = 'p.created_at DESC';
  if (params.sortBy === 'price_asc') {
    orderBy = 'COALESCE(p.discount_price, p.base_price) ASC';
  } else if (params.sortBy === 'price_desc') {
    orderBy = 'COALESCE(p.discount_price, p.base_price) DESC';
  } else if (params.sortBy === 'rating') {
    orderBy = 'p.rating DESC';
  } else if (params.sortBy === 'popular') {
    orderBy = 'p.reviews_count DESC, p.rating DESC';
  }

  const whereString = whereClauses.join(' AND ');

  // Count total matching
  const countSql = `
    SELECT COUNT(*) as total
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
    WHERE ${whereString}
  `;
  const countResult = await queryOne<{ total: number }>(countSql, queryParams);
  const total = countResult?.total || 0;

  // Query products with primary image
  const limit = params.limit || 24;
  const offset = params.offset || 0;

  const sql = `
    SELECT
      p.*,
      c.name AS category_name,
      c.slug AS category_slug,
      sc.name AS subcategory_name,
      sc.slug AS subcategory_slug,
      (
        SELECT image_url
        FROM product_images
        WHERE product_id = p.id
        ORDER BY is_primary DESC, display_order ASC, id ASC
        LIMIT 1
      ) AS primary_image
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
    WHERE ${whereString}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  const products = await query<Product>(sql, [...queryParams, limit, offset]);
  return { products, total };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sql = `
    SELECT
      p.*,
      c.name AS category_name,
      c.slug AS category_slug,
      sc.name AS subcategory_name,
      sc.slug AS subcategory_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
    WHERE p.slug = ?
    LIMIT 1
  `;
  const product = await queryOne<Product>(sql, [slug]);
  if (!product) return null;

  // Fetch images
  const images = await query<ProductImage>(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC',
    [product.id]
  );
  product.images = images;
  product.primary_image = images[0]?.image_url;

  // Fetch variants
  const variants = await query<ProductVariant>(
    'SELECT * FROM product_variants WHERE product_id = ? ORDER BY variant_type, price_adjustment ASC',
    [product.id]
  );
  product.variants = variants;

  return product;
}

export async function getProductById(id: number): Promise<Product | null> {
  const sql = `
    SELECT
      p.*,
      c.name AS category_name,
      c.slug AS category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
    LIMIT 1
  `;
  const product = await queryOne<Product>(sql, [id]);
  if (!product) return null;

  const images = await query<ProductImage>(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC',
    [product.id]
  );
  product.images = images;
  product.primary_image = images[0]?.image_url;

  const variants = await query<ProductVariant>(
    'SELECT * FROM product_variants WHERE product_id = ? ORDER BY variant_type, price_adjustment ASC',
    [product.id]
  );
  product.variants = variants;

  return product;
}

export async function getRelatedProducts(productId: number, categoryId?: number, limit = 4): Promise<Product[]> {
  const sql = `
    SELECT
      p.*,
      c.name AS category_name,
      (
        SELECT image_url
        FROM product_images
        WHERE product_id = p.id
        ORDER BY is_primary DESC, display_order ASC, id ASC
        LIMIT 1
      ) AS primary_image
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id != ? AND (p.category_id = ? OR ? IS NULL)
    ORDER BY p.is_featured DESC, p.created_at DESC
    LIMIT ?
  `;
  return query<Product>(sql, [productId, categoryId || null, categoryId || null, limit]);
}

