import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/models/product';
import { getCategories } from '@/models/category';
import { constructMetadata } from '@/models/seo';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import FurnitureFilterClient from './FurnitureFilterClient';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/furniture',
    'Haute Furniture Collection | S.M. Sanjna Interior Designer',
    'Shop handcrafted luxury wooden furniture, curved bouclé sofas, Italian marble dining tables, solid teak beds, and modular kitchen hardware.'
  );
}

interface FurniturePageProps {
  searchParams: {
    category?: string;
    subcategory?: string;
    search?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'popular';
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function FurniturePage({ searchParams }: FurniturePageProps) {
  const [categories, { products, total }] = await Promise.all([
    getCategories(true),
    getProducts({
      category: searchParams.category,
      subcategory: searchParams.subcategory,
      search: searchParams.search,
      sortBy: searchParams.sortBy,
      minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      limit: 30,
    }),
  ]);

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Header Banner */}
      <section className="py-20 bg-walnut-dark text-cream text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            The Atelier Showroom
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Luxury Furniture Collection
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Milled from solid plantation Burma teak, American walnut, Italian Carrara marble, and French bouclé textiles.
          </p>
        </div>
      </section>

      {/* Main Content Area with Filters & Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FurnitureFilterClient
            categories={categories}
            initialProducts={products}
            totalCount={total}
            currentCategory={searchParams.category}
            currentSort={searchParams.sortBy}
            currentSearch={searchParams.search}
          />
        </div>
      </section>
    </div>
  );
}

