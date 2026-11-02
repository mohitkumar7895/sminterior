'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, FolderTree, Sparkles, Briefcase,
  ShoppingBag, MessageSquare, Globe, Settings, LogOut, ExternalLink,
  ChevronRight, Menu, X
} from 'lucide-react';
import { AdminPayload } from '@/lib/auth/jwt';

interface Props {
  user: AdminPayload | null;
}

export default function AdminSidebarClient({ user }: Props) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // If on login page, hide sidebar completely
  if (pathname === '/admin/login') {
    return null;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Services (14)', href: '/admin/services', icon: Sparkles },
    { label: 'Portfolio', href: '/admin/projects', icon: Briefcase },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Inquiries & Quotes', href: '/admin/inquiries', icon: MessageSquare },
    { label: 'Dynamic SEO', href: '/admin/seo', icon: Globe },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/admin/login';
  };

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-walnut-dark border-b border-luxury-500/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-charcoal">
            <span className="font-serif text-gold font-bold text-xs">SM</span>
          </div>
          <div>
            <span className="font-serif text-xs font-bold tracking-wider text-cream uppercase block">
              S.M. Sanjna
            </span>
            <span className="text-[8px] uppercase tracking-widest text-gold block">
              Admin Console
            </span>
          </div>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gold hover:text-white"
          aria-label="Toggle admin menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-walnut-dark/98 backdrop-blur-xl border-b border-luxury-500/30 p-4 space-y-2 sticky top-14 z-40 animate-in slide-in-from-top-2 duration-200">
          {user && (
            <div className="p-3 mb-2 rounded-xl bg-white/5 flex items-center justify-between text-xs">
              <span className="font-bold text-cream truncate">{user.name}</span>
              <span className="text-gold uppercase text-[10px]">{user.role}</span>
            </div>
          )}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gold text-walnut-dark font-bold shadow-md'
                      : 'text-cream/70 hover:bg-white/5 hover:text-cream'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-walnut-dark' : 'text-gold'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-center py-2 px-3 rounded-xl border border-white/20 text-xs text-cream hover:text-gold"
            >
              View Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-xl bg-red-950/40 text-red-300 text-xs hover:bg-red-900/60"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-walnut-dark border-r border-luxury-500/20 flex-col justify-between flex-shrink-0 min-h-screen text-cream">
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full border border-gold flex items-center justify-center bg-charcoal">
                <span className="font-serif text-gold font-bold text-sm">SM</span>
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-wider text-cream uppercase block">
                  S.M. Sanjna
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gold block">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* User Info Pill */}
          {user && (
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between text-xs">
              <div className="truncate">
                <span className="text-[11px] font-bold text-cream truncate block">{user.name}</span>
                <span className="text-[10px] text-gold uppercase">{user.role}</span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gold text-walnut-dark font-bold shadow-md'
                      : 'text-cream/70 hover:bg-white/5 hover:text-cream'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-walnut-dark' : 'text-gold'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Controls */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-cream/70 hover:bg-white/5 hover:text-gold transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
              <span>View Live Site</span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

