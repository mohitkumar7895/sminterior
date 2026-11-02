import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles, CheckCircle2, Hammer, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/furniture/custom-furniture',
    'Custom-Made Bespoke Furniture & Joinery | S.M. Sanjna',
    'Commission custom solid wood furniture, bespoke dining tables, curved sofas, and architectural partitions built to your exact dimensions.'
  );
}

export default function CustomFurniturePage() {
  const steps = [
    { num: '01', title: 'Share Dimensions & Inspiration', desc: 'Provide your space measurements, CAD drawings, or reference photos of your dream piece.' },
    { num: '02', title: 'Timber & Textile Selection', desc: 'Select from Burma Teak, Sheesham, Oak, Walnut, Italian Marbles, Bouclé, Velvet, or Saddle Leather.' },
    { num: '03', title: '3D CAD Joinery Blueprint', desc: 'Our furniture designers prepare millimeter-precise shop drawings and joinery diagrams for your sign-off.' },
    { num: '04', title: 'Atelier Handcrafting & Delivery', desc: 'Fabricated in our dedicated factory and delivered with white-glove inside placement.' },
  ];

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Bespoke Commission
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Custom Furniture Atelier
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            When standard retail sizes simply don&apos;t match your architectural vision. We handcraft bespoke pieces commissioned exclusively for your residence.
          </p>
        </div>
      </section>

      {/* Process & Commission Form */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-cream-light border border-luxury-200 space-y-3">
                <span className="font-serif text-3xl font-bold text-gold block">{s.num}</span>
                <h4 className="font-serif text-base font-bold text-walnut-dark">{s.title}</h4>
                <p className="text-xs text-walnut/70 leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Custom Inquiry Box */}
          <div className="bg-walnut-dark text-cream rounded-3xl p-8 sm:p-12 border border-luxury-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block">
                Start Your Commission
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                Have a Custom Furniture Concept in Mind?
              </h3>
              <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed">
                Connect directly with our master furniture design team. We offer complimentary material swatches, timber grain consultation, and transparent manufacturing pricing.
              </p>
              <div className="pt-2 flex items-center space-x-6 text-xs text-cream/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>10-Year Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Direct Factory Rates</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
              <a
                href="/get-quote?service=Custom%20Furniture"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md text-center"
              >
                Submit Custom Drawing
              </a>
              <a
                href="https://wa.me/919810087654?text=Hi%20S.M.%20Sanjna%20Team,%20I%20am%20interested%20in%20a%20custom%20furniture%20piece"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-semibold text-xs uppercase tracking-widest transition-all text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

