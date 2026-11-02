import React from 'react';
import { Metadata } from 'next';
import { getProjects } from '@/models/project';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/projects',
    'Interior Design Portfolio & Signature Residences | S.M. Sanjna',
    'Explore completed luxury villas, golf link estates, duplex penthouses, modular kitchens, and corporate headquarters by S.M. Sanjna Interior Designer.'
  );
}

interface Props {
  searchParams: { category?: string };
}

export default async function ProjectsPage({ searchParams }: Props) {
  const projects = await getProjects(searchParams.category);

  const categories = ['All', 'Residential', 'Modular Kitchen', 'Luxury Villa', 'Office'];

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Signature Built Work
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Our Interior Architecture Portfolio
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            A testament to 15 years of uncompromising design integrity, fine craftsmanship, and flawless handover.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = (cat === 'All' && !searchParams.category) || searchParams.category === cat;
              return (
                <a
                  key={cat}
                  href={cat === 'All' ? '/projects' : `/projects?category=${encodeURIComponent(cat)}`}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-gold text-walnut-dark shadow-md'
                      : 'bg-white text-walnut/70 hover:bg-cream hover:text-walnut border border-luxury-200'
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

