import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import fs from 'fs';
import path from 'path';

// Polyfill FileReader for Node.js environment
class NodeFileReader {
  result: ArrayBuffer | string | null = null;
  onload: ((e: { target: NodeFileReader }) => void) | null = null;
  onloadend: ((e: { target: NodeFileReader }) => void) | null = null;

  readAsArrayBuffer(blob: Blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }

  readAsDataURL(blob: Blob) {
    blob.arrayBuffer().then((buf) => {
      const base64 = Buffer.from(buf).toString('base64');
      this.result = 'data:' + (blob.type || 'application/octet-stream') + ';base64,' + base64;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
}

(globalThis as unknown as { FileReader: typeof NodeFileReader }).FileReader = NodeFileReader;

/**
 * Merge an array of BufferGeometries into one unified BufferGeometry
 */
function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const merged = new THREE.BufferGeometry();
  const posArrays: number[] = [];
  const normArrays: number[] = [];
  const uvArrays: number[] = [];

  for (const geom of geometries) {
    const nonIndexed = geom.toNonIndexed();
    const pos = nonIndexed.getAttribute('position');
    const norm = nonIndexed.getAttribute('normal');
    const uv = nonIndexed.getAttribute('uv');

    if (pos) {
      for (let i = 0; i < pos.count * 3; i++) {
        posArrays.push(pos.array[i]);
      }
    }
    if (norm) {
      for (let i = 0; i < norm.count * 3; i++) {
        normArrays.push(norm.array[i]);
      }
    }
    if (uv) {
      for (let i = 0; i < uv.count * 2; i++) {
        uvArrays.push(uv.array[i]);
      }
    }
  }

  merged.setAttribute('position', new THREE.Float32BufferAttribute(posArrays, 3));
  if (normArrays.length > 0) {
    merged.setAttribute('normal', new THREE.Float32BufferAttribute(normArrays, 3));
  } else {
    merged.computeVertexNormals();
  }
  if (uvArrays.length > 0) {
    merged.setAttribute('uv', new THREE.Float32BufferAttribute(uvArrays, 2));
  }

  const welded = BufferGeometryUtils.mergeVertices(merged, 0.0005);
  welded.computeVertexNormals();
  return welded;
}

/**
 * Generate the authentic Staunton Knight pedestal base matching the reference photo:
 * - Sharp bottom disc rim
 * - Deep horizontal groove indent
 * - Plump rounded torus cushion ring
 * - Graceful concave bell scotia flare
 * - Prominent double collar at the base of the neck:
 *   - Lower rounded torus platter ring
 *   - Recessed undercut groove notch
 *   - Upper rounded collar bead directly under the neck
 */
function createKnightPedestal(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];

  // Flat base underside
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.400, 0));
  points.push(new THREE.Vector2(0.425, 0.015));

  // Tier 1: Sharp vertical platter rim
  points.push(new THREE.Vector2(0.435, 0.030));
  points.push(new THREE.Vector2(0.430, 0.050));

  // Tier 2: Deep recessed horizontal groove
  points.push(new THREE.Vector2(0.402, 0.060));
  points.push(new THREE.Vector2(0.395, 0.070)); // Groove valley
  points.push(new THREE.Vector2(0.405, 0.080));

  // Tier 3: Plump lower torus cushion ring (y: 0.080 to 0.185)
  const torusSteps = 16;
  const torusCenterY = 0.132;
  const torusR = 0.055;
  const torusBaseX = 0.400;
  for (let i = 0; i <= torusSteps; i++) {
    const angle = -Math.PI / 2 + (i / torusSteps) * Math.PI;
    const r = torusBaseX + Math.cos(angle) * torusR;
    const y = torusCenterY + Math.sin(angle) * 0.052;
    points.push(new THREE.Vector2(r, y));
  }

  // Tier 4: Concave bell / scotia flare rising to neck collar
  points.push(new THREE.Vector2(0.380, 0.200));
  points.push(new THREE.Vector2(0.335, 0.245));
  points.push(new THREE.Vector2(0.295, 0.290));
  points.push(new THREE.Vector2(0.265, 0.330));

  // Tier 5: Lower rounded torus collar ring (distinct in reference photo)
  points.push(new THREE.Vector2(0.265, 0.340));
  points.push(new THREE.Vector2(0.298, 0.360)); // Crest of lower collar
  points.push(new THREE.Vector2(0.300, 0.375));
  points.push(new THREE.Vector2(0.280, 0.390));

  // Tier 6: Recessed undercut notch & upper collar bead ring
  points.push(new THREE.Vector2(0.252, 0.398)); // Recessed notch
  points.push(new THREE.Vector2(0.272, 0.412)); // Upper collar crest
  points.push(new THREE.Vector2(0.270, 0.426));
  points.push(new THREE.Vector2(0.240, 0.440)); // Landing where horse neck springs

  // Flat top landing inside collar
  points.push(new THREE.Vector2(0, 0.440));

  const lathe = new THREE.LatheGeometry(points, 64);
  lathe.computeVertexNormals();
  return lathe;
}

