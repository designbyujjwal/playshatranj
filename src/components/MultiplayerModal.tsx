import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  X,
  Shield,
  Scroll,
  KeyRound,
  Crown,
  Share2,
} from 'lucide-react';
import { FlowingPaper } from './FlowingPaper';
import { WoodcutFormatIcon } from './WoodcutFormatIcon';
import { WoodcutPawnMark } from './WoodcutPawnMark';
import {
  QuillInkEncirclement,
  ImperialPaperSignetSeal,
  QuillFlourishUnderline,
  PaperPigmentWash,
} from './ManuscriptPaperSelection';
import type { ControlMode } from '../types';

interface MultiplayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnlineMatch: (
    roomId: string,
    playerName: string,
    preferredSide: 'w' | 'b' | 'random',
    controlMode?: ControlMode
  ) => void;
  initialRoomId?: string | null;
  controlMode?: ControlMode;
}

const ADJECTIVES = ['royal', 'clever', 'swift', 'grand', 'valiant', 'noble', 'silent', 'bold', 'zen'];
const PIECES = ['knight', 'bishop', 'rook', 'queen', 'king', 'pawn', 'gambit', 'castle'];

function generateRandomRoomId(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `${adj}-${piece}-${num}`;
}

/**
 * 16th-Century Woodcut Astrolabe / Providence Mark for "Random" Allegiance
 */
const WoodcutProvidenceMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 120"
        className="w-14 h-16 sm:w-16 sm:h-20 overflow-visible text-[#3d1d07]"
        style={{ mixBlendMode: 'multiply' }}
      >
        <circle
          cx="50"
          cy="60"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="4,2,8,2"
          opacity="0.8"
        />
        <circle
          cx="50"
          cy="60"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.6"
        />
        {/* Eight-Point Astrological Compass Rose */}
        <g stroke="currentColor" strokeWidth="1.2" opacity="0.85" fill="none">
          <line x1="50" y1="22" x2="50" y2="98" />
          <line x1="12" y1="60" x2="88" y2="60" />
          <line x1="23" y1="33" x2="77" y2="87" strokeDasharray="2,2" />
          <line x1="77" y1="33" x2="23" y2="87" strokeDasharray="2,2" />
        </g>
        {/* Center Providence Sunburst */}
        <circle cx="50" cy="60" r="12" fill="#f4ece1" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="50" cy="60" r="4" fill="#821e25" />
        <g stroke="#821e25" strokeWidth="1" strokeLinecap="round">
          <line x1="50" y1="42" x2="50" y2="45" />
          <line x1="50" y1="75" x2="50" y2="78" />
          <line x1="32" y1="60" x2="35" y2="60" />
          <line x1="65" y1="60" x2="68" y2="60" />
        </g>
      </svg>
    </div>
  );
};

export interface CourierDispatchBodyProps {
  onStartOnlineMatch: MultiplayerModalProps['onStartOnlineMatch'];
  onDone?: () => void;
  initialRoomId?: string | null;
  controlMode?: ControlMode;
  defaultName?: string;
  /** Roman numeral labels for the three sections. */
  numerals?: [string, string, string];
}

