import { query, queryOne, execute } from '@/lib/db';

export interface Inquiry {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service_interested?: string;
  status?: string;
  created_at?: string;
}

export interface Consultation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  preferred_date?: string;
  preferred_time?: string;
  property_type?: string;
  room_type?: string;
  estimated_budget?: string;
  notes?: string;
  status?: string;
  created_at?: string;
}

export interface Quotation {
  id?: number;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  area_sqft?: number;
  budget_range?: string;
  requirements?: string;
  floor_plan_url?: string;
  status?: string;
  admin_notes?: string;
  created_at?: string;
}

export async function createInquiry(data: Inquiry) {
  const sql = `
    INSERT INTO inquiries (name, email, phone, subject, message, service_interested)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return execute(sql, [data.name, data.email, data.phone || null, data.subject || null, data.message, data.service_interested || null]);
}

export async function createConsultation(data: Consultation) {
  const sql = `
    INSERT INTO consultations (name, email, phone, preferred_date, preferred_time, property_type, room_type, estimated_budget, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  return execute(sql, [
    data.name, data.email, data.phone, data.preferred_date || null,
    data.preferred_time || null, data.property_type || null, data.room_type || null,
    data.estimated_budget || null, data.notes || null
  ]);
}

export async function createQuotation(data: Quotation) {
  const sql = `
    INSERT INTO quotations (name, email, phone, project_type, area_sqft, budget_range, requirements, floor_plan_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  return execute(sql, [
    data.name, data.email, data.phone, data.project_type,
    data.area_sqft || null, data.budget_range || null, data.requirements || null, data.floor_plan_url || null
  ]);
}

