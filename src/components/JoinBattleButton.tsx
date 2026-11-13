import React from 'react';

export interface JoinBattleButtonProps {
  id?: string;
  label?: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const JoinBattleButton: React.FC<JoinBattleButtonProps> = ({
  id = 'join-battle-btn',
  label = 'JOIN BATTLE',
  type = 'button',
  onClick,
  className = '',
  disabled = false,
}) => {
  const textStr = label.trim();
  const len = textStr.length;

  // Compute optical font size, letter spacing and bounded length
  // Safe internal area between framing diamonds (x=38 to x=272) is ~234 units
  let fontSize = 15.5;
  let letterSpacing = '0.22em';
  let textLength: number | undefined = undefined;

  if (len > 24) {
    fontSize = 10;
    letterSpacing = '0.07em';
    textLength = 224;
  } else if (len > 18) {
    fontSize = 11.5;
    letterSpacing = '0.11em';
    textLength = 226;
  } else if (len > 13) {
    fontSize = 13.5;
    letterSpacing = '0.16em';
    textLength = 230;
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.985] ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      aria-label={label}
    >
      {/* Soft crimson ambient backlight glow on hover */}
      <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none filter blur-md bg-gradient-to-r from-transparent via-red-600/35 to-transparent" />

      {/* Balanced compact SVG matching the reference geometric frame in red with royal patterns */}
      <svg
        viewBox="0 0 310 62"
        className="w-full h-auto block filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_4px_18px_rgba(200,30,30,0.35)] transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Text Drop Shadow */}
          <filter id="ref-text-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.4" stdDeviation="1.0" floodColor="#0d0101" floodOpacity="0.95" />
          </filter>

          {/* Antique Gold Framing Gradient - Refined Muted Brass / Bronze */}
          <linearGradient id="ref-gold-outer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a5725" />
            <stop offset="20%" stopColor="#aa8649" />
            <stop offset="50%" stopColor="#c7a464" />
            <stop offset="80%" stopColor="#a38043" />
            <stop offset="100%" stopColor="#7a5725" />
          </linearGradient>

          {/* Subtle Golden Top Rail Gradient */}
          <linearGradient id="ref-gold-rail-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbb07a" />
            <stop offset="35%" stopColor="#ad8b4f" />
            <stop offset="70%" stopColor="#87652e" />
            <stop offset="100%" stopColor="#543c16" />
          </linearGradient>

          {/* Subtle Golden Bottom Rail Gradient */}
          <linearGradient id="ref-gold-rail-bot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#543c16" />
            <stop offset="30%" stopColor="#87652e" />
            <stop offset="65%" stopColor="#ad8b4f" />
            <stop offset="100%" stopColor="#cbb07a" />
          </linearGradient>

          {/* Inner Gold Wire Gradient */}
          <linearGradient id="ref-gold-inner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c5a56b" />
            <stop offset="50%" stopColor="#967439" />
            <stop offset="100%" stopColor="#63471c" />
          </linearGradient>

          {/* Deep Royal Red Field Gradient */}
          <linearGradient id="ref-red-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#220404" />
            <stop offset="20%" stopColor="#3d0707" />
            <stop offset="50%" stopColor="#540b0b" />
            <stop offset="80%" stopColor="#380606" />
            <stop offset="100%" stopColor="#1a0202" />
          </linearGradient>

          {/* Horizontal Center Radial Flare in the Red Field */}
          <radialGradient id="ref-red-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#871212" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#590909" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2b0303" stopOpacity="0" />
          </radialGradient>

          {/* Top-half Glass Gloss Highlight */}
          <linearGradient id="ref-red-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Warm Ivory Platinum Serif Text */}
          <linearGradient id="ref-ivory-text" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#faf3e6" />
            <stop offset="100%" stopColor="#ded1be" />
          </linearGradient>

          {/* Royal Damask & Interlocking Geometric Arabesque Pattern */}
          <pattern id="ref-royal-damask" width="20" height="20" patternUnits="userSpaceOnUse">
            {/* Diamond outer grid */}
            <path
              d="M 10,0 L 20,10 L 10,20 L 0,10 Z"
              fill="none"
              stroke="#f0a5a5"
              strokeWidth="0.5"
              strokeOpacity="0.14"
            />
            {/* Inner nested diamond */}
            <path
              d="M 10,3.5 L 16.5,10 L 10,16.5 L 3.5,10 Z"
              fill="none"
              stroke="#ffd1a4"
              strokeWidth="0.35"
              strokeOpacity="0.10"
            />
            {/* Center rosette cross motif */}
            <path
              d="M 10,6.5 Q 11.8,8.2 13.5,10 Q 11.8,11.8 10,13.5 Q 8.2,11.8 6.5,10 Q 8.2,8.2 10,6.5 Z"
              fill="#ffa3a3"
              fillOpacity="0.08"
            />
            <circle cx="10" cy="10" r="0.9" fill="#ffe2b8" fillOpacity="0.22" />
            {/* Corner florets */}
            <circle cx="0" cy="0" r="0.8" fill="#ffb0b0" fillOpacity="0.18" />
            <circle cx="20" cy="0" r="0.8" fill="#ffb0b0" fillOpacity="0.18" />
            <circle cx="0" cy="20" r="0.8" fill="#ffb0b0" fillOpacity="0.18" />
            <circle cx="20" cy="20" r="0.8" fill="#ffb0b0" fillOpacity="0.18" />
          </pattern>
        </defs>

        {/* =================================================================
            1. MAIN RED PANEL BACKGROUND (HEXAGON WITH CHEVRON TIPS)
           ================================================================= */}
        {/* Dark base floor to maintain crisp contrast with text when red is at lower opacity */}
        <polygon
          points="12,31 27,9 283,9 298,31 283,53 27,53"
          fill="#0c0202"
          fillOpacity="0.85"
        />

        {/* Red color and pattern panel: rich vivid royal crimson matching landing page */}
        <g
          id="ref-red-panel"
          className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        >
          {/* Solid deep red base following the chevron boundary */}
          <polygon
            points="12,31 27,9 283,9 298,31 283,53 27,53"
            fill="url(#ref-red-base)"
          />

          {/* Central ambient red radiance */}
          <polygon
            points="12,31 27,9 283,9 298,31 283,53 27,53"
            fill="url(#ref-red-glow)"
          />

          {/* Seamless royal pattern overlay */}
          <polygon
            points="12,31 27,9 283,9 298,31 283,53 27,53"
            fill="url(#ref-royal-damask)"
          />

          {/* Top-half subtle glass sheen */}
          <polygon
            points="12,31 27,9 283,9 298,31 283,31 27,31"
            fill="url(#ref-red-gloss)"
          />
        </g>

        {/* =================================================================
            2. INTERLOCKING GEOMETRIC GOLD BORDERS (SUBTLE ANTIQUE BRASS)
           ================================================================= */}
        <g id="ref-gold-framework" className="opacity-95 group-hover:opacity-100 transition-opacity duration-300">
          {/* --- Subtle Golden Top and Bottom Rails --- */}
          {/* Top Golden Border Rail */}
          <rect
            x="24"
            y="8"
            width="262"
            height="2.2"
            rx="0.5"
            fill="url(#ref-gold-rail-top)"
          />
          {/* Top soft warm highlight */}
          <line x1="24" y1="8" x2="286" y2="8" stroke="#dfc896" strokeWidth="0.5" opacity="0.4" />

          {/* Bottom Golden Border Rail */}
          <rect
            x="24"
            y="51.8"
            width="262"
            height="2.2"
            rx="0.5"
            fill="url(#ref-gold-rail-bot)"
          />
          {/* Bottom soft warm highlight */}
          <line x1="24" y1="54" x2="286" y2="54" stroke="#dfc896" strokeWidth="0.5" opacity="0.4" />

          {/* Left vertical outer frame edge */}
          <line x1="27" y1="6" x2="27" y2="56" stroke="url(#ref-gold-outer)" strokeWidth="1.3" />
          {/* Right vertical outer frame edge */}
          <line x1="283" y1="6" x2="283" y2="56" stroke="url(#ref-gold-outer)" strokeWidth="1.3" />

          {/* --- Outer Chevron Points (Extending Left & Right) --- */}
          <polyline
            points="27,9 12,31 27,53"
            fill="none"
            stroke="url(#ref-gold-outer)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <polyline
            points="283,9 298,31 283,53"
            fill="none"
            stroke="url(#ref-gold-outer)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          {/* --- Inner Parallel Gold Border (~3.5px inset) --- */}
          {/* Top inner line */}
          <line x1="32" y1="13" x2="278" y2="13" stroke="url(#ref-gold-inner)" strokeWidth="0.9" opacity="0.75" />
          {/* Bottom inner line */}
          <line x1="32" y1="49" x2="278" y2="49" stroke="url(#ref-gold-inner)" strokeWidth="0.9" opacity="0.75" />
          {/* Left inner vertical line */}
          <line x1="32" y1="13" x2="32" y2="49" stroke="url(#ref-gold-inner)" strokeWidth="0.9" opacity="0.75" />
          {/* Right inner vertical line */}
          <line x1="278" y1="13" x2="278" y2="49" stroke="url(#ref-gold-inner)" strokeWidth="0.9" opacity="0.75" />

          {/* Inner Chevron lines */}
          <polyline
            points="32,13 18,31 32,49"
            fill="none"
            stroke="url(#ref-gold-inner)"
            strokeWidth="0.9"
            strokeLinejoin="round"
            opacity="0.75"
          />
          <polyline
            points="278,13 292,31 278,49"
            fill="none"
            stroke="url(#ref-gold-inner)"
            strokeWidth="0.9"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* --- Left Diamond Accent Motif (Centered at Chevron Intersection) --- */}
          <g id="ref-left-diamond">
            {/* Outer diamond outline */}
            <polygon
              points="22,26.5 26.5,31 22,35.5 17.5,31"
              fill="#180303"
              stroke="url(#ref-gold-outer)"
              strokeWidth="1.1"
            />
            {/* Inner diamond core highlight */}
            <polygon
              points="22,28.8 24.2,31 22,33.2 19.8,31"
              fill="url(#ref-gold-inner)"
              opacity="0.8"
            />
          </g>

