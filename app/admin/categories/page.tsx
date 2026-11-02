import React from 'react';
import { getCategories } from '@/models/category';
import CategoriesAdminClient from './CategoriesAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories(true);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Catalog Architecture
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Category &amp; Department Management
        </h1>
        <p className="text-xs text-cream/60">
          Manage product categories, subcategories, banner images, and display sequencing.
        </p>
      </div>

      <CategoriesAdminClient initialCategories={categories} />
    </div>
  );
}

