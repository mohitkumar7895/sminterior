import React from 'react';
import { getServices } from '@/models/service';
import ServicesAdminClient from './ServicesAdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Architectural Scope
        </span>
        <h1 className="font-serif text-3xl font-bold text-cream">
          Manage All 14 Interior Design Services
        </h1>
        <p className="text-xs text-cream/60">
          Modify starting investment benchmarks, turnaround schedules, descriptions, and hero visuals without touching code.
        </p>
      </div>

      <ServicesAdminClient services={services} />
    </div>
  );
}

