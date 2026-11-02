'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '@/models/service';
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Residential', 'Modular Kitchen', 'Commercial & Office', 'Joinery & Craft'];

  const filtered = services.filter((s) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Residential') {
      return (
        s.slug.includes('residential') ||
        s.slug.includes('bedroom') ||
        s.slug.includes('living') ||
        s.slug.includes('home') ||
        s.slug.includes('luxury')
      );
    }
    if (activeTab === 'Modular Kitchen') {
      return s.slug.includes('kitchen') || s.slug.includes('wardrobe');
    }
    if (activeTab === 'Commercial & Office') {
      return s.slug.includes('office') || s.slug.includes('commercial') || s.slug.includes('space');
    }
    if (activeTab === 'Joinery & Craft') {
      return (
        s.slug.includes('wooden') ||
        s.slug.includes('furniture') ||
        s.slug.includes('ceiling') ||
        s.slug.includes('lighting')
      );
    }
    return true;
  });

  return (
    <section className="py-10 sm:py-14 bg-cream-light border-y border-luxury-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Bespoke Offerings"
          title="End-to-End Interior Design & Architectural Services"
          subtitle="From concept drawings and 3D photorealistic visualization to factory-precision manufacturing and move-in ready handover, explore our comprehensive suite of 14 architectural interior services."
        />

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gold text-walnut-dark shadow-md'
                  : 'bg-white/70 text-walnut/70 hover:bg-white hover:text-walnut border border-luxury-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-walnut text-cream hover:bg-gold hover:text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-gold-glow"
          >
            <span>Explore All 14 Interior Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

