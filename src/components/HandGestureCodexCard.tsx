import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { TornOldBookPage } from './TornOldBookPage';
import { HandWoodcutMark } from './HandWoodcutMark';

interface HandGestureCodexCardProps {
  isSelected: boolean;
  onSelect: () => void;
  /** Scale of the page relative to its design size. */
  scale?: number;
}

export const HandGestureCodexCard: React.FC<HandGestureCodexCardProps> = ({
  isSelected,
  onSelect,
  scale = 1,
}) => {
  const handleClick = () => {
    soundEffects.playPinchEngage();
    onSelect();
  };

  return (
    <TornOldBookPage
      id="select-virtual-mode-card"
      side="right"
      isSelected={isSelected}
      onSelect={handleClick}
      scale={scale}
    >
      {/* 1. Folio Running Header (Antique Book Folio Marker) */}
      <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center pb-1 border-b border-[#7d481b]/30 text-[9px] sm:text-[10px] font-cinzel tracking-[0.2em] text-[#5e310e] uppercase font-bold">
        <span className="text-left">FOLIO II</span>
        <span className="text-center opacity-75 whitespace-nowrap tracking-[0.1em]">&#10022; THE LIVING HAND &#10022;</span>
        <span className="text-right">RIGHT PAGE</span>
      </div>

      {/* 2. Engraved Woodcut Printer's Mark (Printed directly in iron-gall ink) */}
      <div className="w-full flex justify-center my-0.5 sm:my-1">
        <HandWoodcutMark />
      </div>

      {/* 3. Simple & Clear Chapter Title */}
      <div className="text-center px-0.5">
        <span className="font-cinzel text-[#821e25] text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.2em] uppercase block">
          &mdash; CHAPTER II &mdash;
        </span>
        <h3 className="font-cinzel text-lg sm:text-xl md:text-[22px] text-[#1f0d04] font-extrabold tracking-wide uppercase leading-tight">
          Hand Gestures
        </h3>
        <p className="font-cormorant italic text-xs sm:text-[13.5px] text-[#5c3010] mt-0.5">
          Use your real hand in the air to pick up pieces
        </p>
      </div>

      {/* 4. Simple Explanation Paragraph */}
      <div className="px-0.5 text-center font-cormorant text-xs sm:text-[13.5px] text-[#2c1406] leading-snug">
        <p>
          Control the board naturally in front of your camera. Pinch your fingers to pick up a piece, move it in 3D space, and open your hand to place it down.
        </p>
      </div>

      {/* 5. Clear Example Motions (Inked directly into parchment with delicate book ruling) */}
      <div className="w-full my-1 py-1 sm:py-1.5 border-y border-[#7d481b]/25 text-center">
        <span className="font-cinzel text-[8.5px] sm:text-[9.5px] text-[#821e25] tracking-[0.2em] font-bold uppercase block mb-0.5">
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

      {/* 6. Three Plain-English How-It-Works Points */}
      <div className="space-y-1 sm:space-y-1.5 px-0.5 text-left font-cormorant text-[12px] sm:text-[13px] text-[#241105] leading-snug">
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-[#140702]">Camera Tracking:</strong> Your webcam sees your hand without any gloves or extra hardware.
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-[#140702]">Pinch & Lift:</strong> Pinch thumb and index finger together to grab any piece on the board.
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#821e25] shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-[#140702]">Golden Target Light:</strong> A light beam shows exactly which square the piece will land on.
          </p>
        </div>
      </div>

      {/* 7. Equipment Colophon Note (Pressed directly on paper) */}
      <div className="w-full flex items-center justify-center gap-1.5 pt-0.5 text-[#5e310e] font-cinzel text-[9.5px] sm:text-[10.5px] tracking-widest uppercase font-semibold">
        <Camera className="w-3 h-3 text-[#821e25]" />
        <span>Apparatus: Optical Webcam</span>
      </div>

      {/* 8. Bottom Old-Book Margin */}
      <div className="w-full pt-0.5 border-t border-[#7d481b]/25 flex items-center justify-between text-[8px] sm:text-[8.5px] font-cinzel text-[#633510] tracking-widest uppercase opacity-70">
        <span>BOOK OF SHATRANJ</span>
        <span>&mdash; 2 &mdash;</span>
        <span>GESTURE CONTROL</span>
      </div>
    </TornOldBookPage>
  );
};
