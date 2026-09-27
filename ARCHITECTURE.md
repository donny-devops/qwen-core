# 🏗️ Architecture

This document describes the technical architecture of QwenCore.

## System Overview

QwenCore is a **100% client-side** Progressive Web Application (PWA) built with modern web technologies. It follows a component-based architecture with custom hooks for state management and localStorage for data persistence.

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Environment                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                     │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           App Component                      │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │         Custom Hooks                   │  │  │  │
│  │  │  │  • usePomodoro (timer logic)          │  │  │  │
│  │  │  │  • useLocalStorage (persistence)      │  │  │  │
│  │  │  │  • useTodayStats (statistics)         │  │  │  │
│  │  │  │  • useSessionHistory (history)        │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │         UI Components                  │  │  │  │
│  │  │  │  • Timer • Controls • ModeSelector    │  │  │  │
│  │  │  │  • Settings • Stats • TaskList        │  │  │  │
│  │  │  │  • SessionHistory                     │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Browser APIs                          │  │
│  │  • localStorage • Notifications • Web Audio API   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Framework
- **React 18.2** - Component-based UI library
- **TypeScript 5.0** - Static type checking
- **Vite 6.4** - Build tool and dev server

### Styling
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Custom CSS** - Animations and special effects

### State Management
- **React Hooks** - Component state
- **Custom Hooks** - Business logic encapsulation
- **localStorage** - Persistent storage

### Build & Development
- **Vite** - Fast build tool with HMR
- **TypeScript** - Type safety
- **ESLint** - Code linting (recommended)
- **Prettier** - Code formatting (recommended)

## Component Architecture

### Component Hierarchy

```
App
├── Header
│   ├── Logo & Title
│   ├── Sound Toggle
│   ├── Keyboard Shortcuts Button
│   └── Settings Button
├── Keyboard Shortcuts Panel (conditional)
├── ModeSelector
│   ├── Focus Tab
│   ├── Short Break Tab
│   └── Long Break Tab
├── Timer
│   ├── Progress Ring (SVG)
│   ├── Time Display
│   └── Mode Label
├── Controls
│   ├── Reset Button
│   └── Start/Pause Button
├── Session Counter
├── Settings Panel (conditional)
│   ├── Duration Inputs
│   ├── Interval Input
│   └── Auto-start Toggles
├── TaskList
│   ├── Add Task Input
│   ├── Active Tasks
│   └── Completed Tasks (collapsible)
├── SessionHistory
│   └── Recent Sessions List
└── Stats
    ├── Focus Time
    ├── Pomodoros Completed
    ├── Sessions Count
    └── Daily Goal Progress
```

### Component Responsibilities

#### App.tsx
- Root component
- Global state orchestration
- Keyboard shortcut handling
- Document title updates
- Notification management

#### Timer.tsx
- Visual timer display
- Progress ring animation
- Time formatting
- Mode-specific styling

#### Controls.tsx
- Start/Pause/Reset buttons
- Mode-specific button colors
- Button state management

#### ModeSelector.tsx
- Mode tabs (Focus/Short Break/Long Break)
- Active mode indication
- Mode switching

#### Settings.tsx
- Duration configuration
- Auto-start toggles
- Settings validation
- Real-time updates

#### Stats.tsx
- Daily statistics display
- Progress visualization
- Time formatting
- Goal tracking

#### TaskList.tsx
- Task CRUD operations
- Task completion tracking
- Pomodoro assignment
- Persistent storage

#### SessionHistory.tsx
- Recent sessions display
- Time-ago formatting
- Mode indicators
- Duration display

## Custom Hooks

### usePomodoro
Core timer logic hook.

**Responsibilities:**
- Timer state management
- Mode transitions
- Session counting
- Settings persistence
- Callback handling

**State:**
```typescript
{
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessionCount: number;
  currentSessionElapsed: number;
}
```

**Actions:**
- `start()` - Start timer
- `pause()` - Pause timer
- `reset()` - Reset current mode
- `switchMode(mode)` - Change mode
- `updateSettings(settings)` - Update configuration

### useLocalStorage
Persistent state hook.

**Responsibilities:**
- localStorage read/write
- JSON serialization
- Error handling
- Type safety

**API:**
```typescript
const [value, setValue] = useLocalStorage<T>(key, initialValue);
```

### useTodayStats
Daily statistics hook.

**Responsibilities:**
- Track focus sessions
- Calculate total focus time
- Count completed pomodoros
- Auto-reset on new day

**Data:**
```typescript
{
  date: string;
  focusSessions: number;
  totalFocusSeconds: number;
  completedPomodoros: number;
}
```

### useSessionHistory
Session tracking hook.

**Responsibilities:**
- Store completed sessions
- Limit history size
- Query by date
- Recent sessions retrieval

## Data Flow

