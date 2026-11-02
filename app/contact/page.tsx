'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service_interested: 'Full Home Turnkey Interior',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Failed to submit inquiry.');
      }
    } catch (e) {
      setErrorMsg('Network error. Please call our studio directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-light min-h-screen">
      {/* Hero Header */}
      <section className="py-20 sm:py-28 bg-walnut-dark text-cream relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
            Studio Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Connect With Our Design Studio
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Visit our design atelier in South Extension, New Delhi or schedule an on-site architectural consultation for your residence.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Address (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 shadow-2xl space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                    Atelier Headquarters
                  </span>
                  <h3 className="font-serif text-2xl font-bold">
                    S.M. Sanjna Design Studio
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-cream/80">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cream block">Studio &amp; Showroom:</strong>
                      <span>42 Heritage Grand Boulevard, Near Luxury Promenade, South Extension II, New Delhi 110049</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <strong className="text-cream block">Concierge Desk:</strong>
                      <a href="tel:+919810087654" className="hover:text-gold transition-colors">
                        +91 98100 87654 / +91 11 4567 8900
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <strong className="text-cream block">Direct Email:</strong>
                      <a href="mailto:info@smsanjna.com" className="hover:text-gold transition-colors">
                        info@smsanjna.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cream block">Visiting Hours:</strong>
                      <span>Monday – Saturday: 10:00 AM – 8:00 PM<br />Sunday: By Private Prior Appointment</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                  <a
                    href="https://wa.me/919810087654?text=Hello%20S.M.%20Sanjna%20Interior%20Designer"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-full bg-gold text-walnut-dark font-semibold text-xs uppercase tracking-wider hover:bg-luxury-400 transition-colors flex items-center justify-center space-x-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-cream-light p-8 sm:p-10 rounded-3xl border border-luxury-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                  Send an Inquiry
                </span>
                <h3 className="font-serif text-2xl font-bold text-walnut-dark">
                  Tell Us About Your Project
                </h3>
                <p className="text-xs text-walnut/70 mt-1">
                  Fill out the details below and our design council will reach out to you within 4 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-walnut-dark">Inquiry Dispatched!</h4>
                  <p className="text-xs text-walnut/70 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-walnut-dark">{formData.name}</strong>. Our senior spatial architect will review your project brief and get in touch shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gold text-walnut-dark text-xs font-semibold uppercase tracking-wider hover:bg-luxury-400 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Mr. / Ms. Name"
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Interested Service
                      </label>
                      <select
                        value={formData.service_interested}
                        onChange={(e) => setFormData({ ...formData, service_interested: e.target.value })}
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="Full Home Turnkey Interior">Full Home Turnkey Interior</option>
                        <option value="Luxury Villa Design">Luxury Villa Design</option>
                        <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                        <option value="Living Room Architecture">Living Room Architecture</option>
                        <option value="Bedroom Sanctuary">Bedroom Sanctuary</option>
                        <option value="Custom Furniture Commission">Custom Furniture Commission</option>
                        <option value="Corporate Office Interior">Corporate Office Interior</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. 4BHK DLF Magnolias Renovation / Modular Kitchen Inquiry"
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      Your Message &amp; Space Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share your space dimensions, possession timeline, preferred materials, or questions..."
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-walnut text-cream hover:bg-gold hover:text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Transmitting to Studio...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

