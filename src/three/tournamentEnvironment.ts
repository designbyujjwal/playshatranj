import * as THREE from 'three';

/**
 * Procedural textures and 3D architectural elements faithfully matching the reference image:
 * - Ancient stone castle chamber with ashlar masonry blocks and rustic stone pillars
 * - Wrought-iron candle stand with glowing warm candlelight flames
 * - Dark rustic flagstone / slate slab table surface
 * - Aged antique parchment manuscripts with handwritten calligraphy at the table corners
 */

// 1. High-Resolution Equirectangular Balanced Studio Reflection Panorama
export function createStudioWhiteEquirectangularTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Balanced neutral studio environment dome (low diffuse ambient to prevent blowing out surfaces)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  bgGrad.addColorStop(0, '#2d3748');
  bgGrad.addColorStop(0.3, '#1e2633');
  bgGrad.addColorStop(0.7, '#151b24');
  bgGrad.addColorStop(1, '#0e1219');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Large overhead ceiling studio softbox (generates clean top specular glints)
  const ceilingSoftbox = ctx.createLinearGradient(512, 0, 1536, 0);
  ceilingSoftbox.addColorStop(0, 'rgba(255, 255, 255, 0)');
  ceilingSoftbox.addColorStop(0.2, 'rgba(240, 245, 255, 0.65)');
  ceilingSoftbox.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
  ceilingSoftbox.addColorStop(0.8, 'rgba(240, 245, 255, 0.65)');
  ceilingSoftbox.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = ceilingSoftbox;
  ctx.fillRect(512, 40, 1024, 180);

  // Key-light studio softbox reflection (around x = 1500, y = 300)
  const softbox1 = ctx.createRadialGradient(1500, 300, 40, 1500, 300, 450);
  softbox1.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  softbox1.addColorStop(0.4, 'rgba(220, 235, 255, 0.35)');
  softbox1.addColorStop(1, 'rgba(220, 235, 255, 0)');
  ctx.fillStyle = softbox1;
  ctx.beginPath();
  ctx.arc(1500, 300, 450, 0, Math.PI * 2);
  ctx.fill();

  // Warm candle / amber accent bounce reflection (around x = 520, y = 380)
  const softbox2 = ctx.createRadialGradient(520, 380, 30, 520, 380, 400);
  softbox2.addColorStop(0, 'rgba(255, 210, 140, 0.55)');
  softbox2.addColorStop(0.4, 'rgba(255, 180, 90, 0.18)');
  softbox2.addColorStop(1, 'rgba(255, 180, 90, 0)');
  ctx.fillStyle = softbox2;
  ctx.beginPath();
  ctx.arc(520, 380, 400, 0, Math.PI * 2);
  ctx.fill();

  // Cool rim light reflection strip (around x = 1800, y = 380)
  const softbox3 = ctx.createRadialGradient(1800, 380, 20, 1800, 380, 380);
  softbox3.addColorStop(0, 'rgba(180, 220, 255, 0.55)');
  softbox3.addColorStop(0.5, 'rgba(140, 195, 255, 0.15)');
  softbox3.addColorStop(1, 'rgba(140, 195, 255, 0)');
  ctx.fillStyle = softbox3;
  ctx.beginPath();
  ctx.arc(1800, 380, 380, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Backward-compatible alias
export const createTournamentEquirectangularTexture = createStudioWhiteEquirectangularTexture;

// 2. Luxurious Italian Calacatta / Carrara White Marble Tabletop Texture
export function createWhiteMarbleTableTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Pure polished alabaster marble base
  const baseGrad = ctx.createLinearGradient(0, 0, 2048, 2048);
  baseGrad.addColorStop(0, '#fefefe');
  baseGrad.addColorStop(0.3, '#fbfbfe');
  baseGrad.addColorStop(0.7, '#f7f8fb');
  baseGrad.addColorStop(1, '#f3f4f8');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 2048, 2048);

  // Soft translucent dove-grey cloudy strata
  for (let i = 0; i < 36; i++) {
    const cx = (i * 389) % 2048;
    const cy = (i * 647) % 2048;
    const r = 240 + (i % 7) * 70;
    const cloudGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, r);
    cloudGrad.addColorStop(0, 'rgba(215, 222, 232, 0.28)');
    cloudGrad.addColorStop(0.5, 'rgba(230, 235, 242, 0.14)');
    cloudGrad.addColorStop(1, 'rgba(245, 248, 252, 0)');
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Branching marble veins (charcoal, slate grey, and soft pewter)
  const drawMarbleVein = (
    startX: number,
    startY: number,
    angle: number,
    length: number,
    width: number,
    opacity: number,
    depth: number = 0
  ) => {
    ctx.strokeStyle = `rgba(62, 72, 88, ${opacity})`;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let x = startX;
    let y = startY;
    const steps = Math.floor(length / 16);

    for (let s = 0; s < steps; s++) {
      const stepDist = 16 + (Math.random() - 0.5) * 8;
      angle += (Math.random() - 0.5) * 0.4;
      x += Math.cos(angle) * stepDist;
      y += Math.sin(angle) * stepDist;
      ctx.lineTo(x, y);

      // Branch off capillary sub-veins
      if (depth < 2 && s % 5 === 0 && width > 1.2 && Math.random() > 0.42) {
        ctx.stroke();
        drawMarbleVein(
          x,
          y,
          angle + (Math.random() > 0.5 ? 0.65 : -0.65),
          length * 0.45,
          width * 0.55,
          opacity * 0.72,
          depth + 1
        );
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
    ctx.stroke();
  };

  // Primary dramatic Calacatta vein rivers across the table
  drawMarbleVein(80, 180, 0.68, 2200, 5.5, 0.38);
  drawMarbleVein(450, 60, 0.78, 2000, 4.2, 0.34);
  drawMarbleVein(1450, 120, 1.25, 1800, 3.5, 0.30);
  drawMarbleVein(160, 1300, 0.42, 1900, 3.8, 0.32);
  drawMarbleVein(880, 850, 0.88, 1400, 2.6, 0.26);
  drawMarbleVein(120, 750, 0.55, 1700, 3.2, 0.28);

  // Subtle delicate micro-fractures
  for (let i = 0; i < 40; i++) {
    const mx = Math.random() * 2048;
    const my = Math.random() * 2048;
    drawMarbleVein(mx, my, Math.random() * Math.PI * 2, 120 + Math.random() * 240, 1.3, 0.18, 1);
  }

  // Fine polished crystalline grain noise
  const imgData = ctx.getImageData(0, 0, 2048, 2048);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 6;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Backward-compatible alias
export const createFlagstoneTableTexture = createWhiteMarbleTableTexture;

// 3. Antique Parchment Manuscript Texture with Calligraphy Script (matching reference)
export function createManuscriptTexture(pageIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d')!;

  // Aged warm vellum / parchment base
  const parchmentGrad = ctx.createLinearGradient(0, 0, 512, 680);
  parchmentGrad.addColorStop(0, '#ebd8b7');
  parchmentGrad.addColorStop(0.5, '#e4cd9f');
  parchmentGrad.addColorStop(1, '#d5b986');
  ctx.fillStyle = parchmentGrad;
  ctx.fillRect(0, 0, 512, 680);

  // Scorched / aged dark edges
  const edgeVignette = ctx.createRadialGradient(256, 340, 180, 256, 340, 380);
  edgeVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  edgeVignette.addColorStop(0.7, 'rgba(110, 75, 30, 0.25)');
  edgeVignette.addColorStop(1, 'rgba(70, 45, 15, 0.65)');
  ctx.fillStyle = edgeVignette;
  ctx.fillRect(0, 0, 512, 680);

  // Deckled worn edge border
  ctx.strokeStyle = '#613d14';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, 496, 664);

  // Antique header and illuminated drop cap
  ctx.fillStyle = '#8b2500'; // Dark crimson drop cap
  ctx.font = 'bold 36px serif';
  ctx.fillText(pageIndex === 0 ? 'T' : 'R', 32, 64);

  ctx.fillStyle = '#2d1b0d';
  ctx.font = 'bold 16px serif';
  ctx.fillText(
    pageIndex === 0 ? 'RACTATUS DE LUDO SCACCHORUM' : 'EGULAE BELLICAE SCACCHORUM',
    64,
    52
  );

  // Flowing handwritten manuscript script lines
  ctx.fillStyle = '#3a2718';
  ctx.font = 'italic 11px serif';

  for (let y = 96; y < 640; y += 17) {
    if (y % 85 === 0) continue; // paragraph break

    const lineW = 440 - (Math.sin(y * 3.7) * 40 + 20);
    ctx.fillRect(36, y, lineW, 2.2);

    // Decorative flourished scribbles
    for (let x = 36; x < lineW + 36; x += 32) {
      if (Math.random() > 0.6) {
        ctx.beginPath();
        ctx.arc(x, y - 2, 2, 0, Math.PI);
        ctx.stroke();
      }
    }
  }

  // Red wax seal impression on the corner
  if (pageIndex === 0) {
    const sealX = 420;
    const sealY = 600;
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.arc(sealX, sealY, 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 18px serif';
    ctx.textAlign = 'center';
    ctx.fillText('♔', sealX, sealY + 6);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Builds the 3D Stone Table & Castle Accessories (matching reference image):
 * - Dark rustic flagstone / carved slate slab table
 * - Authentic aged parchment manuscripts resting at the corners
 * - Coordinates perfectly with the chessboard
 */
export function createTournamentTableGroup(): THREE.Group {
  const tableGroup = new THREE.Group();
  tableGroup.name = 'WhiteMarbleTable';

  const whiteMarbleTex = createWhiteMarbleTableTexture();

  // White Carrara / Calacatta Marble Tabletop material
  const tableMaterial = new THREE.MeshStandardMaterial({
    map: whiteMarbleTex,
    color: new THREE.Color(0xf3f5f8),
    roughness: 0.24,
    metalness: 0.02,
    envMapIntensity: 0.35,
  });

  // 1. Main White Marble Tabletop (width 22, depth 15, thickness 0.55)
  const tableWidth = 22;
  const tableDepth = 15;
  const tableThick = 0.55;
  const tableY = -0.5 - tableThick / 2;

  const tabletopGeom = new THREE.BoxGeometry(tableWidth, tableThick, tableDepth);
  const tabletop = new THREE.Mesh(tabletopGeom, tableMaterial);
  tabletop.position.set(0, tableY, 0);
  tabletop.receiveShadow = true;
  tableGroup.add(tabletop);

  // Bevelled polished marble rim around the table
  const stoneEdgeMat = new THREE.MeshStandardMaterial({
    map: whiteMarbleTex,
    color: new THREE.Color(0xf6f8fc),
    roughness: 0.2,
    metalness: 0.03,
  });
  const stoneEdge = new THREE.Mesh(
    new THREE.BoxGeometry(tableWidth + 0.12, 0.08, tableDepth + 0.12),
    stoneEdgeMat
  );
  stoneEdge.position.set(0, -0.5 - 0.04, 0);
  stoneEdge.receiveShadow = true;
  tableGroup.add(stoneEdge);

  // 2. Heavy Architectural Carved White Marble Pillars / Legs
  const legHeight = 3.8;
  const legY = -0.5 - tableThick - legHeight / 2;
  const legGeom = new THREE.BoxGeometry(1.4, legHeight, 1.4);
  const legPositions = [
    [-9.2, 5.8],
    [9.2, 5.8],
    [-9.2, -5.8],
    [9.2, -5.8],
  ];

  legPositions.forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(legGeom, tableMaterial);
    leg.position.set(lx, legY, lz);
    leg.castShadow = true;
    leg.receiveShadow = true;
    tableGroup.add(leg);
  });

  // 3. Handcrafted Captured Piece Trays on Left and Right flanks of the board
  // - Left Tray (x = -5.90, z = 0): Resting tray for captured Black pieces on the left side
  // - Right Tray (x = 5.90, z = 0): Resting tray for captured White pieces on the right side
  const trayWoodMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x1e1610), // Rich dark walnut border
    roughness: 0.35,
    metalness: 0.08,
  });
  const trayFeltMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x131920), // Deep tournament velvet felt mat
    roughness: 0.92,
    metalness: 0.0,
  });
  const trayGoldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xc9a84d), // Elegant brass accent line
    roughness: 0.28,
    metalness: 0.75,
  });

  [-5.90, 5.90].forEach((tx) => {
    // Raised walnut outer frame
    const frameGeom = new THREE.BoxGeometry(2.18, 0.024, 7.56);
    const frame = new THREE.Mesh(frameGeom, trayWoodMat);
    frame.position.set(tx, -0.5 + 0.012, 0);
    frame.receiveShadow = true;
    tableGroup.add(frame);

    // Brass accent inlay rim
    const brassGeom = new THREE.BoxGeometry(2.08, 0.026, 7.46);
    const brass = new THREE.Mesh(brassGeom, trayGoldMat);
    brass.position.set(tx, -0.5 + 0.013, 0);
    brass.receiveShadow = true;
    tableGroup.add(brass);

    // Recessed dark velvet felt runner
    const feltGeom = new THREE.BoxGeometry(2.02, 0.028, 7.40);
    const felt = new THREE.Mesh(feltGeom, trayFeltMat);
    felt.position.set(tx, -0.5 + 0.014, 0);
    felt.receiveShadow = true;
    tableGroup.add(felt);
  });

  return tableGroup;
}

/**
 * Builds the 3D Chamber Hall Group:
 * Clean open white studio space (without dark stone masonry walls or pillars blocking the white background)
 */
export function createTournamentHallGroup(): THREE.Group {
  const hallGroup = new THREE.Group();
  hallGroup.name = 'WhiteStudioHall';
  return hallGroup;
}
