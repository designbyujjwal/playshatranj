import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createBannerMesh, type BannerMeshHandle } from '../three/bannerMesh';

export interface ShatranjBannerProps {
  className?: string;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  windStrength?: number;
  showStand?: boolean;
}

/**
 * Medieval War Banner Stand SVG Component
 * Renders the gothic wrought-iron crossbar, polished spearhead finials,
 * mounting brackets, suspension rings, and weathered leather cord bindings
 * holding the battle standard firmly from above.
 */
const BannerStand: React.FC = () => (
  <svg
    id="shatranj-banner-stand-overlay"
    className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
    viewBox="0 0 750 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="standDropShadow" x="-10%" y="-40%" width="120%" height="200%">
        <feDropShadow dx="0" dy="2.8" stdDeviation="2.4" floodColor="#000000" floodOpacity="0.92" />
      </filter>

      {/* Burnished Wrought Iron Crossbar Gradient */}
      <linearGradient id="ironRodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3c3f47" />
        <stop offset="28%" stopColor="#727785" />
        <stop offset="55%" stopColor="#2a2c33" />
        <stop offset="100%" stopColor="#0e0f12" />
      </linearGradient>

      {/* Razor Steel Spearhead Blade Gradient */}
      <linearGradient id="spearBladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b909e" />
        <stop offset="42%" stopColor="#e2e5f0" />
        <stop offset="55%" stopColor="#555861" />
        <stop offset="100%" stopColor="#1b1c20" />
      </linearGradient>

      {/* Weathered Antique Brass / Gold Fittings Gradient */}
      <linearGradient id="brassFittingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eed07a" />
        <stop offset="38%" stopColor="#b2822d" />
        <stop offset="72%" stopColor="#644410" />
        <stop offset="100%" stopColor="#2b1a04" />
      </linearGradient>

      {/* Weathered Brown Leather Straps Gradient */}
      <linearGradient id="leatherTieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5f3619" />
        <stop offset="50%" stopColor="#3d200c" />
        <stop offset="100%" stopColor="#1c0e04" />
      </linearGradient>
    </defs>

    {/* =========================================================================
        STAND GRAPHICS & SUSPENSION HARDWARE
        ========================================================================= */}
    <g id="shatranj-banner-stand" filter="url(#standDropShadow)">
      {/* 1. Horizontal Wrought Iron Crossbar */}
      <rect
        x="62"
        y="13.5"
        width="626"
        height="5.5"
        rx="2.2"
        fill="url(#ironRodGrad)"
        stroke="#08080a"
        strokeWidth="0.8"
      />
      {/* Polished Top Specular Ridge Line */}
      <line
        x1="68"
        y1="14.2"
        x2="682"
        y2="14.2"
        stroke="#c4c9d8"
        strokeWidth="0.75"
        opacity="0.88"
      />

      {/* 2. Left Spear Finial (Points Outward to the Left) */}
      <g id="stand-finial-left">
        {/* Brass socket collar */}
        <rect
          x="64"
          y="12"
          width="7"
          height="8.5"
          rx="1.5"
          fill="url(#brassFittingGrad)"
          stroke="#1a1104"
          strokeWidth="0.6"
        />
        <circle cx="67.5" cy="16.2" r="1.2" fill="#ffd470" />
        {/* Diamond faceted spear blade */}
        <path
          d="M 64,16.2 L 52,11.5 L 34,16.2 L 52,21 L 64,16.2 Z"
          fill="url(#spearBladeGrad)"
          stroke="#121317"
          strokeWidth="0.8"
        />
        {/* Center ridge spine */}
        <line
          x1="34"
          y1="16.2"
          x2="64"
          y2="16.2"
          stroke="#ffffff"
          strokeWidth="0.8"
          opacity="0.9"
        />
      </g>

      {/* 3. Right Spear Finial (Points Outward to the Right) */}
      <g id="stand-finial-right">
        {/* Brass socket collar */}
        <rect
          x="679"
          y="12"
          width="7"
          height="8.5"
          rx="1.5"
          fill="url(#brassFittingGrad)"
          stroke="#1a1104"
          strokeWidth="0.6"
        />
        <circle cx="682.5" cy="16.2" r="1.2" fill="#ffd470" />
        {/* Diamond faceted spear blade */}
        <path
          d="M 686,16.2 L 698,11.5 L 716,16.2 L 698,21 L 686,16.2 Z"
          fill="url(#spearBladeGrad)"
          stroke="#121317"
          strokeWidth="0.8"
        />
        {/* Center ridge spine */}
        <line
          x1="686"
          y1="16.2"
          x2="716"
          y2="16.2"
          stroke="#ffffff"
          strokeWidth="0.8"
          opacity="0.9"
        />
      </g>

      {/* 4. Left Vertical Staff Post & Upward Spearhead */}
      <g id="stand-post-left">
        {/* Dark vertical post descending behind banner edge */}
        <rect
          x="78.5"
          y="11"
          width="5"
          height="32"
          rx="1.5"
          fill="url(#ironRodGrad)"
          stroke="#090a0d"
          strokeWidth="0.6"
        />
        {/* Junction ornamental brass bracket */}
        <rect
          x="77.5"
          y="12.5"
          width="7"
          height="7.5"
          rx="1.2"
          fill="url(#brassFittingGrad)"
          stroke="#1e1305"
          strokeWidth="0.6"
        />
        <circle cx="81" cy="16.2" r="1.4" fill="#ffd470" />
        {/* Upward spear tip */}
        <path
          d="M 81,-6 L 85.5,6 L 81,11 L 76.5,6 Z"
          fill="url(#spearBladeGrad)"
          stroke="#121317"
          strokeWidth="0.75"
        />
        <line
          x1="81"
          y1="-6"
          x2="81"
          y2="11"
          stroke="#ffffff"
          strokeWidth="0.75"
          opacity="0.85"
        />
      </g>

      {/* 5. Right Vertical Staff Post & Upward Spearhead */}
      <g id="stand-post-right">
        {/* Dark vertical post descending behind banner edge */}
        <rect
          x="666.5"
          y="11"
          width="5"
          height="32"
          rx="1.5"
          fill="url(#ironRodGrad)"
          stroke="#090a0d"
          strokeWidth="0.6"
        />
        {/* Junction ornamental brass bracket */}
        <rect
          x="665.5"
          y="12.5"
          width="7"
          height="7.5"
          rx="1.2"
          fill="url(#brassFittingGrad)"
          stroke="#1e1305"
          strokeWidth="0.6"
        />
        <circle cx="669" cy="16.2" r="1.4" fill="#ffd470" />
        {/* Upward spear tip */}
        <path
          d="M 669,-6 L 673.5,6 L 669,11 L 664.5,6 Z"
          fill="url(#spearBladeGrad)"
          stroke="#121317"
          strokeWidth="0.75"
        />
        <line
          x1="669"
          y1="-6"
          x2="669"
          y2="11"
          stroke="#ffffff"
          strokeWidth="0.75"
          opacity="0.85"
        />
      </g>

      {/* 6. Hanging Cord Rings & Top Suspension Cords */}
      <g id="stand-suspension-mounts">
        <circle
          cx="180"
          cy="13.5"
          r="4.2"
          fill="none"
          stroke="url(#brassFittingGrad)"
          strokeWidth="1.4"
        />
        <path
          d="M 180,9.3 C 180,2 178,-8 175,-16"
          stroke="#2a2015"
          strokeWidth="1.3"
          strokeDasharray="3,1"
          opacity="0.85"
        />
        <circle
          cx="570"
          cy="13.5"
          r="4.2"
          fill="none"
          stroke="url(#brassFittingGrad)"
          strokeWidth="1.4"
        />
        <path
          d="M 570,9.3 C 570,2 572,-8 575,-16"
          stroke="#2a2015"
          strokeWidth="1.3"
          strokeDasharray="3,1"
          opacity="0.85"
        />
      </g>

      {/* 7. Medieval Leather Straps & Ties Binding Cloth to Bar */}
      <g id="stand-leather-bindings" fill="url(#leatherTieGrad)" stroke="#140802" strokeWidth="0.6">
        <g transform="translate(124, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1,6.5 L 0.5,13 L 2,12.5 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(174, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1.2,6.5 L 0.8,12 L 2.2,11.5 L 2.6,6.5 Z" />
        </g>
        <g transform="translate(224, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1,6.5 L 0.5,13.5 L 2.2,13 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(284, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1.2,6.5 L 1.5,12 L 2.6,11.8 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(344, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1,6.5 L 0.6,12.5 L 2,12 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(404, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1.5,6.5 L 1.8,12.5 L 2.8,12 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(464, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1,6.5 L 0.5,13 L 2,12.5 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(524, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1.2,6.5 L 1,12 L 2.4,11.5 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(584, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1,6.5 L 0.5,13.5 L 2,13 L 2.5,6.5 Z" />
        </g>
        <g transform="translate(634, 13)">
          <rect x="0" y="0" width="3.5" height="6.5" rx="1" />
          <path d="M 1.2,6.5 L 1.5,12.5 L 2.6,12 L 2.5,6.5 Z" />
        </g>
      </g>
    </g>
  </svg>
);

