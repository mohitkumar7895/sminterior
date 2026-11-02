import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';
import { constructMetadata } from '@/models/seo';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/gallery',
    'Interior Design Photo Gallery | S.M. Sanjna',
    'Browse our high-resolution visual gallery of living salons, master bedroom suites, modular kitchens, wooden joinery, and false ceiling lighting.'
  );
}

export default function GalleryPage() {
  const photos = [
    { title: 'The Imperial Villa Living Salon', category: 'Living Room', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Gourmet Quartz Waterfall Island', category: 'Modular Kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Aged Burma Teak Master Bedstead', category: 'Bedroom', url: '/images/products/sovereign-bed-main.jpg' },
    { title: 'Curved French Bouclé Seating', category: 'Living Room', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Smoked Glass Walk-in Dressing Suite', category: 'Wardrobe', url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Italian Carrara Marble 8-Seater', category: 'Dining Room', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Acoustic Teak Slatted Partition Louvers', category: 'Woodwork', url: '/images/products/acoustic-teak-screen.jpg' },
    { title: 'Executive Rosewood & Saddle Leather Desk', category: 'Office', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Double Height Travertine Staircase', category: 'Luxury Villa', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' },
  ];

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Visual Inspiration
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            The Atelier Visual Gallery
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            High-resolution interior photography of our master bedrooms, modular kitchens, living salons, and custom joinery details.
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-walnut-dark"
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-cream">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