/** The invite-link flow: name, side, shareable link, dispatch button. */
export const CourierDispatchBody: React.FC<CourierDispatchBodyProps> = ({
  onStartOnlineMatch,
  onDone,
  initialRoomId,
  controlMode = 'virtual',
  defaultName = 'Grandmaster',
  numerals = ['I', 'II', 'III'],
}) => {
  const [createdRoomId] = useState<string>(() => initialRoomId || generateRandomRoomId());
  const [playerName, setPlayerName] = useState<string>(defaultName);
  const [preferredSide, setPreferredSide] = useState<'w' | 'b' | 'random'>('random');
  const [copied, setCopied] = useState(false);

  const currentOrigin = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const shareableUrl = `${currentOrigin}?room=${createdRoomId}&hostSide=${preferredSide === 'random' ? 'w' : preferredSide}&mode=${controlMode}&host=${encodeURIComponent(
    playerName || 'Commander'
  )}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Shatranj Imperial Courier Duel',
          text: `Commander ${playerName || 'Grandmaster'} has dispatched an imperial summons to duel in Shatranj!`,
          url: shareableUrl,
        });
        return;
      } catch {
        // User dismissed share dialog
      }
    }
    handleCopyLink();
  };

  const handleCreateAndPlay = () => {
    onStartOnlineMatch(createdRoomId, playerName.trim() || 'Grandmaster', preferredSide, controlMode);
    onDone?.();
  };

  return (
    <>
          {/* ========================================================================= */}
          {/* SECTION II: COMMANDER INSCRIPTION (Player Name)                           */}
          {/* ========================================================================= */}
          <section className="mb-4">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                {numerals[0]}. Commander Inscription
              </span>
              <span className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010]">
                Name on the battlefield scroll
              </span>
            </div>

            <div className="relative border-y border-[#7d481b]/25 py-2 px-3 bg-[#7d481b]/[0.02]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label
                  htmlFor="multiplayer-player-name"
                  className="font-cinzel text-xs font-bold text-[#3d1d07] tracking-wider uppercase shrink-0"
                >
                  Commander Title:
                </label>
                <div className="relative flex-1">
                  <input
                    id="multiplayer-player-name"
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="e.g. Magnus, Grand Archon, Commander..."
                    className="w-full px-3 py-1.5 rounded-sm bg-[#ede3d2]/70 border border-[#7d481b]/35 hover:border-[#7d481b]/60 focus:border-[#821e25] text-[#1f0d04] placeholder-[#8c6b4f]/70 font-cinzel text-sm focus:outline-none focus:ring-1 focus:ring-[#821e25]/50 transition-all"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7d481b]/40 pointer-events-none text-xs font-serif">
                    &#9998;
                  </div>
                </div>
              </div>
            </div>
          </section>

              {/* ===================================================================== */}
              {/* SECTION III: CHOOSE YOUR PIECES (Allegiance)                          */}
              {/* ===================================================================== */}
              <section className="mb-4">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                    {numerals[1]}. Allegiance of Forces
                  </span>
                  <span className="font-cormorant italic text-xs sm:text-[13px] text-[#5c3010]">
                    {preferredSide === 'w'
                      ? 'White Vanguard (Moves First)'
                      : preferredSide === 'b'
                      ? 'Black Vanguard (Counter-Gambit)'
                      : 'Imperial Providence (Cast Lots)'}
                  </span>
                </div>

                <div className="grid grid-cols-3 divide-x divide-[#7d481b]/20 relative py-1 border-y border-[#7d481b]/25">
                  {/* 1. White Vanguard */}
                  <div
                    id="multiplayer-side-white"
                    role="button"
                    tabIndex={0}
                    onClick={() => setPreferredSide('w')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPreferredSide('w');
                      }
                    }}
                    className="relative p-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between select-none group"
                  >
                    {preferredSide === 'w' && (
                      <>
                        <PaperPigmentWash />
                        <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[4deg]">
                          <ImperialPaperSignetSeal label="WHITE" size="sm" />
                        </div>
                      </>
                    )}

                    <div className="relative flex items-center justify-center p-1 z-10">
                      {preferredSide === 'w' && (
                        <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                      )}
                      <WoodcutPawnMark color="w" className="scale-90" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full mt-1">
                      <div
                        className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                          preferredSide === 'w'
                            ? 'text-[#821e25]'
                            : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                        }`}
                      >
                        {preferredSide === 'w' && (
                          <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                        )}
                        <span>White Vanguard</span>
                      </div>
                      {preferredSide === 'w' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}
                      <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                        Moves First &bull; 1. e4
                      </div>
                    </div>
                  </div>

                  {/* 2. Random / Providence */}
                  <div
                    id="multiplayer-side-random"
                    role="button"
                    tabIndex={0}
                    onClick={() => setPreferredSide('random')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPreferredSide('random');
                      }
                    }}
                    className="relative p-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between select-none group"
                  >
                    {preferredSide === 'random' && (
                      <>
                        <PaperPigmentWash />
                        <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[4deg]">
                          <ImperialPaperSignetSeal label="LOTS" size="sm" />
                        </div>
                      </>
                    )}

                    <div className="relative flex items-center justify-center p-1 z-10">
                      {preferredSide === 'random' && (
                        <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                      )}
                      <WoodcutProvidenceMark />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full mt-1">
                      <div
                        className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                          preferredSide === 'random'
                            ? 'text-[#821e25]'
                            : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                        }`}
                      >
                        {preferredSide === 'random' && (
                          <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                        )}
                        <span>Providence</span>
                      </div>
                      {preferredSide === 'random' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}
                      <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                        Cast Lots &bull; Unbiased
                      </div>
                    </div>
                  </div>

                  {/* 3. Black Vanguard */}
                  <div
                    id="multiplayer-side-black"
                    role="button"
                    tabIndex={0}
                    onClick={() => setPreferredSide('b')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPreferredSide('b');
                      }
                    }}
                    className="relative p-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between select-none group"
                  >
                    {preferredSide === 'b' && (
                      <>
                        <PaperPigmentWash />
                        <div className="absolute top-1 right-2 pointer-events-none transform -rotate-[4deg]">
                          <ImperialPaperSignetSeal label="BLACK" size="sm" />
                        </div>
                      </>
                    )}

                    <div className="relative flex items-center justify-center p-1 z-10">
                      {preferredSide === 'b' && (
                        <QuillInkEncirclement variant="compact" className="-inset-2 scale-105" />
                      )}
                      <WoodcutPawnMark color="b" className="scale-90" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full mt-1">
                      <div
                        className={`font-cinzel text-xs sm:text-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                          preferredSide === 'b'
                            ? 'text-[#821e25]'
                            : 'text-[#1f0d04] group-hover:text-[#4a220b]'
                        }`}
                      >
                        {preferredSide === 'b' && (
                          <span className="text-[#821e25] text-xs font-serif">&#9670;</span>
                        )}
                        <span>Black Vanguard</span>
                      </div>
                      {preferredSide === 'b' && <QuillFlourishUnderline className="mt-0.5 mx-auto" />}
                      <div className="text-[10px] text-[#5c3010] font-cormorant italic mt-0.5">
                        Counter-Gambit &bull; Second
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===================================================================== */}
              {/* SECTION IV: COURIER SCROLL DISPATCH LINK                              */}
              {/* ===================================================================== */}
              <section className="mb-4">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-[#7d481b] uppercase">
                    {numerals[2]}. Courier Scroll Dispatch
                  </span>
                  <span className="font-mono text-xs font-bold text-[#821e25] tracking-wider">
                    {createdRoomId}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 bg-[#ede3d2]/70 border border-[#7d481b]/35 rounded-sm">
                  <div className="flex items-center justify-between text-[11px] text-[#5c3010] font-cinzel mb-1.5">
                    <span className="flex items-center gap-1 font-bold">
                      <Scroll className="w-3.5 h-3.5 text-[#821e25]" />
                      Scroll Messenger Link (Deliver to Comrade)
                    </span>
                    <span className="text-[#7d481b]/80 uppercase tracking-widest text-[9px]">
                      Royal Courier Token
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareableUrl}
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="w-full bg-[#f4ece1] border border-[#7d481b]/30 px-2.5 py-1.5 text-xs text-[#2a1306] font-mono select-all focus:outline-none rounded-sm"
                    />
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        id="multiplayer-copy-link-btn"
                        onClick={handleCopyLink}
                        className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-cinzel uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer rounded-sm border ${
                          copied
                            ? 'bg-[#1b432a] text-[#f7efe4] border-[#13321f]'
                            : 'bg-[#220e05] hover:bg-[#341609] text-[#faeed2] border-[#8a5d24] shadow-xs'
                        }`}
                        title="Copy Courier Link to Clipboard"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                        <span>{copied ? 'Transcribed!' : 'Copy Link'}</span>
                      </button>

                      <button
                        type="button"
                        id="multiplayer-send-link-btn"
                        onClick={handleShareLink}
                        className="flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-cinzel uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer rounded-sm border bg-[#821e25] hover:bg-[#6b161c] text-[#f7efe4] border-[#4a0d10] shadow-sm active:scale-95"
                        title="Send Link or Share with Comrade"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#f7efe4]" />
                        <span>Send Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===================================================================== */}
              {/* PRIMARY ACTION CTA (Create & Play)                                   */}
              {/* ===================================================================== */}
              <button
                type="button"
                id="multiplayer-create-and-wait-btn"
                onClick={handleCreateAndPlay}
                className="w-full py-2.5 sm:py-3 px-5 rounded-sm bg-[#821e25] hover:bg-[#6b161c] active:bg-[#521014] text-[#f7efe4] font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] font-extrabold border border-[#4a0d10] shadow-[0_3px_12px_rgba(130,30,37,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
    </>
  );
};

