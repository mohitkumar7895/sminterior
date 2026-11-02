import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Award, ShieldCheck, Factory, Heart, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';
import { getFAQs } from '@/models/content';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/about',
    'About Us | S.M. Sanjna Interior Designer Studio & Atelier',
    'Discover our 15-year heritage in luxury architecture, turnkey residential transformations, and bespoke solid wood furniture craftsmanship.'
  );
}

export default async function AboutPage() {
  const faqs = await getFAQs();

  const values = [
    { title: 'Material Honesty', desc: 'We never fake solid timber with paper foil or cheap hollow MDF. Real Burma teak, Italian marble, and brass only.' },
    { title: 'Turnkey Responsibility', desc: 'A single point of contact from initial 3D VR simulation to deep-cleaned move-in handover with zero finger-pointing.' },
    { title: 'Ergonomic Longevity', desc: 'Spaces engineered not just for photo shoots, but to nurture family rituals, restful sleep, and joyful culinary experiences.' },
    { title: 'Transparent Pricing', desc: 'Itemized, square-foot BOQs with clear hardware specifications and absolutely no surprise billings.' }
  ];

  const milestones = [
    { year: '2010', title: 'Studio Founded in New Delhi', desc: 'Started with bespoke joinery commissions for luxury farmhouses and South Delhi villas.' },
    { year: '2015', title: 'Atelier Manufacturing Facility Launched', desc: 'Opened our dedicated 25,000 sq.ft. timber seasoning and CNC joinery facility.' },
    { year: '2019', title: 'German Blum Gold Partnership', desc: 'Standardized all modular kitchens with lifetime-guaranteed European soft-motion hardware.' },
    { year: '2023', title: '1,000th Turnkey Residence Delivered', desc: 'Celebrated the milestone handover of our 1,000th full-home architectural transformation.' },
    { year: '2025', title: 'Haute E-Commerce Collection Launch', desc: 'Enabling homeowners nationwide to order our bespoke furniture pieces with white-glove inside placement.' },
  ];

  return (
    <div className="bg-cream-light min-h-screen">
      {/* 1. Hero Banner */}
      <section className="py-24 sm:py-32 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Heritage &amp; Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream">
            Crafting Haute Spaces &amp; Timeless Furniture
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            For over fifteen years, S.M. Sanjna has shaped extraordinary living environments for families who demand both poetic design vision and uncompromising German structural precision.
          </p>
        </div>
      </section>

      {/* 2. Founder Story & Editorial */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-luxury-200">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Sanjna Sharma Interior Design Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <SectionHeader
                alignment="left"
                badge="The Founder's Narrative"
                title="A Passion for Living With Natural Materials"
                subtitle="How an architect's love for fragrant timber resins and hand-carved stone grew into one of Delhi's most respected turnkey design houses."
              />

              <div className="text-sm text-walnut/80 space-y-4 font-light leading-relaxed">
                <p>
                  &ldquo;I started S.M. Sanjna with a simple conviction: the spaces we inhabit have an immense, quiet influence on how we think, how we rest, and how we connect with those we love,&rdquo; says <strong>Sanjna Sharma</strong>, Principal Architect &amp; Founder.
                </p>
                <p>
                  &ldquo;Too often in our industry, clients were forced to choose between visionary design studios who couldn&apos;t execute on time, or contractors who lacked aesthetic taste. We bridged that divide by integrating design architecture with our own private joinery factory.&rdquo;
                </p>
                <p>
                  Today, every villa, penthouse, and modular kitchen leaving our atelier represents hundreds of hours of thoughtful hand-detailing by seasoned master craftsmen.
                </p>
              </div>

              <div className="pt-4 border-t border-luxury-200/80 flex items-center space-x-8">
                <div>
                  <span className="font-serif text-3xl font-bold text-walnut-dark">1,000+</span>
                  <span className="text-[11px] text-walnut/60 uppercase tracking-wider block">Residences</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-walnut-dark">15+</span>
                  <span className="text-[11px] text-walnut/60 uppercase tracking-wider block">Years</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-gold">10-Yr</span>
                  <span className="text-[11px] text-walnut/60 uppercase tracking-wider block">Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-20 bg-cream-light border-y border-luxury-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Guiding Principles"
            title="Our Non-Negotiable Values"
            subtitle="The fundamental standards that govern every drawing we draft and every plank of timber we cut."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-cream border border-luxury-200 shadow-sm space-y-3">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                  {idx + 1}
                </span>
                <h4 className="font-serif text-base font-bold text-walnut-dark">{v.title}</h4>
                <p className="text-xs text-walnut/70 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline Milestones */}
      <section className="py-20 bg-walnut-dark text-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            light
            badge="Chronology"
            title="Fifteen Years of Milestone Achievements"
            subtitle="Tracing our journey from a small boutique carpentry studio to an industry benchmark in luxury turnkey interiors."
          />

          <div className="space-y-6 pt-4">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-gold flex-shrink-0">
                    {m.year}
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-bold text-cream">{m.title}</h4>
                    <p className="text-xs text-cream/70 mt-1">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      {faqs.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <SectionHeader
              badge="Client Inquiries"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our turnkey interior design timelines, materials, and custom furniture warranties."
            />

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-6 rounded-2xl bg-cream-light border border-luxury-200/80 space-y-2 shadow-sm"
                >
                  <h4 className="font-serif text-base font-bold text-walnut-dark">{faq.question}</h4>
                  <p className="text-xs text-walnut/75 leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCtaBanner />
    </div>
  );
}

