import React, { useRef, useState, useEffect } from 'react';
import {
  Bot,
  User,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  X,
  ShieldAlert,
  MicOff,
  Maximize2,
  Minimize2,
  BrainCircuit,
  Sparkles,
  Swords,
} from 'lucide-react';
import type {
  GameMode,
  BotDifficulty,
  PieceColor,
  CapturedPieces,
  OnlineOpponent,
  PieceType,
} from '../types';

interface OpponentProfileProps {
  gameMode: GameMode;
  botDifficulty: BotDifficulty;
  currentTurn: PieceColor;
  isInCheck: boolean;
  isBotThinking?: boolean;
  isBotMoving?: boolean;
  playerSide?: PieceColor;
  capturedPieces: CapturedPieces;
  // Online Multiplayer props
  opponent?: OnlineOpponent | null;
  remoteStream?: MediaStream | null;
  matchStatus?: 'idle' | 'waiting' | 'active' | 'ended';
  pendingUndoFromOpponent?: boolean;
  pendingDrawFromOpponent?: boolean;
  onAcceptUndo?: () => void;
  onDeclineUndo?: () => void;
  onAcceptDraw?: () => void;
  onDeclineDraw?: () => void;
  onResign?: () => void;
  onOfferDraw?: () => void;
  onRequestUndo?: () => void;
}

// Bot difficulty metadata
const BOT_PROFILES: Record<
  BotDifficulty,
  { name: string; title: string; elo: number; avatar: string; description: string }
> = {
  easy: {
    name: 'Apprentice Bot',
    title: 'Beginner AI',
    elo: 850,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    description: 'Casual play • Learns tactics',
  },
  medium: {
    name: 'Tactician Bot',
    title: 'Club Player AI',
    elo: 1550,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    description: 'Calculates 3 moves deep',
  },
  hard: {
    name: 'Master AI',
    title: 'FIDE Master',
    elo: 2200,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    description: 'Sharp openings & endgame',
  },
  master: {
    name: 'Grandmaster AI',
    title: 'Super GM Engine',
    elo: 2750,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
    description: 'Deep neural evaluation',
  },
};

// Unicode piece icons for captured display
const PIECE_GLYPHS: Record<PieceType, { w: string; b: string }> = {
  p: { w: '♙', b: '♟' },
  n: { w: '♘', b: '♞' },
  b: { w: '♗', b: '♝' },
  r: { w: '♖', b: '♜' },
  q: { w: '♕', b: '♛' },
  k: { w: '♔', b: '♚' },
};

