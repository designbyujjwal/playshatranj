import React from 'react';
import type { ControlMode } from '../types';

interface WoodcutControlIconProps {
  type: ControlMode;
  className?: string;
}

/**
 * 16th-Century Woodcut Astrolabe Printer's Mark for Command Interfaces
 * Provides a unified astronomical/cartographic circular frame for:
 * - 'mouse': Cartographer's Quill & Drafting Pointer
 * - 'virtual': Anatomical Spatial Gesture Hand & Palmistry Anchor
 * - 'voice': Classical Acoustic Resonance Vessel & Speech Arcs
 */
export const WoodcutControlIcon: React.FC<WoodcutControlIconProps> = ({ type, className = '' }) => {
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
          <radialGradient id={`inkBleedControl-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#3d1d07" stopOpacity="0.95" />
            <stop offset="90%" stopColor="#5a2c0c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7a3f12" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* 1. Universal Outer Engraved Ring with Stippled Astrolabe Hash Marks */}
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

        {/* 2. Command-Specific Woodcut Engraving */}
        {type === 'mouse' && (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Cartographer's Quill Nib & Arrow Pointer */}
            <path
              d="M 44,76 L 56,40 L 76,60 L 64,66 L 76,82 L 68,88 L 56,72 Z"
              strokeWidth="1.8"
              opacity="0.9"
            />
            <line x1="56" y1="40" x2="62" y2="58" strokeWidth="1.2" opacity="0.7" />
            <circle cx="56" cy="40" r="1.5" fill="currentColor" />
            {/* Pointer Shading Hatching */}
            <line x1="58" y1="67" x2="62" y2="71" strokeWidth="0.9" opacity="0.5" />
            <line x1="61" y1="71" x2="65" y2="75" strokeWidth="0.9" opacity="0.5" />
            <line x1="64" y1="75" x2="68" y2="79" strokeWidth="0.9" opacity="0.5" />
          </g>
        )}

        {type === 'virtual' && (
          <g transform="translate(60, 60) scale(0.72) translate(-80, -80)">
            {/* Radiating Spatial Tracking Rays */}
            <g stroke="currentColor" strokeWidth="1.1" strokeDasharray="2,3" opacity="0.6">
              <line x1="62" y1="48" x2="48" y2="34" />
              <line x1="74" y1="42" x2="74" y2="24" />
              <line x1="86" y1="44" x2="94" y2="28" />
              <line x1="97" y1="52" x2="114" y2="38" />
              <line x1="50" y1="76" x2="34" y2="72" />
            </g>

            {/* Classical Woodblock Anatomical Hand Silhouette */}
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
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

              {/* Palm Creases & Palmistry Lines */}
              <path d="M 64,88 Q 76,96 92,90" strokeWidth="1.2" opacity="0.75" />
              <path d="M 68,96 Q 78,104 86,108" strokeWidth="1" opacity="0.6" />
              <path d="M 72,78 Q 78,86 86,88" strokeWidth="1" opacity="0.6" />

              {/* Knuckle Joint Hash Marks */}
              <line x1="68" y1="62" x2="72" y2="62" strokeWidth="1" opacity="0.7" />
              <line x1="76" y1="56" x2="80" y2="56" strokeWidth="1" opacity="0.7" />
              <line x1="84" y1="58" x2="88" y2="58" strokeWidth="1" opacity="0.7" />
              <line x1="92" y1="66" x2="96" y2="66" strokeWidth="1" opacity="0.7" />
            </g>

            {/* Central Guiding Star in Palm (Spatial Anchor) */}
            <g fill="currentColor" opacity="0.85">
              <polygon points="80,91 81.5,95 86,96 82,98 83,103 80,99.5 77,103 78,98 74,96 78.5,95" />
            </g>

            {/* Classical Hatching Underneath Wrist */}
            <g stroke="currentColor" strokeWidth="0.9" opacity="0.5">
              <line x1="60" y1="120" x2="100" y2="120" />
              <line x1="65" y1="123" x2="95" y2="123" />
              <line x1="72" y1="126" x2="88" y2="126" />
            </g>
          </g>
        )}

        {type === 'voice' && (
          <g transform="translate(60, 60) scale(0.72) translate(-80, -80)">
            {/* Radiating Acoustic Resonance Waves */}
            <g fill="none" stroke="currentColor" strokeLinecap="round" opacity="0.85">
              <path d="M 52,62 C 45,72 45,88 52,98" strokeWidth="2.2" />
              <path d="M 42,54 C 32,68 32,92 42,106" strokeWidth="1.6" strokeDasharray="3,2" />
              <path d="M 32,46 C 20,64 20,96 32,114" strokeWidth="1.2" />

              <path d="M 108,62 C 115,72 115,88 108,98" strokeWidth="2.2" />
              <path d="M 118,54 C 128,68 128,92 118,106" strokeWidth="1.6" strokeDasharray="3,2" />
              <path d="M 128,46 C 140,64 140,96 128,114" strokeWidth="1.2" />
            </g>

            {/* Central Heraldic Acoustic Vessel & Speech Glyph */}
            <g fill="currentColor" opacity="0.92">
              {/* Central Capsule */}
              <rect x="73" y="52" width="14" height="26" rx="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
              {/* Inner Ink Shading Lines */}
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

            {/* Top Celestial Illumination Star */}
            <g fill="currentColor" opacity="0.85">
              <polygon points="80,36 82,42 88,44 82,46 80,52 78,46 72,44 78,42" />
            </g>

            {/* Classical Hatching Underneath Base */}
            <g stroke="currentColor" strokeWidth="0.9" opacity="0.5">
              <line x1="60" y1="112" x2="100" y2="112" />
              <line x1="65" y1="115" x2="95" y2="115" />
              <line x1="72" y1="118" x2="88" y2="118" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
