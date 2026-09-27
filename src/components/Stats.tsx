import { Clock, Target, Flame } from 'lucide-react';

interface StatsProps {
  stats: {
    date: string;
    focusSessions: number;
    totalFocusSeconds: number;
    completedPomodoros: number;
  };
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Clock size={14} />
        Today's Focus
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Total Focus Time */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Clock size={18} className="text-purple-400" />
            </div>
          </div>
          <div className="text-xl font-bold text-white/90 font-mono">
            {formatTime(stats.totalFocusSeconds)}
          </div>
          <div className="text-xs text-white/40 mt-1">Focus Time</div>
        </div>

        {/* Completed Pomodoros */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
              <Target size={18} className="text-red-400" />
            </div>
          </div>
          <div className="text-xl font-bold text-white/90 font-mono">
            {stats.completedPomodoros}
          </div>
          <div className="text-xs text-white/40 mt-1">Pomodoros</div>
        </div>

        {/* Sessions */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Flame size={18} className="text-amber-400" />
            </div>
          </div>
          <div className="text-xl font-bold text-white/90 font-mono">
            {stats.focusSessions}
          </div>
          <div className="text-xs text-white/40 mt-1">Sessions</div>
        </div>
      </div>

      {/* Progress bar for daily goal (8 pomodoros) */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40">Daily Goal</span>
          <span className="text-xs text-white/60 font-mono">{stats.completedPomodoros}/8</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, (stats.completedPomodoros / 8) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
