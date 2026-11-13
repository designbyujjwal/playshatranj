import React, { useEffect, useRef, useState } from 'react';
import type { HandTrackingState } from '../types';

interface SpatialPointerProps {
  trackingState: HandTrackingState;
  hoverInfo?: unknown;
  isPieceGrabbed: boolean;
}

const PERSISTENCE_DURATION_MS = 300;

export const SpatialPointer: React.FC<SpatialPointerProps> = ({
  trackingState,
  isPieceGrabbed,
}) => {
  const lastValidPosRef = useRef({ x: 50, y: 50 });
  const [persisting, setPersisting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update last valid position directly in ref when hand is detected
  if (trackingState.isHandDetected) {
    lastValidPosRef.current = {
      x: trackingState.cursorPosition2D.x * 100,
      y: trackingState.cursorPosition2D.y * 100,
    };
  }

  useEffect(() => {
    if (!trackingState.isEnabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setPersisting(false);
      return;
    }

    if (trackingState.isHandDetected) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setPersisting(false);
    } else {
      // Signal lost: activate persistence mode for 300ms
      setPersisting(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setPersisting(false);
        timeoutRef.current = null;
      }, PERSISTENCE_DURATION_MS);
    }
  }, [trackingState.isEnabled, trackingState.isHandDetected]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isVisible = trackingState.isEnabled && (trackingState.isHandDetected || persisting);
  const isPersistingSignal = !trackingState.isHandDetected && persisting;
  const isPinchingNow = trackingState.isPinching || isPieceGrabbed;

  // The camera delivers ~30 hand positions a second and they arrive with a little noise. The reticle is
  // drawn from its own frame loop, easing toward the latest position (and pinch size), so it glides at the
  // display's rate instead of stepping from sample to sample.
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 50, y: 50, scale: 1, visible: false });
  targetRef.current = {
    x: lastValidPosRef.current.x,
    y: lastValidPosRef.current.y,
    scale: isPinchingNow ? 1.15 : 1 + (isPersistingSignal ? 0 : trackingState.pinchProgress || 0) * 0.5,
    visible: isVisible,
  };

  useEffect(() => {
    if (!trackingState.isEnabled) return;
    const shown = { x: 50, y: 50, scale: 1, fresh: true };
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const t = targetRef.current;
      if (!t.visible) {
        shown.fresh = true; // next time it appears, start at the hand rather than gliding in from the old spot
      } else {
        if (shown.fresh) {
          shown.x = t.x; shown.y = t.y; shown.scale = t.scale; shown.fresh = false;
        } else {
          const dist = Math.hypot(t.x - shown.x, t.y - shown.y);
          // Small corrections are eased slowly (kills shimmer at rest); big moves are followed quickly
          const tau = dist > 6 ? 0.035 : dist > 1.5 ? 0.06 : 0.11;
          const k = 1 - Math.exp(-dt / tau);
          shown.x += (t.x - shown.x) * k;
          shown.y += (t.y - shown.y) * k;
          shown.scale += (t.scale - shown.scale) * (1 - Math.exp(-dt / 0.12));
        }
        const el = reticleRef.current;
        if (el) {
          el.style.transform = `translate3d(${(shown.x / 100) * window.innerWidth}px, ${(shown.y / 100) * window.innerHeight}px, 0) translate(-50%, -50%)`;
        }
        if (dotRef.current) dotRef.current.style.transform = `scale(${shown.scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trackingState.isEnabled]);

  if (!trackingState.isEnabled) return null;

  const isPinching = isPinchingNow;

  // Z-Index Aware Depth Priority:
  // - Ground Mode (isPinching/lifted piece): z-15 (above canvas z-10 board, under lifted pieces and HUD z-20+)
  // - Floating Mode (un-pinched air cursor): z-40 (HUD overlay level)
  const layerZIndex = isPinching ? 'z-[15]' : 'z-40';

  return (
    <div
      id="spatial-pickup-pointer-layer"
      className={`fixed inset-0 pointer-events-none overflow-hidden select-none ${layerZIndex}`}
    >
      <div
        ref={reticleRef}
        className={`spatial-pointer-reticle-overlay absolute left-0 top-0 pointer-events-none will-change-transform transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        data-depth-priority={isPinching ? 'board-ground' : 'floating'}
      >
        {/* Luminous Blue Dot & Spatial Reticle */}
        <div
          className={`relative rounded-full flex items-center justify-center transition-all duration-200 ${
            isPersistingSignal ? 'opacity-70 scale-95' : 'opacity-100'
          } ${
            isPinching
              ? 'w-7 h-7 sm:w-8 sm:h-8 bg-cyan-950/60 border-2 border-cyan-300 shadow-[0_4px_20px_rgba(0,0,0,0.85),0_0_16px_rgba(34,211,238,0.9),inset_0_0_8px_rgba(34,211,238,0.5)] ring-2 ring-cyan-400/70 scale-95'
              : 'w-7 h-7 sm:w-8 sm:h-8 border-2 border-cyan-400/80 bg-cyan-950/30 shadow-[0_0_14px_rgba(6,182,212,0.7),inset_0_0_6px_rgba(6,182,212,0.3)] scale-100'
          }`}
        >
          {/* Active Glowing Blue Center Dot */}
          <div
            ref={dotRef}
            className={`rounded-full transition-[background-color,box-shadow] duration-200 ${
              isPinching
                ? 'w-3.5 h-3.5 bg-cyan-200 shadow-[0_0_12px_#67e8f9,0_0_22px_#0ea5e9]'
                : 'w-3 h-3 bg-cyan-400 shadow-[0_0_10px_#22d3ee,0_0_18px_#0284c7]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};


