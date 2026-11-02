import { NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { getSettings, getContactDetails } from '@/models/content';
import { getAuthUser } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [settings, contact] = await Promise.all([
      getSettings(),
      getContactDetails(),
    ]);
    return NextResponse.json({ settings, contact });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { settings, contact } = await req.json();

    if (settings && typeof settings === 'object') {
      for (const [key, val] of Object.entries(settings)) {
        await execute(
          'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
          [key, String(val)]
        );
      }
    }

    if (contact && typeof contact === 'object') {
      await execute(
        `UPDATE contact_details SET
          company_name = ?, phone_primary = ?, phone_secondary = ?,
          email_primary = ?, email_support = ?, address_line1 = ?,
          city = ?, state = ?, postal_code = ?, opening_hours = ?,
          instagram_url = ?, facebook_url = ?, linkedin_url = ?
        WHERE id = 1`,
        [
          contact.company_name,
          contact.phone_primary,
          contact.phone_secondary || null,
          contact.email_primary,
          contact.email_support || null,
          contact.address_line1,
          contact.city,
          contact.state,
          contact.postal_code,
          contact.opening_hours,
          contact.instagram_url || null,
          contact.facebook_url || null,
          contact.linkedin_url || null,
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
