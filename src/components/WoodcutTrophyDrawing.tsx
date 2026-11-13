import React from 'react';

interface WoodcutTrophyDrawingProps {
  className?: string;
  isDraw?: boolean;
}

/**
 * 16th-Century Intaglio Woodcut Engraving of a Grand Imperial Chess Championship Cup
 * Styled in the exact manner of vintage academy bookplates and heraldic crests (like Eldermyst):
 * - Circular heraldic frame with concentric etched rings, celestial stars, and botanical crest
 * - Grand baroque chalice with crown finial, radiant sunbeams, and acanthus leaf handles
 * - High-density cross-hatching, stippling, and volumetric chiaroscuro shadow gradients
 * - Flanking laurel wreath branches with leaf venation
 * - Flowing swallowtail ribbon scroll at base with classical roman lettering
 * - True ink-bleed dispersion filter simulating antique hand-pressed paper print
 */
export const WoodcutTrophyDrawing: React.FC<WoodcutTrophyDrawingProps> = ({
  className = '',
  isDraw = false,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 250 250"
        className="w-36 h-36 sm:w-44 sm:h-44 overflow-visible text-[#351806]"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          {/* Authentic woodcut ink bleed / deckle edge filter */}
          <filter id="woodcutInkBleed" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.65" />
          </filter>

          {/* Arched path for the ribbon text */}
          <path
            id="trophyBannerArc"
            d="M 48,229.5 Q 125,244 202,229.5"
            fill="none"
          />
        </defs>

        <g filter="url(#woodcutInkBleed)">
          {/* ========================================================= */}
          {/* 1. CIRCULAR HERALDIC CREST ENCLOSURE (matching reference)  */}
          {/* ========================================================= */}

          {/* Outer Fine Linework Framing Rings */}
          <circle cx="125" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="125" cy="120" r="108" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3,2.5" />
          <circle cx="125" cy="120" r="104" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />

          {/* Celestial Stars & Dots in Outer Arc (matching Eldermyst stars) */}
          <g fill="currentColor" opacity="0.85">
            {/* Top apex star */}
            <path d="M 125,10 L 126.5,14.5 L 131,16 L 126.5,17.5 L 125,22 L 123.5,17.5 L 119,16 L 123.5,14.5 Z" />
            {/* Left stars */}
            <path d="M 85,19 L 86,22 L 89,23 L 86,24 L 85,27 L 84,24 L 81,23 L 84,22 Z" transform="scale(0.85) translate(15, 3)" />
            <path d="M 52,38 L 53,40.5 L 55.5,41.5 L 53,42.5 L 52,45 L 51,42.5 L 48.5,41.5 L 51,40.5 Z" transform="scale(0.8) translate(12, 8)" />
            <path d="M 30,68 L 31,70 L 33,71 L 31,72 L 30,74 L 29,72 L 27,71 L 29,70 Z" />
            <circle cx="68" cy="24" r="1.1" />
            <circle cx="102" cy="14" r="0.9" />
            <circle cx="39" cy="52" r="1" />
            <circle cx="24" cy="88" r="0.8" />

            {/* Right stars */}
            <path d="M 165,19 L 166,22 L 169,23 L 166,24 L 165,27 L 164,24 L 161,23 L 164,22 Z" transform="scale(0.85) translate(28, 3)" />
            <path d="M 198,38 L 199,40.5 L 201.5,41.5 L 199,42.5 L 198,45 L 197,42.5 L 194.5,41.5 L 197,40.5 Z" transform="scale(0.8) translate(46, 8)" />
            <path d="M 220,68 L 221,70 L 223,71 L 221,72 L 220,74 L 219,72 L 217,71 L 219,70 Z" />
            <circle cx="148" cy="14" r="0.9" />
            <circle cx="182" cy="24" r="1.1" />
            <circle cx="211" cy="52" r="1" />
            <circle cx="226" cy="88" r="0.8" />
          </g>

          {/* ========================================================= */}
          {/* 2. RADIANT HALO & SUNBURST RAYS                           */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="0.75" opacity="0.38" strokeDasharray="3,2.5">
            <line x1="125" y1="28" x2="125" y2="40" />
            <line x1="140" y1="30" x2="135" y2="42" />
            <line x1="110" y1="30" x2="115" y2="42" />
            <line x1="154" y1="36" x2="144" y2="46" />
            <line x1="96" y1="36" x2="106" y2="46" />
            <line x1="168" y1="46" x2="152" y2="54" />
            <line x1="82" y1="46" x2="98" y2="54" />
            <line x1="178" y1="60" x2="160" y2="66" />
            <line x1="72" y1="60" x2="90" y2="66" />
          </g>

          {/* ========================================================= */}
          {/* 3. LAUREL WREATH BRANCHES (Embracing the Chalice)         */}
          {/* ========================================================= */}
          <g stroke="currentColor" fill="none" strokeWidth="1.1" opacity="0.8">
            {/* Left Branch Stem */}
            <path d="M 48,188 C 30,148 34,92 56,52" strokeWidth="1.2" />
            {/* Left Leaves with detailed central rib and cross-hatching */}
            <path d="M 46,174 C 34,170 30,162 37,157 C 44,152 48,164 46,174 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 40,154 C 26,148 24,138 32,134 C 40,130 44,142 40,154 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 37,128 C 23,122 23,112 31,108 C 39,104 42,116 37,128 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 39,102 C 26,94 28,84 36,81 C 44,78 45,90 39,102 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 45,78 C 34,70 38,60 46,58 C 54,56 52,68 45,78 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 56,56 C 49,46 56,38 64,38 C 72,38 68,50 56,56 Z" fill="#f8f2e7" strokeWidth="1" />

            {/* Right Branch Stem */}
            <path d="M 202,188 C 220,148 216,92 194,52" strokeWidth="1.2" />
            {/* Right Leaves */}
            <path d="M 204,174 C 216,170 220,162 213,157 C 206,152 202,164 204,174 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 210,154 C 224,148 226,138 218,134 C 210,130 206,142 210,154 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 213,128 C 227,122 227,112 219,108 C 211,104 208,116 213,128 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 211,102 C 224,94 222,84 214,81 C 206,78 205,90 211,102 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 205,78 C 216,70 212,60 204,58 C 196,56 198,68 205,78 Z" fill="#f8f2e7" strokeWidth="1" />
            <path d="M 194,56 C 201,46 194,38 186,38 C 178,38 182,50 194,56 Z" fill="#f8f2e7" strokeWidth="1" />
          </g>

          {/* ========================================================= */}
          {/* 4. TROPHY LID & CROWN FINIAL                               */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="1.2" fill="#f8f2e7">
            {/* Crown Finial Cross Pattée */}
            <path
              d="
                M 125,24
                L 126.5,27 L 131,26 L 129.5,30 L 133,32.5 L 129.5,33.5 L 131,37.5 L 126.5,36.5 L 125,40
                L 123.5,36.5 L 119,37.5 L 120.5,33.5 L 117,32.5 L 120.5,30 L 119,26 L 123.5,27
                Z
              "
              fill="currentColor"
            />
            {/* Center Pearl on finial */}
            <circle cx="125" cy="32" r="1.6" fill="#f8f2e7" />

            {/* Finial Pedestal Collar */}
            <rect x="121" y="40" width="8" height="3" rx="0.8" fill="#f8f2e7" strokeWidth="1" />

            {/* Domed Trophy Lid */}
            <path
              d="
                M 82,56
                C 82,47 100,43 125,43
                C 150,43 168,47 168,56
                Z
              "
              fill="#f8f2e7"
              strokeWidth="1.3"
            />
            {/* Lid Acanthus Fluting & Hatching */}
            <g stroke="currentColor" strokeWidth="0.8" opacity="0.65">
              <line x1="125" y1="43" x2="125" y2="56" />
              <line x1="135" y1="44" x2="138" y2="56" />
              <line x1="145" y1="46" x2="151" y2="56" />
              <line x1="155" y1="49" x2="162" y2="56" />
              <line x1="115" y1="44" x2="112" y2="56" />
              <line x1="105" y1="46" x2="99" y2="56" />
              <line x1="95" y1="49" x2="88" y2="56" />
            </g>

            {/* Lid Lip Trim Ring */}
            <rect x="80" y="56" width="90" height="4.5" rx="1.2" fill="#ede0c7" strokeWidth="1.2" />
          </g>

          {/* ========================================================= */}
          {/* 5. TROPHY MAIN CHALICE BODY (Volumetric Engraving)        */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="1.4" fill="#f8f2e7">
            {/* Cup Upper Rim Ellipse */}
            <ellipse cx="125" cy="62" rx="46" ry="6.5" />
            <ellipse cx="125" cy="62" rx="42" ry="4.8" fill="#e9dbbd" opacity="0.5" strokeWidth="0.8" />

            {/* Chalice Body Contour */}
            <path
              d="
                M 79,62
                C 79,98 88,136 112,150
                C 116,152.5 120,154 125,154
                C 130,154 134,152.5 138,150
                C 162,136 171,98 171,62
                Z
              "
              fill="#f8f2e7"
            />
          </g>

          {/* Heavy Chiaroscuro Cross-Hatching (Right Side & Underside) */}
          <g stroke="currentColor" strokeWidth="0.8" opacity="0.75">
            {/* Primary diagonal shade lines */}
            <line x1="168" y1="70" x2="150" y2="76" />
            <line x1="170" y1="80" x2="146" y2="88" />
            <line x1="169" y1="90" x2="142" y2="100" />
            <line x1="166" y1="100" x2="138" y2="112" />
            <line x1="161" y1="112" x2="134" y2="124" />
            <line x1="154" y1="124" x2="129" y2="136" />
            <line x1="145" y1="135" x2="124" y2="146" />
            <line x1="135" y1="145" x2="120" y2="152" />

            {/* Cross-hatching counter-slants */}
            <line x1="150" y1="70" x2="168" y2="78" />
            <line x1="144" y1="82" x2="169" y2="92" />
            <line x1="140" y1="96" x2="165" y2="108" />
            <line x1="134" y1="110" x2="158" y2="124" />
            <line x1="128" y1="124" x2="148" y2="138" />

            {/* Left Side Curved Contour Reflections */}
            <path d="M 83,72 C 83,96 89,120 102,134" fill="none" strokeWidth="0.7" opacity="0.6" />
            <path d="M 87,74 C 87,96 93,116 104,128" fill="none" strokeWidth="0.6" opacity="0.5" />
          </g>

          {/* ========================================================= */}
          {/* 6. CENTRAL HERALDIC CARTOUCHE ON THE CHALICE             */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            {/* Outer Oval Medallion */}
            <ellipse cx="125" cy="100" rx="20" ry="24" fill="#f4ebdc" strokeWidth="1.3" />
            <ellipse cx="125" cy="100" rx="17" ry="21" strokeDasharray="2,2" strokeWidth="0.9" />

            {isDraw ? (
              // Scales of Justice for Draw
              <g stroke="currentColor" strokeWidth="1.2">
                <line x1="125" y1="86" x2="125" y2="114" strokeWidth="1.6" />
                <line x1="114" y1="90" x2="136" y2="90" strokeWidth="1.6" />
                <path d="M 112,90 L 108,102 L 116,102 Z" fill="#e9dbbd" />
                <path d="M 138,90 L 134,102 L 142,102 Z" fill="#e9dbbd" />
              </g>
            ) : (
              // Grandmaster Crowned King Silhouette (ornate Staunton king)
              <g stroke="currentColor" strokeWidth="1.2" fill="#351806">
                {/* Crown Cross */}
                <line x1="125" y1="85" x2="125" y2="92" strokeWidth="1.8" />
                <line x1="121" y1="88" x2="129" y2="88" strokeWidth="1.6" />
                {/* Crown Coronet */}
                <path d="M 118,93 L 121,91 L 125,94 L 129,91 L 132,93 L 130,98 L 120,98 Z" fill="#f8f2e7" />
                {/* Regal Velvet Cap Finial */}
                <circle cx="125" cy="100" r="3.2" fill="#821e25" />
                {/* Stately King Pedestal & Robes */}
                <path d="M 117,114 C 117,106 120,103 125,103 C 130,103 133,106 133,114 Z" fill="#351806" />
                <line x1="114" y1="114" x2="136" y2="114" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* Acanthus Leaf Gadrooning on Lower Bowl */}
          <g stroke="currentColor" strokeWidth="1.1" fill="none">
            <path d="M 102,135 C 108,141 110,148 112,152" />
            <path d="M 112,139 C 116,145 118,150 119,153" />
            <line x1="125" y1="140" x2="125" y2="154" />
            <path d="M 138,139 C 134,145 132,150 131,153" />
            <path d="M 148,135 C 142,141 140,148 138,152" />
          </g>

          {/* ========================================================= */}
          {/* 7. ORNATE BAROQUE SCROLLED HANDLES                        */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
            {/* Left Handle Outer Flourish */}
            <path
              d="
                M 79,70
                C 46,68 42,98 58,118
                C 68,132 82,134 98,136
              "
            />
            {/* Left Handle Inner Loop */}
            <path
              d="
                M 79,77
                C 56,76 54,98 66,114
                C 74,124 84,128 96,131
              "
              strokeWidth="1.2"
              fill="#f8f2e7"
            />
            {/* Left Acanthus Knobs */}
            <circle cx="56" cy="94" r="2.8" fill="currentColor" />
            <circle cx="72" cy="128" r="2.2" fill="currentColor" />

            {/* Right Handle Outer Flourish */}
            <path
              d="
                M 171,70
                C 204,68 208,98 192,118
                C 182,132 168,134 152,136
              "
            />
            {/* Right Handle Inner Loop */}
            <path
              d="
                M 171,77
                C 194,76 196,98 184,114
                C 176,124 166,128 154,131
              "
              strokeWidth="1.2"
              fill="#f8f2e7"
            />
            {/* Right Acanthus Knobs */}
            <circle cx="194" cy="94" r="2.8" fill="currentColor" />
            <circle cx="178" cy="128" r="2.2" fill="currentColor" />
          </g>

          {/* ========================================================= */}
          {/* 8. STEM, KNOP, AND MOULDINGS                              */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="1.3" fill="#f8f2e7">
            {/* Upper knop collar */}
            <rect x="114" y="154" width="22" height="5" rx="1.5" />
            {/* Central carved spherical knop */}
            <ellipse cx="125" cy="166" rx="15" ry="8" />
            {/* Fluting on knop */}
            <line x1="118" y1="160" x2="118" y2="172" strokeWidth="0.8" />
            <line x1="125" y1="158" x2="125" y2="174" strokeWidth="0.9" />
            <line x1="132" y1="160" x2="132" y2="172" strokeWidth="0.8" />
            {/* Lower Stem Neck */}
            <path d="M 117,174 L 115,188 L 135,188 L 133,174 Z" />
            {/* Lower Collar Ring */}
            <rect x="110" y="188" width="30" height="5.5" rx="1.2" />
          </g>

          {/* ========================================================= */}
          {/* 9. SPREADING PEDESTAL PLINTH BASE                         */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="1.4" fill="#f8f2e7">
            {/* Flared Dome Pedestal */}
            <path
              d="
                M 110,193.5
                C 110,202 90,214 82,220
                L 168,220
                C 160,214 140,202 140,193.5
                Z
              "
            />
            {/* Base Step Moulding */}
            <rect x="76" y="220" width="98" height="8.5" rx="1.5" />
            <rect x="70" y="228.5" width="110" height="10" rx="2" fill="#ede0c7" />
          </g>

          {/* Hatching & Inscription on Pedestal Base */}
          <g stroke="currentColor" strokeWidth="0.8" opacity="0.7">
            {/* Plinth shadow cross hatching */}
            <line x1="136" y1="200" x2="154" y2="216" />
            <line x1="142" y1="200" x2="162" y2="216" />
            <line x1="150" y1="202" x2="166" y2="216" />
            <line x1="132" y1="222" x2="168" y2="222" />
            <line x1="132" y1="225" x2="170" y2="225" />
            <line x1="120" y1="232" x2="174" y2="232" />
            <line x1="120" y1="235" x2="174" y2="235" />

            {/* Base Year Inscription */}
            <text
              x="125"
              y="235.5"
              textAnchor="middle"
              className="text-[6.5px] font-cinzel font-extrabold tracking-widest text-[#421d07]"
              fill="#421d07"
            >
              VICTORIA &bull; MMXXVI
            </text>
          </g>

          {/* Ground Platform Shadow Lines */}
          <g stroke="currentColor" strokeWidth="0.8" opacity="0.45">
            <line x1="55" y1="242" x2="195" y2="242" />
            <line x1="70" y1="245" x2="180" y2="245" strokeDasharray="3,2" />
            <line x1="90" y1="248" x2="160" y2="248" strokeDasharray="2,3" />
          </g>

          {/* ========================================================= */}
          {/* 10. ARCHED HERALDIC BANNER SCROLL (Bottom of Circular Crest) */}
          {/* ========================================================= */}
          <g stroke="currentColor" strokeWidth="1.2">
            {/* Left swallowtail ribbon tail */}
            <path
              d="
                M 48,220
                L 28,214
                L 36,224
                L 26,234
                L 48,230
                Z
              "
              fill="#ede0c7"
            />
            {/* Right swallowtail ribbon tail */}
            <path
              d="
                M 202,220
                L 222,214
                L 214,224
                L 224,234
                L 202,230
                Z
              "
              fill="#ede0c7"
            />

            {/* Main Arching Ribbon Banner */}
            <path
              d="
                M 44,220
                Q 125,235 206,220
                L 206,233
                Q 125,248 44,233
                Z
              "
              fill="#f8f2e7"
              strokeWidth="1.3"
            />
            {/* Ribbon Inner Edge Shading Lines */}
            <path d="M 46,222 Q 125,237 204,222" fill="none" strokeWidth="0.6" opacity="0.5" />
            <path d="M 46,231 Q 125,246 204,231" fill="none" strokeWidth="0.6" opacity="0.5" />

            {/* Inscription on Banner: "IMPERIAL GRANDMASTER" */}
            <text
              className="text-[6.2px] font-cinzel font-extrabold uppercase tracking-[0.2em] text-[#3d1a06]"
              fill="#3d1a06"
            >
              <textPath href="#trophyBannerArc" startOffset="50%" textAnchor="middle">
                {isDraw ? '✦ EQUILIBRIUM & TRUCE ✦' : '✦ IMPERIAL GRANDMASTER ✦'}
              </textPath>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
