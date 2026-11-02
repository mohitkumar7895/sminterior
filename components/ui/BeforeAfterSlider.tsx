'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { MoveHorizontal, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  category?: string;
  description?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  category = 'Turnkey Transformation',
  description,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percent = (x / rect.width) * 100;
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-walnut-dark border border-luxury-500/30 rounded-3xl overflow-hidden p-6 sm:p-8 text-cream shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-semibold flex items-center space-x-1.5 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>{category}</span>
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">{title}</h3>
          {description && (
            <p className="text-xs text-cream/70 max-w-xl mt-1 leading-relaxed">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-3 text-xs text-cream/70">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cream/40" />
            <span>Before: Shell Stage</span>
          </span>
          <span className="text-gold">↔</span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <span>After: Handover</span>
          </span>
        </div>
      </div>

      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
        onTouchMove={handleTouchMove}
        className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10"
      >
        {/* AFTER Image (Full Background) */}
        <Image
          src={afterImage}
          alt={`${title} - After Transformation`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-walnut-dark/80 backdrop-blur-md text-[11px] font-bold text-gold uppercase tracking-wider border border-gold/40">
          After Handover
        </div>

        {/* BEFORE Image (Clipped Left Side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
            <Image
              src={beforeImage}
              alt={`${title} - Before Transformation`}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-cream/90 uppercase tracking-wider border border-white/20">
            Raw Construction
          </div>
        </div>

        {/* Dividing Vertical Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gold shadow-[0_0_12px_rgba(197,160,89,0.8)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold text-walnut-dark flex items-center justify-center shadow-2xl border-2 border-walnut-dark hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-cream/50 flex items-center justify-center space-x-1">
        <span>Drag the slider left or right to reveal the architectural transformation</span>
      </div>
    </div>
  );
}

