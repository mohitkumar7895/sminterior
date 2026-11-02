import { queryOne } from '@/lib/db';
import { Metadata } from 'next';

export interface SeoMetadata {
  id?: number;
  page_route: string;
  page_title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: string;
  robots_index?: boolean;
  robots_follow?: boolean;
  h1_heading?: string;
  structured_data?: any;
}

export async function getSeoMetadata(route: string): Promise<SeoMetadata | null> {
  const sql = 'SELECT * FROM seo_metadata WHERE page_route = ? LIMIT 1';
  return queryOne<SeoMetadata>(sql, [route]);
}

export async function constructMetadata(
  route: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<Metadata> {
  let seo: SeoMetadata | null = null;
  try {
    seo = await getSeoMetadata(route);
  } catch {
    seo = null;
  }

  const title = seo?.meta_title || fallbackTitle;
  const description = seo?.meta_description || fallbackDescription;
  const ogImage = seo?.og_image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
  const canonical = seo?.canonical_url || `https://smsanjna.com${route}`;

  return {
    title: `${title} | S.M. Sanjna Interior Designer`,
    description,
    keywords: seo?.meta_keywords?.split(',').map(k => k.trim()) || ['luxury interior designer', 'modular kitchen', 'delhi ncr', 'fine furniture'],
    alternates: {
      canonical,
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      siteName: 'S.M. Sanjna Interior Designer',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: [ogImage],
    },
    robots: {
      index: seo?.robots_index ?? true,
      follow: seo?.robots_follow ?? true,
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'S.M. Sanjna Interior Designer',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    '@id': 'https://smsanjna.com',
    url: 'https://smsanjna.com',
    telephone: '+91 90454 49196',
    priceRange: '₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '42 Heritage Grand Boulevard, Near Luxury Promenade, South Extension II',
      addressLocality: 'New Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5708,
      longitude: 77.2228,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://instagram.com/smsanjna_interior',
      'https://facebook.com/smsanjnainterior',
      'https://pinterest.com/smsanjnainterior',
      'https://linkedin.com/company/smsanjna-interior',
    ],
  };
}

