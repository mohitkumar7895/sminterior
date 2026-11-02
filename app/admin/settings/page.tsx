import React from 'react';
import { getSettings, getContactDetails } from '@/models/content';
import SettingsAdminClient from './SettingsAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const [settings, contact] = await Promise.all([
    getSettings(),
    getContactDetails(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Atelier System Configuration
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Settings &amp; Business Information
        </h1>
        <p className="text-xs text-cream/60">
          Update studio address, contact phone numbers, announcement marquee, tax rate, and payment gateway credentials.
        </p>
      </div>

      <SettingsAdminClient initialSettings={settings} initialContact={contact} />
    </div>
  );
}

