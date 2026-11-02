'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { openConsultationModal } = useAuth();
  const [expanded, setExpanded] = useState(false);

  // Hide in admin area
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const phone = '919810087654';
  const defaultMsg = encodeURIComponent(
    'Hello S.M. Sanjna Interior Studio! I am exploring your website and would like to discuss an interior project / furniture inquiry.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end space-y-2">
      {/* Expanded Quick Contact Card */}
      {expanded && (
        <div className="bg-walnut-dark/95 backdrop-blur-xl border border-luxury-500/30 rounded-2xl p-4 shadow-2xl w-64 space-y-3 mb-1 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              <span className="text-xs font-semibold text-cream">Interior Concierge</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-cream/50 hover:text-cream p-1"
              aria-label="Close concierge"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-cream/70 leading-relaxed">
            Need spatial design advice, modular kitchen planning, or custom furniture quotation?
          </p>

          <div className="space-y-1.5 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setExpanded(false);
                openConsultationModal();
              }}
              className="w-full py-2 px-3 rounded-xl bg-gold hover:bg-luxury-400 text-walnut-dark text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book 3D Design Session</span>
            </button>

            <a
              href={`tel:+${phone}`}
              className="w-full py-1.5 px-3 rounded-xl border border-white/15 text-cream/80 hover:text-cream text-[11px] font-medium flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span>Call: +91 98100 87654</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center space-x-2">
        {!expanded && (
          <div className="hidden sm:block bg-walnut-dark/90 backdrop-blur-md border border-luxury-500/30 text-cream px-3 py-1.5 rounded-full text-xs font-medium shadow-lg animate-bounce pointer-events-none">
            <span className="text-gold font-semibold">Online</span> • Free Consultation
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          aria-label="Open WhatsApp and Design Concierge"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(22,163,74,0.5)] border-2 border-white/30 hover:scale-105 transition-all group"
        >
          {expanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white group-hover:rotate-12 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}

