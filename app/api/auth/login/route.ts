import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne, execute } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const admin = await queryOne<any>(
      'SELECT * FROM admins WHERE email = ? AND is_active = 1 LIMIT 1',
      [email.trim().toLowerCase()]
    );

    if (!admin) {
      return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
    }

    const isMatch = bcrypt.compareSync(password, admin.password_hash);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
    }

    // Update last login
    await execute('UPDATE admins SET last_login = NOW() WHERE id = ?', [admin.id]);

    const payload = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    const token = signToken(payload);
    setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: payload,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

