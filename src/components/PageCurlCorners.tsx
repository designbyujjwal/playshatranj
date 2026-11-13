import React from 'react';

interface PageCurlCornersProps {
  className?: string;
}

export const PageCurlCorners: React.FC<PageCurlCornersProps> = ({ className = '' }) => {
  return (
    <div
      id="app-page-curl-corners"
      className={`fixed inset-0 pointer-events-none z-35 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* 1. BOTTOM-RIGHT CORNER: Classic Master Folio Turn Page-Curl               */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 transition-transform duration-500 ease-out hover:scale-115 pointer-events-auto cursor-pointer">
        <div className="w-full h-full animate-page-curl-br">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              {/* Underlying Page Shadow & Dark Backing */}
              <radialGradient id="curlUnderShadowBR" cx="85%" cy="85%" r="65%">
                <stop offset="0%" stopColor="#1a0b03" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#2c1407" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#4d2912" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1a0b03" stopOpacity="0" />
              </radialGradient>

              {/* Back of Curled Parchment Leaf Gradient */}
              <linearGradient id="curlFlapGradBR" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1b078" />
                <stop offset="25%" stopColor="#edd8b1" />
                <stop offset="55%" stopColor="#faf3e4" />
                <stop offset="80%" stopColor="#edd5ad" />
                <stop offset="100%" stopColor="#c49e65" />
              </linearGradient>

              {/* Curled Cylinder Shading (Cylindrical Highlights of the Fold) */}
              <linearGradient id="cylinderHighlightBR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="75%" stopColor="#000000" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* A. Cutaway Void behind the curl (The exposed dark binding underneath the lifted page) */}
            <polygon points="45,100 100,45 100,100" fill="url(#curlUnderShadowBR)" />

            {/* B. Drop Shadow cast by the curled flap onto the page below */}
            <path
              d="M 38,100 C 44,78 68,54 100,38 L 100,48 C 72,62 52,82 45,100 Z"
              fill="#180902"
              opacity="0.55"
              filter="blur(2px)"
            />

            {/* C. The Curled Page Flap Itself (Folded over diagonally from the corner) */}
            <path
              d="M 45,100 C 52,78 78,52 100,45 Q 68,68 45,100 Z"
              fill="url(#curlFlapGradBR)"
            />

            {/* D. Cylindrical Roll Highlight Overlay */}
            <path
              d="M 45,100 C 52,78 78,52 100,45 Q 68,68 45,100 Z"
              fill="url(#cylinderHighlightBR)"
              style={{ mixBlendMode: 'overlay' }}
            />

            {/* E. Delicate Gilded Parchment Edge on the Curl */}
            <path
              d="M 45,100 C 52,78 78,52 100,45"
              fill="none"
              stroke="#8c612c"
              strokeWidth="0.9"
              opacity="0.8"
            />

            {/* F. Inner Crease Line */}
            <path
              d="M 45,100 L 100,45"
              fill="none"
              stroke="#542e10"
              strokeWidth="0.75"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM-LEFT CORNER: Subtle Turn Leaf Curl                              */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-transform duration-500 ease-out hover:scale-115 pointer-events-auto cursor-pointer">
        <div className="w-full h-full animate-page-curl-bl">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <radialGradient id="curlUnderShadowBL" cx="15%" cy="85%" r="65%">
                <stop offset="0%" stopColor="#1a0b03" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#301608" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#1a0b03" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="curlFlapGradBL" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d1b078" />
                <stop offset="30%" stopColor="#eed9b4" />
                <stop offset="60%" stopColor="#faf3e4" />
                <stop offset="100%" stopColor="#caa46c" />
              </linearGradient>
            </defs>

            {/* Cutaway Void */}
            <polygon points="0,100 55,100 0,45" fill="url(#curlUnderShadowBL)" />

            {/* Curled Page Flap */}
            <path
              d="M 0,45 C 22,52 48,78 55,100 Q 32,68 0,45 Z"
              fill="url(#curlFlapGradBL)"
            />

            {/* Edge line */}
            <path
              d="M 0,45 C 22,52 48,78 55,100"
              fill="none"
              stroke="#8c612c"
              strokeWidth="0.8"
              opacity="0.75"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TOP-RIGHT CORNER: Gentle Dog-Eared Foliation Fold                      */}
      {/* ========================================================================= */}
      <div className="absolute top-0 right-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-500 ease-out hover:scale-115 pointer-events-auto cursor-pointer">
        <div className="w-full h-full animate-page-curl-tr">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <radialGradient id="curlUnderShadowTR" cx="85%" cy="15%" r="65%">
                <stop offset="0%" stopColor="#1a0b03" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#301608" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#1a0b03" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="curlFlapGradTR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1b078" />
                <stop offset="35%" stopColor="#eed9b4" />
                <stop offset="65%" stopColor="#faf3e4" />
                <stop offset="100%" stopColor="#caa46c" />
              </linearGradient>
            </defs>

            {/* Cutaway Void */}
            <polygon points="100,0 45,0 100,55" fill="url(#curlUnderShadowTR)" />

            {/* Curled Page Flap */}
            <path
              d="M 45,0 C 52,22 78,48 100,55 Q 68,32 45,0 Z"
              fill="url(#curlFlapGradTR)"
            />

            {/* Edge line */}
            <path
              d="M 45,0 C 52,22 78,48 100,55"
              fill="none"
              stroke="#8c612c"
              strokeWidth="0.8"
              opacity="0.75"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
