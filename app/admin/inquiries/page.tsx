import React from 'react';
import { query } from '@/lib/db';
import InquiriesAdminClient from './InquiriesAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const [inquiries, consultations, quotations] = await Promise.all([
    query('SELECT * FROM inquiries ORDER BY created_at DESC'),
    query('SELECT * FROM consultations ORDER BY created_at DESC'),
    query('SELECT * FROM quotations ORDER BY created_at DESC'),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Client Leads &amp; Consultations
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Inquiries, Consultations &amp; Quotes
        </h1>
        <p className="text-xs text-cream/60">
          Track prospect leads from the contact form, 3D consultation scheduler, and quotation calculator.
        </p>
      </div>

      <InquiriesAdminClient
        initialInquiries={inquiries}
        initialConsultations={consultations}
        initialQuotations={quotations}
      />
    </div>
  );
}

