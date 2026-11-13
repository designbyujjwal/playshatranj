import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const publicDir = path.resolve('public');
const fontPath = path.join(publicDir, 'Cinzel-SemiBold.ttf');

// If font doesn't exist yet, download it
async function ensureFont() {
  if (!fs.existsSync(fontPath)) {
    console.log('Downloading Cinzel font...');
    const fontRes = await fetch('https://fonts.gstatic.com/s/cinzel/v26/8vIU7ww63mVu7gtR-kwKxNvkNOjw-gjgTYo.ttf');
    const buffer = Buffer.from(await fontRes.arrayBuffer());
    fs.writeFileSync(fontPath, buffer);
  }
}

async function generate() {
  await ensureFont();

  const svgBanner = fs.readFileSync(path.join(publicDir, 'shatranj-logo.svg'), 'utf8');

  const fontOptions = {
    fontFiles: [fontPath],
    loadSystemFonts: false,
    defaultFontFamily: 'Cinzel',
  };

  // 1. High-Res Standard Banner (1500px width, 2x scale of 750px viewBox)
  console.log('Rendering 1500px banner PNG...');
  const resvg1500 = new Resvg(svgBanner, {
    fitTo: { mode: 'width', value: 1500 },
    font: fontOptions,
  });
  const png1500 = resvg1500.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'shatranj-logo.png'), png1500);
  console.log(`Saved public/shatranj-logo.png (${(png1500.length / 1024).toFixed(1)} KB)`);

  // 2. Ultra 4K Banner (3000px width, 4x scale)
  console.log('Rendering 3000px 4K banner PNG...');
  const resvg3000 = new Resvg(svgBanner, {
    fitTo: { mode: 'width', value: 3000 },
    font: fontOptions,
  });
  const png3000 = resvg3000.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'shatranj-logo-4k.png'), png3000);
  console.log(`Saved public/shatranj-logo-4k.png (${(png3000.length / 1024).toFixed(1)} KB)`);

  // 3. Banner with solid dark luxury background (#0b0c10) for previewing/printing/wallpapers
  const svgWithDarkBg = svgBanner.replace(
    '<svg',
    '<svg style="background-color: #0b0c10;"'
  );
  const resvgDark = new Resvg(svgWithDarkBg, {
    fitTo: { mode: 'width', value: 1800 },
    font: fontOptions,
    background: '#0b0c10',
  });
  const pngDark = resvgDark.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'shatranj-logo-dark.png'), pngDark);
  console.log(`Saved public/shatranj-logo-dark.png (${(pngDark.length / 1024).toFixed(1)} KB)`);

  // 4. Crest / Crown Badge Icon SVG (Standalone 512x512 & 1024x1024)
  const crestSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <defs>
    <filter id="crestShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.85" />
    </filter>
    <radialGradient id="badgeCrimsonGrad" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#820b10" />
      <stop offset="55%" stop-color="#4f0105" />
      <stop offset="100%" stop-color="#220002" />
    </radialGradient>
    <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#feeaa7" />
      <stop offset="30%" stop-color="#deb44d" />
      <stop offset="70%" stop-color="#a6731e" />
      <stop offset="100%" stop-color="#6b460d" />
    </linearGradient>
    <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff3c6" />
      <stop offset="30%" stop-color="#f7ca68" />
      <stop offset="70%" stop-color="#d68e37" />
      <stop offset="100%" stop-color="#9a531a" />
    </linearGradient>
  </defs>

  <g filter="url(#crestShadow)">
    <!-- Squircle badge matching logo -->
    <rect
      x="8"
      y="8"
      width="84"
      height="84"
      rx="20"
      fill="url(#badgeCrimsonGrad)"
      stroke="url(#goldRimGrad)"
      stroke-width="3"
    />
    <rect
      x="11.5"
      y="11.5"
      width="77"
      height="77"
      rx="17"
      fill="none"
      stroke="#ffffff"
      stroke-width="0.8"
      opacity="0.22"
    />

    <!-- Crown Icon -->
    <g transform="translate(15, 16) scale(0.70)">
      <polygon
        points="27,78 73,78 87,34 65,48 50,20 35,48 13,34"
        fill="url(#crownGoldGrad)"
        stroke="url(#crownGoldGrad)"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </g>
  </g>
</svg>
`;

  const resvgCrest = new Resvg(crestSvg, {
    fitTo: { mode: 'width', value: 512 },
    font: fontOptions,
  });
  const pngCrest = resvgCrest.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'shatranj-crest.png'), pngCrest);
  console.log(`Saved public/shatranj-crest.png (${(pngCrest.length / 1024).toFixed(1)} KB)`);

  const resvgCrest1024 = new Resvg(crestSvg, {
    fitTo: { mode: 'width', value: 1024 },
    font: fontOptions,
  });
  const pngCrest1024 = resvgCrest1024.render().asPng();
  fs.writeFileSync(path.join(publicDir, 'shatranj-crest-1024.png'), pngCrest1024);
  console.log(`Saved public/shatranj-crest-1024.png (${(pngCrest1024.length / 1024).toFixed(1)} KB)`);

  console.log('All PNG logos generated successfully!');
}

generate().catch(console.error);
