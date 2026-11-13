import React from 'react';
import { ChessIoLogo } from './ChessIoLogo';
import { JoinBattleButton } from './JoinBattleButton';

export interface OnboardingLayoutProps {
  id?: string;
  /** Headline under the logo. Left out, the header is the logo alone, shown a little larger */
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  onSkip?: () => void;
  skipLabel?: string;
  children: React.ReactNode;
  /** Primary action CTA button label or custom node */
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  ctaSubtext?: string;
  /** Custom footer node instead of default button */
  customFooter?: React.ReactNode;
  /** Extra ambient backdrop focus styling (e.g. leaning glow) */
  backdropGlow?: string;
  /** Content max-width class (default max-w-5xl) */
  contentMaxWidthClass?: string;
  /** Additional class for content zone */
  contentClassName?: string;
  /** Whether content zone should scroll if needed (default true) */
  allowContentScroll?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  id,
  title,
  subtitle,
  onBack,
  backLabel = 'Back',
  onSkip,
  skipLabel = 'Skip',
  children,
  ctaLabel,
  onCtaClick,
  ctaDisabled = false,
  ctaSubtext,
  customFooter,
  backdropGlow,
  contentMaxWidthClass = 'max-w-5xl',
  contentClassName = '',
  allowContentScroll = true,
}) => {
  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex flex-col bg-[#0b0603] text-white overflow-hidden select-none"
      style={{
        height: '100dvh',
        minHeight: '100vh',
        paddingTop: 'max(0.25rem, env(safe-area-inset-top, 0.25rem))',
        paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom, 0.25rem))',
        paddingLeft: 'max(0.5rem, env(safe-area-inset-left, 0.5rem))',
        paddingRight: 'max(0.5rem, env(safe-area-inset-right, 0.5rem))',
      }}
    >
      {/* 
        Chiaroscuro Candlelight Table Illumination:
        Overhead lantern beam focused directly on the scholar's desk
      */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          background:
            backdropGlow ||
            `
            radial-gradient(circle at 50% -8%, rgba(255, 215, 130, 0.15) 0%, rgba(200, 135, 45, 0.08) 40%, transparent 70%),
            radial-gradient(ellipse 75% 65% at 50% 45%, rgba(245, 175, 65, 0.14) 0%, rgba(185, 105, 30, 0.07) 45%, rgba(65, 25, 6, 0.02) 75%, transparent 100%),
            radial-gradient(circle at 50% 90%, rgba(35, 14, 4, 0.6) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle Antique Tome Parchment Texture & Book Spine Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 parchment-texture-overlay opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0 parchment-vignette opacity-55" aria-hidden="true" />

      {/* =========================================================================
          ZONE 1: HEADER ZONE (Fixed vertical rhythm, consistent across every screen)
          Logo size, top position, back button, title and subtitle are unified
          ========================================================================= */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center shrink-0 px-2 sm:px-4 pt-1 sm:pt-2 pb-1 sm:pb-2">
        {/* Top Bar with Back, Logo, and Optional Skip/Balance Spacer */}
        <div className="w-full flex items-center justify-between">
          {/* Left Slot: Back Button */}
          <div className="w-20 sm:w-28 flex items-center justify-start">
            {onBack ? (
              <button type="button" onClick={onBack} className="folio-back">
                &larr; {backLabel}
              </button>
            ) : (
              <div className="w-8" aria-hidden="true" />
            )}
          </div>

          {/* Center Slot: Consistent Shatranj Logo Banner */}
          <div className="flex-1 flex flex-col items-center text-center">
            <ChessIoLogo
              id="onboarding-shared-logo"
              className="text-white tracking-tight"
              imageClassName={`${title ? 'h-[clamp(26px,4.4dvh,52px)] max-w-[320px]' : 'h-[clamp(36px,6.2dvh,72px)] max-w-[440px]'} w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]`}
            />
          </div>

          {/* Right Slot: Skip Button or Exact Matching Spacer */}
          <div className="w-20 sm:w-28 flex items-center justify-end">
            {onSkip ? (
              <button type="button" onClick={onSkip} className="folio-back">
                {skipLabel}
              </button>
            ) : (
              <div className="w-8" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Unified Headline & Subtitle */}
        {title && (
          <div className="text-center mt-0.5 sm:mt-1 max-w-xl mx-auto">
            <h2 className="font-cinzel text-[clamp(1rem,2.6dvh,1.75rem)] text-white font-bold tracking-wide uppercase leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="font-cormorant italic text-zinc-300 text-[clamp(0.75rem,1.7dvh,1.1rem)] mt-0.5 leading-snug">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </header>

      {/* =========================================================================
          ZONE 2: CONTENT ZONE (flex: 1, min-height: 0, centered, only zone that flexes)
          If screen is small, this zone scrolls internally; page never scrolls
          ========================================================================= */}
      <main
        className={`relative z-10 w-full flex-1 min-h-0 flex flex-col items-center ${
          allowContentScroll ? 'overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]' : 'overflow-hidden'
        } py-0 sm:py-0.5 px-1 sm:px-3 ${contentClassName}`}
      >
        <div className={`w-full ${contentMaxWidthClass} mx-auto flex flex-col items-center justify-center my-auto`}>
          {children}
        </div>
      </main>

      {/* =========================================================================
          ZONE 3: FOOTER ZONE (Pinned inside visible viewport, consistent across all screens)
          Primary CTA with gold/crimson gradient and optional helper note
          ========================================================================= */}
      <footer className="relative z-10 w-full max-w-[420px] sm:max-w-[520px] mx-auto flex flex-col items-center gap-1.5 pt-2 pb-2 sm:pb-3 px-3 shrink-0">
        {customFooter ? (
          customFooter
        ) : ctaLabel ? (
          <>
            <JoinBattleButton
              id="onboarding-primary-cta"
              label={ctaLabel}
              onClick={onCtaClick}
              disabled={ctaDisabled}
              className="w-[clamp(220px,28vw,320px)] max-w-full"
            />
            {ctaSubtext && (
              <p className="text-[clamp(11px,1.6dvh,15px)] text-zinc-300 font-cormorant italic text-center leading-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {ctaSubtext}
              </p>
            )}
          </>
        ) : null}
      </footer>
    </div>
  );
};

export default OnboardingLayout;
