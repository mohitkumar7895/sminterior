'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Trash2, Edit, Save, FolderTree, Sparkles, X } from 'lucide-react';
import { Category } from '@/models/category';

interface Props {
  initialCategories: Category[];
}

export default function CategoriesAdminClient({ initialCategories }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    is_featured: false,
    display_order: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleNameChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, name: val, slug }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowAddModal(false);
        setFormData({ name: '', slug: '', description: '', image: '', is_featured: false, display_order: 0 });
        router.refresh();
      }
    } catch (e) {
      alert('Error creating category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"? Products will be unassigned.`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      alert('Error deleting category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-gold text-walnut-dark font-bold text-xs uppercase tracking-wider hover:bg-luxury-400 transition-colors flex items-center space-x-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              {cat.image && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-charcoal">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gold uppercase tracking-wider font-bold">
                  Order #{cat.display_order}
                </span>
                {cat.is_featured && (
                  <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg font-bold text-cream mt-1">{cat.name}</h3>
              <p className="text-[11px] text-cream/40 font-mono">/furniture?category={cat.slug}</p>
              {cat.description && (
                <p className="text-xs text-cream/70 mt-2 line-clamp-2">{cat.description}</p>
              )}

              {/* Subcategories */}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                  <span className="text-[10px] text-cream/50 uppercase font-bold block">
                    Subcategories ({cat.subcategories.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub.id}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-cream/80"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-cream/60">
                {cat.product_count || 0} Products
              </span>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-2 text-red-400 hover:text-red-200"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-walnut-dark border border-luxury-500/30 rounded-3xl p-6 sm:p-8 space-y-4 text-cream">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold">Add Category</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-cream/60 hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Dining Room Furniture"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-2 text-xs text-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="accent-gold"
                  />
                  <span>Show as Featured Department</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all"
              >
                {submitting ? 'Saving...' : 'Save Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

