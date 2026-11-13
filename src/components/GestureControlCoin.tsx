import React, { useState } from 'react';

interface GestureControlCoinProps {
  className?: string;
}

/**
 * Realistic Antique Bronze Medallion Coin for Virtual Gesture Control
 * Depicts the pinching hand in relief matching Screenshot 2026-09-15 at 12.11.26 AM:
 * - Truncated wrist with beveled sculptural cut
 * - Upper finger extended backwards to upper-left with knuckles & nail
 * - Steep downward index finger pinching tip-to-tip with the horizontal thumb
 * - Horizontal thumb with square-rounded nail, dual knuckle creases, and fleshy thenar eminence
 * - Folded finger knuckle inside the central negative-space crook
 * - Dual kinetic bronze wave curving gracefully beneath the hand
 * - Levitating embossed Staunton pawn below
 * - Framed by beaded pearls, Vitruvian wave scroll, and laurel branches on velvet mat.
 */
export const GestureControlCoin: React.FC<GestureControlCoinProps> = ({ className = '' }) => {
  const [useSvg, setUseSvg] = useState(true);

  return (
    <div
      id="gesture-control-coin-container"
      className={`relative w-full max-w-[390px] aspect-square mx-auto flex items-center justify-center select-none ${className}`}
    >
      {/* Fallback image if custom file is provided */}
      {!useSvg ? (
        <img
          id="gesture-control-coin-photo"
          src="/gesture-coin.png"
          alt="Antique Bronze Gesture Control Medallion"
          referrerPolicy="no-referrer"
          onError={() => setUseSvg(true)}
          className="w-full h-full object-contain rounded-2xl drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
        />
      ) : null}

      {/* Vector Medallion (high precision numismatic engraving fallback) */}
      {useSvg ? (
        <svg
          id="gesture-control-coin-svg"
          viewBox="0 0 500 500"
          className="w-full h-full filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.85)]"
        >
          <defs>
            {/* Deep Burgundy Velvet Mat Gradient */}
            <radialGradient id="velvetBg" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#3d1016" />
              <stop offset="45%" stopColor="#25080c" />
              <stop offset="85%" stopColor="#130306" />
              <stop offset="100%" stopColor="#080103" />
            </radialGradient>

            {/* Bronze Outer Rim Multi-Stop Metallic Gradient */}
            <linearGradient id="bronzeRimGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#f5dc9a" />
              <stop offset="18%" stopColor="#dfba72" />
              <stop offset="42%" stopColor="#8c6833" />
              <stop offset="68%" stopColor="#4c3414" />
              <stop offset="88%" stopColor="#a37e40" />
              <stop offset="100%" stopColor="#5a3d16" />
            </linearGradient>

            {/* Bronze Coin Field Surface Radial Gradient */}
            <radialGradient id="bronzeFieldGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#baa067" />
              <stop offset="35%" stopColor="#8c6f3d" />
              <stop offset="70%" stopColor="#5f4621" />
              <stop offset="92%" stopColor="#422f12" />
              <stop offset="100%" stopColor="#2e1f0a" />
            </radialGradient>

            {/* Bronze High-Relief Element Gradient */}
            <linearGradient id="bronzeReliefGrad" x1="20%" y1="15%" x2="80%" y2="85%">
              <stop offset="0%" stopColor="#fae7b5" />
              <stop offset="25%" stopColor="#dfbe79" />
              <stop offset="55%" stopColor="#9a763f" />
              <stop offset="85%" stopColor="#583e1a" />
              <stop offset="100%" stopColor="#2e1d09" />
            </linearGradient>

            {/* Bronze Bead Metallic Highlight */}
            <radialGradient id="bronzeBeadGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff2cf" />
              <stop offset="40%" stopColor="#d5af66" />
              <stop offset="80%" stopColor="#7a5522" />
              <stop offset="100%" stopColor="#2c1a06" />
            </radialGradient>

            {/* Sharp Metallic Golden Line Highlight */}
            <linearGradient id="bronzeHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbf0d0" />
              <stop offset="50%" stopColor="#d4ae65" />
              <stop offset="100%" stopColor="#f7e1a3" />
            </linearGradient>

            {/* Coin Outer Heavy Cast Shadow */}
            <filter id="coinCastShadow" x="-20%" y="-20%" width="150%" height="150%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
              <feOffset dx="6" dy="12" />
              <feComponentTransfer><feFuncA type="linear" slope="0.7" /></feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Relief Undercut Shadow Filter */}
            <filter id="reliefUndercutShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
              <feOffset dx="3" dy="4" />
              <feComponentTransfer><feFuncA type="linear" slope="0.75" /></feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Circular Arc Path for GESTURE CONTROL Arched Lettering */}
            <path
              id="gestureControlArc"
              d="M 102,230 A 156,156 0 0,1 398,230"
              fill="none"
            />
          </defs>

          {/* 1. Deep Burgundy Velvet Backdrop */}
          <rect width="500" height="500" rx="28" fill="url(#velvetBg)" />
          <circle cx="250" cy="250" r="238" fill="none" stroke="#48141d" strokeWidth="2" opacity="0.4" />
          <circle cx="235" cy="225" r="190" fill="#691a26" opacity="0.15" filter="blur(22px)" />

          {/* 2. Coin Base Body with Outer Drop Shadow */}
          <g filter="url(#coinCastShadow)">
            {/* Outermost Raised Rim */}
            <circle cx="250" cy="250" r="222" fill="url(#bronzeRimGrad)" stroke="#1a1005" strokeWidth="2" />

            {/* Bevel Trench for Pearl Border */}
            <circle cx="250" cy="250" r="213" fill="#301f0b" stroke="#160c03" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="197" fill="url(#bronzeRimGrad)" stroke="#1a1005" strokeWidth="1" />

            {/* 88 Spherical Bronze Beads / Pearls */}
            <g id="coin-pearl-border">
            <circle cx="456.00" cy="250.00" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="455.48" cy="264.70" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="453.90" cy="279.32" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="451.29" cy="293.79" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="447.66" cy="308.04" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="443.01" cy="321.99" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="437.38" cy="335.58" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="430.80" cy="348.73" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="423.30" cy="361.37" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="414.91" cy="373.45" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="405.68" cy="384.90" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="395.66" cy="395.66" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="384.90" cy="405.68" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="373.45" cy="414.91" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="361.37" cy="423.30" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="348.73" cy="430.80" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="335.58" cy="437.38" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="321.99" cy="443.01" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="308.04" cy="447.66" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="293.79" cy="451.29" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="279.32" cy="453.90" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="264.70" cy="455.48" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="250.00" cy="456.00" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="235.30" cy="455.48" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="220.68" cy="453.90" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="206.21" cy="451.29" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="191.96" cy="447.66" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="178.01" cy="443.01" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="164.42" cy="437.38" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="151.27" cy="430.80" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="138.63" cy="423.30" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="126.55" cy="414.91" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="115.10" cy="405.68" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="104.34" cy="395.66" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="94.32" cy="384.90" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="85.09" cy="373.45" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="76.70" cy="361.37" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="69.20" cy="348.73" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="62.62" cy="335.58" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="56.99" cy="321.99" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="52.34" cy="308.04" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="48.71" cy="293.79" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="46.10" cy="279.32" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="44.52" cy="264.70" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="44.00" cy="250.00" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="44.52" cy="235.30" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="46.10" cy="220.68" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="48.71" cy="206.21" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="52.34" cy="191.96" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="56.99" cy="178.01" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="62.62" cy="164.42" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="69.20" cy="151.27" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="76.70" cy="138.63" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="85.09" cy="126.55" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="94.32" cy="115.10" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="104.34" cy="104.34" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="115.10" cy="94.32" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="126.55" cy="85.09" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="138.63" cy="76.70" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="151.27" cy="69.20" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="164.42" cy="62.62" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="178.01" cy="56.99" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="191.96" cy="52.34" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="206.21" cy="48.71" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="220.68" cy="46.10" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="235.30" cy="44.52" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="250.00" cy="44.00" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="264.70" cy="44.52" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="279.32" cy="46.10" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="293.79" cy="48.71" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="308.04" cy="52.34" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="321.99" cy="56.99" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="335.58" cy="62.62" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="348.73" cy="69.20" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="361.37" cy="76.70" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="373.45" cy="85.09" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="384.90" cy="94.32" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="395.66" cy="104.34" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="405.68" cy="115.10" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="414.91" cy="126.55" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="423.30" cy="138.63" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="430.80" cy="151.27" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="437.38" cy="164.42" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="443.01" cy="178.01" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="447.66" cy="191.96" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="451.29" cy="206.21" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="453.90" cy="220.68" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            <circle cx="455.48" cy="235.30" r="3.4" fill="url(#bronzeBeadGrad)" stroke="#1a1005" strokeWidth="0.7" />
            </g>

            {/* Inner Raised Concentric Bronze Border Ring */}
            <circle cx="250" cy="250" r="195" fill="none" stroke="url(#bronzeRimGrad)" strokeWidth="4.5" />
            <circle cx="250" cy="250" r="195" fill="none" stroke="#1a0f04" strokeWidth="1.5" />

            {/* Recessed Bronze Field Surface */}
            <circle cx="250" cy="250" r="186" fill="url(#bronzeFieldGrad)" stroke="#180e03" strokeWidth="2.5" />

            {/* Fine Circular Field Line */}
            <circle cx="250" cy="250" r="172" fill="none" stroke="#7e5d2b" strokeWidth="0.75" opacity="0.6" />

            {/* Subtle Numismatic Die Scratches & Field Polish Marks */}
            <g opacity="0.35" stroke="#1a0f04" strokeWidth="0.6">
              <line x1="140" y1="180" x2="152" y2="172" />
              <line x1="170" y1="210" x2="182" y2="202" />
              <line x1="310" y1="230" x2="325" y2="225" />
              <line x1="280" y1="260" x2="295" y2="252" />
              <line x1="220" y1="300" x2="235" y2="295" />
            </g>
          </g>

          {/* 3. Curved Arched Lettering: "GESTURE CONTROL" */}
          <g id="coin-arched-text" className="select-none pointer-events-none">
            <text
              fontSize="21"
              fontFamily="serif"
              fontWeight="900"
              letterSpacing="5"
              fill="#160b03"
              opacity="0.9"
            >
              <textPath href="#gestureControlArc" startOffset="50%" textAnchor="middle" dy="2">
                GESTURE CONTROL
              </textPath>
            </text>
            <text
              fontSize="21"
              fontFamily="serif"
              fontWeight="900"
              letterSpacing="5"
              fill="url(#bronzeHighlightGrad)"
              stroke="#201305"
              strokeWidth="0.6"
            >
              <textPath href="#gestureControlArc" startOffset="50%" textAnchor="middle">
                GESTURE CONTROL
              </textPath>
            </text>
          </g>

          {/* 4. Classical Laurel Leaf Branches (Left & Right) */}
          <g id="coin-laurel-wreaths">
          <g transform="translate(110.49, 175.82) rotate(118.00) scale(0.85)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(100.79, 198.04) rotate(109.20) scale(0.94)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(94.60, 221.48) rotate(100.40) scale(0.99)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(92.06, 245.59) rotate(91.60) scale(0.99)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(93.25, 269.80) rotate(82.80) scale(0.94)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(98.12, 293.55) rotate(74.00) scale(0.85)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(389.51, 175.82) rotate(62.00) scale(0.85)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(399.21, 198.04) rotate(70.80) scale(0.94)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(405.40, 221.48) rotate(79.60) scale(0.99)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(407.94, 245.59) rotate(88.40) scale(0.99)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(406.75, 269.80) rotate(97.20) scale(0.94)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          <g transform="translate(401.88, 293.55) rotate(106.00) scale(0.85)">
            <path d="M 0,0 C -6,-8 -9,-18 0,-26 C 9,-18 6,-8 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1.2" />
            <path d="M 0,0 C -3,-7 -5,-16 0,-23" fill="none" stroke="#f6dda2" strokeWidth="0.9" opacity="0.8" />
            <path d="M 0,-6 C 7,-10 14,-13 18,-7 C 18,-1 9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C 6,-8 12,-10 15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
            <path d="M 0,-6 C -7,-10 -14,-13 -18,-7 C -18,-1 -9,1 0,-6 Z" fill="url(#bronzeReliefGrad)" stroke="#1a1005" strokeWidth="1" />
            <path d="M 0,-6 C -6,-8 -12,-10 -15,-6" fill="none" stroke="#f6dda2" strokeWidth="0.7" opacity="0.8" />
          </g>
          </g>

          {/* 5. Vitruvian Wave Scroll along Bottom Rim */}
          <g id="coin-vitruvian-waves">
          <g transform="translate(377.82, 342.87) rotate(126.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(361.72, 361.72) rotate(135.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(342.87, 377.82) rotate(144.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(321.73, 390.78) rotate(153.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(298.82, 400.27) rotate(162.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(274.72, 406.05) rotate(171.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(250.00, 408.00) rotate(180.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(225.28, 406.05) rotate(189.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(201.18, 400.27) rotate(198.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(178.27, 390.78) rotate(207.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(157.13, 377.82) rotate(216.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(138.28, 361.72) rotate(225.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(122.18, 342.87) rotate(234.00)">
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="#1c1105" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M -11,0 C -6,-9 4,-9 7,-2 C 8,4 2,7 -3,5 C -7,2 -6,-3 -2,-4 C 2,-4 3,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          </g>

          {/* ========================================================================= */}
          {/* 6. CENTRAL SCULPTED BRONZE RELIEF HAND (Matching Screenshot Exact Details)*/}
          {/* ========================================================================= */}
          <g id="coin-relief-hand">
            {/* Deep Relief Undercut Shadow for 3D Volume */}
            <g filter="url(#reliefUndercutShadow)">
              <path
                d="
                  M 382,242
                  C 376,210 348,168 306,164
                  C 288,162 274,170 256,180
                  L 214,188
                  C 192,192 170,196 156,204
                  C 148,209 152,216 160,218
                  L 198,222
                  C 214,224 224,222 230,220
                  L 220,248
                  C 214,264 204,280 198,288
                  C 194,293 200,300 210,300
                  L 236,298
                  C 255,296 270,292 284,290
                  C 310,290 338,302 368,318
                  L 382,242
                  Z"
                fill="#130802"
              />
            </g>

            {/* Hand Sculpted Flesh Body */}
            <g filter="url(#reliefUndercutShadow)">
              {/* Main Hand Volume */}
              <path
                d="
                  M 380,240
                  C 372,212 344,172 305,166
                  C 290,163 275,170 258,180
                  C 246,187 236,192 228,198
                  L 216,242
                  C 210,260 202,278 196,286
                  C 194,289 198,294 206,294
                  L 230,292
                  C 252,290 270,286 288,284
                  C 314,284 340,296 366,312
                  L 380,240
                  Z"
                fill="url(#bronzeReliefGrad)"
                stroke="#221306"
                strokeWidth="1.2"
              />

              {/* Truncated Wrist Facet (Chiseled Coin End-Cut at right) */}
              <path
                d="M 380,240 L 366,312 L 358,308 L 372,238 Z"
                fill="url(#bronzeFieldGrad)"
                stroke="#1a0f04"
                strokeWidth="1"
              />
              <line x1="380" y1="240" x2="366" y2="312" stroke="#fae5a8" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="372" y1="238" x2="358" y2="308" stroke="#160c03" strokeWidth="1.5" />

              {/* Upper Extended Finger (Pointing to upper-left ~145 deg) */}
              <path
                d="M 258,180 L 214,188 C 190,192 168,196 154,204 C 147,208 150,215 158,217 L 198,220 C 216,222 228,218 238,214 L 246,190 Z"
                fill="#160c04"
              />
              <path
                d="
                  M 256,178
                  C 238,182 216,186 195,190
                  C 178,194 165,198 152,204
                  C 147,206 148,212 154,214
                  C 162,216 172,216 186,214
                  C 202,212 218,214 232,212
                  C 240,210 248,202 254,194
                  Z"
                fill="url(#bronzeReliefGrad)"
                stroke="#201205"
                strokeWidth="1.1"
              />
              {/* Upper finger dorsal bright metallic specular crest */}
              <path
                d="M 256,178 C 238,182 216,186 195,190 C 178,194 165,198 152,204"
                fill="none"
                stroke="#fff3d6"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              {/* Upper finger fingernail */}
              <path
                d="M 152,204 C 150,207 151,211 154,213 C 158,214 162,213 162,209 C 162,206 156,204 152,204 Z"
                fill="none"
                stroke="#1c1005"
                strokeWidth="0.9"
              />
              {/* Upper finger knuckle creases */}
              <path d="M 216,187 C 218,193 217,199 214,205" fill="none" stroke="#251608" strokeWidth="0.9" />
              <path d="M 188,191 C 190,196 189,201 187,206" fill="none" stroke="#251608" strokeWidth="0.9" />

              {/* Folded Finger Knuckle in Crook (Central Negative Space) */}
              <g id="hand-crook-folded-finger">
                <polygon points="234,218 258,214 266,236 244,248 230,234" fill="#130903" />
                <polygon
                  points="238,220 255,217 263,234 246,244 235,232"
                  fill="url(#bronzeFieldGrad)"
                  stroke="#1c0f04"
                  strokeWidth="0.9"
                />
                <line x1="246" y1="220" x2="242" y2="240" stroke="#160a03" strokeWidth="1" />
                <line x1="255" y1="224" x2="251" y2="238" stroke="#160a03" strokeWidth="0.8" />
              </g>

              {/* Downward Arching Index Finger (Pinching with Thumb) */}
              <path
                d="
                  M 305,166
                  C 290,166 276,176 264,192
                  C 252,208 238,232 226,254
                  C 220,265 212,278 206,286
                  C 204,289 207,293 213,293
                  C 219,293 225,288 232,278
                  C 244,258 258,236 270,220
                  C 282,204 296,192 308,186
                  Z"
                fill="url(#bronzeReliefGrad)"
                stroke="#1f1105"
                strokeWidth="1.2"
              />
              {/* Index finger outer dorsal highlight ridge */}
              <path
                d="M 305,166 C 290,166 276,176 264,192 C 252,208 238,232 226,254 C 220,265 212,278 206,286"
                fill="none"
                stroke="#fff3d6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Index finger knuckle creases */}
              <path d="M 264,196 C 269,198 274,196 277,192" fill="none" stroke="#251608" strokeWidth="1.1" />
              <path d="M 242,234 C 247,236 252,234 255,230" fill="none" stroke="#251608" strokeWidth="1.1" />
              <path d="M 226,258 C 230,260 234,258 236,255" fill="none" stroke="#251608" strokeWidth="0.9" />
              {/* Index fingernail profile on outer tip */}
              <path
                d="M 207,284 C 205,287 207,291 210,292"
                fill="none"
                stroke="#1c0f04"
                strokeWidth="1.1"
                strokeLinecap="round"
              />

              {/* Horizontal Thumb & Thenar Eminence */}
              <path
                d="
                  M 210,292
                  C 204,292 202,286 206,284
                  C 214,280 230,274 246,270
                  C 260,266 272,268 284,272
                  C 294,275 304,280 316,282
                  C 334,284 352,296 366,312
                  C 346,314 322,306 302,302
                  C 282,298 262,296 244,296
                  C 230,296 218,294 210,292
                  Z"
                fill="url(#bronzeReliefGrad)"
                stroke="#201205"
                strokeWidth="1.2"
              />
              {/* Thumb top edge highlight */}
              <path
                d="M 207,285 C 215,281 230,275 246,271 C 260,267 272,269 284,273"
                fill="none"
                stroke="#fff3d6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Thumb squarish fingernail with rounded corners */}
              <path
                d="M 210,285 C 214,283 220,282 225,282 C 226,286 225,290 224,293 C 218,293 213,292 210,290 Z"
                fill="url(#bronzeHighlightGrad)"
                stroke="#1e1005"
                strokeWidth="0.9"
              />
              {/* Thumb joint skin creases (IP joint) right behind fingernail */}
              <path d="M 233,277 C 234,283 234,288 232,294" fill="none" stroke="#251608" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 238,276 C 239,282 239,287 237,293" fill="none" stroke="#251608" strokeWidth="1.1" strokeLinecap="round" />

              {/* Thenar palm creases (curved fold at base of thumb) */}
              <path
                d="M 312,284 C 324,290 338,300 348,308"
                fill="none"
                stroke="#221306"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M 326,284 C 334,290 342,298 348,304"
                fill="none"
                stroke="#221306"
                strokeWidth="0.9"
                strokeLinecap="round"
              />

              {/* Dorsal wrist and hand top highlight crest */}
              <path
                d="M 305,166 C 332,170 356,198 376,236"
                fill="none"
                stroke="#fae7b5"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.95"
              />
              {/* Dorsal hand skin and muscle form line */}
              <path
                d="M 296,182 C 318,192 338,214 354,242"
                fill="none"
                stroke="#f6dda2"
                strokeWidth="0.8"
                opacity="0.75"
              />

              {/* Deep web space crease between index and thumb */}
              <path
                d="M 276,220 C 274,234 272,248 274,260"
                fill="none"
                stroke="#190e04"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Subtle Bronze Patina & Coin Wear Lines across Hand Surface */}
              <g opacity="0.4" stroke="#1c0f04" strokeWidth="0.7">
                <line x1="280" y1="210" x2="295" y2="204" />
                <line x1="270" y1="240" x2="282" y2="236" />
                <line x1="330" y1="260" x2="342" y2="254" />
              </g>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* 7. KINETIC DUAL-WAVE SWEEP DIRECTLY BELOW HAND (as in screenshot)        */}
          {/* ========================================================================= */}
          <g id="coin-kinetic-wave" filter="url(#reliefUndercutShadow)">
            {/* Upper sweeping bronze ribbon */}
            <path
              d="
                M 130,302
                C 170,300 220,314 265,322
                C 310,330 350,324 378,312
                C 350,328 306,334 260,326
                C 216,318 168,306 130,302
                Z"
              fill="url(#bronzeReliefGrad)"
              stroke="#1e1005"
              strokeWidth="1.1"
            />
            <path
              d="M 130,302 C 170,300 220,314 265,322 C 310,330 350,324 378,312"
              fill="none"
              stroke="#fff3d6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Lower secondary parallel wave ribbon */}
            <path
              d="
                M 165,316
                C 200,316 240,328 275,334
                C 315,340 348,336 370,326
                C 346,338 312,342 272,336
                C 238,330 198,320 165,316
                Z"
              fill="url(#bronzeReliefGrad)"
              stroke="#1e1005"
              strokeWidth="0.9"
            />
            <path
              d="M 165,316 C 200,316 240,328 275,334 C 315,340 348,336 370,326"
              fill="none"
              stroke="#f6dda2"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>

          {/* ========================================================================= */}
          {/* 8. CENTRAL EMBOSSED STAUNTON CHESS PAWN (Levitating Beneath Pinch Wave)  */}
          {/* ========================================================================= */}
          <g id="coin-staunton-pawn" filter="url(#reliefUndercutShadow)">
            <path
              d="M 235,326 A 15,15 0 1,1 265,326 A 15,15 0 0,1 235,326 Z
                 M 238,340 L 262,340 L 260,347 L 240,347 Z
                 M 240,347 C 240,358 246,366 250,372 C 254,366 260,358 260,347 Z
                 M 234,372 L 266,372 L 268,379 L 232,379 Z
                 M 226,379 L 274,379 L 276,392 L 224,392 Z"
              fill="#120802"
            />
            <circle cx="250" cy="326" r="15.5" fill="url(#bronzeReliefGrad)" stroke="#1c0f04" strokeWidth="1.4" />
            <circle cx="245" cy="322" r="6" fill="#fff4d6" opacity="0.45" filter="blur(2px)" />
            <path
              d="M 238,341 Q 250,339 262,341 L 260,347 Q 250,345 240,347 Z"
              fill="url(#bronzeReliefGrad)"
              stroke="#1c0f04"
              strokeWidth="1.2"
            />
            <line x1="239" y1="341" x2="261" y2="341" stroke="#fff2d0" strokeWidth="1.2" />
            <path
              d="M 240,347 C 240,358 244,366 249,372 L 251,372 C 256,366 260,358 260,347 Z"
              fill="url(#bronzeReliefGrad)"
              stroke="#1c0f04"
              strokeWidth="1.2"
            />
            <path d="M 248,349 C 247,357 248,365 250,370" fill="none" stroke="#fff4d6" strokeWidth="1.4" strokeLinecap="round" />
            <ellipse cx="250" cy="372" rx="17" ry="4.5" fill="url(#bronzeReliefGrad)" stroke="#1c0f04" strokeWidth="1.2" />
            <path d="M 235,371 Q 250,368 265,371" fill="none" stroke="#fff4d6" strokeWidth="1.4" />
            <path
              d="M 228,377 Q 250,374 272,377 L 275,390 Q 250,393 225,390 Z"
              fill="url(#bronzeReliefGrad)"
              stroke="#1c0f04"
              strokeWidth="1.4"
            />
            <path d="M 230,378 Q 250,375 270,378" fill="none" stroke="#fff4d6" strokeWidth="1.4" />
            <path d="M 226,390 Q 250,393 274,390" fill="none" stroke="#fff4d6" strokeWidth="1" opacity="0.8" />
          </g>
        </svg>
      ) : null}
    </div>
  );
};
