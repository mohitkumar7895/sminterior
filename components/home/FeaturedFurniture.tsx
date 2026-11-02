'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/models/product';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface FeaturedFurnitureProps {
  products: Product[];
}

export default function FeaturedFurniture({ products }: FeaturedFurnitureProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Living Room', 'Bedroom', 'Modular Kitchens', 'Dining & Tables', 'Kitchen Hardware'];

  const filtered = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Living Room') return p.category_slug?.includes('living');
    if (selectedCategory === 'Bedroom') return p.category_slug?.includes('bedroom') || p.category_slug?.includes('wardrobe');
    if (selectedCategory === 'Modular Kitchens') return p.category_slug?.includes('kitchens');
    if (selectedCategory === 'Dining & Tables') return p.category_slug?.includes('dining') || p.category_slug?.includes('custom');
    if (selectedCategory === 'Kitchen Hardware') return p.category_slug?.includes('hardware');
    return true;
  });

  return (
    <section className="py-10 sm:py-14 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <SectionHeader
            alignment="left"
            badge="Atelier Collection"
            title="Handcrafted Luxury Furniture"
            subtitle="Sculptural seating, monolithic travertine tables, aged Burma teak bedframes, and precision modular kitchen cabinetry."
          />

          <Link
            href="/furniture"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-700 hover:text-gold transition-colors pb-4 flex-shrink-0 group"
          >
            <span>View Complete Atelier Shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-walnut text-gold shadow-md'
                  : 'bg-white/80 text-walnut/70 hover:bg-white hover:text-walnut border border-luxury-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner Pill */}
        <div className="mt-8 p-6 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <Sparkles className="w-6 h-6 text-gold flex-shrink-0" />
            <div>
              <h4 className="font-serif text-base font-bold text-cream">Need Bespoke Furniture Dimensions or Finishes?</h4>
              <p className="text-xs text-cream/70">We custom fabricate any sofa, dining table, or wardrobe to your exact floorplan specs.</p>
            </div>
          </div>
          <Link
            href="/furniture/custom-furniture"
            className="px-6 py-3 rounded-full bg-gold text-walnut-dark font-semibold text-xs uppercase tracking-wider hover:bg-luxury-400 transition-colors flex-shrink-0 shadow-md"
          >
            Request Custom Piece
          </Link>
        </div>
      </div>
    </section>
  );
}

