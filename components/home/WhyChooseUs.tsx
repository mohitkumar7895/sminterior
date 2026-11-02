import React from 'react';
import { ShieldCheck, Award, Factory, Clock, Calculator, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Factory,
      title: 'In-House Woodcraft Atelier',
      desc: 'We own and operate our dedicated factory joinery, ensuring timber seasoning perfection, micron-accurate CNC cutting, and zero middleman markups.',
    },
    {
      icon: ShieldCheck,
      title: '10-Year Comprehensive Warranty',
      desc: 'Every piece of modular cabinetry and architectural joinery is backed by a legally binding 10-year water and structural warranty, plus lifetime hardware guarantee.',
    },
    {
      icon: Clock,
      title: 'Penalty-Backed On-Time Handover',
      desc: 'We honor your schedule. Our residential project deliveries include strict timeline milestones with financial penalty guarantees for any delay.',
    },
    {
      icon: Calculator,
      title: '100% Transparent Itemized BOQ',
      desc: 'No sudden cost surprises or vague lump-sum quotes. Every square foot of marble, plywood, laminate, and hinge is priced transparently up front.',
    },
    {
      icon: Award,
      title: 'Award-Winning Spatial Architects',
      desc: 'Our design council brings decades of European and classical Indian design mastery, balancing lifestyle ergonomics with haute couture elegance.',
    },
    {
      icon: Sparkles,
      title: 'Dust-Free White-Glove Handover',
      desc: 'From initial 3D VR walkthroughs to deep-cleaned, styled move-in day with bespoke champagne unveiling, your journey is completely stress-free.',
    },
  ];

  return (
    <section className="py-10 sm:py-20 lg:py-28 bg-cream-light border-y border-luxury-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Sanjna Distinction"
          title="Why Elite Homeowners Choose Our Atelier"
          subtitle="Discover the pillars of uncompromising quality, craftsmanship, and transparent service that set our studio apart."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-cream border border-luxury-200/80 hover:border-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 space-y-3 sm:space-y-4 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-luxury-100 border border-luxury-300/50 flex items-center justify-center text-luxury-700 group-hover:bg-gold group-hover:text-walnut-dark group-hover:border-gold transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-walnut-dark group-hover:text-luxury-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-walnut/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

