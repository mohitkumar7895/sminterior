'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Phone, Mail, User, Home, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { openWhatsAppLead, WHATSAPP_PHONE, DISPLAY_PHONE } from '@/lib/whatsapp';

export default function ConsultationModal() {
  const { isConsultationModalOpen, closeConsultationModal, preselectedService } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '',
    property_type: '',
    room_type: preselectedService || '',
    estimated_budget: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastWaText, setLastWaText] = useState('');

  if (!isConsultationModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const waText = `✨ *New 3D Design Consultation Request*

👤 *Name:* ${formData.name}
📞 *Phone / WhatsApp:* ${formData.phone}
✉️ *Email:* ${formData.email || 'N/A'}
🏡 *Property / Project:* ${formData.property_type || 'N/A'}
💰 *Estimated Budget:* ${formData.estimated_budget || 'N/A'}
📅 *Preferred Date:* ${formData.preferred_date || 'N/A'}
⏰ *Preferred Time:* ${formData.preferred_time || 'N/A'}
📝 *Client Notes:* ${formData.notes || 'None'}

---
*Studio:* S.M. Sanjna Interior Designer`;

    setLastWaText(waText);

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        // Automatically open WhatsApp with lead details to 9045449196
        openWhatsAppLead(waText);
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Something went wrong. Please check your information.');
      }
    } catch (e) {
      setErrorMsg('Failed to connect to the studio server. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-walnut-dark border border-luxury-500/30 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-cream relative">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-walnut-dark to-charcoal border-b border-luxury-500/20 flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary 3D Consultation</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-cream">
              Book Your Private Design Session
            </h3>
            <p className="text-[11px] sm:text-xs text-cream/70 mt-0.5 sm:mt-1">
              Meet our senior spatial architects for a 1-on-1 lifestyle mapping session.
            </p>
          </div>
          <button
            onClick={() => {
              setSuccess(false);
              closeConsultationModal();
            }}
            className="p-1.5 rounded-full text-cream/60 hover:text-gold hover:bg-white/5 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-cream">
                Consultation Requested!
              </h4>
              <p className="text-xs text-cream/70 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-gold">{formData.name}</strong>. Your consultation details have been recorded and dispatched to WhatsApp <strong className="text-gold">+{WHATSAPP_PHONE}</strong>. Our lead spatial designer will connect with you shortly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lastWaText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp ({DISPLAY_PHONE})</span>
                </a>
                <button
                  onClick={() => {
                    setSuccess(false);
                    closeConsultationModal();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gold text-walnut-dark font-semibold text-xs tracking-wider uppercase hover:bg-luxury-400 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gold absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gold absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 90454 49196"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-gold absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 mb-1">
                    Property / Project Type
                  </label>
                  <input
                    type="text"
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    placeholder="e.g. 3BHK, Villa, Modular Kitchen, Office"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-cream/70 mb-1">
                    Estimated Budget / Scope
                  </label>
                  <input
                    type="text"
                    value={formData.estimated_budget}
                    onChange={(e) => setFormData({ ...formData, estimated_budget: e.target.value })}
                    placeholder="e.g. ₹15 Lakhs, ₹25-40 Lakhs, Open"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/70 mb-1">
                  Preferred Date &amp; Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    value={formData.preferred_time}
                    onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                    placeholder="e.g. Morning 11 AM, Weekend"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your space, dimensions, or design ideas..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Confirm Free 3D Consultation'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

