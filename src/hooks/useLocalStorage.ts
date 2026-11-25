import { useState, useEffect, useCallback } from 'react';

function positiveDuration(value: number): number | null {
  if (!Number.isFinite(value) || value <= 0 || value > 24 * 60 * 60) return null;
  return Math.trunc(value);
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (e) {
        console.warn('localStorage write failed:', e);
      }
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue];
}

export function useTodayStats() {
  const todayKey = new Date().toISOString().split('T')[0];
  const empty = {
    date: todayKey,
    focusSessions: 0,
    totalFocusSeconds: 0,
    completedPomodoros: 0,
  };
  const [stats, setStats] = useLocalStorage<{
    date: string;
    focusSessions: number;
    totalFocusSeconds: number;
    completedPomodoros: number;
  }>('pomodoro-stats', empty);

  // Reset stats if it's a new day or the stored shape is unusable.
  useEffect(() => {
    if (!stats || typeof stats.date !== 'string' || stats.date !== todayKey) {
      setStats(empty);
    }
  }, [todayKey, stats, setStats]);

  const addFocusSession = useCallback((durationSeconds: number) => {
    const duration = positiveDuration(durationSeconds);
    if (duration === null) return;
    setStats(prev => ({
      ...prev,
      focusSessions: prev.focusSessions + 1,
      totalFocusSeconds: prev.totalFocusSeconds + duration,
      completedPomodoros: prev.completedPomodoros + 1,
    }));
  }, [setStats]);

  const addPartialFocus = useCallback((durationSeconds: number) => {
    const duration = positiveDuration(durationSeconds);
    if (duration === null) return;
    setStats(prev => ({
      ...prev,
      totalFocusSeconds: prev.totalFocusSeconds + duration,
    }));
  }, [setStats]);

  return { stats, addFocusSession, addPartialFocus };
}
