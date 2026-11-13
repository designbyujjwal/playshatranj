import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Shield,
  Swords,
  Scroll,
  Share2,
} from 'lucide-react';
import type { PieceColor, GameMode, BotDifficulty, ControlMode } from '../types';
import { OnboardingLayout } from './OnboardingLayout';
import { TornOldBookPage } from './TornOldBookPage';
import { WoodcutPawnMark } from './WoodcutPawnMark';
import { WoodcutFormatIcon } from './WoodcutFormatIcon';
import {
  QuillInkEncirclement,
  ImperialPaperSignetSeal,
  QuillFlourishUnderline,
  PaperPigmentWash,
} from './ManuscriptPaperSelection';
import { soundEffects } from '../utils/audio';

/** Design size of the match-setup sheet; it is scaled as one piece to fit the window. */
const MATCH_PAGE_WIDTH = 900;
const MATCH_PAGE_HEIGHT_STANDARD = 660;
const MATCH_PAGE_HEIGHT_ONLINE = 770;

function useMatchPageScale(isOnline: boolean): number {
  const pageHeight = isOnline ? MATCH_PAGE_HEIGHT_ONLINE : MATCH_PAGE_HEIGHT_STANDARD;
  const compute = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const chrome = Math.max(205, Math.min(330, h * 0.185 + 60));
    const byHeight = (h - chrome) / pageHeight;
    const byWidth = (w - 96) / MATCH_PAGE_WIDTH;
    return Math.max(0.48, Math.min(1.4, byHeight, byWidth));
  };
  const [scale, setScale] = useState(compute);
  useEffect(() => {
    const onResize = () => setScale(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOnline]);
  return scale;
}

interface MatchSetupModalProps {
  isOpen: boolean;
  playerName: string;
  initialSide?: PieceColor;
  initialMode?: GameMode;
  initialDifficulty?: BotDifficulty;
  controlMode?: ControlMode;
  onConfirmSetup: (config: {
    side: PieceColor;
    gameMode: GameMode;
    difficulty: BotDifficulty;
    roomId?: string;
  }) => void;
  onBack: () => void;
}

const ADJECTIVES = ['royal', 'clever', 'swift', 'grand', 'valiant', 'noble', 'silent', 'bold', 'zen'];
const PIECES = ['knight', 'bishop', 'rook', 'queen', 'king', 'pawn', 'gambit', 'castle'];

function generateRandomRoomId(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `${adj}-${piece}-${num}`;
}

