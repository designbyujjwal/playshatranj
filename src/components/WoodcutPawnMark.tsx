import React from 'react';

interface WoodcutPawnMarkProps {
  color: 'w' | 'b';
  className?: string;
}

export const WoodcutPawnMark: React.FC<WoodcutPawnMarkProps> = ({ color, className = '' }) => {
  const isWhite = color === 'w';

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 120"
        className="w-16 h-20 sm:w-20 sm:h-24 overflow-visible"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          {/* Subtle woodcut ink drop shadow on paper */}
          <filter id={`pawnShadow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="1" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* White pawn ivory gradient */}
          <linearGradient id="whitePawnIvory" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="60%" stopColor="#f4ebdb" />
            <stop offset="100%" stopColor="#e3d3bd" />
          </linearGradient>

          {/* Black pawn obsidian gradient */}
          <linearGradient id="blackPawnObsidian" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#322217" />
            <stop offset="40%" stopColor="#1e1109" />
            <stop offset="100%" stopColor="#0f0703" />
          </linearGradient>

          {/* Woodcut hatching pattern */}
          <pattern id="woodHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="#4a260c" strokeWidth="0.6" opacity="0.3" />
          </pattern>
        </defs>

        {/* 1. Ground Contact Shadow & Pedestal Dais Ring */}
        <ellipse cx="50" cy="110" rx="34" ry="6" fill="#2d1708" opacity="0.18" filter="blur(2px)" />
        <ellipse cx="50" cy="108" rx="28" ry="4" fill="#3d1d07" opacity="0.25" />

        {isWhite ? (
          /* =================== 2D WHITE STAUNTON PAWN =================== */
          <g filter="url(#pawnShadow-w)">
            {/* Base Tier 1 (Lowest broad disc) */}
            <path
              d="M 22,106 C 22,102 34,99 50,99 C 66,99 78,102 78,106 C 78,108 66,110 50,110 C 34,110 22,108 22,106 Z"
              fill="url(#whitePawnIvory)"
              stroke="#4a250a"
              strokeWidth="1.8"
            />
            {/* Base rim gold bead */}
            <path
              d="M 26,101 C 26,98 36,96 50,96 C 64,96 74,98 74,101 C 74,103 64,105 50,105 C 36,105 26,103 26,101 Z"
              fill="#f8ecd5"
              stroke="#6b3a12"
              strokeWidth="1.2"
            />

            {/* Base Tier 2 (Stepped riser) */}
            <path
              d="M 32,96 C 32,92 40,89 50,89 C 60,89 68,92 68,96 C 68,98 60,100 50,100 C 40,100 32,98 32,96 Z"
              fill="url(#whitePawnIvory)"
              stroke="#4a250a"
              strokeWidth="1.6"
            />

            {/* Concave Stem Waist */}
            <path
              d="
                M 36,92 
                C 38,82 42,66 42,54 
                C 42,52 46,50 50,50 
                C 54,50 58,52 58,54 
                C 58,66 62,82 64,92 
                Z
              "
              fill="url(#whitePawnIvory)"
              stroke="#4a250a"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Stem woodcut shaded ribs (right-side hatching) */}
            <path
              d="M 50,52 C 55,64 57,78 62,91 L 64,91 C 60,78 57,64 53,52 Z"
              fill="url(#woodHatch)"
            />

            {/* Collar Ring / Neck Ring */}
            <ellipse
              cx="50"
              cy="52"
              rx="15"
              ry="4"
              fill="#eed7b3"
              stroke="#4a250a"
              strokeWidth="1.6"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="12"
              ry="3"
              fill="url(#whitePawnIvory)"
              stroke="#6b3a12"
              strokeWidth="1.2"
            />

            {/* Spherical Head (Pawn Ball) */}
            <circle
              cx="50"
              cy="34"
              r="17"
              fill="url(#whitePawnIvory)"
              stroke="#4a250a"
              strokeWidth="2"
            />

            {/* Spherical specular highlight & woodcut engraving shade */}
            <ellipse cx="44" cy="28" rx="6" ry="4" fill="#ffffff" opacity="0.8" />
            <path
              d="M 52,20 C 62,24 66,36 63,46 C 61,42 59,32 52,26 Z"
              fill="#cbb393"
              opacity="0.5"
            />
            {/* Top crown pip */}
            <circle cx="50" cy="16" r="2" fill="#5a2d0c" />
          </g>
        ) : (
          /* =================== 2D BLACK STAUNTON PAWN =================== */
          <g filter="url(#pawnShadow-b)">
            {/* Base Tier 1 (Lowest broad disc) */}
            <path
              d="M 22,106 C 22,102 34,99 50,99 C 66,99 78,102 78,106 C 78,108 66,110 50,110 C 34,110 22,108 22,106 Z"
              fill="url(#blackPawnObsidian)"
              stroke="#0f0703"
              strokeWidth="2"
            />
            {/* Gold rim accent line on base */}
            <path
              d="M 26,101 C 26,98 36,96 50,96 C 64,96 74,98 74,101 C 74,103 64,105 50,105 C 36,105 26,103 26,101 Z"
              fill="#22140c"
              stroke="#7a461b"
              strokeWidth="1.2"
            />

            {/* Base Tier 2 (Stepped riser) */}
            <path
              d="M 32,96 C 32,92 40,89 50,89 C 60,89 68,92 68,96 C 68,98 60,100 50,100 C 40,100 32,98 32,96 Z"
              fill="url(#blackPawnObsidian)"
              stroke="#0f0703"
              strokeWidth="1.8"
            />

            {/* Concave Stem Waist */}
            <path
              d="
                M 36,92 
                C 38,82 42,66 42,54 
                C 42,52 46,50 50,50 
                C 54,50 58,52 58,54 
                C 58,66 62,82 64,92 
                Z
              "
              fill="url(#blackPawnObsidian)"
              stroke="#0f0703"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Left rim light / specular reflection on obsidian stem */}
            <path
              d="M 39,90 C 41,80 43,65 44,55"
              stroke="#8a613d"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Collar Ring / Neck Ring */}
            <ellipse
              cx="50"
              cy="52"
              rx="15"
              ry="4"
              fill="#24150c"
              stroke="#0f0703"
              strokeWidth="1.8"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="12"
              ry="3"
              fill="url(#blackPawnObsidian)"
              stroke="#8a5323"
              strokeWidth="1"
            />

            {/* Spherical Head (Pawn Ball) */}
            <circle
              cx="50"
              cy="34"
              r="17"
              fill="url(#blackPawnObsidian)"
              stroke="#0f0703"
              strokeWidth="2.2"
            />

            {/* Left crisp specular rim light reflection */}
            <path
              d="M 37,27 C 35,32 36,40 40,46"
              stroke="#ab825c"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.8"
            />
            <ellipse cx="43" cy="27" rx="4" ry="2.5" fill="#f1dbbf" opacity="0.4" />

            {/* Top crown pip */}
            <circle cx="50" cy="16" r="2" fill="#c79b54" />
          </g>
        )}
      </svg>
    </div>
  );
};
