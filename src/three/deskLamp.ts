import * as THREE from 'three';

export interface DeskLampResult {
  lampGroup: THREE.Group;
  spotLight: THREE.SpotLight;
  bulbPointLight: THREE.PointLight;
  boardLightPool?: THREE.Mesh;
}

/**
 * Creates a classic full-scale architectural desk lamp with a warm glowing incandescent yellow bulb.
 * Positioned out of the frame towards the left, scaled up by 10%, with bulb light boosted by 20%.
 */
export function createDeskLamp(targetPos = new THREE.Vector3(0, 0.1, 0)): DeskLampResult {
  const lampGroup = new THREE.Group();
  lampGroup.name = 'DeskLamp';

  // Base position on the marble table (table top is at y = -0.5, table spans to x = -11)
  // Moved out of the frame further to the left (x = -9.2)
  const basePos = new THREE.Vector3(-9.2, -0.5, -0.6);

  // --- MATERIALS ---
  // 1. Dark vintage bronze/blackened steel for base and arm structural rods
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x181a1f),
    roughness: 0.32,
    metalness: 0.88,
    envMapIntensity: 0.45,
  });

  // 2. Warm antique brushed brass for joints, collars, adjusters, and socket
  const brassMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd49f3e),
    roughness: 0.24,
    metalness: 0.85,
    envMapIntensity: 0.65,
  });

  // 3. Lampshade exterior: matte dark architectural charcoal enamel
  const shadeExteriorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x22262d),
    roughness: 0.30,
    metalness: 0.72,
    envMapIntensity: 0.45,
  });

  // 4. Lampshade interior: warm reflective satin gold that bounces bulb light
  const shadeInteriorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xf5cb68),
    roughness: 0.22,
    metalness: 0.60,
    emissive: new THREE.Color(0xff9e1b),
    emissiveIntensity: 0.90, // boosted interior reflector radiance
    side: THREE.BackSide,
  });

  // 5. Warm Glowing Incandescent Bulb (Unmistakably ON, +20% boosted light)
  const bulbMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xfff3a8),
    emissive: new THREE.Color(0xff9a18),
    emissiveIntensity: 4.1, // +20% boost from 3.4
    roughness: 0.12,
    metalness: 0.05,
  });

  // 6. Glowing Filament Core
  const filamentMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xfffde8),
  });

  // --- 1. HEAVY ARCHITECTURAL BASE (+10% size) ---
  const baseGroup = new THREE.Group();
  baseGroup.position.copy(basePos);

  // Bottom felt rim
  const baseFeltGeom = new THREE.CylinderGeometry(1.34, 1.40, 0.066, 36);
  const baseFeltMesh = new THREE.Mesh(baseFeltGeom, darkMetalMat);
  baseFeltMesh.position.y = 0.033;
  baseFeltMesh.castShadow = true;
  baseFeltMesh.receiveShadow = true;
  baseGroup.add(baseFeltMesh);

  // Stepped main weighted base
  const baseMainGeom = new THREE.CylinderGeometry(1.18, 1.34, 0.176, 36);
  const baseMainMesh = new THREE.Mesh(baseMainGeom, darkMetalMat);
  baseMainMesh.position.y = 0.154;
  baseMainMesh.castShadow = true;
  baseMainMesh.receiveShadow = true;
  baseGroup.add(baseMainMesh);

  // Decorative stepped brass ring
  const baseBrassRingGeom = new THREE.CylinderGeometry(0.94, 1.15, 0.088, 36);
  const baseBrassRing = new THREE.Mesh(baseBrassRingGeom, brassMat);
  baseBrassRing.position.y = 0.264;
  baseBrassRing.castShadow = true;
  baseGroup.add(baseBrassRing);

  // Brass pedestal neck
  const basePedestalGeom = new THREE.CylinderGeometry(0.46, 0.82, 0.20, 28);
  const basePedestal = new THREE.Mesh(basePedestalGeom, brassMat);
  basePedestal.position.y = 0.385;
  basePedestal.castShadow = true;
  baseGroup.add(basePedestal);

  // Brass rotary dimmer switch knob on base
  const switchGeom = new THREE.CylinderGeometry(0.088, 0.088, 0.132, 16);
  const switchMesh = new THREE.Mesh(switchGeom, brassMat);
  switchMesh.position.set(0.72, 0.24, 0.35);
  switchMesh.rotation.x = Math.PI / 2.3;
  baseGroup.add(switchMesh);

  lampGroup.add(baseGroup);

  // --- 2. LOWER CANTILEVER ARM (+10% size) ---
  const basePivotPos = new THREE.Vector3(basePos.x, basePos.y + 0.50, basePos.z);

  // Swivel hinge ball
  const swivelGeom = new THREE.SphereGeometry(0.26, 20, 20);
  const swivelMesh = new THREE.Mesh(swivelGeom, brassMat);
  swivelMesh.position.copy(basePivotPos);
  swivelMesh.castShadow = true;
  lampGroup.add(swivelMesh);

  // Elbow Joint Position (elevated, arching upward and leaning slightly inward)
  const elbowPos = new THREE.Vector3(basePos.x + 1.10, basePos.y + 4.05, basePos.z + 0.30);

  const lowerArmVec = elbowPos.clone().sub(basePivotPos);
  const lowerArmLength = lowerArmVec.length();
  const lowerArmMid = basePivotPos.clone().add(elbowPos).multiplyScalar(0.5);

  const lowerArmOrientation = new THREE.Quaternion();
  lowerArmOrientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), lowerArmVec.clone().normalize());

  // Dual parallel architectural tubular rods
  const rodGeom = new THREE.CylinderGeometry(0.053, 0.053, lowerArmLength, 16);
  const rodOffset1 = new THREE.Vector3(-0.10, 0, 0).applyQuaternion(lowerArmOrientation);
  const rodOffset2 = new THREE.Vector3(0.10, 0, 0).applyQuaternion(lowerArmOrientation);

  const rod1 = new THREE.Mesh(rodGeom, darkMetalMat);
  rod1.position.copy(lowerArmMid).add(rodOffset1);
  rod1.quaternion.copy(lowerArmOrientation);
  rod1.castShadow = true;
  lampGroup.add(rod1);

  const rod2 = new THREE.Mesh(rodGeom, darkMetalMat);
  rod2.position.copy(lowerArmMid).add(rodOffset2);
  rod2.quaternion.copy(lowerArmOrientation);
  rod2.castShadow = true;
  lampGroup.add(rod2);

  // Elbow Joint (Heavy knurled brass discs & wing-nut clamp)
  const elbowDiscGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.31, 24);
  const elbowDisc = new THREE.Mesh(elbowDiscGeom, brassMat);
  elbowDisc.position.copy(elbowPos);
  elbowDisc.rotation.z = Math.PI / 2;
  elbowDisc.castShadow = true;
  lampGroup.add(elbowDisc);

  // Brass wing-nut adjuster knob
  const wingNutGeom = new THREE.BoxGeometry(0.088, 0.48, 0.088);
  const wingNut = new THREE.Mesh(wingNutGeom, brassMat);
  wingNut.position.set(elbowPos.x + 0.20, elbowPos.y, elbowPos.z);
  lampGroup.add(wingNut);

  // --- 3. UPPER CANTILEVER ARM (+10% size) ---
  // Reaches inward from the left table wing (basePos.x = -9.2)
  // Head sits out of the center frame at x = -6.25, y = 5.85
  const headPos = new THREE.Vector3(basePos.x + 2.95, basePos.y + 6.35, basePos.z + 0.65);

  const upperArmVec = headPos.clone().sub(elbowPos);
  const upperArmLength = upperArmVec.length();
  const upperArmMid = elbowPos.clone().add(headPos).multiplyScalar(0.5);

  const upperArmOrientation = new THREE.Quaternion();
  upperArmOrientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), upperArmVec.clone().normalize());

  const upperRodGeom = new THREE.CylinderGeometry(0.057, 0.057, upperArmLength, 16);
  const upperRod = new THREE.Mesh(upperRodGeom, darkMetalMat);
  upperRod.position.copy(upperArmMid);
  upperRod.quaternion.copy(upperArmOrientation);
  upperRod.castShadow = true;
  lampGroup.add(upperRod);

  // Counterbalance spring detail along upper arm
  const springGeom = new THREE.CylinderGeometry(0.077, 0.077, upperArmLength * 0.55, 16);
  const springMesh = new THREE.Mesh(springGeom, brassMat);
  springMesh.position.copy(upperArmMid).add(new THREE.Vector3(0, 0.12, 0));
  springMesh.quaternion.copy(upperArmOrientation);
  lampGroup.add(springMesh);

  // --- 4. LAMP HEAD (SHADE & BULB) (+10% size) ---
  const lampHeadGroup = new THREE.Group();
  lampHeadGroup.position.copy(headPos);

  // Aim direction towards center of chessboard
  const aimDirection = targetPos.clone().sub(headPos).normalize();

  // Head swivel joint
  const headSwivelGeom = new THREE.SphereGeometry(0.22, 20, 20);
  const headSwivel = new THREE.Mesh(headSwivelGeom, brassMat);
  lampHeadGroup.add(headSwivel);

  // Assembly oriented along aim direction
  const shadeAssembly = new THREE.Group();
  shadeAssembly.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), aimDirection);

  // Brass socket cylinder
  const socketGeom = new THREE.CylinderGeometry(0.24, 0.28, 0.48, 24);
  const socketMesh = new THREE.Mesh(socketGeom, brassMat);
  socketMesh.position.y = -0.27;
  socketMesh.castShadow = true;
  shadeAssembly.add(socketMesh);

  // Classic Flared Bell Lampshade (+10% size: top 0.42, bottom 1.34, height 1.38)
  const shadeHeight = 1.38;
  const shadeGeom = new THREE.CylinderGeometry(0.42, 1.34, shadeHeight, 36, 1, true);

  // Exterior shade (charcoal matte enamel)
  const shadeExterior = new THREE.Mesh(shadeGeom, shadeExteriorMat);
  shadeExterior.position.y = -0.27 - shadeHeight / 2;
  shadeExterior.castShadow = true;
  shadeExterior.receiveShadow = true;
  shadeAssembly.add(shadeExterior);

  // Interior shade (gold reflector)
  const shadeInterior = new THREE.Mesh(shadeGeom, shadeInteriorMat);
  shadeInterior.position.copy(shadeExterior.position);
  shadeAssembly.add(shadeInterior);

  // Polished brass rim at bottom opening of shade
  const rimGeom = new THREE.TorusGeometry(1.34, 0.035, 16, 36);
  rimGeom.rotateX(Math.PI / 2);
  const rimMesh = new THREE.Mesh(rimGeom, brassMat);
  rimMesh.position.y = -0.27 - shadeHeight;
  shadeAssembly.add(rimMesh);

  // --- 5. THE GLOWING YELLOW BULB (CLEARLY VISIBLE & ON) ---
  const bulbLocalY = -0.27 - shadeHeight * 0.65;

  // Glass bulb sphere & neck (+10% size)
  const bulbGeom = new THREE.SphereGeometry(0.40, 32, 32);
  const bulbMesh = new THREE.Mesh(bulbGeom, bulbMat);
  bulbMesh.position.y = bulbLocalY;
  shadeAssembly.add(bulbMesh);

  // Bulb brass screw base
  const bulbBaseGeom = new THREE.CylinderGeometry(0.20, 0.24, 0.30, 20);
  const bulbBaseMesh = new THREE.Mesh(bulbBaseGeom, brassMat);
  bulbBaseMesh.position.y = bulbLocalY + 0.35;
  shadeAssembly.add(bulbBaseMesh);

  // Inner filament ring (glowing white-yellow)
  const filamentGeom = new THREE.TorusGeometry(0.13, 0.028, 10, 24);
  filamentGeom.rotateX(Math.PI / 2);
  const filamentMesh = new THREE.Mesh(filamentGeom, filamentMat);
  filamentMesh.position.y = bulbLocalY;
  shadeAssembly.add(filamentMesh);

  // Glowing corona halo sprite around bulb (+20% radiance)
  const glowTexture = createRadialGlowTexture();
  const glowMat = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffaa26,
    transparent: true,
    opacity: 0.82, // +20% from 0.68
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glowSprite = new THREE.Sprite(glowMat);
  glowSprite.scale.set(2.8, 2.8, 1.0);
  glowSprite.position.y = bulbLocalY;
  shadeAssembly.add(glowSprite);

  lampHeadGroup.add(shadeAssembly);
  lampGroup.add(lampHeadGroup);

  // Calculate world positions for lighting
  const bulbWorldPos = headPos.clone().add(
    new THREE.Vector3(0, bulbLocalY, 0).applyQuaternion(shadeAssembly.quaternion)
  );

  // Spotlight origin: placed at the mouth / aperture of the shade pointing directly at the board
  const shadeAperturePos = headPos.clone().add(
    aimDirection.clone().multiplyScalar(0.27 + shadeHeight + 0.15)
  );

  // --- 6. YELLOW LIGHTING (+20% Boost: Warm, Cozy, Dim, Non-Harsh) ---
  const warmLampColor = new THREE.Color(0xffb542);

  // Primary SpotLight directed towards the chessboard (+20%: 17.5 vs 14.5)
  const spotLight = new THREE.SpotLight(
    warmLampColor,
    17.5,          // +20% boost from 14.5
    22.0,          // Range covering distance from left table position
    Math.PI / 3.0, // Wide cone bathing the 8x8 chessboard
    0.85,          // High penumbra = soft, feathered edge (no harsh line)
    1.15           // Smooth natural decay
  );
  spotLight.position.copy(shadeAperturePos);
  spotLight.target.position.copy(targetPos);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 0.2;
  spotLight.shadow.camera.far = 22.0;
  spotLight.shadow.bias = -0.0004;
  spotLight.shadow.normalBias = 0.03;
  spotLight.shadow.radius = 3.8; // Soft diffused shadow edges

  // Ambient fill point light centered at the glowing bulb (+20%: 5.4 vs 4.5)
  const bulbPointLight = new THREE.PointLight(
    warmLampColor,
    5.4,
    14.0,
    1.3
  );
  bulbPointLight.position.copy(bulbWorldPos);

  // Soft warm light pool disc on the board surface (+20% opacity)
  const poolTexture = createBoardLightPoolTexture();
  const poolGeom = new THREE.PlaneGeometry(11.5, 11.5);
  const poolMat = new THREE.MeshBasicMaterial({
    map: poolTexture,
    transparent: true,
    opacity: 0.38, // +20% from 0.32
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const boardLightPool = new THREE.Mesh(poolGeom, poolMat);
  boardLightPool.rotation.x = -Math.PI / 2;
  boardLightPool.position.set(-0.2, 0.046, 0.0);

  return {
    lampGroup,
    spotLight,
    bulbPointLight,
    boardLightPool,
  };
}

/**
 * Creates a soft radial glow texture for the incandescent bulb's optical corona.
 */
function createRadialGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 245, 190, 1.0)');
    gradient.addColorStop(0.25, 'rgba(255, 185, 50, 0.75)');
    gradient.addColorStop(0.55, 'rgba(255, 140, 20, 0.35)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0.0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates a soft radial light pool texture on the chessboard.
 */
function createBoardLightPoolTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(100, 128, 10, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 195, 80, 0.85)');
    gradient.addColorStop(0.35, 'rgba(255, 170, 50, 0.50)');
    gradient.addColorStop(0.65, 'rgba(255, 140, 25, 0.22)');
    gradient.addColorStop(1, 'rgba(255, 110, 0, 0.0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}
