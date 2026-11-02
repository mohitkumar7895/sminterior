import { NextResponse } from 'next/server';
import { getCategories } from '@/models/category';
import { execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET() {
  try {
    const categories = await getCategories(true);
    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, slug, description, image, is_featured, display_order } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const res = await execute(
      'INSERT INTO categories (name, slug, description, image, is_featured, display_order) VALUES (?, ?, ?, ?, ?, ?)',
      [name, catSlug, description || null, image || null, is_featured ? 1 : 0, display_order || 0]
    );

    return NextResponse.json({ success: true, id: res.insertId });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

