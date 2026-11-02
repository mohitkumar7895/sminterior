'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck,
  Tag, CheckCircle2, X, Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    shippingProgress,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Header */}
      <section className="py-16 bg-walnut-dark text-cream text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Atelier Cart
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-cream">
            Review Your Curated Order
          </h1>
        </div>
      </section>

      {/* Cart Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-cream rounded-3xl border border-luxury-200 p-8 space-y-4 max-w-2xl mx-auto">
              <ShoppingBag className="w-12 h-12 text-gold mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-walnut-dark">Your Cart is Empty</h2>
              <p className="text-xs text-walnut/70 max-w-sm mx-auto">
                Explore our handcrafted Burma teakwood beds, sculptural curved sofas, and Italian marble dining collections.
              </p>
              <Link
                href="/furniture"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gold text-walnut-dark font-semibold text-xs uppercase tracking-widest hover:bg-luxury-400 transition-colors shadow-md"
              >
                <span>Discover Furniture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Items List (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Free Shipping Banner */}
                <div className="p-4 rounded-2xl bg-cream border border-luxury-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-walnut-dark flex items-center space-x-1.5">
                      <Truck className="w-4 h-4 text-gold" />
                      <span>
                        {subtotal >= freeShippingThreshold
                          ? '🎉 You qualify for Free White-Glove Shipping & Assembly!'
                          : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more to unlock Free White-Glove Shipping`}
                      </span>
                    </span>
                    <span className="font-bold text-gold">{shippingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-luxury-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items Table */}
                <div className="bg-cream rounded-3xl border border-luxury-200 overflow-hidden divide-y divide-luxury-200/60 shadow-sm">
                  {items.map((item) => {
                    const itemUnitTotal = item.price + (item.variant?.priceAdj || 0);
                    return (
                      <div key={`${item.productId}-${item.variant?.value || 'default'}`} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        {/* Image */}
                        <div className="flex items-center space-x-4 sm:space-x-0 w-full sm:w-auto">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-walnut-dark flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </div>
                          <div className="sm:hidden flex-1 space-y-1">
                            <Link href={`/product/${item.slug}`} className="hover:text-gold transition-colors">
                              <h3 className="font-serif text-sm font-bold text-walnut-dark leading-snug">
                                {item.name}
                              </h3>
                            </Link>
                            {item.variant && (
                              <span className="text-[10px] text-luxury-600 block">
                                Option: {item.variant.value}
                              </span>
                            )}
                            <span className="font-serif text-xs font-bold text-walnut-dark block">
                              ₹{itemUnitTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Title & Variant Info (Desktop) */}
                        <div className="hidden sm:block flex-1 text-left space-y-1">
                          <Link href={`/product/${item.slug}`} className="hover:text-gold transition-colors">
                            <h3 className="font-serif text-base font-bold text-walnut-dark leading-snug">
                              {item.name}
                            </h3>
                          </Link>
                          {item.variant && (
                            <span className="text-[11px] text-luxury-600 block">
                              Option: {item.variant.value}
                            </span>
                          )}
                          <span className="font-serif text-sm font-bold text-walnut-dark block">
                            ₹{itemUnitTotal.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-luxury-300 rounded-2xl bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant?.value)}
                            className="w-8 h-8 flex items-center justify-center text-walnut-dark hover:bg-cream text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-walnut-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant?.value)}
                            className="w-8 h-8 flex items-center justify-center text-walnut-dark hover:bg-cream text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal & Delete */}
                        <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                          <span className="font-serif text-base font-bold text-walnut-dark">
                            ₹{(itemUnitTotal * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.productId, item.variant?.value)}
                            className="p-1.5 text-walnut/40 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/furniture"
                    className="text-xs uppercase tracking-wider font-semibold text-luxury-700 hover:text-gold transition-colors flex items-center space-x-1"
                  >
                    <span>← Continue Shopping</span>
                  </Link>

                  <button
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Empty Shopping Cart
                  </button>
                </div>
              </div>

              {/* Right Column: Order Summary (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 shadow-2xl space-y-6">
                  <h3 className="font-serif text-xl font-bold border-b border-white/10 pb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 text-cream/70">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-cream">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between py-1 text-gold font-medium">
                        <span>Promotional Discount ({appliedCoupon?.code})</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-1 text-cream/70">
                      <span>GST (18% Standard)</span>
                      <span className="font-medium text-cream">₹{tax.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between py-1 text-cream/70">
                      <span>White-Glove Shipping &amp; Assembly</span>
                      <span className="font-medium text-cream">
                        {shipping === 0 ? (
                          <strong className="text-gold uppercase font-bold">FREE</strong>
                        ) : (
                          `₹${shipping.toLocaleString('en-IN')}`
                        )}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/15 flex justify-between items-baseline">
                      <span className="font-serif text-base font-bold">Grand Total</span>
                      <span className="font-serif text-2xl font-bold text-gold">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div className="pt-2 border-t border-white/10">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-gold/10 border border-gold/40 text-xs text-gold">
                        <span className="font-bold flex items-center space-x-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Code &ldquo;{appliedCoupon.code}&rdquo; Applied</span>
                        </span>
                        <button
                          onClick={removeCoupon}
                          className="text-cream/60 hover:text-cream"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider text-cream/70 font-semibold block">
                          Have a Promotional Code?
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="e.g. WELCOME10"
                            className="flex-1 bg-white/5 border border-white/15 px-3 py-2 rounded-l-xl text-xs text-cream uppercase placeholder-cream/40 focus:outline-none focus:border-gold"
                          />
                          <button
                            type="submit"
                            className="bg-gold hover:bg-luxury-400 text-walnut-dark px-4 py-2 rounded-r-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {couponFeedback && (
                          <p
                            className={`text-[11px] ${
                              couponFeedback.success ? 'text-gold' : 'text-red-400'
                            }`}
                          >
                            {couponFeedback.message}
                          </p>
                        )}
                        <p className="text-[10px] text-cream/40">Try: WELCOME10 or LUXURY5000</p>
                      </form>
                    )}
                  </div>

                  {/* Checkout CTA Button */}
                  <Link
                    href="/checkout"
                    className="w-full py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2 text-center"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="pt-2 text-center text-[11px] text-cream/50 space-y-1">
                    <p className="flex items-center justify-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      <span>256-Bit Encrypted Secure Checkout</span>
                    </p>
                    <p>Cash on Delivery &amp; Online Payment Available</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

