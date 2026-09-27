# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of QwenCore seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@donny-devops.dev**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Target**: Within 30 days

### What to Expect

After you submit a report, we will:

1. Acknowledge receipt of your report
2. Evaluate the vulnerability and determine its impact
3. Work on a fix and timeline
4. Release a security update
5. Publicly disclose the vulnerability (after a fix is available)

## Security Architecture

### Client-Side Only

QwenCore is a **100% client-side application**. This means:

- ✅ No server-side processing
- ✅ No database connections
- ✅ No API endpoints to attack
- ✅ No user authentication
- ✅ No data transmission over the network

### Data Storage

All user data is stored exclusively in the browser's localStorage:

- Timer settings
- Daily statistics
- Task lists
- Session history
- User preferences

**No data ever leaves the user's browser.**

### Dependencies

We regularly audit and update our dependencies:

- React 18.2 (UI framework)
- TypeScript 5.0 (Type safety)
- Tailwind CSS 4.0 (Styling)
- Vite 6.4 (Build tool)
- Lucide React (Icons)

### Security Best Practices

#### For Users
- Keep your browser updated
- Use a modern, secure browser
- Be cautious of browser extensions that access localStorage
- Clear site data only if you want to reset all your statistics

#### For Developers
- Always validate user input
- Use TypeScript for type safety
- Keep dependencies updated
- Follow React security best practices
- Avoid eval() and innerHTML with user content
- Use Content Security Policy (CSP) headers

### Known Security Considerations

1. **localStorage Access**: Any JavaScript running on the page can access localStorage. This is a browser limitation.

2. **XSS Protection**: We use React's built-in XSS protection. All user input is properly escaped.

3. **No Authentication**: Since there's no server, there's no authentication. This is by design.

4. **Browser Security**: Security depends on the browser's security model. Use a trusted, up-to-date browser.

### Third-Party Services

QwenCore does **NOT** use:
- Analytics services
- Tracking scripts
- External fonts (except Font Awesome CDN)
- Third-party APIs
- Cookies
- Web beacons

### Incident Response Plan

In case of a security incident:

1. **Detection**: Identify and assess the vulnerability
2. **Containment**: Isolate affected systems (if any)
3. **Eradication**: Remove the vulnerability
4. **Recovery**: Restore normal operations
5. **Lessons Learned**: Document and improve

### Compliance

QwenCore is designed to be:
- GDPR compliant (no data collection)
- CCPA compliant (no data sharing)
- Privacy-first by design

### Contact

For security concerns: **security@donny-devops.dev**

For general questions: **support@donny-devops.dev**

---

**Last Updated**: 2026-01-20

**Policy Version**: 1.0.0
