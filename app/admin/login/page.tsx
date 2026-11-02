'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@smsanjna.com');
  const [password, setPassword] = useState('admin123');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Invalid administrator credentials');
      }
    } catch (err) {
      setErrorMsg('Failed to communicate with authentication server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center p-4 selection:bg-gold selection:text-walnut-dark">
      <div className="w-full max-w-md bg-walnut-dark border border-luxury-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto text-gold mb-3 bg-charcoal">
            <span className="font-serif text-lg font-bold">SM</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
            Executive Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
            Atelier Management
          </h1>
          <p className="text-xs text-cream/60">
            Sign in with administrative privileges to manage products, orders, and content.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smsanjna.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cream/70 font-semibold mb-1">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-cream focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-cream/60 space-y-1">
            <p><strong>Demo Admin Credentials:</strong></p>
            <p>Email: <span className="text-gold">admin@smsanjna.com</span></p>
            <p>Password: <span className="text-gold">admin123</span></p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-gold hover:bg-luxury-400 text-walnut-dark font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-cream/50 hover:text-gold transition-colors">
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}

