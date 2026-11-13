import React from 'react';

export const VoiceWoodcutMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Authentic 16th-Century Woodcut Acoustic Printer's Mark */}
      <svg
        viewBox="0 0 160 160"
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 overflow-visible text-[#3d1d07]"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          {/* Iron-gall ink stippled texture overlay */}
          <radialGradient id="inkBleedVoice" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#3d1d07" stopOpacity="0.95" />
            <stop offset="90%" stopColor="#5a2c0c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7a3f12" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* 1. Outer Engraved Ring with Stippled Hash Marks */}
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

        {/* 2. Radiating Acoustic Resonance Waves (Sound Arcs) */}
        <g fill="none" stroke="currentColor" strokeLinecap="round" opacity="0.85">
          {/* Left sound waves */}
          <path d="M 52,62 C 45,72 45,88 52,98" strokeWidth="2.2" />
          <path d="M 42,54 C 32,68 32,92 42,106" strokeWidth="1.6" strokeDasharray="3,2" />
          <path d="M 32,46 C 20,64 20,96 32,114" strokeWidth="1.2" />

          {/* Right sound waves */}
          <path d="M 108,62 C 115,72 115,88 108,98" strokeWidth="2.2" />
          <path d="M 118,54 C 128,68 128,92 118,106" strokeWidth="1.6" strokeDasharray="3,2" />
          <path d="M 128,46 C 140,64 140,96 128,114" strokeWidth="1.2" />
        </g>

        {/* 3. Central Woodblock Sound / Voice Vessel Emblem */}
        {/* Heraldic Acoustic Vessel & Voice Glyph */}
        <g fill="currentColor" opacity="0.92">
          {/* Central Microphone / Resonance Capsule */}
          <rect x="73" y="52" width="14" height="26" rx="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          {/* Inner ink shading lines (Classical cross-hatching) */}
          <line x1="75" y1="60" x2="85" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="75" y1="65" x2="85" y2="65" stroke="currentColor" strokeWidth="1" />
          <line x1="75" y1="70" x2="85" y2="70" stroke="currentColor" strokeWidth="1" />

          {/* Acoustic Cradle Bar */}
          <path
            d="M 66,66 C 66,82 94,82 94,66"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Base Stem & Pedestal */}
          <line x1="80" y1="82" x2="80" y2="98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 70,98 L 90,98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 66,102 L 94,102" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Top Celestial Star / Illumination Mark */}
        <g fill="currentColor" opacity="0.85">
          <polygon points="80,36 82,42 88,44 82,46 80,52 78,46 72,44 78,42" />
        </g>

        {/* Classical Engraver's Hatching underneath the mark */}
        <g stroke="currentColor" strokeWidth="0.8" opacity="0.45">
          <line x1="60" y1="112" x2="100" y2="112" />
          <line x1="65" y1="115" x2="95" y2="115" />
          <line x1="72" y1="118" x2="88" y2="118" />
        </g>
      </svg>

      {/* Classical Woodcut Plate Inscription */}
      <span className="font-cinzel text-[8.5px] sm:text-[9.5px] text-[#542a0b] tracking-[0.26em] uppercase font-bold mt-1 opacity-80">
        &bull; VOX REGIA &bull;
      </span>
    </div>
  );
};
