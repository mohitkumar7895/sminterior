'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, Printer, Check, Clock } from 'lucide-react';
import { Order } from '@/models/order';

interface Props {
  initialOrders: Order[];
}

export default function OrdersAdminClient({ initialOrders }: Props) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStatusUpdate = async (id: number, order_status: string, payment_status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_status, payment_status }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, order_status, payment_status } : o))
        );
        router.refresh();
      }
    } catch (e) {
      alert('Error updating order');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-walnut-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {orders.length === 0 ? (
        <div className="text-center py-20 text-cream/50 text-xs">
          No orders received in the atelier yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-gold">
                <th className="p-4">Order #</th>
                <th className="p-4">Customer &amp; Location</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Order Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-cream/80">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-gold">
                    #{o.order_number}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-cream block">{o.customer_name}</span>
                    <span className="text-[11px] text-cream/50 block">{o.customer_phone}</span>
                    <span className="text-[10px] text-cream/40 block truncate max-w-xs">
                      {o.city}, {o.state}
                    </span>
                  </td>
                  <td className="p-4 font-serif font-bold text-cream">
                    ₹{Number(o.total_amount).toLocaleString('en-IN')}
                    <span className="text-[10px] text-cream/40 block uppercase font-sans">
                      via {o.payment_method}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={o.payment_status}
                      disabled={updatingId === o.id}
                      onChange={(e) => handleStatusUpdate(o.id, o.order_status, e.target.value)}
                      className="bg-charcoal border border-white/10 rounded-lg px-2.5 py-1 text-xs text-cream focus:outline-none focus:border-gold"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      value={o.order_status}
                      disabled={updatingId === o.id}
                      onChange={(e) => handleStatusUpdate(o.id, e.target.value, o.payment_status)}
                      className="bg-charcoal border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gold font-bold focus:outline-none focus:border-gold"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-[11px] text-cream/50">
                    {new Date(o.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/order-success/${o.order_number}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-gold hover:text-walnut-dark text-cream font-medium text-xs transition-colors inline-flex items-center space-x-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

