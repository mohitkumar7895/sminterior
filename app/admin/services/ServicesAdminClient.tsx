'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Save, X, Eye, Clock, Award, Sparkles } from 'lucide-react';
import { Service } from '@/models/service';

interface Props {
  services: Service[];
}

export default function ServicesAdminClient({ services }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleEditClick = (s: Service) => {
    setEditing({ ...s });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/services/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setEditing(null);
        router.refresh();
      } else {
        alert('Failed to update service');
      }
    } catch (e) {
      alert('Error updating service');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div>
              {s.hero_image && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-charcoal">
                  <Image src={s.hero_image} alt={s.name} fill className="object-cover" />
                </div>
              )}
              <span className="text-[10px] text-gold uppercase tracking-wider font-bold">
                Order #{s.display_order}
              </span>
              <h3 className="font-serif text-lg font-bold text-cream mt-1">{s.name}</h3>
              <p className="text-[11px] text-cream/40 font-mono">/services/{s.slug}</p>

              <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5 text-xs text-cream/70">
                <div className="flex justify-between">
                  <span>Investment Base:</span>
                  <strong className="text-gold">
                    {s.starting_price
                      ? `₹${Number(s.starting_price).toLocaleString('en-IN')}`
                      : 'Custom BOQ'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <strong className="text-cream">{s.timeline || '4-8 Weeks'}</strong>
                </div>
              </div>

              <p className="text-xs text-cream/60 mt-3 line-clamp-2 leading-relaxed">
                {s.short_description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/services/${s.slug}`}
                target="_blank"
                className="text-xs text-cream/60 hover:text-gold flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live</span>
              </Link>
              <button
                onClick={() => handleEditClick(s)}
                className="px-4 py-1.5 rounded-full bg-gold text-walnut-dark font-bold text-xs uppercase hover:bg-luxury-400 transition-colors flex items-center space-x-1"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Scope</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-walnut-dark border border-luxury-500/30 rounded-3xl p-6 sm:p-8 space-y-4 text-cream max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold">Edit: {editing.name}</h3>
              <button onClick={() => setEditing(null)} className="p-1 text-cream/60 hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Starting Investment (₹ INR)
                  </label>
                  <input
                    type="number"
                    value={editing.starting_price || ''}
                    onChange={(e) => setEditing({ ...editing, starting_price: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Timeline Schedule
                  </label>
                  <input
                    type="text"
                    value={editing.timeline || ''}
                    onChange={(e) => setEditing({ ...editing, timeline: e.target.value })}
                    placeholder="e.g. 4-6 Weeks"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Hero Image URL
                </label>
                <input
                  type="url"
                  value={editing.hero_image || ''}
                  onChange={(e) => setEditing({ ...editing, hero_image: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editing.short_description || ''}
                  onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Full Architectural Narrative
                </label>
                <textarea
                  rows={4}
                  value={editing.full_description || ''}
                  onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all"
              >
                {submitting ? 'Saving...' : 'Save Service Updates'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

