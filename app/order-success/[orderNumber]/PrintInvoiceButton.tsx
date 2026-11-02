'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintInvoiceButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="px-6 py-3.5 rounded-full border border-luxury-300 bg-white hover:bg-cream text-walnut-dark font-semibold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2 shadow-sm"
    >
      <Printer className="w-4 h-4 text-gold" />
      <span>Print Official Tax Invoice</span>
    </button>
  );
}

