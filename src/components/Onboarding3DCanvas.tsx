import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw } from 'lucide-react';
import {
  getPieceGeometry,
  loadKnightGLTFGeometry,
  loadBishopGLTFGeometry,
  loadRookGLTFGeometry,
  loadQueenGLTFGeometry,
  loadKingGLTFGeometry,
} from '../three/pieceGeometries';
import { MaterialManager } from '../three/materials';
import { createBannerMesh, type BannerMeshHandle } from '../three/bannerMesh';
import type { PieceColor, PieceType } from '../types';

interface Onboarding3DCanvasProps {
  className?: string;
  showControls?: boolean;
  showBanner?: boolean;
}

interface BoardPieceDef {
  type: PieceType;
  color: PieceColor;
  file: number; // 0 = 'a', 7 = 'h'
  rank: number; // 0 = '1', 7 = '8'
  rotationY?: number;
}

export interface AnimationStepInfo {
  index: number;
  chip: string;
  label: string;
  description: string;
  time: number;
}

export const ANIMATION_STEPS: AnimationStepInfo[] = [
  {
    index: 0,
    chip: 'Ready',
    label: 'Tactical Setup',
    description: 'White begins the tactical combination',
    time: 0.0,
  },
  {
    index: 1,
    chip: '1. ♗g5',
    label: '1. ♗e3 ➔ g5',
    description: 'Bishop sweeps open diagonal to g5, cutting off f6 & h6',
    time: 0.8,
  },
  {
    index: 2,
    chip: '1... ♞c6',
    label: '1... ♞b8 ➔ c6',
    description: 'Black develops Knight to contest the center',
    time: 2.3,
  },
  {
    index: 3,
    chip: '2. ♗c4+',
    label: '2. ♗e2 ➔ c4+',
    description: 'Bishop sweeps diagonal & delivers check',
    time: 3.8,
  },
  {
    index: 4,
    chip: '2... ♚e5',
    label: '2... ♚e6 ➔ e5',
    description: 'Black King is forced into the center trap',
    time: 5.3,
  },
  {
    index: 5,
    chip: '3. ♕f3',
    label: '3. ♕d1 ➔ f3',
    description: 'White Queen dominates diagonals & seals exits',
    time: 6.8,
  },
  {
    index: 6,
    chip: '3... ♞f6',
    label: '3... ♞h5 ➔ f6',
    description: 'Black desperately parries with Knight to shield the King',
    time: 8.3,
  },
  {
    index: 7,
    chip: '4. ♙d4#',
    label: '4. ♙d2 ➔ d4#',
    description: 'Pawn strikes decisive blow in the dead center!',
    time: 9.8,
  },
  {
    index: 8,
    chip: '🏆 Checkmate',
    label: 'Checkmate in Center',
    description: 'Flawless pawn checkmate on e5',
    time: 11.2,
  },
];

const CYCLE_DURATION = 15.6; // Total loop seconds
const T_STEP1_START = 0.8;
const T_STEP1_END = 2.1;
const T_STEP2_START = 2.3;
const T_STEP2_END = 3.6;
const T_STEP3_START = 3.8;
const T_STEP3_END = 5.1;
const T_STEP4_START = 5.3;
const T_STEP4_END = 6.6;
const T_STEP5_START = 6.8;
const T_STEP5_END = 8.1;
const T_STEP6_START = 8.3;
const T_STEP6_END = 9.6;
const T_STEP7_START = 9.8;
const T_STEP7_END = 11.2;
const T_CHECKMATE_START = 11.2;
const T_RESET_START = 14.2;

// Smooth cubic easing
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Parabolic hop height
const getArcY = (p: number, peak: number): number => {
  return Math.sin(Math.max(0, Math.min(1, p)) * Math.PI) * peak;
};

// Micro tactile settle bounce upon landing
const getSettleOffset = (p: number): number => {
  if (p < 0.9 || p > 1.25) return 0;
  const t = (p - 0.9) / 0.35;
  return Math.sin(t * Math.PI * 2) * 0.025 * Math.exp(-t * 4);
};

