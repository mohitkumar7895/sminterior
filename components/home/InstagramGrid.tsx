'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export default function InstagramGrid() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
      caption: 'Double height living room curation in Golf Links',
      likes: '1.8K',
    },
    {
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      caption: 'Gourmet island kitchen in Calacatta gold quartz',
      likes: '2.4K',
    },
    {
      url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=600&q=80',
      caption: 'The Sovereign Solid Teak & Brass Bed',
      likes: '3.1K',
    },
    {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      caption: 'Sculptural bouclé curves & fluted walnut',
      likes: '1.5K',
    },
    {
      url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=600&q=80',
      caption: 'Smoked glass walk-in dressing suite with warm LEDs',
      likes: '2.9K',
    },
    {
      url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
      caption: 'Mortise & tenon solid woodcraft joinery in atelier',
      likes: '1.2K',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-cream-light border-t border-luxury-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Profile Header with Avatar & Follow CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 bg-cream p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-luxury-200">
          <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
            {/* Story Gradient Ring Around Studio Avatar */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0 shadow-md">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-walnut-dark">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="S.M. Sanjna Atelier"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-serif text-sm sm:text-lg font-bold text-walnut-dark">
                  smsanjna_interior
                </span>
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold">
                  ✓
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-walnut/70">
                S.M. Sanjna Atelier • <strong>28.4K</strong> followers
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 text-center"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Grid Photos with Heart Counts on Hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((item, idx) => (
            <a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm block bg-walnut-dark border border-luxury-200"
            >
              <Image
                src={item.url}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />

              {/* Hover Overlay with Likes and Instagram Icon */}
              <div className="absolute inset-0 bg-walnut-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-cream">
                <Instagram className="w-6 h-6 text-gold mb-1.5" />
                <span className="flex items-center space-x-1 text-xs font-bold text-cream">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{item.likes}</span>
                </span>
                <p className="text-[10px] text-cream/80 line-clamp-2 mt-1 leading-tight font-light">
                  {item.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
