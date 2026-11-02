'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ContactCtaBanner() {
  const { openConsultationModal } = useAuth();

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-walnut-dark via-walnut to-charcoal text-cream relative overflow-hidden border-t border-luxury-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>Begin Your Transformation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          Ready to Craft an Extraordinary Space?
        </h2>

        <p className="text-sm sm:text-base text-cream/80 max-w-xl mx-auto font-light leading-relaxed">
          Schedule your private architectural consultation at our Delhi studio or directly at your site. Receive comprehensive 3D layouts, transparent pricing, and design inspiration.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openConsultationModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Free 3D Design Consultation</span>
          </button>

          <Link
            href="/get-quote"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
          >
            <span>Request Itemized Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center space-x-2 text-xs text-cream/70">
          <Phone className="w-3.5 h-3.5 text-gold" />
          <span>Prefer a phone call? Dial our studio concierge directly: </span>
          <a href="tel:+919045449196" className="text-gold font-bold hover:underline">
            +91 90454 49196
          </a>
        </div>
      </div>
    </section>
  );
}

