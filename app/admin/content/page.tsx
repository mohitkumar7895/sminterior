import React from 'react';
import { getBanners, getTestimonials, getFAQs } from '@/models/content';
import ContentAdminClient from './ContentAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const [banners, testimonials, faqs] = await Promise.all([
    getBanners(),
    getTestimonials(false),
    getFAQs(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Website Brand Content
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Homepage Banners &amp; Testimonials
        </h1>
        <p className="text-xs text-cream/60">
          Modify hero banner imagery, customer testimonials, and FAQs dynamically.
        </p>
      </div>

      <ContentAdminClient initialBanners={banners} initialTestimonials={testimonials} initialFaqs={faqs} />
    </div>
  );
}

