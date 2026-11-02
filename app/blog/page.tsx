import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Clock, User, ArrowRight } from 'lucide-react';
import { getBlogs } from '@/models/content';
import { constructMetadata } from '@/models/seo';
import SectionHeader from '@/components/ui/SectionHeader';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata(
    '/blog',
    'Interior Design Journal & Architecture Essays | S.M. Sanjna',
    'Read expert articles and design forecasts on modular kitchen ergonomics, solid teak joinery, warm minimalist palettes, and architectural lighting.'
  );
}

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await getBlogs(20);

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Studio Editorial
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            The Design Journal
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Essays on architectural proportion, material longevity, culinary ergonomics, and the philosophy of refined living.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-cream rounded-3xl overflow-hidden border border-luxury-200 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-walnut-dark">
                    <Image
                      src={blog.cover_image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {blog.category_name && (
                      <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-walnut-dark/80 backdrop-blur-md text-gold border border-gold/40">
                        {blog.category_name}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[11px] text-walnut/60 font-light">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>{blog.read_time || '5 min read'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-gold" />
                        <span>{blog.author_name}</span>
                      </span>
                    </div>

                    <Link href={`/blog/${blog.slug}`} className="block">
                      <h3 className="font-serif text-lg font-bold text-walnut-dark group-hover:text-luxury-600 transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-walnut/70 line-clamp-3 leading-relaxed font-light">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-luxury-200/50 mt-4">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-luxury-700 hover:text-gold uppercase tracking-wider transition-colors pt-3"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCtaBanner />
    </div>
  );
}

