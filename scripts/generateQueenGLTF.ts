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
 * Creates the authentic Queen 3D geometry matching the user's reference image:
 * - Broad plump cushion base with lower torus, fine groove, and concave scotia
 * - Distinct convex collar/fillet bead step at the base of the column
 * - Tall, slender, elegant concave column trunk flaring toward the upper collar
 * - Prominent multi-tier collar: wide rounded saucer platter flange disc + upper rounded bead ring
 * - Graceful flaring trumpet chalice coronet
 * - 12 crisp scalloped/fluted crenellation crest points around the crown rim cut via CSG
 * - Sunken inner basin with an authentic rounded central finial pommel ball peaking at the apex
 */
export function buildQueenGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];

  // 1. Base Underside
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.41, 0));
  points.push(new THREE.Vector2(0.435, 0.015));

  // Tier 1: Plump lower torus cushion ring (y: 0.015 to 0.125)
  const torusSteps = 16;
  const torusCenterY = 0.075;
  const torusR = 0.052;
  const torusBaseX = 0.405;
  for (let i = 0; i <= torusSteps; i++) {
    const angle = -Math.PI / 2 + (i / torusSteps) * Math.PI;
    const r = torusBaseX + Math.cos(angle) * torusR;
    const y = torusCenterY + Math.sin(angle) * 0.055;
    points.push(new THREE.Vector2(r, y));
  }

  // Tier 2: Recessed horizontal groove ring indent (y: 0.130 to 0.150)
  points.push(new THREE.Vector2(0.415, 0.132));
  points.push(new THREE.Vector2(0.398, 0.140)); // Groove valley
  points.push(new THREE.Vector2(0.410, 0.148));

  // Tier 3: Concave bell / scotia curve rising up
  points.push(new THREE.Vector2(0.395, 0.170));
  points.push(new THREE.Vector2(0.355, 0.220));
  points.push(new THREE.Vector2(0.315, 0.275));
  points.push(new THREE.Vector2(0.285, 0.330));

  // Tier 4: Distinct convex fillet / collar bead ring at the base of the column (y: 0.350 to 0.430)
  points.push(new THREE.Vector2(0.275, 0.355));
  points.push(new THREE.Vector2(0.298, 0.385)); // Convex fillet crest
  points.push(new THREE.Vector2(0.300, 0.400));
  points.push(new THREE.Vector2(0.280, 0.420));
  points.push(new THREE.Vector2(0.245, 0.435)); // Step into column

  // 2. Tall, slender concave column stem (y: 0.440 to 1.280)
  points.push(new THREE.Vector2(0.220, 0.460));
  points.push(new THREE.Vector2(0.185, 0.560));
  points.push(new THREE.Vector2(0.160, 0.700));
  points.push(new THREE.Vector2(0.152, 0.850)); // Narrowest waist
  points.push(new THREE.Vector2(0.156, 0.980));
  points.push(new THREE.Vector2(0.172, 1.100));
  points.push(new THREE.Vector2(0.200, 1.200));
  points.push(new THREE.Vector2(0.235, 1.280)); // Flaring into collar

  // 3. Prominent Upper Collar Assembly
  // Platter disc: wide rounded saucer flange disc (y: 1.300 to 1.400)
  points.push(new THREE.Vector2(0.285, 1.310));
  points.push(new THREE.Vector2(0.342, 1.335)); // Outermost edge of saucer
  points.push(new THREE.Vector2(0.348, 1.355)); // Rounded convex edge
  points.push(new THREE.Vector2(0.335, 1.375)); // Top edge
  points.push(new THREE.Vector2(0.250, 1.395)); // Upper shelf landing

  // Recessed groove & upper rounded collar bead (y: 1.400 to 1.480)
  points.push(new THREE.Vector2(0.230, 1.410)); // Recessed notch
  points.push(new THREE.Vector2(0.262, 1.435)); // Upper collar bead ring
  points.push(new THREE.Vector2(0.260, 1.455));
  points.push(new THREE.Vector2(0.225, 1.475)); // Pinched neck below coronet

  // 4. Graceful Trumpet Coronet Chalice (y: 1.480 to 1.900)
  points.push(new THREE.Vector2(0.225, 1.490));
  points.push(new THREE.Vector2(0.255, 1.550));
  points.push(new THREE.Vector2(0.295, 1.630));
  points.push(new THREE.Vector2(0.335, 1.720));
  points.push(new THREE.Vector2(0.365, 1.810));
  points.push(new THREE.Vector2(0.380, 1.885)); // Top outer rim of crown crest
  points.push(new THREE.Vector2(0.368, 1.900)); // Rounded rim top
  points.push(new THREE.Vector2(0.342, 1.895)); // Inner rim chamfer

  // 5. Sunken Inner Basin Floor (y: 1.890 down to 1.660)
  points.push(new THREE.Vector2(0.305, 1.810)); // Inner bowl wall
  points.push(new THREE.Vector2(0.245, 1.730));
  points.push(new THREE.Vector2(0.180, 1.675));
  points.push(new THREE.Vector2(0.120, 1.655)); // Basin floor
  points.push(new THREE.Vector2(0.065, 1.650)); // Pedestal base of central finial

  // 6. Central Finial Ball / Pommel (y: 1.650 to 1.980)
  // Pinched neck
  points.push(new THREE.Vector2(0.055, 1.670));
  points.push(new THREE.Vector2(0.068, 1.710));
  // Teardrop / spherical finial ball
  points.push(new THREE.Vector2(0.095, 1.765));
  points.push(new THREE.Vector2(0.110, 1.830)); // Equator
  points.push(new THREE.Vector2(0.100, 1.890));
  points.push(new THREE.Vector2(0.075, 1.940));
  points.push(new THREE.Vector2(0.040, 1.970));
  points.push(new THREE.Vector2(0.000, 1.985)); // Apex tip

  const lathe = new THREE.LatheGeometry(points, 64);
  lathe.computeVertexNormals();

  // 7. CSG Boolean Subtraction for the 12 Scalloped V-Notch Crenels of the Coronet
  const numCrenels = 12;
  const cutters: THREE.BufferGeometry[] = [];

  for (let i = 0; i < numCrenels; i++) {
    const angle = (i / numCrenels) * Math.PI * 2;

    // V-shaped notch / fluting cutter using an extruded triangular wedge
    const wedgeShape = new THREE.Shape();
    wedgeShape.moveTo(-0.048, 0.12);
    wedgeShape.lineTo(0.048, 0.12);
    wedgeShape.lineTo(0, -0.06);
    wedgeShape.closePath();

    const wedgeExtrude = new THREE.ExtrudeGeometry(wedgeShape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.010,
      bevelSize: 0.008,
      bevelSegments: 2,
    });
    wedgeExtrude.center();

    // Position at radial angle around crown rim
    wedgeExtrude.rotateZ(0.24); // Angled with the trumpet flare of the coronet
    wedgeExtrude.rotateY(-angle);

    const radius = 0.365;
    const cx = Math.cos(angle) * radius;
    const cz = Math.sin(angle) * radius;
    wedgeExtrude.translate(cx, 1.865, cz);

    cutters.push(wedgeExtrude);
  }

  const mergedCutters = BufferGeometryUtils.mergeGeometries(cutters);

  try {
    const latheMesh = new THREE.Mesh(lathe, new THREE.MeshStandardMaterial());
    const cutterMesh = new THREE.Mesh(mergedCutters, new THREE.MeshStandardMaterial());

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
    console.warn('CSG subtraction fallback for Queen coronet crenels:', err);
    return lathe;
  }
}

async function exportQueenGLB() {
  console.log('Generating high-fidelity Queen 3D geometry matching reference image...');
  const queenGeom = buildQueenGeometry();
  console.log(`Queen vertices: ${queenGeom.getAttribute('position').count}`);

  const material = new THREE.MeshStandardMaterial({
    color: 0xf6f1e6,
    roughness: 0.22,
    metalness: 0.02,
    name: 'QueenMaterial',
  });

  const mesh = new THREE.Mesh(queenGeom, material);
  mesh.name = 'Queen';
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const scene = new THREE.Scene();
  scene.add(mesh);

  const exporter = new GLTFExporter();
  console.log('Exporting to GLB format...');
  const glbBuffer = (await exporter.parseAsync(scene, { binary: true })) as ArrayBuffer;

  const outputPath = path.join(process.cwd(), 'public', 'models', 'queen.glb');
  fs.writeFileSync(outputPath, Buffer.from(glbBuffer));
  console.log(`Saved GLB asset to: ${outputPath} (${(glbBuffer.byteLength / 1024).toFixed(1)} KB)`);
}

exportQueenGLB().catch((err) => {
  console.error('Error generating Queen GLTF:', err);
  process.exit(1);
});
