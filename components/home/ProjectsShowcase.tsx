import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/models/project';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  return (
    <section className="py-10 sm:py-14 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <SectionHeader
            alignment="left"
            badge="Signature Portfolio"
            title="Recently Delivered Masterpieces"
            subtitle="Take a virtual tour through our completed luxury residences, penthouses, and bespoke commercial venues across Delhi NCR."
          />

          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-700 hover:text-gold transition-colors pb-4 flex-shrink-0 group"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

