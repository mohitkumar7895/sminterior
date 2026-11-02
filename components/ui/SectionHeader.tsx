import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: 'center' | 'left' | 'right';
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  alignment = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass =
    alignment === 'center'
      ? 'text-center mx-auto'
      : alignment === 'right'
      ? 'text-right ml-auto'
      : 'text-left';

  return (
    <div className={`max-w-3xl mb-6 sm:mb-12 ${alignClass}`}>
      {badge && (
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-luxury-500/30 bg-luxury-500/10 text-gold text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          <span>{badge}</span>
        </div>
      )}

      <h2
        className={`font-serif text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 sm:mb-4 ${
          light ? 'text-cream' : 'text-walnut-dark'
        }`}
      >
        {title}
      </h2>

      {/* Decorative Golden Accent Line */}
      <div
        className={`w-14 sm:w-20 h-0.5 bg-gradient-to-r from-luxury-400 via-gold to-luxury-600 mb-2 sm:mb-4 ${
          alignment === 'center' ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p
          className={`text-xs sm:text-base leading-relaxed ${
            light ? 'text-cream/70' : 'text-walnut/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

