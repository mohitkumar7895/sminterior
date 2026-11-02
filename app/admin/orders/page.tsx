import React from 'react';
import { getOrders } from '@/models/order';
import OrdersAdminClient from './OrdersAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const { orders, total } = await getOrders(100);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          E-Commerce Fulfillment
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Order Management ({total})
        </h1>
        <p className="text-xs text-cream/60">
          Monitor customer transactions, update white-glove dispatch milestones, and print invoices.
        </p>
      </div>

      <OrdersAdminClient initialOrders={orders} />
    </div>
  );
}

