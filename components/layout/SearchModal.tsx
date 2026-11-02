'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ products: any[]; services: any[] }>({ products: [], services: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ products: [], services: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-walnut-dark border border-luxury-500/30 rounded-2xl shadow-2xl overflow-hidden text-cream">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3">
          <Search className="w-5 h-5 text-gold flex-shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search furniture, sofas, modular kitchens, dining, woodcraft..."
            autoFocus
            className="flex-1 bg-transparent text-cream placeholder-cream/40 text-sm focus:outline-none"
          />
          <button
            onClick={closeSearchModal}
            className="p-1 rounded-full text-cream/60 hover:text-gold hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="text-center py-8 text-gold text-xs tracking-wider uppercase animate-pulse">
              Searching atelier catalog...
            </div>
          )}

          {!loading && searchTerm && results.products.length === 0 && results.services.length === 0 && (
            <div className="text-center py-8 text-cream/50 text-sm">
              No results found for &ldquo;{searchTerm}&rdquo;. Try &ldquo;teak&rdquo;, &ldquo;sofa&rdquo;, &ldquo;kitchen&rdquo;, or &ldquo;marble&rdquo;.
            </div>
          )}

          {/* Product Results */}
          {results.products.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-gold font-semibold flex items-center space-x-1.5">
                <Package className="w-3.5 h-3.5" />
                <span>Furniture & Products ({results.products.length})</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {results.products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={closeSearchModal}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-charcoal flex-shrink-0 relative">
                      <Image
                        src={p.primary_image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80'}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-serif font-medium text-cream truncate group-hover:text-gold">
                        {p.name}
                      </h5>
                      <span className="text-[11px] text-cream/60">
                        ₹{Number(p.discount_price || p.base_price).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Service Results */}
          {results.services.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-wider text-gold font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interior Design Services ({results.services.length})</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {results.services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    onClick={closeSearchModal}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div>
                      <h5 className="text-xs font-serif font-medium text-cream group-hover:text-gold">
                        {s.name}
                      </h5>
                      <p className="text-[11px] text-cream/50 line-clamp-1">{s.short_description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

