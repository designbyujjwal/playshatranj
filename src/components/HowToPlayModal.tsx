import React, { useState } from 'react';
import {
  X,
  MousePointer,
  ArrowRight,
  ScrollText,
  ListOrdered,
  CheckCircle2,
  Camera,
  Mic,
  Volume2,
  Sparkles,
  Hand,
} from 'lucide-react';
import { SingleMatchCodexFolio } from './SingleMatchCodexFolio';
import { HandWoodcutMark } from './HandWoodcutMark';
import type { ControlMode } from '../types';

interface HowToPlayModalProps {
  controlMode?: ControlMode;
  onClose: () => void;
}

/**
 * 16th-Century Woodcut Herald Horn & Incantation Voice Mark
 */
const VoiceWoodcutHeraldMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="w-16 h-16 sm:w-20 sm:h-20 overflow-visible text-[#3d1d07]"
        style={{ mixBlendMode: 'multiply' }}
      >
        {/* Outer Engraved Concentric Astrological Circles */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="4,2,8,2"
          opacity="0.8"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Herald's Bugle / Horn in 16th Century Woodcut Style */}
        <g stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Horn bell and curve */}
          <path
            d="
              M 26,62
              C 36,62 44,52 56,52
              C 68,52 74,42 86,36
              C 89,35 94,37 94,44
              L 94,76
              C 94,83 89,85 86,84
              C 74,78 68,68 56,68
              C 44,68 36,58 26,58
              Z
            "
            fill="#f4ece1"
          />
          {/* Bell opening rim */}
          <ellipse cx="94" cy="60" rx="4.5" ry="16" fill="#f4ece1" strokeWidth="1.4" />
          <ellipse cx="94" cy="60" rx="2.5" ry="12" fill="#3d1d07" opacity="0.85" />

          {/* Mouthpiece */}
          <rect x="20" y="57" width="6" height="6" rx="1" fill="#f4ece1" strokeWidth="1.2" />

          {/* Sound waves / Incantation scrolls radiating outward */}
          <path d="M 102,46 C 108,52 108,68 102,74" strokeWidth="1.5" />
          <path d="M 108,38 C 117,48 117,72 108,82" strokeWidth="1.3" strokeDasharray="3,2" />
          <path d="M 114,30 C 126,44 126,76 114,90" strokeWidth="1" strokeDasharray="2,3" />

          {/* Little Heraldic Ribbon Pennant hanging below */}
          <path
            d="
              M 52,66
              L 48,88
              L 58,82
              L 68,88
              L 64,66
            "
            fill="#821e25"
            stroke="#5a1217"
            strokeWidth="1.2"
          />
          <circle cx="58" cy="74" r="2" fill="#d4af37" />
        </g>
      </svg>
    </div>
  );
};

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ controlMode = 'virtual', onClose }) => {
  // Mode selection inside modal: either 'voice' or 'gesture'
  const [doctrineMode, setDoctrineMode] = useState<'voice' | 'gesture'>(
    controlMode === 'voice' ? 'voice' : 'gesture'
  );
  const [activeTab, setActiveTab] = useState<'codex' | 'steps'>('codex');

  return (
    <div
      id="how-to-play-modal"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-5 overflow-y-auto bg-[#0b0603]/85 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Ambient Candlelight Luminous Backdrop Halo */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          background: `
            radial-gradient(circle at 50% 15%, rgba(255, 215, 130, 0.18) 0%, rgba(200, 135, 45, 0.08) 45%, transparent 70%),
            radial-gradient(ellipse 75% 65% at 50% 50%, rgba(245, 175, 65, 0.14) 0%, rgba(185, 105, 30, 0.07) 45%, transparent 100%),
            radial-gradient(circle at 50% 90%, rgba(35, 14, 4, 0.6) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-xl sm:max-w-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <SingleMatchCodexFolio id="how-to-play-codex-folio">
          {/* 1. Folio Running Header (Antique Book Folio Marker) */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.24em] text-[#5e310e] uppercase font-bold">
            <span className="text-left">
              {doctrineMode === 'voice' ? 'FOLIO IV' : 'FOLIO III'}
            </span>
            <span className="text-center opacity-85 flex items-center gap-1.5">
              <span>&#10022;</span>
              <span>{doctrineMode === 'voice' ? 'TRACTATUS VERBORUM' : 'TRACTATUS MANVVM'}</span>
              <span>&#10022;</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#7d481b] hover:text-[#821e25] rounded-full hover:bg-[#ede3d2] transition-colors cursor-pointer"
              title="Close Guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Doctrine Switcher (Hand Gestures vs Verbal Incantation) */}
          <div className="flex items-center justify-center gap-2 mt-2 mb-2 p-1 bg-[#ede3d2]/80 rounded-xl border border-[#7d481b]/35 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setDoctrineMode('voice')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                doctrineMode === 'voice'
                  ? 'bg-[#821e25] text-[#fff6e3] border border-[#d4af37]/70 shadow-[0_2px_8px_rgba(130,30,37,0.3)] font-bold'
                  : 'text-[#6b3a16] hover:text-[#1f0d04] font-semibold'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Verbal Incantation</span>
            </button>
            <button
              type="button"
              onClick={() => setDoctrineMode('gesture')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                doctrineMode === 'gesture'
                  ? 'bg-[#821e25] text-[#fff6e3] border border-[#d4af37]/70 shadow-[0_2px_8px_rgba(130,30,37,0.3)] font-bold'
                  : 'text-[#6b3a16] hover:text-[#1f0d04] font-semibold'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>Spatial Gestures</span>
            </button>
          </div>

          {/* 3. Chapter Title & Inscription */}
          <div className="text-center px-1 mb-3">
            <span className="font-cinzel text-[#821e25] text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase block mb-0.5">
              {doctrineMode === 'voice' ? '— CHAPTER III —' : '— CHAPTER II —'}
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl text-[#1f0d04] font-extrabold tracking-wide uppercase">
              {doctrineMode === 'voice' ? 'Rules of Verbal Incantation' : 'Spatial Hand Gestures'}
            </h3>
            <p className="font-cormorant italic text-sm sm:text-base text-[#5c3010] mt-0.5">
              {doctrineMode === 'voice'
                ? 'Command piece movements across the chessboard with vocal authority'
                : 'Command pieces in physical space with natural optical perception'}
            </p>
          </div>

          {/* 4. Tab Switchers (Manuscript Ribbon Style) */}
          <div className="flex items-center justify-center gap-2 mb-3 p-1 bg-[#ede3d2]/70 rounded-xl border border-[#7d481b]/30 max-w-xs sm:max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('codex')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'codex'
                  ? 'bg-[#241105] text-[#faeed2] border border-[#d4af37]/50 shadow-xs font-bold'
                  : 'text-[#6b3a16] hover:text-[#1f0d04] font-semibold'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Manuscript Codex</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('steps')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'steps'
                  ? 'bg-[#241105] text-[#faeed2] border border-[#d4af37]/50 shadow-xs font-bold'
                  : 'text-[#6b3a16] hover:text-[#1f0d04] font-semibold'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Quick Checklist</span>
            </button>
          </div>

          {/* 5. Active Doctrine & Tab Content */}
          {doctrineMode === 'voice' ? (
            /* ================= VERBAL INCANTATION CONTENT ================= */
            activeTab === 'codex' ? (
              <div className="flex flex-col items-center space-y-2.5 sm:space-y-3">
                {/* Woodcut Printer's Mark */}
                <div className="my-0.5">
                  <VoiceWoodcutHeraldMark className="scale-90 sm:scale-95" />
                </div>

                {/* Simple Explanation Paragraph */}
                <div className="px-1 text-center font-cormorant text-sm sm:text-base text-[#2c1406] leading-relaxed max-w-md">
                  <p>
                    Command your pieces hands-free by speaking into your microphone. State the piece name and target square, or speak direct board coordinates.
                  </p>
                </div>

                {/* Spoken Formulas Ribbon */}
                <div className="w-full py-1.5 border-y border-[#7d481b]/25 text-center">
                  <span className="font-cinzel text-[9px] sm:text-[10px] text-[#821e25] tracking-[0.24em] font-bold uppercase block mb-0.5">
                    ~ SPOKEN INCANTATIONS ~
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs sm:text-[13px] font-cormorant font-bold italic text-[#1a0802]">
                    <span>&ldquo;Pawn to E4&rdquo;</span>
                    <span className="text-[#8c5222]">&bull;</span>
                    <span>&ldquo;Knight to F3&rdquo;</span>
                    <span className="text-[#8c5222]">&bull;</span>
                    <span>&ldquo;Castle Kingside&rdquo;</span>
                    <span className="text-[#8c5222]">&bull;</span>
                    <span>&ldquo;Undo Move&rdquo;</span>
                  </div>
                </div>

                {/* Three Plain-English How-It-Works Notes */}
                <div className="space-y-1.5 px-1 text-left font-cormorant text-xs sm:text-sm text-[#241105] w-full max-w-md">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
                    <p>
                      <strong className="font-bold text-[#140702] font-cinzel text-xs">Standard Syntax:</strong> State the piece and destination square (e.g. <em>&ldquo;Pawn to E4&rdquo;</em>, <em>&ldquo;Knight takes C6&rdquo;</em>, or coordinates <em>&ldquo;E2 to E4&rdquo;</em>).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
                    <p>
                      <strong className="font-bold text-[#140702] font-cinzel text-xs">Special Decrees:</strong> Say <em>&ldquo;Castle Kingside&rdquo;</em>, <em>&ldquo;Castle Queenside&rdquo;</em>, <em>&ldquo;Takeback&rdquo;</em>, or <em>&ldquo;Offer Draw&rdquo;</em>.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
                    <p>
                      <strong className="font-bold text-[#140702] font-cinzel text-xs">Luminous HUD:</strong> Look at the floating parchment indicator at the bottom-right &mdash; it pulses when hearing your command.
                    </p>
                  </div>
                </div>

                {/* Colophon */}
                <div className="w-full flex items-center justify-center gap-1.5 pt-1 text-[#5e310e] font-cinzel text-[10px] tracking-widest uppercase font-semibold">
                  <Mic className="w-3 h-3 text-[#821e25]" />
                  <span>Apparatus: Web Speech Vocal Recognition Engine</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 sm:space-y-3 text-[#2c1406]">
                {/* Step 1 */}
                <div className="flex items-start gap-3 p-3 bg-[#ede3d2]/60 rounded-xl border border-[#7d481b]/25">
                  <div className="w-6 h-6 rounded-md bg-[#821e25] text-[#fff6e3] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    I
                  </div>
                  <div>
                    <h4 className="text-xs font-cinzel font-bold text-[#1f0d04] uppercase tracking-wider mb-0.5">Enable Vocal Hearing</h4>
                    <p className="text-xs sm:text-sm font-cormorant text-[#3d1d07] leading-relaxed">
                      Ensure microphone access is granted in your browser. The golden mic signet at the bottom right will glow amber when listening.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-3 bg-[#ede3d2]/60 rounded-xl border border-[#7d481b]/25">
                  <div className="w-6 h-6 rounded-md bg-[#821e25] text-[#fff6e3] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    II
                  </div>
                  <div>
                    <h4 className="text-xs font-cinzel font-bold text-[#1f0d04] uppercase tracking-wider mb-0.5">Utter the Sovereign Move</h4>
                    <p className="text-xs sm:text-sm font-cormorant text-[#3d1d07] leading-relaxed">
                      On your turn, speak clearly: <strong>&ldquo;Pawn to E4&rdquo;</strong>, <strong>&ldquo;Knight to F3&rdquo;</strong>, <strong>&ldquo;Bishop takes C4&rdquo;</strong>, or <strong>&ldquo;Queen to D8&rdquo;</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-3 bg-[#ede3d2]/60 rounded-xl border border-[#7d481b]/25">
                  <div className="w-6 h-6 rounded-md bg-[#821e25] text-[#fff6e3] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    III
                  </div>
                  <div>
                    <h4 className="text-xs font-cinzel font-bold text-[#1f0d04] uppercase tracking-wider mb-0.5">Autonomous Piece Execution</h4>
                    <p className="text-xs sm:text-sm font-cormorant text-[#3d1d07] leading-relaxed">
                      The chess engine confirms the move legality, sounds the battle chime, and glides the piece autonomously to its target square.
                    </p>
                  </div>
                </div>

                {/* Mouse Fallback */}
                <div className="flex items-center gap-2.5 p-3 bg-[#f2e7d5]/90 rounded-xl border border-[#7d481b]/30 text-xs text-[#5e310e]">
                  <MousePointer className="w-4 h-4 text-[#821e25] shrink-0" />
                  <span className="text-xs font-cormorant italic text-[#3d1d07]">
                    <strong className="font-cinzel text-[11px] not-italic text-[#1f0d04]">Manual Fallback:</strong> You can still click or drag any piece with your mouse or trackpad at any moment.
                  </span>
                </div>
              </div>
            )
          ) : (
            /* ================= SPATIAL HAND GESTURES CONTENT ================= */
            activeTab === 'codex' ? (
              <div className="flex flex-col items-center space-y-2.5 sm:space-y-3">
                {/* Woodcut Printer's Mark */}
                <div className="my-0.5">
                  <HandWoodcutMark className="scale-90 sm:scale-95" />
                </div>

                {/* Simple Explanation Paragraph */}
                <div className="px-1 text-center font-cormorant text-sm sm:text-base text-[#2c1406] leading-relaxed max-w-md">
                  <p>
                    Control the board naturally in front of your camera. Pinch your fingers to pick up a piece, move it in 3D space, and open your hand to place it down.
                  </p>
                </div>

                {/* Air Kinematics Ribbon */}
                <div className="w-full py-1.5 border-y border-[#7d481b]/25 text-center">
                  <span className="font-cinzel text-[9px] sm:text-[10px] text-[#821e25] tracking-[0.24em] font-bold uppercase block mb-0.5">
                    ~ AIR KINEMATICS ~
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs sm:text-[13px] font-cormorant font-bold italic text-[#1a0802]">
                    <span>1. Pinch to Grab</span>
                    <span className="text-[#8c5222]">&bull;</span>
                    <span>2. Move in the Air</span>
                    <span className="text-[#8c5222]">&bull;</span>
                    <span>3. Open to Drop</span>
                  </div>
                </div>

                {/* Three Plain-English How-It-Works Notes */}
                <div className="space-y-1.5 px-1 text-left font-cormorant text-xs sm:text-sm text-[#241105] w-full max-w-md">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
                    <p>
                      <strong className="font-bold text-[#140702] font-cinzel text-xs">Camera Tracking:</strong> Your webcam sees your hand without any gloves or extra hardware.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
                    <p>
                      <strong className="font-bold text-[#140702] font-cinzel text-xs">Pinch &amp; Lift:</strong> Pinch thumb and index finger together to grab any piece on the board.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
                    <p>
                      <strong className="font-bold text-[#140702] font-cinzel text-xs">Golden Reticle:</strong> A light beam shows exactly which square the piece will land on.
                    </p>
                  </div>
                </div>

                {/* Apparatus Colophon */}
                <div className="w-full flex items-center justify-center gap-1.5 pt-1 text-[#5e310e] font-cinzel text-[10px] tracking-widest uppercase font-semibold">
                  <Camera className="w-3 h-3 text-[#821e25]" />
                  <span>Apparatus: Optical MediaPipe Vision</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 sm:space-y-3 text-[#2c1406]">
                {/* Step 1 */}
                <div className="flex items-start gap-3 p-3 bg-[#ede3d2]/60 rounded-xl border border-[#7d481b]/25">
                  <div className="w-6 h-6 rounded-md bg-[#821e25] text-[#fff6e3] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    I
                  </div>
                  <div>
                    <h4 className="text-xs font-cinzel font-bold text-[#1f0d04] uppercase tracking-wider mb-0.5">Pinch to Lift Piece</h4>
                    <p className="text-xs sm:text-sm font-cormorant text-[#3d1d07] leading-relaxed">
                      Position your hand 40&ndash;70cm from the webcam. Pinch your <strong>Thumb</strong> and <strong>Index finger</strong> tips together directly above any piece to grasp it.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-3 bg-[#ede3d2]/60 rounded-xl border border-[#7d481b]/25">
                  <div className="w-6 h-6 rounded-md bg-[#821e25] text-[#fff6e3] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    II
                  </div>
                  <div>
                    <h4 className="text-xs font-cinzel font-bold text-[#1f0d04] uppercase tracking-wider mb-0.5">Spatial Drag &amp; Targeting</h4>
                    <p className="text-xs sm:text-sm font-cormorant text-[#3d1d07] leading-relaxed">
                      Move your hand through 3D space. An orbital targeting aura locks onto legal squares with high-contrast board cues.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-3 bg-[#ede3d2]/60 rounded-xl border border-[#7d481b]/25">
                  <div className="w-6 h-6 rounded-md bg-[#821e25] text-[#fff6e3] flex items-center justify-center font-cinzel font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    III
                  </div>
                  <div>
                    <h4 className="text-xs font-cinzel font-bold text-[#1f0d04] uppercase tracking-wider mb-0.5">Release Pinch to Place</h4>
                    <p className="text-xs sm:text-sm font-cormorant text-[#3d1d07] leading-relaxed">
                      Open your fingers to drop the piece on the target square. Legal moves snap cleanly with sound; illegal moves smoothly return home.
                    </p>
                  </div>
                </div>

                {/* Mouse Fallback */}
                <div className="flex items-center gap-2.5 p-3 bg-[#f2e7d5]/90 rounded-xl border border-[#7d481b]/30 text-xs text-[#5e310e]">
                  <MousePointer className="w-4 h-4 text-[#821e25] shrink-0" />
                  <span className="text-xs font-cormorant italic text-[#3d1d07]">
                    <strong className="font-cinzel text-[11px] not-italic text-[#1f0d04]">Mouse Fallback:</strong> You can also click and drag any piece directly with your mouse or trackpad at any time.
                  </span>
                </div>
              </div>
            )
          )}

          {/* 6. Bottom Action Bar */}
          <div className="mt-4 pt-3 border-t border-[#7d481b]/25 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="h-10 sm:h-11 px-8 rounded-lg bg-gradient-to-r from-[#7a181e] via-[#942028] to-[#7a181e] hover:from-[#8f1e25] hover:via-[#ad2730] hover:to-[#8f1e25] active:scale-[0.99] text-[#fff6e3] border border-[#d4af37]/70 font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase font-bold shadow-[0_4px_18px_rgba(148,32,40,0.45),0_0_12px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(148,32,40,0.6),0_0_16px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Return to Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </SingleMatchCodexFolio>
      </div>
    </div>
  );
};
