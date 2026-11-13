import * as THREE from 'three';

export interface BannerMeshOptions {
  width?: number;
  height?: number;
  segmentsX?: number;
  segmentsY?: number;
  texture?: THREE.Texture | null;
  textureUrl?: string;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  windStrength?: number;
}

export interface BannerMeshHandle {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  material: THREE.MeshStandardMaterial;
  geometry: THREE.PlaneGeometry;
  update: (time: number) => void;
  setWindStrength: (strength: number) => void;
  dispose: () => void;
}

/**
 * Renders the battle-torn drooping velvet curtain cloth,
 * reference-matching heraldic knight badges, and crisp Cinzel "SHATRANJ" typography.
 */
export function renderBannerToCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Transparent background
  ctx.clearRect(0, 0, w, h);

  // Scaling factors: 750x150 space -> w x h canvas
  const sx = w / 750;
  const sy = h / 150;

  ctx.save();
  ctx.beginPath();
  // Straight top edge pinned to traverse bar
  ctx.moveTo(78 * sx, 16 * sy);
  ctx.lineTo(672 * sx, 16 * sy);

  // Clean, straight vertical right edge (no curved lines)
  ctx.lineTo(672 * sx, 134 * sy);

  // Bottom edge: Asymmetric battle-torn curtain fringe spanning between the straight vertical sides
  const bottomPoints: [number, number][] = [
    [656, 128], [642, 139], [626, 127], [612, 140], [596, 126], [580, 140],
    [564, 127], [548, 141], [532, 126], [518, 140], [504, 126], [490, 140],
    [474, 126], [458, 139], [438, 127], [420, 140], [398, 127], [378, 140],
    [356, 127], [338, 140], [320, 127], [304, 139], [286, 127], [268, 139],
    [250, 128], [232, 140], [216, 127], [200, 138], [182, 127], [164, 139],
    [148, 127], [134, 138], [116, 128], [102, 137], [90, 128], [78, 134],
  ];
  for (const pt of bottomPoints) {
    ctx.lineTo(pt[0] * sx, pt[1] * sy);
  }

  // Clean, straight vertical left edge (no curved lines)
  ctx.lineTo(78 * sx, 16 * sy);
  ctx.closePath();

  // Clip to cloth boundary
  ctx.clip();

  // 2. Rich royal crimson velvet base gradient
  const hGrad = ctx.createLinearGradient(0, 0, w, 0);
  hGrad.addColorStop(0.0, '#240002');
  hGrad.addColorStop(0.08, '#420105');
  hGrad.addColorStop(0.20, '#6f0207');
  hGrad.addColorStop(0.35, '#8c040b');
  hGrad.addColorStop(0.50, '#550206');
  hGrad.addColorStop(0.65, '#8c040b');
  hGrad.addColorStop(0.80, '#6f0207');
  hGrad.addColorStop(0.92, '#420105');
  hGrad.addColorStop(1.0, '#240002');
  ctx.fillStyle = hGrad;
  ctx.fillRect(0, 0, w, h);

  // 3. Gentle Vertical Curtain Pleats / Flutes (Soft columnar drapery folds)
  const fluteValleys = [125, 180, 235, 300, 375, 450, 515, 570, 625];
  for (const vx of fluteValleys) {
    ctx.beginPath();
    ctx.moveTo(vx * sx, 16 * sy);
    ctx.lineTo(vx * sx, 136 * sy);
    ctx.strokeStyle = 'rgba(14, 0, 1, 0.45)';
    ctx.lineWidth = 14 * sx;
    ctx.stroke();
  }

  const fluteCrests = [152, 207, 268, 337, 412, 482, 542, 598];
  for (const cx of fluteCrests) {
    ctx.beginPath();
    ctx.moveTo(cx * sx, 16 * sy);
    ctx.lineTo(cx * sx, 136 * sy);
    ctx.strokeStyle = 'rgba(255, 156, 163, 0.18)';
    ctx.lineWidth = 6 * sx;
    ctx.stroke();
  }

  // 4. Draw Badges (Left and Right, royal chess crown)
  const drawCrownBadge = (badgeCenterX: number, badgeCenterY: number, size: number) => {
    ctx.save();
    ctx.translate(badgeCenterX, badgeCenterY);

    const half = size / 2;
    const rx = size * 0.22;

    // Outer Squircle Background (Deep Crimson Velvet)
    const radGrad = ctx.createRadialGradient(0, -size * 0.15, size * 0.1, 0, 0, size * 0.65);
    radGrad.addColorStop(0.0, '#820b10');
    radGrad.addColorStop(0.55, '#4f0105');
    radGrad.addColorStop(1.0, '#220002');

    ctx.beginPath();
    ctx.roundRect(-half, -half, size, size, rx);
    ctx.fillStyle = radGrad;
    ctx.fill();

    // Gold Border
    const borderGrad = ctx.createLinearGradient(-half, -half, half, half);
    borderGrad.addColorStop(0.0, '#feeaa7');
    borderGrad.addColorStop(0.3, '#deb44d');
    borderGrad.addColorStop(0.7, '#a6731e');
    borderGrad.addColorStop(1.0, '#6b460d');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = size * 0.045;
    ctx.stroke();

    // Inner subtle gold bevel
    ctx.beginPath();
    ctx.roundRect(-half + 2, -half + 2, size - 4, size - 4, rx - 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Royal Imperial Gold Crown Gradient
    const crownGrad = ctx.createLinearGradient(0, -size * 0.35, 0, size * 0.35);
    crownGrad.addColorStop(0.0, '#fff3c6');
    crownGrad.addColorStop(0.3, '#f7ca68');
    crownGrad.addColorStop(0.7, '#d68e37');
    crownGrad.addColorStop(1.0, '#9a531a');
    ctx.fillStyle = crownGrad;

    // Scale and center the minimalist 3-point crown inside the squircle badge
    // Crown bounding box: x in [13, 87] (width 74), y in [20, 78] (height 58), center at (50, 49)
    const ks = (size * 0.58) / 74;
    ctx.save();
    ctx.translate(-50 * ks, -49 * ks);

    // Clean Minimalist 3-Point Geometric Crown Silhouette matching user reference
    ctx.beginPath();
    ctx.moveTo(27 * ks, 78 * ks);
    ctx.lineTo(13 * ks, 34 * ks);
    ctx.lineTo(35 * ks, 48 * ks);
    ctx.lineTo(50 * ks, 20 * ks);
    ctx.lineTo(65 * ks, 48 * ks);
    ctx.lineTo(87 * ks, 34 * ks);
    ctx.lineTo(73 * ks, 78 * ks);
    ctx.closePath();
    ctx.fill();

    // Smooth subtle edge stroke for clean anti-aliasing
    ctx.strokeStyle = crownGrad;
    ctx.lineWidth = 1.2 * ks;
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  };

  // Draw Left Badge & Right Badge (from reference image)
  const badgeSize = 58 * sx;
  drawCrownBadge(137 * sx, 74 * sy, badgeSize);
  drawCrownBadge(613 * sx, 74 * sy, badgeSize);

  // 5. Render "SHATRANJ" Text (Reduced weight, elegant Roman classical serif, no heavy stroke)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text Ambient Drop Shadow for crisp legibility without thick outline
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 7 * sx;
  ctx.shadowOffsetY = 2.5 * sy;

  const textGrad = ctx.createLinearGradient(0, 52 * sy, 0, 102 * sy);
  textGrad.addColorStop(0.0, '#ffffff');
  textGrad.addColorStop(0.25, '#f8f6f2');
  textGrad.addColorStop(0.65, '#e2e4e8');
  textGrad.addColorStop(0.90, '#c5c8d0');
  textGrad.addColorStop(1.0, '#9ea2ac');

  ctx.fillStyle = textGrad;
  // Reduced weight from bold (700) to refined medium/regular (400/500)
  ctx.font = `500 ${44 * sy}px Cinzel, Georgia, serif`;
  if ('letterSpacing' in ctx) {
    (ctx as any).letterSpacing = `${1.5 * sx}px`;
  }

  ctx.fillText('SHATRANJ', 375 * sx, 76 * sy);
  ctx.restore();

  // 6. Vertical fabric shading: top gathered shadow and bottom edge shadow
  const vGrad = ctx.createLinearGradient(0, 0, 0, h);
  vGrad.addColorStop(0.0, 'rgba(5, 0, 1, 0.95)');
  vGrad.addColorStop(0.12, 'rgba(18, 0, 2, 0.50)');
  vGrad.addColorStop(0.30, 'rgba(255, 255, 255, 0.06)');
  vGrad.addColorStop(0.70, 'rgba(255, 255, 255, 0.0)');
  vGrad.addColorStop(0.88, 'rgba(16, 0, 2, 0.45)');
  vGrad.addColorStop(1.0, 'rgba(5, 0, 0, 0.95)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}

/**
 * Procedural Fallback Texture Generator:
 * Generates a high-resolution 2048x410 canvas texture (5:1 ratio matching the taller curtain banner):
 * - Battle-torn drooping crimson curtain cloth
 * - Soft vertical drapery flutes and pleats
 * - Reference-matching square badges with rounded corners, gold border, and peach-gold chess knight facing left
 * - Regal silver-white Cinzel SHATRANJ serif typography
 * - Automatically refreshes on document.fonts.ready to ensure Cinzel font renders sharp
 */
export function createProceduralBannerCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 410;

  renderBannerToCanvas(canvas);

  const canvasTexture = new THREE.CanvasTexture(canvas);
  canvasTexture.colorSpace = THREE.SRGBColorSpace;
  canvasTexture.generateMipmaps = true;
  canvasTexture.minFilter = THREE.LinearMipmapLinearFilter;
  canvasTexture.magFilter = THREE.LinearFilter;
  canvasTexture.needsUpdate = true;

  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      renderBannerToCanvas(canvas);
      canvasTexture.needsUpdate = true;
    });
  }

  return canvasTexture;
}

