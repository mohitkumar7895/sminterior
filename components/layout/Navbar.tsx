'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Search, Heart, ShoppingBag, ChevronDown, Sparkles,
  Phone, ArrowRight, Layers, Home, Crown, ChefHat, BedDouble, Sofa, Briefcase, Building2
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { openConsultationModal, openSearchModal } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [furnitureDropdownOpen, setFurnitureDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setFurnitureDropdownOpen(false);
  }, [pathname]);

  const serviceCategories = [
    {
      title: 'Residential Architecture',
      items: [
        { name: 'Complete Home Interior', href: '/services/complete-home-interior-design' },
        { name: 'Luxury Villa Design', href: '/services/luxury-interior-design' },
        { name: 'Residential Interiors', href: '/services/residential-interior-design' },
        { name: 'Living Room Architecture', href: '/services/living-room-interior' },
        { name: 'Bedroom Suites', href: '/services/bedroom-interior' },
      ],
    },
    {
      title: 'Modular Kitchens & Joinery',
      items: [
        { name: 'Modular Kitchen Design', href: '/services/modular-kitchen' },
        { name: 'Walk-In Wardrobes', href: '/services/wardrobe-design' },
        { name: 'Furniture Manufacturing', href: '/services/furniture-manufacturing' },
        { name: 'Custom Wooden Furniture', href: '/services/custom-wooden-furniture' },
      ],
    },
    {
      title: 'Commercial & Spatial',
      items: [
        { name: 'Office Interior Design', href: '/services/office-interior' },
        { name: 'Commercial & Retail', href: '/services/commercial-interior-design' },
        { name: 'False Ceiling & Gypsum', href: '/services/false-ceiling' },
        { name: 'Lighting Architecture', href: '/services/lighting-design' },
        { name: 'Space Planning & 3D VR', href: '/services/space-planning' },
        { name: 'Renovation Services', href: '/services/renovation-services' },
      ],
    },
  ];

  const furnitureCategories = [
    { name: 'All Furniture', href: '/furniture' },
    { name: 'Wooden Furniture', href: '/furniture/wooden-furniture' },
    { name: 'Kitchen Hardware & Parts', href: '/furniture/kitchen-accessories' },
    { name: 'Luxury Wardrobes', href: '/furniture/wardrobes' },
    { name: 'Custom Furniture Commission', href: '/furniture/custom-furniture' },
    { name: 'Living Room Furniture', href: '/furniture?category=living-room-furniture' },
    { name: 'Bedroom Furniture', href: '/furniture?category=bedroom-furniture' },
    { name: 'Modular Kitchens', href: '/furniture?category=modular-kitchens' },
    { name: 'Dining Room Furniture', href: '/furniture?category=dining-room-furniture' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-walnut-dark/95 backdrop-blur-md shadow-2xl py-3 border-b border-luxury-500/20'
          : 'bg-walnut-dark py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center bg-walnut/80 group-hover:border-gold transition-colors">
              <span className="font-serif text-gold font-bold text-lg tracking-widest">SM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-cream-light group-hover:text-gold transition-colors uppercase">
                S.M. Sanjna
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-light">
                Interior & Furniture Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link
              href="/"
              className={`text-sm tracking-wide transition-colors ${
                pathname === '/' ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`text-sm tracking-wide transition-colors ${
                pathname === '/about' ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 text-sm tracking-wide transition-colors py-2 ${
                  pathname.startsWith('/services') ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-gold' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-walnut-dark/98 backdrop-blur-xl border border-luxury-500/30 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  {serviceCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-xs font-semibold text-gold uppercase tracking-wider border-b border-luxury-500/20 pb-1.5">
                        {cat.title}
                      </h4>
                      <ul className="space-y-2">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={item.href}
                              className="text-xs text-cream/70 hover:text-gold hover:translate-x-1 transition-all block"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 pt-3 border-t border-luxury-500/20 flex items-center justify-between">
                    <Link
                      href="/services"
                      className="text-xs text-gold flex items-center space-x-1 hover:underline font-medium"
                    >
                      <span>Explore all 14 architectural services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openConsultationModal()}
                      className="text-xs text-cream/80 hover:text-gold flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>Book Free 3D Design Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Furniture Collection Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFurnitureDropdownOpen(true)}
              onMouseLeave={() => setFurnitureDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 text-sm tracking-wide transition-colors py-2 ${
                  pathname.startsWith('/furniture') || pathname.startsWith('/product')
                    ? 'text-gold font-medium'
                    : 'text-cream/80 hover:text-gold'
                }`}
              >
                <span>Furniture</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${furnitureDropdownOpen ? 'rotate-180 text-gold' : ''}`} />
              </button>

              {furnitureDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-walnut-dark/98 backdrop-blur-xl border border-luxury-500/30 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1">
                    {furnitureCategories.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="text-xs text-cream/80 hover:text-gold hover:bg-white/5 px-3 py-2 rounded-lg transition-colors flex items-center justify-between group"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-gold transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className={`text-sm tracking-wide transition-colors ${
                pathname.startsWith('/projects') ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/gallery"
              className={`text-sm tracking-wide transition-colors ${
                pathname === '/gallery' ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              className={`text-sm tracking-wide transition-colors ${
                pathname === '/contact' ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons & Consultation CTA */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={openSearchModal}
              aria-label="Search"
              className="p-2 text-cream/80 hover:text-gold transition-colors rounded-full hover:bg-white/5"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-cream/80 hover:text-gold transition-colors rounded-full hover:bg-white/5"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold text-walnut-dark text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 text-cream/80 hover:text-gold transition-colors rounded-full hover:bg-white/5"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold text-walnut-dark text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Book Consultation Button */}
            <button
              onClick={() => openConsultationModal()}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold text-walnut-dark hover:bg-luxury-400 transition-all shadow-md hover:shadow-gold-glow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-cream hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-gold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-walnut-dark/98 backdrop-blur-2xl border-b border-luxury-500/20 max-h-[85vh] overflow-y-auto px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3 pb-4 border-b border-white/10">
            <Link href="/" className="text-base font-serif text-cream hover:text-gold py-1">
              Home
            </Link>
            <Link href="/about" className="text-base font-serif text-cream hover:text-gold py-1">
              About Us
            </Link>
            <Link href="/services" className="text-base font-serif text-cream hover:text-gold py-1">
              All 14 Interior Services
            </Link>
            <div className="pl-4 space-y-1.5 border-l border-gold/30">
              <Link href="/services/modular-kitchen" className="block text-xs text-cream/70 hover:text-gold">
                • Modular Kitchen Design
              </Link>
              <Link href="/services/luxury-interior-design" className="block text-xs text-cream/70 hover:text-gold">
                • Luxury Villa Design
              </Link>
              <Link href="/services/bedroom-interior" className="block text-xs text-cream/70 hover:text-gold">
                • Bedroom Interiors
              </Link>
              <Link href="/services/living-room-interior" className="block text-xs text-cream/70 hover:text-gold">
                • Living Room Design
              </Link>
              <Link href="/services/office-interior" className="block text-xs text-cream/70 hover:text-gold">
                • Office & Corporate Design
              </Link>
            </div>
            <Link href="/furniture" className="text-base font-serif text-cream hover:text-gold py-1">
              Furniture Collection
            </Link>
            <div className="pl-4 space-y-1.5 border-l border-gold/30">
              <Link href="/furniture/wooden-furniture" className="block text-xs text-cream/70 hover:text-gold">
                • Solid Wooden Furniture
              </Link>
              <Link href="/furniture/kitchen-accessories" className="block text-xs text-cream/70 hover:text-gold">
                • Kitchen Accessories & Parts
              </Link>
              <Link href="/furniture/wardrobes" className="block text-xs text-cream/70 hover:text-gold">
                • Luxury Wardrobes & Closets
              </Link>
              <Link href="/furniture/custom-furniture" className="block text-xs text-cream/70 hover:text-gold">
                • Bespoke Custom Furniture
              </Link>
            </div>
            <Link href="/projects" className="text-base font-serif text-cream hover:text-gold py-1">
              Projects & Portfolio
            </Link>
            <Link href="/gallery" className="text-base font-serif text-cream hover:text-gold py-1">
              Gallery
            </Link>
            <Link href="/contact" className="text-base font-serif text-cream hover:text-gold py-1">
              Contact Studio
            </Link>
            <Link href="/get-quote" className="text-base font-serif text-gold font-medium py-1">
              Request a Free Quote
            </Link>
          </div>

          <div className="pt-2 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultationModal();
              }}
              className="w-full py-3 rounded-xl bg-gold text-walnut-dark font-medium text-sm tracking-wide uppercase flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>

            <a
              href="tel:+919810087654"
              className="w-full py-2.5 rounded-xl border border-white/20 text-cream text-center text-xs tracking-wide flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Concierge: +91 98100 87654</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

