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
    const { status, admin_notes } = await req.json();

    await execute('UPDATE quotations SET status = ?, admin_notes = ? WHERE id = ?', [
      status,
      admin_notes || null,
      id,
    ]);

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
    await execute('DELETE FROM quotations WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

