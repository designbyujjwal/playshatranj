import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Eye, EyeOff, Maximize2, Minimize2, RefreshCw, Sliders } from 'lucide-react';
import type { HandTrackingState } from '../types';

interface HandCameraPIPProps {
  trackingState: HandTrackingState;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onToggleCamera: () => void;
  onRestartCamera: () => void;
  isCameraActive: boolean;
  onOpenSettings?: () => void;
}

// MediaPipe Hand Landmark connections
const HAND_CONNECTIONS = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle
  [0, 9], [9, 10], [10, 11], [11, 12],
  // Ring
  [0, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm base
  [5, 9], [9, 13], [13, 17],
];

export const HandCameraPIP: React.FC<HandCameraPIPProps> = ({
  trackingState,
  videoRef,
  onToggleCamera,
  onRestartCamera,
  isCameraActive,
  onOpenSettings,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Render Hand Skeleton on Canvas Overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showSkeleton || !trackingState.landmarks || trackingState.landmarks.length < 21) {
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const lms = trackingState.landmarks;

    // 1. Draw Skeleton Bones (Antique gold & vermilion ink drafting lines)
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    HAND_CONNECTIONS.forEach(([i, j]) => {
      const p1 = lms[i];
      const p2 = lms[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
      ctx.strokeStyle = trackingState.isPinching
        ? 'rgba(130, 30, 37, 0.95)'
        : 'rgba(217, 140, 50, 0.75)';
      ctx.stroke();
    });

    // 2. Draw Pinch Tension Line
    const thumb = lms[4];
    const index = lms[8];
    ctx.beginPath();
    ctx.moveTo(thumb.x * width, thumb.y * height);
    ctx.lineTo(index.x * width, index.y * height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = trackingState.isPinching
      ? 'rgba(130, 30, 37, 1.0)'
      : 'rgba(217, 140, 50, 0.85)';
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Draw Landmark Joints
    lms.forEach((lm, idx) => {
      const x = lm.x * width;
      const y = lm.y * height;

      ctx.beginPath();
      const isPinchTip = idx === 4 || idx === 8;
      const radius = isPinchTip ? 4.5 : 2.5;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);

      if (isPinchTip) {
        ctx.fillStyle = trackingState.isPinching ? '#821e25' : '#d97706';
        ctx.shadowColor = trackingState.isPinching ? '#821e25' : '#d97706';
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = '#fff9f0';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    });

    // 4. Pinch Ring
    const midX = ((thumb.x + index.x) * 0.5) * width;
    const midY = ((thumb.y + index.y) * 0.5) * height;

    ctx.beginPath();
    ctx.arc(midX, midY, 10, 0, Math.PI * 2 * trackingState.pinchProgress);
    ctx.strokeStyle = trackingState.isPinching ? '#821e25' : '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [trackingState.landmarks, trackingState.isPinching, trackingState.pinchProgress, showSkeleton]);

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-6 sm:left-10 z-30 flex flex-col select-none">
      {/* Player Vision Title in Cormorant Italic */}
      <span className="font-cormorant italic font-semibold text-sm tracking-wide text-[#f4ece1] mb-1.5 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        Player Vision &amp; Gestures
      </span>

      {/* Camera HUD Card in Codex Parchment */}
      <div
        id="hand-camera-pip"
        className={`hud-paper rounded-xl p-3 sm:p-3.5 transition-all duration-200 overflow-hidden relative ${
          isMinimized ? 'w-48' : 'w-64 sm:w-70'
        }`}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#7d481b]/20">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#821e25] bg-[#821e25]/10 border border-[#7d481b]/40 px-2 py-0.5 rounded font-bold">
              GESTURE
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#7d481b]">
            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="p-1 hover:text-[#821e25] rounded bg-[#f4ece1] border border-[#7d481b]/20 hover:bg-[#ede3d2] transition-colors cursor-pointer"
                title="Sensitivity & Tracking Settings"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onRestartCamera}
              className="p-1 hover:text-[#821e25] rounded bg-[#f4ece1] border border-[#7d481b]/20 hover:bg-[#ede3d2] transition-colors cursor-pointer"
              title="Restart Stream"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleCamera}
              className={`p-1 rounded transition-colors cursor-pointer bg-[#f4ece1] border border-[#7d481b]/20 hover:bg-[#ede3d2] ${
                isCameraActive
                  ? 'text-[#821e25] hover:text-[#821e25]'
                  : 'text-[#7d481b]/70 hover:text-[#821e25]'
              }`}
              title={isCameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
            >
              {isCameraActive ? (
                <Camera className="w-3.5 h-3.5 text-[#821e25]" />
              ) : (
                <CameraOff className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:text-[#821e25] rounded bg-[#f4ece1] border border-[#7d481b]/20 hover:bg-[#ede3d2] transition-colors cursor-pointer"
              title={isMinimized ? 'Expand Camera' : 'Minimize Camera'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Status indicator dot */}
            <div
              className={`ml-1 h-2 w-2 rounded-full ${
                isCameraActive ? 'bg-[#821e25] animate-pulse shadow-[0_0_6px_rgba(130,30,37,0.6)]' : 'bg-[#7d481b]/40'
              }`}
            />
          </div>
        </div>

        {/* Video & Skeleton Viewport */}
        {!isMinimized && (
          <div className="aspect-video bg-[#26150b] rounded-lg flex items-center justify-center relative overflow-hidden border border-[#7d481b]/30 my-1 shadow-inner">
            {/* Mirrored Video stream */}
            <video
              ref={videoRef as React.RefObject<HTMLVideoElement>}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover -scale-x-100 ${!isCameraActive ? 'hidden' : ''}`}
            />

            {/* Skeleton Overlay Canvas */}
            {isCameraActive && (
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
            )}

            {/* Fallback Screen when Camera is Off */}
            {!isCameraActive && (
              <div className="p-3 text-center flex flex-col items-center justify-center gap-1 w-full h-full bg-[#f4ece1] text-[#3d1d07]">
                {trackingState.isLoading ? (
                  <div className="flex flex-col items-center gap-1.5 py-1">
                    <RefreshCw className="w-4 h-4 text-[#821e25] animate-spin" />
                    <span className="text-[9px] font-cinzel font-bold text-[#7d481b]">CONNECTING...</span>
                  </div>
                ) : (
                  <>
                    <CameraOff className="w-4 h-4 text-[#7d481b] mb-0.5" />
                    <span className="text-xs text-[#5c3010] font-cormorant italic leading-tight">
                      Camera stream currently inactive
                    </span>
                    <button
                      type="button"
                      onClick={onToggleCamera}
                      className="mt-1 px-3 py-1 bg-[#821e25] hover:bg-[#9a242c] text-[#f7f2e7] rounded-lg font-cinzel font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      Enable Camera
                    </button>
                    <span className="text-[10px] text-[#7d481b] font-cinzel font-semibold mt-0.5">
                      Mouse controls active
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Readout */}
        <div className="mt-2 pt-1.5 border-t border-[#7d481b]/20 flex items-center justify-between text-[10px] font-cinzel font-bold">
          <span className="text-[#7d481b] uppercase tracking-wider">
            {trackingState.isLoading
              ? 'LOADING'
              : !isCameraActive
              ? 'MOUSE MODE'
              : trackingState.isHandDetected
              ? (trackingState.isPinching ? 'PINCH' : 'HAND MODE')
              : 'HAND MODE'}
          </span>
          <span className="text-[#821e25] tracking-wider">
            {isCameraActive && trackingState.fps > 0 ? `${trackingState.fps} FPS` : 'TACTILE ACTIVE'}
          </span>
        </div>
      </div>
    </div>
  );
};
