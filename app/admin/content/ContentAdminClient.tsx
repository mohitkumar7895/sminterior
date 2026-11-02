'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Banner, Testimonial, FAQ } from '@/models/content';
import { Star, Edit, Save, Plus, Trash2 } from 'lucide-react';

interface Props {
  initialBanners: Banner[];
  initialTestimonials: Testimonial[];
  initialFaqs: FAQ[];
}

export default function ContentAdminClient({ initialBanners, initialTestimonials, initialFaqs }: Props) {
  const [activeTab, setActiveTab] = useState<'banners' | 'testimonials' | 'faqs'>('banners');

  return (
    <div className="space-y-6">
      <div className="flex border-b border-white/10 space-x-6">
        <button
          onClick={() => setActiveTab('banners')}
          className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
            activeTab === 'banners' ? 'text-gold' : 'text-cream/50 hover:text-cream'
          }`}
        >
          <span>Hero Banners ({initialBanners.length})</span>
          {activeTab === 'banners' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
            activeTab === 'testimonials' ? 'text-gold' : 'text-cream/50 hover:text-cream'
          }`}
        >
          <span>Testimonials ({initialTestimonials.length})</span>
          {activeTab === 'testimonials' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
            activeTab === 'faqs' ? 'text-gold' : 'text-cream/50 hover:text-cream'
          }`}
        >
          <span>FAQs ({initialFaqs.length})</span>
          {activeTab === 'faqs' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
        </button>
      </div>

      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialBanners.map((b) => (
            <div key={b.id} className="p-6 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-charcoal">
                <Image src={b.background_image} alt={b.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gold text-walnut-dark">
                  Slide #{b.display_order}
                </span>
              </div>
              <span className="text-[10px] text-gold uppercase tracking-widest font-bold block">{b.badge_text}</span>
              <h3 className="font-serif text-lg font-bold text-cream leading-snug">{b.title}</h3>
              <p className="text-xs text-cream/70 line-clamp-2 leading-relaxed">{b.subtitle}</p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-cream/60">
                <span>CTA: <strong>{b.cta_text}</strong> ({b.cta_link})</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialTestimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center space-x-1 text-gold">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <p className="font-serif italic text-xs text-cream/90 leading-relaxed font-light">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center space-x-3">
                {t.avatar_url && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40 flex-shrink-0">
                    <Image src={t.avatar_url} alt={t.client_name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="font-serif text-xs font-bold text-cream">{t.client_name}</h4>
                  <span className="text-[10px] text-cream/60 block">{t.role_or_title}</span>
                  {t.project_title && (
                    <span className="text-[10px] text-gold uppercase block mt-0.5">{t.project_title}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="space-y-4">
          {initialFaqs.map((f) => (
            <div key={f.id} className="p-6 rounded-2xl bg-walnut-dark border border-white/10 shadow-md space-y-2">
              <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">{f.category}</span>
              <h4 className="font-serif text-sm font-bold text-cream">{f.question}</h4>
              <p className="text-xs text-cream/70 leading-relaxed font-light">{f.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

