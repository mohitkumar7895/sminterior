import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { getOrderByNumber } from '@/models/order';
import { getAuthUser } from '@/lib/auth/jwt';

interface Props {
  params: { id: string };
}

export async function GET(req: Request, { params }: Props) {
  try {
    const order = await queryOne('SELECT * FROM orders WHERE id = ?', [params.id]);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ order });
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
    const { order_status, payment_status, tracking_number, notes } = await req.json();

    await execute(
      'UPDATE orders SET order_status = ?, payment_status = ?, tracking_number = ?, notes = ? WHERE id = ?',
      [order_status, payment_status, tracking_number || null, notes || null, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