### Timer Flow
```
User Action → App Component → usePomodoro Hook → State Update → UI Re-render
     ↑                                                              ↓
     └──────────── Keyboard/Mouse Events ←──────────────────────────┘
```

### Persistence Flow
```
State Change → useLocalStorage → JSON.stringify → localStorage.setItem
                                                         ↓
Page Load → useLocalStorage → localStorage.getItem → JSON.parse → State Init
```

### Statistics Flow
```
Timer Complete → onFocusComplete callback → useTodayStats → State Update → localStorage
```

## State Management

### Local Component State
- UI toggles (showSettings, showShortcuts)
- Form inputs (newTask)
- Temporary state

### Global State (via Hooks)
- Timer state (usePomodoro)
- Settings (useLocalStorage)
- Statistics (useTodayStats)
- Tasks (useLocalStorage)
- Session history (useLocalStorage)

### State Persistence
All persistent state uses localStorage with these keys:
- `pomodoro-settings` - Timer configuration
- `pomodoro-stats` - Daily statistics
- `pomodoro-tasks` - Task list
- `pomodoro-sessions` - Session history
- `pomodoro-sound-enabled` - Sound preference

## Performance Considerations

### Render Optimization
- **React.memo** - Prevent unnecessary re-renders
- **useCallback** - Memoize event handlers
- **useMemo** - Memoize expensive calculations
- **Key prop** - Efficient list rendering

### Timer Performance
- Single setInterval for timer
- State updates only affect Timer component
- Progress ring uses CSS transitions
- No DOM manipulation

### localStorage Performance
- Read once on initialization
- Write on state change
- JSON serialization overhead minimal
- 5-10MB limit not a concern

### Bundle Size
- Tree shaking enabled (Vite)
- Tailwind CSS purged
- Icons individually imported
- Target: <200KB gzipped

## Security Architecture

### Client-Side Only
- No backend server
- No API endpoints
- No authentication
- No data transmission

### Data Protection
- All data stored locally
- No third-party services
- No analytics/tracking
- No cookies

### Input Validation
- TypeScript type checking
- Input sanitization (React)
- No eval() or innerHTML
- Safe JSON parsing

### Browser Security
- HTTPS recommended
- CSP headers (if deployed)
- Secure localStorage access
- No XSS vulnerabilities

## Accessibility

### Keyboard Navigation
- All interactive elements focusable
- Keyboard shortcuts for main actions
- Tab order logical
- Focus indicators visible

### Screen Readers
- Semantic HTML
- ARIA labels for icons
- Live regions for timer
- Descriptive button text

### Visual Accessibility
- High contrast colors
- Scalable text
- Clear focus states
- Reduced motion support

## Testing Strategy

### Manual Testing
- Timer accuracy
- State persistence
- Keyboard shortcuts
- Responsive design
- Cross-browser compatibility

### Automated Testing (Future)
- Unit tests for hooks
- Component tests with React Testing Library
- E2E tests with Playwright
- Visual regression tests

### Performance Testing
- Lighthouse audits
- Bundle size monitoring
- Render performance
- Memory leaks

## Deployment

### Build Process
```bash
npm run build
```

Output:
- `dist/index.html` - Main HTML
- `dist/assets/*.js` - JavaScript bundle
- `dist/assets/*.css` - CSS bundle

### Hosting Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: Cloudflare Pages, AWS CloudFront
- **Self-hosted**: Any web server

### Environment
- No environment variables needed
- No build-time configuration
- Works on any static host
- No server-side processing

## Monitoring & Analytics

### Current Approach
- No analytics (privacy-first)
- Manual error reporting
- GitHub issues for bugs
- User feedback via email

### Future Monitoring
- Error tracking (optional, opt-in)
- Performance metrics (local only)
- Usage statistics (opt-in, anonymous)
- Crash reporting (optional)

## Scalability

### Current Limits
- localStorage: 5-10MB
- Session history: 100 entries
- Single browser/device
- No concurrent users

### Scaling Strategy
- Keep client-side only
- Optional cloud sync (v2.0)
- Efficient data structures
- Lazy loading if needed

## Maintenance

### Dependencies
- Regular updates (monthly)
- Security patches (immediate)
- Breaking changes (careful migration)
- Version pinning for stability

### Code Quality
- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Code reviews

### Documentation
- README.md (user guide)
- Inline code comments
- JSDoc for public APIs
- Architecture docs (this file)

## Future Architecture Considerations

### PWA Enhancement
- Service worker for offline
- App manifest for installability
- Push notifications
- Background sync

### Plugin System
- Custom timer modes
- Third-party integrations
- Theme marketplace
- Extension API

### Micro-Frontend (If Needed)
- Component library extraction
- Independent deployment
- Shared design system
- Version management

---

**Last Updated**: 2026-01-20
**Architecture Version**: 1.0.0
**Next Review**: 2026-03-20
