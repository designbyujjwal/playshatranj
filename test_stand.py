import xml.etree.ElementTree as ET

stand_svg = '''
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 750 100"
  width="750"
  height="100"
  fill="none"
>
  <defs>
    <filter id="standDropShadow" x="-10%" y="-40%" width="120%" height="200%">
      <feDropShadow dx="0" dy="2.8" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.9" />
    </filter>

    <linearGradient id="ironRodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3e4149" />
      <stop offset="25%" stop-color="#727682" />
      <stop offset="55%" stop-color="#2a2c33" />
      <stop offset="100%" stop-color="#0f1013" />
    </linearGradient>

    <linearGradient id="spearBladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b909d" />
      <stop offset="45%" stop-color="#d4d8e3" />
      <stop offset="55%" stop-color="#555861" />
      <stop offset="100%" stop-color="#1c1d22" />
    </linearGradient>

    <linearGradient id="brassFittingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2ba60" />
      <stop offset="40%" stop-color="#9a7024" />
      <stop offset="75%" stop-color="#5a3d0e" />
      <stop offset="100%" stop-color="#291a04" />
    </linearGradient>

    <linearGradient id="leatherTieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5c3418" />
      <stop offset="50%" stop-color="#3c200c" />
      <stop offset="100%" stop-color="#1e0f05" />
    </linearGradient>
  </defs>

  <!-- STAND GRAPHICS -->
  <g id="shatranj-banner-stand" filter="url(#standDropShadow)">
    <!-- 1. Horizontal Iron Crossbar -->
    <rect x="62" y="13.5" width="626" height="5.5" rx="2.2" fill="url(#ironRodGrad)" stroke="#08080a" stroke-width="0.8" />
    <!-- Polished top highlight rim -->
    <line x1="68" y1="14.2" x2="682" y2="14.2" stroke="#abb0be" stroke-width="0.75" opacity="0.85" />

    <!-- 2. Left Spear Finial -->
    <g id="stand-finial-left">
      <!-- Socket collar -->
      <rect x="64" y="12" width="7" height="8.5" rx="1.5" fill="url(#brassFittingGrad)" stroke="#1a1104" stroke-width="0.6" />
      <circle cx="67.5" cy="16.2" r="1.2" fill="#d4aa48" />
      <!-- Left pointing diamond spear blade -->
      <path d="M 64,16.2 L 52,11.5 L 34,16.2 L 52,21 L 64,16.2 Z" fill="url(#spearBladeGrad)" stroke="#121317" stroke-width="0.8" />
      <!-- Central ridge crease -->
      <line x1="34" y1="16.2" x2="64" y2="16.2" stroke="#ffffff" stroke-width="0.8" opacity="0.9" />
    </g>

    <!-- 3. Right Spear Finial -->
    <g id="stand-finial-right">
      <!-- Socket collar -->
      <rect x="679" y="12" width="7" height="8.5" rx="1.5" fill="url(#brassFittingGrad)" stroke="#1a1104" stroke-width="0.6" />
      <circle cx="682.5" cy="16.2" r="1.2" fill="#d4aa48" />
      <!-- Right pointing diamond spear blade -->
      <path d="M 686,16.2 L 698,11.5 L 716,16.2 L 698,21 L 686,16.2 Z" fill="url(#spearBladeGrad)" stroke="#121317" stroke-width="0.8" />
      <!-- Central ridge crease -->
      <line x1="686" y1="16.2" x2="716" y2="16.2" stroke="#ffffff" stroke-width="0.8" opacity="0.9" />
    </g>

    <!-- 4. Left Vertical Staff Post & Upward Spearhead -->
    <g id="stand-post-left">
      <!-- Dark vertical post descending behind banner edge -->
      <rect x="78.5" y="11" width="5" height="32" rx="1.5" fill="url(#ironRodGrad)" stroke="#090a0d" stroke-width="0.6" />
      <!-- Junction ornamental brass bracket -->
      <rect x="77.5" y="12.5" width="7" height="7.5" rx="1.2" fill="url(#brassFittingGrad)" stroke="#1e1305" stroke-width="0.6" />
      <circle cx="81" cy="16.2" r="1.4" fill="#ffd470" />
      <!-- Upward dagger/spear tip -->
      <path d="M 81,-6 L 85.5,6 L 81,11 L 76.5,6 Z" fill="url(#spearBladeGrad)" stroke="#121317" stroke-width="0.75" />
      <line x1="81" y1="-6" x2="81" y2="11" stroke="#ffffff" stroke-width="0.75" opacity="0.85" />
    </g>

    <!-- 5. Right Vertical Staff Post & Upward Spearhead -->
    <g id="stand-post-right">
      <!-- Dark vertical post descending behind banner edge -->
      <rect x="666.5" y="11" width="5" height="32" rx="1.5" fill="url(#ironRodGrad)" stroke="#090a0d" stroke-width="0.6" />
      <!-- Junction ornamental brass bracket -->
      <rect x="665.5" y="12.5" width="7" height="7.5" rx="1.2" fill="url(#brassFittingGrad)" stroke="#1e1305" stroke-width="0.6" />
      <circle cx="669" cy="16.2" r="1.4" fill="#ffd470" />
      <!-- Upward dagger/spear tip -->
      <path d="M 669,-6 L 673.5,6 L 669,11 L 664.5,6 Z" fill="url(#spearBladeGrad)" stroke="#121317" stroke-width="0.75" />
      <line x1="669" y1="-6" x2="669" y2="11" stroke="#ffffff" stroke-width="0.75" opacity="0.85" />
    </g>

    <!-- 6. Hanging Cord Rings & Top Suspension Ropes -->
    <g id="stand-suspension-mounts">
      <!-- Left suspension ring -->
      <circle cx="180" cy="13.5" r="4.2" fill="none" stroke="url(#brassFittingGrad)" stroke-width="1.4" />
      <path d="M 180,9.3 C 180,2 178,-8 175,-16" stroke="#2a2015" stroke-width="1.3" stroke-dasharray="3,1" opacity="0.85" />
      <!-- Right suspension ring -->
      <circle cx="570" cy="13.5" r="4.2" fill="none" stroke="url(#brassFittingGrad)" stroke-width="1.4" />
      <path d="M 570,9.3 C 570,2 572,-8 575,-16" stroke="#2a2015" stroke-width="1.3" stroke-dasharray="3,1" opacity="0.85" />
    </g>

    <!-- 7. Medieval Leather Straps & Ties Binding Cloth to Bar -->
    <g id="stand-leather-bindings" fill="url(#leatherTieGrad)" stroke="#140802" stroke-width="0.6">
      <!-- Repeat straps along the rod at each gather -->
      <!-- x=125 -->
      <g transform="translate(124, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1,6.5 L 0.5,13 L 2,12.5 L 2.5,6.5 Z" />
      </g>
      <!-- x=175 -->
      <g transform="translate(174, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1.2,6.5 L 0.8,12 L 2.2,11.5 L 2.6,6.5 Z" />
      </g>
      <!-- x=225 -->
      <g transform="translate(224, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1,6.5 L 0.5,13.5 L 2.2,13 L 2.5,6.5 Z" />
      </g>
      <!-- x=285 -->
      <g transform="translate(284, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1.2,6.5 L 1.5,12 L 2.6,11.8 L 2.5,6.5 Z" />
      </g>
      <!-- x=345 -->
      <g transform="translate(344, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1,6.5 L 0.6,12.5 L 2,12 L 2.5,6.5 Z" />
      </g>
      <!-- x=405 -->
      <g transform="translate(404, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1.5,6.5 L 1.8,12.5 L 2.8,12 L 2.5,6.5 Z" />
      </g>
      <!-- x=465 -->
      <g transform="translate(464, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1,6.5 L 0.5,13 L 2,12.5 L 2.5,6.5 Z" />
      </g>
      <!-- x=525 -->
      <g transform="translate(524, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1.2,6.5 L 1,12 L 2.4,11.5 L 2.5,6.5 Z" />
      </g>
      <!-- x=585 -->
      <g transform="translate(584, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1,6.5 L 0.5,13.5 L 2,13 L 2.5,6.5 Z" />
      </g>
      <!-- x=635 -->
      <g transform="translate(634, 13)">
        <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
        <path d="M 1.2,6.5 L 1.5,12.5 L 2.6,12 L 2.5,6.5 Z" />
      </g>
    </g>
  </g>
</svg>
'''

root = ET.fromstring(stand_svg)
print("Stand SVG is valid XML! Elements count:", len(list(root.iter())))