export const MatchSetupModal: React.FC<MatchSetupModalProps> = ({
  isOpen,
  playerName,
  initialSide = 'w',
  initialMode = 'vs-bot',
  initialDifficulty = 'medium',
  controlMode = 'virtual',
  onConfirmSetup,
  onBack,
}) => {
  const [selectedSide, setSelectedSide] = useState<PieceColor>(initialSide);
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>(initialMode);
  const [selectedDifficulty, setSelectedDifficulty] = useState<BotDifficulty>(
    initialDifficulty === 'master' ? 'hard' : initialDifficulty
  );
  const [roomId] = useState<string>(() => generateRandomRoomId());
  const [copiedLink, setCopiedLink] = useState(false);
  const isOnline = selectedGameMode === 'online';
  const pageScale = useMatchPageScale(isOnline);
  const pageHeight = isOnline ? MATCH_PAGE_HEIGHT_ONLINE : MATCH_PAGE_HEIGHT_STANDARD;

  if (!isOpen) return null;

  const currentOrigin =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '';
  const shareableUrl = `${currentOrigin}?room=${roomId}&hostSide=${selectedSide}&mode=${controlMode}&host=${encodeURIComponent(
    playerName || 'Commander'
  )}`;

  const handleCopyInviteLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareInviteLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Shatranj Imperial Courier Duel Invitation',
          text: `Commander ${playerName || 'Grandmaster'} summons you to a live chess duel in Shatranj!`,
          url: shareableUrl,
        });
        return;
      } catch {
        // user dismissed share dialog
      }
    }
    handleCopyInviteLink(e);
  };

  const handleSelectSide = (side: PieceColor) => {
    soundEffects.playLiftSound();
    setSelectedSide(side);
  };

  const handleSelectGameMode = (mode: GameMode) => {
    soundEffects.playLiftSound();
    setSelectedGameMode(mode);
  };

  const handleSelectDifficulty = (diff: BotDifficulty) => {
    soundEffects.playLiftSound();
    setSelectedDifficulty(diff);
  };

  const handleContinue = () => {
    soundEffects.playMoveSound();
    onConfirmSetup({
      side: selectedSide,
      gameMode: selectedGameMode,
      difficulty: selectedDifficulty,
      roomId: selectedGameMode === 'online' ? roomId : undefined,
    });
  };

  return (
    <OnboardingLayout
      id="match-setup-selection-screen"
      title="Configure Your Match"
      subtitle={`Inscribe your army, combat format, and computational depth, ${playerName}`}
      onBack={onBack}
      ctaLabel="Continue"
      onCtaClick={handleContinue}
      ctaSubtext="You can adjust camera, board angle, or restart anytime during the game"
      contentMaxWidthClass="max-w-none"
    >
      <TornOldBookPage
        id="single-match-setup-page"
        side="left"
        fixed
        scale={pageScale}
        width={MATCH_PAGE_WIDTH}
        height={pageHeight}
        contentPadding="54px 72px 52px"
        contentClassName="overflow-y-auto sm:overflow-hidden"
      >
        {/* 1. Folio Running Header (Antique Book Folio Marker) */}
        <div className="w-full grid grid-cols-3 items-center pb-1.5 border-b border-[#7d481b]/30 text-[8.5px] sm:text-[9.5px] font-cinzel tracking-[0.24em] text-[#5e310e] uppercase font-bold">
          <span className="text-left">FOLIO II</span>
          <span className="text-center opacity-80">&#10022; THE BATTLE DECREE &#10022;</span>
          <span className="text-right">FIELD OF SHATRANJ</span>
        </div>

          {/* ========================================================================= */}
          {/* SECTION 1: CHOOSE YOUR ARMY (Manuscript Columns & Quill Ink Selections)   */}
          {/* ========================================================================= */}
          <section className="mb-2 sm:mb-3">
            <div className="flex items-center justify-between mb-1 px-0.5">
              <span className="font-cinzel text-[10px] sm:text-xs text-[#5e310e] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                <span className="text-[#821e25] font-extrabold">I.</span> CHOOSE YOUR ARMY
              </span>
              <span className="font-cormorant italic text-[11px] sm:text-xs text-[#704218]">
                {selectedSide === 'w'
                  ? 'White holds opening initiative (1. e4 / 1. d4)'
                  : 'Black commands tactical counter-strikes'}
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#7d481b]/20 relative py-0.5 border-y border-[#7d481b]/25">
              {/* White Vanguard Choice (Printed directly into paper fibers) */}
              <div
                id="select-side-white"
                role="button"
                tabIndex={0}
                onClick={() => handleSelectSide('w')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectSide('w');
                  }
                }}
                className="relative p-2 sm:p-2.5 md:p-3 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between select-none group"
              >
                {/* Authentic Stamped Red Wax Seal & Paper Watercolor Wash */}
                {selectedSide === 'w' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform rotate-[4deg]">
                      <ImperialPaperSignetSeal label="DECREED" size="sm" />
                    </div>
                  </>
                )}

                <div className="relative flex items-center gap-2.5 sm:gap-3.5 z-10">
                  {/* 2D White Staunton Pawn with Hand-drawn Quill Encirclement */}
                  <div className="relative shrink-0 flex items-center justify-center p-0.5">
                    {selectedSide === 'w' && (
                      <QuillInkEncirclement variant="oval" className="-inset-2 scale-110" />
                    )}
                    <WoodcutPawnMark color="w" />
                  </div>

                  <div className="pr-2 sm:pr-4">
                    <div
                      className={`font-cinzel text-sm sm:text-base font-bold tracking-wide flex items-center gap-1.5 transition-colors ${
                        selectedSide === 'w'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {selectedSide === 'w' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>White Vanguard</span>
                    </div>

                    {/* Quill flourish underline when selected */}
                    {selectedSide === 'w' && <QuillFlourishUnderline className="mt-0.5" />}

                    <p className="text-[11px] sm:text-xs text-[#5c3010] font-cormorant italic leading-tight mt-0.5">
                      Seize opening tempo and command the center squares.
                    </p>
                    <div className="text-[9px] sm:text-[10px] font-cinzel text-[#821e25] font-semibold tracking-wider uppercase mt-1">
                      Moves First &bull; 1. e4 / 1. d4
                    </div>
                  </div>
                </div>
              </div>

              {/* Black Vanguard Choice (Printed directly into paper fibers) */}
              <div
                id="select-side-black"
                role="button"
                tabIndex={0}
                onClick={() => handleSelectSide('b')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectSide('b');
                  }
                }}
                className="relative p-2 sm:p-2.5 md:p-3 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between select-none group"
              >
                {/* Authentic Stamped Red Wax Seal & Paper Watercolor Wash */}
                {selectedSide === 'b' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform rotate-[4deg]">
                      <ImperialPaperSignetSeal label="DECREED" size="sm" />
                    </div>
                  </>
                )}

                <div className="relative flex items-center gap-2.5 sm:gap-3.5 z-10">
                  {/* 2D Black Staunton Pawn with Hand-drawn Quill Encirclement */}
                  <div className="relative shrink-0 flex items-center justify-center p-0.5">
                    {selectedSide === 'b' && (
                      <QuillInkEncirclement variant="oval" className="-inset-2 scale-110" />
                    )}
                    <WoodcutPawnMark color="b" />
                  </div>

                  <div className="pr-2 sm:pr-4">
                    <div
                      className={`font-cinzel text-sm sm:text-base font-bold tracking-wide flex items-center gap-1.5 transition-colors ${
                        selectedSide === 'b'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {selectedSide === 'b' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Black Vanguard</span>
                    </div>

                    {/* Quill flourish underline when selected */}
                    {selectedSide === 'b' && <QuillFlourishUnderline className="mt-0.5" />}

                    <p className="text-[11px] sm:text-xs text-[#5c3010] font-cormorant italic leading-tight mt-0.5">
                      Defend the throne with tactical counter-gambits.
                    </p>
                    <div className="text-[9px] sm:text-[10px] font-cinzel text-[#821e25] font-semibold tracking-wider uppercase mt-1">
                      Moves Second &bull; Counter-Attacking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: CHOOSE GAME FORMAT (Woodcut Columns & Red Quill Markings)      */}
          {/* ========================================================================= */}
          <section className="mb-2 sm:mb-3">
            <div className="flex items-center justify-between mb-1 px-0.5">
              <span className="font-cinzel text-[10px] sm:text-xs text-[#5e310e] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                <span className="text-[#821e25] font-extrabold">II.</span> CHOOSE GAME FORMAT
              </span>
              <span className="font-cormorant italic text-[11px] sm:text-xs text-[#704218]">
                Select combat doctrine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#7d481b]/20 relative py-0.5 border-y border-[#7d481b]/25">
              {/* Format 1: AI (The Automaton Maester) */}
              <div
                id="select-mode-ai"
                role="button"
                tabIndex={0}
                onClick={() => handleSelectGameMode('vs-bot')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectGameMode('vs-bot');
                  }
                }}
                className="relative p-2 sm:p-2.5 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between select-none group"
              >
                {selectedGameMode === 'vs-bot' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[5deg]">
                      <ImperialPaperSignetSeal label="COMMISSION" size="sm" />
                    </div>
                  </>
                )}

                {/* 16th-Century Woodcut Format Icon with Quill Encirclement */}
                <div className="relative flex items-center justify-center p-0.5 mb-0.5 z-10">
                  {selectedGameMode === 'vs-bot' && (
                    <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                  )}
                  <WoodcutFormatIcon type="ai" />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div
                    className={`font-cinzel text-sm sm:text-base font-bold tracking-wide mt-0.5 flex items-center justify-center gap-1 transition-colors ${
                      selectedGameMode === 'vs-bot'
                        ? 'text-[#821e25]'
                        : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                    }`}
                  >
                    {selectedGameMode === 'vs-bot' && (
                      <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                    )}
                    <span>Automaton Maester</span>
                  </div>

                  {selectedGameMode === 'vs-bot' && (
                    <QuillFlourishUnderline className="mt-0.5 mx-auto" />
                  )}

                  <p className="text-[11px] sm:text-xs text-[#5c3010] font-cormorant italic leading-tight mt-0.5">
                    Face an autonomous clockwork chess engine with real-time positional foresight.
                  </p>

                  <div
                    className={`mt-1.5 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                      selectedGameMode === 'vs-bot' ? 'text-[#821e25]' : 'text-[#693914]'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Solo &bull; AI Engine</span>
                  </div>
                </div>
              </div>

              {/* Format 2: Council Duel (Pass & Play) */}
              <div
                id="select-mode-pass-and-play"
                role="button"
                tabIndex={0}
                onClick={() => handleSelectGameMode('two-player')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectGameMode('two-player');
                  }
                }}
                className="relative p-2 sm:p-2.5 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between select-none group"
              >
                {selectedGameMode === 'two-player' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[5deg]">
                      <ImperialPaperSignetSeal label="COUNCIL" size="sm" />
                    </div>
                  </>
                )}

                {/* 16th-Century Woodcut Format Icon with Quill Encirclement */}
                <div className="relative flex items-center justify-center p-0.5 mb-0.5 z-10">
                  {selectedGameMode === 'two-player' && (
                    <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                  )}
                  <WoodcutFormatIcon type="duel" />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div
                    className={`font-cinzel text-sm sm:text-base font-bold tracking-wide mt-0.5 flex items-center justify-center gap-1 transition-colors ${
                      selectedGameMode === 'two-player'
                        ? 'text-[#821e25]'
                        : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                    }`}
                  >
                    {selectedGameMode === 'two-player' && (
                      <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                    )}
                    <span>Council Duel</span>
                  </div>

                  {selectedGameMode === 'two-player' && (
                    <QuillFlourishUnderline className="mt-0.5 mx-auto" />
                  )}

                  <p className="text-[11px] sm:text-xs text-[#5c3010] font-cormorant italic leading-tight mt-0.5">
                    Two commanders duel on this shared battlefield with alternating turns.
                  </p>

                  <div
                    className={`mt-1.5 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                      selectedGameMode === 'two-player' ? 'text-[#821e25]' : 'text-[#693914]'
                    }`}
                  >
                    <Swords className="w-2.5 h-2.5" />
                    <span>Local &bull; Pass & Play</span>
                  </div>
                </div>
              </div>

              {/* Format 3: Imperial Courier (Invite Friend) */}
              <div
                id="select-mode-invite-friend"
                role="button"
                tabIndex={0}
                onClick={() => handleSelectGameMode('online')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectGameMode('online');
                  }
                }}
                className="relative p-2 sm:p-2.5 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between select-none group"
              >
                {selectedGameMode === 'online' && (
                  <>
                    <PaperPigmentWash />
                    <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[5deg]">
                      <ImperialPaperSignetSeal label="COURIER" size="sm" />
                    </div>
                  </>
                )}

                {/* 16th-Century Woodcut Format Icon with Quill Encirclement */}
                <div className="relative flex items-center justify-center p-0.5 mb-0.5 z-10">
                  {selectedGameMode === 'online' && (
                    <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                  )}
                  <WoodcutFormatIcon type="courier" />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div
                    className={`font-cinzel text-sm sm:text-base font-bold tracking-wide mt-0.5 flex items-center justify-center gap-1 transition-colors ${
                      selectedGameMode === 'online'
                        ? 'text-[#821e25]'
                        : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                    }`}
                  >
                    {selectedGameMode === 'online' && (
                      <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                    )}
                    <span>Imperial Courier</span>
                  </div>

                  {selectedGameMode === 'online' && (
                    <QuillFlourishUnderline className="mt-0.5 mx-auto" />
                  )}

                  <p className="text-[11px] sm:text-xs text-[#5c3010] font-cormorant italic leading-tight mt-0.5">
                    Dispatch an encrypted courier scroll to duel a distant rival with live voice.
                  </p>

                  <div
                    className={`mt-1.5 pt-1 w-full flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                      selectedGameMode === 'online' ? 'text-[#821e25]' : 'text-[#693914]'
                    }`}
                  >
                    <Scroll className="w-2.5 h-2.5" />
                    <span>Online &bull; Peer-to-Peer</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: ENGINE DEPTH / FORMAT CONDITIONS                               */}
          {/* ========================================================================= */}
          {selectedGameMode === 'vs-bot' && (
            <section className="mb-2 sm:mb-2.5">
              <div className="flex items-center justify-between mb-1 px-0.5">
                <span className="font-cinzel text-[10px] sm:text-xs text-[#5e310e] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <span className="text-[#821e25] font-extrabold">III.</span> ENGINE DEPTH
                </span>
                <span className="font-cormorant italic text-[11px] sm:text-xs text-[#704218]">
                  {selectedDifficulty === 'easy'
                    ? 'Apprentice (Casual & Warmup)'
                    : selectedDifficulty === 'medium'
                    ? 'Maester (Tactical Balance)'
                    : 'Grand Archon (Deep Calculation)'}
                </span>
              </div>

              <div className="grid grid-cols-3 divide-x divide-[#7d481b]/20 relative py-0.5 border-y border-[#7d481b]/25">
                {/* Level 1: Apprentice */}
                <div
                  id="difficulty-low"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectDifficulty('easy')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectDifficulty('easy');
                    }
                  }}
                  className="relative p-2 sm:p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {selectedDifficulty === 'easy' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        selectedDifficulty === 'easy'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {selectedDifficulty === 'easy' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Apprentice</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Casual & Warmup
                    </div>
                    <div className="text-[8.5px] sm:text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-0.5">
                      Depth: 1&ndash;2
                    </div>
                  </div>
                </div>

                {/* Level 2: Maester */}
                <div
                  id="difficulty-medium"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectDifficulty('medium')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectDifficulty('medium');
                    }
                  }}
                  className="relative p-2 sm:p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {selectedDifficulty === 'medium' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        selectedDifficulty === 'medium'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {selectedDifficulty === 'medium' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Maester</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Tactical Balance
                    </div>
                    <div className="text-[8.5px] sm:text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-0.5">
                      Depth: 4&ndash;5
                    </div>
                  </div>
                </div>

                {/* Level 3: Grand Archon */}
                <div
                  id="difficulty-hard"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectDifficulty('hard')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectDifficulty('hard');
                    }
                  }}
                  className="relative p-2 sm:p-2.5 text-center transition-all cursor-pointer select-none group"
                >
                  {selectedDifficulty === 'hard' && (
                    <>
                      <PaperPigmentWash />
                      <QuillInkEncirclement variant="oval" className="-inset-1" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                        selectedDifficulty === 'hard'
                          ? 'text-[#821e25]'
                          : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                      }`}
                    >
                      {selectedDifficulty === 'hard' && (
                        <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                      )}
                      <span>Grand Archon</span>
                    </div>
                    <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                      Deep Calculation
                    </div>
                    <div className="text-[8.5px] sm:text-[9px] font-cinzel text-[#821e25] tracking-wider uppercase font-semibold mt-0.5">
                      Depth: 8&ndash;10
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* If Imperial Courier (Online) is selected -> Courier dispatch link */}
          {selectedGameMode === 'online' && (
            <section className="mb-3">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="font-cinzel text-[11px] sm:text-xs text-[#5e310e] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <span className="text-[#821e25] font-extrabold">III.</span> IMPERIAL COURIER DISPATCH LINK
                </span>
                <span className="font-mono text-xs font-bold text-[#821e25] tracking-wider">
                  [{roomId}]
                </span>
              </div>

              <div className="border border-[#7d481b]/35 bg-[#ede3d2]/60 p-2.5 sm:p-3 rounded-sm shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-[#5c3010] font-cinzel mb-1">
                  <span className="flex items-center gap-1 font-bold">
                    <Scroll className="w-3.5 h-3.5 text-[#821e25]" />
                    Scroll Messenger Link (Deliver to Comrade)
                  </span>
                  <span className="text-[#821e25] uppercase tracking-widest text-[9px] font-bold">
                    Room: {roomId}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    className="w-full bg-[#f4ece1] border border-[#7d481b]/35 px-3 py-1.5 text-xs text-[#2a1306] font-mono select-all focus:outline-none rounded-sm"
                  />
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyInviteLink}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#220e05] hover:bg-[#341609] border border-[#8a5d24] text-xs text-[#faeed2] font-cinzel tracking-wider uppercase transition-all cursor-pointer shrink-0 shadow-xs"
                      title="Copy Courier Link"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleShareInviteLink}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#821e25] hover:bg-[#6b161c] border border-[#4a0d10] text-xs text-[#f7efe4] font-cinzel tracking-wider uppercase transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                      title="Send Link or Share Invitation"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#f7efe4]" />
                      <span>Send Link</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#5c3010] font-cormorant italic mt-1.5">
                  Share this secret courier link with your rival commander to duel across the realm with peer-to-peer audio &amp; video.
                </p>
              </div>
            </section>
          )}

          {/* If Council Duel (Pass & Play) is selected -> War Council briefing */}
          {selectedGameMode === 'two-player' && (
            <section className="mb-3">
              <div className="flex items-center justify-between mb-2 px-0.5">
                <span className="font-cinzel text-[11px] sm:text-xs text-[#5e310e] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <span className="text-[#821e25] font-extrabold">III.</span> WAR COUNCIL PROTOCOL
                </span>
              </div>

              <div className="border-y border-[#7d481b]/30 py-2.5 px-2 bg-transparent text-center font-cormorant text-xs sm:text-sm text-[#2c1406] italic leading-relaxed">
                <p>
                  Both commanders share this single royal console. The battlefield alternates smoothly between White Vanguard and Black Vanguard turns.
                </p>
              </div>
            </section>
          )}

          {/* 4. Bottom Manuscript Margin Marker - Centered */}
          <div className="w-full pt-2 mt-2 border-t border-[#7d481b]/25 grid grid-cols-3 items-center text-[8px] sm:text-[9px] font-cinzel text-[#633510] tracking-widest uppercase opacity-75">
            <span className="text-left">BOOK OF SHATRANJ</span>
            <span className="text-center">&mdash; 2 &mdash;</span>
            <span className="text-right">COMMISSION OF WAR</span>
          </div>
        </TornOldBookPage>
      </OnboardingLayout>
    );
  };
