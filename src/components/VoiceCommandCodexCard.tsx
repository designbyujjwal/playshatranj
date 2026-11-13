import React from 'react';
import { Mic, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { TornOldBookPage } from './TornOldBookPage';
import { VoiceWoodcutMark } from './VoiceWoodcutMark';

interface VoiceCommandCodexCardProps {
  isSelected: boolean;
  onSelect: () => void;
  /** Scale of the page relative to its design size. */
  scale?: number;
}

export const VoiceCommandCodexCard: React.FC<VoiceCommandCodexCardProps> = ({
  isSelected,
  onSelect,
  scale = 1,
}) => {
  const handleClick = () => {
    soundEffects.playLiftSound();
    onSelect();
  };

  return (
    <TornOldBookPage
      id="select-voice-mode-card"
      side="left"
      isSelected={isSelected}
      onSelect={handleClick}
      scale={scale}
    >
      {/* 1. Folio Running Header (Antique Book Folio Marker) */}
      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center pb-1 border-b border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.2em] text-[#5e310e] uppercase font-bold">
        <span className="text-left">FOLIO I</span>
        <span className="text-center opacity-75 whitespace-nowrap tracking-[0.1em]">&#10022; THE SPOKEN WORD &#10022;</span>
        <span className="text-right">LEFT PAGE</span>
      </div>

      {/* 2. Engraved Woodcut Printer's Mark (Printed directly in iron-gall ink) */}
      <div className="w-full flex justify-center my-0.5 sm:my-1">
        <VoiceWoodcutMark />
      </div>

      {/* 3. Simple & Clear Chapter Title */}
      <div className="text-center px-0.5">
        <span className="font-cinzel text-[#821e25] text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.2em] uppercase block">
          &mdash; CHAPTER I &mdash;
        </span>
        <h3 className="font-cinzel text-lg sm:text-xl md:text-[22px] text-[#1f0d04] font-extrabold tracking-wide uppercase leading-tight">
          Voice Commands
        </h3>
        <p className="font-cormorant italic text-xs sm:text-[13.5px] text-[#5c3010] mt-0.5">
          Speak your moves out loud to play hands-free
        </p>
      </div>

      {/* 4. Simple Explanation Paragraph */}
      <div className="px-0.5 text-center font-cormorant text-xs sm:text-[13.5px] text-[#2c1406] leading-snug">
        <p>
          Just speak your chess move clearly. Say the piece and where you want it to go, and it will glide across the board without you touching a key.
        </p>
      </div>

      {/* 5. Clear Example Phrases (Inked directly into parchment with delicate book ruling) */}
      <div className="w-full my-1 py-1 sm:py-1.5 border-y border-[#7d481b]/25 text-center">
        <span className="font-cinzel text-[8.5px] sm:text-[9.5px] text-[#821e25] tracking-[0.2em] font-bold uppercase block mb-0.5">
          ~ SPOKEN INCANTATIONS ~
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs sm:text-[13px] font-cormorant font-bold italic text-[#1a0802]">
          <span>&ldquo;Knight to F3&rdquo;</span>
          <span className="text-[#8c5222]">&bull;</span>
          <span>&ldquo;Pawn to E4&rdquo;</span>
          <span className="text-[#8c5222]">&bull;</span>
          <span>&ldquo;Castle Kingside&rdquo;</span>
        </div>
      </div>

      {/* 6. Three Plain-English How-It-Works Points */}
      <div className="space-y-1 sm:space-y-1.5 px-0.5 text-left font-cormorant text-[12px] sm:text-[13px] text-[#241105] leading-snug">
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-[#140702]">Everyday Words:</strong> Say moves in simple chess language (e.g. &ldquo;Bishop takes D5&rdquo;).
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-[#140702]">Spoken Confirmation:</strong> A royal herald speaks back to confirm your moves and checks.
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-[#140702]">Completely Hands-Free:</strong> Sit back and command the battlefield with your microphone.
          </p>
        </div>
      </div>

      {/* 7. Equipment Colophon Note (Pressed directly on paper) */}
      <div className="w-full flex items-center justify-center gap-1.5 pt-0.5 text-[#5e310e] font-cinzel text-[9.5px] sm:text-[10.5px] tracking-widest uppercase font-semibold">
        <Mic className="w-3 h-3 text-[#821e25]" />
        <span>Apparatus: Live Microphone</span>
      </div>

      {/* 8. Bottom Old-Book Margin */}
      <div className="w-full pt-0.5 border-t border-[#7d481b]/25 flex items-center justify-between text-[8px] sm:text-[8.5px] font-cinzel text-[#633510] tracking-widest uppercase opacity-70">
        <span>BOOK OF SHATRANJ</span>
        <span>&mdash; 1 &mdash;</span>
        <span>VOICE COMMAND</span>
      </div>
    </TornOldBookPage>
  );
};
