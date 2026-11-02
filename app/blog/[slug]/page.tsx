import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, User, ArrowLeft, Calendar, Share2, Sparkles } from 'lucide-react';
import { getBlogBySlug, getBlogs } from '@/models/content';
import { constructMetadata } from '@/models/seo';
import ContactCtaBanner from '@/components/home/ContactCtaBanner';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found | S.M. Sanjna' };

  return constructMetadata(
    `/blog/${params.slug}`,
    `${blog.title} | S.M. Sanjna Interior Designer`,
    blog.excerpt || 'Design article from S.M. Sanjna Interior Designer.'
  );
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const otherBlogs = (await getBlogs(3)).filter((b) => b.slug !== blog.slug);

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Article Header */}
      <section className="py-20 sm:py-24 bg-walnut-dark text-cream relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-1.5 text-xs text-gold hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </Link>

          {blog.category_name && (
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold text-walnut-dark inline-block shadow-md">
              {blog.category_name}
            </span>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-cream/70 pt-2 font-light">
            <span className="flex items-center space-x-1.5">
              <User className="w-4 h-4 text-gold" />
              <span>By {blog.author_name}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-gold" />
              <span>{blog.read_time || '5 min read'}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              <span>Published {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      {blog.cover_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-10">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-luxury-200 bg-walnut-dark">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {blog.excerpt && (
            <p className="font-serif text-lg sm:text-xl italic text-walnut leading-relaxed border-l-4 border-gold pl-6 py-2 bg-cream-light rounded-r-2xl">
              &ldquo;{blog.excerpt}&rdquo;
            </p>
          )}

          <div className="prose prose-luxury text-sm sm:text-base text-walnut/80 leading-relaxed space-y-6 font-light">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-walnut-dark pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Author Box */}
          <div className="mt-12 p-6 rounded-3xl bg-cream-light border border-luxury-200 flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-walnut-dark border border-gold flex items-center justify-center text-gold font-serif text-xl font-bold flex-shrink-0">
              SM
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-walnut-dark">
                {blog.author_name}
              </h4>
              <p className="text-xs text-walnut/70">
                Principal Architectural Designer &amp; Founder at S.M. Sanjna Interior Designer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Articles */}
      {otherBlogs.length > 0 && (
        <section className="py-16 bg-cream-light border-t border-luxury-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h3 className="font-serif text-2xl font-bold text-walnut-dark">
              More From The Journal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherBlogs.map((b) => (
                <div key={b.id} className="p-6 rounded-3xl bg-cream border border-luxury-200 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-walnut-dark">
                    <Link href={`/blog/${b.slug}`} className="hover:text-gold transition-colors">
                      {b.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-walnut/70 line-clamp-2">{b.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCtaBanner />
    </div>
  );
}

