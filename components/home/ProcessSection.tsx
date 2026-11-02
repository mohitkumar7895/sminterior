import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Discovery & Spatial LiDAR Survey',
      desc: 'We conduct a detailed in-person lifestyle interview and laser scan your floorplan to millimeter accuracy.',
    },
    {
      step: '02',
      title: 'Concept & 4K 3D Photoreal Renders',
      desc: 'Our architects build photorealistic 3D visualizations and interactive 360° VR simulations of every room.',
    },
    {
      step: '03',
      title: 'Material Curation & Transparent BOQ',
      desc: 'Touch and select live Italian marble slabs, Burma teak finishes, and fabrics at our private studio atelier.',
    },
    {
      step: '04',
      title: 'Precision Factory Fabrication',
      desc: 'Bespoke cabinetry and furniture are manufactured in our automated facility, minimizing on-site dust and noise.',
    },
    {
      step: '05',
      title: 'Dust-Free Handover & Celebration',
      desc: 'Rapid on-site installation, 150-point quality audit, professional styling, and celebratory move-in handover.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="End-to-End Methodology"
          title="Our Seamless Five-Step Journey"
          subtitle="From your initial dream concept to champagne handover, our comprehensive interior process guarantees predictable elegance with zero stress."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-cream-light border border-luxury-200 hover:border-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div>
                <span className="font-serif text-3xl font-extrabold text-gold block mb-2 group-hover:scale-105 transition-transform">
                  {s.step}
                </span>
                <h4 className="font-serif text-sm font-bold text-walnut-dark group-hover:text-luxury-600 transition-colors">
                  {s.title}
                </h4>
              </div>
              <p className="text-xs text-walnut/70 leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

