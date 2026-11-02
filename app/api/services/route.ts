import { NextResponse } from 'next/server';
import { getServices } from '@/models/service';
import { execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ services });
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

    const {
      name,
      slug,
      short_description,
      full_description,
      icon,
      hero_image,
      starting_price,
      timeline,
      features,
      process_steps,
      display_order,
      is_featured,
    } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Service name is required' }, { status: 400 });
    }

    const sSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const res = await execute(
      `INSERT INTO services (
        name, slug, short_description, full_description, icon,
        hero_image, starting_price, timeline, features, process_steps,
        display_order, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        sSlug,
        short_description || null,
        full_description || null,
        icon || 'Sparkles',
        hero_image || null,
        starting_price || null,
        timeline || '4-8 Weeks',
        features ? JSON.stringify(features) : null,
        process_steps ? JSON.stringify(process_steps) : null,
        display_order || 0,
        is_featured ? 1 : 0,
      ]
    );

    return NextResponse.json({ success: true, id: res.insertId });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

