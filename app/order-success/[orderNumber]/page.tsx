import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2, Printer, ArrowRight, ShieldCheck, Truck, Package } from 'lucide-react';
import { getOrderByNumber } from '@/models/order';
import PrintInvoiceButton from './PrintInvoiceButton';

interface Props {
  params: { orderNumber: string };
}

export default async function OrderSuccessPage({ params }: Props) {
  const order = await getOrderByNumber(params.orderNumber);

  if (!order) {
    notFound();
  }

  return (
    <div className="bg-cream-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Header Message */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gold font-bold block">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-walnut-dark">
            Thank You, {order.customer_name}
          </h1>
          <p className="text-xs sm:text-sm text-walnut/70 max-w-lg mx-auto font-light leading-relaxed">
            Your bespoke furniture order <strong className="text-walnut-dark">{order.order_number}</strong> has been transmitted to our production atelier. We will notify you once dispatched for white-glove inside placement.
          </p>
        </div>

        {/* Invoice Container (Printable Area) */}
        <div id="printable-invoice" className="bg-white rounded-3xl border border-luxury-200 p-8 sm:p-12 shadow-sm space-y-8">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-luxury-200 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xl font-bold text-walnut-dark uppercase">S.M. Sanjna</span>
                <span className="text-gold font-serif text-sm">| Atelier</span>
              </div>
              <p className="text-[11px] text-walnut/60">42 Heritage Grand Boulevard, South Extn. II, New Delhi</p>
              <p className="text-[11px] text-walnut/60">Email: concierge@smsanjna.com | Tel: +91 98100 87654</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block">Tax Invoice</span>
              <span className="font-mono text-sm font-bold text-walnut-dark block">#{order.order_number}</span>
              <span className="text-[11px] text-walnut/60 block">
                Date: {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-walnut/50 font-bold block mb-1">
                Billed &amp; Delivered To
              </span>
              <strong className="text-sm font-bold text-walnut-dark block">{order.customer_name}</strong>
              <p className="text-walnut/80 mt-1">{order.shipping_address}</p>
              <p className="text-walnut/80">{order.city}, {order.state} - {order.postal_code}</p>
              <p className="text-walnut/60 mt-1">Phone: {order.customer_phone}</p>
              <p className="text-walnut/60">Email: {order.customer_email}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-walnut/50 font-bold block mb-1">
                Order &amp; Logistics Status
              </span>
              <div className="flex justify-between py-1 border-b border-luxury-100">
                <span className="text-walnut/60">Order Status:</span>
                <span className="font-bold text-walnut-dark uppercase text-[11px]">{order.order_status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-luxury-100">
                <span className="text-walnut/60">Payment Mode:</span>
                <span className="font-bold text-walnut-dark uppercase text-[11px]">{order.payment_method}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-walnut/60">Payment Status:</span>
                <span className="font-bold text-gold uppercase text-[11px]">{order.payment_status}</span>
              </div>
            </div>
          </div>

          {/* Ordered Items Table */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-walnut/50 font-bold block">
              Itemized Furniture &amp; Fixtures
            </span>
            <div className="divide-y divide-luxury-200 border-y border-luxury-200">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-3">
                    {item.product_image && (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-walnut-dark flex-shrink-0">
                        <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif font-bold text-walnut-dark">{item.product_name}</h4>
                      {item.product_sku && (
                        <span className="text-[10px] text-walnut/50 block">SKU: {item.product_sku}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-center font-medium text-walnut/70">
                    Qty: {item.quantity}
                  </div>

                  <div className="text-right font-serif font-bold text-walnut-dark">
                    ₹{Number(item.subtotal).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="pt-4 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-walnut/70">
                <span>Subtotal</span>
                <span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
              </div>
              {Number(order.discount_amount) > 0 && (
                <div className="flex justify-between text-gold font-medium">
                  <span>Promotional Discount</span>
                  <span>-₹{Number(order.discount_amount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-walnut/70">
                <span>GST (18% Included)</span>
                <span>₹{Number(order.tax_amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-walnut/70">
                <span>White-Glove Shipping</span>
                <span>{Number(order.shipping_fee) === 0 ? 'FREE' : `₹${Number(order.shipping_fee).toLocaleString('en-IN')}`}</span>
              </div>
              <div className="pt-2 border-t border-luxury-300 flex justify-between font-bold text-sm text-walnut-dark">
                <span>Total Amount Paid / Due</span>
                <span className="font-serif text-lg text-gold">
                  ₹{Number(order.total_amount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <PrintInvoiceButton />

          <Link
            href="/furniture"
            className="px-8 py-3.5 rounded-full bg-walnut text-cream hover:bg-gold hover:text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2"
          >
            <span>Continue to Atelier Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

