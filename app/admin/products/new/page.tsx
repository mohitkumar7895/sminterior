'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Sparkles, Save, Image as ImageIcon } from 'lucide-react';

export default function AdminNewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    base_price: '',
    discount_price: '',
    sku: '',
    stock_quantity: 10,
    is_featured: false,
    short_description: '',
    description: '',
    dimensions: '',
    material: '',
    finish: '',
    warranty: '10-Year Structural Warranty',
    delivery_time: '7-14 Business Days',
    care_instructions: 'Dust weekly with a dry microfiber cloth.',
    tags: '',
  });

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  ]);

  const [variants, setVariants] = useState<any[]>([
    { type: 'Size', value: 'Standard Size', price_adj: 0 },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
          if (data.categories?.length > 0) {
            setFormData((prev) => ({ ...prev, category_id: String(data.categories[0].id) }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadCats();
  }, []);

  const handleNameChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, name: val, slug }));
  };

  const addImage = () => {
    setImages([...images, '']);
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const updateImage = (idx: number, val: string) => {
    const updated = [...images];
    updated[idx] = val;
    setImages(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { type: 'Option', value: '', price_adj: 0 }]);
  };

  const removeVariant = (idx: number) => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const updateVariant = (idx: number, field: string, val: any) => {
    const updated = [...variants];
    updated[idx][field] = val;
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
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
        setErrorMsg(data.message || 'Failed to create product');
      }
    } catch (e) {
      setErrorMsg('Error submitting product to database');
    } finally {
      setSubmitting(false);
    }
  };

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
        <span className="text-xs text-cream/50">Atelier Direct Catalog</span>
      </div>

      <div className="bg-walnut-dark p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
            New Atelier Item
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
            Add New Furniture Piece
          </h1>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. The Aurelia Curved Bouclé Sofa"
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
                Category *
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
                placeholder="185000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                Discount Price (₹ INR, Optional)
              </label>
              <input
                type="number"
                value={formData.discount_price}
                onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                placeholder="165000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                SKU Code
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="SMS-SOFA-AUR-01"
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

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <label htmlFor="is_featured" className="text-xs text-cream cursor-pointer">
                Feature on Homepage
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Short Summary Description
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="One line teaser about the piece..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Detailed Architecture &amp; Craft Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Timber grain details, foam density, frame construction..."
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
                placeholder="W 280cm x D 115cm x H 78cm"
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
                placeholder="Burma Teak / Italian Marble / Brass"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-gold font-bold block">
                Product Image URLs (First image is primary)
              </label>
              <button
                type="button"
                onClick={addImage}
                className="text-xs text-gold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image URL</span>
              </button>
            </div>
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => updateImage(idx, e.target.value)}
                  placeholder="https://images.unsplash.com/..."
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

          {/* Variants Section */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-gold font-bold block">
                Product Variants (Size, Color, Wood Finish)
              </label>
              <button
                type="button"
                onClick={addVariant}
                className="text-xs text-gold hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Variant</span>
              </button>
            </div>
            {variants.map((v, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                <input
                  type="text"
                  value={v.type}
                  onChange={(e) => updateVariant(idx, 'type', e.target.value)}
                  placeholder="Type (e.g. Size, Color)"
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
                <input
                  type="text"
                  value={v.value}
                  onChange={(e) => updateVariant(idx, 'value', e.target.value)}
                  placeholder="Option Value (e.g. King Size, Teak Finish)"
                  className="sm:col-span-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={v.price_adj}
                    onChange={(e) => updateVariant(idx, 'price_adj', Number(e.target.value))}
                    placeholder="Price Adj (+/-)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(idx)}
                    className="p-2 text-red-400 hover:text-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Saving to Database...' : 'Save Product to Catalog'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

