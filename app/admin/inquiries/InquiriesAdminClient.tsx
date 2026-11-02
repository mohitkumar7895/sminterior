'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Calendar, Calculator, Trash2, Mail, Phone } from 'lucide-react';

interface Props {
  initialInquiries: any[];
  initialConsultations: any[];
  initialQuotations: any[];
}

export default function InquiriesAdminClient({
  initialInquiries,
  initialConsultations,
  initialQuotations,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'consultations' | 'quotations'>('inquiries');

  const [inquiries, setInquiries] = useState(initialInquiries);
  const [consultations, setConsultations] = useState(initialConsultations);
  const [quotations, setQuotations] = useState(initialQuotations);

  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      alert('Error deleting');
    }
  };

  const handleUpdateConsultationStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/consultations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setConsultations((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDeleteConsultation = async (id: number) => {
    if (!confirm('Delete this consultation booking?')) return;
    try {
      await fetch(`/api/consultations/${id}`, { method: 'DELETE' });
      setConsultations((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      alert('Error deleting');
    }
  };

  const handleUpdateQuotationStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/quotations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setQuotations((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleDeleteQuotation = async (id: number) => {
    if (!confirm('Delete this quotation request?')) return;
    try {
      await fetch(`/api/quotations/${id}`, { method: 'DELETE' });
      setQuotations((prev) => prev.filter((q) => q.id !== id));
    } catch (e) {
      alert('Error deleting');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-white/10 space-x-6">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative flex items-center space-x-2 ${
            activeTab === 'inquiries' ? 'text-gold' : 'text-cream/50 hover:text-cream'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Messages ({inquiries.length})</span>
          {activeTab === 'inquiries' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
        </button>

        <button
          onClick={() => setActiveTab('consultations')}
          className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative flex items-center space-x-2 ${
            activeTab === 'consultations' ? 'text-gold' : 'text-cream/50 hover:text-cream'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>3D Consultation Requests ({consultations.length})</span>
          {activeTab === 'consultations' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors relative flex items-center space-x-2 ${
            activeTab === 'quotations' ? 'text-gold' : 'text-cream/50 hover:text-cream'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Quotation BOQ Requests ({quotations.length})</span>
          {activeTab === 'quotations' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />}
        </button>
      </div>

      {/* Tab 1: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="bg-walnut-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {inquiries.length === 0 ? (
            <div className="text-center py-20 text-cream/50 text-xs">No contact inquiries.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-serif text-base font-bold text-cream">{inq.name}</h4>
                      <span className="text-[10px] text-gold uppercase px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                        {inq.service_interested || 'General Inquiry'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-cream/60">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-gold" />
                        <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                      </span>
                      {inq.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-gold" />
                          <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-cream/80 pt-2 leading-relaxed font-light">{inq.message}</p>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <select
                      value={inq.status || 'new'}
                      onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                      className="bg-charcoal border border-white/10 rounded-xl px-3 py-1.5 text-xs text-cream focus:outline-none focus:border-gold"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="p-2 text-red-400 hover:text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Consultations */}
      {activeTab === 'consultations' && (
        <div className="bg-walnut-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {consultations.length === 0 ? (
            <div className="text-center py-20 text-cream/50 text-xs">No consultation bookings.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {consultations.map((c) => (
                <div key={c.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-serif text-base font-bold text-cream">{c.name}</h4>
                      <span className="text-[10px] text-gold uppercase px-2 py-0.5 rounded-full bg-gold/10">
                        {c.property_type || 'Residential'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-cream/60">
                      <span>Phone: <strong className="text-cream">{c.phone}</strong></span>
                      <span>Email: <strong className="text-cream">{c.email}</strong></span>
                      <span>Budget: <strong className="text-gold">{c.estimated_budget || 'Standard'}</strong></span>
                    </div>
                    <div className="text-xs text-cream/70 pt-1">
                      <span>Preferred Slot: <strong className="text-cream">{c.preferred_date || 'Anytime'} ({c.preferred_time || 'Morning'})</strong></span>
                    </div>
                    {c.notes && (
                      <p className="text-xs text-cream/80 pt-1 font-light italic">&ldquo;{c.notes}&rdquo;</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <select
                      value={c.status || 'pending'}
                      onChange={(e) => handleUpdateConsultationStatus(c.id, e.target.value)}
                      className="bg-charcoal border border-white/10 rounded-xl px-3 py-1.5 text-xs text-cream focus:outline-none focus:border-gold"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDeleteConsultation(c.id)}
                      className="p-2 text-red-400 hover:text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Quotations */}
      {activeTab === 'quotations' && (
        <div className="bg-walnut-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {quotations.length === 0 ? (
            <div className="text-center py-20 text-cream/50 text-xs">No quotation requests.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {quotations.map((q) => (
                <div key={q.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-serif text-base font-bold text-cream">{q.name}</h4>
                      <span className="text-[10px] text-gold uppercase px-2 py-0.5 rounded-full bg-gold/10">
                        {q.project_type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-cream/60">
                      <span>Phone: <strong className="text-cream">{q.phone}</strong></span>
                      <span>Email: <strong className="text-cream">{q.email}</strong></span>
                      <span>Area: <strong className="text-cream">{q.area_sqft} Sq.Ft.</strong></span>
                      <span>Budget: <strong className="text-gold">{q.budget_range}</strong></span>
                    </div>
                    {q.requirements && (
                      <p className="text-xs text-cream/80 pt-1 leading-relaxed font-light">{q.requirements}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <select
                      value={q.status || 'pending'}
                      onChange={(e) => handleUpdateQuotationStatus(q.id, e.target.value)}
                      className="bg-charcoal border border-white/10 rounded-xl px-3 py-1.5 text-xs text-cream focus:outline-none focus:border-gold"
                    >
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="quoted">Quoted</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => handleDeleteQuotation(q.id)}
                      className="p-2 text-red-400 hover:text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

