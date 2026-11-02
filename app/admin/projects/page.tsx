import React from 'react';
import { getProjects } from '@/models/project';
import ProjectsAdminClient from './ProjectsAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Signature Architecture
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Portfolio &amp; Project Showcase
        </h1>
        <p className="text-xs text-cream/60">
          Manage delivered projects, client names, area dimensions, and before/after transformation imagery.
        </p>
      </div>

      <ProjectsAdminClient initialProjects={projects} />
    </div>
  );
}

