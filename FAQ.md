# Frequently Asked Questions (FAQ)

## General Questions

### What is QwenCore?
QwenCore is a beautiful, privacy-focused Pomodoro timer web application that helps you stay focused and productive using the Pomodoro Technique.

### What is the Pomodoro Technique?
The Pomodoro Technique is a time management method developed by Francesco Cirillo. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a "pomodoro" (Italian for tomato).

### Is QwenCore free?
Yes! QwenCore is completely free and open-source under the MIT license.

### Do I need to create an account?
No. QwenCore works entirely in your browser with no account required.

### Is my data private?
Absolutely. All your data is stored locally in your browser. Nothing is ever sent to any server.

## Usage Questions

### How do I start a focus session?
Click the "Start" button or press the `Space` key on your keyboard.

### How do I switch between modes?
Click on the mode tabs (Focus, Short Break, Long Break) or use keyboard shortcuts `1`, `2`, or `3`.

### Can I customize the timer durations?
Yes! Click the settings icon (⚙️) to customize focus duration, short break, long break, and the interval for long breaks.

### What happens when the timer ends?
You'll hear a notification sound (if enabled) and receive a browser notification. The timer will automatically switch to the next mode (break after focus, focus after break).

### Can I mute the sound?
Yes! Click the volume icon in the header to toggle sound on/off.

### Will my data be saved if I close the browser?
Yes! All your settings, tasks, and statistics are saved in your browser's localStorage and will persist across sessions.

### How do I reset my statistics?
Statistics automatically reset at the start of each new day. To clear all data, you can clear your browser's localStorage for this site.

### Can I use QwenCore offline?
Yes! Once loaded, QwenCore works completely offline. All functionality is client-side.

## Technical Questions

### What browsers are supported?
QwenCore works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Does it work on mobile?
Yes! QwenCore is fully responsive and works on mobile devices.

### Can I install it as an app?
PWA (Progressive Web App) support is planned for version 1.1.0. Currently, you can add it to your home screen manually on most mobile browsers.

### What are the system requirements?
- Modern web browser
- JavaScript enabled
- localStorage support (enabled by default)

### How much data does it use?
QwenCore uses minimal data. The initial page load is ~170KB, and after that, it works offline with no additional data usage.

### Can I export my data?
Data export is planned for version 1.1.0. Currently, you can access your data through browser developer tools.

## Troubleshooting

### The timer isn't accurate
Make sure your browser tab isn't throttled. Some browsers slow down timers in background tabs. Keep the tab active for best accuracy.

### Notifications aren't showing
Check your browser notification permissions. You may need to allow notifications for this site in your browser settings.

### Sound isn't playing
Browsers block autoplay until first user interaction. Click "Start" once, then sound should work. Also check that sound is enabled (volume icon in header).

### My data disappeared
This can happen if you:
- Cleared browser data/cache
- Used incognito/private mode
- Switched browsers or devices
- localStorage was disabled

Unfortunately, there's no way to recover cleared data. Data export (coming in v1.1.0) will help prevent this.

### The app is slow
Try:
- Refreshing the page
- Clearing browser cache
- Checking for browser extensions that might interfere
- Using a different browser

### Keyboard shortcuts aren't working
Make sure:
- You're not typing in an input field
- The page has focus (click somewhere on the page)
- No browser extensions are intercepting the keys

## Feature Questions

### Can I track multiple tasks?
Yes! Use the task list to add multiple tasks. You can mark pomodoros as completed for each task.

### Can I see my history?
Yes! The session history shows your last 5 completed sessions. Full history is planned for a future version.

### Can I set daily goals?
Yes! The stats panel shows progress toward a daily goal of 8 pomodoros. Custom goals are planned for a future version.

### Can I sync across devices?
Not yet. Cloud sync is planned for version 2.0.0. Currently, data is stored locally per browser/device.

### Can I integrate with other apps?
Integrations are planned for version 1.2.0. Currently, QwenCore is a standalone application.

### Can I customize the theme?
Theme customization is planned for version 1.1.0. Currently, there's one beautiful dark theme.

## Privacy & Security

### What data do you collect?
None. Zero. QwenCore collects no data whatsoever. Everything stays in your browser.

### Do you use cookies?
No. QwenCore doesn't use cookies. We use localStorage for data persistence.

### Do you track my usage?
No. There are no analytics, no tracking, no telemetry. Your usage is completely private.

### Is my data encrypted?
Data is stored in your browser's localStorage, which is protected by your browser's security model. There's no need for additional encryption since data never leaves your device.

### Can other websites access my data?
No. localStorage is isolated by origin. Other websites cannot access QwenCore's data.

## Contributing

### How can I contribute?
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines. You can:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Share the project

### Can I translate QwenCore?
Internationalization is planned for a future version. We welcome translation contributions!

### Can I fork the project?
Absolutely! QwenCore is open-source under the MIT license. Fork it, modify it, make it your own.

## Support

### Where can I get help?
- Check this FAQ
- Read the [README.md](./README.md)
- Search [GitHub Issues](https://github.com/donny-devops/qwencore/issues)
- Ask in [GitHub Discussions](https://github.com/donny-devops/qwencore/discussions)
- Email: support@donny-devops.dev

### How do I report a bug?
Create an issue on GitHub with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### How do I request a feature?
Create an issue on GitHub or start a discussion. We love hearing your ideas!

---

**Still have questions?** Reach out to us at support@donny-devops.dev or join the discussion on GitHub!
