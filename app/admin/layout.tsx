import React from 'react';
import AdminSidebarClient from './AdminSidebarClient';
import { getAuthUser } from '@/lib/auth/jwt';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = getAuthUser();

  return (
    <div className="min-h-screen bg-charcoal text-cream flex flex-col md:flex-row">
      <AdminSidebarClient user={user} />
      <div className="flex-1 flex flex-col min-w-0 bg-[#161616]">
        <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

