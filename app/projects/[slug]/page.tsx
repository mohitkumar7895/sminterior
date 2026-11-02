import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Maximize2, Calendar, Award, ArrowLeft, Quote, Sparkles } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/models/project';
import { constructMetadata } from '@/models/seo';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found | S.M. Sanjna' };

  return constructMetadata(
    `/projects/${params.slug}`,
    `${project.title} | S.M. Sanjna Interior Designer`,
    project.description?.slice(0, 160) || 'Signature residential architecture project.'
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const gallery = Array.isArray(project.gallery_images) ? project.gallery_images : [];

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-end py-16 bg-charcoal text-cream overflow-hidden">
        <Image
          src={project.hero_image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-1.5 text-xs text-gold hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold text-walnut-dark inline-block shadow-md">
            {project.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-cream/80 pt-2 font-light">
            {project.location && (
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{project.location}</span>
              </span>
            )}
            {project.area_sqft && (
              <span className="flex items-center space-x-1.5">
                <Maximize2 className="w-4 h-4 text-gold" />
                <span>{project.area_sqft.toLocaleString()} Sq.Ft. Area</span>
              </span>
            )}
            {project.completion_year && (
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-gold" />
                <span>Completed {project.completion_year}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Story & Specs */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Story text */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-walnut-dark">
                The Architectural Concept
              </h2>
              <div className="w-20 h-0.5 bg-gold mb-6" />

              <p className="text-sm sm:text-base text-walnut/80 leading-relaxed font-light">
                {project.description}
              </p>

              {/* Challenge & Solution Grid */}
              {(project.challenges || project.solutions) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {project.challenges && (
                    <div className="p-6 rounded-3xl bg-cream-light border border-luxury-200 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-luxury-600 font-bold block">
                        The Architectural Challenge
                      </span>
                      <p className="text-xs text-walnut/80 leading-relaxed">{project.challenges}</p>
                    </div>
                  )}
                  {project.solutions && (
                    <div className="p-6 rounded-3xl bg-cream-light border border-luxury-200 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold block">
                        The Atelier Solution
                      </span>
                      <p className="text-xs text-walnut/80 leading-relaxed">{project.solutions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Testimonial Quote */}
              {project.testimonial_quote && (
                <div className="p-8 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 shadow-xl space-y-3 mt-8">
                  <Quote className="w-8 h-8 text-gold/40" />
                  <p className="font-serif italic text-sm text-cream/90 leading-relaxed">
                    &ldquo;{project.testimonial_quote}&rdquo;
                  </p>
                  {project.client_name && (
                    <span className="text-xs text-gold font-bold block pt-2">
                      — {project.client_name}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Specs */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-cream-light border border-luxury-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-walnut-dark border-b border-luxury-200 pb-3">
                Project Key Data
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-luxury-200/50">
                  <span className="text-walnut/60">Category</span>
                  <span className="font-semibold text-walnut-dark">{project.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-luxury-200/50">
                  <span className="text-walnut/60">Location</span>
                  <span className="font-semibold text-walnut-dark">{project.location || 'Delhi NCR'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-luxury-200/50">
                  <span className="text-walnut/60">Covered Area</span>
                  <span className="font-semibold text-walnut-dark">{project.area_sqft} Sq.Ft.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-luxury-200/50">
                  <span className="text-walnut/60">Budget Tier</span>
                  <span className="font-semibold text-gold">{project.budget_range || 'Premium Luxury'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-walnut/60">Execution</span>
                  <span className="font-semibold text-walnut-dark">Complete In-House Atelier</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/get-quote"
                  className="w-full py-3 rounded-full bg-gold text-walnut-dark font-semibold text-xs uppercase tracking-widest hover:bg-luxury-400 transition-colors flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Similar Design</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Before & After Slider */}
          {project.before_image && project.after_image && (
            <div className="pt-10">
              <BeforeAfterSlider
                beforeImage={project.before_image}
                afterImage={project.after_image}
                title="Site Metamorphosis"
                category="Before & After"
                description="Slide to see the bare concrete transformation."
              />
            </div>
          )}

          {/* Gallery Images */}
          {gallery.length > 0 && (
            <div className="space-y-6 pt-10">
              <h3 className="font-serif text-2xl font-bold text-walnut-dark">
                Project Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

