import { NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { createQuotation } from '@/models/inquiry';
import { getAuthUser } from '@/lib/auth/jwt';

export async function GET() {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const quotations = await query('SELECT * FROM quotations ORDER BY created_at DESC');
    return NextResponse.json({ quotations });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, project_type, area_sqft, budget_range, requirements, floor_plan_url } = body;

    if (!name || !phone || !email || !project_type) {
      return NextResponse.json({ message: 'Name, phone, email, and project type are required' }, { status: 400 });
    }

    const res = await createQuotation({
      name, email, phone, project_type, area_sqft, budget_range, requirements, floor_plan_url,
    });

    return NextResponse.json({ success: true, id: res.insertId });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

