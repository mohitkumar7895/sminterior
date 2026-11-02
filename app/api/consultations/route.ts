import { NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { createConsultation } from '@/models/inquiry';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET() {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const consultations = await query('SELECT * FROM consultations ORDER BY created_at DESC');
    return NextResponse.json({ consultations });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, preferred_date, preferred_time, property_type, room_type, estimated_budget, notes } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ message: 'Name, phone, and email are required' }, { status: 400 });
    }

    const res = await createConsultation({
      name, email, phone, preferred_date, preferred_time,
      property_type, room_type, estimated_budget, notes,
    });

    return NextResponse.json({ success: true, id: res.insertId });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

