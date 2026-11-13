import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import type { PieceColor, BotDifficulty, PlayerProfile } from '../types';
import { Onboarding3DCanvas } from './Onboarding3DCanvas';

interface OnboardingModalProps {
  currentProfile?: PlayerProfile;
  initialName?: string;
  initialSide?: PieceColor;
  initialDifficulty?: BotDifficulty;
  onStartGame: (profile: PlayerProfile) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  currentProfile,
  initialName = '',
  initialSide = 'b',
  initialDifficulty = 'medium',
  onStartGame,
  onClose,
}) => {
  const [playerName, setPlayerName] = useState(currentProfile?.name || initialName);
  const [selectedSide, setSelectedSide] = useState<PieceColor>(currentProfile?.side || initialSide);
  const [difficulty, setDifficulty] = useState<BotDifficulty>(currentProfile?.difficulty || initialDifficulty);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = playerName.trim() || 'Grandmaster';
    onStartGame({
      name: finalName,
      side: selectedSide,
      difficulty,
    });
  };

  const handleSkip = () => {
    if (onClose) {
      onClose();
    } else {
      handleSubmit();
    }
  };

  const difficultyOptions: { value: BotDifficulty; label: string }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'master', label: 'Master' },
  ];

  return (
    <div
      id="onboarding-page"
      className="h-screen w-screen bg-cover bg-center overflow-hidden relative flex flex-col justify-between select-none bg-black"
    >
      {/* 1. Full-Page 3D Background: Low-Key Fallen Black King & Standing White Pawn on Reflective Board */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Onboarding3DCanvas />

        {/* Subtle dark vignette & radial gradient overlay to ensure foreground UI readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(0,0,0,0.75)_90%] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* 2. Navigation / Top Bar */}
      <header
        id="onboarding-top-bar"
        className="relative z-20 w-full px-6 py-6 sm:px-10 sm:py-8 flex items-center justify-between pointer-events-auto"
      >
        {/* Top-left: Yellow glowing indicator with bold uppercase text "SPATIAL 3D CHESS" */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.95)]" />
            <span className="absolute w-4 h-4 rounded-full bg-amber-400/40 animate-ping" />
          </div>
          <span className="text-sm font-bold tracking-widest text-white uppercase font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            SPATIAL 3D CHESS
          </span>
        </div>

        {/* Top-right: Subtle ghost/pill button labeled "Skip" */}
        <button
          id="onboarding-skip-btn"
          type="button"
          onClick={handleSkip}
          className="text-xs font-medium tracking-wide text-white/70 hover:text-white px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md transition-all cursor-pointer"
        >
          Skip
        </button>
      </header>

      {/* 3. Floating Onboarding Controls (Centered / Bottom-weighted glassmorphism layout) */}
      <main className="relative z-20 pb-8 sm:pb-12 px-4 sm:px-6 w-full max-w-lg mx-auto pointer-events-auto">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* A. Name Input: Rounded pill input field with user icon, dark translucent glass */}
          <div className="relative">
            <div className="flex items-center rounded-full backdrop-blur-md bg-black/50 border border-white/10 px-4 py-3.5 shadow-lg focus-within:border-white/30 focus-within:bg-black/65 transition-all">
              <User className="w-4 h-4 text-white/50 shrink-0 ml-1 mr-3" />
              <input
                id="player-name-input"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name (e.g., Grandmaster)"
                maxLength={24}
                className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* B. Side Selector: SELECT YOUR SIDE with White King and Black King cards */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono tracking-widest text-white/50 text-center uppercase font-semibold">
              SELECT YOUR SIDE
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* White King Card */}
              <button
                id="select-side-white"
                type="button"
                onClick={() => setSelectedSide('w')}
                className={`p-3.5 rounded-2xl backdrop-blur-md border text-left transition-all cursor-pointer ${
                  selectedSide === 'w'
                    ? 'bg-white/15 border-amber-400/90 ring-2 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                    : 'bg-black/50 border-white/10 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl font-serif text-amber-100 leading-none">♔</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                      White King
                    </div>
                    <div className="text-[10px] text-white/50 font-medium">
                      (Plays First)
                    </div>
                  </div>
                </div>
              </button>

              {/* Black King Card (Active by default matching prompt specification) */}
              <button
                id="select-side-black"
                type="button"
                onClick={() => setSelectedSide('b')}
                className={`p-3.5 rounded-2xl backdrop-blur-md border text-left transition-all cursor-pointer ${
                  selectedSide === 'b'
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'bg-black/50 border-white/10 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl font-serif text-blue-200 leading-none">♚</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                      Black King
                    </div>
                    <div className="text-[10px] text-white/50 font-medium">
                      (Plays Second)
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* C. AI Opponent Tier: Pill segmented control with 4 options */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono tracking-widest text-white/50 text-center uppercase font-semibold">
              AI OPPONENT TIER
            </div>
            <div className="grid grid-cols-4 gap-1 p-1 rounded-full backdrop-blur-md bg-black/50 border border-white/10 shadow-lg">
              {difficultyOptions.map((opt) => {
                const isActive = difficulty === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDifficulty(opt.value)}
                    className={`py-2 px-1 text-xs rounded-full transition-all cursor-pointer text-center ${
                      isActive
                        ? 'bg-amber-500 text-black font-semibold shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        : 'text-white/70 hover:text-white hover:bg-white/5 font-medium'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* D. Primary CTA: Full-width rounded action button with warm amber gradient */}
          <button
            id="onboarding-primary-cta"
            type="submit"
            className="w-full rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 px-6 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] transition-all flex items-center justify-center gap-2 tracking-wide uppercase text-sm cursor-pointer group"
          >
            <span>PLAY AS {selectedSide === 'b' ? 'BLACK' : 'WHITE'} →</span>
          </button>
        </form>
      </main>
    </div>
  );
};
