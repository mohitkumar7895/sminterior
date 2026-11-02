'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Filter, Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product } from '@/models/product';
import { Category } from '@/models/category';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
  categories: Category[];
  initialProducts: Product[];
  totalCount: number;
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
}

export default function FurnitureFilterClient({
  categories,
  initialProducts,
  totalCount,
  currentCategory = '',
  currentSort = 'newest',
  currentSearch = '',
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(currentSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [sortBy, setSortBy] = useState(currentSort);

  const applyFilters = (newCat?: string, newSort?: string, newSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const cat = newCat !== undefined ? newCat : selectedCategory;
    const sort = newSort !== undefined ? newSort : sortBy;
    const s = newSearch !== undefined ? newSearch : search;

    if (cat) params.set('category', cat);
    else params.delete('category');

    if (sort) params.set('sortBy', sort);
    else params.delete('sortBy');

    if (s.trim()) params.set('search', s.trim());
    else params.delete('search');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (slug: string) => {
    const target = selectedCategory === slug ? '' : slug;
    setSelectedCategory(target);
    applyFilters(target, undefined, undefined);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setSortBy(sort);
    applyFilters(undefined, sort, undefined);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(undefined, undefined, search);
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSortBy('newest');
    router.push(pathname);
  };

  return (
    <div className="space-y-8">
      {/* Top Filter & Search Controls */}
      <div className="bg-cream p-4 sm:p-6 rounded-3xl border border-luxury-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-luxury-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search piece by name or wood..."
            className="w-full bg-white border border-luxury-200 rounded-full pl-10 pr-4 py-2 text-xs text-walnut-dark placeholder-walnut/40 focus:outline-none focus:border-gold transition-colors"
          />
        </form>

        {/* Results Count & Sort Dropdown */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end space-x-4">
          <span className="text-xs text-walnut/60 font-medium">
            Showing <strong className="text-walnut-dark">{initialProducts.length}</strong> of {totalCount} items
          </span>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-luxury-500" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-white border border-luxury-200 rounded-full px-3 py-1.5 text-xs text-walnut-dark font-medium focus:outline-none focus:border-gold transition-colors"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills: Scrollable on mobile, wrap on desktop */}
      <div className="flex items-center sm:flex-wrap overflow-x-auto no-scrollbar gap-2 pb-2 px-1">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
            !selectedCategory
              ? 'bg-walnut text-gold shadow-md'
              : 'bg-white text-walnut/70 hover:bg-cream hover:text-walnut border border-luxury-200'
          }`}
        >
          All Pieces
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
              selectedCategory === cat.slug
                ? 'bg-walnut text-gold shadow-md'
                : 'bg-white text-walnut/70 hover:bg-cream hover:text-walnut border border-luxury-200'
            }`}
          >
            {cat.name}
          </button>
        ))}

        {(selectedCategory || search) && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-1.5 rounded-full text-xs text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 whitespace-nowrap flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Products Grid or Empty State */}
      {initialProducts.length === 0 ? (
        <div className="text-center py-20 bg-cream rounded-3xl border border-luxury-200 p-8 space-y-4">
          <Sparkles className="w-10 h-10 text-gold mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-walnut-dark">No pieces match your filters</h3>
          <p className="text-xs text-walnut/70 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to browse our entire atelier catalog.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2.5 rounded-full bg-gold text-walnut-dark text-xs uppercase tracking-wider font-semibold hover:bg-luxury-400 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {initialProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