export const Onboarding3DCanvas: React.FC<Onboarding3DCanvasProps> = ({
  className = '',
  showControls = true,
  showBanner = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Playback state exposed to React UI
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  // Refs for animation loop control
  const isPlayingRef = useRef<boolean>(true);
  const setTimeTargetRef = useRef<((t: number) => void) | null>(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleReplay = useCallback(() => {
    if (setTimeTargetRef.current) {
      setTimeTargetRef.current(0);
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrameId: number;
    const materials = new MaterialManager();

    // 1. Scene with pitch black background and light fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.014);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Camera perspective looking from White's side angled down towards the center
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);

    const computeCameraSetup = (w: number, h: number) => {
      const aspect = w / Math.max(1, h);
      // Ensure the board never clips on the sides and is vertically centered with equal top and bottom gaps:
      // Board width is 9.4 (X from -4.7 to +4.7).
      // Pieces on far rank (Black King cross and Queen crown) reach Y = 2.45 at Z = -3.5.
      // Near edge of board is at Z = +4.7, Y = 0.35.
      const factor = aspect < 2.1 ? Math.pow(2.1 / aspect, 0.88) : 1.0;
      const camX = 0;
      const camY = 8.5 * factor;
      const camZ = 11.6 * factor;
      const targetX = 0;
      const targetY = 0.0;
      // Vertically centers the entire board and piece ensemble so top_gap === bot_gap
      const targetZ = -0.24 - (factor - 1.0) * 0.65;
      return { camX, camY, camZ, targetX, targetY, targetZ };
    };

    const initialSetup = computeCameraSetup(width, height);
    const baseCamPos = new THREE.Vector3(initialSetup.camX, initialSetup.camY, initialSetup.camZ);
    const targetLookAt = new THREE.Vector3(initialSetup.targetX, initialSetup.targetY, initialSetup.targetZ);
    camera.position.copy(baseCamPos);
    camera.lookAt(targetLookAt);

    // 3. WebGL Renderer with ACES Filmic tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.21;
    container.appendChild(renderer.domElement);

    // 4. Cinematic Balanced Lighting System:
    const ambientLight = new THREE.AmbientLight(0x475569, 1.09);
    scene.add(ambientLight);

    const topSpot = new THREE.SpotLight(0xfffaf0, 8.45, 30, Math.PI / 3.2, 0.5, 1.0);
    topSpot.position.set(0, 10.0, 2.5);
    topSpot.target.position.set(0, 0.2, 0);
    topSpot.castShadow = true;
    topSpot.shadow.mapSize.width = 2048;
    topSpot.shadow.mapSize.height = 2048;
    topSpot.shadow.bias = -0.0001;
    topSpot.shadow.radius = 2.0;
    scene.add(topSpot);
    scene.add(topSpot.target);

    const keySun = new THREE.DirectionalLight(0xfffbeb, 1.93);
    keySun.position.set(-4.5, 9.0, 5.5);
    keySun.castShadow = true;
    keySun.shadow.mapSize.width = 2048;
    keySun.shadow.mapSize.height = 2048;
    keySun.shadow.bias = -0.0001;
    keySun.shadow.radius = 2.0;
    scene.add(keySun);

    const frontFillLight = new THREE.DirectionalLight(0xf8fafc, 1.29);
    frontFillLight.position.set(0, 4.5, 8.5);
    scene.add(frontFillLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 2.09);
    cyanRimLight.position.set(7.0, 7.0, -7.0);
    scene.add(cyanRimLight);

    const flankFillLight = new THREE.DirectionalLight(0xc7d2fe, 1.13);
    flankFillLight.position.set(-7.5, 6.0, 2.5);
    scene.add(flankFillLight);

    const floorBounce = new THREE.PointLight(0x60a5fa, 1.13, 16, 1.3);
    floorBounce.position.set(0, 1.2, 0);
    scene.add(floorBounce);

    const centerSpot = new THREE.SpotLight(0x60a5fa, 2.66, 10, Math.PI / 5, 0.6, 1.2);
    centerSpot.position.set(0, 5.2, 0.8);
    centerSpot.target.position.set(0, 0.1, 0);
    scene.add(centerSpot);
    scene.add(centerSpot.target);

    // 5. Build Chessboard:
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    // Optional 3D Banner Mesh with wind-blown vertex shader displacement
    let bannerHandle: BannerMeshHandle | null = null;
    if (showBanner) {
      bannerHandle = createBannerMesh({
        width: 7.2,
        height: 0.96,
        segmentsX: 96,
        segmentsY: 24,
        waveSpeed: 1.5,
        waveFrequency: 2.1,
        waveAmplitude: 0.12,
        windStrength: 1.0,
      });
      bannerHandle.mesh.position.set(0, 4.4, -3.2);
      bannerHandle.mesh.rotation.x = 0.22;
      scene.add(bannerHandle.mesh);
    }

    const frameWidth = 9.4;
    const frameHeight = 0.45;
    const frameGeom = new THREE.BoxGeometry(frameWidth, frameHeight, frameWidth);
    const frameMesh = new THREE.Mesh(frameGeom, materials.boardFrameMaterial);
    frameMesh.position.y = -frameHeight / 2;
    frameMesh.receiveShadow = true;
    boardGroup.add(frameMesh);

    const trimGeom = new THREE.BoxGeometry(8.16, 0.02, 8.16);
    const trimMesh = new THREE.Mesh(trimGeom, materials.goldTrimMaterial);
    trimMesh.position.y = 0.001;
    boardGroup.add(trimMesh);

    const tileGeom = new THREE.BoxGeometry(0.98, 0.08, 0.98);
    const BOARD_OFFSET = 3.5;

    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const isLight = (r + f) % 2 !== 0;
        const tileMesh = new THREE.Mesh(
          tileGeom,
          isLight ? materials.lightTileMaterial : materials.darkTileMaterial
        );
        const x = f - BOARD_OFFSET;
        const z = BOARD_OFFSET - r;
        tileMesh.position.set(x, 0.04, z);
        tileMesh.receiveShadow = true;
        boardGroup.add(tileMesh);
      }
    }

    // Border coordinates
    const createCoordTexture = (text: string): THREE.CanvasTexture => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d')!;
      ctx.clearRect(0, 0, 128, 128);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 76px "Cinzel", "Times New Roman", "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;
      ctx.fillText(text, 64, 64);

      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    const coordGeom = new THREE.PlaneGeometry(0.46, 0.46);
    coordGeom.rotateX(-Math.PI / 2);

    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

    files.forEach((fileChar, f) => {
      const tex = createCoordTexture(fileChar);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.98 });
      const mesh = new THREE.Mesh(coordGeom, mat);
      mesh.position.set(f - BOARD_OFFSET, 0.012, 4.32);
      boardGroup.add(mesh);
    });

    ranks.forEach((rankChar, r) => {
      const tex = createCoordTexture(rankChar);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.98 });
      const mesh = new THREE.Mesh(coordGeom, mat);
      mesh.position.set(-4.32, 0.012, BOARD_OFFSET - r);
      boardGroup.add(mesh);
    });

    ranks.forEach((rankChar, r) => {
      const tex = createCoordTexture(rankChar);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.98 });
      const mesh = new THREE.Mesh(coordGeom, mat);
      mesh.position.set(4.32, 0.012, BOARD_OFFSET - r);
      boardGroup.add(mesh);
    });

    // 6. PIECES SETUP & ANIMATED 6-MOVE COMBINATION
    // Note: White Knights are situated at b1 and h3. No knight is on f3 giving premature check!
    const staticPieces: BoardPieceDef[] = [
      // White pieces (Exactly 2 Rooks: a1 and f1)
      { type: 'r', color: 'w', file: 0, rank: 0, rotationY: Math.PI / 4 }, // a1
      { type: 'r', color: 'w', file: 5, rank: 0, rotationY: Math.PI / 4 }, // f1
      { type: 'k', color: 'w', file: 6, rank: 0, rotationY: 0 }, // g1 (King safely castled)
      { type: 'n', color: 'w', file: 1, rank: 0, rotationY: Math.PI / 4 }, // b1 (Knight at safe starting square)
      { type: 'n', color: 'w', file: 7, rank: 2, rotationY: -Math.PI / 3 }, // h3 (Knight at h3, safely outside check zone!)
      { type: 'p', color: 'w', file: 0, rank: 1 }, // a2
      { type: 'p', color: 'w', file: 1, rank: 1 }, // b2
      { type: 'p', color: 'w', file: 2, rank: 2 }, // c3 (defends central d4 checkmate square)
      { type: 'p', color: 'w', file: 5, rank: 1 }, // f2
      { type: 'p', color: 'w', file: 6, rank: 2 }, // g3 (covers f4 escape square)
      { type: 'p', color: 'w', file: 7, rank: 1 }, // h2

      // Black pieces (Exactly 2 Rooks: a8 and h8)
      { type: 'r', color: 'b', file: 0, rank: 7, rotationY: Math.PI / 4 }, // a8
      { type: 'r', color: 'b', file: 7, rank: 7, rotationY: Math.PI / 4 }, // h8
      { type: 'q', color: 'b', file: 3, rank: 7, rotationY: Math.PI }, // d8 (Queen)
      { type: 'b', color: 'b', file: 1, rank: 6, rotationY: Math.PI + 0.2 }, // b7 (Bishop)
      { type: 'b', color: 'b', file: 4, rank: 6, rotationY: Math.PI }, // e7 (Bishop)
      { type: 'p', color: 'b', file: 0, rank: 6 }, // a7
      { type: 'p', color: 'b', file: 1, rank: 5 }, // b6
      { type: 'p', color: 'b', file: 3, rank: 5 }, // d6 (blocks d6 escape)
      { type: 'p', color: 'b', file: 5, rank: 6 }, // f7
      { type: 'p', color: 'b', file: 6, rank: 6 }, // g7
      { type: 'p', color: 'b', file: 7, rank: 6 }, // h7
    ];

    const piecesGroup = new THREE.Group();
    scene.add(piecesGroup);

    const pieceMeshes: { mesh: THREE.Mesh; type: PieceType }[] = [];

    const feltGeom = new THREE.CircleGeometry(0.35, 24);
    feltGeom.rotateX(-Math.PI / 2);

    const shadowGeom = new THREE.PlaneGeometry(1.2, 1.2);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: materials.softShadowTexture,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    });

    // Helper to spawn a piece mesh & shadow
    const createPieceInstance = (type: PieceType, color: PieceColor, rotationY = 0) => {
      const group = new THREE.Group();
      const geom = getPieceGeometry(type);
      const mat = color === 'w' ? materials.whitePieceMaterial : materials.blackPieceMaterial;

      const mainMesh = new THREE.Mesh(geom, mat);
      mainMesh.castShadow = true;
      mainMesh.receiveShadow = true;
      group.add(mainMesh);
      pieceMeshes.push({ mesh: mainMesh, type });

      const feltMesh = new THREE.Mesh(feltGeom, materials.feltMaterial);
      feltMesh.position.y = 0.005;
      group.add(feltMesh);

      const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat.clone());
      shadowPlane.scale.setScalar(0.95);
      scene.add(shadowPlane);

      if (rotationY !== 0) {
        group.rotation.y = rotationY;
      }
      piecesGroup.add(group);
      return { group, shadowPlane };
    };

    // Spawn static pieces
    staticPieces.forEach((pieceDef) => {
      const { group, shadowPlane } = createPieceInstance(
        pieceDef.type,
        pieceDef.color,
        pieceDef.rotationY ?? 0
      );
      const worldX = pieceDef.file - BOARD_OFFSET;
      const worldZ = BOARD_OFFSET - pieceDef.rank;
      shadowPlane.position.set(worldX, 0.082, worldZ);
      group.position.set(worldX, 0.08, worldZ);
    });

    // =========================================================================
    // 6 DYNAMIC ANIMATED ACTORS (Master-level combination leading to center checkmate):
    // =========================================================================

    // Move 1 (White): 1. ♗e3 ➔ g5 (Bishop slides along clear diagonal to g5, cutting off f6 & h6 without jumping over any pawns)
    const animBishopG5 = {
      ...createPieceInstance('b', 'w', -0.3),
      startFile: 4,
      startRank: 2, // e3 (clean diagonal through open f4 to g5, no pawns in path!)
      endFile: 6,
      endRank: 4, // g5
      peakArc: 0.05, // Smooth sliding glide across board felt
    };

    // Move 2 (Black): 1... ♞b8 ➔ c6 (Black Knight leaps to c6)
    const animKnightC6 = {
      ...createPieceInstance('n', 'b', -Math.PI / 4),
      startFile: 1,
      startRank: 7, // b8
      endFile: 2,
      endRank: 5, // c6
      peakArc: 0.48, // Authentic Knight jumping arc over pieces
    };

    // Move 3 (White): 2. ♗e2 ➔ c4+ (Bishop delivers check down the diagonal)
    const animBishopC4 = {
      ...createPieceInstance('b', 'w', 0.25),
      startFile: 4,
      startRank: 1, // e2
      endFile: 2,
      endRank: 3, // c4
      peakArc: 0.05, // Smooth sliding glide along diagonal
    };

    // Move 4 (Black): 2... ♚e6 ➔ e5 (Black King is forced into the center trap)
    const animKing = {
      ...createPieceInstance('k', 'b', Math.PI),
      startFile: 4,
      startRank: 5, // e6
      endFile: 4,
      endRank: 4, // e5 (Dead center of board)
      peakArc: 0.04, // Measured King step
    };

    // Move 5 (White): 3. ♕d1 ➔ f3 (Queen sweeps to f3, sealing exits & tightening net)
    const animQueenF3 = {
      ...createPieceInstance('q', 'w', 0),
      startFile: 3,
      startRank: 0, // d1
      endFile: 5,
      endRank: 2, // f3
      peakArc: 0.05, // Graceful Queen glide
    };

    // Move 6 (Black): 3... ♞h5 ➔ f6 (Black desperately parries with Knight to shield the King)
    const animKnightF6 = {
      ...createPieceInstance('n', 'b', Math.PI / 2),
      startFile: 7,
      startRank: 4, // h5
      endFile: 5,
      endRank: 5, // f6
      peakArc: 0.48, // Jumping Knight arc
    };

    // Move 7 (White): 4. ♙d2 ➔ d4# (Pawn strikes decisive CHECKMATE in center!)
    const animPawnD4 = {
      ...createPieceInstance('p', 'w', 0),
      startFile: 3,
      startRank: 1, // d2
      endFile: 3,
      endRank: 3, // d4
      peakArc: 0.04, // Crisp, grounded pawn push
    };

    // 7. GLOWING SQUARE HIGHLIGHTS & AURA
    const createSquareFrameMesh = (colorHex: number, defaultOpacity = 0.95) => {
      const frameGroup = new THREE.Group();
      const borderThickness = 0.045;
      const squareSize = 0.96;
      const halfSize = squareSize / 2;

      const borderMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        transparent: true,
        opacity: defaultOpacity,
        depthWrite: false,
      });

      const topGeom = new THREE.PlaneGeometry(squareSize, borderThickness);
      topGeom.rotateX(-Math.PI / 2);
      const topMesh = new THREE.Mesh(topGeom, borderMat);
      topMesh.position.set(0, 0.084, -halfSize + borderThickness / 2);
      frameGroup.add(topMesh);

      const bottomMesh = new THREE.Mesh(topGeom, borderMat);
      bottomMesh.position.set(0, 0.084, halfSize - borderThickness / 2);
      frameGroup.add(bottomMesh);

      const sideGeom = new THREE.PlaneGeometry(borderThickness, squareSize - borderThickness * 2);
      sideGeom.rotateX(-Math.PI / 2);
      const leftMesh = new THREE.Mesh(sideGeom, borderMat);
      leftMesh.position.set(-halfSize + borderThickness / 2, 0.084, 0);
      frameGroup.add(leftMesh);

      const rightMesh = new THREE.Mesh(sideGeom, borderMat);
      rightMesh.position.set(halfSize - borderThickness / 2, 0.084, 0);
      frameGroup.add(rightMesh);

      const innerGeom = new THREE.PlaneGeometry(0.86, 0.86);
      innerGeom.rotateX(-Math.PI / 2);
      const innerMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        transparent: true,
        opacity: defaultOpacity * 0.28,
        depthWrite: false,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      innerMesh.position.y = 0.083;
      frameGroup.add(innerMesh);

      return { frameGroup, borderMat, innerMat };
    };

    // Checkmate Target Square (d4) electric blue frame
    const d4X = 3 - BOARD_OFFSET;
    const d4Z = BOARD_OFFSET - 3;
    const { frameGroup: d4Highlight, borderMat: d4BorderMat, innerMat: d4InnerMat } =
      createSquareFrameMesh(0x0066ff, 0.98);
    d4Highlight.position.set(d4X, 0, d4Z);
    scene.add(d4Highlight);

    // Pawn Origin Square (d2) frame
    const d2X = 3 - BOARD_OFFSET;
    const d2Z = BOARD_OFFSET - 1;
    const { frameGroup: d2Highlight, borderMat: d2BorderMat, innerMat: d2InnerMat } =
      createSquareFrameMesh(0x0066ff, 0.45);
    d2Highlight.position.set(d2X, 0, d2Z);
    scene.add(d2Highlight);

    // Active Move Highlight Frame (moves to follow current active target)
    const { frameGroup: activeMoveHighlight, borderMat: activeBorderMat } =
      createSquareFrameMesh(0x38bdf8, 0.85);
    scene.add(activeMoveHighlight);

    // Checkmate warning aura under trapped Black King on e5
    const e5X = 4 - BOARD_OFFSET;
    const e5Z = BOARD_OFFSET - 4;
    const checkAuraGeom = new THREE.PlaneGeometry(0.96, 0.96);
    checkAuraGeom.rotateX(-Math.PI / 2);
    const checkAuraMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xef4444),
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    const checkAuraMesh = new THREE.Mesh(checkAuraGeom, checkAuraMat);
    checkAuraMesh.position.set(e5X, 0.083, e5Z);
    scene.add(checkAuraMesh);

    // Asynchronously load dedicated GLTF geometries
    const updateMeshesForType = (type: PieceType, newGeom: THREE.BufferGeometry) => {
      pieceMeshes.forEach((item) => {
        if (item.type === type && item.mesh) {
          item.mesh.geometry = newGeom;
        }
      });
    };

    loadKnightGLTFGeometry((geom) => updateMeshesForType('n', geom));
    loadBishopGLTFGeometry((geom) => updateMeshesForType('b', geom));
    loadRookGLTFGeometry((geom) => updateMeshesForType('r', geom));
    loadQueenGLTFGeometry((geom) => updateMeshesForType('q', geom));
    loadKingGLTFGeometry((geom) => updateMeshesForType('k', geom));

    // 8. Animation & Render Loop
    let lastTime = performance.now();
    let virtualClock = 0;
    let lastReportedStep = -1;

    setTimeTargetRef.current = (targetTime: number) => {
      virtualClock = targetTime;
    };

    // Helper to calculate piece kinematic trajectory at time t
    const updateAnimatedPiece = (
      piece: typeof animBishopG5,
      startTime: number,
      endTime: number,
      currentTime: number,
      resetStartTime: number
    ) => {
      const startX = piece.startFile - BOARD_OFFSET;
      const startZ = BOARD_OFFSET - piece.startRank;
      const endX = piece.endFile - BOARD_OFFSET;
      const endZ = BOARD_OFFSET - piece.endRank;
      const baseY = 0.08;

      let x = startX;
      let z = startZ;
      let y = baseY;
      let shadowScale = 0.95;
      let shadowOpacity = 0.52;
      let pitchX = 0;
      let pitchZ = 0;

      if (currentTime < startTime) {
        // At initial square
        x = startX;
        z = startZ;
        y = baseY;
      } else if (currentTime >= startTime && currentTime < endTime) {
        // In flight moving forward!
        const rawProgress = (currentTime - startTime) / (endTime - startTime);
        const p = easeInOutCubic(rawProgress);
        x = THREE.MathUtils.lerp(startX, endX, p);
        z = THREE.MathUtils.lerp(startZ, endZ, p);

        const arc = getArcY(rawProgress, piece.peakArc);
        const settle = getSettleOffset(rawProgress);
        y = baseY + arc + settle;

        // Shadow scales down and softens when piece is high (pronounced for jumping Knight)
        const heightNorm = Math.max(0, Math.min(1, arc / Math.max(0.01, piece.peakArc)));
        shadowScale = 0.95 * (1.0 - heightNorm * 0.25);
        shadowOpacity = 0.52 * (1.0 - heightNorm * 0.35);

        // Tactile tilt: pronounced arc for jumping Knight, subtle glide for sliding pieces
        const isJumpingPiece = piece.peakArc > 0.2;
        const dx = endX - startX;
        const dz = endZ - startZ;
        const len = Math.hypot(dx, dz) || 1;
        const tiltMagnitude = isJumpingPiece
          ? Math.sin(rawProgress * Math.PI) * 0.14
          : Math.sin(rawProgress * Math.PI) * 0.015;
        pitchX = -(dz / len) * tiltMagnitude;
        pitchZ = (dx / len) * tiltMagnitude;
      } else if (currentTime >= endTime && currentTime < resetStartTime) {
        // Firmly landed on target square
        x = endX;
        z = endZ;
        y = baseY;
      } else {
        // Resetting back smoothly to start position for next cycle
        const resetProgress = (currentTime - resetStartTime) / (CYCLE_DURATION - resetStartTime);
        const p = easeInOutCubic(Math.max(0, Math.min(1, resetProgress)));
        x = THREE.MathUtils.lerp(endX, startX, p);
        z = THREE.MathUtils.lerp(endZ, startZ, p);
        y = baseY + Math.sin(p * Math.PI) * 0.12;
      }

      piece.group.position.set(x, y, z);
      piece.group.rotation.x = pitchX;
      piece.group.rotation.z = pitchZ;

      piece.shadowPlane.position.set(x, 0.082, z);
      piece.shadowPlane.scale.setScalar(shadowScale);
      (piece.shadowPlane.material as THREE.MeshBasicMaterial).opacity = shadowOpacity;
    };

    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isPlayingRef.current) {
        virtualClock = (virtualClock + delta) % CYCLE_DURATION;
      }

      const t = virtualClock;

      // Determine active narrative step
      let currentStep = 0;
      if (t >= T_CHECKMATE_START) currentStep = 8;
      else if (t >= T_STEP7_START) currentStep = 7;
      else if (t >= T_STEP6_START) currentStep = 6;
      else if (t >= T_STEP5_START) currentStep = 5;
      else if (t >= T_STEP4_START) currentStep = 4;
      else if (t >= T_STEP3_START) currentStep = 3;
      else if (t >= T_STEP2_START) currentStep = 2;
      else if (t >= T_STEP1_START) currentStep = 1;

      if (currentStep !== lastReportedStep) {
        lastReportedStep = currentStep;
        setActiveStepIdx(currentStep);
      }

      // Update positions of all 7 moving pieces
      updateAnimatedPiece(animBishopG5, T_STEP1_START, T_STEP1_END, t, T_RESET_START);
      updateAnimatedPiece(animKnightC6, T_STEP2_START, T_STEP2_END, t, T_RESET_START);
      updateAnimatedPiece(animBishopC4, T_STEP3_START, T_STEP3_END, t, T_RESET_START);
      updateAnimatedPiece(animKing, T_STEP4_START, T_STEP4_END, t, T_RESET_START);
      updateAnimatedPiece(animQueenF3, T_STEP5_START, T_STEP5_END, t, T_RESET_START);
      updateAnimatedPiece(animKnightF6, T_STEP6_START, T_STEP6_END, t, T_RESET_START);
      updateAnimatedPiece(animPawnD4, T_STEP7_START, T_STEP7_END, t, T_RESET_START);

      // Camera gentle cinematic float + slight tracking zoom at checkmate
      const isCheckmateClimax = t >= T_CHECKMATE_START && t < T_RESET_START;
      const zoomGlide = isCheckmateClimax
        ? Math.sin(((t - T_CHECKMATE_START) / (T_RESET_START - T_CHECKMATE_START)) * Math.PI) * 0.22
        : 0;
      const floatX = Math.sin(t * 0.28) * 0.05;
      const floatY = Math.cos(t * 0.22) * 0.04;
      camera.position.x = baseCamPos.x + floatX;
      camera.position.y = baseCamPos.y + floatY - zoomGlide * 0.45;
      camera.position.z = baseCamPos.z - zoomGlide * 1.1;
      camera.lookAt(targetLookAt);

      // Highlights modulation
      const pulse = 0.82 + Math.sin(t * 4.5) * 0.18;

      if (isCheckmateClimax) {
        // Full checkmate explosion: d4 glowing bright, d2 origin highlight, aura pulsing on e5
        d4Highlight.visible = true;
        d2Highlight.visible = true;
        checkAuraMesh.visible = true;
        d4BorderMat.opacity = pulse * 0.98;
        d4InnerMat.opacity = pulse * 0.34;
        d2BorderMat.opacity = 0.42;
        d2InnerMat.opacity = 0.12;
        checkAuraMat.opacity = 0.35 + Math.sin(t * 5.0) * 0.18;
        activeMoveHighlight.visible = false;
      } else if (t >= T_STEP7_START && t < T_STEP7_END) {
        // Step 7: White Pawn d2 -> d4#
        d4Highlight.visible = false;
        d2Highlight.visible = true;
        checkAuraMesh.visible = false;
        d2BorderMat.opacity = 0.45;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(d4X, 0, d4Z); // d4 target
        activeBorderMat.opacity = pulse * 0.9;
      } else if (t >= T_STEP6_START && t < T_STEP6_END) {
        // Step 6: Black Knight h5 -> f6
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        const f6X = 5 - BOARD_OFFSET;
        const f6Z = BOARD_OFFSET - 5;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(f6X, 0, f6Z); // f6 target
        activeBorderMat.opacity = pulse * 0.85;
      } else if (t >= T_STEP5_START && t < T_STEP5_END) {
        // Step 5: White Queen d1 -> f3
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        const f3X = 5 - BOARD_OFFSET;
        const f3Z = BOARD_OFFSET - 2;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(f3X, 0, f3Z);
        activeBorderMat.opacity = pulse * 0.85;
      } else if (t >= T_STEP4_START && t < T_STEP4_END) {
        // Step 4: Black King e6 -> e5
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(e5X, 0, e5Z); // Center e5 target
        activeBorderMat.opacity = pulse * 0.85;
      } else if (t >= T_STEP3_START && t < T_STEP3_END) {
        // Step 3: White Bishop e2 -> c4
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        const c4X = 2 - BOARD_OFFSET;
        const c4Z = BOARD_OFFSET - 3;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(c4X, 0, c4Z);
        activeBorderMat.opacity = pulse * 0.85;
      } else if (t >= T_STEP2_START && t < T_STEP2_END) {
        // Step 2: Black Knight b8 -> c6
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        const c6X = 2 - BOARD_OFFSET;
        const c6Z = BOARD_OFFSET - 5;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(c6X, 0, c6Z);
        activeBorderMat.opacity = pulse * 0.85;
      } else if (t >= T_STEP1_START && t < T_STEP1_END) {
        // Step 1: White Bishop e3 -> g5
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        const g5X = 6 - BOARD_OFFSET;
        const g5Z = BOARD_OFFSET - 4;
        activeMoveHighlight.visible = true;
        activeMoveHighlight.position.set(g5X, 0, g5Z);
        activeBorderMat.opacity = pulse * 0.85;
      } else {
        // Intro or reset
        d4Highlight.visible = false;
        d2Highlight.visible = false;
        checkAuraMesh.visible = false;
        activeMoveHighlight.visible = false;
      }

      if (bannerHandle) {
        bannerHandle.update(t);
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    // 9. Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;

      camera.aspect = newW / Math.max(1, newH);
      const setup = computeCameraSetup(newW, newH);
      baseCamPos.set(setup.camX, setup.camY, setup.camZ);
      targetLookAt.set(setup.targetX, setup.targetY, setup.targetZ);
      camera.position.copy(baseCamPos);
      camera.lookAt(targetLookAt);
      camera.updateProjectionMatrix();

      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 10. Clean Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      if (bannerHandle) {
        bannerHandle.dispose();
      }
      renderer.dispose();
      boardGroup.clear();
      piecesGroup.clear();
    };
  }, [showBanner]);

  const activeStep = ANIMATION_STEPS[activeStepIdx] || ANIMATION_STEPS[0];

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 3D WebGL Canvas container */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Floating Cinematic Animation HUD Controls - Positioned at bottom of board */}
      {showControls && (
        <div className="absolute bottom-2.5 sm:bottom-3.5 inset-x-0 flex justify-center pointer-events-auto z-20 px-3 select-none">
          {/* Active Move Narrative Badge with compact playback controls */}
          <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <button
              onClick={handleTogglePlay}
              className="p-1 -ml-0.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title={isPlaying ? 'Pause animation' : 'Play animation'}
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3 fill-current" />
              )}
            </button>
            <button
              onClick={handleReplay}
              className="p-1 -ml-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title="Replay sequence"
              aria-label="Replay sequence"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            <div className="w-[1px] h-3 bg-white/20 mx-0.5 shrink-0" />

            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                activeStepIdx === ANIMATION_STEPS.length - 1
                  ? 'bg-red-500 animate-ping'
                  : isPlaying
                  ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]'
                  : 'bg-zinc-500'
              }`}
            />
            <span className="font-sans text-[#00d2ff] font-semibold text-xs sm:text-[13px] tracking-wide whitespace-nowrap">
              {activeStep.label}
            </span>
            <span className="text-zinc-300 font-sans text-xs sm:text-[13px] max-w-md truncate">
              — {activeStep.description}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
