'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { Product } from '@/models/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const price = Number(product.discount_price || product.base_price);
  const originalPrice = Number(product.base_price);
  const hasDiscount = product.discount_price && product.discount_price < product.base_price;
  const discountSavings = hasDiscount ? originalPrice - price : 0;
  const inWishlist = isInWishlist(product.id);

  const defaultImage =
    product.primary_image ||
    product.images?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: price,
      image: defaultImage,
      sku: product.sku,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: originalPrice,
      discountPrice: product.discount_price ? Number(product.discount_price) : undefined,
      image: defaultImage,
      categoryName: product.category_name,
      inStock: product.is_in_stock,
    });
  };

  return (
    <div className="group relative bg-cream-light border border-luxury-200/70 hover:border-gold/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col h-full">
      {/* Image Container with Badges */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-walnut-dark/5">
        <Image
          src={defaultImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold text-walnut-dark shadow-sm">
              Atelier Signature
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-charcoal text-cream shadow-sm">
              Save ₹{discountSavings.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Wishlist toggle"
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-gold text-walnut-dark shadow-gold-glow'
              : 'bg-white/80 backdrop-blur-md text-walnut hover:bg-white hover:text-gold shadow-sm'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-walnut-dark' : ''}`} />
        </button>
      </Link>

      {/* Content Details */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-walnut/60 mb-1">
            <span className="uppercase tracking-wider text-[9px] sm:text-[10px] font-semibold text-luxury-600 truncate max-w-[60%]">
              {product.category_name || 'Haute Furniture'}
            </span>
            <div className="flex items-center space-x-1 text-gold">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold text-gold" />
              <span className="font-semibold text-walnut-dark text-[11px] sm:text-xs">{product.rating || '5.0'}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-luxury-600 transition-colors">
            <h3 className="font-serif text-xs sm:text-base font-bold text-walnut-dark leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Material & Finish snippet */}
          {product.material && (
            <p className="text-[10px] sm:text-xs text-walnut/60 line-clamp-1 mt-0.5 sm:mt-1 font-light">
              {product.material}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-luxury-200/50 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
              <span className="font-serif text-sm sm:text-lg font-bold text-walnut-dark">
                ₹{price.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-[10px] sm:text-xs text-walnut/40 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="hidden sm:inline-block text-[10px] text-green-700 font-medium">Free Delivery</span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              added
                ? 'bg-green-700 text-white'
                : 'bg-walnut text-cream hover:bg-gold hover:text-walnut-dark shadow-sm'
            }`}
          >
            {added ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-scale" /> : <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

