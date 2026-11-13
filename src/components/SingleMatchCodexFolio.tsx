import React from 'react';

interface SingleMatchCodexFolioProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const SingleMatchCodexFolio: React.FC<SingleMatchCodexFolioProps> = ({
  id,
  children,
  className = '',
  contentClassName = '',
}) => {
  // Symmetrical authentic manuscript leaf path (viewBox 0 0 760 980)
  // Designed with organic deckled edges, gentle thumb notches, and natural paper edge waviness
  const tornSinglePath = `
    M 28,30
    C 90,26 180,29 270,27
    C 380,29 480,26 580,28
    C 660,26 710,29 732,30
    C 731,80 734,160 731,250
    C 733,340 730,430 732,520
    C 731,610 733,680 731,730
    C 732,750 728,765 727,780
    C 729,795 733,810 731,835
    C 732,860 728,875 727,890
    C 729,905 733,920 731,940
    C 732,952 730,962 732,970
    C 660,968 580,971 490,969
    C 380,971 270,968 180,970
    C 110,969 60,971 28,970
    C 29,940 27,880 29,820
    C 27,800 31,785 30,770
    C 27,750 31,735 29,715
    C 30,620 27,510 29,400
    C 28,290 30,190 28,90
    C 27,70 30,45 28,30
    Z
  `;

  const clipId = `single-folio-clip-${id}`;

  return (
    <div
      id={id}
      className={`relative w-full max-w-3xl lg:max-w-4xl mx-auto transition-all duration-300 select-none ${className || 'my-auto'}`}
      style={{
        filter:
          'drop-shadow(0 20px 36px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 30px rgba(225, 155, 45, 0.25)) drop-shadow(0 4px 14px rgba(35, 15, 5, 0.6))',
      }}
    >
      {/* Ambient Candlelight Luminous Backdrop Halo */}
      <div
        className="absolute -inset-4 sm:-inset-6 pointer-events-none z-0 rounded-3xl opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(240, 165, 50, 0.18) 0%, rgba(180, 95, 20, 0.08) 55%, transparent 75%)',
          filter: 'blur(14px)',
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 1. BACKGROUND SVG CANVAS: Authentic Antique Single Manuscript Folio       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          viewBox="0 0 760 980"
          className="w-full h-full block overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Page Boundary Clip Path */}
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={tornSinglePath} />
            </clipPath>

            {/* Warm creamy parchment gradient */}
            <linearGradient id={`parchmentGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f2e4cf" />
              <stop offset="35%" stopColor="#ebd9be" />
              <stop offset="70%" stopColor="#e7d4b6" />
              <stop offset="100%" stopColor="#deccaa" />
            </linearGradient>

            {/* Laid Paper Wire Lines (Fine horizontal handmade wire ribs) */}
            <pattern id={`laidPaperPattern-${id}`} width="100" height="8" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2="100" y2="2" stroke="#6b421c" strokeWidth="0.25" opacity="0.035" />
              <line x1="0" y1="3" x2="100" y2="3" stroke="#ffffff" strokeWidth="0.2" opacity="0.035" />
            </pattern>

            {/* Organic Paper Pulp Fiber Distortion Filter */}
            <filter id={`paperFiberFilter-${id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.25" numOctaves="3" result="roughNoise" />
              <feDisplacementMap in="SourceGraphic" in2="roughNoise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Top Corners Patina Wash */}
            <radialGradient id={`topPatina-${id}`} cx="50%" cy="2%" r="55%">
              <stop offset="0%" stopColor="#ad753c" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#bc854d" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#ebd9be" stopOpacity="0" />
            </radialGradient>

            {/* Bottom Corners Patina Wash */}
            <radialGradient id={`bottomPatina-${id}`} cx="50%" cy="98%" r="50%">
              <stop offset="0%" stopColor="#9e662f" stopOpacity="0.24" />
              <stop offset="55%" stopColor="#b57e46" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ebd9be" stopOpacity="0" />
            </radialGradient>

            {/* Lateral Edge Oxidation Washes */}
            <linearGradient id={`leftPatina-${id}`} x1="0%" y1="0%" x2="10%" y2="0%">
              <stop offset="0%" stopColor="#a36e37" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ebd9be" stopOpacity="0" />
            </linearGradient>

            <linearGradient id={`rightPatina-${id}`} x1="100%" y1="0%" x2="90%" y2="0%">
              <stop offset="0%" stopColor="#a36e37" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ebd9be" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Under-layer physical paper cast shadow */}
          <path
            d={tornSinglePath}
            transform="translate(2.5, 3.5)"
            fill="#120702"
            opacity="0.32"
            filter="blur(3.5px)"
          />

          {/* 2. Paper Body and Edge Contour Layers */}
          <g clipPath={`url(#${clipId})`}>
            {/* Base Paper Sheet Body */}
            <path d={tornSinglePath} fill={`url(#parchmentGrad-${id})`} />

            {/* Laid Paper Texture Lines */}
            <path
              d={tornSinglePath}
              fill={`url(#laidPaperPattern-${id})`}
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Edge Patina Washes */}
            <path d={tornSinglePath} fill={`url(#topPatina-${id})`} style={{ mixBlendMode: 'multiply' }} />
            <path d={tornSinglePath} fill={`url(#bottomPatina-${id})`} style={{ mixBlendMode: 'multiply' }} />
            <path d={tornSinglePath} fill={`url(#leftPatina-${id})`} style={{ mixBlendMode: 'multiply' }} />
            <path d={tornSinglePath} fill={`url(#rightPatina-${id})`} style={{ mixBlendMode: 'multiply' }} />

            {/* Classic Top Left Corner Dog-Ear Crease */}
            <g opacity="0.32" stroke="#7a471b" strokeWidth="0.8" fill="none">
              <path d="M 28,68 C 42,48 56,38 74,28" />
              <path d="M 29,69 C 43,49 57,39 75,29" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" />
            </g>

            {/* Subtle handling crease near bottom right */}
            <path d="M 731,920 C 705,905 680,910 650,930" stroke="#7a471b" strokeWidth="0.6" opacity="0.22" fill="none" />
          </g>

          {/* 3. Paper Fiber Edge Boundary Stroke */}
          <path
            d={tornSinglePath}
            fill="none"
            stroke="#9e7246"
            strokeWidth="0.75"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter={`url(#paperFiberFilter-${id})`}
            opacity="0.48"
          />

          {/* Paper Rim Fine Highlight */}
          <path
            d={tornSinglePath}
            fill="none"
            stroke="#fffcf5"
            strokeWidth="0.4"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. MANUSCRIPT CONTENT (Floated cleanly inside the authentic folio with ample margins) */}
      {/* ========================================================================= */}
      <div className={`relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-5 md:py-6 flex flex-col justify-between ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
