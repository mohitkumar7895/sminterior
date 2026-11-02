import React from 'react';
import Link from 'next/link';
import {
  Package, FolderTree, ShoppingBag, MessageSquare, IndianRupee,
  Sparkles, TrendingUp, Plus, ArrowRight, Eye, Clock
} from 'lucide-react';
import { query, queryOne } from '@/lib/db';
import { getAuthUser } from '@/lib/auth/jwt';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = getAuthUser();
  if (!user) {
    redirect('/admin/login');
  }

  // Fetch metrics from MySQL
  const [productCount, categoryCount, orderCount, inquiryCount, revenueRes, recentOrders, recentInquiries] =
    await Promise.all([
      queryOne<{ count: number }>('SELECT COUNT(*) as count FROM products'),
      queryOne<{ count: number }>('SELECT COUNT(*) as count FROM categories'),
      queryOne<{ count: number }>('SELECT COUNT(*) as count FROM orders'),
      queryOne<{ count: number }>('SELECT COUNT(*) as count FROM inquiries'),
      queryOne<{ total: number }>('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders'),
      query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5'),
      query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5'),
    ]);

  const totalProducts = productCount?.count || 0;
  const totalCategories = categoryCount?.count || 0;
  const totalOrders = orderCount?.count || 0;
  const totalInquiries = inquiryCount?.count || 0;
  const totalRevenue = revenueRes?.total || 0;

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
            Executive Control Center
          </span>
          <h1 className="font-serif text-3xl font-bold text-cream">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-cream/60">
            Real-time atelier overview of furniture orders, client inquiries, and store metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-full bg-gold text-walnut-dark font-bold text-xs uppercase tracking-wider hover:bg-luxury-400 transition-colors flex items-center space-x-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-walnut-dark border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/60">Total Revenue</span>
            <IndianRupee className="w-4 h-4" />
          </div>
          <span className="font-serif text-2xl font-bold text-cream block">
            ₹{Number(totalRevenue).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-green-400 font-medium">From verified orders</span>
        </div>

        <div className="p-5 rounded-3xl bg-walnut-dark border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/60">Total Orders</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="font-serif text-2xl font-bold text-cream block">
            {totalOrders}
          </span>
          <Link href="/admin/orders" className="text-[10px] text-gold hover:underline block">
            View order management →
          </Link>
        </div>

        <div className="p-5 rounded-3xl bg-walnut-dark border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/60">Live Products</span>
            <Package className="w-4 h-4" />
          </div>
          <span className="font-serif text-2xl font-bold text-cream block">
            {totalProducts}
          </span>
          <Link href="/admin/products" className="text-[10px] text-gold hover:underline block">
            Manage catalog →
          </Link>
        </div>

        <div className="p-5 rounded-3xl bg-walnut-dark border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/60">Categories</span>
            <FolderTree className="w-4 h-4" />
          </div>
          <span className="font-serif text-2xl font-bold text-cream block">
            {totalCategories}
          </span>
          <Link href="/admin/categories" className="text-[10px] text-gold hover:underline block">
            Manage categories →
          </Link>
        </div>

        <div className="p-5 rounded-3xl bg-walnut-dark border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gold">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cream/60">Inquiries</span>
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="font-serif text-2xl font-bold text-cream block">
            {totalInquiries}
          </span>
          <Link href="/admin/inquiries" className="text-[10px] text-gold hover:underline block">
            View inquiries →
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Orders & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="p-6 rounded-3xl bg-walnut-dark border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-serif text-lg font-bold text-cream flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-gold" />
              <span>Recent Orders</span>
            </h3>
            <Link href="/admin/orders" className="text-xs text-gold hover:underline font-medium">
              View All ({totalOrders})
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-xs text-cream/50 py-6 text-center">No orders recorded yet.</p>
          ) : (
            <div className="divide-y divide-white/5 space-y-1">
              {recentOrders.map((o: any) => (
                <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-gold font-bold block">#{o.order_number}</span>
                    <span className="text-cream/80">{o.customer_name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-cream block">
                      ₹{Number(o.total_amount).toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/10 text-cream">
                      {o.order_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="p-6 rounded-3xl bg-walnut-dark border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-serif text-lg font-bold text-cream flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-gold" />
              <span>Recent Inquiries</span>
            </h3>
            <Link href="/admin/inquiries" className="text-xs text-gold hover:underline font-medium">
              View All ({totalInquiries})
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="text-xs text-cream/50 py-6 text-center">No inquiries received yet.</p>
          ) : (
            <div className="divide-y divide-white/5 space-y-1">
              {recentInquiries.map((inq: any) => (
                <div key={inq.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-cream block">{inq.name}</span>
                    <span className="text-cream/50 text-[11px]">{inq.service_interested || 'General Inquiry'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-cream/50 block">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/20 text-gold">
                      {inq.status || 'new'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links Matrix */}
      <div className="p-6 rounded-3xl bg-walnut-dark border border-white/10 space-y-4">
        <h3 className="font-serif text-lg font-bold text-cream">Quick Management Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cream space-y-2 block transition-colors"
          >
            <Package className="w-5 h-5 text-gold" />
            <span className="block">Add Product</span>
          </Link>
          <Link
            href="/admin/services"
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cream space-y-2 block transition-colors"
          >
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="block">Edit 14 Services</span>
          </Link>
          <Link
            href="/admin/seo"
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cream space-y-2 block transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-gold" />
            <span className="block">Manage SEO Meta</span>
          </Link>
          <Link
            href="/admin/settings"
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cream space-y-2 block transition-colors"
          >
            <Plus className="w-5 h-5 text-gold" />
            <span className="block">Update Contact / Rates</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

