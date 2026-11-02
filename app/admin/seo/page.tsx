import React from 'react';
import { query } from '@/lib/db';
import SeoAdminClient from './SeoAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminSeoPage() {
  const pages = await query('SELECT * FROM seo_metadata ORDER BY page_route ASC');

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Search Engine Architecture
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Dynamic SEO &amp; Meta Tag Management
        </h1>
        <p className="text-xs text-cream/60">
          Modify Meta Titles, OpenGraph social cards, canonical tags, H1 headings, and robots indexation directly from this dashboard without writing code.
        </p>
      </div>

      <SeoAdminClient initialPages={pages} />
    </div>
  );
}

