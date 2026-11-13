import React from 'react';
import { Hand, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import type { HandTrackingState, HoverTileInfo } from '../types';

interface SpatialGestureHUDProps {
  trackingState: HandTrackingState;
  hoverInfo: HoverTileInfo | null;
  isPieceGrabbed: boolean;
  turn: 'w' | 'b';
}

export const SpatialGestureHUD: React.FC<SpatialGestureHUDProps> = ({
  trackingState,
  hoverInfo,
  isPieceGrabbed,
  turn,
}) => {
  if (!trackingState.isEnabled) return null;

  const cursorX = trackingState.cursorPosition2D.x * 100;
  const cursorY = trackingState.cursorPosition2D.y * 100;

  return (
    <div id="spatial-gesture-hud" className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* 2D Spatial Hand Pointer Indicator */}
      {trackingState.isHandDetected && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
          style={{
            left: `${cursorX}%`,
            top: `${cursorY}%`,
          }}
        >
          {/* Outer Pulsing Sleek Aura */}
          <div
            className={`w-14 h-14 rounded-full border transition-all duration-150 flex items-center justify-center ${
              trackingState.isPinching
                ? 'border-blue-400 bg-blue-500/25 shadow-[0_0_28px_rgba(59,130,246,0.85)] scale-110'
                : 'border-blue-500/60 bg-blue-500/10 shadow-[0_0_14px_rgba(59,130,246,0.4)] scale-100'
            }`}
          >
            {/* Center Pinch Focal Dot */}
            <div
              className={`w-3.5 h-3.5 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(59,130,246,0.8)] ${
                trackingState.isPinching ? 'bg-blue-400 scale-125' : 'bg-blue-300 scale-100'
              }`}
            />
          </div>

          {/* Floating Action Tag below cursor */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0a0a0c]/85 backdrop-blur-xl px-2.5 py-1 rounded-md border border-white/10 text-[11px] font-mono text-white/90 shadow-2xl flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                trackingState.isPinching ? 'bg-blue-400 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            {trackingState.isPinching ? 'HOLDING PIECE' : 'PINCH TO LIFT'}
          </div>
        </div>
      )}

      {/* Target Tile Hover Status Pill (Center Top) */}
      {hoverInfo && isPieceGrabbed && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2.5">
          {hoverInfo.isLegal ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">
                TARGET: SQUARE <span className="uppercase font-mono font-bold text-white">{hoverInfo.square}</span> (LEGAL)
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold text-rose-300">
                TARGET: SQUARE <span className="uppercase font-mono font-bold text-white">{hoverInfo.square}</span> (ILLEGAL)
              </span>
            </>
          )}
        </div>
      )}

      {/* Gesture Instruction Guidance Pill (Bottom Center) */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-black/50 border border-white/10 backdrop-blur-xl px-4 py-1.5 rounded-lg shadow-xl flex items-center gap-2.5 text-xs text-white/70">
        <Hand className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[11px] font-medium tracking-wide">
          <strong className="text-white">Spatial Gestures:</strong> Pinch Thumb & Index to lift piece, move in 3D, open to drop.
        </span>
      </div>
    </div>
  );
};
