'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Testimonial } from '@/models/content';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // If testimonials exist, duplicate them for a seamless, continuous infinite horizontal marquee
  const items = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  return (
    <section className="py-12 sm:py-16 bg-walnut-dark text-cream relative overflow-hidden">
      {/* Decorative gold shimmer ambient */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        <SectionHeader
          light
          badge="Discerning Patrons"
          title="Words of Appreciation"
          subtitle="Discover how we turned complex architectural requirements into timeless sanctuaries for India’s top executives, doctors, and creative connoisseurs."
        />
      </div>

      {/* Single Continuous Scrolling Line (Marquee) */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-walnut-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-walnut-dark to-transparent z-10 pointer-events-none" />

        <div className="flex space-x-4 sm:space-x-6 w-max animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] py-4">
          {items.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-[280px] sm:w-[400px] flex-shrink-0 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl group hover:bg-white/[0.08]"
            >
              <div className="space-y-3">
                {/* Rating stars and quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gold">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-gold/30 group-hover:text-gold/70 transition-colors" />
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-cream/90 leading-relaxed font-light line-clamp-4">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-3 border-t border-white/10 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/40 relative flex-shrink-0 bg-gold/20 flex items-center justify-center">
                  {t.avatar_url ? (
                    <Image
                      src={t.avatar_url}
                      alt={t.client_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gold font-serif font-bold text-xs">
                      {t.client_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-cream group-hover:text-gold transition-colors truncate">
                    {t.client_name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-cream/60 truncate">
                    {t.role_or_title}
                  </p>
                  {t.project_title && (
                    <span className="text-[9px] text-gold uppercase tracking-wider block mt-0.5 truncate">
                      {t.project_title}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
