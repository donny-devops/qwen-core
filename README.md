# 🍅 QwenCore - Pomodoro Web Tool

A beautiful, feature-rich Pomodoro timer application built with React, TypeScript, and Tailwind CSS. Enhance your productivity with focused work sessions and intelligent break management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue.svg)

## ✨ Features

### Core Functionality
- 🍅 **Focus Mode** - Dedicated work sessions (default: 25 minutes)
- ☕ **Short Breaks** - Quick rest periods (default: 5 minutes)
- 🌿 **Long Breaks** - Extended breaks after multiple sessions (default: 15 minutes)
- ⚙️ **Custom Durations** - Fully customizable timer lengths
- 📊 **Daily Statistics** - Track your focus time, completed pomodoros, and sessions
- 💾 **Local Storage** - All data persists automatically

### Advanced Features
- ✅ **Task Management** - Track tasks and assign pomodoros
- 📜 **Session History** - View your recent focus sessions
- 🔔 **Notifications** - Browser notifications when sessions complete
- 🔊 **Sound Alerts** - Pleasant audio notifications (toggleable)
- ⌨️ **Keyboard Shortcuts** - Efficient control without mouse
- 📱 **Responsive Design** - Works beautifully on all devices
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations

### Productivity Tools
- 🎯 **Daily Goal Tracking** - Set and track your daily pomodoro goals
- 🔄 **Auto-cycling** - Automatic transitions between focus and break modes
- 📈 **Progress Visualization** - Visual progress rings and statistics
- 🎹 **Quick Mode Switching** - Instant access to different timer modes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/qwencore.git
cd qwencore

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start/Pause timer |
| `R` | Reset current timer |
| `1` | Switch to Focus mode |
| `2` | Switch to Short Break mode |
| `3` | Switch to Long Break mode |
| `S` | Toggle Settings panel |

## 🎯 How to Use

### Basic Workflow
1. **Add a task** - Write down what you want to work on
2. **Start focus session** - Click Start or press Space
3. **Work until timer ends** - Stay focused for the full duration
4. **Take a break** - Automatic transition to break mode
5. **Repeat** - After 4 focus sessions, take a long break

### Task Management
- Add tasks with the input field
- Click the 🍅 button to mark a pomodoro as completed for that task
- Check off tasks when complete
- Track estimated vs completed pomodoros per task

### Customization
- Click the ⚙️ icon to open Settings
- Adjust focus, short break, and long break durations
- Configure long break interval (after how many sessions)
- Enable/disable auto-start for breaks and focus sessions

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Build Tool**: Vite 6.4
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage

### Project Structure

```
qwencore/
├── src/
│   ├── components/          # React components
│   │   ├── Timer.tsx        # Main timer display
│   │   ├── Controls.tsx     # Start/Pause/Reset buttons
│   │   ├── ModeSelector.tsx # Focus/Break mode tabs
│   │   ├── Settings.tsx     # Settings panel
│   │   ├── Stats.tsx        # Daily statistics
│   │   ├── TaskList.tsx     # Task management
│   │   └── SessionHistory.tsx # Session tracking
│   ├── hooks/               # Custom React hooks
│   │   ├── usePomodoro.ts   # Core timer logic
│   │   └── useLocalStorage.ts # Persistence hook
│   ├── utils/               # Utility functions
│   │   └── sounds.ts        # Audio notifications
│   ├── App.tsx              # Main application
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── vite.config.js          # Vite config
```

### Core Components

#### usePomodoro Hook
The central hook managing all timer logic:
- Timer state management
- Mode transitions (focus → break → focus)
- Session counting
- Settings persistence
- Callback handling for session completion

#### useLocalStorage Hook
Custom hook for persistent state:
- Automatic localStorage synchronization
- Type-safe storage
- Error handling
- JSON serialization

## 🔒 Security

This application runs entirely in the browser with no backend server. All data is stored locally using browser localStorage.

### Security Features
- ✅ No external API calls
- ✅ No user data transmission
- ✅ No third-party tracking
- ✅ Local-only data storage
- ✅ No authentication required

See [SECURITY.md](./SECURITY.md) for detailed security policy.

## 📊 Data Storage

### localStorage Keys
- `pomodoro-settings` - Timer configuration
- `pomodoro-stats` - Daily statistics
- `pomodoro-tasks` - Task list
- `pomodoro-sessions` - Session history
- `pomodoro-sound-enabled` - Sound preference

### Data Format
All data is stored as JSON strings in localStorage. You can export your data by accessing localStorage directly in browser dev tools.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Built with modern web technologies
- Icons by Lucide React
- Styling by Tailwind CSS

## 👨‍💻 Author & Maintainer

**donny-devops** - DevOps Engineer & Project Maintainer

- 🐙 GitHub: [@donny-devops](https://github.com/donny-devops)
- 📧 Email: devops@qwencore.dev
- 🚀 DevOps Guide: [DEVOPS.md](./DEVOPS.md)

## 📞 Support

- 📧 Email: support@qwencore.dev
- 🐛 Issues: [GitHub Issues](https://github.com/donny-devops/qwencore/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/donny-devops/qwencore/discussions)

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned features and future development.

### Upcoming Features
- [ ] PWA support for offline use
- [ ] Data export/import functionality
- [ ] Weekly/monthly statistics
- [ ] Customizable themes
- [ ] Integration with calendar apps
- [ ] Cloud sync option
- [ ] Mobile app version

## 📚 Documentation

- [README.md](./README.md) - This file
- [SECURITY.md](./SECURITY.md) - Security policy
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Community guidelines
- [CODEOWNERS](./CODEOWNERS) - Code ownership
- [AGENTS.md](./AGENTS.md) - AI agent guidelines
- [SOUL.md](./SOUL.md) - Project philosophy
- [MEMORY.md](./MEMORY.md) - Project memory
- [ROADMAP.md](./ROADMAP.md) - Development roadmap
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture

---

**Made with ❤️ for productivity enthusiasts**

*Focus better. Break smarter. Achieve more.*
