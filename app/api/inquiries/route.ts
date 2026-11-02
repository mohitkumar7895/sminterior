import { NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { createInquiry } from '@/models/inquiry';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET() {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const inquiries = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
    return NextResponse.json({ inquiries });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, service_interested } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email, and message are required' }, { status: 400 });
    }

    const res = await createInquiry({ name, email, phone, subject, message, service_interested });
    return NextResponse.json({ success: true, id: res.insertId });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

