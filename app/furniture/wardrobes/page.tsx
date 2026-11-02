import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/models/product';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/furniture/wardrobes',
    'Luxury Walk-in Closets & Wardrobes | S.M. Sanjna',
    'Floor-to-ceiling smoked glass wardrobes, velvet-lined jewelry drawers, and integrated LED dressing systems.'
  );
}

export default async function WardrobesPage() {
  const { products } = await getProducts({
    category: 'luxury-wardrobes',
    limit: 20,
  });

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Haute Dressing Suites
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Bespoke Wardrobes &amp; Walk-In Closets
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Aviation-grade aluminum frames, fluted smoked glass doors, motion sensor LED profiles, and Italian suede jewelry trays.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

