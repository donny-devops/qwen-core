import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
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
  const [stats, setStats] = useLocalStorage<{
    date: string;
    focusSessions: number;
    totalFocusSeconds: number;
    completedPomodoros: number;
  }>('pomodoro-stats', {
    date: todayKey,
    focusSessions: 0,
    totalFocusSeconds: 0,
    completedPomodoros: 0,
  });

  // Reset stats if it's a new day
  useEffect(() => {
    if (stats.date !== todayKey) {
      setStats({
        date: todayKey,
        focusSessions: 0,
        totalFocusSeconds: 0,
        completedPomodoros: 0,
      });
    }
  }, [todayKey, stats.date, setStats]);

  const addFocusSession = useCallback((durationSeconds: number) => {
    setStats(prev => ({
      ...prev,
      focusSessions: prev.focusSessions + 1,
      totalFocusSeconds: prev.totalFocusSeconds + durationSeconds,
      completedPomodoros: prev.completedPomodoros + 1,
    }));
  }, [setStats]);

  const addPartialFocus = useCallback((durationSeconds: number) => {
    setStats(prev => ({
      ...prev,
      totalFocusSeconds: prev.totalFocusSeconds + durationSeconds,
    }));
  }, [setStats]);

  return { stats, addFocusSession, addPartialFocus };
}
