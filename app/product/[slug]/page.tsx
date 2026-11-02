import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts } from '@/models/product';
import { constructMetadata } from '@/models/seo';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found | S.M. Sanjna' };

  const ogImage = product.primary_image || product.images?.[0]?.image_url;

  return {
    title: `${product.name} | S.M. Sanjna Interior Designer`,
    description: product.short_description || product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, product.category_id, 4);

  // JSON-LD Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.map((i) => i.image_url) || [product.primary_image],
    description: product.short_description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.discount_price || product.base_price,
      priceCurrency: 'INR',
      availability: product.is_in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://smsanjna.com/product/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 5,
      reviewCount: product.reviews_count || 12,
    },
  };

  return (
    <div className="bg-cream-light min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Main Product Viewer & Purchase Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetailClient product={product} />
        </div>
      </section>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="py-20 bg-cream border-t border-luxury-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              alignment="left"
              badge="Curated Complements"
              title="Related Furniture Pieces"
              subtitle="Discover matching items designed to harmonize with this aesthetic."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

