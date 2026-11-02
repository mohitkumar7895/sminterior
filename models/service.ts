import { query, queryOne, execute } from '@/lib/db';

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  icon?: string;
  hero_image?: string;
  gallery_images?: string[] | any;
  starting_price?: number;
  timeline?: string;
  features?: string[] | any;
  process_steps?: ProcessStep[] | any;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export async function getServices(featuredOnly = false): Promise<Service[]> {
  const where = featuredOnly ? 'WHERE is_featured = 1' : '';
  const sql = `SELECT * FROM services ${where} ORDER BY display_order ASC, name ASC`;
  const services = await query<Service>(sql);

  return services.map(s => {
    if (typeof s.features === 'string') {
      try { s.features = JSON.parse(s.features); } catch (e) { s.features = []; }
    }
    if (typeof s.process_steps === 'string') {
      try { s.process_steps = JSON.parse(s.process_steps); } catch (e) { s.process_steps = []; }
    }
    if (typeof s.gallery_images === 'string') {
      try { s.gallery_images = JSON.parse(s.gallery_images); } catch (e) { s.gallery_images = []; }
    }
    return s;
  });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const sql = 'SELECT * FROM services WHERE slug = ? LIMIT 1';
  const service = await queryOne<Service>(sql, [slug]);
  if (!service) return null;

  if (typeof service.features === 'string') {
    try { service.features = JSON.parse(service.features); } catch (e) { service.features = []; }
  }
  if (typeof service.process_steps === 'string') {
    try { service.process_steps = JSON.parse(service.process_steps); } catch (e) { service.process_steps = []; }
  }
  if (typeof service.gallery_images === 'string') {
    try { service.gallery_images = JSON.parse(service.gallery_images); } catch (e) { service.gallery_images = []; }
  }

  return service;
}

