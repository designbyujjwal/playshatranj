import React, { useEffect, useState } from 'react';
import type { ControlMode, PieceColor } from '../types';
import { OnboardingLayout } from './OnboardingLayout';
import { HandGestureCodexCard } from './HandGestureCodexCard';
import { VoiceCommandCodexCard } from './VoiceCommandCodexCard';
import { PAGE_DESIGN_HEIGHT, PAGE_DESIGN_WIDTH } from './TornOldBookPage';

const PAGE_GAP = 40;

/**
 * Works out how large the two pages can be for the current window, so they grow
 * to fill the space between the header and the confirm button instead of staying
 * a fixed size in the middle.
 */
function usePageScale(): { scale: number; twoColumns: boolean } {
  const compute = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const twoColumns = w >= 768;
    const sideMargin = w < 480 ? 24 : 48;
    // Space taken by the header (logo, title) and the footer (button, note), plus breathing room.
    const chrome = Math.max(180, Math.min(300, h * 0.185 + 60));
    if (twoColumns) {
      const byHeight = (h - chrome) / PAGE_DESIGN_HEIGHT;
      const byWidth = (w - sideMargin * 2 - PAGE_GAP) / (PAGE_DESIGN_WIDTH * 2);
      return { scale: Math.max(0.5, Math.min(1.5, byHeight, byWidth)), twoColumns };
    }
    const byWidth = (w - sideMargin * 2) / PAGE_DESIGN_WIDTH;
    return { scale: Math.max(0.6, Math.min(1, byWidth)), twoColumns };
  };
  const [state, setState] = useState(compute);
  useEffect(() => {
    const onResize = () => setState(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return state;
}

interface ControlModeModalProps {
  isOpen: boolean;
  playerName?: string;
  playerColor?: PieceColor;
  playerSide?: PieceColor;
  currentMode?: ControlMode;
  initialMode?: ControlMode;
  onSelectMode: (mode: ControlMode) => void;
  onBackToOnboarding?: () => void;
  onBack?: () => void;
  onWatchTutorial?: () => void;
}

export const ControlModeModal: React.FC<ControlModeModalProps> = ({
  isOpen,
  playerName = 'Grandmaster',
  currentMode,
  initialMode = 'voice',
  onSelectMode,
  onBackToOnboarding,
  onBack,
}) => {
  const [selectedMode, setSelectedMode] = useState<ControlMode>(currentMode || initialMode);
  const handleBack = onBack || onBackToOnboarding || (() => {});
  const { scale, twoColumns } = usePageScale();

  if (!isOpen) return null;

  const backdropGlow = `
    radial-gradient(circle at 50% -8%, rgba(255, 215, 130, 0.14) 0%, rgba(200, 135, 45, 0.07) 40%, transparent 70%),
    radial-gradient(ellipse 75% 65% at ${
      selectedMode === 'voice' ? '40%' : '60%'
    } 42%, rgba(245, 175, 65, 0.16) 0%, rgba(185, 105, 30, 0.08) 45%, rgba(65, 25, 6, 0.03) 72%, transparent 100%),
    radial-gradient(circle at 50% 90%, rgba(35, 14, 4, 0.6) 0%, transparent 60%)
  `;

  return (
    <OnboardingLayout
      id="control-mode-selection-screen"
      title="Choose Your Control Style"
      subtitle={`How would you like to command the board, ${playerName}?`}
      onBack={handleBack}
      backdropGlow={backdropGlow}
      ctaLabel="Continue"
      onCtaClick={() => onSelectMode(selectedMode)}
      ctaSubtext="You can change control methods anytime from the royal banner during play"
      contentMaxWidthClass="max-w-none"
    >
      {/* Main Choice Cards: Voice Control vs Virtual Hand Gestures - Centered with Big Prominent Folio Pages */}
      <div
        className={`w-full flex items-center justify-center my-auto ${twoColumns ? 'flex-row' : 'flex-col py-4'}`}
        style={{ gap: PAGE_GAP * Math.min(1, scale + 0.2) }}
      >
        {/* Card 1: Voice Command Control Manuscript */}
        <VoiceCommandCodexCard
          isSelected={selectedMode === 'voice'}
          onSelect={() => setSelectedMode('voice')}
          scale={scale}
        />

        {/* Card 2: Virtual Hand Gestures Manuscript Codex */}
        <HandGestureCodexCard
          isSelected={selectedMode === 'virtual'}
          onSelect={() => setSelectedMode('virtual')}
          scale={scale}
        />
      </div>
    </OnboardingLayout>
  );
};
