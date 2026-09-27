import { useLocalStorage } from '../hooks/useLocalStorage';
import { History, Calendar, Clock } from 'lucide-react';

interface Session {
  id: string;
  mode: string;
  duration: number; // in seconds
  completedAt: string;
  date: string;
}

export function useSessionHistory() {
  const [sessions, setSessions] = useLocalStorage<Session[]>('pomodoro-sessions', []);

  const addSession = (mode: string, duration: number) => {
    const session: Session = {
      id: Date.now().toString(),
      mode,
      duration,
      completedAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
    };
    setSessions(prev => [session, ...prev].slice(0, 100)); // Keep last 100 sessions
  };

  const getSessionsByDate = (date: string) => {
    return sessions.filter(s => s.date === date);
  };

  const getRecentSessions = (count: number = 10) => {
    return sessions.slice(0, count);
  };

  return { sessions, addSession, getSessionsByDate, getRecentSessions };
}

export function SessionHistory() {
  const { getRecentSessions } = useSessionHistory();
  const recentSessions = getRecentSessions(5);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getModeEmoji = (mode: string): string => {
    switch (mode) {
      case 'focus': return '🍅';
      case 'shortBreak': return '☕';
      case 'longBreak': return '🌿';
      default: return '⏱️';
    }
  };

  if (recentSessions.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
        <History size={14} />
        Recent Sessions
      </h3>

      <div className="space-y-2">
        {recentSessions.map(session => (
          <div
            key={session.id}
            className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5"
          >
            <span className="text-lg">{getModeEmoji(session.mode)}</span>
            <div className="flex-1">
              <div className="text-sm text-white/80 capitalize">
                {session.mode === 'focus' ? 'Focus' : session.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
              </div>
              <div className="text-xs text-white/40">
                {formatDateTime(session.completedAt)}
              </div>
            </div>
            <div className="text-sm text-white/60 font-mono">
              {formatTime(session.duration)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
