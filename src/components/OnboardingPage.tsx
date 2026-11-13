import React, { useState, useEffect } from 'react';
import type { PieceColor, BotDifficulty, PlayerProfile } from '../types';
import { Onboarding3DCanvas } from './Onboarding3DCanvas';
import { ShatranjBanner } from './ShatranjBanner';
import { JoinBattleButton } from './JoinBattleButton';
import { soundEffects } from '../utils/audio';
import { royalBattleMusic } from '../utils/music';
import { MusicVolumeSlider } from './MusicVolumeSlider';

export interface OnboardingPageProps {
  currentProfile?: PlayerProfile;
  initialName?: string;
  initialSide?: PieceColor;
  initialDifficulty?: BotDifficulty;
  onStartGame: (profile: PlayerProfile) => void;
  onSkip?: () => void;
  onWatchTutorial?: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  currentProfile,
  initialName = '',
  initialSide = 'w',
  initialDifficulty = 'medium',
  onStartGame,
}) => {
  const [playerName, setPlayerName] = useState<string>(
    currentProfile?.name !== 'Grandmaster' ? (currentProfile?.name || initialName) : ''
  );

  useEffect(() => {
    // Attempt playback immediately on landing page load
    royalBattleMusic.start();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundEffects.playPinchRelease();
    // Guarantee music is started on submit interaction
    royalBattleMusic.start();
    const finalName = playerName.trim() || 'Grandmaster';
    onStartGame({
      name: finalName,
      side: currentProfile?.side || initialSide || 'w',
      difficulty: currentProfile?.difficulty || initialDifficulty || 'medium',
    });
  };

  return (
    <div
      id="onboarding-page-root"
      className="fixed inset-0 w-screen bg-black overflow-hidden relative flex flex-col justify-between select-none"
      style={{
        height: '100dvh',
        minHeight: '100vh',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))',
      }}
    >
      {/* Top-Right Background Music Draggable Volume Control */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-auto">
        <MusicVolumeSlider variant="dark" />
      </div>

      {/* =========================================================================
          1. TOP 3D BOARD SECTION (Matching Reference Design):
             - 3D perspective chessboard floating in the dark
             - Interactive tactical combination sequence with bottom HUD pill
             - Seamless bottom gradient fade into pitch black (#000000)
         ========================================================================= */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden">
        <Onboarding3DCanvas className="w-full h-full" />
        {/* Subtle bottom fade into pure black */}
        <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>

      {/* =========================================================================
          2. BOTTOM HERO & ONBOARDING CONTROLS (Matching Reference Design):
             - Crimson frayed ribbon banner with golden knight badges & SHATRANJ title
             - Tagline: "PLAY WITH GESTURE. COMMAND BY VOICE. BEYOND VR."
             - Name input field: "Enter your name here"
             - Radiant golden-ringed crimson pill button: "JOIN BATTLE"
         ========================================================================= */}
      <div className="relative z-20 w-full shrink-0 flex flex-col items-center justify-end text-center px-4 pt-1 pb-1 sm:pb-2 max-w-4xl mx-auto">
        {/* Shatranj Frayed Crimson Ribbon Banner */}
        <ShatranjBanner className="max-h-[clamp(44px,7.5dvh,72px)]" />

        {/* Subtitle in tracked uppercase Cinzel serif */}
        <p
          id="onboarding-tagline"
          className="font-cinzel uppercase text-zinc-300/90 text-[clamp(10px,1.6dvh,13px)] tracking-[0.22em] mt-1.5 sm:mt-2 max-w-xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Play with Gesture. Command by Voice. Beyond VR.
        </p>

        {/* Input & Action Button Form */}
        <form
          id="onboarding-form"
          onSubmit={handleSubmit}
          className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mt-1.5 sm:mt-2 flex flex-col items-center gap-2 sm:gap-2.5"
        >
          <input
            id="onboarding-player-name-input"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onFocus={() => royalBattleMusic.start()}
            placeholder="Enter your name here"
            className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] h-[clamp(34px,4.5dvh,40px)] px-4 rounded-lg bg-black/60 border border-zinc-800 focus:border-zinc-600 focus:bg-black text-center text-zinc-200 placeholder:italic placeholder:text-zinc-500 text-xs sm:text-sm outline-none transition-all font-sans"
            maxLength={24}
            autoFocus
          />

          {/* Ornate Fantasy Battle Plaque Button matching Reference Image */}
          <JoinBattleButton
            id="onboarding-start-button"
            label="JOIN BATTLE"
            type="submit"
            className="w-[clamp(180px,26vw,240px)] max-w-full mt-0.5"
          />
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
