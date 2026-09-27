import { TimerMode } from '../hooks/usePomodoro';

interface TimerProps {
  timeLeft: number;
  mode: TimerMode;
  totalDuration: number;
  isRunning: boolean;
}

export function Timer({ timeLeft, mode, totalDuration, isRunning }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - (timeLeft / totalDuration);
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference * (1 - progress);

  const getColors = () => {
    switch (mode) {
      case 'focus':
        return { ring: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)', bg: 'rgba(239, 68, 68, 0.05)' };
      case 'shortBreak':
        return { ring: '#10b981', glow: 'rgba(16, 185, 129, 0.3)', bg: 'rgba(16, 185, 129, 0.05)' };
      case 'longBreak':
        return { ring: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)', bg: 'rgba(59, 130, 246, 0.05)' };
    }
  };

  const colors = getColors();

  return (
    <div className="relative flex items-center justify-center my-4">
      {/* Outer glow */}
      <div
        className="absolute w-80 h-80 rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          opacity: isRunning ? 0.6 : 0.2,
        }}
      />

      {/* SVG Progress Ring */}
      <svg className="w-72 h-72 -rotate-90 transform" viewBox="0 0 300 300">
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke={colors.ring}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.glow})`,
          }}
        />
      </svg>

      {/* Time Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-7xl font-mono font-bold text-white tracking-wider tabular-nums">
          {String(minutes).padStart(2, '0')}
          <span className={`${isRunning ? 'animate-pulse' : ''}`}>:</span>
          {String(seconds).padStart(2, '0')}
        </div>
        <div className="mt-2 text-sm text-white/40 uppercase tracking-widest font-medium">
          {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </div>
      </div>
    </div>
  );
}
