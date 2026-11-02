'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.discountPrice || item.price,
      image: item.image,
      quantity: 1,
    });
    removeFromWishlist(item.productId);
  };

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-walnut-dark text-cream text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Private Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Your Atelier Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 max-w-md mx-auto font-light">
            Saved furniture pieces, sculptural lighting, and architectural elements for your residence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-cream rounded-3xl border border-luxury-200 p-8 space-y-4">
              <Heart className="w-12 h-12 text-gold mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-walnut-dark">Your Wishlist is Empty</h2>
              <p className="text-xs text-walnut/70 max-w-sm mx-auto">
                Discover our handcrafted solid Burma teakwood beds, bouclé curved sofas, and Italian marble dining collections.
              </p>
              <Link
                href="/furniture"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gold text-walnut-dark font-semibold text-xs uppercase tracking-widest hover:bg-luxury-400 transition-colors shadow-md"
              >
                <span>Browse Furniture Atelier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-walnut/60 font-medium">
                  {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Saved
                </span>
                <button
                  onClick={clearWishlist}
                  className="text-xs text-red-600 hover:underline font-medium"
                >
                  Clear Entire Wishlist
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-cream rounded-3xl border border-luxury-200 overflow-hidden shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/product/${item.slug}`} className="block relative aspect-[4/3] w-full bg-walnut-dark">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="p-5 space-y-2">
                        {item.categoryName && (
                          <span className="text-[10px] uppercase tracking-wider text-luxury-600 font-semibold block">
                            {item.categoryName}
                          </span>
                        )}
                        <Link href={`/product/${item.slug}`} className="block">
                          <h3 className="font-serif text-base font-bold text-walnut-dark hover:text-gold transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-baseline space-x-2">
                          <span className="font-serif text-lg font-bold text-walnut-dark">
                            ₹{Number(item.discountPrice || item.price).toLocaleString('en-IN')}
                          </span>
                          {item.discountPrice && (
                            <span className="text-xs text-walnut/40 line-through">
                              ₹{Number(item.price).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-luxury-200/50 mt-4 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 py-2.5 rounded-full bg-walnut text-cream hover:bg-gold hover:text-walnut-dark text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => removeFromWishlist(item.productId)}
                        aria-label="Remove item"
                        className="p-2.5 rounded-full border border-luxury-300 text-walnut/60 hover:text-red-600 hover:border-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

