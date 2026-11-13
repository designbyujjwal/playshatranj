import React, { useState, useEffect } from 'react';
import { X, Sliders, RotateCcw, Activity, Zap, Shield, Sparkles, Check } from 'lucide-react';
import type { OneEuroFilterParams, HandTrackingState } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterParams: OneEuroFilterParams;
  trackingState: HandTrackingState;
  onUpdateFilterParams: (params: Partial<OneEuroFilterParams>) => void;
  onResetFilterParams: () => void;
}

interface PresetOption {
  id: string;
  name: string;
  description: string;
  badge: string;
  params: OneEuroFilterParams;
}

const PRESETS: PresetOption[] = [
  {
    id: 'smooth',
    name: 'Ultra Smooth',
    description: 'Maximum jitter suppression and steady pointer hold',
    badge: 'Low Jitter',
    params: { minCutoff: 0.5, beta: 0.005, dCutoff: 1.0 },
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Optimal balance of silky smoothing and low latency',
    badge: 'Recommended',
    params: { minCutoff: 1.2, beta: 0.015, dCutoff: 1.0 },
  },
  {
    id: 'responsive',
    name: 'High Responsiveness',
    description: 'Instant reaction speed for fast spatial moves',
    badge: 'Esports / Fast',
    params: { minCutoff: 2.8, beta: 0.045, dCutoff: 1.0 },
  },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  filterParams,
  trackingState,
  onUpdateFilterParams,
  onResetFilterParams,
}) => {
  const [activeTab, setActiveTab] = useState<'filter' | 'camera'>('filter');

  // Compute master sensitivity percentage (0% to 100%)
  // Based on minCutoff (0.2 -> 4.0) and beta (0.001 -> 0.08)
  const masterSensitivity = Math.round(
    Math.min(100, Math.max(0, ((filterParams.minCutoff - 0.2) / 3.8) * 50 + (filterParams.beta / 0.06) * 50))
  );

  // Determine which preset is currently active, if any
  const matchedPreset = PRESETS.find(
    (p) =>
      Math.abs(p.params.minCutoff - filterParams.minCutoff) < 0.05 &&
      Math.abs(p.params.beta - filterParams.beta) < 0.002
  );

  const handleMasterSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value); // 0 .. 100
    const ratio = val / 100;
    // Map ratio to minCutoff (0.3 Hz to 3.8 Hz) and beta (0.003 to 0.065)
    const newMinCutoff = parseFloat((0.3 + ratio * 3.5).toFixed(2));
    const newBeta = parseFloat((0.003 + ratio * 0.062).toFixed(4));
    onUpdateFilterParams({ minCutoff: newMinCutoff, beta: newBeta });
  };

  const handleApplyPreset = (preset: PresetOption) => {
    onUpdateFilterParams(preset.params);
  };

  if (!isOpen) return null;

  return (
    <div
      id="settings-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0603]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="settings-modal-content"
        className="relative w-full max-w-xl bg-[#f7f2e7]/98 border border-[#7d481b]/40 rounded-2xl shadow-[0_20px_60px_rgba(61,29,7,0.45)] overflow-hidden text-[#1f0d04]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#7d481b]/25 bg-[#ede3d2]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#821e25]/12 border border-[#821e25]/35 flex items-center justify-center text-[#821e25]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="font-cinzel text-[#821e25] text-[10px] font-bold tracking-[0.24em] uppercase block mb-0.5">
                &mdash; OPTICAL SENSITIVITY &mdash;
              </span>
              <h2 className="text-base font-cinzel font-bold text-[#1f0d04] tracking-tight">
                Kinematic Calibration
              </h2>
              <p className="text-xs font-cormorant italic text-[#5c3010]">1€ Filter responsiveness &amp; jitter dampening</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7d481b] hover:text-[#821e25] rounded-full hover:bg-[#ede3d2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Preset Selectors */}
          <div>
            <label className="text-xs font-cinzel font-bold text-[#5e310e] tracking-wider uppercase flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#821e25]" />
              Filter Presets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESETS.map((preset) => {
                const isSelected = matchedPreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className={`text-left p-3 rounded-xl border transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#821e25]/12 border-[#821e25]/60 shadow-[0_2px_12px_rgba(130,30,37,0.15)]'
                        : 'bg-[#ede3d2]/60 border-[#7d481b]/25 hover:bg-[#ede3d2] hover:border-[#7d481b]/45'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-cinzel font-bold text-[#1f0d04]">{preset.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#821e25]" />}
                    </div>
                    <span className="text-[10px] font-cinzel font-semibold text-[#821e25] block mb-1">{preset.badge}</span>
                    <p className="text-[11px] font-cormorant text-[#3d1d07] leading-snug">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Master Sensitivity Slider */}
          <div className="p-4 bg-[#ede3d2]/60 border border-[#7d481b]/30 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#821e25]" />
                <span className="text-xs font-cinzel font-bold text-[#1f0d04]">Master Sensitivity</span>
              </div>
              <span className="text-xs font-cinzel font-bold text-[#821e25] bg-[#821e25]/10 px-2 py-0.5 rounded border border-[#821e25]/30">
                {masterSensitivity}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={masterSensitivity}
              onChange={handleMasterSliderChange}
              className="w-full h-2 bg-[#dfd0ba] rounded-lg appearance-none cursor-pointer accent-[#821e25]"
            />

            <div className="flex justify-between text-[11px] font-cormorant italic text-[#5c3010]">
              <span>Silky / Steady (0%)</span>
              <span>Balanced (50%)</span>
              <span>Hyper-Fast (100%)</span>
            </div>
          </div>

          {/* Granular One-Euro Filter Parameters */}
          <div className="space-y-4 pt-2 border-t border-[#7d481b]/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-cinzel font-bold text-[#5e310e] tracking-wider uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#821e25]" />
                Granular Kinetic Tuning
              </label>
              <button
                onClick={onResetFilterParams}
                className="text-[11px] font-cinzel text-[#7d481b] hover:text-[#821e25] flex items-center gap-1 cursor-pointer hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            {/* Min Cutoff (f_c_min) Slider */}
            <div className="p-3.5 bg-[#ede3d2]/50 border border-[#7d481b]/25 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-cinzel font-semibold text-[#1f0d04]">Minimum Cutoff Frequency (f_c,min)</span>
                  <p className="text-[10px] font-cormorant italic text-[#5c3010]">Suppresses jitter when hand is stationary or moving slowly.</p>
                </div>
                <span className="text-xs font-cinzel font-bold text-[#821e25] bg-[#821e25]/10 px-2 py-0.5 rounded border border-[#821e25]/25">
                  {filterParams.minCutoff.toFixed(2)} Hz
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="4.0"
                step="0.05"
                value={filterParams.minCutoff}
                onChange={(e) => onUpdateFilterParams({ minCutoff: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#dfd0ba] rounded-lg appearance-none cursor-pointer accent-[#821e25]"
              />
              <div className="flex justify-between text-[10px] font-cormorant text-[#7d481b]">
                <span>0.10 Hz (Ultra stable)</span>
                <span>4.00 Hz (Raw / Quick)</span>
              </div>
            </div>

            {/* Beta (Speed coefficient) Slider */}
            <div className="p-3.5 bg-[#ede3d2]/50 border border-[#7d481b]/25 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-cinzel font-semibold text-[#1f0d04]">Speed Coefficient (Beta - β)</span>
                  <p className="text-[10px] font-cormorant italic text-[#5c3010]">Reduces latency during rapid sweeps and hand movement.</p>
                </div>
                <span className="text-xs font-cinzel font-bold text-[#821e25] bg-[#821e25]/10 px-2 py-0.5 rounded border border-[#821e25]/25">
                  {filterParams.beta.toFixed(4)}
                </span>
              </div>
              <input
                type="range"
                min="0.001"
                max="0.08"
                step="0.001"
                value={filterParams.beta}
                onChange={(e) => onUpdateFilterParams({ beta: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#dfd0ba] rounded-lg appearance-none cursor-pointer accent-[#821e25]"
              />
              <div className="flex justify-between text-[10px] font-cormorant text-[#7d481b]">
                <span>0.0010 (Maximum damping)</span>
                <span>0.0800 (Zero lag)</span>
              </div>
            </div>

            {/* Derivative Cutoff (f_c_d) Slider */}
            <div className="p-3.5 bg-[#ede3d2]/50 border border-[#7d481b]/25 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-cinzel font-semibold text-[#1f0d04]">Derivative Cutoff (f_c,d)</span>
                  <p className="text-[10px] font-cormorant italic text-[#5c3010]">Low-pass filtering frequency for velocity estimations.</p>
                </div>
                <span className="text-xs font-cinzel font-bold text-[#821e25] bg-[#821e25]/10 px-2 py-0.5 rounded border border-[#821e25]/25">
                  {filterParams.dCutoff.toFixed(2)} Hz
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={filterParams.dCutoff}
                onChange={(e) => onUpdateFilterParams({ dCutoff: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#dfd0ba] rounded-lg appearance-none cursor-pointer accent-[#821e25]"
              />
              <div className="flex justify-between text-[10px] font-cormorant text-[#7d481b]">
                <span>0.20 Hz</span>
                <span>2.50 Hz</span>
              </div>
            </div>
          </div>

          {/* Live Interactive Verification Canvas / Trackpad */}
          <div className="p-4 bg-[#ede3d2]/60 border border-[#7d481b]/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-cinzel font-bold text-[#1f0d04]">Live Kinematic Feedback</span>
              <div className="flex items-center gap-2 font-cinzel text-[11px]">
                <span className="text-[#5c3010]">Hand:</span>
                <span className={trackingState.isHandDetected ? 'text-[#821e25] font-bold' : 'text-[#7d481b]'}>
                  {trackingState.isHandDetected ? 'PERCEIVED' : 'NONE'}
                </span>
                <span className="text-[#5c3010] ml-2">FPS:</span>
                <span className="text-[#821e25] font-bold">{trackingState.fps || 30}</span>
              </div>
            </div>

            <div className="relative h-28 w-full bg-[#f4ece1] border border-[#7d481b]/35 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Laid paper grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#7d481b12_1px,transparent_1px),linear-gradient(to_bottom,#7d481b12_1px,transparent_1px)] bg-[size:16px_16px]" />

              {trackingState.isHandDetected ? (
                <>
                  {/* Live Pointer Dot */}
                  <div
                    className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-[#821e25] border-2 border-[#fff6e3] shadow-[0_0_12px_rgba(130,30,37,0.6)] transition-transform duration-75 pointer-events-none flex items-center justify-center"
                    style={{
                      left: `${trackingState.cursorPosition2D.x * 100}%`,
                      top: `${trackingState.cursorPosition2D.y * 100}%`,
                      transform: trackingState.isPinching ? 'scale(1.3)' : 'scale(1)',
                    }}
                  >
                    {trackingState.isPinching && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                    )}
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-cinzel text-[#5c3010]">
                    Pos: ({trackingState.cursorPosition2D.x.toFixed(2)}, {trackingState.cursorPosition2D.y.toFixed(2)}) &bull; Pinch: {trackingState.isPinching ? 'PINCHING' : 'OPEN'}
                  </span>
                </>
              ) : (
                <div className="text-center text-xs font-cormorant italic text-[#7d481b]">
                  <span>Raise hand in front of camera to test tracking response live</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-[#7d481b]/25 bg-[#ede3d2]/50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#7a181e] via-[#942028] to-[#7a181e] hover:from-[#8f1e25] hover:via-[#ad2730] hover:to-[#8f1e25] text-[#fff6e3] border border-[#d4af37]/70 text-xs font-cinzel tracking-wider uppercase font-bold rounded-lg shadow-lg shadow-[#821e25]/25 transition-all cursor-pointer"
          >
            Apply &bull; Close
          </button>
        </div>
      </div>
    </div>
  );
};
