import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Hand,
  Crosshair,
  Move,
  Crown,
  Maximize2,
  CheckCircle2,
  Tv,
  Film,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMatch: () => void;
  playerName?: string;
  playerColor?: 'w' | 'b';
}

interface Chapter {
  id: string;
  title: string;
  startTime: number;
  duration: number;
  headline: string;
  description: string;
  icon: React.ReactNode;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'calibration',
    title: '1. Hand Detection',
    startTime: 0,
    duration: 10,
    headline: 'Position your hand within the webcam feed',
    description: 'Keep your hand 40-70cm from the camera. The 21-point tracking mesh will lock on, projecting an amber targeting ray onto the marble chessboard.',
    icon: <Hand className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'pinch',
    title: '2. Pinch & Lift',
    startTime: 10,
    duration: 12,
    headline: 'Bring index & thumb together to grab',
    description: 'Hover your pointer over any of your pieces. Pinch your index finger and thumb together to grasp the piece and elevate it into the air with spatial physics.',
    icon: <Crosshair className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'move',
    title: '3. Aim & Place',
    startTime: 22,
    duration: 12,
    headline: 'Glide over legal tiles and release',
    description: 'Move your hand across the board. Valid destination squares pulse with luminous golden rings. Open your fingers to release and snap the piece into place.',
    icon: <Move className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'orbit',
    title: '4. Camera Angles',
    startTime: 34,
    duration: 10,
    headline: 'Orbit or switch perspective views',
    description: 'Use the top-right camera presets (White, Black, Top-Down, Cinematic) or drag the background canvas with your mouse/touch to dynamically inspect angles.',
    icon: <Tv className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'checkmate',
    title: '5. Play & Conquer',
    startTime: 44,
    duration: 8,
    headline: 'Outsmart the Stockfish-calibrated AI',
    description: 'Play against 4 AI difficulty tiers or 2-player pass-and-play. Track moves, undo missteps, and deliver checkmate in full spatial immersion.',
    icon: <Crown className="w-4 h-4 text-amber-400" />,
  },
];