export const MultiplayerModal: React.FC<MultiplayerModalProps> = ({
  isOpen,
  onClose,
  onStartOnlineMatch,
  initialRoomId,
  controlMode = 'virtual',
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="multiplayer-lobby-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl my-auto py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <FlowingPaper id="multiplayer-lobby-codex">
          {/* ========================================================================= */}
          {/* 1. FOLIO RUNNING HEADER (3-Column Lead Marker with Close Button)          */}
          {/* ========================================================================= */}
          <div className="w-full grid grid-cols-3 items-center pb-2 border-b border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.24em] text-[#5e310e] uppercase font-bold">
            <span className="text-left">FOLIO IV</span>
            <span className="text-center opacity-80">&#10022; IMPERIAL COURIER &#10022;</span>
            <div className="flex items-center justify-end gap-2">
              <span className="hidden sm:inline">FIELD OF SHATRANJ</span>
              <button
                type="button"
                id="close-multiplayer-modal"
                onClick={onClose}
                className="p-1 rounded-full border border-[#7d481b]/35 hover:border-[#821e25] text-[#7d481b] hover:text-[#821e25] hover:bg-[#821e25]/[0.06] transition-colors cursor-pointer"
                title="Seal and Close Scroll"
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
              &mdash; CHAPTER IV &mdash;
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl text-[#1f0d04] font-extrabold tracking-wide uppercase">
              Imperial Courier &amp; Live Duel
            </h3>
            <p className="font-cormorant italic text-xs sm:text-sm text-[#5c3010] mt-0.5">
              Dispatch an encrypted courier scroll to duel a distant comrade with real-time optical &amp; vocal presence.
            </p>
          </div>


          <CourierDispatchBody
            onStartOnlineMatch={onStartOnlineMatch}
            onDone={onClose}
            initialRoomId={initialRoomId}
            controlMode={controlMode}
          />


          {/* ========================================================================= */}
          {/* 4. SECURITY NOTICE & RUNNING FOLIO FOOTER                                 */}
          {/* ========================================================================= */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-cormorant italic text-[#6e3c15]">
            <Shield className="w-3.5 h-3.5 text-[#821e25]" />
            <span>Authenticated WebRTC encrypted peer-to-peer courier stream &bull; Live optical &amp; vocal feed</span>
          </div>

          <div className="w-full grid grid-cols-3 items-center pt-2 pb-1 border-t border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.24em] text-[#5e310e]/75 uppercase font-bold mt-2.5">
            <span className="text-left">BOOK OF SHATRANJ</span>
            <span className="text-center opacity-80">&mdash; IV &mdash;</span>
            <span className="text-right">COURIER PROTOCOL</span>
          </div>
        </FlowingPaper>
      </div>
    </div>
  );
};
