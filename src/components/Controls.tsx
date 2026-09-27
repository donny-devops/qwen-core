import { TimerMode } from '../hooks/usePomodoro';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  mode: TimerMode;
}

export function Controls({ isRunning, onStart, onPause, onReset, mode }: ControlsProps) {
  const getButtonColor = () => {
    switch (mode) {
      case 'focus':
        return 'from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-red-500/30';
      case 'shortBreak':
        return 'from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-emerald-500/30';
      case 'longBreak':
        return 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-blue-500/30';
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Reset Button */}
      <button
        onClick={onReset}
        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
        aria-label="Reset timer"
      >
        <RotateCcw size={22} />
      </button>

      {/* Start/Pause Button */}
      <button
        onClick={isRunning ? onPause : onStart}
        className={`
          px-10 py-4 rounded-2xl font-semibold text-white text-lg
          bg-gradient-to-r ${getButtonColor()}
          shadow-xl transition-all duration-300
          hover:scale-105 active:scale-95
          flex items-center gap-3
        `}
      >
        {isRunning ? (
          <>
            <Pause size={22} fill="white" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play size={22} fill="white" />
            <span>Start</span>
          </>
        )}
      </button>

      {/* Spacer for symmetry */}
      <div className="w-12" />
    </div>
  );
}
