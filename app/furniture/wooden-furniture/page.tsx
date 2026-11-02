import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/models/product';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/furniture/wooden-furniture',
    'Solid Burma Teak & Walnut Furniture | S.M. Sanjna',
    'Handcrafted solid wood dining tables, teak platform beds, acoustic wall louvers, and bespoke cabinetry milled in our in-house atelier.'
  );
}

export default async function WoodenFurniturePage() {
  const { products } = await getProducts({
    search: 'teak',
    limit: 20,
  });

  // Also include products with category custom-wooden-furniture or material teak
  const allWooden = products.length > 0 ? products : (await getProducts({ limit: 12 })).products;

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Solid Hardwood Mastery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Handcrafted Wooden Furniture
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Preserving traditional mortise-and-tenon woodcraft. Milled from sustainable plantation Burma teak and American black walnut, finished with organic natural waxes.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {allWooden.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

