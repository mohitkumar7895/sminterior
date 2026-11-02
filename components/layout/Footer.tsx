'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin,
  Send, Sparkles, ShieldCheck, Award, Heart, CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setSubscribed(true);
        setNewsletterEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-charcoal text-cream/80 border-t border-luxury-500/20 pt-12 pb-24 md:pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-walnut-dark">
                <span className="font-serif text-gold font-bold text-lg">SM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wider text-cream uppercase">
                  S.M. Sanjna
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold uppercase">
                  Interior Designer & Furniture Atelier
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-cream/70 max-w-sm">
              We design and craft transcendent architectural spaces and heirloom furniture pieces.
              Combining European ergonomic engineering with time-honored Indian solid wood joinery.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                Join the Atelier Circle
              </h5>
              <p className="text-[11px] text-cream/60 mb-3">
                Receive private collection launches, interior design forecasts, and invitations.
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-gold py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for joining our private circle.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-white/5 border border-white/15 px-3.5 py-2.5 rounded-l-xl text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gold hover:bg-luxury-400 text-walnut-dark px-4 py-2.5 rounded-r-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1"
                  >
                    <span>{loading ? '...' : 'Join'}</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Interior Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-serif">
              Interior Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/complete-home-interior-design" className="hover:text-gold transition-colors">
                  Complete Home Interiors
                </Link>
              </li>
              <li>
                <Link href="/services/luxury-interior-design" className="hover:text-gold transition-colors">
                  Luxury Villa Interiors
                </Link>
              </li>
              <li>
                <Link href="/services/modular-kitchen" className="hover:text-gold transition-colors">
                  Modular Kitchen Design
                </Link>
              </li>
              <li>
                <Link href="/services/living-room-interior" className="hover:text-gold transition-colors">
                  Living Room Architecture
                </Link>
              </li>
              <li>
                <Link href="/services/bedroom-interior" className="hover:text-gold transition-colors">
                  Master Bedroom Suites
                </Link>
              </li>
              <li>
                <Link href="/services/office-interior" className="hover:text-gold transition-colors">
                  Corporate Office Fit-Out
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-interior-design" className="hover:text-gold transition-colors">
                  Commercial Retail Boutiques
                </Link>
              </li>
              <li>
                <Link href="/services/wardrobe-design" className="hover:text-gold transition-colors">
                  Walk-In Wardrobes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Furniture & Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-serif">
              Furniture Atelier
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/furniture" className="hover:text-gold transition-colors">
                  All Furniture Collections
                </Link>
              </li>
              <li>
                <Link href="/furniture/wooden-furniture" className="hover:text-gold transition-colors">
                  Solid Burma Teak Furniture
                </Link>
              </li>
              <li>
                <Link href="/furniture/kitchen-accessories" className="hover:text-gold transition-colors">
                  Kitchen Hardware & Carousels
                </Link>
              </li>
              <li>
                <Link href="/furniture/wardrobes" className="hover:text-gold transition-colors">
                  Smoked Glass Closets
                </Link>
              </li>
              <li>
                <Link href="/furniture/custom-furniture" className="hover:text-gold transition-colors">
                  Bespoke Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/furniture?category=dining-room-furniture" className="hover:text-gold transition-colors">
                  Italian Marble Dining Tables
                </Link>
              </li>
              <li>
                <Link href="/furniture?category=living-room-furniture" className="hover:text-gold transition-colors">
                  Curved Bouclé Sofas
                </Link>
              </li>
              <li>
                <Link href="/furniture?category=office-study-furniture" className="hover:text-gold transition-colors">
                  Executive Leather Desks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-serif">
              Design Studio & Atelier
            </h4>
            <div className="space-y-2.5 text-xs text-cream/70">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  42 Heritage Grand Boulevard, Near Luxury Promenade, South Extension II, New Delhi 110049
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+919810087654" className="hover:text-gold transition-colors">
                  +91 98100 87654
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@smsanjna.com" className="hover:text-gold transition-colors">
                  info@smsanjna.com
                </a>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM<br />Sunday: By Appointment</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-cream/80 hover:text-gold hover:border-gold transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-cream/80 hover:text-gold hover:border-gold transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-cream/80 hover:text-gold hover:border-gold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
          <p>© {new Date().getFullYear()} S.M. Sanjna Interior Designer. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-gold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

