import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/privacy-policy',
    'Privacy Policy | S.M. Sanjna Interior Designer',
    'Our commitment to privacy, personal data protection, and secure transactions.'
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream-light min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-cream p-8 sm:p-12 rounded-3xl border border-luxury-200">
        <div className="space-y-2 border-b border-luxury-200 pb-6">
          <span className="text-xs uppercase tracking-widest text-gold font-bold block">Legal &amp; Trust</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-walnut-dark">Privacy Policy</h1>
          <p className="text-xs text-walnut/60">Last updated: November 2025</p>
        </div>

        <div className="prose prose-luxury text-xs sm:text-sm text-walnut/80 space-y-6 font-light leading-relaxed">
          <p>
            At <strong>S.M. Sanjna Interior Designer</strong>, we hold your trust in the highest regard. This Privacy Policy outlines how our atelier collects, uses, and safeguards the personal and architectural information you entrust to us.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">1. Information We Collect</h3>
          <p>
            When you schedule an architectural consultation, request an itemized quotation, or purchase handcrafted furniture, we collect relevant contact coordinates (name, email, phone number), site delivery addresses, and room architectural specifications or floorplan blueprints.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">2. How We Utilize Your Data</h3>
          <p>
            Your information is strictly utilized to facilitate turnkey interior design deliverables, dispatch white-glove furniture deliveries, verify architectural laser scans, and communicate project milestones. We never sell, lease, or monetize your personal information to third parties.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">3. Payment &amp; Security</h3>
          <p>
            All online financial transactions are encrypted through 256-bit SSL protocols. We do not store full credit card numbers or banking passwords on our local servers.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">4. Contacting Our Data Concierge</h3>
          <p>
            For any queries or requests regarding your personal records, please email our privacy officer at <a href="mailto:privacy@smsanjna.com" className="text-gold font-medium hover:underline">privacy@smsanjna.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