/**
 * Applies a refined vertex shader modification to simulate a drooping curtain/banner:
 * - The top edge is pinned to the horizontal traverse crossbar (0 displacement).
 * - Vertical columnar pleats (curtain flutes) hang straight down.
 * - Gentle traveling billow waves move horizontally across the fabric without diagonal flips or twisting.
 * - Soft gravity sag and catenary droop give the realistic appearance of heavy hanging velvet.
 */
export function applyWindVertexShader(
  material: THREE.MeshStandardMaterial,
  options: {
    waveSpeed?: number;
    waveFrequency?: number;
    waveAmplitude?: number;
    windStrength?: number;
  } = {}
): void {
  const speed = options.waveSpeed ?? 0.35;
  const freq = options.waveFrequency ?? 1.2;
  const amp = options.waveAmplitude ?? 0.055;
  const strength = options.windStrength ?? 0.85;

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.uniforms.uWaveSpeed = { value: speed };
    shader.uniforms.uWaveFreq = { value: freq };
    shader.uniforms.uWaveAmp = { value: amp };
    shader.uniforms.uWindStrength = { value: strength };

    // 1. Declare custom uniforms at head of vertex shader
    shader.vertexShader = `
      uniform float uTime;
      uniform float uWaveSpeed;
      uniform float uWaveFreq;
      uniform float uWaveAmp;
      uniform float uWindStrength;
    ` + shader.vertexShader;

    // 2. Modify vertex positions for drooping curtain billow
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>

      // =========================================================================
      // Drooping Curtain Cloth Physics (Pinned at Top Rod, Hanging Gracefully):
      // - hangWeight: 0.0 at top rod (uv.y = 1.0), increasing smoothly downward.
      // - Vertical curtain fluting: columnar folds running straight top-to-bottom.
      // - Pure horizontal billow waves (NO diagonal shear or flips).
      // - Gentle natural gravity sag.
      // =========================================================================
      float hangWeight = pow(clamp((1.0 - uv.y) / 0.88, 0.0, 1.0), 1.30);
      float bottomTatterWeight = pow(clamp((1.0 - uv.y) / 0.40, 0.0, 1.0), 2.0);

      // Slow majestic ambient breeze clock
      float t = uTime * uWaveSpeed * 0.45;

      // 1. Permanent vertical curtain drape flutes (columnar pleats along X)
      float curtainPleat = sin(transformed.x * 6.8) * 0.016 * hangWeight;

      // 2. Slow, gentle horizontal curtain billow (travels along X, pushes Z)
      float billow1 = sin(transformed.x * 1.35 - t * 0.85) * 0.65;
      float billow2 = sin(transformed.x * 2.75 - t * 1.25) * 0.35;
      float curtainBillowZ = (billow1 + billow2) * uWaveAmp * uWindStrength * hangWeight;

      // 3. Subtle frayed tatter flutter at bottom free hem
      float tatterPhase = sin(floor(uv.x * 24.0) * 31.41);
      float tatterFlutter = sin(t * 1.1 + tatterPhase + transformed.x * 2.2) * (uWaveAmp * 0.25) * bottomTatterWeight * uWindStrength;

      transformed.z += curtainBillowZ + curtainPleat + tatterFlutter;

      // 4. Gentle natural gravity droop & subtle curtain breathing
      float curtainSwayY = sin(transformed.x * 0.9 + t * 0.42) * (uWaveAmp * 0.12) * hangWeight * uWindStrength;
      transformed.y += curtainSwayY;
      `
    );

    material.userData.shader = shader;
  };

  material.needsUpdate = true;
}

/**
 * Creates a complete Banner Mesh with high-density plane geometry and
 * wind-blown vertex shader displacement.
 * Height is 1.5 (50% taller, 5:1 ratio) to give a dignified drooping curtain presence.
 */
export function createBannerMesh(options: BannerMeshOptions = {}): BannerMeshHandle {
  const width = options.width ?? 7.5;
  const height = options.height ?? 1.5;
  const segmentsX = options.segmentsX ?? 128;
  const segmentsY = options.segmentsY ?? 48;
  const speed = options.waveSpeed ?? 0.35;
  const freq = options.waveFrequency ?? 1.2;
  const amp = options.waveAmplitude ?? 0.055;
  const strength = options.windStrength ?? 0.85;

  // Subdivided plane geometry for silky smooth wave vertex deformation
  const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);

  // Initialize texture: start with procedural high-res texture
  let activeTexture: THREE.Texture = options.texture || createProceduralBannerCanvasTexture();

  // If custom texture URL is explicitly provided, load and swap once ready
  if (!options.texture && options.textureUrl && typeof window !== 'undefined') {
    const loader = new THREE.TextureLoader();
    loader.load(
      options.textureUrl,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        material.map = loadedTex;
        material.needsUpdate = true;
        activeTexture = loadedTex;
      },
      undefined,
      (err) => {
        console.warn('Custom banner texture load failed, using procedural texture:', err);
      }
    );
  }

  // Material with standard PBR specular and double-sided rendering
  const material = new THREE.MeshStandardMaterial({
    map: activeTexture,
    transparent: true,
    alphaTest: 0.005,
    roughness: 0.42,
    metalness: 0.12,
    side: THREE.DoubleSide,
  });

  // Apply vertex shader modification
  applyWindVertexShader(material, {
    waveSpeed: speed,
    waveFrequency: freq,
    waveAmplitude: amp,
    windStrength: strength,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'shatranjBannerMesh';
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const update = (time: number) => {
    const shader = material.userData.shader;
    if (shader && shader.uniforms && shader.uniforms.uTime) {
      shader.uniforms.uTime.value = time;
    }
  };

  const setWindStrength = (val: number) => {
    const shader = material.userData.shader;
    if (shader && shader.uniforms && shader.uniforms.uWindStrength) {
      shader.uniforms.uWindStrength.value = val;
    }
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    if (activeTexture) {
      activeTexture.dispose();
    }
  };

  return {
    mesh,
    material,
    geometry,
    update,
    setWindStrength,
    dispose,
  };
}
