import React from 'react';
import {
  X,
  RotateCcw,
  HelpCircle,
  LogOut,
  Sparkles,
  Swords,
  Scroll,
  MousePointer,
  Hand,
  Mic,
  RotateCw,
} from 'lucide-react';
import type { GameMode, BotDifficulty, CameraPreset, PieceColor, ControlMode } from '../types';
import { FlowingPaper, CommanderPortrait } from './FlowingPaper';
import { CourierDispatchBody } from './MultiplayerModal';
import { WoodcutFormatIcon } from './WoodcutFormatIcon';
import { WoodcutControlIcon } from './WoodcutControlIcon';
import {
  QuillInkEncirclement,
  ImperialPaperSignetSeal,
  QuillFlourishUnderline,
  PaperPigmentWash,
} from './ManuscriptPaperSelection';

interface CommanderProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName?: string;
  playerColor?: PieceColor;
  gameMode: GameMode;
  onSetGameMode: (mode: GameMode) => void;
  botDifficulty: BotDifficulty;
  onSetBotDifficulty: (diff: BotDifficulty) => void;
  cameraPreset: CameraPreset;
  onSetCameraPreset: (preset: CameraPreset) => void;
  autoRotatePassAndPlay?: boolean;
  onToggleAutoRotatePassAndPlay?: () => void;
  controlMode?: ControlMode;
  onSetControlMode?: (mode: ControlMode) => void;
  onOpenMultiplayer?: () => void;
  onStartOnlineMatch?: (
    roomId: string,
    playerName: string,
    preferredSide: 'w' | 'b' | 'random',
    controlMode?: ControlMode
  ) => void;
  onResetGame: () => void;
  onOpenHowToPlay: () => void;
  onSignOut?: () => void;
}

