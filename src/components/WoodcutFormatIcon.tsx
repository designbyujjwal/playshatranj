import React from 'react';

interface WoodcutFormatIconProps {
  type: 'ai' | 'duel' | 'courier';
  className?: string;
}

export const WoodcutFormatIcon: React.FC<WoodcutFormatIconProps> = ({ type, className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="w-12 h-12 sm:w-14 sm:h-14 overflow-visible text-[#3d1d07]"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          <radialGradient id={`inkBleed-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#3d1d07" stopOpacity="0.95" />
            <stop offset="90%" stopColor="#5a2c0c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7a3f12" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* 1. Outer Engraved Ring with Stippled Hash Marks (16th Century Woodcut Style) */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="3,2,6,2"
          opacity="0.85"
        />
        <circle
          cx="60"
          cy="60"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.6"
        />

        {/* Four Cardinal Compass Fleuron Marks (N, S, E, W) */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.8">
          <line x1="60" y1="5" x2="60" y2="11" />
          <line x1="60" y1="109" x2="60" y2="115" />
          <line x1="5" y1="60" x2="11" y2="60" />
          <line x1="109" y1="60" x2="115" y2="60" />
          <circle cx="60" cy="8" r="1.2" fill="currentColor" />
          <circle cx="60" cy="112" r="1.2" fill="currentColor" />
          <circle cx="8" cy="60" r="1.2" fill="currentColor" />
          <circle cx="112" cy="60" r="1.2" fill="currentColor" />
        </g>

        {/* 2. ICON TYPE SPECIFIC WOODCUT ARTWORK */}
        {type === 'ai' && (
          /* The Automaton Clockwork Maester */
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Clockwork gear wheel teeth */}
            <circle cx="60" cy="60" r="28" strokeWidth="1.6" opacity="0.9" />
            <circle cx="60" cy="60" r="16" strokeWidth="1.2" opacity="0.85" />
            <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.9" />

            {/* Gear cogs */}
            <path
              d="
                M 60,30 L 60,25 M 60,90 L 60,95 
                M 30,60 L 25,60 M 90,60 L 95,60
                M 39,39 L 35,35 M 81,81 L 85,85
                M 81,39 L 85,35 M 39,81 L 35,85
              "
              strokeWidth="2.2"
              opacity="0.8"
            />

            {/* Mechanical Chess Automaton Crown / Antennae */}
            <path
              d="M 44,48 L 50,38 L 60,44 L 70,38 L 76,48"
              strokeWidth="1.3"
              opacity="0.85"
            />
            <circle cx="50" cy="36" r="1.5" fill="currentColor" />
            <circle cx="60" cy="42" r="1.5" fill="currentColor" />
            <circle cx="70" cy="36" r="1.5" fill="currentColor" />

            {/* Subtle mechanical calculation rays */}
            <g strokeWidth="0.8" opacity="0.5" strokeDasharray="2,2">
              <line x1="42" y1="60" x2="26" y2="60" />
              <line x1="78" y1="60" x2="94" y2="60" />
              <line x1="60" y1="42" x2="60" y2="26" />
              <line x1="60" y1="78" x2="60" y2="94" />
            </g>
          </g>
        )}

        {type === 'duel' && (
          /* Council Duel: Crossed Antique Broadswords & Knight's Shield */
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Sword 1: Top-Left to Bottom-Right */}
            <line x1="32" y1="32" x2="88" y2="88" strokeWidth="2.2" opacity="0.9" />
            {/* Crossguard */}
            <line x1="42" y1="30" x2="30" y2="42" strokeWidth="2.5" opacity="0.85" />
            {/* Pommel */}
            <circle cx="28" cy="28" r="2.5" fill="currentColor" opacity="0.9" />

            {/* Sword 2: Top-Right to Bottom-Left */}
            <line x1="88" y1="32" x2="32" y2="88" strokeWidth="2.2" opacity="0.9" />
            {/* Crossguard */}
            <line x1="78" y1="30" x2="90" y2="42" strokeWidth="2.5" opacity="0.85" />
            {/* Pommel */}
            <circle cx="92" cy="28" r="2.5" fill="currentColor" opacity="0.9" />

            {/* Central Heraldic Heater Shield */}
            <path
              d="M 48,50 L 72,50 C 72,66 60,78 60,82 C 60,78 48,66 48,50 Z"
              fill="#f5e8d0"
              strokeWidth="1.6"
              opacity="0.95"
            />
            {/* Shield emblem: Chess cross */}
            <line x1="60" y1="53" x2="60" y2="73" strokeWidth="1.2" opacity="0.85" />
            <line x1="53" y1="60" x2="67" y2="60" strokeWidth="1.2" opacity="0.85" />
          </g>
        )}

        {type === 'courier' && (
          /* Imperial Courier: Royal Sealed Scroll & Heraldic Eagle Wings */
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Unfurled Parchment Scroll Body */}
            <path
              d="
                M 42,40 C 42,34 50,34 50,38 L 78,38 C 78,34 86,34 86,40
                L 86,74 C 86,80 78,80 78,76 L 50,76 C 50,80 42,80 42,74 Z
              "
              fill="#f5e8d0"
              strokeWidth="1.5"
              opacity="0.95"
            />
            {/* Scroll roll ends */}
            <ellipse cx="44" cy="40" rx="3" ry="5" strokeWidth="1.2" />
            <ellipse cx="84" cy="74" rx="3" ry="5" strokeWidth="1.2" />

            {/* Inscribed text lines on scroll */}
            <line x1="52" y1="46" x2="74" y2="46" strokeWidth="1" opacity="0.6" strokeDasharray="3,2" />
            <line x1="52" y1="52" x2="70" y2="52" strokeWidth="1" opacity="0.6" strokeDasharray="3,2" />
            <line x1="52" y1="58" x2="74" y2="58" strokeWidth="1" opacity="0.6" strokeDasharray="3,2" />

            {/* Imperial Wax Seal Stamp */}
            <circle cx="64" cy="65" r="7" fill="#8b1e25" stroke="#4a0f13" strokeWidth="1.2" opacity="0.9" />
            {/* Wax seal ribbon tails */}
            <path d="M 61,72 L 58,82 L 62,80 L 64,84 L 66,72" fill="#8b1e25" opacity="0.9" />
            <circle cx="64" cy="65" r="3.5" fill="none" stroke="#f5e8d0" strokeWidth="0.8" opacity="0.85" />
          </g>
        )}
      </svg>
    </div>
  );
};
