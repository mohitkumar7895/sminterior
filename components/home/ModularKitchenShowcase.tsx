'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChefHat, ArrowRight, CheckCircle2, Shield, Sparkles, Layers } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ModularKitchenShowcase() {
  const { openConsultationModal } = useAuth();

  const specifications = [
    { title: '100% BWP Marine Plywood', desc: 'IS:710 Grade boiling-water-proof core impervious to kitchen moisture.' },
    { title: 'Blumotion Motion Hardware', desc: 'German silent soft-close runners & servo-drive electronic touch opening.' },
    { title: 'Quartz Waterfall Counters', desc: 'Calacatta gold & black quartz slabs with anti-stain nanotech sealing.' },
    { title: 'Intelligent Storage Ecosystem', desc: 'Magic corner carousels, tandem pantries, and cutlery dividers.' }
  ];

  return (
    <section className="py-10 sm:py-14 bg-cream border-b border-luxury-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-walnut-dark to-charcoal rounded-3xl overflow-hidden shadow-2xl border border-luxury-500/30 text-cream">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 p-5 sm:p-10 lg:p-16 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Culinary Architecture</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
                  The German-Precision Modular Kitchen Collection
                </h2>

                <p className="text-xs sm:text-base text-cream/80 font-light leading-relaxed">
                  We treat the kitchen not just as a cooking zone, but as the social epicenter of your home. Engineered with European ergonomic workflows that eliminate wasted footsteps while maintaining an uncluttered, sculptural aesthetic.
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {specifications.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-cream">{item.title}</h4>
                        <p className="text-[11px] text-cream/60 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => openConsultationModal('Modular Kitchen Design')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2 text-center"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Design My Modular Kitchen</span>
                </button>

                <Link
                  href="/services/modular-kitchen"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 hover:border-gold text-cream hover:text-gold font-semibold text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Kitchen Layouts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Image Column (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[350px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
                alt="Modular Kitchen Waterfall Quartz Island"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal via-transparent to-transparent" />

              {/* Floating Quality Stamp */}
              <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-walnut-dark/90 backdrop-blur-md border border-gold/40 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-center shadow-2xl">
                <span className="block font-serif text-lg sm:text-2xl font-bold text-gold">10-Year</span>
                <span className="text-[9px] sm:text-[10px] text-cream/70 uppercase tracking-wider">Waterproof Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

