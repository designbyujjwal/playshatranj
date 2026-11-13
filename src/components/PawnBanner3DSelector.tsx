import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CheckCircle2, RotateCw, Sparkles, Shield, Swords } from 'lucide-react';
import { getPieceGeometry } from '../three/pieceGeometries';
import { soundEffects } from '../utils/audio';
import type { PieceColor } from '../types';

interface PawnBanner3DSelectorProps {
  selectedSide: PieceColor;
  onSelectSide: (side: PieceColor) => void;
}

// Generates smooth radial drop shadow texture for pawn pedestals
function createShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 120);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
  grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export const PawnBanner3DSelector: React.FC<PawnBanner3DSelectorProps> = ({
  selectedSide,
  onSelectSide,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveredSide, setIsHoveredSide] = useState<PieceColor | null>(null);

  // References to Three objects for animation & raycasting
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const whiteGroupRef = useRef<THREE.Group | null>(null);
  const blackGroupRef = useRef<THREE.Group | null>(null);
  const whiteRingRef = useRef<THREE.Mesh | null>(null);
  const blackRingRef = useRef<THREE.Mesh | null>(null);
  const whiteShadowRef = useRef<THREE.Mesh | null>(null);
  const blackShadowRef = useRef<THREE.Mesh | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const dragTargetSideRef = useRef<PieceColor | null>(null);
  const previousPointerXRef = useRef(0);
  const sideSelectedRef = useRef<PieceColor>(selectedSide);

  // Keep ref in sync
  useEffect(() => {
    sideSelectedRef.current = selectedSide;
  }, [selectedSide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 260;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.8);
    camera.lookAt(0, 0.65, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Chiaroscuro Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.3);
    scene.add(ambientLight);

    // Warm overhead key candlelight spotlight
    const keySpot = new THREE.SpotLight(0xffdfa8, 2.4);
    keySpot.position.set(0, 6.5, 4.2);
    keySpot.angle = Math.PI / 4;
    keySpot.penumbra = 0.65;
    keySpot.castShadow = true;
    keySpot.shadow.mapSize.width = 1024;
    keySpot.shadow.mapSize.height = 1024;
    keySpot.shadow.bias = -0.0008;
    scene.add(keySpot);

    // Subtle side fill lights for each side
    const whiteSideLight = new THREE.PointLight(0xfffaed, 1.2, 8);
    whiteSideLight.position.set(-2.5, 2.5, 2.0);
    scene.add(whiteSideLight);

    const blackSideLight = new THREE.PointLight(0xe8d0b0, 1.0, 8);
    blackSideLight.position.set(2.5, 2.5, 2.0);
    scene.add(blackSideLight);

    // Back rim light to outline silhouette of the ebony piece
    const rimLight = new THREE.DirectionalLight(0xb0d0ff, 1.2);
    rimLight.position.set(0, 4.0, -4.5);
    scene.add(rimLight);

    // 3. Shared Assets (Geometry, Textures & Materials)
    const pawnGeometry = getPieceGeometry('p');
    const shadowTexture = createShadowTexture();

    // White Pawn Material: Warm Vintage Ivory / Porcelain with soft specular gloss
    const whitePieceMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf1e7d7),
      roughness: 0.22,
      metalness: 0.02,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      reflectivity: 0.8,
      ior: 1.54,
      sheen: 0.25,
      sheenColor: new THREE.Color(0xffe8b0),
      specularIntensity: 0.9,
    });

    // Black Pawn Material: Deep Polished Obsidian / Ebony with crisp clearcoat rim
    const blackPieceMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x191d24),
      roughness: 0.18,
      metalness: 0.06,
      clearcoat: 0.65,
      clearcoatRoughness: 0.14,
      reflectivity: 0.95,
      ior: 1.56,
      sheen: 0.45,
      sheenColor: new THREE.Color(0xe0e8f8),
      specularIntensity: 1.0,
    });

    // Pedestal materials
    const darkWoodPedestalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1a0f08),
      roughness: 0.45,
      metalness: 0.15,
    });

    const goldPedestalTrimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd4af37),
      roughness: 0.28,
      metalness: 0.85,
    });

    const shadowPlaneGeom = new THREE.PlaneGeometry(1.6, 1.6);
    shadowPlaneGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    // Ring geometry for radiant golden selection dais
    const ringGeom = new THREE.RingGeometry(0.72, 0.82, 48);
    ringGeom.rotateX(-Math.PI / 2);

    // Helper to build a complete pedestal dais
    const createPedestal = () => {
      const pGroup = new THREE.Group();

      // Lower tiered disc
      const lowerCylGeom = new THREE.CylinderGeometry(0.74, 0.82, 0.10, 48);
      const lowerMesh = new THREE.Mesh(lowerCylGeom, darkWoodPedestalMat);
      lowerMesh.position.y = 0.05;
      lowerMesh.receiveShadow = true;
      pGroup.add(lowerMesh);

      // Gold inlay torus trim
      const goldTrimGeom = new THREE.TorusGeometry(0.75, 0.02, 16, 48);
      goldTrimGeom.rotateX(Math.PI / 2);
      const goldTrim = new THREE.Mesh(goldTrimGeom, goldPedestalTrimMat);
      goldTrim.position.y = 0.10;
      pGroup.add(goldTrim);

      // Upper stepped disc
      const upperCylGeom = new THREE.CylinderGeometry(0.68, 0.72, 0.06, 48);
      const upperMesh = new THREE.Mesh(upperCylGeom, darkWoodPedestalMat);
      upperMesh.position.y = 0.13;
      upperMesh.receiveShadow = true;
      pGroup.add(upperMesh);

      // Inner felt disc on top of pedestal
      const topFeltGeom = new THREE.CircleGeometry(0.64, 32);
      topFeltGeom.rotateX(-Math.PI / 2);
      const topFeltMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x0e0905),
        roughness: 0.85,
      });
      const topFelt = new THREE.Mesh(topFeltGeom, topFeltMat);
      topFelt.position.y = 0.161;
      topFelt.receiveShadow = true;
      pGroup.add(topFelt);

      return pGroup;
    };

    // 4. Spawn White Pawn Group (Left side, x = -1.6)
    const whiteGroup = new THREE.Group();
    whiteGroup.position.set(-1.58, 0, 0);
    whiteGroup.userData = { side: 'w' };

    const whitePedestal = createPedestal();
    whiteGroup.add(whitePedestal);

    const whitePawnMesh = new THREE.Mesh(pawnGeometry, whitePieceMaterial);
    whitePawnMesh.position.set(0, 0.16, 0);
    whitePawnMesh.castShadow = true;
    whitePawnMesh.receiveShadow = true;
    whiteGroup.add(whitePawnMesh);

    const whiteShadow = new THREE.Mesh(shadowPlaneGeom, shadowMat.clone());
    whiteShadow.position.set(0, 0.163, 0);
    whiteGroup.add(whiteShadow);
    whiteShadowRef.current = whiteShadow;

    // Glowing selection halo on the pedestal
    const whiteRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd4af37),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const whiteRing = new THREE.Mesh(ringGeom, whiteRingMat);
    whiteRing.position.set(0, 0.165, 0);
    whiteGroup.add(whiteRing);
    whiteRingRef.current = whiteRing;

    scene.add(whiteGroup);
    whiteGroupRef.current = whiteGroup;

    // 5. Spawn Black Pawn Group (Right side, x = +1.6)
    const blackGroup = new THREE.Group();
    blackGroup.position.set(1.58, 0, 0);
    blackGroup.userData = { side: 'b' };

    const blackPedestal = createPedestal();
    blackGroup.add(blackPedestal);

    const blackPawnMesh = new THREE.Mesh(pawnGeometry, blackPieceMaterial);
    blackPawnMesh.position.set(0, 0.16, 0);
    blackPawnMesh.castShadow = true;
    blackPawnMesh.receiveShadow = true;
    blackGroup.add(blackPawnMesh);

    const blackShadow = new THREE.Mesh(shadowPlaneGeom, shadowMat.clone());
    blackShadow.position.set(0, 0.163, 0);
    blackGroup.add(blackShadow);
    blackShadowRef.current = blackShadow;

    const blackRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd4af37),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const blackRing = new THREE.Mesh(ringGeom, blackRingMat);
    blackRing.position.set(0, 0.165, 0);
    blackGroup.add(blackRing);
    blackRingRef.current = blackRing;

    scene.add(blackGroup);
    blackGroupRef.current = blackGroup;

    // 6. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;

      // Adjust camera distance and pawn spacing on smaller mobile widths
      if (newW < 420) {
        camera.position.z = 6.8;
        whiteGroup.position.x = -1.25;
        blackGroup.position.x = 1.25;
      } else if (newW < 600) {
        camera.position.z = 6.2;
        whiteGroup.position.x = -1.45;
        blackGroup.position.x = 1.45;
      } else {
        camera.position.z = 5.8;
        whiteGroup.position.x = -1.58;
        blackGroup.position.x = 1.58;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    handleResize();

    // 7. Interactive Animation Loop
    let clock = new THREE.Clock();
    let currentWhiteY = 0;
    let currentBlackY = 0;
    let whiteSpin = 0;
    let blackSpin = 0;

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const isWhiteChosen = sideSelectedRef.current === 'w';
      const isBlackChosen = sideSelectedRef.current === 'b';

      // Smooth elevation lerping
      const targetWhiteY = isWhiteChosen ? 0.22 : 0;
      const targetBlackY = isBlackChosen ? 0.22 : 0;

      currentWhiteY += (targetWhiteY - currentWhiteY) * 0.12;
      currentBlackY += (targetBlackY - currentBlackY) * 0.12;

      if (whitePawnMesh) {
        whitePawnMesh.position.y = 0.16 + currentWhiteY;
      }
      if (blackPawnMesh) {
        blackPawnMesh.position.y = 0.16 + currentBlackY;
      }

      // Continuous subtle idle turntable rotation for chosen piece
      if (!isDraggingRef.current) {
        whiteSpin += delta * (isWhiteChosen ? 0.75 : 0.2);
        blackSpin += delta * (isBlackChosen ? 0.75 : 0.2);
      }

      if (whitePawnMesh) whitePawnMesh.rotation.y = whiteSpin;
      if (blackPawnMesh) blackPawnMesh.rotation.y = blackSpin;

      // Pulse golden selection rings
      if (whiteRingRef.current) {
        const mat = whiteRingRef.current.material as THREE.MeshBasicMaterial;
        const targetOpacity = isWhiteChosen ? 0.75 + Math.sin(elapsed * 4) * 0.2 : 0;
        mat.opacity += (targetOpacity - mat.opacity) * 0.15;
        whiteRingRef.current.rotation.z = elapsed * 0.5;
      }

      if (blackRingRef.current) {
        const mat = blackRingRef.current.material as THREE.MeshBasicMaterial;
        const targetOpacity = isBlackChosen ? 0.75 + Math.sin(elapsed * 4) * 0.2 : 0;
        mat.opacity += (targetOpacity - mat.opacity) * 0.15;
        blackRingRef.current.rotation.z = elapsed * 0.5;
      }

      // Shadow opacity scaling when lifted
      if (whiteShadowRef.current) {
        const mat = whiteShadowRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = isWhiteChosen ? 0.55 : 0.85;
      }
      if (blackShadowRef.current) {
        const mat = blackShadowRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = isBlackChosen ? 0.55 : 0.85;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Raycasting & Pointer Handlers
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const getRaycastSide = (clientX: number, clientY: number): PieceColor | null => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      // Check intersections against white and black hierarchies
      const whiteIntersects = raycaster.intersectObjects(whiteGroup.children, true);
      const blackIntersects = raycaster.intersectObjects(blackGroup.children, true);

      if (whiteIntersects.length > 0 && blackIntersects.length > 0) {
        return whiteIntersects[0].distance < blackIntersects[0].distance ? 'w' : 'b';
      }
      if (whiteIntersects.length > 0) return 'w';
      if (blackIntersects.length > 0) return 'b';

      // Geometric screen fallback: left half = white, right half = black
      if (pointer.x < -0.15) return 'w';
      if (pointer.x > 0.15) return 'b';

      return null;
    };

    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      previousPointerXRef.current = e.clientX;
      isDraggingRef.current = false;
      dragTargetSideRef.current = getRaycastSide(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);

      if (e.buttons > 0 && (deltaX > 4 || deltaY > 4)) {
        isDraggingRef.current = true;
        const moveDelta = e.clientX - previousPointerXRef.current;
        previousPointerXRef.current = e.clientX;

        // Rotate target pawn on drag
        if (dragTargetSideRef.current === 'w' || (!dragTargetSideRef.current && e.clientX < window.innerWidth / 2)) {
          whiteSpin += moveDelta * 0.02;
          if (whitePawnMesh) whitePawnMesh.rotation.y = whiteSpin;
        } else {
          blackSpin += moveDelta * 0.02;
          if (blackPawnMesh) blackPawnMesh.rotation.y = blackSpin;
        }
      }

      // Update hover visual cursor
      const hovered = getRaycastSide(e.clientX, e.clientY);
      setIsHoveredSide(hovered);
      container.style.cursor = hovered ? 'pointer' : 'default';
    };

    const onPointerUp = (e: PointerEvent) => {
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);

      // If it was a clean click / tap without significant drag
      if (!isDraggingRef.current || (deltaX < 6 && deltaY < 6)) {
        const clickedSide = getRaycastSide(e.clientX, e.clientY);
        if (clickedSide) {
          soundEffects.playLiftSound();
          onSelectSide(clickedSide);
        }
      }

      isDraggingRef.current = false;
      dragTargetSideRef.current = null;
    };

    const onPointerLeave = () => {
      isDraggingRef.current = false;
      setIsHoveredSide(null);
      container.style.cursor = 'default';
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);

    // Cleanup
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);

      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [onSelectSide]);

  const handleManualSelect = (side: PieceColor) => {
    soundEffects.playLiftSound();
    onSelectSide(side);
  };

  return (
    <div
      id="pawn-banner-3d-selector"
      className="relative w-full rounded-2xl border border-[#523318]/70 bg-gradient-to-b from-[#180e07]/95 via-[#130b05]/95 to-[#0e0703]/95 p-3.5 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-sm overflow-hidden"
    >
      {/* Warm atmospheric candlelight spotlight behind pawns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,200,100,0.12)_0%,_transparent_70%)] pointer-events-none" />

      {/* Decorative top header bar with ornate divider */}
      <div className="relative z-10 flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs font-cinzel uppercase tracking-[0.2em] text-amber-500/90 font-semibold flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5 text-[#d4af37]" />
            I. Choose Your Army
          </span>
        </div>
        <div className="text-[11px] font-cormorant italic text-amber-200/70 flex items-center gap-1">
          <RotateCw className="w-3 h-3 text-[#d4af37]" />
          <span>Interactive 3D • Drag to rotate 360°</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div
        ref={containerRef}
        id="pawn-3d-canvas-container"
        className="relative w-full h-[220px] sm:h-[250px] md:h-[270px] cursor-pointer touch-none select-none my-1"
      />

      {/* Synchronized Side Control Banners (Below 3D Stage) */}
      <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 mt-2">
        {/* White Army Banner Card */}
        <button
          id="select-banner-white-army"
          type="button"
          onClick={() => handleManualSelect('w')}
          className={`relative rounded-xl p-3 sm:p-4 text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between ${
            selectedSide === 'w'
              ? 'bg-[#24130a] border-2 border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.28),inset_0_1px_4px_rgba(255,230,160,0.15)] ring-1 ring-[#d4af37]/40'
              : 'bg-[#140c07]/85 border-[#4a2e16]/60 hover:border-[#7a481b] hover:bg-[#1c110a]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f8f1de] shadow-[0_0_8px_#f8f1de]" />
              <span className="font-cinzel text-base sm:text-lg text-white font-medium tracking-wide">
                White Vanguard
              </span>
            </div>

            {selectedSide === 'w' ? (
              <div className="flex items-center gap-1 text-xs font-cinzel tracking-wider uppercase text-[#d4af37] font-semibold">
                <CheckCircle2 className="w-4 h-4 fill-[#d4af37] text-[#1a0c04]" />
                <span>Chosen</span>
              </div>
            ) : (
              <span className="text-[10px] font-cinzel tracking-wider uppercase text-amber-400/60 px-2 py-0.5 rounded bg-[#1f1209] border border-[#523319]">
                Select
              </span>
            )}
          </div>

          <p className="text-xs sm:text-[13px] text-amber-200/75 font-cormorant italic leading-relaxed">
            Seize initiative & opening tempo with 1. e4 or 1. d4.
          </p>
        </button>

        {/* Black Army Banner Card */}
        <button
          id="select-banner-black-army"
          type="button"
          onClick={() => handleManualSelect('b')}
          className={`relative rounded-xl p-3 sm:p-4 text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between ${
            selectedSide === 'b'
              ? 'bg-[#24130a] border-2 border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.28),inset_0_1px_4px_rgba(255,230,160,0.15)] ring-1 ring-[#d4af37]/40'
              : 'bg-[#140c07]/85 border-[#4a2e16]/60 hover:border-[#7a481b] hover:bg-[#1c110a]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1b1f28] border border-[#7a889b] shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
              <span className="font-cinzel text-base sm:text-lg text-white font-medium tracking-wide">
                Black Vanguard
              </span>
            </div>

            {selectedSide === 'b' ? (
              <div className="flex items-center gap-1 text-xs font-cinzel tracking-wider uppercase text-[#d4af37] font-semibold">
                <CheckCircle2 className="w-4 h-4 fill-[#d4af37] text-[#1a0c04]" />
                <span>Chosen</span>
              </div>
            ) : (
              <span className="text-[10px] font-cinzel tracking-wider uppercase text-amber-400/60 px-2 py-0.5 rounded bg-[#1f1209] border border-[#523319]">
                Select
              </span>
            )}
          </div>

          <p className="text-xs sm:text-[13px] text-amber-200/75 font-cormorant italic leading-relaxed">
            Defend the throne with tactical counter-gambits.
          </p>
        </button>
      </div>
    </div>
  );
};
