import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Blog } from '@/models/content';

interface JournalSectionProps {
  blogs: Blog[];
}

export default function JournalSection({ blogs }: JournalSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-cream border-t border-luxury-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            alignment="left"
            badge="The Editorial"
            title="Insights From Our Design Studio"
            subtitle="Curated essays on bespoke joinery, modular kitchen ergonomics, warm minimalism, and timeless material palettes."
          />

          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-700 hover:text-gold transition-colors pb-4 flex-shrink-0 group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog.id}
              className="group bg-cream-light rounded-3xl overflow-hidden border border-luxury-200/80 hover:border-gold/50 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
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
                      <Clock className="w-3 h-3 text-gold" />
                      <span>{blog.read_time || '5 min read'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gold" />
                      <span>{blog.author_name}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${blog.slug}`} className="block">
                    <h3 className="font-serif text-lg font-bold text-walnut-dark group-hover:text-luxury-600 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-walnut/70 line-clamp-2 leading-relaxed font-light">
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
  );
}

