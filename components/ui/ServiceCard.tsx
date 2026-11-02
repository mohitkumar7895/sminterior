'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Clock, Sparkles, Check, Home, Crown, ChefHat,
  BedDouble, Sofa, Briefcase, Building2, Hammer, Trees, Layers, Grid, Compass
} from 'lucide-react';
import { Service } from '@/models/service';
import { useAuth } from '@/context/AuthContext';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, any> = {
  Home,
  Crown,
  ChefHat,
  BedDouble,
  Sofa,
  Briefcase,
  Building2,
  Hammer,
  Trees,
  Layers,
  Grid,
  Sparkles,
  Compass,
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const { openConsultationModal } = useAuth();
  const IconComponent = iconMap[service.icon || 'Sparkles'] || Sparkles;

  const defaultHero =
    service.hero_image ||
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group relative bg-cream-light border border-luxury-200/80 hover:border-gold/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top Image with Overlay & Icon Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-walnut-dark">
        <Image
          src={defaultHero}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-dark via-walnut-dark/30 to-transparent" />

        {/* Floating Architectural Icon */}
        <div className="absolute bottom-4 left-4 z-10 w-12 h-12 rounded-2xl bg-walnut-dark/90 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold shadow-lg group-hover:border-gold transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Timeline Badge */}
        {service.timeline && (
          <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-walnut-dark/80 backdrop-blur-md border border-white/10 text-cream/90 text-[11px] font-medium">
            <Clock className="w-3 h-3 text-gold" />
            <span>{service.timeline}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <Link href={`/services/${service.slug}`} className="block">
            <h3 className="font-serif text-xl font-bold text-walnut-dark group-hover:text-luxury-600 transition-colors">
              {service.name}
            </h3>
          </Link>
          <p className="text-xs text-walnut/70 leading-relaxed line-clamp-2">
            {service.short_description}
          </p>

          {/* Features Bullets (Only 2 concise highlights) */}
          {Array.isArray(service.features) && service.features.length > 0 && (
            <ul className="pt-2 space-y-1.5 border-t border-luxury-200/60">
              {service.features.slice(0, 2).map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-[11px] text-walnut/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-luxury-200/60 flex items-center justify-between">
          <button
            onClick={() => openConsultationModal(service.name)}
            className="text-xs font-semibold text-luxury-700 hover:text-gold uppercase tracking-wider transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Consultation</span>
          </button>

          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-walnut-dark hover:text-gold transition-colors"
          >
            <span>Explore Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

