import React, { useState, useEffect, useCallback } from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { FlowingPaper } from './FlowingPaper';
import { CourierEnvelopeIntro } from './CourierEnvelopeIntro';
import type { PieceColor, ControlMode } from '../types';

interface CourierInviteScreenProps {
  isOpen: boolean;
  initialRoomCode?: string;
  initialHostSide?: PieceColor | null;
  initialControlMode?: ControlMode | string;
  initialHostName?: string;
  defaultPlayerName?: string;
  inviteData?: {
    roomCode: string;
    hostSide: PieceColor | null;
    hostMode: ControlMode | string;
    hostName: string;
  };
  onEnterBattle: (
    roomCode: string,
    playerName: string,
    assignedSide: PieceColor,
    controlMode: ControlMode
  ) => void;
  onClose?: () => void;
  onCancel?: () => void;
}

const NAME_FORM_ID = 'invite-commander-name-form';
/** The sheet's margins, in steps of the page's type size (--folio-size) so they grow with it. */
const FOLIO_PADDING = 'calc(var(--folio-size) * 3.875) calc(var(--folio-size) * 4.875) calc(var(--folio-size) * 3.625)';

/**
 * The courier's invitation: one page, set like the pages of the study's book, where the invited player
 * inscribes their title and enters the battle. Side, control style and room all come with the link.
 */
export const CourierInviteScreen: React.FC<CourierInviteScreenProps> = ({
  isOpen,
  initialRoomCode = '',
  initialHostSide = 'w',
  initialControlMode = 'virtual',
  initialHostName = 'Rival Commander',
  defaultPlayerName = 'Challenger',
  inviteData,
  onEnterBattle,
  onClose,
  onCancel,
}) => {
  const roomCode = (inviteData?.roomCode ?? initialRoomCode).trim();
  const effectiveHostSide = inviteData?.hostSide ?? initialHostSide;
  const rawMode = inviteData?.hostMode ?? initialControlMode;
  const effectiveMode: ControlMode = rawMode === 'voice' ? 'voice' : rawMode === 'mouse' ? 'mouse' : 'virtual';
  const effectiveHostName = inviteData?.hostName ?? initialHostName;

  const [playerName, setPlayerName] = useState<string>(defaultPlayerName);

  useEffect(() => {
    if (defaultPlayerName) {
      setPlayerName(defaultPlayerName);
    }
  }, [defaultPlayerName]);

  // The invitation arrives sealed: the envelope plays once each time the screen opens
  const [letterOpened, setLetterOpened] = useState(false);
  const handleLetterOpened = useCallback(() => setLetterOpened(true), []);
  useEffect(() => { if (!isOpen) setLetterOpened(false); }, [isOpen]);

  if (!isOpen) return null;

  // The invited player takes the other side from the host's
  const assignedSide: PieceColor = effectiveHostSide === 'b' ? 'w' : 'b';

  const handleEnterBattle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode) return;
    onEnterBattle(roomCode, playerName.trim() || 'Challenger', assignedSide, effectiveMode);
  };

  return (
    <>
    {!letterOpened && <CourierEnvelopeIntro onDone={handleLetterOpened} />}
    <OnboardingLayout
      id="courier-invite-screen-overlay"
      onBack={onCancel || onClose}
      backLabel="Decline"
      contentMaxWidthClass="max-w-none"
    >
      <div className="courier-folio">
      <FlowingPaper id="courier-invite-codex-folio" padding={FOLIO_PADDING}>
        <div className="folio">
          <div className="folio-head">
            <span>Folio I</span>
            <span>&#10022; Courier Dispatch &#10022;</span>
            <span>Peer-to-Peer</span>
          </div>

          <div className="folio-opening">
            <div className="folio-chapter">&mdash; Royal Challenge Received &mdash;</div>
            <h2 className="folio-title">Commander Inscription</h2>
            <p className="folio-subtitle">
              Commander {effectiveHostName} has sent a sealed challenge to duel. Inscribe your title and enter the battle.
            </p>
          </div>
          <div className="folio-diamond" />

          <form id={NAME_FORM_ID} onSubmit={handleEnterBattle}>
            <div className="folio-label"><b>I.</b>Inscribe your title</div>
            <p className="folio-note">This title shall identify your standard upon the battlefield and in the live visual link.</p>
            <label htmlFor="invite-commander-name-input" className="sr-only">Your commander title</label>
            <input
              id="invite-commander-name-input"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="e.g. Grandmaster, Archon, Knight"
              maxLength={30}
              autoFocus
              className="folio-field"
            />
          </form>

          <div className="folio-foot">
            <span>Book of Shatranj</span>
            <span>&mdash; I &mdash;</span>
            <span>Invitation</span>
          </div>
        </div>
      </FlowingPaper>

      {/* Right beneath the page, as under the open book: the gold cartouche */}
      <div className="folio-cta">
        <button id="enter-battle-btn" type="submit" form={NAME_FORM_ID} disabled={!roomCode} className="join">
          ENTER BATTLE
        </button>
      </div>
      </div>
    </OnboardingLayout>
    </>
  );
};
