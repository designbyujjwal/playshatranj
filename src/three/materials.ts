import * as THREE from 'three';
import type { PieceColor } from '../types';

/**
 * PBR materials faithfully matching the chiaroscuro stone chamber & marble reference:
 * - Italian Calacatta / Carrara White Marble with delicate dark veining
 * - Deep Nero Marquina Black Marble with fine white calcite veins
 * - Warm Antique Ivory / Alabaster White Pieces (rich shading without blowout)
 * - Sleek Polished Obsidian / Ebony Black Pieces with crisp specular rim sheen
 * - Polished Bevelled White Marble Board Frame with dark inlay line
 */

// Generates authentic Calacatta / Carrara White Marble texture with branching veins
export function createCarraraMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm alabaster marble base
  const baseGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  baseGrad.addColorStop(0, '#f9f6f0');
  baseGrad.addColorStop(0.5, '#f3eee5');
  baseGrad.addColorStop(1, '#ece5da');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Broad soft grey clouding
  for (let i = 0; i < 18; i++) {
    const cx = (i * 211) % 1024;
    const cy = (i * 359) % 1024;
    const r = 120 + (i % 5) * 40;
    const cloudGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    cloudGrad.addColorStop(0, 'rgba(215, 205, 195, 0.28)');
    cloudGrad.addColorStop(0.6, 'rgba(225, 218, 210, 0.12)');
    cloudGrad.addColorStop(1, 'rgba(235, 230, 225, 0)');
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Branching dark charcoal & slate veins
  const drawVeinBranch = (
    startX: number,
    startY: number,
    angle: number,
    length: number,
    width: number,
    opacity: number
  ) => {
    ctx.strokeStyle = `rgba(55, 62, 74, ${opacity})`;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let x = startX;
    let y = startY;
    const steps = Math.floor(length / 14);

    for (let s = 0; s < steps; s++) {
      const stepDist = 14 + (Math.random() - 0.5) * 6;
      angle += (Math.random() - 0.5) * 0.45;
      x += Math.cos(angle) * stepDist;
      y += Math.sin(angle) * stepDist;
      ctx.lineTo(x, y);

      // Occasional tiny side branch
      if (s % 6 === 0 && width > 1.2 && Math.random() > 0.4) {
        ctx.stroke();
        drawVeinBranch(
          x,
          y,
          angle + (Math.random() > 0.5 ? 0.7 : -0.7),
          length * 0.45,
          width * 0.6,
          opacity * 0.75
        );
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
    ctx.stroke();
  };

  // Primary vein paths
  drawVeinBranch(60, 120, 0.65, 950, 4.5, 0.45);
  drawVeinBranch(250, 40, 0.82, 850, 3.2, 0.38);
  drawVeinBranch(720, 180, 1.15, 680, 2.5, 0.32);
  drawVeinBranch(110, 680, 0.35, 780, 3.0, 0.35);
  drawVeinBranch(540, 520, 0.95, 520, 2.0, 0.28);

  // Delicate micro-fractures
  for (let i = 0; i < 22; i++) {
    const mx = Math.random() * 1024;
    const my = Math.random() * 1024;
    drawVeinBranch(mx, my, Math.random() * Math.PI * 2, 80 + Math.random() * 120, 1.2, 0.22);
  }

  // Micro-calcite grain
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 10;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n * 0.95));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n * 0.9));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generates authentic Nero Marquina Black Marble texture with fine white calcite veins
export function createNeroMarquinaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Deep obsidian/nero charcoal base
  const baseGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  baseGrad.addColorStop(0, '#15181f');
  baseGrad.addColorStop(0.5, '#1a1f28');
  baseGrad.addColorStop(1, '#111419');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle dark mineral mottling
  for (let i = 0; i < 15; i++) {
    const cx = (i * 241) % 1024;
    const cy = (i * 383) % 1024;
    const r = 100 + (i % 4) * 50;
    const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    glow.addColorStop(0, 'rgba(42, 50, 64, 0.35)');
    glow.addColorStop(1, 'rgba(18, 22, 30, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine white calcite spider veins
  const drawWhiteVein = (
    startX: number,
    startY: number,
    angle: number,
    length: number,
    width: number,
    opacity: number
  ) => {
    ctx.strokeStyle = `rgba(235, 242, 252, ${opacity})`;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let x = startX;
    let y = startY;
    const steps = Math.floor(length / 12);

    for (let s = 0; s < steps; s++) {
      const stepDist = 12 + (Math.random() - 0.5) * 5;
      angle += (Math.random() - 0.5) * 0.4;
      x += Math.cos(angle) * stepDist;
      y += Math.sin(angle) * stepDist;
      ctx.lineTo(x, y);

      if (s % 5 === 0 && width > 1.0 && Math.random() > 0.45) {
        ctx.stroke();
        drawWhiteVein(
          x,
          y,
          angle + (Math.random() > 0.5 ? 0.65 : -0.65),
          length * 0.4,
          width * 0.6,
          opacity * 0.7
        );
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
    ctx.stroke();
  };

  drawWhiteVein(120, 80, 0.75, 900, 3.2, 0.65);
  drawWhiteVein(420, 50, 0.88, 800, 2.4, 0.55);
  drawWhiteVein(180, 650, 0.42, 750, 2.2, 0.5);
  drawWhiteVein(650, 320, 1.1, 550, 1.8, 0.45);

  // Micro-veins
  for (let i = 0; i < 24; i++) {
    const mx = Math.random() * 1024;
    const my = Math.random() * 1024;
    drawWhiteVein(mx, my, Math.random() * Math.PI * 2, 70 + Math.random() * 100, 1.0, 0.35);
  }

  // Texture grain
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Generates subtle micro-grain texture for satin porcelain ceramic pieces
export function createSatinPorcelainTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 5;
    data[i] = Math.min(255, Math.max(0, data[i] + n));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Soft contact and elevation drop shadow texture for chess pieces
function createSoftShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(10, 14, 22, 0.95)'); // Dense contact occlusion core
  gradient.addColorStop(0.25, 'rgba(10, 14, 22, 0.75)');
  gradient.addColorStop(0.5, 'rgba(10, 14, 22, 0.38)');
  gradient.addColorStop(0.75, 'rgba(10, 14, 22, 0.12)');
  gradient.addColorStop(1, 'rgba(10, 14, 22, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export class MaterialManager {
  public whitePieceMaterial: THREE.MeshPhysicalMaterial;
  public blackPieceMaterial: THREE.MeshPhysicalMaterial;
  public lightTileMaterial: THREE.MeshStandardMaterial;
  public darkTileMaterial: THREE.MeshStandardMaterial;
  public boardFrameMaterial: THREE.MeshStandardMaterial;
  public goldTrimMaterial: THREE.MeshStandardMaterial;
  public feltMaterial: THREE.MeshBasicMaterial;

  // Visual affordance materials
  public legalTileHoverMaterial: THREE.MeshBasicMaterial;
  public illegalTileHoverMaterial: THREE.MeshBasicMaterial;
  public selectedTileMaterial: THREE.MeshBasicMaterial;
  public validDotMaterial: THREE.MeshBasicMaterial;
  public validDotRimMaterial: THREE.MeshBasicMaterial;
  public lastMoveMaterial: THREE.MeshBasicMaterial;
  public checkAlertMaterial: THREE.MeshBasicMaterial;
  public softShadowTexture: THREE.CanvasTexture;

  constructor() {
    this.softShadowTexture = createSoftShadowTexture();

    const carraraTex = createCarraraMarbleTexture();
    const neroTex = createNeroMarquinaTexture();

    const porcelainTex = createSatinPorcelainTexture();

    // White pieces: Polished Vintage Ivory / Cream Boxwood Porcelain (matching reference image)
    // Smooth warm ivory body with delicate specular gloss and subtle clearcoat reflection
    this.whitePieceMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xe7dac6), // Warm vintage ivory with distinct tone and deep sculptural shading
      map: porcelainTex,
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.28,
      clearcoatRoughness: 0.20,
      reflectivity: 0.70,
      ior: 1.52,
      sheen: 0.15,
      sheenColor: new THREE.Color(0xfde68a),
      specularIntensity: 0.75,
      specularColor: new THREE.Color(0xffffff),
      envMapIntensity: 0.32,
    });

    // Black pieces: Deep Satin Ebony with crisp clearcoat & specular definition for clear visibility
    this.blackPieceMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x22262e),
      map: porcelainTex,
      roughness: 0.24,
      metalness: 0.04,
      clearcoat: 0.52,
      clearcoatRoughness: 0.18,
      reflectivity: 0.85,
      ior: 1.52,
      sheen: 0.38,
      sheenColor: new THREE.Color(0xe2e8f0),
      sheenRoughness: 0.20,
      specularIntensity: 0.98,
      specularColor: new THREE.Color(0xffffff),
      envMapIntensity: 0.62,
    });

    // Board Light Tiles: Authentic Calacatta / Carrara White Marble with delicate dark veins
    this.lightTileMaterial = new THREE.MeshStandardMaterial({
      map: carraraTex,
      color: new THREE.Color(0xf1ebdf),
      roughness: 0.25,
      metalness: 0.03,
      envMapIntensity: 0.28,
    });

    // Board Dark Tiles: Nero Marquina Black Marble with fine white veins
    this.darkTileMaterial = new THREE.MeshStandardMaterial({
      map: neroTex,
      color: new THREE.Color(0x171b23),
      roughness: 0.22,
      metalness: 0.05,
      envMapIntensity: 0.32,
    });

    // Board Frame: Polished White Marble Border Slab (matching reference image)
    this.boardFrameMaterial = new THREE.MeshStandardMaterial({
      map: carraraTex,
      color: new THREE.Color(0xe9e1d3),
      roughness: 0.26,
      metalness: 0.04,
      envMapIntensity: 0.28,
    });

    // Dark Inlaid Border & Coordinate Rule
    this.goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0f172a), // Crisp dark slate inlaid rule
      roughness: 0.25,
      metalness: 0.4,
    });

    // Felt under base
    this.feltMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x0f172a),
    });

    // Affordance overlays
    this.legalTileHoverMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x4f9a6e),   // study palette: muted emerald
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.illegalTileHoverMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x9b1c22),
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.selectedTileMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd8a957),   // warm brass
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Legal-move markers: a bright emerald centre (reads on black squares) inside a dark rim (reads on cream)
    this.validDotMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x3fcf7a),
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });
    this.validDotRimMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x0b1a10),
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.lastMoveMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xc99a4b),   // brass, like the frame coordinates
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.checkAlertMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xb3121b),
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }

  public getPieceMaterial(color: PieceColor): THREE.MeshPhysicalMaterial {
    return color === 'w' ? this.whitePieceMaterial : this.blackPieceMaterial;
  }
}
