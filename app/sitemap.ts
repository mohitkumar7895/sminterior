import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://smsanjna.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/services/residential-interior-design',
    '/services/commercial-interior-design',
    '/services/modular-kitchen',
    '/services/bedroom-interior',
    '/services/living-room-interior',
    '/services/office-interior',
    '/furniture',
    '/furniture/wooden-furniture',
    '/furniture/kitchen-accessories',
    '/furniture/wardrobes',
    '/furniture/custom-furniture',
    '/projects',
    '/gallery',
    '/blog',
    '/contact',
    '/get-quote',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const products = await query<{ slug: string; updated_at: string }>(
      'SELECT slug, updated_at FROM products'
    );
    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const services = await query<{ slug: string; updated_at: string }>(
      'SELECT slug, updated_at FROM services'
    );
    const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    const projects = await query<{ slug: string; updated_at: string }>(
      'SELECT slug, updated_at FROM projects'
    );
    const projectRoutes: MetadataRoute.Sitemap = projects.map((pr) => ({
      url: `${baseUrl}/projects/${pr.slug}`,
      lastModified: new Date(pr.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const blogs = await query<{ slug: string; updated_at: string }>(
      'SELECT slug, updated_at FROM blogs'
    );
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
  } catch (e) {
    return staticRoutes;
  }
}

