'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { Project } from '@/models/project';

interface BeforeAfterSectionProps {
  projects: Project[];
}

export default function BeforeAfterSection({ projects }: BeforeAfterSectionProps) {
  const transformProjects = projects.filter((p) => p.before_image && p.after_image);

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (transformProjects.length === 0) return null;

  const current = transformProjects[selectedIndex];

  return (
    <section className="py-10 sm:py-14 bg-charcoal text-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          badge="Turnkey Metamorphosis"
          title="Before & After Transformations"
          subtitle="Drag the interactive slider to experience the dramatic difference between bare concrete shells and finished architectural masterpieces."
        />

        {/* Tab Switcher if multiple projects have before/after */}
        {transformProjects.length > 1 && (
          <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
            {transformProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedIndex(idx)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedIndex === idx
                    ? 'bg-gold text-walnut-dark shadow-md'
                    : 'bg-white/10 text-cream/70 hover:bg-white/20 hover:text-cream border border-white/15'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {/* The Slider */}
        <BeforeAfterSlider
          beforeImage={current.before_image || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'}
          afterImage={current.after_image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'}
          title={current.title}
          category={current.category}
          description={current.description}
        />
      </div>
    </section>
  );
}

