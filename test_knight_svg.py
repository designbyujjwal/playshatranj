import xml.etree.ElementTree as ET

# We will design the exact knight graphic based on image.png
badge_svg = '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fced9d" />
      <stop offset="35%" stop-color="#d9a742" />
      <stop offset="70%" stop-color="#ab7722" />
      <stop offset="100%" stop-color="#734e12" />
    </linearGradient>

    <radialGradient id="badgeCrimsonGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#800a0f" />
      <stop offset="60%" stop-color="#4d0105" />
      <stop offset="100%" stop-color="#240002" />
    </radialGradient>

    <linearGradient id="knightBodyGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#fbe2d3" />
      <stop offset="30%" stop-color="#f0b695" />
      <stop offset="70%" stop-color="#d48057" />
      <stop offset="100%" stop-color="#994c28" />
    </linearGradient>

    <linearGradient id="knightShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#400205" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#200002" stop-opacity="0.95" />
    </linearGradient>
  </defs>

  <!-- Badge squircle -->
  <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#badgeCrimsonGrad)" stroke="url(#goldRimGrad)" stroke-width="3" />

  <!-- Chess Knight Silhouette matching reference image -->
  <!-- Base Pedestal -->
  <rect x="18" y="74" width="64" height="9" rx="1.5" fill="url(#knightBodyGrad)" />

  <!-- Knight Head & Neck (Facing Left) -->
  <path
    d="
      M 76,72
      C 75,54 71,38 58,26
      C 55,23 51,20 48,18
      L 45,17
      L 41,23
      C 37,25 33,28 30,31
      L 20,44
      C 18,47 19,51 22,53
      L 29,56
      L 38,47
      C 42,47 43,51 38,57
      C 34,61 32,67 33,72
      Z
    "
    fill="url(#knightBodyGrad)"
  />

  <!-- Neck muscle shadow indent (as in reference image) -->
  <path
    d="
      M 38,47
      C 42,47 43,51 38,57
      C 35,60 33,65 33.5,72
      L 44,72
      C 44,65 47,58 50,54
      C 54,49 52,44 46,45
      Z
    "
    fill="url(#knightShadowGrad)"
    opacity="0.65"
  />

  <!-- Mane notch highlight / cuts -->
  <path
    d="M 58,26 L 53,32 M 65,37 L 59,44 M 70,49 L 64,56"
    stroke="#fce8db"
    stroke-width="1.8"
    stroke-linecap="round"
    opacity="0.5"
  />
</svg>
'''

root = ET.fromstring(badge_svg)
print("Badge SVG valid XML!")
