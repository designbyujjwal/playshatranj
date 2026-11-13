import xml.etree.ElementTree as ET

svg_content = '''<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 750 150"
  width="750"
  height="150"
  fill="none"
>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&amp;display=swap');
      .shatranj-title {
        font-family: 'Cinzel', Georgia, serif;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-rendering: geometricPrecision;
      }

      /* Slow, majestic curtain droop breath */
      @keyframes curtainGentleBreathe {
        0% { transform: translateY(0) scaleY(1); }
        50% { transform: translateY(-0.8px) scaleY(0.996); }
        100% { transform: translateY(0) scaleY(1); }
      }

      @keyframes curtainPleatShift {
        0% { opacity: 0.15; transform: translateX(-30px); }
        50% { opacity: 0.28; }
        100% { opacity: 0.15; transform: translateX(30px); }
      }

      @keyframes frayedThreadWave {
        0% { transform: skewX(0deg); }
        50% { transform: skewX(-1.5deg); }
        100% { transform: skewX(0deg); }
      }

      .animate-curtain-cloth {
        animation: curtainGentleBreathe 12.0s ease-in-out infinite;
        transform-origin: center top;
      }

      .animate-threads {
        animation: frayedThreadWave 7.0s ease-in-out infinite;
        transform-origin: top;
      }
    </style>

    <!-- Deep Ambient Elevation Shadow for the hanging cloth -->
    <filter id="curtainElevationShadow" x="-5%" y="-20%" width="110%" height="150%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.85" />
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.5" />
    </filter>

    <!-- Text & Badge Crisp Shadow (Ensures high readability against dark velvet) -->
    <filter id="logoCrispShadow" x="-10%" y="-20%" width="120%" height="140%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="2.8" flood-color="#000000" flood-opacity="0.9" />
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#140001" flood-opacity="0.75" />
    </filter>

    <!-- Soft Vertical Flute Blur -->
    <filter id="fluteBlur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3.5" />
    </filter>

    <!-- Rich Crimson Velvet Base Gradient with subtle horizontal variation -->
    <linearGradient id="fabricBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#240002" />
      <stop offset="8%" stop-color="#420105" />
      <stop offset="20%" stop-color="#6f0207" />
      <stop offset="35%" stop-color="#8c040b" />
      <stop offset="50%" stop-color="#550206" />
      <stop offset="65%" stop-color="#8c040b" />
      <stop offset="80%" stop-color="#6f0207" />
      <stop offset="92%" stop-color="#420105" />
      <stop offset="100%" stop-color="#240002" />
    </linearGradient>

    <!-- Vertical Curtain Shading: Dark top gathered shadow + Bottom soot/fade -->
    <linearGradient id="curtainVerticalShade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#050001" stop-opacity="0.95" />
      <stop offset="10%" stop-color="#120002" stop-opacity="0.55" />
      <stop offset="25%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.02" />
      <stop offset="88%" stop-color="#100001" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#050000" stop-opacity="0.95" />
    </linearGradient>

    <!-- Gold Trim Gradient matching reference image -->
    <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#feeaa7" />
      <stop offset="30%" stop-color="#deb44d" />
      <stop offset="70%" stop-color="#a6731e" />
      <stop offset="100%" stop-color="#6b460d" />
    </linearGradient>

    <!-- Deep Crimson Velvet Badge Gradient matching reference image -->
    <radialGradient id="badgeCrimsonGrad" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#820b10" />
      <stop offset="55%" stop-color="#4f0105" />
      <stop offset="100%" stop-color="#220002" />
    </radialGradient>

    <!-- Peach-Rose-Gold Knight Silhouette Gradient matching reference image -->
    <linearGradient id="knightBodyGrad" x1="25%" y1="0%" x2="75%" y2="100%">
      <stop offset="0%" stop-color="#fde0ce" />
      <stop offset="28%" stop-color="#f5ba99" />
      <stop offset="68%" stop-color="#d9865d" />
      <stop offset="100%" stop-color="#9a4d29" />
    </linearGradient>

    <!-- Knight Neck Muscle Shading matching reference image -->
    <linearGradient id="knightShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#460508" stop-opacity="0.88" />
      <stop offset="100%" stop-color="#220002" stop-opacity="0.95" />
    </linearGradient>

    <!-- Pearlescent Silver-White SHATRANJ Lettering Gradient matching reference image -->
    <linearGradient id="silverTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#f8f6f2" />
      <stop offset="65%" stop-color="#e2e4e8" />
      <stop offset="90%" stop-color="#c5c8d0" />
      <stop offset="100%" stop-color="#9ea2ac" />
    </linearGradient>

    <!-- Battle-Torn Drooping Curtain Boundary (Taller 150px height!) -->
    <clipPath id="curtainClothClip">
      <path
        d="
          M 78,16
          C 135,15.5 210,16 375,15.5 C 540,16 615,15.5 672,16
          C 678,20 682,26 676,34
          C 668,40 655,44 650,52
          C 644,60 658,66 669,74
          C 678,80 684,88 676,96
          C 668,102 654,106 658,114
          C 664,120 670,126 664,132
          L 656,128 L 646,142 L 630,126 L 616,144 L 598,124 L 582,143 L 566,126 L 550,145 L 536,125 L 522,144 L 508,124 L 496,143 L 480,125 L 462,142 L 440,127 L 422,142 L 400,126 L 380,141 L 358,126 L 340,142 L 322,127 L 306,141 L 288,126 L 270,140 L 252,128 L 234,141 L 218,126 L 202,139 L 184,127 L 166,140 L 150,126 L 136,138 L 118,128 L 106,137 L 92,126 L 76,132
          C 68,124 62,116 66,108
          C 74,100 80,94 72,86
          C 64,80 58,72 64,64
          C 72,56 78,50 70,42
          C 62,34 68,24 74,18
          Z
        "
      />
    </clipPath>

    <!-- Master Chess Knight Badge Definition (Matching user reference image exactly) -->
    <g id="shatranjBadge">
      <!-- Outer Squircle with Thin Gold Border -->
      <rect
        x="0"
        y="0"
        width="58"
        height="58"
        rx="13"
        fill="url(#badgeCrimsonGrad)"
        stroke="url(#goldRimGrad)"
        stroke-width="2.2"
      />
      <!-- Subtle Inner Gold Filigree Bevel -->
      <rect
        x="2.4"
        y="2.4"
        width="53.2"
        height="53.2"
        rx="11"
        fill="none"
        stroke="#ffffff"
        stroke-width="0.6"
        opacity="0.18"
      />

      <!-- Chess Knight Silhouette (Facing Left with Pedestal Base) -->
      <g transform="translate(10, 8.5) scale(0.68)">
        <!-- Horizontal Base Pedestal -->
        <rect x="5" y="52" width="46" height="7.5" rx="1.2" fill="url(#knightBodyGrad)" />
        <rect x="7" y="50" width="42" height="2.5" rx="0.8" fill="url(#knightBodyGrad)" />

        <!-- Knight Head & Arching Neck (Facing Left) -->
        <path
          d="
            M 46,49
            C 45.5,35 42,22 31.5,13
            C 29.5,11 26,8 23.5,6
            L 21.5,5.5
            L 19,10.5
            C 16,12 13,14 10.5,17
            L 4.5,27
            C 3.2,29.5 4,32.5 6.5,34
            L 12,36
            L 18,29.5
            C 20.5,30 21.5,33 18,37.5
            C 15,40.5 13.5,45 14,49
            Z
          "
          fill="url(#knightBodyGrad)"
        />

        <!-- Neck muscle shadow indent (curved inner shadow from reference image) -->
        <path
          d="
            M 18,29.5
            C 21,30 21.5,33 18,37.5
            C 15.5,40.5 14,44.5 14.5,49
            L 22,49
            C 22,43 24.5,38 27,35
            C 29.5,31 28.5,27.5 24,28
            Z
          "
          fill="url(#knightShadowGrad)"
          opacity="0.7"
        />

        <!-- Mane notches on crest -->
        <path
          d="M 31.5,13 L 28,17.5 M 37,21 L 33,26 M 41,30 L 37,35 M 44,39 L 40,44"
          stroke="#fde8dc"
          stroke-width="1.3"
          stroke-linecap="round"
          opacity="0.45"
        />
      </g>
    </g>
  </defs>

  <!-- =========================================================================
       1. HANGING CURTAIN / BATTLE BANNER CLOTH BODY:
       ========================================================================= -->
  <g id="curtain-banner-group" filter="url(#curtainElevationShadow)" class="animate-curtain-cloth">
    <!-- CLIPPED CLOTH BODY -->
    <g clip-path="url(#curtainClothClip)">
      <!-- 1. Deep Royal Crimson Velvet Fill -->
      <rect x="50" y="10" width="650" height="140" fill="url(#fabricBaseGrad)" />

      <!-- 2. Gentle Vertical Curtain Flutes (Soft columnar drapery folds, NO diagonal flips) -->
      <g filter="url(#fluteBlur)" opacity="0.6">
        <!-- Vertical Crease Valleys (Shadow Flutes hanging downward) -->
        <path d="M 125,16 L 124,136" stroke="#0e0001" stroke-width="14" />
        <path d="M 180,16 L 179,136" stroke="#0e0001" stroke-width="12" />
        <path d="M 235,16 L 234,136" stroke="#0e0001" stroke-width="15" />
        <path d="M 300,16 L 299,136" stroke="#0e0001" stroke-width="12" />
        <path d="M 375,16 L 375,136" stroke="#0e0001" stroke-width="10" opacity="0.5" />
        <path d="M 450,16 L 451,136" stroke="#0e0001" stroke-width="12" />
        <path d="M 515,16 L 516,136" stroke="#0e0001" stroke-width="15" />
        <path d="M 570,16 L 571,136" stroke="#0e0001" stroke-width="12" />
        <path d="M 625,16 L 626,136" stroke="#0e0001" stroke-width="14" />

        <!-- Vertical Crease Crests (Soft Highlight Ribs between the valleys) -->
        <path d="M 152,16 L 152,136" stroke="#ff9ca3" stroke-width="5" opacity="0.22" />
        <path d="M 207,16 L 207,136" stroke="#ff9ca3" stroke-width="4.5" opacity="0.20" />
        <path d="M 268,16 L 268,136" stroke="#ff9ca3" stroke-width="5.5" opacity="0.22" />
        <path d="M 337,16 L 337,136" stroke="#ff9ca3" stroke-width="4" opacity="0.18" />
        <path d="M 412,16 L 412,136" stroke="#ff9ca3" stroke-width="4" opacity="0.18" />
        <path d="M 482,16 L 482,136" stroke="#ff9ca3" stroke-width="5.5" opacity="0.22" />
        <path d="M 542,16 L 542,136" stroke="#ff9ca3" stroke-width="4.5" opacity="0.20" />
        <path d="M 598,16 L 598,136" stroke="#ff9ca3" stroke-width="5" opacity="0.22" />
      </g>

      <!-- 3. Vertical Curtain Shading Overlay (Top gathering shadow and bottom grime) -->
      <rect x="50" y="12" width="650" height="138" fill="url(#curtainVerticalShade)" />
    </g>

    <!-- Scorched Edge Rim on the shredded bottom hem and sides -->
    <path
      d="
        M 78,16
        C 135,15.5 210,16 375,15.5 C 540,16 615,15.5 672,16
        C 678,20 682,26 676,34
        C 668,40 655,44 650,52
        C 644,60 658,66 669,74
        C 678,80 684,88 676,96
        C 668,102 654,106 658,114
        C 664,120 670,126 664,132
        L 656,128 L 646,142 L 630,126 L 616,144 L 598,124 L 582,143 L 566,126 L 550,145 L 536,125 L 522,144 L 508,124 L 496,143 L 480,125 L 462,142 L 440,127 L 422,142 L 400,126 L 380,141 L 358,126 L 340,142 L 322,127 L 306,141 L 288,126 L 270,140 L 252,128 L 234,141 L 218,126 L 202,139 L 184,127 L 166,140 L 150,126 L 136,138 L 118,128 L 106,137 L 92,126 L 76,132
        C 68,124 62,116 66,108
        C 74,100 80,94 72,86
        C 64,80 58,72 64,64
        C 72,56 78,50 70,42
        C 62,34 68,24 74,18
        Z
      "
      fill="none"
      stroke="#120002"
      stroke-width="1.2"
      opacity="0.9"
    />

    <!-- Fine Hanging Frayed Threads at Bottom Hem -->
    <g class="animate-threads" stroke="#c0262c" stroke-width="0.8" stroke-linecap="round" opacity="0.85">
      <path d="M 136,138 L 135,146" />
      <path d="M 184,127 L 185,143" stroke="#8a1015" />
      <path d="M 234,141 L 233,148" />
      <path d="M 306,141 L 307,149" stroke="#8a1015" />
      <path d="M 380,141 L 380,149" />
      <path d="M 462,142 L 463,150" stroke="#8a1015" />
      <path d="M 522,144 L 521,151" />
      <path d="M 582,143 L 583,150" stroke="#8a1015" />
      <path d="M 646,142 L 647,150" />
    </g>

    <!-- =========================================================================
         2. HERALDIC BADGES AND "SHATRANJ" TYPOGRAPHY:
         Matching the user's reference image with 100% fidelity:
         - Left Badge: Squircle, thin gold border, dark crimson velvet, peach-gold knight
         - Center: "SHATRANJ" in regal Roman serif with large initial 'S' and descending 'J'
         - Right Badge: Identical squircle with peach-gold knight facing left
         ========================================================================= -->
    <g id="heraldic-branding-layer" filter="url(#logoCrispShadow)">
      <!-- Left Golden Knight Badge (from reference image) -->
      <g id="badge-left" transform="translate(108, 46)">
        <use href="#shatranjBadge" />
      </g>

      <!-- Center SHATRANJ Title (from reference image) -->
      <g id="shatranj-title-group">
        <text
          x="375"
          y="86"
          text-anchor="middle"
          fill="url(#silverTextGrad)"
          stroke="#3d2012"
          stroke-width="0.6"
          class="shatranj-title"
        >
          <tspan font-size="48" dy="-2">S</tspan>
          <tspan font-size="40" dy="2">HATRAN</tspan>
          <tspan font-size="46" dy="2">J</tspan>
        </text>
      </g>

      <!-- Right Golden Knight Badge (from reference image) -->
      <g id="badge-right" transform="translate(584, 46)">
        <use href="#shatranjBadge" />
      </g>
    </g>
  </g>
</svg>'''

root = ET.fromstring(svg_content)
print("Curtain SVG is valid XML! Element count:", len(list(root.iter())))

with open('public/shatranj-logo.svg', 'w') as f:
    f.write(svg_content)
print("Wrote public/shatranj-logo.svg successfully!")
