import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim();

    if (!q) {
      return NextResponse.json({ products: [], services: [] });
    }

    const searchTerm = `%${q}%`;

    const products = await query(
      `SELECT
        p.id, p.name, p.slug, p.base_price, p.discount_price,
        (
          SELECT image_url FROM product_images
          WHERE product_id = p.id
          ORDER BY is_primary DESC, id ASC LIMIT 1
        ) as primary_image
       FROM products p
       WHERE p.name LIKE ? OR p.short_description LIKE ? OR p.tags LIKE ?
       ORDER BY p.is_featured DESC
       LIMIT 6`,
      [searchTerm, searchTerm, searchTerm]
    );

    const services = await query(
      `SELECT id, name, slug, short_description, hero_image, icon
       FROM services
       WHERE name LIKE ? OR short_description LIKE ?
       ORDER BY display_order ASC
       LIMIT 4`,
      [searchTerm, searchTerm]
    );

    return NextResponse.json({ products, services });
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ products: [], services: [] }, { status: 500 });
  }
}
