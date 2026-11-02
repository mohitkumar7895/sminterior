import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = getAuthUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user });
}

