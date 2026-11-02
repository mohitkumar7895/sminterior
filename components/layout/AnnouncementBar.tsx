'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  announcement?: string;
  phone?: string;
  email?: string;
}

export default function AnnouncementBar({
  announcement = '✨ Complimentary 3D Spatial Consultation & ₹10,000 Voucher on Full-Home Turnkey Projects this Season',
  phone = '+91 98100 87654',
  email = 'info@smsanjna.com'
}: AnnouncementBarProps) {
  return (
    <div className="bg-walnut-dark text-cream/90 text-xs border-b border-luxury-500/20 py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-gold tracking-wide font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse flex-shrink-0" />
          <span className="truncate">{announcement}</span>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-cream/70 text-xs">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center space-x-1.5 hover:text-gold transition-colors"
          >
            <Phone className="w-3 h-3 text-gold" />
            <span>{phone}</span>
          </a>
          <span className="text-luxury-600/40">|</span>
          <a
            href={`mailto:${email}`}
            className="flex items-center space-x-1.5 hover:text-gold transition-colors"
          >
            <Mail className="w-3 h-3 text-gold" />
            <span>{email}</span>
          </a>
          <span className="text-luxury-600/40">|</span>
          <Link href="/get-quote" className="text-gold font-medium hover:underline">
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

