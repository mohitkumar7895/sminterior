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
    const { name, slug, description, image, is_featured, display_order } = await req.json();

    await execute(
      'UPDATE categories SET name = ?, slug = ?, description = ?, image = ?, is_featured = ?, display_order = ? WHERE id = ?',
      [name, slug, description || null, image || null, is_featured ? 1 : 0, display_order || 0, id]
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
    await execute('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

