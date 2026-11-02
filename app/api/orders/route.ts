import { NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/models/order';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET(req: Request) {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0;

    const data = await getOrders(limit, offset);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      city,
      state,
      postal_code,
      subtotal,
      discount_amount,
      tax_amount,
      shipping_fee,
      total_amount,
      payment_method,
      notes,
      items,
    } = body;

    if (!customer_name || !customer_email || !customer_phone || !shipping_address || !items?.length) {
      return NextResponse.json(
        { message: 'Please provide full contact details, shipping address, and order items' },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      city,
      state,
      postal_code,
      subtotal,
      discount_amount,
      tax_amount,
      shipping_fee,
      total_amount,
      payment_method,
      notes,
      items,
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

