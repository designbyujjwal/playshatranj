import xml.etree.ElementTree as ET

new_svg = '''<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 750 100"
  width="750"
  height="100"
  fill="none"
>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&amp;display=swap');
      .shatranj-title {
        font-family: 'Cinzel', Georgia, serif;
        font-weight: 400;
        letter-spacing: 0.15em;
        text-rendering: geometricPrecision;
      }

      /* Very slow, subtle, tranquil breeze animations */
      @keyframes clothGentleBreathe {
        0% { transform: translate3d(0, 0, 0) scaleY(1); }
        35% { transform: translate3d(0, -0.6px, 0) scaleY(0.997) skewX(-0.06deg); }
        70% { transform: translate3d(0, 0.4px, 0) scaleY(1.002) skewX(0.05deg); }
        100% { transform: translate3d(0, 0, 0) scaleY(1); }
      }

      @keyframes leftDrapeWind {
        0% { transform: rotate(0deg) translate(0, 0); }
        40% { transform: rotate(-0.4deg) translate(-0.3px, -0.4px); }
        75% { transform: rotate(0.3deg) translate(0.2px, 0.3px); }
        100% { transform: rotate(0deg) translate(0, 0); }
      }

      @keyframes rightTendrilFlutter {
        0% { transform: rotate(0deg) translate(0, 0); }
        35% { transform: rotate(0.5deg) translate(0.4px, -0.5px); }
        70% { transform: rotate(-0.4deg) translate(-0.3px, 0.4px); }
        100% { transform: rotate(0deg) translate(0, 0); }
      }

      @keyframes frayedThreadWave {
        0% { transform: skewX(0deg) translateY(0); }
        35% { transform: skewX(-1.2deg) translateY(-0.4px); }
        70% { transform: skewX(1.0deg) translateY(0.3px); }
        100% { transform: skewX(0deg) translateY(0); }
      }

      @keyframes velvetLusterShift {
        0% { transform: translateX(-200px); opacity: 0.08; }
        50% { opacity: 0.18; }
        100% { transform: translateX(400px); opacity: 0.08; }
      }

      .animate-cloth-flow {
        animation: clothGentleBreathe 14.0s ease-in-out infinite;
        transform-origin: center top;
      }

      .animate-left-tatter {
        animation: leftDrapeWind 9.0s ease-in-out infinite;
        transform-origin: 100px 30px;
      }

      .animate-right-tendrils {
        animation: rightTendrilFlutter 8.0s ease-in-out infinite;
        transform-origin: 580px 40px;
      }

      .animate-threads {
        animation: frayedThreadWave 6.5s ease-in-out infinite;
        transform-origin: center;
      }

      .animate-velvet-luster {
        animation: velvetLusterShift 15.0s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
    </style>

    <filter id="ribbonElevationShadow" x="-5%" y="-40%" width="110%" height="180%">
      <feDropShadow dx="0" dy="4" stdDeviation="4.5" flood-color="#000000" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="-1.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35" />
    </filter>

    <filter id="softCreaseBlur" x="-10%" y="-20%" width="120%" height="140%">
      <feGaussianBlur stdDeviation="1.4" />
    </filter>

    <filter id="deepCreaseBlur" x="-10%" y="-30%" width="120%" height="160%">
      <feGaussianBlur stdDeviation="2.4" />
    </filter>

    <!-- Subtle Embroidery Inset Stitch Depth (Not a detached floating drop shadow) -->
    <filter id="embroideryDepth" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0.9" stdDeviation="0.7" flood-color="#140001" flood-opacity="0.85" />
    </filter>

    <!-- Rich Crimson Velvet Base Gradient with Chiaroscuro -->
    <linearGradient id="fabricBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#240002" />
      <stop offset="6%" stop-color="#3e0104" />
      <stop offset="15%" stop-color="#700207" />
      <stop offset="28%" stop-color="#9e050d" />
      <stop offset="42%" stop-color="#580206" />
      <stop offset="50%" stop-color="#340003" />
      <stop offset="58%" stop-color="#580206" />
      <stop offset="72%" stop-color="#9e050d" />
      <stop offset="85%" stop-color="#700207" />
      <stop offset="94%" stop-color="#3e0104" />
      <stop offset="100%" stop-color="#240002" />
    </linearGradient>

    <!-- Vertical Shading Gradient: Top Rod Shadow + Mid Satin Luster + Bottom Soot Fade -->
    <linearGradient id="fabricVerticalShade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0001" stop-opacity="0.95" />
      <stop offset="6%" stop-color="#120002" stop-opacity="0.75" />
      <stop offset="14%" stop-color="#ffffff" stop-opacity="0.10" />
      <stop offset="38%" stop-color="#ffffff" stop-opacity="0.03" />
      <stop offset="65%" stop-color="#1a0002" stop-opacity="0.15" />
      <stop offset="82%" stop-color="#140001" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#0a0000" stop-opacity="0.92" />
    </linearGradient>

    <!-- Moving Velvet Luster Sheen -->
    <linearGradient id="movingLusterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="30%" stop-color="#ffb8b8" stop-opacity="0.08" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.22" />
      <stop offset="70%" stop-color="#ffb8b8" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>

    <!-- Diagonal Fold Highlight 1 (Upper Sweep) -->
    <linearGradient id="creaseHighlight1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff858d" stop-opacity="0.45" />
      <stop offset="45%" stop-color="#ffb5ba" stop-opacity="0.65" />
      <stop offset="80%" stop-color="#ff858d" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#c42028" stop-opacity="0.1" />
    </linearGradient>

    <!-- Diagonal Fold Shadow 1 (Deep Crevice) -->
    <linearGradient id="creaseShadow1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#100001" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#180002" stop-opacity="0.92" />
      <stop offset="100%" stop-color="#0d0001" stop-opacity="0.95" />
    </linearGradient>

    <!-- Weathered Antique Gold Thread Embroidery Gradient -->
    <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5df8b" />
      <stop offset="30%" stop-color="#d6a540" />
      <stop offset="70%" stop-color="#a8751e" />
      <stop offset="100%" stop-color="#6e4910" />
    </linearGradient>

    <!-- Embroidered Gold Bullion Thread for Badges -->
    <linearGradient id="goldEmbroideredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fae29c" />
      <stop offset="35%" stop-color="#deb04e" />
      <stop offset="70%" stop-color="#ad7b26" />
      <stop offset="100%" stop-color="#734d12" />
    </linearGradient>

    <!-- Embroidered Silver-Gold Thread for SHATRANJ Title -->
    <linearGradient id="silverTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="25%" stop-color="#faeee0" />
      <stop offset="60%" stop-color="#dfcfb8" />
      <stop offset="85%" stop-color="#b59f84" />
      <stop offset="100%" stop-color="#7e654e" />
    </linearGradient>

    <!-- Knight Medallion Silhouette Gradients -->
    <radialGradient id="badgeVelvetBacking" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5a0105" />
      <stop offset="65%" stop-color="#340003" />
      <stop offset="100%" stop-color="#1c0001" />
    </radialGradient>

    <linearGradient id="knightPeachTanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5e6" />
      <stop offset="30%" stop-color="#f5d6ba" />
      <stop offset="70%" stop-color="#dbab85" />
      <stop offset="100%" stop-color="#9a6745" />
    </linearGradient>

    <!-- Reference Standard Organic Battle-Torn Boundary: -->
    <clipPath id="battleTornRibbonClip">
      <path
        d="M 82,16 C 135,15.2 210,15.7 375,15.3 C 540,15.7 615,15.2 668,16 C 675,18 680,21 676,25 C 666,27 652,28 646,32 C 642,36 654,40 668,41 C 682,43 695,48 698,54 C 684,57 672,59 676,64 C 688,68 692,74 685,79 C 678,82 672,84 666,86 L 660,82 L 648,96 L 632,77 L 618,98 L 600,74 L 584,97 L 568,78 L 552,99 L 538,76 L 524,98 L 510,72 L 498,96 L 482,75 L 465,94 L 442,80 L 425,93 L 402,79 L 382,92 L 360,77 L 342,93 L 324,80 L 308,91 L 290,78 L 272,88 L 255,83 L 236,89 L 220,77 L 205,87 L 185,82 L 168,88 L 152,73 L 138,82 L 120,86 L 108,76 L 95,83 L 74,84 C 64,78 54,74 58,68 C 70,64 74,62 66,56 C 54,52 48,46 54,40 C 66,36 72,32 64,26 C 58,22 68,18 76,17 L 82,16 Z"
      />
    </clipPath>

    <!-- Master Knight Medallion Embroidered Graphic Definition -->
    <g id="shatranjBadgeGraphic">
      <!-- Outer stitched gold bullion border -->
      <rect
        x="2"
        y="2"
        width="86"
        height="86"
        rx="22"
        fill="url(#goldEmbroideredGrad)"
        stroke="#240002"
        stroke-width="1.2"
      />
      <!-- Inlaid velvet weave backing -->
      <rect
        x="6.5"
        y="6.5"
        width="77"
        height="77"
        rx="18"
        fill="url(#badgeVelvetBacking)"
      />
      <!-- Inner embroidered filigree rim -->
      <rect
        x="9"
        y="9"
        width="72"
        height="72"
        rx="15"
        fill="none"
        stroke="url(#goldTrimGrad)"
        stroke-width="1.1"
        stroke-dasharray="8,2,4,2"
      />
      <!-- Handcrafted Chess Knight Silhouette (Embroidered Peach/Tan/Gold Thread) -->
      <g transform="translate(1, 0)">
        <!-- Knight body and mane -->
        <path
          d="
            M 44,22.5
            C 44,22.5 45,15 48.5,14
            C 52,13 54.5,17 56,20
            C 58,24 64,23 68,26
            C 72,29 70,34 74,38
            C 77,41 78,46 80,51
            C 82,56 82.5,63 82.5,69.5
            L 20,69.5
            L 20,52
            C 20,44 26,38 31,34
            C 33,32.5 33,26 36,25
            C 38.5,24 40.5,23 44,22.5
            Z
          "
          fill="url(#knightPeachTanGrad)"
          stroke="#3b1b0b"
          stroke-width="0.8"
        />
        <!-- Snout, muzzle, and cheekbone thread details -->
        <path
          d="
            M 31,34
            L 24,38
            C 22,39.5 21,43 23,45
            L 29,48
            C 31,49.5 35,47 37,45
            L 38,42
            Z
          "
          fill="#edd2bc"
          stroke="#4a2512"
          stroke-width="0.6"
        />
        <!-- Knight eye embroidered stitch -->
        <circle cx="34" cy="31" r="2.0" fill="#2a0f05" />
        <circle cx="34.5" cy="30.5" r="0.75" fill="#ffffff" />
        <!-- Muzzle nostril stitch -->
        <ellipse cx="25" cy="41" rx="1.2" ry="0.8" fill="#3a1608" />
        <!-- Knight mane hair cuts -->
        <path
          d="
            M 52,18 L 47,24 M 58,23 L 52,30 M 67,27 L 60,35
            M 73,34 L 66,43 M 77,44 L 71,52 M 80,54 L 74,62
          "
          stroke="#7a4625"
          stroke-width="1.3"
          stroke-linecap="round"
        />
        <!-- Chest muscle stitch fold -->
        <path
          d="
            M 82.5,69.5
            C 82.5,46 74,23.5 44,22.5
            L 40.5,23
            L 33,18
            L 36.5,26.5
            L 30.5,31
            L 20,52
            L 26.5,58.5
            L 38.5,47
            C 55,48 53,62 39,69.5
            Z
          "
          fill="url(#knightPeachTanGrad)"
        />
      </g>
    </g>
  </defs>

  <!-- =========================================================================
       1. BASE BANNER WITH INTEGRATED EMBROIDERY, CHIAROSCURO, & TENSION FOLDS:
       All elements are layered so light and shadow physically fall over the
       typography and the badges as real embroidery on velvet cloth.
       ========================================================================= -->
  <g id="banner-cloth-group" filter="url(#ribbonElevationShadow)" class="animate-cloth-flow">
    <!-- CLIPPED FABRIC BODY -->
    <g clip-path="url(#battleTornRibbonClip)">
      <!-- 1. Rich Velvet Base Fill -->
      <path
        id="shatranj-ribbon-base"
        d="M 82,16 C 135,15.2 210,15.7 375,15.3 C 540,15.7 615,15.2 668,16 C 675,18 680,21 676,25 C 666,27 652,28 646,32 C 642,36 654,40 668,41 C 682,43 695,48 698,54 C 684,57 672,59 676,64 C 688,68 692,74 685,79 C 678,82 672,84 666,86 L 660,82 L 648,96 L 632,77 L 618,98 L 600,74 L 584,97 L 568,78 L 552,99 L 538,76 L 524,98 L 510,72 L 498,96 L 482,75 L 465,94 L 442,80 L 425,93 L 402,79 L 382,92 L 360,77 L 342,93 L 324,80 L 308,91 L 290,78 L 272,88 L 255,83 L 236,89 L 220,77 L 205,87 L 185,82 L 168,88 L 152,73 L 138,82 L 120,86 L 108,76 L 95,83 L 74,84 C 64,78 54,74 58,68 C 70,64 74,62 66,56 C 54,52 48,46 54,40 C 66,36 72,32 64,26 C 58,22 68,18 76,17 L 82,16 Z"
        fill="url(#fabricBaseGrad)"
      />

      <!-- 2. ORNATE MEDIEVAL GOLD BORDER TRIM (Matching Reference Image): -->
      <!-- Left Border Trim -->
      <g opacity="0.82">
        <line x1="93" y1="18" x2="93" y2="82" stroke="url(#goldTrimGrad)" stroke-width="1.6" />
        <line x1="108" y1="17" x2="108" y2="83" stroke="url(#goldTrimGrad)" stroke-width="1.6" />
        <path
          d="
            M 93,22 L 100.5,28 L 108,22 M 100.5,28 L 100.5,34 M 93,34 L 100.5,28 L 108,34
            M 93,38 L 100.5,44 L 108,38 M 100.5,44 L 100.5,50 M 93,50 L 100.5,44 L 108,50
            M 93,54 L 100.5,60 L 108,54 M 100.5,60 L 100.5,66 M 93,66 L 100.5,60 L 108,66
            M 93,70 L 100.5,76 L 108,70 M 100.5,76 L 100.5,82 M 93,82 L 100.5,76 L 108,82
          "
          stroke="url(#goldTrimGrad)"
          stroke-width="1.0"
          fill="none"
        />
      </g>

      <!-- Right Border Trim (With ICONIC Reference Tear-Out Hole at y=25-40): -->
      <g opacity="0.82">
        <line x1="645" y1="18" x2="645" y2="25" stroke="url(#goldTrimGrad)" stroke-width="1.6" />
        <line x1="660" y1="18" x2="660" y2="25" stroke="url(#goldTrimGrad)" stroke-width="1.6" />
        <path d="M 645,21 L 652.5,25 L 660,21" stroke="url(#goldTrimGrad)" stroke-width="1.0" fill="none" />
        <!-- Lower continuation down into the tatters -->
        <line x1="645" y1="41" x2="645" y2="78" stroke="url(#goldTrimGrad)" stroke-width="1.6" stroke-dasharray="14,2,22,3,10" />
        <line x1="660" y1="41" x2="660" y2="78" stroke="url(#goldTrimGrad)" stroke-width="1.6" stroke-dasharray="18,3,12,2,16" />
        <path
          d="
            M 645,44 L 652.5,50 L 660,44 M 652.5,50 L 652.5,56 M 645,56 L 652.5,50 L 660,56
            M 645,60 L 652.5,66 L 660,60 M 652.5,66 L 652.5,72 M 645,72 L 652.5,66 L 660,72
          "
          stroke="url(#goldTrimGrad)"
          stroke-width="1.0"
          fill="none"
        />
      </g>

      <!-- =========================================================================
           3. KNIGHT MEDALLIONS AND "SHATRANJ" WOVEN DIRECTLY ONTO THE FABRIC:
           Positioned BEFORE the fold shadows, crease highlights, pleats, and
           velvet luster sheen so lighting physically falls across them!
           ========================================================================= -->
      <g id="banner-embroidered-graphics" filter="url(#embroideryDepth)">
        <!-- Left Golden Knight Emblem (Woven on the banner) -->
        <g id="badge-left" transform="translate(216, 24) scale(0.52)">
          <use href="#shatranjBadgeGraphic" />
        </g>

        <!-- "SHATRANJ" Centered Cinzel Title (Woven on the banner) -->
        <g id="shatranj-title-group">
          <!-- Subtle warm fabric under-glow for thread depth -->
          <text x="375" y="63.5" text-anchor="middle" fill="#260002" stroke="#100001" stroke-width="2.5" class="shatranj-title" opacity="0.9">
            <tspan font-size="42" dy="-1">S</tspan>
            <tspan font-size="35" dy="1">HATRAN</tspan>
            <tspan font-size="39" dy="2">J</tspan>
          </text>
          <!-- Embroidered silver-gold metallic lettering -->
          <text x="375" y="63.5" text-anchor="middle" fill="url(#silverTextGrad)" stroke="#4a2818" stroke-width="0.75" class="shatranj-title">
            <tspan font-size="42" dy="-1">S</tspan>
            <tspan font-size="35" dy="1">HATRAN</tspan>
            <tspan font-size="39" dy="2">J</tspan>
          </text>
        </g>

        <!-- Right Golden Knight Emblem (Woven on the banner) -->
        <g id="badge-right" transform="translate(486, 24) scale(0.52)">
          <use href="#shatranjBadgeGraphic" />
        </g>
      </g>

      <!-- =========================================================================
           4. DRAMATIC DIAGONAL TENSION FOLDS & CREASE SHADOWS:
           These cast realistic shadows and highlights directly OVER the fabric,
           the typography, and the badges!
           ========================================================================= -->
      <!-- Main Upper Diagonal Crease Valley (Deep Shadow cutting across text & badges!) -->
      <path
        d="M 130,18 C 230,28 330,42 460,56 C 530,64 590,72 650,78"
        stroke="url(#creaseShadow1)"
        stroke-width="5.8"
        stroke-linecap="round"
        fill="none"
        filter="url(#deepCreaseBlur)"
        opacity="0.88"
      />
      <!-- Main Upper Diagonal Crease Crest (Illuminated Velvet Ridge across text & badges!) -->
      <path
        d="M 130,16 C 230,26 330,40 460,54 C 530,62 590,70 650,76"
        stroke="url(#creaseHighlight1)"
        stroke-width="2.4"
        stroke-linecap="round"
        fill="none"
        filter="url(#softCreaseBlur)"
        opacity="0.78"
      />

      <!-- Secondary Lower Diagonal Drape Crease (Crossing lower part of badges & text) -->
      <path
        d="M 105,42 C 185,55 265,68 385,80 C 435,84 485,84 540,83"
        stroke="url(#creaseShadow1)"
        stroke-width="6.2"
        stroke-linecap="round"
        fill="none"
        filter="url(#deepCreaseBlur)"
        opacity="0.82"
      />
      <path
        d="M 105,40 C 185,53 265,66 385,78 C 435,82 485,82 540,81"
        stroke="url(#creaseHighlight1)"
        stroke-width="2.2"
        stroke-linecap="round"
        fill="none"
        filter="url(#softCreaseBlur)"
        opacity="0.68"
      />

      <!-- Top Tension Swell Fold -->
      <path
        d="M 230,16 C 320,21 410,28 510,38"
        stroke="url(#creaseShadow1)"
        stroke-width="4.2"
        stroke-linecap="round"
        fill="none"
        filter="url(#deepCreaseBlur)"
        opacity="0.72"
      />
      <path
        d="M 230,15 C 320,20 410,27 510,37"
        stroke="url(#creaseHighlight1)"
        stroke-width="1.8"
        stroke-linecap="round"
        fill="none"
        filter="url(#softCreaseBlur)"
        opacity="0.62"
      />

      <!-- Vertical Gathered Pleats at the Top Hem (Casting shadows down onto cloth and top of badges) -->
      <g stroke="#0f0001" stroke-width="2.0" opacity="0.80" stroke-linecap="round" filter="url(#softCreaseBlur)">
        <line x1="125" y1="16" x2="126" y2="28" />
        <line x1="175" y1="16" x2="176" y2="26" />
        <line x1="225" y1="16" x2="227" y2="30" />
        <line x1="285" y1="15" x2="287" y2="28" />
        <line x1="345" y1="15" x2="346" y2="27" />
        <line x1="405" y1="15" x2="406" y2="28" />
        <line x1="465" y1="15" x2="467" y2="29" />
        <line x1="525" y1="16" x2="526" y2="27" />
        <line x1="585" y1="16" x2="587" y2="30" />
        <line x1="635" y1="16" x2="636" y2="27" />
      </g>
      <!-- Pleat Highlight Darts -->
      <g stroke="#ff9ca3" stroke-width="0.9" opacity="0.6" stroke-linecap="round">
        <line x1="127" y1="16" x2="128" y2="25" />
        <line x1="177" y1="16" x2="178" y2="23" />
        <line x1="228" y1="16" x2="229" y2="27" />
        <line x1="287" y1="15" x2="289" y2="25" />
        <line x1="347" y1="15" x2="348" y2="24" />
        <line x1="407" y1="15" x2="408" y2="25" />
        <line x1="467" y1="15" x2="469" y2="26" />
        <line x1="527" y1="16" x2="528" y2="24" />
        <line x1="587" y1="16" x2="589" y2="27" />
        <line x1="637" y1="16" x2="638" y2="24" />
      </g>

      <!-- 5. Moving Satin/Velvet Sheen Reflection across the Folds & Embroidery together -->
      <rect
        x="180"
        y="12"
        width="260"
        height="84"
        fill="url(#movingLusterGrad)"
        class="animate-velvet-luster"
        style="mix-blend-mode: screen; pointer-events: none;"
      />

      <!-- 6. Vertical Shading Overlay: Top Shadows + Bottom Charred Grime (Falls over all layers) -->
      <rect
        x="70"
        y="12"
        width="630"
        height="90"
        fill="url(#fabricVerticalShade)"
      />
    </g>

    <!-- Scorched Edge Rim on Lacerations and Cascading Tatters -->
    <path
      d="M 82,16 C 135,15.2 210,15.7 375,15.3 C 540,15.7 615,15.2 668,16 C 675,18 680,21 676,25 C 666,27 652,28 646,32 C 642,36 654,40 668,41 C 682,43 695,48 698,54 C 684,57 672,59 676,64 C 688,68 692,74 685,79 C 678,82 672,84 666,86 L 660,82 L 648,96 L 632,77 L 618,98 L 600,74 L 584,97 L 568,78 L 552,99 L 538,76 L 524,98 L 510,72 L 498,96 L 482,75 L 465,94 L 442,80 L 425,93 L 402,79 L 382,92 L 360,77 L 342,93 L 324,80 L 308,91 L 290,78 L 272,88 L 255,83 L 236,89 L 220,77 L 205,87 L 185,82 L 168,88 L 152,73 L 138,82 L 120,86 L 108,76 L 95,83 L 74,84 C 64,78 54,74 58,68 C 70,64 74,62 66,56 C 54,52 48,46 54,40 C 66,36 72,32 64,26 C 58,22 68,18 76,17 L 82,16 Z"
      fill="none"
      stroke="#120002"
      stroke-width="1.1"
      stroke-linejoin="round"
      opacity="0.85"
    />

    <!-- Deep Battlefield Blade Slashes cutting into the fabric from the tatters -->
    <g stroke="#100001" stroke-linecap="round" opacity="0.88">
      <path d="M 108,76 L 112,68" stroke-width="1.4" />
      <path d="M 152,73 L 155,64" stroke-width="1.5" />
      <path d="M 220,77 L 222,67" stroke-width="1.4" />
      <path d="M 290,78 L 292,68" stroke-width="1.5" />
      <path d="M 360,77 L 362,66" stroke-width="1.6" />
      <path d="M 442,80 L 441,69" stroke-width="1.5" />
      <path d="M 510,72 L 512,61" stroke-width="1.6" />
      <path d="M 538,76 L 536,65" stroke-width="1.5" />
      <path d="M 600,74 L 602,63" stroke-width="1.6" />
      <path d="M 632,77 L 634,68" stroke-width="1.5" />
      <!-- Tear chunk internal slashes on right edge -->
      <path d="M 646,32 L 635,33" stroke-width="1.4" />
      <path d="M 672,59 L 661,58" stroke-width="1.3" />
    </g>

    <!-- Fine Broken Hem Stitches -->
    <path
      d="M 92,18 L 360,17.2 Q 375,17.5 390,17.2 L 658,18"
      stroke="#1c0001"
      stroke-width="0.75"
      stroke-dasharray="28,2,62,3,40,2,80"
      opacity="0.6"
    />
  </g>

  <!-- =========================================================================
       2. ORGANIC FRAYED THREADS & TENDRILS (Fluttering with Gentle Wind):
       ========================================================================= -->
  <!-- Top Frayed Threads -->
  <g class="animate-threads">
    <path d="M 140,16.2 C 139,12 137,9 135,6" stroke="#d4383e" stroke-width="0.75" stroke-linecap="round" opacity="0.8" />
    <path d="M 275,15.3 C 274,11 276,8 273,5" stroke="#a81a20" stroke-width="0.75" stroke-linecap="round" opacity="0.75" />
    <path d="M 420,16 C 421,11 423,8 426,6" stroke="#d4383e" stroke-width="0.75" stroke-linecap="round" opacity="0.8" />
    <path d="M 580,15.5 C 581,11 584,8 587,6" stroke="#a81a20" stroke-width="0.75" stroke-linecap="round" opacity="0.75" />
  </g>

  <!-- Cascading Long Tendril Threads at Bottom Right (Reference-Inspired) -->
  <g class="animate-right-tendrils animate-threads">
    <path d="M 498,96 C 499,101 497,105 498,108" stroke="#d4383e" stroke-width="0.8" stroke-linecap="round" opacity="0.85" />
    <path d="M 524,98 C 525,103 523,107 524,110" stroke="#a81a20" stroke-width="0.85" stroke-linecap="round" opacity="0.85" />
    <path d="M 552,99 C 553,104 551,108 553,112" stroke="#d4383e" stroke-width="0.85" stroke-linecap="round" opacity="0.9" />
    <path d="M 584,97 C 585,102 583,106 585,109" stroke="#a81a20" stroke-width="0.8" stroke-linecap="round" opacity="0.85" />
    <path d="M 618,98 C 619,103 621,107 620,111" stroke="#d4383e" stroke-width="0.85" stroke-linecap="round" opacity="0.9" />
    <path d="M 648,96 C 649,101 652,104 651,107" stroke="#a81a20" stroke-width="0.8" stroke-linecap="round" opacity="0.85" />
  </g>

  <!-- Left Bottom Threads -->
  <g class="animate-left-tatter animate-threads">
    <path d="M 120,86 C 119,90 121,93 120,96" stroke="#a81a20" stroke-width="0.8" stroke-linecap="round" opacity="0.8" />
    <path d="M 168,88 C 169,92 167,95 168,98" stroke="#d4383e" stroke-width="0.8" stroke-linecap="round" opacity="0.8" />
    <path d="M 236,89 C 235,93 237,96 236,99" stroke="#a81a20" stroke-width="0.85" stroke-linecap="round" opacity="0.8" />
    <path d="M 342,93 C 343,97 341,100 342,103" stroke="#d4383e" stroke-width="0.8" stroke-linecap="round" opacity="0.85" />
    <path d="M 425,93 C 426,97 424,101 425,104" stroke="#a81a20" stroke-width="0.8" stroke-linecap="round" opacity="0.8" />
  </g>

  <!-- Right Tear-Out Hole Loose Threads -->
  <g class="animate-threads">
    <path d="M 646,32 C 638,31 632,34 626,33" stroke="#d4383e" stroke-width="0.8" stroke-linecap="round" opacity="0.85" />
    <path d="M 668,41 C 674,40 680,43 686,42" stroke="#a81a20" stroke-width="0.8" stroke-linecap="round" opacity="0.8" />
    <path d="M 698,54 C 706,53 712,56 718,55" stroke="#d4383e" stroke-width="0.85" stroke-linecap="round" opacity="0.85" />
  </g>

  <!-- Left Outer Border Loose Threads -->
  <g class="animate-left-tatter animate-threads">
    <path d="M 54,40 C 46,39 40,42 34,41" stroke="#a81a20" stroke-width="0.85" stroke-linecap="round" opacity="0.8" />
    <path d="M 58,68 C 50,69 44,66 38,68" stroke="#d4383e" stroke-width="0.8" stroke-linecap="round" opacity="0.8" />
  </g>
</svg>'''

# Validate XML
root = ET.fromstring(new_svg)
print("New SVG is valid XML! Elements count:", len(list(root.iter())))

with open('public/shatranj-logo.svg', 'w') as f:
    f.write(new_svg)
print("Updated public/shatranj-logo.svg successfully!")
