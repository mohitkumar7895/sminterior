import { NextResponse } from 'next/server';
import { execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';

interface Props {
  params: { id: string };
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
    } = body;

    await execute(
      `UPDATE projects SET
        title = ?, slug = ?, category = ?, client_name = ?, location = ?,
        completion_year = ?, area_sqft = ?, budget_range = ?, description = ?,
        hero_image = ?, before_image = ?, after_image = ?, gallery_images = ?,
        challenges = ?, solutions = ?, testimonial_quote = ?, display_order = ?, is_featured = ?
      WHERE id = ?`,
      [
        title,
        slug,
        category,
        client_name || null,
        location || null,
        completion_year,
        area_sqft,
        budget_range || null,
        description || null,
        hero_image,
        before_image || null,
        after_image || null,
        typeof gallery_images === 'object' ? JSON.stringify(gallery_images) : gallery_images || null,
        challenges || null,
        solutions || null,
        testimonial_quote || null,
        display_order || 0,
        is_featured ? 1 : 0,
        id,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
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
    await execute('DELETE FROM projects WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

