import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/terms',
    'Terms & Conditions | S.M. Sanjna Interior Designer',
    'Terms of service, warranty conditions, custom furniture orders, and white-glove delivery policies.'
  );
}

export default function TermsPage() {
  return (
    <div className="bg-cream-light min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-cream p-8 sm:p-12 rounded-3xl border border-luxury-200">
        <div className="space-y-2 border-b border-luxury-200 pb-6">
          <span className="text-xs uppercase tracking-widest text-gold font-bold block">Client Terms</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-walnut-dark">Terms &amp; Conditions</h1>
          <p className="text-xs text-walnut/60">Last updated: November 2025</p>
        </div>

        <div className="prose prose-luxury text-xs sm:text-sm text-walnut/80 space-y-6 font-light leading-relaxed">
          <p>
            Welcome to <strong>S.M. Sanjna Interior Designer</strong>. By commissioning our architectural services or purchasing furniture through our online portal, you agree to the following terms of engagement.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">1. Turnkey Interior Execution &amp; BOQ</h3>
          <p>
            All architectural and interior fit-out projects are governed by our finalized, signed Bill of Quantities (BOQ). Scope alterations requested after drawing approvals will be itemized via mutual change orders with transparent rates.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">2. 10-Year Atelier Warranty</h3>
          <p>
            Our 10-Year Warranty covers structural joinery integrity, delamination of Marine Grade BWP ply, and wood borer protection. Moving hardware mechanisms (Blum / Hettich) carry lifetime manufacturer replacement warranties. Normal surface wear and tear, intentional scratching, or chemical misuse are excluded.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">3. White-Glove Delivery &amp; Assembly</h3>
          <p>
            Our logistics team inspects, delivers, and installs furniture in your designated room. Patrons are requested to inspect the pieces upon uncrating before signing the delivery acceptance manifest.
          </p>

          <h3 className="font-serif text-lg font-bold text-walnut-dark pt-2">4. Custom Commissioned Furniture</h3>
          <p>
            Bespoke pieces built to custom customer-provided dimensions and fabrics cannot be returned once production cutting commences, unless a physical manufacturing defect exists.
          </p>
        </div>
      </div>
    </div>
  );
}

