import { NextResponse } from 'next/server';
import { getProducts } from '@/models/product';
import { execute, queryOne, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const subcategory = searchParams.get('subcategory') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = (searchParams.get('sortBy') as any) || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0;

    const data = await getProducts({ category, subcategory, search, sortBy, limit, offset });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Products API error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      short_description,
      description,
      category_id,
      subcategory_id,
      base_price,
      discount_price,
      sku,
      stock_quantity,
      is_featured,
      dimensions,
      material,
      finish,
      warranty,
      delivery_time,
      care_instructions,
      tags,
      images, // array of url strings
      variants, // array of { type, value, price_adj }
    } = body;

    if (!name || !base_price) {
      return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
    }

    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const result = await transaction(async (conn) => {
      const [res]: any = await conn.execute(
        `INSERT INTO products (
          name, slug, short_description, description, category_id, subcategory_id,
          base_price, discount_price, sku, stock_quantity, is_featured, is_in_stock,
          dimensions, material, finish, warranty, delivery_time, care_instructions, tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          generatedSlug,
          short_description || null,
          description || null,
          category_id || null,
          subcategory_id || null,
          base_price,
          discount_price || null,
          sku || null,
          stock_quantity || 10,
          is_featured ? 1 : 0,
          dimensions || null,
          material || null,
          finish || null,
          warranty || '5-Year Warranty',
          delivery_time || '7-14 Business Days',
          care_instructions || null,
          tags || null,
        ]
      );

      const productId = res.insertId;

      // Insert images if provided
      if (Array.isArray(images) && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          if (images[i]) {
            await conn.execute(
              'INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES (?, ?, ?, ?)',
              [productId, images[i], i === 0 ? 1 : 0, i]
            );
          }
        }
      }

      // Insert variants if provided
      if (Array.isArray(variants) && variants.length > 0) {
        for (const v of variants) {
          if (v.type && v.value) {
            await conn.execute(
              'INSERT INTO product_variants (product_id, variant_type, variant_value, price_adjustment) VALUES (?, ?, ?, ?)',
              [productId, v.type, v.value, v.price_adj || 0]
            );
          }
        }
      }

      return { id: productId, slug: generatedSlug };
    });

    return NextResponse.json({ success: true, product: result });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

