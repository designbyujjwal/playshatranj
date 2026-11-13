import React from 'react';

export const HandWoodcutMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Authentic 16th-Century Woodcut Anatomical Palmistry Printer's Mark */}
      <svg
        viewBox="0 0 160 160"
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 overflow-visible text-[#3d1d07]"
        style={{ mixBlendMode: 'multiply' }}
      >
        {/* 1. Outer Engraved Ring with Astrological & Compass Marks */}
        <circle
          cx="80"
          cy="80"
          r="68"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="4,2.5,8,2.5"
          opacity="0.85"
        />
        <circle
          cx="80"
          cy="80"
          r="62"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Four Cardinal Compass Fleuron Marks (N, S, E, W) */}
        <g stroke="currentColor" strokeWidth="1.2" opacity="0.8">
          <line x1="80" y1="10" x2="80" y2="18" />
          <line x1="80" y1="142" x2="80" y2="150" />
          <line x1="10" y1="80" x2="18" y2="80" />
          <line x1="142" y1="80" x2="150" y2="80" />
          <circle cx="80" cy="14" r="1.5" fill="currentColor" />
          <circle cx="80" cy="146" r="1.5" fill="currentColor" />
          <circle cx="14" cy="80" r="1.5" fill="currentColor" />
          <circle cx="146" cy="80" r="1.5" fill="currentColor" />
        </g>

        {/* 2. Ethereal Spatial Tracking Rays (Radiating from fingertips) */}
        <g stroke="currentColor" strokeWidth="1" strokeDasharray="2,3" opacity="0.6">
          <line x1="62" y1="48" x2="48" y2="34" />
          <line x1="74" y1="42" x2="74" y2="24" />
          <line x1="86" y1="44" x2="94" y2="28" />
          <line x1="97" y1="52" x2="114" y2="38" />
          <line x1="50" y1="76" x2="34" y2="72" />
        </g>

        {/* 3. Central Woodblock Classical Anatomical Hand Illustration */}
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
          {/* Main Hand Silhouette with Woodcut Contour */}
          <path
            d="
              M 65,114 
              L 65,96 
              C 62,94 56,88 52,82 
              C 48,76 52,70 56,72 
              C 60,74 65,80 67,82 
              L 67,54 
              C 67,49 73,49 73,54 
              L 73,76 
              L 75,46 
              C 75,41 81,41 81,46 
              L 81,76 
              L 83,48 
              C 83,43 89,43 89,48 
              L 89,78 
              L 91,56 
              C 91,51 97,51 97,56 
              L 97,88 
              C 97,100 92,110 88,114 
              Z
            "
            strokeWidth="2.2"
          />

          {/* Palm Creases & Astrological Palmistry Lines */}
          <path d="M 64,88 Q 76,96 92,90" strokeWidth="1.2" opacity="0.75" />
          <path d="M 68,96 Q 78,104 86,108" strokeWidth="1" opacity="0.6" />
          <path d="M 72,78 Q 78,86 86,88" strokeWidth="1" opacity="0.6" />

          {/* Knuckle & Joint Hash Marks */}
          <line x1="68" y1="62" x2="72" y2="62" strokeWidth="1" opacity="0.7" />
          <line x1="76" y1="56" x2="80" y2="56" strokeWidth="1" opacity="0.7" />
          <line x1="84" y1="58" x2="88" y2="58" strokeWidth="1" opacity="0.7" />
          <line x1="92" y1="66" x2="96" y2="66" strokeWidth="1" opacity="0.7" />
        </g>

        {/* Central Guiding Star in Palm (Representing Spatial Anchor) */}
        <g fill="currentColor" opacity="0.85">
          <polygon points="80,91 81.5,95 86,96 82,98 83,103 80,99.5 77,103 78,98 74,96 78.5,95" />
        </g>

        {/* Classical Engraver's Hatching underneath the mark */}
        <g stroke="currentColor" strokeWidth="0.8" opacity="0.45">
          <line x1="60" y1="120" x2="100" y2="120" />
          <line x1="65" y1="123" x2="95" y2="123" />
          <line x1="72" y1="126" x2="88" y2="126" />
        </g>
      </svg>

      {/* Classical Woodcut Plate Inscription */}
      <span className="font-cinzel text-[8.5px] sm:text-[9.5px] text-[#542a0b] tracking-[0.26em] uppercase font-bold mt-1 opacity-80">
        &bull; MANVS ARTIFEX &bull;
      </span>
    </div>
  );
};
