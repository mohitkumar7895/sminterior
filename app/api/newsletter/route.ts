import { NextResponse } from 'next/server';
import { execute } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Valid email required' }, { status: 400 });
    }

    await execute(
      'INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE is_active = 1',
      [email.trim().toLowerCase()]
    );

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

