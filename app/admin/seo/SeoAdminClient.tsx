'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Edit, Save, X, Check, Eye } from 'lucide-react';
import { SeoMetadata } from '@/models/seo';

interface Props {
  initialPages: SeoMetadata[];
}

export default function SeoAdminClient({ initialPages }: Props) {
  const router = useRouter();
  const [pages, setPages] = useState(initialPages);
  const [editing, setEditing] = useState<SeoMetadata | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleEditClick = (p: SeoMetadata) => {
    setEditing({ ...p });
    setSuccessMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setPages((prev) =>
          prev.map((p) => (p.page_route === editing.page_route ? { ...editing } : p))
        );
        setSuccessMsg('SEO tags updated successfully!');
        setTimeout(() => {
          setEditing(null);
          setSuccessMsg('');
        }, 1200);
        router.refresh();
      } else {
        alert('Failed to update SEO');
      }
    } catch (e) {
      alert('Error updating SEO metadata');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-walnut-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-gold">
                <th className="p-4">Route</th>
                <th className="p-4">Meta Title</th>
                <th className="p-4">H1 Heading</th>
                <th className="p-4">Robots</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-cream/80">
              {pages.map((p) => (
                <tr key={p.page_route} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-gold font-bold">
                    {p.page_route}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-cream block line-clamp-1">{p.meta_title}</span>
                    <span className="text-[11px] text-cream/50 line-clamp-1">{p.meta_description}</span>
                  </td>
                  <td className="p-4 text-cream/70 line-clamp-1">
                    {p.h1_heading || '—'}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-950/60 text-green-300">
                      Index, Follow
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="px-3 py-1.5 rounded-lg bg-gold text-walnut-dark font-bold text-xs uppercase hover:bg-luxury-400 transition-colors inline-flex items-center space-x-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit SEO</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit SEO Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-walnut-dark border border-luxury-500/30 rounded-3xl p-6 sm:p-8 space-y-4 text-cream max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Route SEO</span>
                <h3 className="font-serif text-xl font-bold">{editing.page_route}</h3>
              </div>
              <button onClick={() => setEditing(null)} className="p-1 text-cream/60 hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg && (
              <div className="p-3 bg-green-950 border border-green-800 text-green-200 text-xs rounded-xl flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Meta Title (Google SERP) *
                </label>
                <input
                  type="text"
                  required
                  value={editing.meta_title}
                  onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
                <span className="text-[10px] text-cream/40">Ideal length: 50-60 characters</span>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Meta Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editing.meta_description}
                  onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
                <span className="text-[10px] text-cream/40">Ideal length: 150-160 characters</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    H1 Main Heading
                  </label>
                  <input
                    type="text"
                    value={editing.h1_heading || ''}
                    onChange={(e) => setEditing({ ...editing, h1_heading: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={editing.canonical_url || ''}
                    onChange={(e) => setEditing({ ...editing, canonical_url: e.target.value })}
                    placeholder="https://smsanjna.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Meta Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={editing.meta_keywords || ''}
                  onChange={(e) => setEditing({ ...editing, meta_keywords: e.target.value })}
                  placeholder="luxury interior, modular kitchen, delhi ncr..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    OpenGraph Title (WhatsApp / Facebook)
                  </label>
                  <input
                    type="text"
                    value={editing.og_title || ''}
                    onChange={(e) => setEditing({ ...editing, og_title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    OpenGraph Share Image URL
                  </label>
                  <input
                    type="url"
                    value={editing.og_image || ''}
                    onChange={(e) => setEditing({ ...editing, og_image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs text-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.robots_index ?? true}
                    onChange={(e) => setEditing({ ...editing, robots_index: e.target.checked })}
                    className="accent-gold"
                  />
                  <span>Allow Google Indexing (index)</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-cream cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.robots_follow ?? true}
                    onChange={(e) => setEditing({ ...editing, robots_follow: e.target.checked })}
                    className="accent-gold"
                  />
                  <span>Follow Links (follow)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all"
              >
                {submitting ? 'Applying SEO...' : 'Save Meta Configuration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

