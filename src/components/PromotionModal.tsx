import React from 'react';
import type { PieceType, PieceColor } from '../types';

interface PromotionModalProps {
  color: PieceColor;
  onSelectPiece: (piece: PieceType) => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelectPiece }) => {
  const pieces: { type: PieceType; name: string; symbol: string }[] = [
    { type: 'q', name: 'Queen', symbol: color === 'w' ? '♕' : '♛' },
    { type: 'r', name: 'Rook', symbol: color === 'w' ? '♖' : '♜' },
    { type: 'b', name: 'Bishop', symbol: color === 'w' ? '♗' : '♝' },
    { type: 'n', name: 'Knight', symbol: color === 'w' ? '♘' : '♞' },
  ];

  return (
    <div id="pawn-promotion-modal" className="fixed inset-0 z-50 bg-[#0b0603]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#f7f2e7]/98 border border-[#7d481b]/40 rounded-2xl p-6 sm:p-7 max-w-sm w-full shadow-[0_20px_50px_rgba(61,29,7,0.45)] text-center animate-in fade-in zoom-in-95 duration-200">
        <span className="font-cinzel text-[#821e25] text-[10px] font-bold tracking-[0.24em] uppercase block mb-1">
          &mdash; ROYAL PROMOTION &mdash;
        </span>
        <h3 className="font-cinzel text-lg font-bold tracking-wide text-[#1f0d04] mb-1 uppercase">
          Crown Thy Pawn
        </h3>
        <p className="font-cormorant italic text-sm text-[#5c3010] mb-5">
          Select coronation piece for {color === 'w' ? 'White' : 'Black'}
        </p>

        <div className="grid grid-cols-4 gap-2.5">
          {pieces.map((p) => (
            <button
              key={p.type}
              onClick={() => onSelectPiece(p.type)}
              className="group flex flex-col items-center justify-center p-3 bg-[#ede3d2]/80 hover:bg-[#821e25]/15 border border-[#7d481b]/30 hover:border-[#821e25]/60 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform mb-1 select-none text-[#1f0d04] group-hover:text-[#821e25]">
                {p.symbol}
              </span>
              <span className="text-[10px] font-cinzel font-bold text-[#5e310e] group-hover:text-[#821e25] uppercase tracking-wider">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