          {/* --- Right Diamond Accent Motif (Centered at Chevron Intersection) --- */}
          <g id="ref-right-diamond">
            {/* Outer diamond outline */}
            <polygon
              points="288,26.5 292.5,31 288,35.5 283.5,31"
              fill="#180303"
              stroke="url(#ref-gold-outer)"
              strokeWidth="1.1"
            />
            {/* Inner diamond core highlight */}
            <polygon
              points="288,28.8 290.2,31 288,33.2 285.8,31"
              fill="url(#ref-gold-inner)"
              opacity="0.8"
            />
          </g>
        </g>

        {/* =================================================================
            3. REGAL SERIF TYPOGRAPHY ("JOIN BATTLE")
           ================================================================= */}
        <g id="ref-typography">
          <text
            x="155"
            y="32.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="url(#ref-ivory-text)"
            className="font-cinzel select-none font-semibold transition-colors duration-200 group-hover:fill-white"
            textLength={textLength}
            lengthAdjust={textLength ? 'spacingAndGlyphs' : undefined}
            style={{
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              fontSize: `${fontSize}px`,
              letterSpacing,
              fontWeight: 600,
            }}
            filter="url(#ref-text-shadow)"
          >
            {label}
          </text>
        </g>
      </svg>
    </button>
  );
};
