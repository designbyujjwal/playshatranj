import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { royalBattleMusic, type MusicState } from '../utils/music';

export interface MusicVolumeSliderProps {
  variant?: 'dark' | 'parchment' | 'paper';
  className?: string;
  showPercentage?: boolean;
}

export const MusicVolumeSlider: React.FC<MusicVolumeSliderProps> = ({
  variant = 'dark',
  className = '',
  showPercentage = true,
}) => {
  const [musicState, setMusicState] = useState<MusicState>(() => royalBattleMusic.getState());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return royalBattleMusic.subscribe((state) => {
      setMusicState(state);
    });
  }, []);

  // Click outside to collapse on touch devices
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !isDraggingRef.current
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const { isMuted, userVolume } = musicState;
  const currentPercent = isMuted ? 0 : Math.round(userVolume * 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const newVolume = isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) / 100;
    royalBattleMusic.setUserVolume(newVolume);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    royalBattleMusic.toggle();
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) return;
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 350);
  };

  const isPaper = variant === 'paper';
  const isDark = variant === 'dark';

  // Slider track fill colors
  const trackFillColor = isDark ? '#ffd470' : '#821e25';
  const trackEmptyColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(125,72,27,0.18)';
  const trackBackground = `linear-gradient(to right, ${trackFillColor} 0%, ${trackFillColor} ${currentPercent}%, ${trackEmptyColor} ${currentPercent}%, ${trackEmptyColor} 100%)`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`music-volume-control relative flex items-center rounded-full select-none transition-all duration-300 ease-out ${
        isPaper
          ? 'hud-paper hud-paper-live h-10'
          : isDark
          ? 'bg-black/40 hover:bg-black/75 border border-white/10 hover:border-amber-500/40 text-zinc-300 opacity-75 hover:opacity-100'
          : 'bg-[#f4ece1]/60 hover:bg-[#f4ece1]/90 border border-[#7d481b]/20 hover:border-[#7d481b]/40 text-[#7d481b] opacity-80 hover:opacity-100'
      } ${isPaper ? (isOpen ? 'px-2' : 'px-[7px]') : `backdrop-blur-md shadow-xs ${isOpen ? 'px-2 py-1.5 opacity-100 ring-1 ring-amber-500/20 shadow-md' : 'p-1.5'}`} ${className}`}
      title={isMuted ? 'Background Music: Muted (Click to Unmute)' : `Background Music Volume: ${currentPercent}%`}
    >
      {/* Icon Button: Click to Mute/Unmute, Hover/Tap to reveal draggable volume slider */}
      <button
        type="button"
        onClick={handleToggleMute}
        className={`rounded-full transition-transform active:scale-90 cursor-pointer flex items-center justify-center shrink-0 ${
          isOpen ? 'p-1' : 'p-1 sm:p-1.5'
        } ${
          isPaper
            ? 'text-current'
            : isDark
            ? 'hover:text-amber-300 text-zinc-300'
            : 'hover:text-[#821e25] text-[#7d481b]'
        }`}
        aria-label={isMuted ? 'Unmute Background Music' : 'Mute Background Music'}
        title={isMuted ? 'Unmute Music' : 'Mute Music'}
      >
        {isMuted || currentPercent === 0 ? (
          <VolumeX className={`w-4 h-4 ${isPaper ? 'opacity-60' : 'text-amber-500/80'}`} />
        ) : currentPercent < 45 ? (
          <Volume1 className="w-4 h-4" />
        ) : (
          <Volume2 className={`w-4 h-4 ${isPaper ? '' : 'text-amber-400'}`} />
        )}
      </button>

      {/* Expandable Draggable Slider Tray — Hidden inside the button until hover/tap */}
      <div
        className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'max-w-[150px] sm:max-w-[170px] opacity-100 ml-1 sm:ml-1.5 mr-1 pointer-events-auto'
            : 'max-w-0 opacity-0 ml-0 mr-0 pointer-events-none'
        }`}
      >
        {/* Draggable Volume Range Slider */}
        <div className="relative flex items-center w-16 sm:w-20 shrink-0">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={currentPercent}
            onChange={handleSliderChange}
            onMouseDown={() => {
              isDraggingRef.current = true;
            }}
            onMouseUp={() => {
              isDraggingRef.current = false;
            }}
            onTouchStart={() => {
              isDraggingRef.current = true;
            }}
            onTouchEnd={() => {
              isDraggingRef.current = false;
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-grab active:cursor-grabbing outline-none"
            style={{
              background: trackBackground,
            }}
            aria-label="Background Music Volume"
          />
          <style>{`
            .music-volume-control input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${isDark ? '#ffd470' : '#821e25'};
              border: 1.5px solid ${isDark ? '#000000' : '#f4ece1'};
              box-shadow: 0 1px 3px rgba(0,0,0,0.4);
              cursor: grab;
              transition: transform 0.1s ease;
            }
            .music-volume-control input[type=range]::-webkit-slider-thumb:active {
              transform: scale(1.25);
              cursor: grabbing;
            }
            .music-volume-control input[type=range]::-moz-range-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: ${isDark ? '#ffd470' : '#821e25'};
              border: 1.5px solid ${isDark ? '#000000' : '#f4ece1'};
              box-shadow: 0 1px 3px rgba(0,0,0,0.4);
              cursor: grab;
              transition: transform 0.1s ease;
            }
            .music-volume-control input[type=range]::-moz-range-thumb:active {
              transform: scale(1.25);
              cursor: grabbing;
            }
          `}</style>
        </div>

        {/* Percentage / Status Readout */}
        {showPercentage && (
          <span
            className={`font-cinzel text-[10px] sm:text-xs font-bold tracking-tight min-w-[26px] ml-1.5 text-right tabular-nums shrink-0 ${
              isMuted
                ? 'text-amber-500/70'
                : isPaper
                ? 'text-[#52290d]'
                : isDark
                ? 'text-zinc-300'
                : 'text-[#52290d]'
            }`}
          >
            {isMuted ? 'OFF' : `${currentPercent}%`}
          </span>
        )}
      </div>
    </div>
  );
};

export default MusicVolumeSlider;
