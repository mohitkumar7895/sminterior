import { NextResponse } from 'next/server';
import { getProjects } from '@/models/project';
import { execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const projects = await getProjects(category);
    return NextResponse.json({ projects });
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
      title,
      slug,
      category,
      client_name,
      location,
      completion_year,
      area_sqft,
      budget_range,
      description,
      hero_image,
      before_image,
      after_image,
      gallery_images,
      challenges,
      solutions,
      testimonial_quote,
      display_order,
      is_featured,
    } = await req.json();

    if (!title || !hero_image) {
      return NextResponse.json({ message: 'Title and hero image are required' }, { status: 400 });
    }

    const pSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const res = await execute(
      `INSERT INTO projects (
        title, slug, category, client_name, location,
        completion_year, area_sqft, budget_range, description,
        hero_image, before_image, after_image, gallery_images,
        challenges, solutions, testimonial_quote, display_order, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        pSlug,
        category || 'Residential',
        client_name || null,
        location || null,
        completion_year || new Date().getFullYear(),
        area_sqft || 2500,
        budget_range || null,
        description || null,
        hero_image,
        before_image || null,
        after_image || null,
        gallery_images ? JSON.stringify(gallery_images) : null,
        challenges || null,
        solutions || null,
        testimonial_quote || null,
        display_order || 0,
        is_featured ? 1 : 0,
      ]
    );

    return NextResponse.json({ success: true, id: res.insertId });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

