'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, ShieldCheck, Clock, Send } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function GetQuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'Full Home Turnkey Interior',
    area_sqft: 2000,
    budget_range: '₹20 Lakhs - ₹35 Lakhs',
    scope: ['Modular Kitchen', 'Wardrobes', 'False Ceiling & Lighting', 'Custom Furniture'],
    requirements: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleScopeToggle = (item: string) => {
    setFormData((prev) => {
      const exists = prev.scope.includes(item);
      if (exists) {
        return { ...prev, scope: prev.scope.filter((s) => s !== item) };
      }
      return { ...prev, scope: [...prev.scope, item] };
    });
  };

  const calculateEstimate = () => {
    // Basic rate benchmark: ₹1,500 - ₹2,500 per sq.ft. for turnkey luxury
    const min = formData.area_sqft * 1600;
    const max = formData.area_sqft * 2600;
    return { min, max };
  };

  const estimate = calculateEstimate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requirements: `Scope: ${formData.scope.join(', ')} | Details: ${formData.requirements}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Error submitting quote request.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please call concierge directly.');
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
            Transparent BOQ Pricing
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream">
            Request an Itemized Quotation
          </h1>
          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Configure your carpet area and room requirements to receive a preliminary cost estimate and schedule your on-site laser survey.
          </p>
        </div>
      </section>

      {/* Calculator & Form */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-cream-light p-5 sm:p-10 rounded-3xl border border-luxury-200 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                  Step 1 of 2
                </span>
                <h3 className="font-serif text-2xl font-bold text-walnut-dark">
                  Define Your Project Scope
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-walnut-dark">
                    Quotation Request Received!
                  </h4>
                  <p className="text-xs text-walnut/70 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-walnut-dark">{formData.name}</strong>. Our chief estimating architect will compile your comprehensive Bill of Quantities (BOQ) and contact you at <strong className="text-walnut-dark">{formData.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gold text-walnut-dark text-xs font-semibold uppercase tracking-wider hover:bg-luxury-400 transition-colors"
                  >
                    Submit Another Project
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Project Type *
                      </label>
                      <select
                        value={formData.project_type}
                        onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2.5 text-xs text-walnut-dark focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="Full Home Turnkey Interior">Full Home Turnkey Interior</option>
                        <option value="Luxury Villa Renovation">Luxury Villa Renovation</option>
                        <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                        <option value="Living Room & Dining">Living Room & Dining</option>
                        <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                        <option value="Corporate Office Fit-Out">Corporate Office Fit-Out</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Carpet Area (Sq.Ft.): {formData.area_sqft.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="100"
                        value={formData.area_sqft}
                        onChange={(e) => setFormData({ ...formData, area_sqft: Number(e.target.value) })}
                        className="w-full accent-gold cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-walnut/50 mt-1">
                        <span>500 sq.ft.</span>
                        <span>5,000 sq.ft.</span>
                        <span>10,000+ sq.ft.</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-2">
                      Select Scope of Work
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Modular Kitchen',
                        'Wardrobes',
                        'False Ceiling & Lighting',
                        'Custom Furniture',
                        'Civil & Flooring',
                        'Paint & Wall Textures',
                      ].map((item) => {
                        const checked = formData.scope.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => handleScopeToggle(item)}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                              checked
                                ? 'bg-walnut text-gold border-gold'
                                : 'bg-white text-walnut/70 border-luxury-200'
                            }`}
                          >
                            <span>{item}</span>
                            {checked && <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
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
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        WhatsApp Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full bg-white border border-luxury-200 rounded-xl px-3 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-walnut-dark font-medium mb-1">
                      Specific Notes / Floorplan Links
                    </label>
                    <textarea
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Share your possession date, city location, or any specific brand preferences..."
                      className="w-full bg-white border border-luxury-200 rounded-xl px-3.5 py-2 text-xs text-walnut-dark focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Generating Estimate...' : 'Request Detailed BOQ Quotation'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Live Estimate Card (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-walnut-dark text-cream border border-luxury-500/30 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block mb-1">
                  Live Estimate Benchmark
                </span>
                <h3 className="font-serif text-2xl font-bold">
                  Estimated Investment Band
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] text-cream/60 block">Turnkey Architecture Range:</span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                  ₹{(estimate.min / 100000).toFixed(1)} Lakhs – ₹{(estimate.max / 100000).toFixed(1)} Lakhs
                </div>
                <span className="text-[10px] text-cream/50 block">
                  Based on ~₹1,600 – ₹2,600/sq.ft. for premium BWP Marine Ply, Blum motion, and Italian finishes.
                </span>
              </div>

              <div className="space-y-3 text-xs text-cream/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Includes 4K 3D Photorealistic VR Simulations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Includes Factory Direct Joinery &amp; Marine Ply Carcase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Includes Dedicated Site Engineer with Weekly Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>10-Year Water-Resistance &amp; Structural Warranty</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold">
                💡 <strong>Early Booking Benefit:</strong> Full-home turnkey projects finalized this month receive a complimentary ₹10,000 decor voucher.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

