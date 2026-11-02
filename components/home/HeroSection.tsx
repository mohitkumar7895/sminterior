'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface BannerItem {
  id: number;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  background_image: string;
  badge_text?: string;
}

interface HeroSectionProps {
  banners?: BannerItem[];
}

const defaultBanners: BannerItem[] = [
  {
    id: 1,
    title: 'Transform Your Space Into Something Extraordinary',
    subtitle: 'Bespoke architectural interiors and handcrafted luxury furniture, curated for those who appreciate the poetry of fine living.',
    cta_text: 'Explore Collection',
    cta_link: '/furniture',
    secondary_cta_text: 'Book Free Consultation',
    secondary_cta_link: '/get-quote',
    background_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
    badge_text: 'Haute Interior Architecture & Fine Joinery',
  },
  {
    id: 2,
    title: 'Mastercrafted Teak & Italian Stone Furniture',
    subtitle: 'From monumental marble dining tables to organic curved bouclé sofas, discover heirloom pieces hand-milled in our atelier.',
    cta_text: 'Discover Furniture',
    cta_link: '/furniture/wooden-furniture',
    secondary_cta_text: 'Request Custom Quote',
    secondary_cta_link: '/get-quote',
    background_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85',
    badge_text: 'The 2025 Artisan Collection',
  },
  {
    id: 3,
    title: 'The German-Precision Modular Kitchen Sanctuary',
    subtitle: 'Waterproof marine ply, quartz island counters, and whisper-quiet Blum motion technology engineered for the modern culinary connoisseur.',
    cta_text: 'View Modular Kitchens',
    cta_link: '/services/modular-kitchen',
    secondary_cta_text: 'Design My Kitchen',
    secondary_cta_link: '/get-quote',
    background_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=85',
    badge_text: 'Complete Modular Kitchen Sanctuary',
  },
];

export default function HeroSection({ banners = defaultBanners }: HeroSectionProps) {
  const activeBanners = banners && banners.length > 0 ? banners : defaultBanners;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openConsultationModal } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const current = activeBanners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <div className="relative min-h-[82vh] sm:min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-charcoal text-cream">
      {/* Background Cinematic Imagery with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={current.background_image}
            alt={current.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Multi-layered luxury Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          {/* Badge */}
          <motion.div
            key={`badge-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gold/40 bg-walnut-dark/80 backdrop-blur-md text-gold text-[10px] sm:text-xs font-semibold tracking-widest uppercase shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>{current.badge_text || 'Exclusive Haute Interiors'}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-2xl sm:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[1.15] tracking-tight text-cream"
          >
            {current.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${currentIndex}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-base lg:text-lg text-cream/80 max-w-2xl font-light leading-relaxed"
          >
            {current.subtitle}
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            key={`cta-${currentIndex}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Link
              href={current.cta_link || '/furniture'}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-gold-glow flex items-center justify-center space-x-2 group text-center"
            >
              <span>{current.cta_text || 'Explore Our Collection'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => openConsultationModal()}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-cream font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{current.secondary_cta_text || 'Book a Free Consultation'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-20 items-center space-x-3">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full border border-white/20 bg-walnut-dark/80 backdrop-blur-md text-cream hover:bg-gold hover:text-walnut-dark transition-all flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full border border-white/20 bg-walnut-dark/80 backdrop-blur-md text-cream hover:bg-gold hover:text-walnut-dark transition-all flex items-center justify-center shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {activeBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

