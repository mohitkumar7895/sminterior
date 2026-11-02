'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Armchair, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { openConsultationModal } = useAuth();

  // Hide bottom nav in admin area
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: 'Home', href: '/', icon: Home, active: pathname === '/' },
    { label: 'Services', href: '/services', icon: Compass, active: pathname.startsWith('/services') },
    { label: 'Furniture', href: '/furniture', icon: Armchair, active: pathname.startsWith('/furniture') || pathname.startsWith('/product') },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      active: pathname === '/wishlist',
      badge: wishlistCount,
    },
    {
      label: 'Cart',
      href: '/cart',
      icon: ShoppingBag,
      active: pathname === '/cart',
      badge: cartCount,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-walnut-dark/95 backdrop-blur-xl border-t border-luxury-500/20 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
                item.active ? 'text-gold' : 'text-cream/60 hover:text-cream'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.active ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 rounded-full bg-gold text-walnut-dark text-[9px] font-bold flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${item.active ? 'font-semibold text-gold' : 'font-normal'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Quick Consultation CTA */}
        <button
          onClick={() => openConsultationModal()}
          className="flex flex-col items-center justify-center py-1 px-2 text-gold animate-pulse"
          aria-label="Book 3D Design Consultation"
        >
          <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </div>
          <span className="text-[9px] font-semibold text-gold mt-0.5 tracking-tight">
            Consult
          </span>
        </button>
      </div>
    </div>
  );
}

