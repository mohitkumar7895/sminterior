'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, ShieldCheck, Award, Trees,
  Hammer, CheckCircle2, Quote
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function AboutPreview() {
  const highlights = [
    {
      icon: Trees,
      title: 'In-House Woodcraft Atelier',
      desc: 'Dedicated factory joinery with aged Burma teak & multi-axis precision CNC machines.',
    },
    {
      icon: Sparkles,
      title: 'German Blumotion Hardware',
      desc: 'Seamless silent soft-close runners & motorized lift-ups guaranteed for life.',
    },
    {
      icon: ShieldCheck,
      title: '100% BWP Marine Plywood',
      desc: 'Boiling-water-proof IS:710 structural core completely termite & moisture safe.',
    },
    {
      icon: Award,
      title: 'Move-in Ready Handover',
      desc: 'Transparent itemized BOQ pricing with dedicated on-site project management.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-cream overflow-hidden relative">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Imagery Composition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Main Image */}
            <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-luxury-200 bg-walnut-dark group">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="S.M. Sanjna Atelier Living Room Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Detail Card: Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 w-full sm:w-72 bg-walnut-dark/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-gold/30 shadow-2xl text-cream"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gold font-bold uppercase tracking-widest flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>The Sanjna Philosophy</span>
                </span>
                <Quote className="w-4 h-4 text-gold/40" />
              </div>
              <p className="font-serif text-xs italic text-cream/90 leading-relaxed">
                &ldquo;True luxury is not about excess. It is about emotional warmth, timeless proportion, and handcrafted integrity.&rdquo;
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-bold text-cream text-[11px] block">Sanjna Sharma</span>
                  <span className="text-[9px] text-gold uppercase tracking-wider block">Principal Architect</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-xs">
                  SS
                </div>
              </div>
            </motion.div>

            {/* Experience Badge Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-3 left-3 sm:-top-3 sm:-left-5 bg-gold text-walnut-dark px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 sm:space-x-2.5 border border-white/30"
            >
              <span className="font-serif text-xl sm:text-2xl font-black">15+</span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-tight">
                Years of Fine<br />Craftsmanship
              </span>
            </motion.div>
          </motion.div>

          {/* Right Text Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionHeader
              alignment="left"
              badge="About Our Atelier"
              title="Where Architectural Vision Meets Master Joinery"
              subtitle="Founded with a singular commitment: to elevate living into an everyday sensory pleasure through bespoke interior design and handcrafted heirloom furniture."
            />

            <div className="space-y-3 text-xs sm:text-sm text-walnut/80 leading-relaxed font-light">
              <p>
                At <strong>S.M. Sanjna Interior Designer</strong>, we do not merely furnish rooms; we compose harmonious living sanctuaries. Every villa, penthouse, and gourmet modular kitchen we undertake is a bespoke creation tailored to your family&apos;s daily rituals.
              </p>
              <p>
                Unlike standard studios that outsource production to third-party contractors, we maintain our own state-of-the-art woodcraft atelier. This allows us to kiln-dry aged plantation teak, machine custom fluted profiles on multi-axis CNC routers, and hand-rub organic natural wax finishes under strict internal quality audits.
              </p>
            </div>

            {/* Feature Cards Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-2xl bg-white border border-luxury-200/90 hover:border-gold/50 shadow-sm transition-all flex items-start space-x-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-luxury-100 group-hover:bg-gold/20 flex items-center justify-center flex-shrink-0 text-luxury-700 group-hover:text-gold transition-colors mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-bold text-walnut-dark group-hover:text-luxury-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-walnut/60 leading-normal mt-0.5 font-light">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/about"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-walnut text-cream hover:bg-gold hover:text-walnut-dark font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-gold-glow flex items-center justify-center space-x-2 text-center"
              >
                <span>Discover Our Heritage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-walnut/30 text-walnut-dark hover:border-gold hover:text-gold font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 text-center"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
