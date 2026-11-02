import { query, queryOne } from '@/lib/db';

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  background_image: string;
  badge_text?: string;
  display_order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  client_name: string;
  role_or_title?: string;
  company?: string;
  project_title?: string;
  rating: number;
  comment: string;
  avatar_url?: string;
  project_image_url?: string;
  is_featured: boolean;
}

export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  author_name: string;
  read_time: string;
  published_at: string;
  is_featured: boolean;
  views_count: number;
}

export interface ContactDetails {
  id: number;
  company_name: string;
  phone_primary: string;
  phone_secondary?: string;
  email_primary: string;
  email_support?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  google_maps_url?: string;
  opening_hours: string;
  instagram_url?: string;
  facebook_url?: string;
  pinterest_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
}

export async function getBanners(): Promise<Banner[]> {
  const sql = 'SELECT * FROM banners WHERE is_active = 1 ORDER BY display_order ASC';
  return query<Banner>(sql);
}

export async function getTestimonials(featuredOnly = true): Promise<Testimonial[]> {
  const where = featuredOnly ? 'WHERE is_featured = 1' : '';
  const sql = `SELECT * FROM testimonials ${where} ORDER BY display_order ASC`;
  return query<Testimonial>(sql);
}

export async function getFAQs(): Promise<FAQ[]> {
  const sql = 'SELECT * FROM faqs WHERE is_active = 1 ORDER BY display_order ASC';
  return query<FAQ>(sql);
}

export async function getBlogs(limit = 6): Promise<Blog[]> {
  const sql = `
    SELECT
      b.*,
      bc.name AS category_name,
      bc.slug AS category_slug
    FROM blogs b
    LEFT JOIN blog_categories bc ON b.category_id = bc.id
    ORDER BY b.is_featured DESC, b.published_at DESC
    LIMIT ?
  `;
  return query<Blog>(sql, [limit]);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const sql = `
    SELECT
      b.*,
      bc.name AS category_name,
      bc.slug AS category_slug
    FROM blogs b
    LEFT JOIN blog_categories bc ON b.category_id = bc.id
    WHERE b.slug = ?
    LIMIT 1
  `;
  return queryOne<Blog>(sql, [slug]);
}

export async function getContactDetails(): Promise<ContactDetails | null> {
  const sql = 'SELECT * FROM contact_details LIMIT 1';
  return queryOne<ContactDetails>(sql);
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await query<{ setting_key: string; setting_value: string }>('SELECT setting_key, setting_value FROM settings');
  const settings: Record<string, string> = {};
  for (const r of rows) {
    settings[r.setting_key] = r.setting_value;
  }
  return settings;
}

