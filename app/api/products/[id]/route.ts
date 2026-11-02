import { NextResponse } from 'next/server';
import { execute, queryOne, transaction } from '@/lib/db';
import { getProductById } from '@/models/product';
import { getAuthUser } from '@/lib/auth/jwt';

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  try {
    const product = await getProductById(parseInt(params.id, 10));
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
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
      is_in_stock,
      dimensions,
      material,
      finish,
      warranty,
      delivery_time,
      care_instructions,
      tags,
      images,
      variants,
    } = body;

    await transaction(async (conn) => {
      await conn.execute(
        `UPDATE products SET
          name = ?, slug = ?, short_description = ?, description = ?,
          category_id = ?, subcategory_id = ?, base_price = ?, discount_price = ?,
          sku = ?, stock_quantity = ?, is_featured = ?, is_in_stock = ?,
          dimensions = ?, material = ?, finish = ?, warranty = ?,
          delivery_time = ?, care_instructions = ?, tags = ?
        WHERE id = ?`,
        [
          name,
          slug,
          short_description || null,
          description || null,
          category_id || null,
          subcategory_id || null,
          base_price,
          discount_price || null,
          sku || null,
          stock_quantity,
          is_featured ? 1 : 0,
          is_in_stock ? 1 : 0,
          dimensions || null,
          material || null,
          finish || null,
          warranty || null,
          delivery_time || null,
          care_instructions || null,
          tags || null,
          id,
        ]
      );

      // If new images provided, refresh images
      if (Array.isArray(images) && images.length > 0) {
        await conn.execute('DELETE FROM product_images WHERE product_id = ?', [id]);
        for (let i = 0; i < images.length; i++) {
          if (images[i]) {
            await conn.execute(
              'INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES (?, ?, ?, ?)',
              [id, images[i], i === 0 ? 1 : 0, i]
            );
          }
        }
      }

      // If new variants provided, refresh variants
      if (Array.isArray(variants)) {
        await conn.execute('DELETE FROM product_variants WHERE product_id = ?', [id]);
        for (const v of variants) {
          if (v.type && v.value) {
            await conn.execute(
              'INSERT INTO product_variants (product_id, variant_type, variant_value, price_adjustment) VALUES (?, ?, ?, ?)',
              [id, v.type, v.value, v.price_adj || 0]
            );
          }
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    await execute('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

