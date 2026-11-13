import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Evaluator, Brush, SUBTRACTION } from 'three-bvh-csg';
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
 * Creates the authentic Rook 3D geometry matching the user's reference image:
 * - Broad, plump rounded cushion base with a fine horizontal groove indent
 * - Smooth unadorned concave tapering tower trunk (no extra mid-stem collar beads)
 * - Under-turret collar bead and undercut chamfer
 * - Sturdy cylindrical castle turret / parapet with deep inner floor basin
 * - 4 clean rectangular embrasures (crenels) cut into the battlements via CSG
 */
export function buildRookGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];

  // 1. Base underside
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.40, 0));
  points.push(new THREE.Vector2(0.425, 0.015));

  // Tier 1: Plump lower rounded torus cushion (y: 0.015 to 0.125)
  const torusSteps = 16;
  const torusCenterY = 0.075;
  const torusR = 0.052;
  const torusBaseX = 0.395;
  for (let i = 0; i <= torusSteps; i++) {
    const angle = -Math.PI / 2 + (i / torusSteps) * Math.PI;
    const r = torusBaseX + Math.cos(angle) * torusR;
    const y = torusCenterY + Math.sin(angle) * 0.055;
    points.push(new THREE.Vector2(r, y));
  }

  // Tier 2: Fine horizontal recessed groove line (y: 0.130 to 0.150)
  points.push(new THREE.Vector2(0.405, 0.132));
  points.push(new THREE.Vector2(0.388, 0.140)); // Groove valley
  points.push(new THREE.Vector2(0.400, 0.148));

  // Tier 3: Conical base bell flare rising into the trunk
  points.push(new THREE.Vector2(0.385, 0.170));
  points.push(new THREE.Vector2(0.345, 0.220));
  points.push(new THREE.Vector2(0.300, 0.270));
  points.push(new THREE.Vector2(0.265, 0.320));
  points.push(new THREE.Vector2(0.240, 0.360));

  // 2. Continuous, elegant concave tapering tower trunk (clean and unadorned)
  points.push(new THREE.Vector2(0.222, 0.420));
  points.push(new THREE.Vector2(0.198, 0.520));
  points.push(new THREE.Vector2(0.180, 0.630)); // Gentle waist
  points.push(new THREE.Vector2(0.184, 0.730));
  points.push(new THREE.Vector2(0.200, 0.810));
  points.push(new THREE.Vector2(0.222, 0.880));

  // 3. Collar bead directly under the turret
  points.push(new THREE.Vector2(0.242, 0.910));
  points.push(new THREE.Vector2(0.252, 0.928)); // Rounded collar ring
  points.push(new THREE.Vector2(0.238, 0.942)); // Undercut notch

  // 4. Turret outer rim & rampart
  points.push(new THREE.Vector2(0.282, 0.952)); // Chamfer out
  points.push(new THREE.Vector2(0.292, 0.975)); // Lower corner of turret
  points.push(new THREE.Vector2(0.296, 1.080));
  points.push(new THREE.Vector2(0.294, 1.205)); // Top outer rim of merlon
  points.push(new THREE.Vector2(0.286, 1.220)); // Rounded outer crown chamfer
  points.push(new THREE.Vector2(0.245, 1.220)); // Merlon top crest landing
  points.push(new THREE.Vector2(0.232, 1.205)); // Rounded inner crown chamfer

  // 5. Sunken inner parapet floor basin
  points.push(new THREE.Vector2(0.228, 1.115)); // Inner vertical wall
  points.push(new THREE.Vector2(0.218, 1.100)); // Inner floor fillet
  points.push(new THREE.Vector2(0, 1.100));     // Center of sunken floor

  const lathe = new THREE.LatheGeometry(points, 64);
  lathe.computeVertexNormals();

  // 6. Perform CSG Boolean Subtraction for the 4 symmetrical crenel embrasures
  // Two intersecting rectangular cutter boxes along X and Z
  const crenelWidth = 0.072;
  const crenelHeight = 0.140;
  const cutterLength = 0.680;

  const cutterX = new THREE.BoxGeometry(cutterLength, crenelHeight, crenelWidth);
  cutterX.translate(0, 1.170, 0);

  const cutterZ = new THREE.BoxGeometry(crenelWidth, crenelHeight, cutterLength);
  cutterZ.translate(0, 1.170, 0);

  const cuttersMerged = BufferGeometryUtils.mergeGeometries([cutterX, cutterZ]);

  try {
    const latheMesh = new THREE.Mesh(lathe, new THREE.MeshStandardMaterial());
    const cutterMesh = new THREE.Mesh(cuttersMerged, new THREE.MeshStandardMaterial());

    const bodyBrush = new Brush(latheMesh.geometry);
    bodyBrush.updateMatrixWorld();

    const cutBrush = new Brush(cutterMesh.geometry);
    cutBrush.updateMatrixWorld();

    const evaluator = new Evaluator();
    evaluator.useGroups = false;
    const resultBrush = evaluator.evaluate(bodyBrush, cutBrush, SUBTRACTION);

    let resultGeom = resultBrush.geometry;
    resultGeom = BufferGeometryUtils.mergeVertices(resultGeom, 0.0005);
    resultGeom.computeVertexNormals();
    return resultGeom;
  } catch (err) {
    console.warn('CSG subtraction fallback for Rook crenels:', err);
    return lathe;
  }
}

async function exportRookGLB() {
  console.log('Generating high-fidelity Rook 3D geometry matching reference image...');
  const rookGeom = buildRookGeometry();
  console.log(`Rook vertices: ${rookGeom.getAttribute('position').count}`);

  const material = new THREE.MeshStandardMaterial({
    color: 0xf6f1e6,
    roughness: 0.22,
    metalness: 0.02,
    name: 'RookMaterial',
  });

  const mesh = new THREE.Mesh(rookGeom, material);
  mesh.name = 'Rook';
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const scene = new THREE.Scene();
  scene.add(mesh);

  const exporter = new GLTFExporter();
  console.log('Exporting to GLB format...');
  const glbBuffer = (await exporter.parseAsync(scene, { binary: true })) as ArrayBuffer;

  const outputPath = path.join(process.cwd(), 'public', 'models', 'rook.glb');
  fs.writeFileSync(outputPath, Buffer.from(glbBuffer));
  console.log(`Saved GLB asset to: ${outputPath} (${(glbBuffer.byteLength / 1024).toFixed(1)} KB)`);
}

exportRookGLB().catch((err) => {
  console.error('Error generating Rook GLTF:', err);
  process.exit(1);
});
