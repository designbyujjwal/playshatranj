import React from 'react';
import type { BotDifficulty } from '../types';
import { Cpu, Zap } from 'lucide-react';

interface EngineTelemetryProps {
  score?: string;
  depth?: number;
  botDifficulty?: BotDifficulty;
  currentTurn?: 'w' | 'b';
  isInCheck?: boolean;
  isBotThinking?: boolean;
  isBotMoving?: boolean;
}

export const EngineTelemetry: React.FC<EngineTelemetryProps> = ({
  score = '+0.82',
  depth,
  botDifficulty = 'medium',
  currentTurn,
  isInCheck,
  isBotThinking = false,
  isBotMoving = false,
}) => {
  const depthValue =
    depth ||
    (botDifficulty === 'master'
      ? 28
      : botDifficulty === 'hard'
      ? 22
      : botDifficulty === 'medium'
      ? 16
      : 10);

  const nodesSpeed =
    botDifficulty === 'master'
      ? '2.4M/s'
      : botDifficulty === 'hard'
      ? '1.8M/s'
      : botDifficulty === 'medium'
      ? '1.2M/s'
      : '650K/s';

  return (
    <div
      id="engine-telemetry-panel"
      className={`border backdrop-blur-xl rounded-xl p-4 shadow-2xl transition-all w-64 sm:w-72 ${
        isBotThinking
          ? 'bg-blue-950/40 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
          : isBotMoving
          ? 'bg-emerald-950/40 border-emerald-500/40'
          : 'bg-black/40 border-white/10'
      }`}
    >
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-1.5">
          <Cpu className={`w-3.5 h-3.5 ${isBotThinking ? 'text-blue-400 animate-spin' : 'text-white/40'}`} />
          <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
            {isBotThinking ? 'AI Engine (Thinking)' : isBotMoving ? 'AI Engine (Moving)' : 'Stockfish Engine'}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-blue-400">{score}</span>
      </div>

      {/* Engine Dynamic Status Banner */}
      {isBotThinking && (
        <div className="mb-2 px-2 py-1 bg-blue-500/15 border border-blue-500/30 rounded flex items-center justify-between text-[10px] font-mono text-blue-300">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            Analyzing lines...
          </span>
          <span className="text-blue-200/80">{botDifficulty.toUpperCase()}</span>
        </div>
      )}

      {isBotMoving && (
        <div className="mb-2 px-2 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded flex items-center justify-between text-[10px] font-mono text-emerald-300">
          <span className="flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-emerald-400" />
            Executing 3D arc...
          </span>
          <span className="text-emerald-200/80">SMOOTH</span>
        </div>
      )}

      {/* Engine Balance Bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
        <div className="h-full bg-white w-1/2 transition-all duration-300" />
        <div className="h-full bg-blue-600 w-[12%] transition-all duration-300" />
      </div>

      <div className="mt-3.5 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-white/40 text-[11px]">Depth</span>
          <span className="font-mono text-white/90 text-[11px]">{depthValue} ply</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/40 text-[11px]">Calculation Speed</span>
          <span className="font-mono text-white/90 text-[11px]">{nodesSpeed}</span>
        </div>
      </div>
    </div>
  );
};