/**
 * Build the complete 3D Knight sculpture matching the user's reference image
 */
export function buildKnightGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  // 1. Pedestal Base with authentic double collar
  parts.push(createKnightPedestal());

  // 2. Main Equine Body & Head Silhouette (XY Plane Profile)
  // Modeled with majestic arch, deep jawline, elegant throat S-curve, and regal posture
  const bodyShape = new THREE.Shape();
  // Start at bottom-rear of neck on upper collar (y = 0.440)
  bodyShape.moveTo(-0.205, 0.440);

  // Dorsal arch of neck rising up to poll behind ear
  bodyShape.bezierCurveTo(-0.245, 0.68, -0.275, 0.98, -0.240, 1.25);
  bodyShape.bezierCurveTo(-0.215, 1.42, -0.145, 1.55, -0.065, 1.63); // Poll behind ears

  // Poll over crown to brow
  bodyShape.lineTo(-0.020, 1.62);
  bodyShape.lineTo(0.015, 1.58); // Browband level

  // Forehead sloping gracefully forward
  bodyShape.bezierCurveTo(0.075, 1.52, 0.145, 1.44, 0.195, 1.35);

  // Bridge of nose with gentle classic equine convexity
  bodyShape.bezierCurveTo(0.245, 1.27, 0.285, 1.21, 0.315, 1.15);

  // Rounded tip of muzzle / upper lip
  bodyShape.bezierCurveTo(0.340, 1.11, 0.335, 1.06, 0.305, 1.04);

  // Parted mouth smile slit
  bodyShape.lineTo(0.245, 1.05);
  bodyShape.lineTo(0.265, 1.02);

  // Rounded lower chin pad
  bodyShape.bezierCurveTo(0.250, 0.98, 0.215, 0.97, 0.185, 0.98);

  // Lower jawline to mandible angle
  bodyShape.bezierCurveTo(0.135, 0.98, 0.085, 1.00, 0.045, 1.03);

  // Deep crescent throat latch undercut separating jaw and throat
  bodyShape.bezierCurveTo(0.005, 1.04, -0.015, 0.98, 0.015, 0.91);

  // Graceful S-curve throat arch
  bodyShape.bezierCurveTo(0.055, 0.81, 0.105, 0.70, 0.155, 0.58);

  // Muscular forward swell of lower chest entering the collar
  bodyShape.bezierCurveTo(0.205, 0.49, 0.200, 0.46, 0.175, 0.440);
  bodyShape.lineTo(0.175, 0.440);
  bodyShape.closePath();

  // Primary body extrusion with rounded bevels
  const bodyExtrude = new THREE.ExtrudeGeometry(bodyShape, {
    steps: 1,
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.068,
    bevelSize: 0.058,
    bevelSegments: 4,
  });
  bodyExtrude.center();
  bodyExtrude.translate(0.015, 1.065, 0);
  parts.push(bodyExtrude);

  // 3. Chest Muscular Fullness (Left and Right Pectoral Volumes)
  [-0.085, 0.085].forEach((zOffset) => {
    const chestBulge = new THREE.SphereGeometry(0.125, 16, 12);
    chestBulge.scale(1.25, 1.45, 0.85);
    chestBulge.rotateZ(0.28);
    chestBulge.translate(0.10, 0.65, zOffset);
    parts.push(chestBulge);
  });

  // 4. Sweeping Carved Mane Locks along the Dorsal Crest (matching the reference photo!)
  // In the reference image, the mane features 8 sweeping, curved, fluted waves that cascade down
  // the dorsal ridge and sweep across the neck flanks with distinct carved groove valleys.
  const numManeWaves = 9;
  for (let i = 0; i < numManeWaves; i++) {
    const t = i / (numManeWaves - 1);
    // Interpolate along the dorsal crest curve
    const p0 = new THREE.Vector2(-0.19, 0.54);
    const p1 = new THREE.Vector2(-0.25, 0.92);
    const p2 = new THREE.Vector2(-0.26, 1.32);
    const p3 = new THREE.Vector2(-0.06, 1.62);

    const omt = 1 - t;
    const cx =
      omt * omt * omt * p0.x +
      3 * omt * omt * t * p1.x +
      3 * omt * t * t * p2.x +
      t * t * t * p3.x;
    const cy =
      omt * omt * omt * p0.y +
      3 * omt * omt * t * p1.y +
      3 * omt * t * t * p2.y +
      t * t * t * p3.y;

    // Direction tangent along curve
    const rot = 0.95 - t * 0.75;
    const waveLength = 0.16 + Math.sin(t * Math.PI) * 0.07;
    const waveDepth = 0.26 + Math.sin(t * Math.PI) * 0.05;

    // Sculpted curved wave shape (swept lock)
    const waveShape = new THREE.Shape();
    waveShape.moveTo(-0.032, 0);
    waveShape.bezierCurveTo(-0.045, 0.045, -0.020, 0.090, 0.015, 0.110); // Swept tip
    waveShape.bezierCurveTo(0.045, 0.080, 0.040, 0.035, 0.025, 0);
    waveShape.closePath();

    const waveExtrude = new THREE.ExtrudeGeometry(waveShape, {
      steps: 1,
      depth: waveDepth,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.016,
      bevelSegments: 3,
    });
    waveExtrude.center();
    waveExtrude.rotateZ(rot);
    waveExtrude.translate(cx - 0.012, cy, 0);
    parts.push(waveExtrude);

    // Lateral carved flutes (left and right curved ridges that sweep down the flanks)
    [-1, 1].forEach((side) => {
      const lockRib = new THREE.TorusGeometry(0.12, 0.024, 8, 16, Math.PI * 0.55);
      lockRib.rotateZ(rot + 0.35 * side);
      lockRib.rotateY(side * 0.25);
      lockRib.scale(1.0, 1.2, 0.7);
      lockRib.translate(cx + 0.02, cy - 0.03, side * 0.125);
      parts.push(lockRib);
    });
  }

  // 5. Equestrian Forehead Browband / Strap (clearly visible in reference photo beneath ears)
  // A curved raised band wrapping across the brow from ear to ear
  const browbandTorus = new THREE.TorusGeometry(0.138, 0.018, 10, 24, Math.PI * 0.72);
  browbandTorus.rotateZ(-0.75);
  browbandTorus.rotateX(Math.PI / 2);
  browbandTorus.translate(0.025, 1.54, 0);
  parts.push(browbandTorus);

  // Raised piping edges on the browband
  [-0.014, 0.014].forEach((offsetY) => {
    const piping = new THREE.TorusGeometry(0.140, 0.008, 8, 20, Math.PI * 0.70);
    piping.rotateZ(-0.75);
    piping.rotateX(Math.PI / 2);
    piping.translate(0.025, 1.54 + offsetY, 0);
    parts.push(piping);
  });

  // 6. Alert Pricked Ears with Hollow Concha (matching reference photo)
  [-0.068, 0.068].forEach((zOffset) => {
    const earShape = new THREE.Shape();
    earShape.moveTo(-0.035, 0);
    earShape.bezierCurveTo(-0.045, 0.08, -0.030, 0.17, 0.010, 0.22); // Pointed tip
    earShape.bezierCurveTo(0.025, 0.18, 0.015, 0.10, -0.010, 0.02);
    earShape.closePath();

    const earExtrude = new THREE.ExtrudeGeometry(earShape, {
      depth: 0.032,
      bevelEnabled: true,
      bevelThickness: 0.016,
      bevelSize: 0.012,
      bevelSegments: 3,
    });
    earExtrude.center();
    earExtrude.rotateZ(0.24);
    earExtrude.rotateX(zOffset > 0 ? 0.22 : -0.22);
    earExtrude.rotateY(zOffset > 0 ? -0.14 : 0.14);
    earExtrude.translate(-0.035, 1.62, zOffset);
    parts.push(earExtrude);

    // Inner ear hollow concha
    const innerEar = new THREE.ConeGeometry(0.022, 0.14, 12);
    innerEar.rotateZ(0.28);
    innerEar.rotateX(zOffset > 0 ? 0.20 : -0.20);
    innerEar.translate(-0.020, 1.62, zOffset * 0.90);
    parts.push(innerEar);
  });

  // 7. Sculpted Eye Sockets, Eyelids & Supraorbital Brow Ridges
  [-0.118, 0.118].forEach((zOffset) => {
    // Inset eyeball socket
    const eyeball = new THREE.SphereGeometry(0.038, 14, 10);
    eyeball.scale(1.5, 0.82, 0.7);
    eyeball.rotateZ(-0.25);
    eyeball.translate(0.145, 1.34, zOffset);
    parts.push(eyeball);

    // Arched supraorbital brow ridge framing the top of the eye
    const browArch = new THREE.TorusGeometry(0.045, 0.014, 8, 14, Math.PI * 0.85);
    browArch.rotateZ(1.18);
    browArch.rotateY(zOffset > 0 ? -0.14 : 0.14);
    browArch.translate(0.140, 1.365, zOffset);
    parts.push(browArch);

    // Lower eyelid rim
    const lowerLid = new THREE.TorusGeometry(0.038, 0.009, 6, 12, Math.PI * 0.70);
    lowerLid.rotateZ(-1.85);
    lowerLid.translate(0.142, 1.320, zOffset);
    parts.push(lowerLid);
  });

  // 8. Masseter Cheek / Mandible Muscle Plates (Broad, powerful cheeks in reference image)
  [-0.112, 0.112].forEach((zOffset) => {
    const cheekGeom = new THREE.SphereGeometry(0.088, 18, 14);
    cheekGeom.scale(1.22, 1.05, 0.68);
    cheekGeom.translate(0.065, 1.16, zOffset);
    parts.push(cheekGeom);
  });

  // 9. Tapered Muzzle with Nostril Hollows & Chin Boss
  const snoutGeom = new THREE.CylinderGeometry(0.075, 0.115, 0.22, 18);
  snoutGeom.rotateZ(0.62);
  snoutGeom.scale(1.12, 0.85, 0.95);
  snoutGeom.translate(0.225, 1.17, 0);
  parts.push(snoutGeom);

  // Flared realistic nostril cavities
  [-0.075, 0.075].forEach((zOffset) => {
    // Outer nostril fleshy rim
    const nostrilRim = new THREE.TorusGeometry(0.026, 0.010, 8, 12, Math.PI * 1.2);
    nostrilRim.rotateZ(-0.65);
    nostrilRim.rotateY(zOffset > 0 ? 0.35 : -0.35);
    nostrilRim.translate(0.265, 1.12, zOffset);
    parts.push(nostrilRim);

    // Nostril cavity
    const nostrilCavity = new THREE.SphereGeometry(0.022, 10, 8);
    nostrilCavity.scale(1.4, 0.7, 0.7);
    nostrilCavity.rotateZ(-0.45);
    nostrilCavity.translate(0.260, 1.115, zOffset);
    parts.push(nostrilCavity);
  });

  // Sculpted fleshy chin boss
  const chinBoss = new THREE.SphereGeometry(0.040, 14, 10);
  chinBoss.scale(1.2, 0.78, 0.92);
  chinBoss.translate(0.205, 1.03, 0);
  parts.push(chinBoss);

  return mergeGeometries(parts);
}

async function exportKnightGLB() {
  console.log('Generating high-fidelity Knight 3D geometry matching reference image...');
  const knightGeom = buildKnightGeometry();
  console.log(`Knight vertices: ${knightGeom.getAttribute('position').count}`);

  // Create standard PBR material for GLTF packaging (matching reference satin black)
  const material = new THREE.MeshStandardMaterial({
    color: 0x18191c,
    roughness: 0.32,
    metalness: 0.04,
    name: 'KnightMaterial',
  });

  const mesh = new THREE.Mesh(knightGeom, material);
  mesh.name = 'Knight';
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const scene = new THREE.Scene();
  scene.add(mesh);

  const exporter = new GLTFExporter();
  console.log('Exporting to GLB format...');
  const glbBuffer = (await exporter.parseAsync(scene, { binary: true })) as ArrayBuffer;

  const outputPath = path.join(process.cwd(), 'public', 'models', 'knight.glb');
  fs.writeFileSync(outputPath, Buffer.from(glbBuffer));
  console.log(`Saved GLB asset to: ${outputPath} (${(glbBuffer.byteLength / 1024).toFixed(1)} KB)`);
}

exportKnightGLB().catch((err) => {
  console.error('Error generating Knight GLTF:', err);
  process.exit(1);
});
