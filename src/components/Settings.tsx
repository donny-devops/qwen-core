import { TimerSettings } from '../hooks/usePomodoro';
import { X } from 'lucide-react';

interface SettingsProps {
  settings: TimerSettings;
  onUpdate: (settings: Partial<TimerSettings>) => void;
  onClose: () => void;
}

export function Settings({ settings, onUpdate, onClose }: SettingsProps) {
  return (
    <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white/90">⚙️ Settings</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid gap-5">
        {/* Duration Settings */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Focus (min)</label>
            <input
              type="number"
              min={1}
              max={120}
              value={settings.focusDuration}
              onChange={(e) => onUpdate({ focusDuration: Math.max(1, Math.min(120, parseInt(e.target.value) || 1)) })}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-center font-mono text-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Short Break</label>
            <input
              type="number"
              min={1}
              max={30}
              value={settings.shortBreakDuration}
              onChange={(e) => onUpdate({ shortBreakDuration: Math.max(1, Math.min(30, parseInt(e.target.value) || 1)) })}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-center font-mono text-lg focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Long Break</label>
            <input
              type="number"
              min={1}
              max={60}
              value={settings.longBreakDuration}
              onChange={(e) => onUpdate({ longBreakDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 1)) })}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-center font-mono text-lg focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
          </div>
        </div>

        {/* Long Break Interval */}
        <div>
          <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Long Break After (sessions)</label>
          <input
            type="number"
            min={2}
            max={10}
            value={settings.longBreakInterval}
            onChange={(e) => onUpdate({ longBreakInterval: Math.max(2, Math.min(10, parseInt(e.target.value) || 2)) })}
            className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-center font-mono text-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
        </div>

        {/* Auto-start toggles */}
        <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Auto-start breaks</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.autoStartBreaks}
                onChange={(e) => onUpdate({ autoStartBreaks: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-emerald-500/50 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Auto-start focus</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.autoStartFocus}
                onChange={(e) => onUpdate({ autoStartFocus: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-red-500/50 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
