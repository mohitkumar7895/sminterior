import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Clock, CheckCircle2, Sparkles, ArrowRight, Shield, Award,
  Home, Crown, ChefHat, BedDouble, Sofa, Briefcase, Building2,
  Hammer, Trees, Layers, Grid, Compass
} from 'lucide-react';
import { getServiceBySlug, getServices } from '@/models/service';
import { constructMetadata } from '@/models/seo';
import SectionHeader from '@/components/ui/SectionHeader';

interface ServicePageProps {
  params: { slug: string };
}

const iconMap: Record<string, any> = {
  Home, Crown, ChefHat, BedDouble, Sofa, Briefcase, Building2,
  Hammer, Trees, Layers, Grid, Compass, Sparkles,
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found | S.M. Sanjna' };

  return constructMetadata(
    `/services/${params.slug}`,
    `${service.name} | S.M. Sanjna Interior Designer`,
    service.short_description || 'Turnkey interior design and architectural bespoke execution in Delhi NCR.'
  );
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon || 'Sparkles'] || Sparkles;

  const defaultHero =
    service.hero_image ||
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80';

  const otherServices = (await getServices()).filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="bg-cream-light min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-walnut-dark text-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={defaultHero}
            alt={service.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut-dark via-walnut-dark/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase">
              <IconComponent className="w-4 h-4" />
              <span>Architectural Services</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream leading-tight">
              {service.name}
            </h1>

            <p className="text-base sm:text-lg text-cream/80 font-light leading-relaxed">
              {service.short_description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-cream/70">
              {service.timeline && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Timeline: <strong className="text-cream">{service.timeline}</strong></span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gold" />
                <span>Warranty: <strong className="text-cream">10-Year Comprehensive</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-gold" />
                <span>Pricing: <strong className="text-gold">Itemized BOQ Estimate</strong></span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/get-quote?service=${encodeURIComponent(service.name)}`}
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request a Free Quote</span>
              </Link>
              <a
                href="tel:+919810087654"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-semibold text-xs uppercase tracking-widest transition-all text-center"
              >
                Speak with Lead Architect
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full Description & Value Proposition */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-walnut-dark">
                Architectural Approach &amp; Deliverables
              </h2>
              <div className="w-20 h-0.5 bg-gold mb-6" />

              <div className="text-sm text-walnut/80 leading-relaxed space-y-4 font-light">
                <p>{service.full_description}</p>
                <p>
                  Every project managed under <strong>{service.name}</strong> is executed through our vertically integrated design-and-build workflow. We eliminate confusion between separate architects, carpenters, plumbers, and electricians by assigning a single responsible project director to your site.
                </p>
              </div>

              {/* Key Features List */}
              {Array.isArray(service.features) && service.features.length > 0 && (
                <div className="pt-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-walnut-dark">
                    What&apos;s Included in Our Scope
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-cream-light border border-luxury-200/80 flex items-start space-x-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-walnut-dark font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Working Process Steps */}
              {Array.isArray(service.process_steps) && service.process_steps.length > 0 && (
                <div className="pt-8 space-y-6">
                  <h3 className="font-serif text-xl font-bold text-walnut-dark">
                    Step-by-Step Delivery Roadmap
                  </h3>
                  <div className="space-y-4">
                    {service.process_steps.map((st: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-cream-light border border-luxury-200 flex items-start space-x-4 shadow-sm"
                      >
                        <span className="font-serif text-2xl font-bold text-gold flex-shrink-0">
                          {st.step || `0${idx + 1}`}
                        </span>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-walnut-dark">{st.title}</h4>
                          <p className="text-xs text-walnut/70 mt-1 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar Booking Card */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="p-8 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block">
                    Direct Studio Access
                  </span>
                  <h3 className="font-serif text-2xl font-bold">
                    Schedule a Consultation
                  </h3>
                  <p className="text-xs text-cream/70 leading-relaxed">
                    Book a complimentary 3D spatial review for your property with our lead architects.
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-cream/60">Starting Estimate</span>
                    <span className="font-bold text-gold">
                      {service.starting_price
                        ? `₹${Number(service.starting_price).toLocaleString('en-IN')}`
                        : 'Custom BOQ'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-cream/60">Estimated Duration</span>
                    <span className="font-bold text-cream">{service.timeline || '4-8 Weeks'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-cream/60">Warranty</span>
                    <span className="font-bold text-cream">10 Years Guaranteed</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-cream/60">Execution</span>
                    <span className="font-bold text-cream">Turnkey In-House</span>
                  </div>
                </div>

                <Link
                  href={`/get-quote?service=${encodeURIComponent(service.name)}`}
                  className="w-full py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Customized Quote</span>
                </Link>

                <p className="text-[10px] text-center text-cream/50">
                  Zero obligation. Detailed BOQ estimate delivered in 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Related Services */}
      {otherServices.length > 0 && (
        <section className="py-20 bg-cream-light border-t border-luxury-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="More Capabilities"
              title="Explore Other Interior Design Services"
              subtitle="Every room in your home deserves cohesive architectural synergy."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherServices.map((s) => (
                <div
                  key={s.id}
                  className="p-6 rounded-3xl bg-cream border border-luxury-200 hover:border-gold transition-all shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-serif text-lg font-bold text-walnut-dark">{s.name}</h4>
                    <p className="text-xs text-walnut/70 mt-1 line-clamp-2">{s.short_description}</p>
                  </div>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-luxury-700 hover:text-gold uppercase tracking-wider transition-colors pt-2"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

