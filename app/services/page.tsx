import React from 'react';
import { Metadata } from 'next';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { getServices } from '@/models/service';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/services',
    'Interior Design Services | S.M. Sanjna Interior Designer',
    'Comprehensive turnkey architectural interior design services for residential villas, modular kitchens, luxury bedrooms, corporate offices, and bespoke joinery.'
  );
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Header */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Haute Interior Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Our Interior Design Services
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            From initial spatial discovery and 3D architectural renders to factory-milled joinery and turnkey handover. Explore our 14 specialized interior services.
          </p>
        </div>
      </section>

      {/* Grid of All 14 Services */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCtaBanner />
    </div>
  );
}

