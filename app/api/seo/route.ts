import { NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pages = await query('SELECT * FROM seo_metadata ORDER BY page_route ASC');
    return NextResponse.json({ pages });
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

    const {
      page_route,
      page_title,
      meta_title,
      meta_description,
      meta_keywords,
      canonical_url,
      og_title,
      og_description,
      og_image,
      h1_heading,
      robots_index,
      robots_follow,
    } = await req.json();

    if (!page_route) {
      return NextResponse.json({ message: 'Page route is required' }, { status: 400 });
    }

    await execute(
      `INSERT INTO seo_metadata (
        page_route, page_title, meta_title, meta_description, meta_keywords,
        canonical_url, og_title, og_description, og_image, h1_heading,
        robots_index, robots_follow
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        page_title = VALUES(page_title),
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description),
        meta_keywords = VALUES(meta_keywords),
        canonical_url = VALUES(canonical_url),
        og_title = VALUES(og_title),
        og_description = VALUES(og_description),
        og_image = VALUES(og_image),
        h1_heading = VALUES(h1_heading),
        robots_index = VALUES(robots_index),
        robots_follow = VALUES(robots_follow)`,
      [
        page_route,
        page_title || meta_title,
        meta_title,
        meta_description || null,
        meta_keywords || null,
        canonical_url || null,
        og_title || meta_title,
        og_description || meta_description || null,
        og_image || null,
        h1_heading || null,
        robots_index ? 1 : 0,
        robots_follow ? 1 : 0,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
