import React from 'react';
import { WaxSeal } from './TornOldBookPage';

/**
 * Authentic Hand-Drawn Quill Ink Encirclement
 * Renders an organic, imperfect quill stroke that looks like a scholar or notary
 * circled an item or word with a dip pen in antique vermilion red ink.
 */
export const QuillInkEncirclement: React.FC<{
  className?: string;
  variant?: 'oval' | 'cartouche' | 'compact';
}> = ({ className = '', variant = 'oval' }) => {
  return (
    <svg
      viewBox="0 0 240 100"
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Organic Ink Bleed & Fiber Diffusion Filter */}
        <filter id="inkBleedFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {variant === 'oval' && (
        <g filter="url(#inkBleedFilter)">
          {/* Main organic quill oval with natural hand-wobble and pen overlap */}
          <path
            d="M 28,48 
               C 27,24 64,12 120,11 
               C 176,10 216,22 218,48 
               C 220,74 182,88 122,89 
               C 62,90 20,76 22,50 
               C 23,32 58,16 104,13 
               C 142,11 178,16 198,24"
            fill="none"
            stroke="#9e181f"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.88"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Secondary feathering stroke representing uneven quill nib pressure */}
          <path
            d="M 32,54 
               C 31,30 68,16 122,15 
               C 174,14 212,25 214,50 
               C 216,70 184,85 130,86"
            fill="none"
            stroke="#b3242c"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.45"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Pen-lift ink droplet where the quill was lifted from parchment */}
          <circle cx="198" cy="24" r="1.6" fill="#8f151b" opacity="0.95" style={{ mixBlendMode: 'multiply' }} />
          <circle cx="202" cy="22" r="0.7" fill="#8f151b" opacity="0.6" style={{ mixBlendMode: 'multiply' }} />
          <circle cx="27" cy="48" r="1.1" fill="#8f151b" opacity="0.7" style={{ mixBlendMode: 'multiply' }} />
        </g>
      )}

      {variant === 'cartouche' && (
        <g filter="url(#inkBleedFilter)">
          {/* Hand-penned cartouche with corner loops */}
          <path
            d="M 24,28 
               C 22,18 32,14 44,14 
               L 196,14 
               C 208,14 218,18 216,28 
               L 216,72 
               C 218,82 208,86 196,86 
               L 44,86 
               C 32,86 22,82 24,72 
               Z"
            fill="none"
            stroke="#9e181f"
            strokeWidth="2.0"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Subtle imperfect second stroke */}
          <path
            d="M 28,18 C 80,13 160,13 212,17"
            fill="none"
            stroke="#9e181f"
            strokeWidth="1.2"
            opacity="0.5"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>
      )}

      {variant === 'compact' && (
        <g filter="url(#inkBleedFilter)">
          <ellipse
            cx="120"
            cy="50"
            rx="105"
            ry="40"
            fill="none"
            stroke="#9e181f"
            strokeWidth="2.0"
            strokeDasharray="320 8"
            strokeDashoffset="6"
            opacity="0.88"
            style={{ mixBlendMode: 'multiply' }}
          />
          <path
            d="M 22,50 C 23,28 65,16 120,15 C 175,14 218,26 218,50"
            fill="none"
            stroke="#9e181f"
            strokeWidth="1.2"
            opacity="0.6"
            style={{ mixBlendMode: 'multiply' }}
          />
          <circle cx="218" cy="50" r="1.4" fill="#8f151b" opacity="0.9" style={{ mixBlendMode: 'multiply' }} />
        </g>
      )}
    </svg>
  );
};

/**
 * Authentic Hand-Pressed Vermilion Signet Stamp
 * Looks like a genuine red wax or cinnabar ink seal pressed onto the paper
 */
export const ImperialPaperSignetSeal: React.FC<{
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const dims = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12 sm:w-14 sm:h-14';
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  // The same raised wax seal with the S that marks the chosen page.
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${dims} ${className}`} aria-hidden="true">
      <svg viewBox="-56 -56 112 112" className="w-full h-full overflow-visible">
        <WaxSeal uid={`badge${uid}`} at={{ x: 0, y: 0 }} scale={1} animate={false} />
      </svg>
    </div>
  );
};

/**
 * Authentic Hand-Drawn Quill Flourish Underline
 * Renders beneath selected titles, capturing natural quill fountain ink strokes
 */
export const QuillFlourishUnderline: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 160 20"
      className={`w-28 sm:w-36 h-3 text-[#9e181f] overflow-visible ${className}`}
      fill="none"
      aria-hidden="true"
      style={{ mixBlendMode: 'multiply' }}
    >
      <path
        d="M 6,7 
           C 24,5 64,5 110,6 
           C 132,7 148,6 153,4 
           C 155,2 152,1 146,3 
           C 118,7 62,12 20,14 
           C 12,14 6,13 7,11 
           C 10,8 36,6 64,7"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Lift droplets */}
      <circle cx="152" cy="3" r="1.1" fill="currentColor" opacity="0.95" />
      <circle cx="157" cy="5" r="0.6" fill="currentColor" opacity="0.6" />
    </svg>
  );
};

/**
 * Natural Feathered Pigment Wash
 * Soft organic watercolor saffron-vermilion tint that blends into paper fibers
 */
export const PaperPigmentWash: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none rounded-sm transition-opacity duration-300 ${className}`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(158, 24, 31, 0.08) 0%, rgba(200, 100, 30, 0.03) 65%, transparent 85%)',
        mixBlendMode: 'multiply',
      }}
      aria-hidden="true"
    />
  );
};
