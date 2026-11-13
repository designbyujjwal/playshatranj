import React from 'react';

/**
 * A candle-lit scholar's desk: dark walnut planks seen from above, a brass candlestick on
 * the right with a flickering flame, a small inkwell and quill on the left, and a warm
 * pool of light that falls across the pages.
 *
 * Everything is drawn in SVG and CSS, so no image files are needed.
 */

const Candle: React.FC = () => (
  <svg viewBox="0 0 170 400" className="block w-full h-auto overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient id="candle-wax" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#b9a479" />
        <stop offset="35%" stopColor="#f3e6bf" />
        <stop offset="70%" stopColor="#e2d1a2" />
        <stop offset="100%" stopColor="#9d8a62" />
      </linearGradient>
      <linearGradient id="candle-brass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6e4c1c" />
        <stop offset="30%" stopColor="#d6b062" />
        <stop offset="55%" stopColor="#a67c34" />
        <stop offset="100%" stopColor="#4f3512" />
      </linearGradient>
      <radialGradient id="candle-flame-outer" cx="50%" cy="78%" r="70%">
        <stop offset="0%" stopColor="#fff3b8" />
        <stop offset="45%" stopColor="#ffb534" />
        <stop offset="100%" stopColor="#e2561a" stopOpacity="0.85" />
      </radialGradient>
      <radialGradient id="candle-pool" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffd77a" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#c9701a" stopOpacity="0.5" />
      </radialGradient>
      <filter id="candle-blur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <filter id="candle-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.2" />
      </filter>
    </defs>

    {/* Shadow on the desk, thrown to the left away from the flame */}
    <ellipse cx="62" cy="382" rx="78" ry="12" fill="#000" opacity="0.6" filter="url(#candle-blur)" />

    {/* Brass dish and handle */}
    <path d="M 22,352 C 6,352 4,372 20,372 L 24,372" fill="none" stroke="url(#candle-brass)" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="86" cy="368" rx="62" ry="13" fill="#3a280d" />
    <path d="M 24,352 C 24,370 40,380 86,380 C 132,380 148,370 148,352 Z" fill="url(#candle-brass)" />
    <ellipse cx="86" cy="352" rx="62" ry="13" fill="url(#candle-brass)" />
    <ellipse cx="86" cy="352" rx="52" ry="9.5" fill="#6b4a1a" />
    <ellipse cx="86" cy="351" rx="52" ry="9" fill="none" stroke="#e9c97e" strokeWidth="0.9" opacity="0.55" />

    {/* Candle body with melted drips */}
    <path d="M 60,190 L 60,352 C 60,358 112,358 112,352 L 112,190 Z" fill="url(#candle-wax)" />
    <ellipse cx="86" cy="190" rx="26" ry="7" fill="#f8edd0" />
    <ellipse cx="86" cy="190.5" rx="19" ry="4.4" fill="#e9b96a" opacity="0.7" />
    <path d="M 60,192 C 58,206 63,224 66,246 C 67,256 74,256 74,246 C 74,230 72,212 72,196 Z" fill="#f6ead0" opacity="0.9" />
    <path d="M 100,196 C 100,214 98,232 100,252 C 101,262 110,262 110,252 C 111,232 112,214 111,196 Z" fill="#f6ead0" opacity="0.85" />
    <path d="M 60,192 C 58,206 63,224 66,246" fill="none" stroke="#8a7650" strokeWidth="0.8" opacity="0.5" />

    {/* Wick */}
    <path d="M 86,190 C 85,180 87,172 86,164" fill="none" stroke="#17100a" strokeWidth="2.6" strokeLinecap="round" />

    {/* Flame */}
    <g className="candle-flame">
      <path d="M 86,96 C 103,122 108,148 86,170 C 64,148 69,122 86,96 Z" fill="url(#candle-flame-outer)" />
      <path d="M 86,122 C 94,136 94,152 86,166 C 78,152 78,136 86,122 Z" fill="#fff8dc" opacity="0.95" />
      <ellipse cx="86" cy="167" rx="5" ry="3.4" fill="#6f8be0" opacity="0.55" filter="url(#candle-soft)" />
    </g>
  </svg>
);

const InkAndQuill: React.FC = () => (
  <svg viewBox="0 0 220 200" className="block w-full h-auto overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient id="ink-brass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a3d14" />
        <stop offset="40%" stopColor="#c9a456" />
        <stop offset="100%" stopColor="#4a3110" />
      </linearGradient>
      <linearGradient id="ink-feather" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#efe4cc" />
        <stop offset="100%" stopColor="#b9a888" />
      </linearGradient>
      <filter id="ink-blur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
    <ellipse cx="78" cy="176" rx="64" ry="10" fill="#000" opacity="0.55" filter="url(#ink-blur)" transform="translate(-6 0)" />
    {/* Quill resting across the desk */}
    <path d="M 108,150 C 150,118 186,70 210,18 C 176,40 150,74 124,118 C 116,130 110,142 108,150 Z" fill="url(#ink-feather)" stroke="#6d5a3a" strokeWidth="0.8" />
    <path d="M 108,150 C 140,110 176,62 206,22" fill="none" stroke="#7a6642" strokeWidth="1.1" />
    <path d="M 108,150 L 92,170" stroke="#2a1d0e" strokeWidth="2" strokeLinecap="round" />
    {/* Inkwell */}
    <path d="M 36,170 L 40,132 C 40,126 112,126 112,132 L 116,170 C 116,180 36,180 36,170 Z" fill="url(#ink-brass)" />
    <ellipse cx="76" cy="132" rx="36" ry="9" fill="#2a1c0a" />
    <ellipse cx="76" cy="131" rx="29" ry="6" fill="#0c0705" />
    <ellipse cx="68" cy="129.5" rx="9" ry="1.8" fill="#fff" opacity="0.18" />
    <ellipse cx="76" cy="132" rx="36" ry="9" fill="none" stroke="#e5c576" strokeWidth="1" opacity="0.6" />
  </svg>
);

