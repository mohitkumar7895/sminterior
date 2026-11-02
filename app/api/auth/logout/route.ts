import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export async function POST() {
  removeAuthCookie();
  return NextResponse.json({ success: true });
}

