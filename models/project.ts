import { query, queryOne, execute } from '@/lib/db';

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  client_name?: string;
  location?: string;
  completion_year: number;
  area_sqft: number;
  budget_range?: string;
  description?: string;
  hero_image: string;
  before_image?: string;
  after_image?: string;
  gallery_images?: string[] | any;
  challenges?: string;
  solutions?: string;
  testimonial_quote?: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export async function getProjects(category?: string, featuredOnly = false): Promise<Project[]> {
  const whereClauses: string[] = ['1=1'];
  const params: any[] = [];

  if (category && category !== 'All') {
    whereClauses.push('category = ?');
    params.push(category);
  }

  if (featuredOnly) {
    whereClauses.push('is_featured = 1');
  }

  const sql = `
    SELECT * FROM projects
    WHERE ${whereClauses.join(' AND ')}
    ORDER BY display_order ASC, created_at DESC
  `;

  const projects = await query<Project>(sql, params);
  return projects.map(p => {
    if (typeof p.gallery_images === 'string') {
      try { p.gallery_images = JSON.parse(p.gallery_images); } catch (e) { p.gallery_images = []; }
    }
    return p;
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const sql = 'SELECT * FROM projects WHERE slug = ? LIMIT 1';
  const project = await queryOne<Project>(sql, [slug]);
  if (!project) return null;

  if (typeof project.gallery_images === 'string') {
    try { project.gallery_images = JSON.parse(project.gallery_images); } catch (e) { project.gallery_images = []; }
  }

  return project;
}

