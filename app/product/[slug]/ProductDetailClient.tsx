'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw,
  Sparkles, Check, ChevronRight, Share2, HelpCircle
} from 'lucide-react';
import { Product, ProductVariant } from '@/models/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openConsultationModal } = useAuth();

  const images = product.images && product.images.length > 0
    ? product.images.map((i) => i.image_url)
    : [product.primary_image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'delivery'>('specs');

  // Group variants by type (Size, Color, Material, etc.)
  const variantGroups: Record<string, ProductVariant[]> = {};
  if (product.variants) {
    product.variants.forEach((v) => {
      if (!variantGroups[v.variant_type]) {
        variantGroups[v.variant_type] = [];
      }
      variantGroups[v.variant_type].push(v);
    });
  }

  // Calculate dynamic price with variant price adjustments
  const baseDiscountPrice = product.discount_price ? Number(product.discount_price) : Number(product.base_price);
  const baseOriginalPrice = Number(product.base_price);

  let variantAdjustment = 0;
  Object.values(selectedVariants).forEach((v) => {
    variantAdjustment += Number(v.price_adjustment || 0);
  });

  const finalPrice = baseDiscountPrice + variantAdjustment;
  const originalPriceWithAdj = baseOriginalPrice + variantAdjustment;
  const hasDiscount = product.discount_price && product.discount_price < product.base_price;

  const inWishlist = isInWishlist(product.id);

  const handleVariantSelect = (type: string, variant: ProductVariant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: variant,
    }));
  };

  const handleAddToCart = () => {
    const variantDesc = Object.entries(selectedVariants)
      .map(([k, v]) => `${k}: ${v.variant_value}`)
      .join(' | ');

    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: finalPrice,
      image: selectedImage,
      sku: product.sku,
      quantity,
      variant: variantDesc
        ? {
            type: 'Custom Selection',
            value: variantDesc,
            priceAdj: variantAdjustment,
          }
        : undefined,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.base_price),
      discountPrice: product.discount_price ? Number(product.discount_price) : undefined,
      image: selectedImage,
      categoryName: product.category_name,
      inStock: product.is_in_stock,
    });
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-walnut/60">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-luxury-400" />
        <Link href="/furniture" className="hover:text-gold transition-colors">Furniture</Link>
        {product.category_name && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-luxury-400" />
            <Link
              href={`/furniture?category=${product.category_slug}`}
              className="hover:text-gold transition-colors"
            >
              {product.category_name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-luxury-400" />
        <span className="text-walnut-dark font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-walnut-dark border border-luxury-200 shadow-xl group">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {product.is_featured && (
              <span className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold text-walnut-dark shadow-md">
                Atelier Signature
              </span>
            )}
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                inWishlist
                  ? 'bg-gold text-walnut-dark shadow-gold-glow'
                  : 'bg-white/80 backdrop-blur-md text-walnut hover:bg-white hover:text-gold shadow-md'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-walnut-dark' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === img
                      ? 'border-gold shadow-md scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Variants, Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-walnut/60 mb-2">
              <span className="uppercase tracking-widest text-[11px] font-semibold text-luxury-600">
                {product.category_name || 'Haute Furniture'}
              </span>
              <div className="flex items-center space-x-1 text-gold">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="font-bold text-walnut-dark text-xs">{product.rating || '5.0'}</span>
                <span className="text-[11px] text-walnut/50">({product.reviews_count || 12} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-walnut-dark leading-snug">
              {product.name}
            </h1>

            {product.sku && (
              <span className="text-[11px] text-walnut/40 block mt-1">
                Artisan SKU: {product.sku}
              </span>
            )}
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-cream border border-luxury-200/80 flex items-baseline space-x-3">
            <span className="font-serif text-3xl font-bold text-walnut-dark">
              ₹{finalPrice.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <span className="text-base text-walnut/40 line-through">
                ₹{originalPriceWithAdj.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-green-700 font-medium ml-auto">
              Incl. All Taxes &amp; Free White-Glove Delivery
            </span>
          </div>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-xs sm:text-sm text-walnut/70 leading-relaxed font-light">
              {product.short_description}
            </p>
          )}

          {/* Dynamic Variant Selectors */}
          {Object.entries(variantGroups).map(([type, options]) => (
            <div key={type} className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-walnut-dark block">
                Select {type}:{' '}
                <span className="text-luxury-600 font-normal">
                  {selectedVariants[type]?.variant_value || 'Default'}
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                  const isSelected = selectedVariants[type]?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVariantSelect(type, opt)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                        isSelected
                          ? 'border-gold bg-walnut text-gold shadow-sm'
                          : 'border-luxury-200 bg-white text-walnut/80 hover:border-gold hover:text-walnut'
                      }`}
                    >
                      {opt.variant_value}
                      {opt.price_adjustment !== 0 && (
                        <span className="text-[10px] ml-1 opacity-80">
                          ({Number(opt.price_adjustment) > 0 ? '+' : ''}₹{Number(opt.price_adjustment).toLocaleString('en-IN')})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Stock & Quantity Control */}
          <div className="pt-2 flex items-center space-x-4">
            <div className="flex items-center border border-luxury-300 rounded-2xl bg-white overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-walnut-dark hover:bg-cream transition-colors text-sm font-bold"
              >
                -
              </button>
              <span className="w-12 text-center text-xs font-bold text-walnut-dark">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-walnut-dark hover:bg-cream transition-colors text-sm font-bold"
              >
                +
              </button>
            </div>

            <div className="text-xs">
              <span className="text-green-700 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-ping inline-block" />
                <span>In Stock & Ready for White-Glove Dispatch</span>
              </span>
              <span className="text-[11px] text-walnut/50 block">Dispatches within 7-10 business days</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 ${
                  added
                    ? 'bg-green-700 text-white'
                    : 'bg-walnut hover:bg-gold text-cream hover:text-walnut-dark'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            <button
              onClick={() => openConsultationModal(`Custom Specification: ${product.name}`)}
              className="w-full py-2.5 rounded-xl border border-luxury-300 text-xs text-walnut/80 hover:text-gold hover:border-gold transition-colors text-center"
            >
              Need Custom Sizing or Different Wood Finish? Inquire with Architect
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-luxury-200 text-center">
            <div className="p-3 rounded-2xl bg-cream space-y-1">
              <Truck className="w-4 h-4 text-gold mx-auto" />
              <span className="text-[10px] font-bold text-walnut-dark block">Free Delivery</span>
              <span className="text-[9px] text-walnut/60 block">Inside Home Placement</span>
            </div>
            <div className="p-3 rounded-2xl bg-cream space-y-1">
              <ShieldCheck className="w-4 h-4 text-gold mx-auto" />
              <span className="text-[10px] font-bold text-walnut-dark block">10-Yr Warranty</span>
              <span className="text-[9px] text-walnut/60 block">Structural Guarantee</span>
            </div>
            <div className="p-3 rounded-2xl bg-cream space-y-1">
              <Sparkles className="w-4 h-4 text-gold mx-auto" />
              <span className="text-[10px] font-bold text-walnut-dark block">Authentic Wood</span>
              <span className="text-[9px] text-walnut/60 block">Burma Teak / Walnut</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications, Care, Delivery */}
      <div className="pt-8">
        <div className="border-b border-luxury-200 flex space-x-8">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === 'specs' ? 'text-walnut-dark' : 'text-walnut/50 hover:text-walnut-dark'
            }`}
          >
            <span>Product Specifications</span>
            {activeTab === 'specs' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
          </button>

          <button
            onClick={() => setActiveTab('care')}
            className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === 'care' ? 'text-walnut-dark' : 'text-walnut/50 hover:text-walnut-dark'
            }`}
          >
            <span>Care &amp; Maintenance</span>
            {activeTab === 'care' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === 'delivery' ? 'text-walnut-dark' : 'text-walnut/50 hover:text-walnut-dark'
            }`}
          >
            <span>Warranty &amp; White-Glove Shipping</span>
            {activeTab === 'delivery' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl text-xs">
              {product.dimensions && (
                <div className="p-3.5 bg-cream rounded-xl flex justify-between border border-luxury-200/50">
                  <span className="text-walnut/60">Dimensions</span>
                  <span className="font-semibold text-walnut-dark">{product.dimensions}</span>
                </div>
              )}
              {product.material && (
                <div className="p-3.5 bg-cream rounded-xl flex justify-between border border-luxury-200/50">
                  <span className="text-walnut/60">Materials</span>
                  <span className="font-semibold text-walnut-dark">{product.material}</span>
                </div>
              )}
              {product.finish && (
                <div className="p-3.5 bg-cream rounded-xl flex justify-between border border-luxury-200/50">
                  <span className="text-walnut/60">Surface Finish</span>
                  <span className="font-semibold text-walnut-dark">{product.finish}</span>
                </div>
              )}
              {product.warranty && (
                <div className="p-3.5 bg-cream rounded-xl flex justify-between border border-luxury-200/50">
                  <span className="text-walnut/60">Warranty</span>
                  <span className="font-semibold text-walnut-dark">{product.warranty}</span>
                </div>
              )}
              {product.delivery_time && (
                <div className="p-3.5 bg-cream rounded-xl flex justify-between border border-luxury-200/50">
                  <span className="text-walnut/60">Production &amp; Delivery</span>
                  <span className="font-semibold text-walnut-dark">{product.delivery_time}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl text-xs text-walnut/80 leading-relaxed space-y-3 font-light">
              <p>
                {product.care_instructions ||
                  'Gently dust weekly with a soft dry microfiber cloth. Treat solid wood twice yearly with natural beeswax nourishers. Keep clear of prolonged direct tropical sunlight and damp walls.'}
              </p>
              <p>
                For marble or quartz surfaces, always clean spills immediately with mild stone-safe soapy water. Use coasters for hot beverage pots and trivets for cookware.
              </p>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="max-w-2xl text-xs text-walnut/80 leading-relaxed space-y-3 font-light">
              <p>
                Every order is delivered via our proprietary <strong>White-Glove Logistics Team</strong>. Our trained specialists unpack the crate, place the piece in your desired room, assemble any components, and haul away all packaging debris.
              </p>
              <p>
                All structural components are covered by our <strong>10-Year Atelier Warranty</strong> against wood borers, termites, joint detachment, or core delamination.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Buy Action Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-cream-light/95 backdrop-blur-xl border-t border-luxury-300 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-walnut-dark flex-shrink-0 border border-luxury-300">
            <Image src={selectedImage} alt={product.name} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-serif font-bold text-walnut-dark truncate max-w-[130px]">{product.name}</p>
            <p className="text-xs font-bold text-luxury-700">₹{finalPrice.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 flex-shrink-0 shadow-md transition-all ${
            added ? 'bg-green-700 text-white' : 'bg-gold text-walnut-dark hover:bg-luxury-400'
          }`}
        >
          {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          <span>{added ? 'Added' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}

