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
 * Creates the authentic Staunton King 3D geometry matching the user's reference image:
 * - Broad, plump cushion base with bottom rim platter, deep horizontal groove, and massive rounded torus
 * - Graceful concave bell scotia rising to a distinct convex collar fillet ring
 * - Tall, slender, stately concave hourglass column trunk
 * - Prominent multi-tier imperial collar: thick rounded torus platter ring + secondary convex bead
 * - Flared conical chalice crown with soft rounded rim and convex domed ceiling
 * - Rounded pedestal bead at the dome apex
 * - Iconic Staunton Cross Pattée with four flaring arms and beveled facets
 * - Apex pearl ball sitting proudly atop the cross
 */
export function buildKingGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];

  // 1. Base Underside
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.420, 0));
  points.push(new THREE.Vector2(0.445, 0.015));

  // Tier 1: Lower platter rim
  points.push(new THREE.Vector2(0.455, 0.030));
  points.push(new THREE.Vector2(0.445, 0.045));

  // Tier 2: Deep recessed horizontal groove
  points.push(new THREE.Vector2(0.418, 0.055));
  points.push(new THREE.Vector2(0.412, 0.065));

  // Tier 3: Massive plump torus cushion ring (y: 0.065 to 0.185)
  const torusSteps = 18;
  const torusCenterY = 0.125;
  const torusR = 0.065;
  const torusBaseX = 0.415;
  for (let i = 0; i <= torusSteps; i++) {
    const angle = -Math.PI / 2 + (i / torusSteps) * Math.PI;
    const r = torusBaseX + Math.cos(angle) * torusR;
    const y = torusCenterY + Math.sin(angle) * 0.060;
    points.push(new THREE.Vector2(r, y));
  }

  // Tier 4: Concave bell / scotia taper
  points.push(new THREE.Vector2(0.395, 0.200));
  points.push(new THREE.Vector2(0.355, 0.250));
  points.push(new THREE.Vector2(0.315, 0.300));
  points.push(new THREE.Vector2(0.285, 0.345));

  // Tier 5: Distinct convex fillet / collar bead ring at the base of the column
  points.push(new THREE.Vector2(0.280, 0.365));
  points.push(new THREE.Vector2(0.308, 0.395)); // Convex fillet crest
  points.push(new THREE.Vector2(0.310, 0.415));
  points.push(new THREE.Vector2(0.288, 0.440));
  points.push(new THREE.Vector2(0.255, 0.455)); // Step into column stem

  // 2. Tall, Stately Concave Column Stem
  points.push(new THREE.Vector2(0.235, 0.485));
  points.push(new THREE.Vector2(0.198, 0.600));
  points.push(new THREE.Vector2(0.174, 0.740));
  points.push(new THREE.Vector2(0.165, 0.880)); // Slender waist
  points.push(new THREE.Vector2(0.170, 1.020));
  points.push(new THREE.Vector2(0.188, 1.150));
  points.push(new THREE.Vector2(0.218, 1.270));
  points.push(new THREE.Vector2(0.255, 1.360)); // Flaring into collar

  // 3. Double Imperial Collar Assembly
  // Tier 1: Very prominent, thick rounded torus platter ring
  points.push(new THREE.Vector2(0.298, 1.385));
  points.push(new THREE.Vector2(0.362, 1.415)); // Bulging outer edge
  points.push(new THREE.Vector2(0.368, 1.435));
  points.push(new THREE.Vector2(0.352, 1.460));
  points.push(new THREE.Vector2(0.280, 1.480)); // Upper ledge

  // Tier 2: Recessed notch & secondary convex collar bead
  points.push(new THREE.Vector2(0.252, 1.492)); // Undercut groove
  points.push(new THREE.Vector2(0.284, 1.512)); // Second convex bead
  points.push(new THREE.Vector2(0.286, 1.530));
  points.push(new THREE.Vector2(0.248, 1.548)); // Recessed groove beneath chalice

  // 4. Smooth Flared Chalice Crown with Convex Domed Ceiling
  points.push(new THREE.Vector2(0.254, 1.555));
  points.push(new THREE.Vector2(0.274, 1.615));
  points.push(new THREE.Vector2(0.304, 1.705));
  points.push(new THREE.Vector2(0.338, 1.800));
  points.push(new THREE.Vector2(0.360, 1.885)); // Crown outer rim
  points.push(new THREE.Vector2(0.354, 1.905)); // Rounded rim top
  points.push(new THREE.Vector2(0.315, 1.915)); // Inner rim chamfer

  // Convex domed roof
  points.push(new THREE.Vector2(0.255, 1.940));
  points.push(new THREE.Vector2(0.185, 1.965));
  points.push(new THREE.Vector2(0.105, 1.985));
  points.push(new THREE.Vector2(0.060, 1.995));

  // Pedestal bead directly under the cross finial
  points.push(new THREE.Vector2(0.052, 2.005));
  points.push(new THREE.Vector2(0.078, 2.025)); // Bead equator
  points.push(new THREE.Vector2(0.080, 2.040));
  points.push(new THREE.Vector2(0.052, 2.060));
  points.push(new THREE.Vector2(0.030, 2.070));
  points.push(new THREE.Vector2(0.000, 2.070));

  const lathe = new THREE.LatheGeometry(points, 64);
  lathe.computeVertexNormals();

  // 5. Authentic Staunton Cross Pattée with Top Pearl
  // Build 2D cross pattée outline
  const crossShape = new THREE.Shape();
  const armInner = 0.038;  // waist width / 2
  const armOuter = 0.092;  // flare width at end / 2
  const armLen = 0.118;    // arm length from center

  // Starting from center-top right corner:
  crossShape.moveTo(armInner, armInner);

  // Top arm
  crossShape.lineTo(armOuter, armLen);
  crossShape.lineTo(-armOuter, armLen);
  crossShape.lineTo(-armInner, armInner);

  // Left arm
  crossShape.lineTo(-armLen, armOuter);
  crossShape.lineTo(-armLen, -armOuter);
  crossShape.lineTo(-armInner, -armInner);

  // Bottom arm
  crossShape.lineTo(-armOuter, -armLen);
  crossShape.lineTo(armOuter, -armLen);
  crossShape.lineTo(armInner, -armInner);

  // Right arm
  crossShape.lineTo(armLen, -armOuter);
  crossShape.lineTo(armLen, armOuter);
  crossShape.closePath();

  const crossExtrude = new THREE.ExtrudeGeometry(crossShape, {
    depth: 0.048,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.010,
    bevelSegments: 3,
  });
  crossExtrude.center();
  const crossCenterY = 2.070 + armLen + 0.010; // ~2.20
  crossExtrude.translate(0, crossCenterY, 0);

  // Cross neck pedestal stem connecting cross to the bead
  const stemCylinder = new THREE.CylinderGeometry(0.032, 0.032, 0.035, 24);
  stemCylinder.translate(0, 2.075, 0);

  // Top Pearl Ball resting on top of the cross (clearly visible in reference image)
  const topPearl = new THREE.SphereGeometry(0.035, 32, 24);
  topPearl.translate(0, crossCenterY + armLen + 0.030, 0);

function mergeBufferGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
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

  return mergeBufferGeometries([
    lathe,
    crossExtrude,
    stemCylinder,
    topPearl,
  ]);
}

async function exportKingGLB() {
  console.log('Generating high-fidelity King 3D geometry matching reference image...');
  const kingGeom = buildKingGeometry();
  console.log(`King vertices: ${kingGeom.getAttribute('position').count}`);

  const material = new THREE.MeshStandardMaterial({
    color: 0xf6f1e6,
    roughness: 0.22,
    metalness: 0.02,
    name: 'KingMaterial',
  });

  const mesh = new THREE.Mesh(kingGeom, material);
  mesh.name = 'King';
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const scene = new THREE.Scene();
  scene.add(mesh);

  const exporter = new GLTFExporter();
  console.log('Exporting to GLB format...');
  const glbBuffer = (await exporter.parseAsync(scene, { binary: true })) as ArrayBuffer;

  const outputPath = path.join(process.cwd(), 'public', 'models', 'king.glb');
  fs.writeFileSync(outputPath, Buffer.from(glbBuffer));
  console.log(`Saved GLB asset to: ${outputPath} (${(glbBuffer.byteLength / 1024).toFixed(1)} KB)`);
}

exportKingGLB().catch((err) => {
  console.error('Error generating King GLTF:', err);
  process.exit(1);
});
