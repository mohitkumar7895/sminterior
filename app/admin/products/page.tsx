import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, Star, Sparkles } from 'lucide-react';
import { getProducts } from '@/models/product';
import ProductDeleteButton from './ProductDeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const { products, total } = await getProducts({ limit: 100 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-cream">
            All Products ({total})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 rounded-full bg-gold text-walnut-dark font-bold text-xs uppercase tracking-wider hover:bg-luxury-400 transition-colors flex items-center space-x-1.5 shadow-md self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-walnut-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-gold">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Discount Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-cream/80">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal flex-shrink-0">
                      <Image
                        src={p.primary_image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80'}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-cream block">{p.name}</span>
                      <span className="text-[10px] text-cream/40">{p.sku || 'No SKU'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-cream/70 font-medium">
                    {p.category_name || 'Unassigned'}
                  </td>
                  <td className="p-4 font-serif font-bold text-cream">
                    ₹{Number(p.base_price).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-serif text-gold font-bold">
                    {p.discount_price ? `₹${Number(p.discount_price).toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.stock_quantity > 0 ? 'bg-green-950/60 text-green-300' : 'bg-red-950/60 text-red-300'
                    }`}>
                      {p.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    {p.is_featured ? (
                      <span className="text-gold font-bold flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Yes</span>
                      </span>
                    ) : (
                      <span className="text-cream/40">No</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/product/${p.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-white/5 text-cream/70 hover:text-gold transition-colors inline-block"
                      title="View live"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/products/edit/${p.id}`}
                      className="p-1.5 rounded-lg bg-white/5 text-cream/70 hover:text-gold transition-colors inline-block"
                      title="Edit product"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <ProductDeleteButton id={p.id} name={p.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

