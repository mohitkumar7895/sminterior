import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesGrid from '@/components/home/ServicesGrid';
import FeaturedFurniture from '@/components/home/FeaturedFurniture';
import WoodenCollection from '@/components/home/WoodenCollection';
import ModularKitchenShowcase from '@/components/home/ModularKitchenShowcase';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import BeforeAfterSection from '@/components/home/BeforeAfterSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramGrid from '@/components/home/InstagramGrid';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';

import { getBanners, getTestimonials } from '@/models/content';
import { getServices } from '@/models/service';
import { getProducts } from '@/models/product';
import { getProjects } from '@/models/project';

export const revalidate = 60; // Revalidate every minute for live admin updates

export default async function HomePage() {
  let banners: any[] = [];
  let services: any[] = [];
  let products: any[] = [];
  let projects: any[] = [];
  let testimonials: any[] = [];

  try {
    const [b, s, p, pr, t] = await Promise.all([
      getBanners(),
      getServices(),
      getProducts({ limit: 12 }),
      getProjects(),
      getTestimonials(true),
    ]);
    banners = b;
    services = s;
    products = p.products;
    projects = pr;
    testimonials = t;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
  }

  return (
    <div className="flex flex-col">
      {/* 1. Cinematic Hero Slider */}
      <HeroSection banners={banners} />

      {/* 2. About the Company & Atelier Preview */}
      <AboutPreview />

      {/* 3. Interior Design Services Showcase */}
      <ServicesGrid services={services} />

      {/* 4. Featured Furniture Collection */}
      <FeaturedFurniture products={products} />

      {/* 5. Solid Burma Teak & Wooden Craft Showcase */}
      <WoodenCollection />

      {/* 6. German-Precision Modular Kitchen Collection */}
      <ModularKitchenShowcase />

      {/* 7. Flagship Interior Projects Portfolio */}
      <ProjectsShowcase projects={projects} />

      {/* 8. Interactive Before & After Transformation Slider */}
      <BeforeAfterSection projects={projects} />

      {/* 9. Customer Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 10. Curated Instagram Aesthetic Showcase */}
      <InstagramGrid />

      {/* 11. Actionable Contact CTA */}
      <ContactCtaBanner />
    </div>
  );
}

