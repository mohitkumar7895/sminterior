'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Check, ShieldCheck, Sparkles, Building, Phone, CreditCard } from 'lucide-react';
import { ContactDetails } from '@/models/content';

interface Props {
  initialSettings: Record<string, string>;
  initialContact: ContactDetails | null;
}

export default function SettingsAdminClient({ initialSettings, initialContact }: Props) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [contact, setContact] = useState<any>(initialContact || {
    company_name: 'S.M. Sanjna Interior Designer',
    phone_primary: '+91 98100 87654',
    phone_secondary: '+91 11 4567 8900',
    email_primary: 'info@smsanjna.com',
    email_support: 'concierge@smsanjna.com',
    address_line1: 'Atelier & Studio, 42 Heritage Grand Boulevard, South Extension II',
    city: 'New Delhi',
    state: 'Delhi NCR',
    postal_code: '110049',
    opening_hours: 'Monday – Saturday: 10:00 AM – 8:00 PM | Sunday: By Appointment',
    instagram_url: 'https://instagram.com',
    facebook_url: 'https://facebook.com',
    linkedin_url: 'https://linkedin.com',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSettingChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleContactChange = (field: string, val: string) => {
    setContact((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, contact }),
      });

      if (res.ok) {
        setSuccessMsg('Settings updated and persisted to MySQL database!');
        setTimeout(() => setSuccessMsg(''), 3000);
        router.refresh();
      } else {
        alert('Failed to save settings');
      }
    } catch (e) {
      alert('Error updating settings');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {successMsg && (
        <div className="p-4 bg-green-950 border border-green-800 text-green-200 text-xs rounded-2xl flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-4">
        <h3 className="font-serif text-lg font-bold text-cream flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Top Announcement Marquee</span>
        </h3>
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
            Announcement Bar Text (Visible across entire public site)
          </label>
          <input
            type="text"
            value={settings.hero_announcement || ''}
            onChange={(e) => handleSettingChange('hero_announcement', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Contact & Studio Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-4">
        <h3 className="font-serif text-lg font-bold text-cream flex items-center space-x-2">
          <Building className="w-4 h-4 text-gold" />
          <span>Studio &amp; Brand Coordinates</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={contact.company_name}
              onChange={(e) => handleContactChange('company_name', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Primary Phone (Click to Call)
            </label>
            <input
              type="text"
              value={contact.phone_primary}
              onChange={(e) => handleContactChange('phone_primary', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Primary Email
            </label>
            <input
              type="email"
              value={contact.email_primary}
              onChange={(e) => handleContactChange('email_primary', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Opening Hours
            </label>
            <input
              type="text"
              value={contact.opening_hours}
              onChange={(e) => handleContactChange('opening_hours', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
            Studio Street Address
          </label>
          <input
            type="text"
            value={contact.address_line1}
            onChange={(e) => handleContactChange('address_line1', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              City
            </label>
            <input
              type="text"
              value={contact.city}
              onChange={(e) => handleContactChange('city', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              State
            </label>
            <input
              type="text"
              value={contact.state}
              onChange={(e) => handleContactChange('state', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Postal Code
            </label>
            <input
              type="text"
              value={contact.postal_code}
              onChange={(e) => handleContactChange('postal_code', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* E-Commerce & Financial Rates */}
      <div className="p-6 sm:p-8 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-4">
        <h3 className="font-serif text-lg font-bold text-cream flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-gold" />
          <span>E-Commerce &amp; Payment Gateway Config</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Free Shipping Threshold (₹)
            </label>
            <input
              type="number"
              value={settings.free_shipping_threshold || '25000'}
              onChange={(e) => handleSettingChange('free_shipping_threshold', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Standard Flat Shipping Rate (₹)
            </label>
            <input
              type="number"
              value={settings.flat_shipping_rate || '1500'}
              onChange={(e) => handleSettingChange('flat_shipping_rate', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Furniture GST Rate (%)
            </label>
            <input
              type="number"
              value={settings.tax_percentage || '18'}
              onChange={(e) => handleSettingChange('tax_percentage', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Razorpay Key ID
            </label>
            <input
              type="text"
              value={settings.razorpay_key_id || ''}
              onChange={(e) => handleSettingChange('razorpay_key_id', e.target.value)}
              placeholder="rzp_live_..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Razorpay Secret Key
            </label>
            <input
              type="password"
              value={settings.razorpay_key_secret || ''}
              onChange={(e) => handleSettingChange('razorpay_key_secret', e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>{submitting ? 'Persisting to MySQL...' : 'Save All Settings'}</span>
      </button>
    </form>
  );
}

