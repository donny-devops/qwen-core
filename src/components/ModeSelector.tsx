import { TimerMode } from '../hooks/usePomodoro';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  isRunning: boolean;
}

const modes: { key: TimerMode; label: string; emoji: string }[] = [
  { key: 'focus', label: 'Focus', emoji: '🍅' },
  { key: 'shortBreak', label: 'Short Break', emoji: '☕' },
  { key: 'longBreak', label: 'Long Break', emoji: '🌿' },
];

export function ModeSelector({ currentMode, onModeChange, isRunning }: ModeSelectorProps) {
  return (
    <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      {modes.map(({ key, label, emoji }) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
            ${currentMode === key
              ? key === 'focus'
                ? 'bg-red-500/20 text-red-300 shadow-lg shadow-red-500/10 border border-red-500/30'
                : key === 'shortBreak'
                ? 'bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/10 border border-emerald-500/30'
                : 'bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/30'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }
          `}
        >
          <span className="mr-1.5">{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
