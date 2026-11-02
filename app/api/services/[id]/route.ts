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
    } = body;

    await execute(
      `UPDATE services SET
        name = ?, slug = ?, short_description = ?, full_description = ?,
        icon = ?, hero_image = ?, starting_price = ?, timeline = ?,
        features = ?, process_steps = ?, display_order = ?, is_featured = ?
      WHERE id = ?`,
      [
        name,
        slug,
        short_description || null,
        full_description || null,
        icon || 'Sparkles',
        hero_image || null,
        starting_price || null,
        timeline || null,
        typeof features === 'object' ? JSON.stringify(features) : features || null,
        typeof process_steps === 'object' ? JSON.stringify(process_steps) : process_steps || null,
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
    await execute('DELETE FROM services WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

