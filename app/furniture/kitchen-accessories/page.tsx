import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/models/product';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/furniture/kitchen-accessories',
    'Kitchen Hardware, Parts & Organizers | S.M. Sanjna',
    'German-engineered Blum motion runners, magic corner carousels, knurled solid brass pull handles, and cutlery organizers.'
  );
}

export const revalidate = 60;

export default async function KitchenAccessoriesPage() {
  const { products } = await getProducts({
    category: 'kitchen-hardware-parts',
    limit: 20,
  });

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Ergonomic Precision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Kitchen Accessories &amp; Hardware
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Eliminate dead storage corners with German Blum soft-close mechanics, hydraulic pantry carousels, and solid knurled champagne brass architectural handles.
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

