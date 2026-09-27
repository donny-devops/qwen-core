import { useState, useEffect, useCallback } from 'react';
import { usePomodoro } from './hooks/usePomodoro';
import { useTodayStats, useLocalStorage } from './hooks/useLocalStorage';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { ModeSelector } from './components/ModeSelector';
import { Settings } from './components/Settings';
import { Stats } from './components/Stats';
import { TaskList } from './components/TaskList';
import { SessionHistory, useSessionHistory } from './components/SessionHistory';
import { Settings as SettingsIcon, Keyboard, Volume2, VolumeX } from 'lucide-react';
import { playNotificationSound } from './utils/sounds';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage('pomodoro-sound-enabled', true);
  const { stats, addFocusSession, addPartialFocus } = useTodayStats();
  const { addSession } = useSessionHistory();
  
  const handleFocusComplete = useCallback((duration: number) => {
    addFocusSession(duration);
    addSession('focus', duration);
    
    if (soundEnabled) {
      playNotificationSound();
    }
    
    // Browser notification
    if (Notification.permission === 'granted') {
      new Notification('🍅 Focus session complete!', {
        body: 'Great work! Time for a break.',
        icon: '🍅',
      });
    }
  }, [addFocusSession, addSession, soundEnabled]);

  const {
    state,
    settings,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
    getDurationForMode,
  } = usePomodoro(handleFocusComplete, addPartialFocus);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          state.isRunning ? pause() : start();
          break;
        case 'KeyR':
          if (!e.ctrlKey && !e.metaKey) reset();
          break;
        case 'Digit1':
          switchMode('focus');
          break;
        case 'Digit2':
          switchMode('shortBreak');
          break;
        case 'Digit3':
          switchMode('longBreak');
          break;
        case 'KeyS':
          if (!e.ctrlKey && !e.metaKey) setShowSettings(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isRunning, start, pause, reset, switchMode]);

  // Update document title with timer
  useEffect(() => {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const modeLabel = state.mode === 'focus' ? '🍅 Focus' : state.mode === 'shortBreak' ? '☕ Short Break' : '🌿 Long Break';
    document.title = state.isRunning 
      ? `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - ${modeLabel}`
      : 'QwenCore - Pomodoro Timer';
  }, [state.timeLeft, state.isRunning, state.mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold text-white/90 tracking-tight leading-tight">
              🍅 QwenCore
            </h1>
            <p className="text-xs text-white/40 tracking-wider uppercase font-medium mt-0.5">
              Pomodoro Web Tool
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
              title={soundEnabled ? "Mute sound" : "Unmute sound"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts"
            >
              <Keyboard size={20} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Settings"
            >
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        {showShortcuts && (
          <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 text-sm">
            <div className="grid grid-cols-2 gap-2 text-white/60">
              <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">Space</kbd> Start/Pause</div>
              <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">R</kbd> Reset</div>
              <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">1</kbd> Focus mode</div>
              <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">2</kbd> Short break</div>
              <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">3</kbd> Long break</div>
              <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">S</kbd> Settings</div>
            </div>
          </div>
        )}

        {/* Mode Selector */}
        <ModeSelector
          currentMode={state.mode}
          onModeChange={switchMode}
          isRunning={state.isRunning}
        />

        {/* Timer Display */}
        <Timer
          timeLeft={state.timeLeft}
          mode={state.mode}
          totalDuration={getDurationForMode(state.mode)}
          isRunning={state.isRunning}
        />

        {/* Controls */}
        <Controls
          isRunning={state.isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
          mode={state.mode}
        />

        {/* Session counter */}
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <span>Session {state.sessionCount + 1}</span>
          <span>•</span>
          <span>{settings.longBreakInterval - (state.sessionCount % settings.longBreakInterval)} until long break</span>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Settings
            settings={settings}
            onUpdate={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}

        {/* Task List */}
        <TaskList />

        {/* Session History */}
        <SessionHistory />

        {/* Stats */}
        <Stats stats={stats} />
      </div>
    </div>
  );
}

export default App;
