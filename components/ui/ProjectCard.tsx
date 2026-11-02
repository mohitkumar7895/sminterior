import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Maximize2, Calendar } from 'lucide-react';
import { Project } from '@/models/project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block rounded-3xl overflow-hidden bg-walnut-dark border border-luxury-500/20 shadow-md hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={project.hero_image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold text-walnut-dark shadow-md">
            {project.category}
          </span>
        </div>

        {/* Top Right Arrow Pill */}
        <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-walnut-dark/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-cream group-hover:bg-gold group-hover:text-walnut-dark transition-all">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        {/* Bottom Content Information */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-cream space-y-2">
          <div className="flex items-center space-x-4 text-xs text-cream/70 font-light">
            {project.location && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>{project.location}</span>
              </span>
            )}
            {project.area_sqft && (
              <span className="flex items-center space-x-1">
                <Maximize2 className="w-3.5 h-3.5 text-gold" />
                <span>{project.area_sqft.toLocaleString()} Sq.Ft.</span>
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-gold transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-cream/75 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