export const OpponentProfile: React.FC<OpponentProfileProps> = ({
  gameMode,
  botDifficulty,
  currentTurn,
  isInCheck,
  isBotThinking = false,
  isBotMoving = false,
  playerSide = 'w',
  capturedPieces,
  opponent,
  remoteStream,
  matchStatus = 'active',
  pendingUndoFromOpponent = false,
  pendingDrawFromOpponent = false,
  onAcceptUndo,
  onDeclineUndo,
  onAcceptDraw,
  onDeclineDraw,
  onResign,
  onOfferDraw,
  onRequestUndo,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpponentMuted, setIsOpponentMuted] = useState(false);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  // The opponent's piece color
  const opponentColor: PieceColor = playerSide === 'w' ? 'b' : 'w';
  const isOpponentTurn = currentTurn === opponentColor;

  // Pieces captured BY the opponent (if player is White 'w', opponent is Black 'b' who captured capturedPieces.b)
  const piecesCapturedByOpponent =
    (playerSide === 'w' ? capturedPieces?.b : capturedPieces?.w) || [];

  // Group captured pieces by type
  const capturedCounts: Partial<Record<PieceType, number>> = {};
  piecesCapturedByOpponent.forEach((type) => {
    capturedCounts[type] = (capturedCounts[type] || 0) + 1;
  });

  const botConfig = BOT_PROFILES[botDifficulty] || BOT_PROFILES.master;

  // Handle remote WebRTC video stream in online mode
  useEffect(() => {
    const videoEl = remoteVideoRef.current;
    if (!videoEl) return;

    if (remoteStream) {
      videoEl.srcObject = remoteStream;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasRemoteVideo(true);
            setAutoplayBlocked(false);
          })
          .catch((err) => {
            console.warn('[OpponentProfile] Video autoplay blocked:', err);
            setIsOpponentMuted(true);
            setAutoplayBlocked(true);
            videoEl.play().catch(() => {});
          });
      }
    } else {
      videoEl.srcObject = null;
      setHasRemoteVideo(false);
      setAutoplayBlocked(false);
    }
  }, [remoteStream]);

  const toggleOpponentAudio = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = !remoteVideoRef.current.muted;
      setIsOpponentMuted(remoteVideoRef.current.muted);
      if (!remoteVideoRef.current.muted) {
        setAutoplayBlocked(false);
        remoteVideoRef.current.play().catch(() => {});
      }
    }
  };

  const handleUnmuteClick = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = false;
      setIsOpponentMuted(false);
      setAutoplayBlocked(false);
      remoteVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      {/* Opponent Profile Section directly below Chess.io */}
      <div
        id="opponent-profile-section"
        className="fixed top-20 sm:top-22 left-6 sm:left-10 z-30 flex flex-col select-none"
      >
        {/* Opponent Profile Title in Serif Italic strictly matching Onboarding & Platform typography */}
        <span className="font-serif italic text-white/90 text-sm tracking-wide mb-1.5 block">
          Opponent Profile
        </span>

        {/* Profile Card matching Onboarding / Platform aesthetic */}
        <div
          id="opponent-profile-card"
          className={`bg-[#0b0c10]/95 backdrop-blur-md border rounded-xl p-3.5 shadow-2xl transition-all duration-200 overflow-hidden relative ${
            isMinimized ? 'w-48' : 'w-64 sm:w-70'
          } ${
            isOpponentTurn
              ? 'border-amber-400/70 shadow-[0_0_24px_rgba(251,191,36,0.18)] ring-1 ring-amber-400/40'
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          {/* Top Header Row */}
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-zinc-800/80">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-medium">
                {gameMode === 'vs-bot'
                  ? 'AI OPPONENT'
                  : gameMode === 'two-player'
                  ? 'LOCAL OPPONENT'
                  : 'ONLINE RIVAL'}
              </span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                  opponentColor === 'w'
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-200'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                }`}
              >
                {opponentColor === 'w' ? 'WHITE' : 'BLACK'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              {/* Online Audio Mute Toggle */}
              {gameMode === 'online' && hasRemoteVideo && (
                <button
                  type="button"
                  onClick={toggleOpponentAudio}
                  className="p-1 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                  title={isOpponentMuted ? 'Unmute Opponent Audio' : 'Mute Opponent Audio'}
                >
                  {isOpponentMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              {/* Minimize / Maximize */}
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                title={isMinimized ? 'Expand Opponent' : 'Minimize Opponent'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-3.5 h-3.5" />
                ) : (
                  <Minimize2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Status Dot */}
              <div
                className={`ml-1 h-2 w-2 rounded-full ${
                  isBotThinking || isBotMoving
                    ? 'bg-[#0066FF] animate-ping shadow-[0_0_6px_rgba(0,102,255,0.8)]'
                    : isOpponentTurn
                    ? 'bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                    : 'bg-zinc-600'
                }`}
              />
            </div>
          </div>

          {/* Body Content */}
          {!isMinimized && (
            <>
              {/* Mode A: Online Video Viewport */}
              {gameMode === 'online' ? (
                <div className="space-y-2">
                  <div className="aspect-video bg-[#050507] rounded-lg flex items-center justify-center relative overflow-hidden border border-zinc-800 my-1">
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      onLoadedMetadata={() => setHasRemoteVideo(true)}
                      className={`w-full h-full object-cover ${
                        hasRemoteVideo && !opponent?.videoOff ? 'opacity-100' : 'hidden'
                      }`}
                    />

                    {/* Placeholder when camera is off */}
                    {(!hasRemoteVideo || opponent?.videoOff) && (
                      <div className="flex flex-col items-center justify-center p-3 text-center select-none">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center mb-1.5 border border-zinc-800">
                          <User className="w-5 h-5 text-zinc-400" />
                        </div>
                        <p className="text-xs text-zinc-200 font-sans font-medium">
                          {opponent
                            ? opponent.videoOff
                              ? 'Camera Turned Off'
                              : opponent.name
                            : 'Waiting for Opponent...'}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
                          {opponent?.connected ? 'Online Match Active' : 'Connecting to match...'}
                        </p>
                      </div>
                    )}

                    {/* Autoplay blocked banner */}
                    {autoplayBlocked && (
                      <button
                        type="button"
                        onClick={handleUnmuteClick}
                        className="absolute inset-x-2 bottom-2 py-1 px-2 rounded-lg bg-amber-500 text-neutral-950 font-bold text-[10px] shadow-lg flex items-center justify-center gap-1.5 animate-bounce font-sans"
                      >
                        <Volume2 className="w-3 h-3" />
                        Click to Enable Audio
                      </button>
                    )}

                    {/* Check Warning Overlay */}
                    {isInCheck && isOpponentTurn && (
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-rose-600/90 text-white text-[9px] font-bold tracking-wide font-sans">
                        In Check!
                      </div>
                    )}

                    {opponent?.micMuted && (
                      <div className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-black/80 text-rose-400 border border-zinc-800">
                        <MicOff className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Online Action Buttons */}
                  <div className="flex items-center justify-between gap-1 pt-1">
                    {onRequestUndo && (
                      <button
                        type="button"
                        onClick={onRequestUndo}
                        disabled={!opponent || isOpponentTurn}
                        className="flex-1 py-1 px-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 text-[10px] font-sans flex items-center justify-center gap-1 transition-colors border border-zinc-800"
                        title="Request Undo"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Takeback
                      </button>
                    )}
                    {onOfferDraw && (
                      <button
                        type="button"
                        onClick={onOfferDraw}
                        disabled={!opponent}
                        className="flex-1 py-1 px-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 text-[10px] font-sans text-center transition-colors border border-zinc-800"
                        title="Offer Draw"
                      >
                        Draw
                      </button>
                    )}
                    {onResign && (
                      <button
                        type="button"
                        onClick={onResign}
                        disabled={!opponent}
                        className="flex-1 py-1 px-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-[10px] font-sans text-center transition-colors font-medium border border-rose-500/30"
                        title="Resign"
                      >
                        Resign
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Mode B: AI Bot or Pass & Play Profile Body */
                <div className="space-y-2.5">
                  {/* Opponent Info Header with Avatar & Details */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src={
                          gameMode === 'vs-bot'
                            ? botConfig.avatar
                            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
                        }
                        alt="Opponent"
                        className={`w-11 h-11 rounded-lg object-cover border ${
                          isOpponentTurn ? 'border-amber-400/80 shadow-md' : 'border-zinc-800'
                        }`}
                        crossOrigin="anonymous"
                      />
                      {isBotThinking && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0066FF]"></span>
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white font-sans truncate">
                          {gameMode === 'vs-bot' ? botConfig.name : 'Player 2'}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                          {gameMode === 'vs-bot' ? `${botConfig.elo} ELO` : 'Pass & Play'}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-sans truncate mt-0.5">
                        {gameMode === 'vs-bot' ? botConfig.title : 'Local Match'}
                      </p>
                    </div>
                  </div>

                  {/* Real-Time Status / Thinking Alert Banner */}
                  <div
                    className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                      isBotThinking || isBotMoving
                        ? 'bg-[#0066FF]/15 border-[#0066FF]/30 text-[#60a5fa]'
                        : isOpponentTurn
                        ? 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                        : 'bg-zinc-900/80 border-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isBotThinking || isBotMoving ? (
                        <>
                          <BrainCircuit className="w-3.5 h-3.5 text-[#60a5fa] animate-spin shrink-0" />
                          <span className="text-[11px] font-mono font-medium truncate">
                            Analyzing moves...
                          </span>
                        </>
                      ) : isOpponentTurn ? (
                        <>
                          <Swords className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="text-[11px] font-mono font-medium truncate">
                            {gameMode === 'vs-bot' ? "Bot's Turn" : 'Player 2 Turn'}
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-mono truncate">
                          Waiting for your move
                        </span>
                      )}
                    </div>

                    {isInCheck && isOpponentTurn && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase shrink-0">
                        Check
                      </span>
                    )}
                  </div>

                  {/* Captured Pieces by Opponent */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                      <span>CAPTURED PIECES</span>
                      <span className="text-zinc-300 font-semibold font-mono">
                        {piecesCapturedByOpponent.length > 0
                          ? `+${piecesCapturedByOpponent.length}`
                          : 'None'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap min-h-[22px] bg-black/60 rounded-lg px-2.5 py-1.5 border border-zinc-800">
                      {piecesCapturedByOpponent.length === 0 ? (
                        <span className="text-[10px] text-zinc-500 italic font-sans">
                          No pieces captured yet
                        </span>
                      ) : (
                        (['q', 'r', 'b', 'n', 'p'] as PieceType[]).map((piece) => {
                          const count = capturedCounts[piece];
                          if (!count) return null;
                          const glyph =
                            playerSide === 'w' ? PIECE_GLYPHS[piece].w : PIECE_GLYPHS[piece].b;
                          return (
                            <div
                              key={piece}
                              className="flex items-center text-xs text-white bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 shadow-sm"
                              title={`${count}x ${piece.toUpperCase()}`}
                            >
                              <span className="text-sm leading-none">{glyph}</span>
                              {count > 1 && (
                                <span className="text-[9px] font-mono ml-0.5 text-zinc-400 font-semibold">
                                  ×{count}
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer Readout */}
          <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-400 uppercase tracking-wider">
              {gameMode === 'vs-bot'
                ? `BOT (${botDifficulty.toUpperCase()})`
                : gameMode === 'two-player'
                ? 'PASS & PLAY'
                : 'P2P MATCH'}
            </span>
            <span
              className={`font-semibold tracking-wider ${
                isBotThinking || isBotMoving
                  ? 'text-[#60a5fa]'
                  : isOpponentTurn
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {isBotThinking || isBotMoving
                ? 'COMPUTING'
                : isOpponentTurn
                ? 'PLAYING'
                : 'READY'}
            </span>
          </div>
        </div>
      </div>

      {/* Online Incoming Takeback Request Modal Banner */}
      {pendingUndoFromOpponent && onAcceptUndo && onDeclineUndo && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-amber-400/60 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fadeIn">
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-neutral-200 font-medium">
            Opponent requested a move takeback.
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            <button
              type="button"
              onClick={onAcceptUndo}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Check className="w-3 h-3" />
              Accept
            </button>
            <button
              type="button"
              onClick={onDeclineUndo}
              className="px-2.5 py-1 rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Online Incoming Draw Offer Modal Banner */}
      {pendingDrawFromOpponent && onAcceptDraw && onDeclineDraw && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-blue-400/60 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fadeIn">
          <ShieldAlert className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-neutral-200 font-medium">Opponent offered a draw.</span>
          <div className="flex items-center gap-1.5 ml-2">
            <button
              type="button"
              onClick={onAcceptDraw}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Check className="w-3 h-3" />
              Agree
            </button>
            <button
              type="button"
              onClick={onDeclineDraw}
              className="px-2.5 py-1 rounded bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
};
