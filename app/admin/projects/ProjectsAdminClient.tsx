'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Trash2, Edit, Eye, Sparkles, X, Save } from 'lucide-react';
import { Project } from '@/models/project';

interface Props {
  initialProjects: Project[];
}

export default function ProjectsAdminClient({ initialProjects }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Residential',
    client_name: '',
    location: '',
    completion_year: 2025,
    area_sqft: 3500,
    budget_range: '₹45 Lakhs - ₹75 Lakhs',
    description: '',
    hero_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    before_image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    after_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    challenges: '',
    solutions: '',
    testimonial_quote: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, title: val, slug }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddModal(false);
        router.refresh();
      } else {
        alert('Failed to save project');
      }
    } catch (e) {
      alert('Error creating project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch (e) {
      alert('Error deleting');
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
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-3xl bg-walnut-dark border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-charcoal">
                <Image src={p.hero_image} alt={p.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-gold text-walnut-dark text-[10px] font-bold uppercase">
                  {p.category}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-cream">{p.title}</h3>
              <p className="text-xs text-cream/60 mt-1">
                {p.location} • {p.area_sqft} Sq.Ft. ({p.completion_year})
              </p>
              <p className="text-xs text-cream/70 mt-2 line-clamp-2">{p.description}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/projects/${p.slug}`}
                target="_blank"
                className="text-xs text-cream/60 hover:text-gold flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live</span>
              </Link>

              <button
                onClick={() => handleDelete(p.id, p.title)}
                className="p-2 text-red-400 hover:text-red-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-walnut-dark border border-luxury-500/30 rounded-3xl p-6 sm:p-8 space-y-4 text-cream max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold">Add Portfolio Project</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-cream/60 hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="The Imperial Residence"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Office">Office</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Golf Links, New Delhi"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Area (Sq.Ft.)
                  </label>
                  <input
                    type="number"
                    value={formData.area_sqft}
                    onChange={(e) => setFormData({ ...formData, area_sqft: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="Dr. Singhania"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Hero Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.hero_image}
                  onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    Before Image URL (Raw Site)
                  </label>
                  <input
                    type="url"
                    value={formData.before_image}
                    onChange={(e) => setFormData({ ...formData, before_image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                    After Image URL (Finished Space)
                  </label>
                  <input
                    type="url"
                    value={formData.after_image}
                    onChange={(e) => setFormData({ ...formData, after_image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
                  Project Description Narrative
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all"
              >
                {submitting ? 'Saving...' : 'Add Project to Portfolio'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

