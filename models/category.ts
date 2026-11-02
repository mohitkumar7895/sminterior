import { query, queryOne, execute } from '@/lib/db';

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  display_order: number;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  is_featured: boolean;
  display_order: number;
  subcategories?: Subcategory[];
  product_count?: number;
}

export async function getCategories(includeSubcategories = true): Promise<Category[]> {
  const sql = `
    SELECT
      c.*,
      COUNT(p.id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.display_order ASC, c.name ASC
  `;
  const categories = await query<Category>(sql);

  if (includeSubcategories && categories.length > 0) {
    const subSql = `
      SELECT *
      FROM subcategories
      ORDER BY display_order ASC, name ASC
    `;
    const allSubs = await query<Subcategory>(subSql);

    for (const cat of categories) {
      cat.subcategories = allSubs.filter(s => s.category_id === cat.id);
    }
  }

  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cat = await queryOne<Category>('SELECT * FROM categories WHERE slug = ? LIMIT 1', [slug]);
  if (!cat) return null;

  cat.subcategories = await query<Subcategory>(
    'SELECT * FROM subcategories WHERE category_id = ? ORDER BY display_order ASC, name ASC',
    [cat.id]
  );
  return cat;
}

