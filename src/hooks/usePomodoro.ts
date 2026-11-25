import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  focusDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // after how many focus sessions
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number; // in seconds
  isRunning: boolean;
  sessionCount: number;
  currentSessionElapsed: number; // seconds elapsed in current focus session
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
};

function clampInt(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

function sanitizeSettings(input: Partial<TimerSettings> | null | undefined): TimerSettings {
  const source = { ...DEFAULT_SETTINGS, ...(input ?? {}) };
  return {
    focusDuration: clampInt(source.focusDuration, 1, 180, DEFAULT_SETTINGS.focusDuration),
    shortBreakDuration: clampInt(source.shortBreakDuration, 1, 60, DEFAULT_SETTINGS.shortBreakDuration),
    longBreakDuration: clampInt(source.longBreakDuration, 1, 60, DEFAULT_SETTINGS.longBreakDuration),
    longBreakInterval: clampInt(source.longBreakInterval, 1, 12, DEFAULT_SETTINGS.longBreakInterval),
    autoStartBreaks: Boolean(source.autoStartBreaks),
    autoStartFocus: Boolean(source.autoStartFocus),
  };
}

export function usePomodoro(onFocusComplete: (duration: number) => void, onPartialFocus: (duration: number) => void) {
  const [storedSettings, setStoredSettings] = useLocalStorage<TimerSettings>('pomodoro-settings', DEFAULT_SETTINGS);
  const settings = useMemo(() => sanitizeSettings(storedSettings), [storedSettings]);
  const [state, setState] = useState<TimerState>(() => ({
    mode: 'focus',
    timeLeft: DEFAULT_SETTINGS.focusDuration * 60,
    isRunning: false,
    sessionCount: 0,
    currentSessionElapsed: 0,
  }));

  const intervalRef = useRef<number | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getDurationForMode = useCallback((mode: TimerMode): number => {
    switch (mode) {
      case 'focus': return settings.focusDuration * 60;
      case 'shortBreak': return settings.shortBreakDuration * 60;
      case 'longBreak': return settings.longBreakDuration * 60;
    }
  }, [settings]);

  useEffect(() => {
    setState(prev => {
      if (prev.isRunning || prev.currentSessionElapsed !== 0) return prev;
      const duration = getDurationForMode(prev.mode);
      if (prev.timeLeft === duration) return prev;
      return { ...prev, timeLeft: duration };
    });
  }, [getDurationForMode]);

  // Timer tick
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            // Timer completed
            const completedMode = prev.mode;

            if (completedMode === 'focus') {
              onFocusComplete(settings.focusDuration * 60);
            }

            // Determine next mode
            let nextMode: TimerMode;
            let nextSessionCount = prev.sessionCount;

            if (completedMode === 'focus') {
              nextSessionCount = prev.sessionCount + 1;
              if (nextSessionCount % settings.longBreakInterval === 0) {
                nextMode = 'longBreak';
              } else {
                nextMode = 'shortBreak';
              }
            } else {
              nextMode = 'focus';
            }

            const nextDuration = getDurationForMode(nextMode);
            const shouldAutoStart = (nextMode === 'focus' && settings.autoStartFocus) ||
              (nextMode !== 'focus' && settings.autoStartBreaks);

            return {
              mode: nextMode,
              timeLeft: nextDuration,
              isRunning: shouldAutoStart,
              sessionCount: nextSessionCount,
              currentSessionElapsed: nextMode === 'focus' ? 0 : prev.currentSessionElapsed,
            };
          }

          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
            currentSessionElapsed: prev.mode === 'focus' ? prev.currentSessionElapsed + 1 : prev.currentSessionElapsed,
          };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, onFocusComplete, settings, getDurationForMode]);

  const start = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => {
      // Track partial focus time
      if (prev.mode === 'focus' && prev.currentSessionElapsed > 0) {
        onPartialFocus(prev.currentSessionElapsed);
      }
      return { ...prev, isRunning: false };
    });
  }, [onPartialFocus]);

  const reset = useCallback(() => {
    setState(prev => {
      // Track partial focus time on reset
      if (prev.mode === 'focus' && prev.currentSessionElapsed > 0 && prev.isRunning) {
        onPartialFocus(prev.currentSessionElapsed);
      }
      return {
        ...prev,
        timeLeft: getDurationForMode(prev.mode),
        isRunning: false,
        currentSessionElapsed: prev.mode === 'focus' ? 0 : prev.currentSessionElapsed,
      };
    });
  }, [getDurationForMode, onPartialFocus]);

  const switchMode = useCallback((mode: TimerMode) => {
    setState(prev => {
      // Track partial focus time on mode switch
      if (prev.mode === 'focus' && prev.currentSessionElapsed > 0 && prev.isRunning) {
        onPartialFocus(prev.currentSessionElapsed);
      }
      return {
        mode,
        timeLeft: getDurationForMode(mode),
        isRunning: false,
        sessionCount: prev.sessionCount,
        currentSessionElapsed: 0,
      };
    });
  }, [getDurationForMode, onPartialFocus]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setStoredSettings(prev => {
      const updated = sanitizeSettings({ ...prev, ...newSettings });
      setState(current => {
        if (current.isRunning || current.currentSessionElapsed !== 0) return current;
        const minutes = current.mode === 'focus'
          ? updated.focusDuration
          : current.mode === 'shortBreak'
            ? updated.shortBreakDuration
            : updated.longBreakDuration;
        return { ...current, timeLeft: minutes * 60 };
      });
      return updated;
    });
  }, [setStoredSettings]);

  return {
    state,
    settings,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
    getDurationForMode,
  };
}
