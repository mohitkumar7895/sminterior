'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface Props {
  params: { id: string };
}

export default function AdminEditProductPage({ params }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    base_price: '',
    discount_price: '',
    sku: '',
    stock_quantity: 10,
    is_featured: false,
    is_in_stock: true,
    short_description: '',
    description: '',
    dimensions: '',
    material: '',
    finish: '',
    warranty: '',
    delivery_time: '',
    care_instructions: '',
    tags: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/products/${params.id}`),
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.categories || []);
        }

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          const p = prodData.product;
          setFormData({
            name: p.name || '',
            slug: p.slug || '',
            category_id: p.category_id ? String(p.category_id) : '',
            base_price: String(p.base_price || ''),
            discount_price: p.discount_price ? String(p.discount_price) : '',
            sku: p.sku || '',
            stock_quantity: p.stock_quantity ?? 10,
            is_featured: Boolean(p.is_featured),
            is_in_stock: Boolean(p.is_in_stock),
            short_description: p.short_description || '',
            description: p.description || '',
            dimensions: p.dimensions || '',
            material: p.material || '',
            finish: p.finish || '',
            warranty: p.warranty || '',
            delivery_time: p.delivery_time || '',
            care_instructions: p.care_instructions || '',
            tags: p.tags || '',
          });

          if (p.images && p.images.length > 0) {
            setImages(p.images.map((img: any) => img.image_url));
          } else {
            setImages([p.primary_image || '']);
          }

          if (p.variants && p.variants.length > 0) {
            setVariants(
              p.variants.map((v: any) => ({
                type: v.variant_type,
                value: v.variant_value,
                price_adj: Number(v.price_adjustment || 0),
              }))
            );
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const addImage = () => setImages([...images, '']);
  const removeImage = (idx: number) => setImages(images.filter((_, i) => i !== idx));
  const updateImage = (idx: number, val: string) => {
    const arr = [...images];
    arr[idx] = val;
    setImages(arr);
  };

  const addVariant = () => setVariants([...variants, { type: 'Option', value: '', price_adj: 0 }]);
  const removeVariant = (idx: number) => setVariants(variants.filter((_, i) => i !== idx));
  const updateVariant = (idx: number, field: string, val: any) => {
    const arr = [...variants];
    arr[idx][field] = val;
    setVariants(arr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          base_price: Number(formData.base_price),
          discount_price: formData.discount_price ? Number(formData.discount_price) : null,
          category_id: formData.category_id ? Number(formData.category_id) : null,
          images: images.filter((img) => img.trim() !== ''),
          variants: variants.filter((v) => v.value.trim() !== ''),
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Failed to update product');
      }
    } catch (e) {
      setErrorMsg('Error updating product in database');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gold text-xs uppercase animate-pulse">Loading piece details...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center space-x-1.5 text-xs text-gold hover:underline uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <span className="text-xs text-cream/50">Editing ID #{params.id}</span>
      </div>

      <div className="bg-walnut-dark p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
            Modify Item
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
            Edit: {formData.name}
          </h1>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full bg-charcoal border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Base Price (₹ INR) *
              </label>
              <input
                type="number"
                required
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Discount Price (₹ INR)
              </label>
              <input
                type="number"
                value={formData.discount_price}
                onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex items-center space-x-6 pt-6">
              <label className="flex items-center space-x-2 text-xs text-cream cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="accent-gold"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center space-x-2 text-xs text-cream cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_in_stock}
                  onChange={(e) => setFormData({ ...formData, is_in_stock: e.target.checked })}
                  className="accent-gold"
                />
                <span>In Stock</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Detailed Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Dimensions
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-gold font-bold block">
                Product Image URLs
              </label>
              <button
                type="button"
                onClick={addImage}
                className="text-xs text-gold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => updateImage(idx, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-2 text-red-400 hover:text-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Updating Database...' : 'Save Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