/** Layers that sit behind the page content. */
export const DeskBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Walnut planks */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="wood-base" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0028 0.075" numOctaves="5" seed="3" />
          <feColorMatrix
            type="matrix"
            values="0.26 0 0 0 0.15  0.14 0 0 0 0.075  0.055 0 0 0 0.03  0 0 0 0 1"
          />
        </filter>
        <filter id="wood-streaks" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0012 0.5" numOctaves="3" seed="11" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0 0.01  2.4 0 0 0 -0.95"
          />
        </filter>
        <filter id="wood-pores" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.9" numOctaves="2" seed="21" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.03  0 0 0 0 0.012  0 0 0 0 0.005  1.6 0 0 0 -0.62"
          />
        </filter>
        <linearGradient id="plank-tint-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#000" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="knot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0b04" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#2b1608" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2b1608" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" filter="url(#wood-base)" />
      <rect width="1600" height="900" filter="url(#wood-streaks)" opacity="0.7" />
      <rect width="1600" height="900" filter="url(#wood-pores)" opacity="0.55" />

      {/* Plank tints and seams */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="0" y={i * 180} width="1600" height="180" fill="url(#plank-tint-a)" opacity={i % 2 ? 0.9 : 0.4} />
          {i > 0 && (
            <>
              <rect x="0" y={i * 180 - 1.5} width="1600" height="3" fill="#050201" opacity="0.9" />
              <rect x="0" y={i * 180 + 1.5} width="1600" height="1.2" fill="#8a5a2e" opacity="0.22" />
            </>
          )}
        </g>
      ))}
      {/* Staggered end joints */}
      <rect x="610" y="0" width="2.4" height="180" fill="#050201" opacity="0.3" />
      <rect x="1120" y="180" width="2.4" height="180" fill="#050201" opacity="0.3" />
      <rect x="380" y="360" width="2.4" height="180" fill="#050201" opacity="0.3" />
      <rect x="1290" y="540" width="2.4" height="180" fill="#050201" opacity="0.3" />
      <rect x="720" y="720" width="2.4" height="180" fill="#050201" opacity="0.3" />

      {/* A few knots */}
      <ellipse cx="260" cy="470" rx="46" ry="18" fill="url(#knot)" />
      <ellipse cx="1340" cy="250" rx="38" ry="14" fill="url(#knot)" />
      <ellipse cx="900" cy="820" rx="54" ry="20" fill="url(#knot)" />
    </svg>

    {/* Edge darkness, strongest away from the candle */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 85% 80% at 66% 50%, transparent 30%, rgba(8, 3, 1, 0.55) 72%, rgba(3, 1, 0, 0.9) 100%)',
      }}
    />

    {/* Candle on the right-hand side of the desk */}
    <div
      className="absolute hidden md:block"
      style={{
        right: 'clamp(16px, 3.2vw, 90px)',
        bottom: 'clamp(24px, 7dvh, 90px)',
        width: 'clamp(72px, 15dvh, 150px)',
      }}
    >
      <Candle />
    </div>

    {/* Inkwell and quill on the left */}
    <div
      className="absolute hidden md:block opacity-95"
      style={{
        left: 'clamp(16px, 3vw, 80px)',
        bottom: 'clamp(24px, 8dvh, 100px)',
        width: 'clamp(90px, 18dvh, 180px)',
      }}
    >
      <InkAndQuill />
    </div>
  </div>
);

/** Warm light from the candle falling across everything on screen. */
export const CandleLight: React.FC = () => (
  <div className="absolute inset-0 z-[11] pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Core pool of light around the flame */}
    <div
      className="absolute candle-glow"
      style={{
        right: 'clamp(-120px, -4vw, 0px)',
        bottom: 'clamp(0px, 8dvh, 90px)',
        width: 'clamp(320px, 62dvh, 760px)',
        height: 'clamp(320px, 62dvh, 760px)',
        background:
          'radial-gradient(circle at 50% 50%, rgba(255, 190, 90, 0.42) 0%, rgba(255, 140, 40, 0.2) 30%, rgba(255, 110, 20, 0.07) 55%, transparent 72%)',
        mixBlendMode: 'screen',
      }}
    />
    {/* Wide, gentle wash that warms the pages on the candle side */}
    <div
      className="absolute inset-0 candle-glow"
      style={{
        background:
          'radial-gradient(ellipse 70% 90% at 96% 78%, rgba(255, 170, 70, 0.2) 0%, rgba(255, 130, 40, 0.08) 45%, transparent 75%)',
        mixBlendMode: 'soft-light',
      }}
    />
  </div>
);