/**
 * ShatranjBanner:
 * Renders the battle-torn crimson silk banner on a 3D subdivided mesh in a Three.js scene,
 * held firmly at the top by a gothic medieval war standard stand.
 * Wind simulation reflects a subtle, majestic breeze where light and shadow physically
 * pass over the fabric, knight badges, and SHATRANJ lettering as one unified material.
 */
export const ShatranjBanner: React.FC<ShatranjBannerProps> = ({
  className = '',
  waveSpeed = 0.35,
  waveFrequency = 1.2,
  waveAmplitude = 0.055,
  windStrength = 0.85,
  showStand = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bannerHandleRef = useRef<BannerMeshHandle | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 70;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();

    // 2. Perspective Camera with tight FOV for natural 3D cloth perspective displacement
    const aspect = width / Math.max(1, height);
    const camera = new THREE.PerspectiveCamera(26, aspect, 0.1, 100);
    camera.position.set(0, 0, 3.40);
    camera.lookAt(0, 0, 0);

    // 3. Balanced Cinematic Lighting for Fabric Highlights and Wave Glints
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd0, 1.35);
    keyLight.position.set(2.5, 3.5, 3.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x90b8ff, 0.7);
    rimLight.position.set(-3.0, -1.5, 2.0);
    scene.add(rimLight);

    // 4. Create Banner Mesh with Vertex Shader Wind Wave Modification
    const bannerHandle = createBannerMesh({
      width: 7.5,
      height: 1.5,
      segmentsX: 128,
      segmentsY: 48,
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      windStrength,
    });
    bannerHandleRef.current = bannerHandle;
    scene.add(bannerHandle.mesh);

    // 5. Transparent WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 6. Animation Loop (Virtual Clock driving vertex shader uTime)
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      bannerHandle.update(elapsedTime);
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Clean Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      bannerHandle.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [waveSpeed, waveFrequency, waveAmplitude, windStrength]);

  return (
    <div
      id="shatranj-banner-wrapper"
      className={`relative flex items-center justify-center select-none w-full max-w-[270px] sm:max-w-[330px] md:max-w-[390px] lg:max-w-[440px] aspect-[750/150] ${className}`}
      style={{
        filter:
          'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 20px rgba(180, 20, 20, 0.2))',
      }}
    >
      {/* 3D WebGL Cloth Canvas */}
      <div
        id="shatranj-banner-container"
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Medieval War Banner Stand holding the banner from top */}
      {showStand && <BannerStand />}
    </div>
  );
};

export default ShatranjBanner;