const TOTAL_DURATION = 52; // 52 seconds total cinematic tutorial

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen,
  onClose,
  onStartMatch,
  playerName = 'Grandmaster',
  playerColor = 'w',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  const lastSoundTriggerRef = useRef<{ [key: string]: boolean }>({});
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const pausedTimeRef = useRef<number>(0);

  // Identify current active chapter
  const activeChapterIndex = CHAPTERS.findIndex(
    (ch) => currentTime >= ch.startTime && currentTime < ch.startTime + ch.duration
  );
  const currentChapter = CHAPTERS[activeChapterIndex >= 0 ? activeChapterIndex : 0];

  // Scrubbing/Seeking
  const handleSeek = (newTime: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION, newTime));
    setCurrentTime(clamped);
    pausedTimeRef.current = clamped;
    startTimeRef.current = performance.now() - (clamped / playbackSpeed) * 1000;
  };

  // Sound trigger sync
  const triggerAudioOnce = useCallback(
    (key: string, fn: () => void) => {
      if (isAudioMuted) return;
      if (!lastSoundTriggerRef.current[key]) {
        lastSoundTriggerRef.current[key] = true;
        fn();
      }
    },
    [isAudioMuted]
  );

  // Play/Pause toggler
  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      pausedTimeRef.current = currentTime;
    } else {
      setIsPlaying(true);
      startTimeRef.current = performance.now() - (pausedTimeRef.current / playbackSpeed) * 1000;
    }
  };

  // Main Canvas Render Loop (60 FPS Procedural Cinematic Video)
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset sound triggers when loop wraps
    let localTime = currentTime;

    const renderFrame = () => {
      if (isPlaying) {
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        localTime = (elapsed * playbackSpeed) % TOTAL_DURATION;
        setCurrentTime(localTime);
      } else {
        localTime = pausedTimeRef.current;
      }

      // Reset audio triggers on loop
      if (localTime < 0.5) {
        lastSoundTriggerRef.current = {};
      }

      // Sync sound events
      if (localTime >= 12.0 && localTime < 12.3) {
        triggerAudioOnce('pinch_1', () => {
          soundEffects.playPinchEngage();
          soundEffects.playLiftSound();
        });
      }
      if (localTime >= 27.5 && localTime < 27.8) {
        triggerAudioOnce('place_1', () => {
          soundEffects.playPinchRelease();
          soundEffects.playMoveSound();
        });
      }
      if (localTime >= 47.0 && localTime < 47.3) {
        triggerAudioOnce('mate_1', () => {
          soundEffects.playCheckSound();
        });
      }

      // -------------------------------------------------------------
      // VIDEO CANVAS RENDERING (1920x1080 Native Render Target)
      // -------------------------------------------------------------
      const W = canvas.width;
      const H = canvas.height;

      // 1. Deep Obsidian Stage Background with Atmospheric Amber God-Rays
      const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.45, 100, W * 0.5, H * 0.5, W * 0.8);
      bgGrad.addColorStop(0, '#151b27');
      bgGrad.addColorStop(0.5, '#0d111a');
      bgGrad.addColorStop(1, '#05070a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Volumetric Diagonal Yellow Light Beam (matching Onboarding Chiaroscuro)
      ctx.save();
      const beamGrad = ctx.createLinearGradient(W * 0.85, 0, W * 0.3, H);
      beamGrad.addColorStop(0, 'rgba(255, 215, 80, 0.28)');
      beamGrad.addColorStop(0.35, 'rgba(255, 180, 50, 0.16)');
      beamGrad.addColorStop(0.75, 'rgba(230, 140, 20, 0.05)');
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(W * 0.7, 0);
      ctx.lineTo(W, 0);
      ctx.lineTo(W * 0.55, H);
      ctx.lineTo(W * 0.15, H);
      ctx.closePath();
      ctx.fill();

      // Atmospheric Dust Motes
      for (let i = 0; i < 24; i++) {
        const mx = (W * 0.35 + (i * 59 + localTime * 28) % (W * 0.55));
        const my = (H * 0.2 + (i * 37 + Math.sin(localTime * 1.5 + i) * 60)) % (H * 0.75);
        const alpha = (0.2 + 0.5 * Math.sin(localTime * 2 + i * 1.2)) * 0.6;
        ctx.fillStyle = `rgba(255, 230, 150, ${alpha})`;
        ctx.beginPath();
        ctx.arc(mx, my, 2 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. 3D Perspective Grid / Chessboard Floor
      const boardCenterY = H * 0.68;
      const boardCenterX = W * 0.5;

      ctx.save();
      // Draw simulated 3D perspective chessboard
      const rows = 8;
      const cols = 8;
      const fovY = 0.55;

      // Camera Orbit oscillation for Chapter 4
      const orbitAngle = localTime >= 34 && localTime < 44
        ? Math.sin((localTime - 34) * 0.8) * 0.35
        : 0;

      ctx.translate(boardCenterX, boardCenterY);
      ctx.rotate(orbitAngle);

      const boardScale = 540;

      // Chessboard Surface
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const u0 = (c - 4) / 4;
          const u1 = (c - 3) / 4;
          const v0 = (r - 4) / 4;
          const v1 = (r - 3) / 4;

          // Perspective mapping
          const p00 = projectTile(u0, v0, boardScale, fovY);
          const p10 = projectTile(u1, v0, boardScale, fovY);
          const p11 = projectTile(u1, v1, boardScale, fovY);
          const p01 = projectTile(u0, v1, boardScale, fovY);

          const isDark = (r + c) % 2 === 1;

          // Legal square pulse during Chapter 2 & 3
          const isLegalTarget = (r === 4 && c === 4) || (r === 5 && c === 4);
          const isPawnOrigin = r === 6 && c === 4;

          ctx.beginPath();
          ctx.moveTo(p00.x, p00.y);
          ctx.lineTo(p10.x, p10.y);
          ctx.lineTo(p11.x, p11.y);
          ctx.lineTo(p01.x, p01.y);
          ctx.closePath();

          if (isLegalTarget && (localTime >= 15 && localTime < 30)) {
            const pulse = 0.3 + 0.25 * Math.sin(localTime * 6);
            ctx.fillStyle = `rgba(245, 158, 11, ${pulse})`;
          } else if (isPawnOrigin && (localTime >= 10 && localTime < 24)) {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
          } else {
            ctx.fillStyle = isDark ? '#1a2230' : '#4a5568';
          }
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Draw Standing Chess Pieces (Stylized 2.5D Projections)
      drawTutorialPiece(ctx, -1.0, 0.4, 'w', 'pawn', boardScale, fovY);
      drawTutorialPiece(ctx, 1.2, 0.3, 'w', 'knight', boardScale, fovY);
      drawTutorialPiece(ctx, 0.0, -1.4, 'b', 'king', boardScale, fovY, localTime >= 46);
      drawTutorialPiece(ctx, -1.2, -1.2, 'b', 'pawn', boardScale, fovY);

      // Moving White Pawn Animation (Active during Chapter 2 & 3)
      let pawnPos = { x: 0.0, y: 0.5 };
      let pawnLift = 0;
      let isPinching = false;

      if (localTime < 10) {
        // Calibration: Pawn stationary on e2
        pawnPos = { x: 0.0, y: 0.5 };
        pawnLift = 0;
      } else if (localTime >= 10 && localTime < 14) {
        // Hand descends, pinches
        const t = (localTime - 10) / 4;
        isPinching = t > 0.4;
        pawnLift = Math.sin(Math.min(1, Math.max(0, (t - 0.4) * 1.6)) * Math.PI * 0.5) * 65;
      } else if (localTime >= 14 && localTime < 24) {
        // Pawn gliding through mid-air to e4
        isPinching = true;
        const glide = (localTime - 14) / 10;
        pawnPos = { x: 0.0, y: 0.5 - glide * 0.5 };
        pawnLift = 65 + Math.sin(localTime * 4) * 5;
      } else if (localTime >= 24 && localTime < 28) {
        // Releasing pawn onto e4
        const t = (localTime - 24) / 4;
        pawnPos = { x: 0.0, y: 0.0 };
        isPinching = t < 0.6;
        pawnLift = Math.max(0, 65 * (1 - t * 1.8));
      } else {
        // Pawn settled on e4
        pawnPos = { x: 0.0, y: 0.0 };
        pawnLift = 0;
      }

      // Draw active pawn
      drawTutorialPiece(ctx, pawnPos.x, pawnPos.y, 'w', 'pawn', boardScale, fovY, false, pawnLift);

      ctx.restore(); // Restore perspective matrix

      // 4. Spatial Hand Skeleton & Gestures Overlay
      ctx.save();
      let handTarget = { x: W * 0.5, y: H * 0.45 };

      if (localTime < 10) {
        // Calibration sweep
        handTarget.x = W * 0.5 + Math.sin(localTime * 1.2) * 120;
        handTarget.y = H * 0.42 + Math.cos(localTime * 1.5) * 45;
      } else if (localTime >= 10 && localTime < 14) {
        // Move to pawn e2
        const t = (localTime - 10) / 4;
        handTarget.x = W * 0.5;
        handTarget.y = THREE_LERP(H * 0.45, H * 0.66, t);
      } else if (localTime >= 14 && localTime < 24) {
        // Moving pawn forward
        const t = (localTime - 14) / 10;
        handTarget.x = W * 0.5;
        handTarget.y = THREE_LERP(H * 0.66, H * 0.54, t) - pawnLift * 0.5;
      } else if (localTime >= 24 && localTime < 28) {
        // Release & retract hand
        const t = (localTime - 24) / 4;
        handTarget.x = W * 0.5;
        handTarget.y = THREE_LERP(H * 0.54, H * 0.38, t);
      } else if (localTime >= 28 && localTime < 44) {
        // Orbit wave motion
        handTarget.x = W * 0.5 + Math.sin(localTime * 1.8) * 140;
        handTarget.y = H * 0.44;
      } else {
        // Victory gesture
        handTarget.x = W * 0.5 + 80;
        handTarget.y = H * 0.38;
      }

      // Render Stylized Hand Tracking Skeleton
      drawHandSkeleton(ctx, handTarget.x, handTarget.y, isPinching, localTime);
      ctx.restore();

      // 5. Cinematic Anamorphic Lens Flare (Top-Right Beam Accent)
      if (localTime >= 44) {
        // Extra victory flare streak
        drawAnamorphicStreak(ctx, W * 0.5, H * 0.48, 1.4);
      } else {
        drawAnamorphicStreak(ctx, W * 0.68, H * 0.32, 0.7);
      }

      // 6. Google Flow / Nano Banana Studio HUD Overlay
      drawStudioWatermark(ctx, W, H, localTime);

      // Loop request
      animFrameRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen, isPlaying, playbackSpeed, triggerAudioOnce]);

  if (!isOpen) return null;

  return (
    <div
      id="video-tutorial-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0d121c] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-auto max-h-[96vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-[#090d14]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Spatial Chess Video Tutorial
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  FLOW • NANO BANANA
                </span>
              </div>
              <p className="text-[11px] text-white/50 hidden sm:block">
                Master the webcam pinch-and-drop gesture engine in 50 seconds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              Skip
            </button>
            <button
              onClick={onStartMatch}
              className="text-xs font-bold text-black px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            >
              <span>Play Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            onClick={togglePlayPause}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Centered Pause Indicator overlay when user paused */}
          {!isPlaying && (
            <div
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px]"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.7)] transform scale-110 transition-transform">
                <Play className="w-8 h-8 ml-1 fill-black" />
              </div>
            </div>
          )}

          {/* Subtitles Overlay Bar */}
          {showSubtitles && (
            <div className="absolute bottom-16 left-6 right-6 flex justify-center pointer-events-none">
              <div className="max-w-xl text-center px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-white/95 shadow-2xl transition-all">
                <span className="text-amber-400 font-bold mr-1.5">{currentChapter.title}:</span>
                <span>{currentChapter.description}</span>
              </div>
            </div>
          )}

          {/* Bottom Integrated Video Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-2">
            {/* Scrubbing Timeline Progress Bar */}
            <div
              className="relative w-full h-2 rounded-full bg-white/20 cursor-pointer hover:h-3 transition-all group/scrub"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                handleSeek(ratio * TOTAL_DURATION);
              }}
            >
              {/* Chapter markers on scrub bar */}
              {CHAPTERS.map((ch) => (
                <div
                  key={ch.id}
                  style={{ left: `${(ch.startTime / TOTAL_DURATION) * 100}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-white/40 z-10"
                />
              ))}

              {/* Progress fill */}
              <div
                style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md transform scale-0 group-hover/scrub:scale-100 transition-transform" />
              </div>
            </div>

            {/* Controls & Timestamp Info */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayPause}
                  className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={() => handleSeek(0)}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title="Restart Tutorial"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isAudioMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>

                <span className="font-mono text-[11px] text-white/70">
                  {formatSeconds(currentTime)} / {formatSeconds(TOTAL_DURATION)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Speed selector */}
                <button
                  onClick={() => {
                    const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
                    setPlaybackSpeed(nextSpeed);
                  }}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white/90"
                >
                  {playbackSpeed}x
                </button>

                {/* Subtitles Toggle */}
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                    showSubtitles
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-white/5 text-white/50 border-white/10'
                  }`}
                >
                  CC
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Carousel / Step Navigation */}
        <div className="p-4 sm:p-5 bg-[#090d14] border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSeek(ch.startTime)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isActive
                      ? 'bg-amber-500/15 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'bg-[#121622]/60 border-white/5 hover:bg-[#182030]/60 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      {ch.icon}
                      <span className="truncate">{ch.title}</span>
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                  <span className="text-[10px] text-white/50 truncate">
                    {ch.headline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action CTA Bar */}
          <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10">
            <div className="text-xs text-white/60 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Playing as{' '}
                <strong className="text-white font-semibold">
                  {playerColor === 'w' ? 'White King' : 'Black King'}
                </strong>{' '}
                ({playerName})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-xs text-white/70 hover:text-white px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={onStartMatch}
                className="text-xs sm:text-sm font-bold text-black px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.45)]"
              >
                <span>ENTER BATTLEFIELD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// HELPER CANVAS RENDERING ROUTINES
// -------------------------------------------------------------

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function THREE_LERP(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function projectTile(u: number, v: number, scale: number, fovY: number): { x: number; y: number } {
  // Perspective projection matrix approximation
  const z = 1.0 + (v + 1.0) * fovY;
  const invZ = 1.0 / z;
  return {
    x: u * scale * invZ,
    y: v * scale * 0.45 * invZ,
  };
}

function drawTutorialPiece(
  ctx: CanvasRenderingContext2D,
  tileX: number,
  tileY: number,
  color: 'w' | 'b',
  pieceType: 'pawn' | 'knight' | 'king',
  scale: number,
  fovY: number,
  isToppled = false,
  liftPx = 0
) {
  const pt = projectTile(tileX, tileY, scale, fovY);

  ctx.save();
  ctx.translate(pt.x, pt.y - liftPx);

  if (isToppled) {
    ctx.rotate(Math.PI * 0.48);
  }

  // Cast Drop Shadow on Board
  if (liftPx > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.1, 0.45 - liftPx * 0.004)})`;
    ctx.beginPath();
    ctx.ellipse(0, liftPx, 22 + liftPx * 0.15, 10 + liftPx * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const isWhite = color === 'w';

  // Draw 2.5D stylized chess piece body
  const baseGrad = ctx.createLinearGradient(-15, -40, 15, 0);
  if (isWhite) {
    baseGrad.addColorStop(0, '#ffffff');
    baseGrad.addColorStop(0.4, '#e2e8f0');
    baseGrad.addColorStop(0.8, '#cbd5e1');
    baseGrad.addColorStop(1, '#94a3b8');
  } else {
    baseGrad.addColorStop(0, '#334155');
    baseGrad.addColorStop(0.4, '#1e293b');
    baseGrad.addColorStop(0.8, '#0f172a');
    baseGrad.addColorStop(1, '#020617');
  }

  // Piece Base
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, 18, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Piece Stem
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.quadraticCurveTo(-6, -24, -9, -38);
  ctx.lineTo(9, -38);
  ctx.quadraticCurveTo(6, -24, 12, 0);
  ctx.closePath();
  ctx.fill();

  // Piece Head/Crown
  if (pieceType === 'pawn') {
    ctx.beginPath();
    ctx.arc(0, -44, 11, 0, Math.PI * 2);
    ctx.fill();
  } else if (pieceType === 'king') {
    ctx.beginPath();
    ctx.ellipse(0, -44, 13, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    // King Cross
    ctx.fillStyle = isWhite ? '#fbbf24' : '#64748b';
    ctx.fillRect(-2, -56, 4, 12);
    ctx.fillRect(-5, -53, 10, 3);
  } else {
    // Knight
    ctx.beginPath();
    ctx.moveTo(-8, -38);
    ctx.lineTo(-14, -50);
    ctx.lineTo(-6, -56);
    ctx.lineTo(6, -46);
    ctx.lineTo(8, -38);
    ctx.closePath();
    ctx.fill();
  }

  // Piece Specular Rim Highlight (Kissed by ambient yellow god-ray)
  ctx.strokeStyle = 'rgba(255, 215, 80, 0.65)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(4, -44, 10, -Math.PI * 0.2, Math.PI * 0.4);
  ctx.stroke();

  ctx.restore();
}

function drawHandSkeleton(
  ctx: CanvasRenderingContext2D,
  hx: number,
  hy: number,
  isPinching: boolean,
  time: number
) {
  ctx.save();
  ctx.translate(hx, hy);

  // Laser Targeting Line casting downward to board
  const laserGrad = ctx.createLinearGradient(0, 0, 0, 110);
  laserGrad.addColorStop(0, 'rgba(255, 215, 80, 0.9)');
  laserGrad.addColorStop(0.7, 'rgba(255, 180, 50, 0.4)');
  laserGrad.addColorStop(1, 'rgba(255, 150, 20, 0)');
  ctx.strokeStyle = laserGrad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 110);
  ctx.stroke();

  // Destination Reticle Ring on Board
  ctx.strokeStyle = 'rgba(255, 215, 80, 0.8)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.ellipse(0, 110, 22, 10, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Hand Landmark Nodes (MediaPipe 21-point tracking simulation)
  const pinchGap = isPinching ? 4 : 26;

  // Thumb tip & Index tip coordinates
  const thumb = { x: -pinchGap * 0.6, y: -8 };
  const index = { x: pinchGap * 0.6, y: -8 };
  const wrist = { x: 0, y: -90 };
  const knuckle = { x: 4, y: -45 };

  // Draw Bones
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)';
  ctx.lineWidth = 2.0;

  // Wrist to knuckle
  ctx.beginPath();
  ctx.moveTo(wrist.x, wrist.y);
  ctx.lineTo(knuckle.x, knuckle.y);
  ctx.stroke();

  // Knuckle to index
  ctx.beginPath();
  ctx.moveTo(knuckle.x, knuckle.y);
  ctx.lineTo(index.x, index.y);
  ctx.stroke();

  // Wrist to thumb
  ctx.beginPath();
  ctx.moveTo(wrist.x, wrist.y);
  ctx.lineTo(thumb.x, thumb.y);
  ctx.stroke();

  // Draw Nodes
  const nodes = [wrist, knuckle, index, thumb];
  nodes.forEach((n, idx) => {
    ctx.fillStyle = idx >= 2 ? '#fbbf24' : '#60a5fa';
    ctx.beginPath();
    ctx.arc(n.x, n.y, idx >= 2 ? 6 : 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  // Pinch Magnetic Energy Ring when engaged
  if (isPinching) {
    const ringRadius = 14 + Math.sin(time * 12) * 2;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -8, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Sparkle sparks
    for (let s = 0; s < 6; s++) {
      const angle = (s / 6) * Math.PI * 2 + time * 4;
      const sx = Math.cos(angle) * (ringRadius + 5);
      const sy = -8 + Math.sin(angle) * (ringRadius + 5);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(sx - 1, sy - 1, 2.5, 2.5);
    }
  }

  ctx.restore();
}

function drawAnamorphicStreak(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  intensity = 1.0
) {
  ctx.save();
  ctx.translate(x, y);

  // Horizontal streak gradient
  const streakGrad = ctx.createLinearGradient(-320 * intensity, 0, 320 * intensity, 0);
  streakGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  streakGrad.addColorStop(0.2, 'rgba(96, 165, 250, 0.15)');
  streakGrad.addColorStop(0.46, 'rgba(251, 191, 36, 0.7)');
  streakGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  streakGrad.addColorStop(0.54, 'rgba(251, 191, 36, 0.7)');
  streakGrad.addColorStop(0.8, 'rgba(96, 165, 250, 0.15)');
  streakGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = streakGrad;
  ctx.fillRect(-320 * intensity, -3, 640 * intensity, 6);

  // Core flare bloom
  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 45 * intensity);
  coreGrad.addColorStop(0, 'rgba(255, 255, 240, 0.9)');
  coreGrad.addColorStop(0.4, 'rgba(251, 191, 36, 0.45)');
  coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(0, 0, 45 * intensity, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawStudioWatermark(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  time: number
) {
  ctx.save();

  // Top-Left Studio Badge
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.beginPath();
  ctx.roundRect(24, 24, 250, 42, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 11px Inter, sans-serif';
  ctx.fillText('GOOGLE FLOW STUDIO', 36, 42);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '9px monospace';
  ctx.fillText('NANO BANANA ENGINE • 4K HDR', 36, 56);

  // Top-Right Live Timecode / Rec Status
  const isBlink = Math.floor(time * 2) % 2 === 0;
  ctx.fillStyle = isBlink ? '#ef4444' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(W - 145, 45, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '10px monospace';
  ctx.fillText(`REC [00:${formatSeconds(time)}:24]`, W - 132, 49);

  ctx.restore();
}
