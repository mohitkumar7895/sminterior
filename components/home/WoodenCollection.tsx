import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Trees, Sparkles, ShieldCheck } from 'lucide-react';

export default function WoodenCollection() {
  const points = [
    { title: '100% Plantation Burma Teak', desc: 'Sustainably sourced, kiln-dried timber resistant to moisture and pests.' },
    { title: 'Time-Honored Mortise & Tenon Joinery', desc: 'No cheap screws or staples; built to flex naturally with seasonal humidity.' },
    { title: 'Hand-Rubbed Organic Wax & Oils', desc: 'Enhancing the fragrant natural wood resins without toxic synthetic varnishes.' },
    { title: '15-Year Termite & Structural Guarantee', desc: 'Heirloom stability designed to be passed down through generations.' }
  ];

  return (
    <section className="py-10 sm:py-14 bg-walnut-dark text-cream relative overflow-hidden">
      {/* Decorative subtle gold grid background */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text & Features */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase">
              <Trees className="w-3.5 h-3.5" />
              <span>Artisan Woodcraft Atelier</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream leading-tight">
              The Soul of Solid Burma Teak &amp; American Walnut
            </h2>

            <p className="text-sm sm:text-base text-cream/80 font-light leading-relaxed">
              In a market saturated with hollow engineered boards and synthetic plastic veneers, our atelier stays stubbornly faithful to authentic, solid hardwood joinery. Each piece carries its own unique grain topography and warm tactile resonance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <h4 className="font-serif text-xs font-bold text-gold uppercase tracking-wider">{p.title}</h4>
                  <p className="text-[11px] text-cream/70 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/furniture/wooden-furniture"
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-gold-glow flex items-center space-x-2"
              >
                <span>Explore Wooden Furniture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/furniture/custom-furniture"
                className="text-xs uppercase tracking-widest font-semibold text-cream hover:text-gold transition-colors"
              >
                Commission Bespoke Woodwork
              </Link>
            </div>
          </div>

          {/* Right Column Visual Gallery with Direct Product Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Link
                href="/furniture/custom-furniture"
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 block bg-charcoal"
              >
                <Image
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
                  alt="Artisan Joinery Woodwork"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">Commission</span>
                    <h4 className="font-serif text-xs font-bold text-cream">Hand-Carved Partitions</h4>
                  </div>
                </div>
              </Link>

              <Link
                href="/product/artisan-fluted-walnut-credenza-tv-console"
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 block bg-charcoal"
              >
                <Image
                  src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80"
                  alt="Solid Walnut TV Credenza"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">Artisan Collection</span>
                    <h4 className="font-serif text-xs font-bold text-cream line-clamp-1">Fluted Walnut Credenza</h4>
                  </div>
                </div>
              </Link>
            </div>

            <div className="space-y-4 pt-8">
              <Link
                href="/product/bespoke-fluted-teak-rotating-room-divider"
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 block bg-charcoal"
              >
                <Image
                  src="/images/products/acoustic-teak-screen.jpg"
                  alt="Acoustic Teak Screen - Burma Teak Fluted Partition"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">Living Accents</span>
                    <h4 className="font-serif text-xs font-bold text-cream line-clamp-1">Acoustic Teak Screen</h4>
                  </div>
                </div>
              </Link>

              <Link
                href="/product/sovereign-solid-teak-brass-bed"
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gold/40 block bg-charcoal ring-2 ring-gold/20"
              >
                <Image
                  src="/images/products/sovereign-bed-main.jpg"
                  alt="The Sovereign Solid Teak & Brass Bed"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">Master Suite</span>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-cream line-clamp-2">
                      The Sovereign Solid Teak &amp; Brass Bed
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

