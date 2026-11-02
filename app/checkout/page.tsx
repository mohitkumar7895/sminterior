'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, Lock, Truck, CreditCard, Banknote, Sparkles,
  ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, discount, tax, shipping, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: 'New Delhi',
    state: 'Delhi',
    postal_code: '110049',
    payment_method: 'cod', // 'cod' or 'online'
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="py-24 text-center bg-cream-light min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-walnut-dark">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-walnut/70">Please add furniture items to your cart before proceeding to checkout.</p>
        <Link
          href="/furniture"
          className="px-6 py-2.5 rounded-full bg-gold text-walnut-dark text-xs uppercase tracking-wider font-semibold"
        >
          Browse Furniture
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const orderPayload = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        shipping_address: formData.shipping_address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postal_code,
        subtotal,
        discount_amount: discount,
        tax_amount: tax,
        shipping_fee: shipping,
        total_amount: total,
        payment_method: formData.payment_method,
        notes: formData.notes,
        items: items.map((i) => ({
          product_id: i.productId,
          product_name: i.name,
          product_sku: i.sku,
          product_image: i.image,
          unit_price: i.price + (i.variant?.priceAdj || 0),
          quantity: i.quantity,
          subtotal: (i.price + (i.variant?.priceAdj || 0)) * i.quantity,
          variant_details: i.variant,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        router.push(`/order-success/${data.order.order_number}`);
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Failed to place order. Please review information.');
      }
    } catch (e) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-walnut/60">
          <Link href="/cart" className="hover:text-gold transition-colors">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5 text-luxury-400" />
          <span className="text-walnut-dark font-medium">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Checkout Form (7 cols) */}
          <div className="lg:col-span-7 bg-cream p-5 sm:p-10 rounded-3xl border border-luxury-200 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                Final Step
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-walnut-dark">
                Delivery &amp; Payment Details
              </h1>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-walnut-dark border-b border-luxury-200/80 pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Name"
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      Phone Number (For Delivery Coordinates) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                    Email Address (For Invoice &amp; Dispatch Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-sm font-bold text-walnut-dark border-b border-luxury-200/80 pb-2">
                  2. White-Glove Shipping Address
                </h3>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                    Street Address / Villa / Apartment &amp; Tower *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shipping_address}
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                    placeholder="e.g. Tower 3, Apt 1402, DLF Magnolias, Golf Course Road"
                    className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                    Special Delivery Instructions / Gate Security Pass
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Service elevator access, floor level, security clearance notes..."
                    className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-sm font-bold text-walnut-dark border-b border-luxury-200/80 pb-2">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* COD */}
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      formData.payment_method === 'cod'
                        ? 'border-gold bg-luxury-50 shadow-sm'
                        : 'border-luxury-200 bg-white hover:border-gold'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="cod"
                      checked={formData.payment_method === 'cod'}
                      onChange={() => setFormData({ ...formData, payment_method: 'cod' })}
                      className="accent-gold mt-1"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5 font-bold text-xs text-walnut-dark">
                        <Banknote className="w-4 h-4 text-gold" />
                        <span>Pay on Delivery / Inspection</span>
                      </div>
                      <p className="text-[11px] text-walnut/60 mt-1 leading-normal">
                        Verify your handcrafted furniture during inside placement before final payment.
                      </p>
                    </div>
                  </label>

                  {/* Online Payment */}
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      formData.payment_method === 'online'
                        ? 'border-gold bg-luxury-50 shadow-sm'
                        : 'border-luxury-200 bg-white hover:border-gold'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="online"
                      checked={formData.payment_method === 'online'}
                      onChange={() => setFormData({ ...formData, payment_method: 'online' })}
                      className="accent-gold mt-1"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5 font-bold text-xs text-walnut-dark">
                        <CreditCard className="w-4 h-4 text-gold" />
                        <span>Online UPI / NetBanking / Cards</span>
                      </div>
                      <p className="text-[11px] text-walnut/60 mt-1 leading-normal">
                        Encrypted gateway authorization with instant digital invoice.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>{submitting ? 'Confirming Order with Atelier...' : `Complete Order — ₹${total.toLocaleString('en-IN')}`}</span>
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 shadow-2xl space-y-6">
            <h3 className="font-serif text-lg font-bold border-b border-white/10 pb-3">
              Order Items ({itemCount})
            </h3>

            {/* Item list */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={`${i.productId}-${i.variant?.value || 'default'}`} className="flex items-center space-x-3 text-xs">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal flex-shrink-0">
                    <Image src={i.image} alt={i.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-cream truncate">{i.name}</h5>
                    <span className="text-[11px] text-cream/50">Qty: {i.quantity}</span>
                  </div>
                  <span className="font-bold text-cream">
                    ₹{((i.price + (i.variant?.priceAdj || 0)) * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-white/10 text-xs">
              <div className="flex justify-between text-cream/70">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-cream/70">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="pt-2 border-t border-white/15 flex justify-between items-baseline font-bold">
                <span className="text-sm">Total Due</span>
                <span className="font-serif text-2xl text-gold">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl text-[11px] text-cream/60 flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Includes White-Glove Uncrating &amp; Room Assembly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