export const CommanderProfileModal: React.FC<CommanderProfileModalProps> = ({
  isOpen,
  onClose,
  playerName = 'Grandmaster',
  playerColor = 'w',
  gameMode,
  onSetGameMode,
  botDifficulty,
  onSetBotDifficulty,
  cameraPreset,
  onSetCameraPreset,
  autoRotatePassAndPlay = true,
  onToggleAutoRotatePassAndPlay,
  controlMode = 'mouse',
  onSetControlMode,
  onOpenMultiplayer,
  onStartOnlineMatch,
  onResetGame,
  onOpenHowToPlay,
  onSignOut,
}) => {
  const [courier, setCourier] = React.useState(false);
  const selMode: GameMode = courier ? 'online' : gameMode;

  if (!isOpen) return null;

  return (
    <div
      id="commander-profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      {/* Click-through containment */}
      <div
        className="w-full max-w-3xl my-auto py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <FlowingPaper id="commander-profile-codex">
          {/* ========================================================================= */}
          {/* 1. FOLIO RUNNING HEADER (3-Column Lead Marker with Close Button)          */}
          {/* ========================================================================= */}
          <div className="w-full grid grid-cols-3 items-center pb-2 border-b border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.24em] text-[#5e310e] uppercase font-bold">
            <span className="text-left">FOLIO III</span>
            <span className="text-center opacity-80">&#10022; IMPERIAL DOSSIER &#10022;</span>
            <div className="flex items-center justify-end gap-2">
              <span className="hidden sm:inline">FIELD OF SHATRANJ</span>
              <button
                type="button"
                id="close-profile-modal"
                onClick={onClose}
                className="p-1 rounded-full border border-[#7d481b]/35 hover:border-[#821e25] text-[#7d481b] hover:text-[#821e25] hover:bg-[#821e25]/[0.06] transition-colors cursor-pointer"
                title="Seal and Close Folio"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. CHAPTER TITLE & SUBTITLE                                               */}
          {/* ========================================================================= */}
          <div className="text-center px-1 mt-2 mb-3 sm:mb-4">
            <span className="font-cinzel text-[#821e25] text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase block mb-0.5">
              &mdash; CHAPTER III &mdash;
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl text-[#1f0d04] font-extrabold tracking-wide uppercase">
              Commander &amp; Battle Protocols
            </h3>
            <p className="font-cormorant italic text-xs sm:text-sm text-[#5c3010] mt-0.5">
              Inscribe your combat orders, engine depth, and sensory controls, {playerName}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 3. PLAYER IDENTITY VIGNETTE (Archival Medallion on Parchment)            */}
          {/* ========================================================================= */}
          <div className="relative border-y border-[#7d481b]/25 py-2.5 sm:py-3 mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3 bg-[#7d481b]/[0.02]">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Antique Engraved Portrait Frame */}
              <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md">
                <CommanderPortrait color={playerColor} className="w-full h-full rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#821e25] border border-[#f4ece1] flex items-center justify-center text-[8px] text-[#f4ece1] font-serif font-bold">
                  &#9670;
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#1f0d04] tracking-wide">
                    {playerName}
                  </h4>
                  <span className="text-[10px] font-cinzel text-[#821e25] font-semibold tracking-wider uppercase px-1.5 py-0.5 border border-[#821e25]/30 bg-[#821e25]/[0.05]">
                    Grandmaster
                  </span>
                </div>
                <p className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010] mt-0.5">
                  Sworn to the {playerColor === 'w' ? 'White Vanguard' : 'Black Vanguard'} &bull;{' '}
                  {playerColor === 'w' ? 'Opening Initiative (1. e4)' : 'Tactical Counter-Gambit'}
                </p>
                <div className="text-[10px] font-cinzel text-[#7d481b]/80 uppercase tracking-widest mt-0.5">
                  Royal Shatranj Registry &bull; Verified Commander
                </div>
              </div>
            </div>

            {/* Right: Authentic Imperial Signet Stamp */}
            <div className="hidden sm:flex items-center pr-2">
              <ImperialPaperSignetSeal
                label={playerColor === 'w' ? 'WHITE' : 'BLACK'}
                size="sm"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION I: MATCH MODE (Woodcut Columns & Quill Ink Selections)            */}
          {/* ========================================================================= */}
          <section className="mb-4 sm:mb-5">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                I. Combat Doctrine
              </span>
              <span className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010]">
                Select combat format
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#7d481b]/20 relative py-1 border-y border-[#7d481b]/25">
              {/* 1. Automaton Maester (AI) */}
              <div
                id="profile-mode-ai"
                role="button"
                tabIndex={0}
                onClick={() => { setCourier(false); onSetGameMode('vs-bot'); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCourier(false);
                    onSetGameMode('vs-bot');
                  }
                }}
                className="relative p-2.5 sm:p-3 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between select-none group"
              >
                {selMode === 'vs-bot' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[5deg]">
                      <ImperialPaperSignetSeal label="COMMISSION" size="sm" />
                    </div>
                  </>
                )}

                <div className="relative flex items-center justify-center p-1 mb-1 z-10">
                  {selMode === 'vs-bot' && (
                    <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                  )}
                  <WoodcutFormatIcon type="ai" />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div
                    className={`font-cinzel text-sm sm:text-base font-bold tracking-wide mt-1 flex items-center justify-center gap-1 transition-colors ${
                      selMode === 'vs-bot'
                        ? 'text-[#821e25]'
                        : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                    }`}
                  >
                    {selMode === 'vs-bot' && (
                      <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                    )}
                    <span>Automaton Maester</span>
                  </div>

                  {selMode === 'vs-bot' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}

                  <p className="text-xs text-[#5c3010] font-cormorant italic leading-snug mt-1">
                    Face an autonomous clockwork chess engine with real-time positional foresight.
                  </p>

                  <div
                    className={`mt-2 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                      selMode === 'vs-bot' ? 'text-[#821e25]' : 'text-[#693914]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Solo &bull; AI Engine</span>
                  </div>
                </div>
              </div>

              {/* 2. Council Duel (Pass & Play) */}
              <div
                id="profile-mode-duel"
                role="button"
                tabIndex={0}
                onClick={() => { setCourier(false); onSetGameMode('two-player'); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCourier(false);
                    onSetGameMode('two-player');
                  }
                }}
                className="relative p-2.5 sm:p-3 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between select-none group"
              >
                {selMode === 'two-player' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[5deg]">
                      <ImperialPaperSignetSeal label="COUNCIL" size="sm" />
                    </div>
                  </>
                )}

                <div className="relative flex items-center justify-center p-1 mb-1 z-10">
                  {selMode === 'two-player' && (
                    <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                  )}
                  <WoodcutFormatIcon type="duel" />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div
                    className={`font-cinzel text-sm sm:text-base font-bold tracking-wide mt-1 flex items-center justify-center gap-1 transition-colors ${
                      selMode === 'two-player'
                        ? 'text-[#821e25]'
                        : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                    }`}
                  >
                    {selMode === 'two-player' && (
                      <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                    )}
                    <span>Council Duel</span>
                  </div>

                  {selMode === 'two-player' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}

                  <p className="text-xs text-[#5c3010] font-cormorant italic leading-snug mt-1">
                    Two commanders duel on this shared battlefield with alternating turns.
                  </p>

                  <div
                    className={`mt-2 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                      selMode === 'two-player' ? 'text-[#821e25]' : 'text-[#693914]'
                    }`}
                  >
                    <Swords className="w-3 h-3" />
                    <span>Local &bull; Pass &amp; Play</span>
                  </div>
                </div>
              </div>

              {/* 3. Imperial Courier (Online) */}
              <div
                id="profile-mode-courier"
                role="button"
                tabIndex={0}
                onClick={() => setCourier(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCourier(true);
                  }
                }}
                className="relative p-2.5 sm:p-3 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between select-none group"
              >
                {selMode === 'online' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[5deg]">
                      <ImperialPaperSignetSeal label="COURIER" size="sm" />
                    </div>
                  </>
                )}

                <div className="relative flex items-center justify-center p-1 mb-1 z-10">
                  {selMode === 'online' && (
                    <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                  )}
                  <WoodcutFormatIcon type="courier" />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div
                    className={`font-cinzel text-sm sm:text-base font-bold tracking-wide mt-1 flex items-center justify-center gap-1 transition-colors ${
                      selMode === 'online'
                        ? 'text-[#821e25]'
                        : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                    }`}
                  >
                    {selMode === 'online' && (
                      <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                    )}
                    <span>Imperial Courier</span>
                  </div>

                  {selMode === 'online' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}

                  <p className="text-xs text-[#5c3010] font-cormorant italic leading-snug mt-1">
                    Dispatch an encrypted courier scroll to duel a distant rival with live voice.
                  </p>

                  <div
                    className={`mt-2 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                      selMode === 'online' ? 'text-[#821e25]' : 'text-[#693914]'
                    }`}
                  >
                    <Scroll className="w-3 h-3" />
                    <span>Online &bull; Peer-to-Peer</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {courier && onStartOnlineMatch && (
            <div className="mb-5"><CourierDispatchBody
              onStartOnlineMatch={onStartOnlineMatch}
              onDone={onClose}
              controlMode={controlMode}
              defaultName={playerName}
              numerals={['II', 'III', 'IV']}
            /></div>
          )}

          {selMode === 'vs-bot' && (
            <section className="mb-4 sm:mb-5">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                  II. Automaton Mastery
                </span>
                <span className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010]">
                  {botDifficulty === 'easy'
                    ? 'Apprentice (Casual & Warmup)'
                    : botDifficulty === 'medium'
                    ? 'Maester (Tactical Balance)'
                    : botDifficulty === 'hard'
                    ? 'Grand Archon (Deep Calculation)'
                    : 'Sovereign (Imperious Foresight)'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#7d481b]/20 relative py-1 border-y border-[#7d481b]/25">
                {/* 1. Apprentice */}
                <div
                  id="profile-difficulty-easy"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetBotDifficulty('easy')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetBotDifficulty('easy');
                    }
                  }}
                  className="relative p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {botDifficulty === 'easy' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        botDifficulty === 'easy'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {botDifficulty === 'easy' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Apprentice</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Casual &amp; Warmup
                    </div>
                    <div className="text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-1">
                      Depth: 1&ndash;2
                    </div>
                  </div>
                </div>

                {/* 2. Maester */}
                <div
                  id="profile-difficulty-medium"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetBotDifficulty('medium')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetBotDifficulty('medium');
                    }
                  }}
                  className="relative p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {botDifficulty === 'medium' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        botDifficulty === 'medium'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {botDifficulty === 'medium' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Maester</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Tactical Balance
                    </div>
                    <div className="text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-1">
                      Depth: 4&ndash;5
                    </div>
                  </div>
                </div>

                {/* 3. Grand Archon */}
                <div
                  id="profile-difficulty-hard"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetBotDifficulty('hard')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetBotDifficulty('hard');
                    }
                  }}
                  className="relative p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {botDifficulty === 'hard' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        botDifficulty === 'hard'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {botDifficulty === 'hard' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Grand Archon</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Deep Calculation
                    </div>
                    <div className="text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-1">
                      Depth: 8&ndash;10
                    </div>
                  </div>
                </div>

                {/* 4. Sovereign Master */}
                <div
                  id="profile-difficulty-master"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetBotDifficulty('master')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetBotDifficulty('master');
                    }
                  }}
                  className="relative p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {botDifficulty === 'master' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        botDifficulty === 'master'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {botDifficulty === 'master' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Sovereign</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Imperious Foresight
                    </div>
                    <div className="text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-1">
                      Depth: 12+
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* SECTION III: CAMERA PERSPECTIVE (Battlefield Perspective)                 */}
          {/* ========================================================================= */}
          <section className="mb-4 sm:mb-5">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                {selMode === 'vs-bot' ? 'III.' : selMode === 'online' ? 'V.' : 'II.'} Battlefield Perspective
              </span>
              <span className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010]">
                Command orientation
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#7d481b]/20 relative py-1 border-y border-[#7d481b]/25">
              {[
                { id: 'white', label: 'White Front', desc: 'Vanguard View' },
                { id: 'black', label: 'Black Front', desc: 'Rearguard View' },
                { id: 'isometric', label: 'Isometric', desc: 'Cartographic 3D' },
                { id: 'overhead', label: 'Overhead', desc: 'Topographical 2D' },
              ].map((preset) => (
                <div
                  key={preset.id}
                  id={`profile-camera-${preset.id}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetCameraPreset(preset.id as CameraPreset)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetCameraPreset(preset.id as CameraPreset);
                    }
                  }}
                  className="relative p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {cameraPreset === preset.id && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        cameraPreset === preset.id
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {cameraPreset === preset.id && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>{preset.label}</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      {preset.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pass & Play Camera Auto-Rotate Setting */}
            {selMode === 'two-player' && onToggleAutoRotatePassAndPlay && (
              <div className="mt-2.5 p-2 sm:p-2.5 bg-[#f4ece1]/70 rounded-lg border border-[#7d481b]/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-[#821e25]/10 text-[#821e25]">
                    <RotateCw className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="font-cinzel text-xs font-bold text-[#1f0d04] flex items-center gap-1.5">
                      <span>Council Duel Auto-Switch</span>
                      <span className="text-[10px] font-cinzel text-[#821e25] bg-[#821e25]/10 px-1.5 py-0.2 rounded border border-[#821e25]/20 font-semibold">
                        180&deg; Orbit
                      </span>
                    </div>
                    <p className="font-cormorant italic text-[11px] text-[#5c3010] leading-tight">
                      Camera smoothly swings around to show Black / White side on each turn
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleAutoRotatePassAndPlay}
                  className={`px-3 py-1 rounded text-xs font-cinzel font-bold border transition-all cursor-pointer shrink-0 ${
                    autoRotatePassAndPlay
                      ? 'bg-[#821e25] text-[#fff6e3] border-[#821e25] shadow-xs'
                      : 'bg-[#ede3d2] text-[#7d481b] border-[#7d481b]/35 hover:border-[#7d481b]/60'
                  }`}
                >
                  {autoRotatePassAndPlay ? 'Active' : 'Fixed'}
                </button>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* SECTION IV: INPUT METHOD (Method of Command)                              */}
          {/* ========================================================================= */}
          {onSetControlMode && (
            <section className="mb-4 sm:mb-5">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                  {selMode === 'vs-bot' ? 'IV.' : selMode === 'online' ? 'VI.' : 'III.'} Method of Command
                </span>
                <span className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010]">
                  Tactical interface
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#7d481b]/20 relative py-1 border-y border-[#7d481b]/25">
                {/* 1. Mouse / Pointer */}
                <div
                  id="profile-control-mouse"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetControlMode('mouse')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetControlMode('mouse');
                    }
                  }}
                  className="relative p-2.5 sm:p-3 text-center transition-all cursor-pointer select-none group flex flex-col items-center justify-between"
                >
                  {controlMode === 'mouse' && (
                    <>
                      <PaperPigmentWash />
                      <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[4deg]">
                        <ImperialPaperSignetSeal label="DIRECTED" size="sm" />
                      </div>
                    </>
                  )}

                  <div className="relative flex items-center justify-center p-1 mb-1 z-10">
                    {controlMode === 'mouse' && (
                      <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                    )}
                    <WoodcutControlIcon type="mouse" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center w-full">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        controlMode === 'mouse'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {controlMode === 'mouse' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Quill &amp; Pointer</span>
                    </div>

                    {controlMode === 'mouse' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}

                    <p className="text-xs text-[#5c3010] font-cormorant italic leading-snug mt-1">
                      Traditional tactile cursor with standard click and drag.
                    </p>

                    <div
                      className={`mt-1.5 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                        controlMode === 'mouse' ? 'text-[#821e25]' : 'text-[#693914]'
                      }`}
                    >
                      <MousePointer className="w-3 h-3" />
                      <span>Mouse &bull; Click &amp; Drag</span>
                    </div>
                  </div>
                </div>

                {/* 2. Hand Gestures (MediaPipe) */}
                <div
                  id="profile-control-virtual"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetControlMode('virtual')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetControlMode('virtual');
                    }
                  }}
                  className="relative p-2.5 sm:p-3 text-center transition-all cursor-pointer select-none group flex flex-col items-center justify-between"
                >
                  {controlMode === 'virtual' && (
                    <>
                      <PaperPigmentWash />
                      <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[4deg]">
                        <ImperialPaperSignetSeal label="DIRECTED" size="sm" />
                      </div>
                    </>
                  )}

                  <div className="relative flex items-center justify-center p-1 mb-1 z-10">
                    {controlMode === 'virtual' && (
                      <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                    )}
                    <WoodcutControlIcon type="virtual" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center w-full">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        controlMode === 'virtual'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {controlMode === 'virtual' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Spatial Gestures</span>
                    </div>

                    {controlMode === 'virtual' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}

                    <p className="text-xs text-[#5c3010] font-cormorant italic leading-snug mt-1">
                      MediaPipe spatial pinch and mid-air tactile movement.
                    </p>

                    <div
                      className={`mt-1.5 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                        controlMode === 'virtual' ? 'text-[#821e25]' : 'text-[#693914]'
                      }`}
                    >
                      <Hand className="w-3 h-3" />
                      <span>Vision &bull; Air Pinch</span>
                    </div>
                  </div>
                </div>

                {/* 3. Voice Control */}
                <div
                  id="profile-control-voice"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSetControlMode('voice')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSetControlMode('voice');
                    }
                  }}
                  className="relative p-2.5 sm:p-3 text-center transition-all cursor-pointer select-none group flex flex-col items-center justify-between"
                >
                  {controlMode === 'voice' && (
                    <>
                      <PaperPigmentWash />
                      <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[4deg]">
                        <ImperialPaperSignetSeal label="DIRECTED" size="sm" />
                      </div>
                    </>
                  )}

                  <div className="relative flex items-center justify-center p-1 mb-1 z-10">
                    {controlMode === 'voice' && (
                      <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                    )}
                    <WoodcutControlIcon type="voice" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center w-full">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        controlMode === 'voice'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {controlMode === 'voice' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Verbal Incantation</span>
                    </div>

                    {controlMode === 'voice' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}

                    <p className="text-xs text-[#5c3010] font-cormorant italic leading-snug mt-1">
                      Acoustic speech recognition (&quot;Knight to F3&quot;).
                    </p>

                    <div
                      className={`mt-1.5 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                        controlMode === 'voice' ? 'text-[#821e25]' : 'text-[#693914]'
                      }`}
                    >
                      <Mic className="w-3 h-3" />
                      <span>Speech &bull; Voice Codex</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 4. RUNNING FOLIO FOOTER & QUICK ACTIONS                                   */}
          {/* ========================================================================= */}
          <div className="w-full grid grid-cols-3 items-center pt-2 pb-1 border-t border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.24em] text-[#5e310e]/75 uppercase font-bold mt-2">
            <span className="text-left">BOOK OF SHATRANJ</span>
            <span className="text-center opacity-80">&mdash; III &mdash;</span>
            <span className="text-right">COMMISSION OF PROTOCOLS</span>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: Restart Match Button */}
            <button
              type="button"
              id="profile-restart-match"
              onClick={() => {
                onResetGame();
                onClose();
              }}
              className="px-3.5 sm:px-4 py-2 border border-[#7d481b]/35 hover:border-[#821e25] text-[#4a220b] hover:text-[#821e25] hover:bg-[#821e25]/[0.04] font-cinzel text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer rounded-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Match</span>
            </button>

            {/* Right: Rules Guide & Sign Out */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="profile-rules-guide"
                onClick={() => {
                  onClose();
                  onOpenHowToPlay();
                }}
                className="px-3 sm:px-3.5 py-2 border border-[#7d481b]/30 hover:border-[#7d481b]/60 text-[#5c3010] hover:text-[#1f0d04] hover:bg-[#7d481b]/[0.03] font-cinzel text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer rounded-sm"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Rules Guide</span>
              </button>

              {onSignOut && (
                <button
                  type="button"
                  id="profile-modal-sign-out"
                  onClick={() => {
                    onClose();
                    onSignOut();
                  }}
                  className="px-3.5 sm:px-4 py-2 bg-[#821e25] hover:bg-[#6b161c] active:bg-[#521014] text-[#f7efe4] font-cinzel text-xs uppercase tracking-widest font-bold border border-[#4a0d10] shadow-[0_2px_8px_rgba(130,30,37,0.3)] flex items-center gap-1.5 transition-all cursor-pointer rounded-sm"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#f7efe4]" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </FlowingPaper>
      </div>
    </div>
  );
};
