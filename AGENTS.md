# AI Agent Guidelines

This document provides guidelines for AI agents (like GitHub Copilot, Claude, GPT, etc.) working on the QwenCore codebase.

## Project Overview

QwenCore is a Pomodoro timer web application built with:
- **React 18.2** - UI framework
- **TypeScript 5.0** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Vite 6.4** - Build tool
- **localStorage** - Data persistence

## Core Principles

### 1. Client-Side Only
- No backend server
- No API calls
- All data stored in browser localStorage
- Privacy-first design

### 2. Type Safety
- Always use TypeScript
- Define proper types for props, state, and functions
- Avoid `any` type
- Use interfaces for object shapes

### 3. Component Structure
- Functional components with hooks
- Small, focused components
- Custom hooks for reusable logic
- Proper separation of concerns

### 4. Performance
- Use React.memo for expensive components
- Use useMemo/useCallback appropriately
- Minimize re-renders
- Optimize localStorage access

### 5. User Experience
- Responsive design (mobile-first)
- Keyboard accessibility
- Smooth animations
- Clear visual feedback

## Code Patterns

### State Management
```typescript
// Use custom hooks for complex state
const { state, actions } = useCustomHook();

// Use localStorage for persistence
const [value, setValue] = useLocalStorage<T>('key', initialValue);
```

### Component Props
```typescript
interface ComponentProps {
  prop1: string;
  prop2?: number; // Optional
  onAction: () => void;
}

export function Component({ prop1, prop2, onAction }: ComponentProps) {
  // ...
}
```

### Event Handlers
```typescript
// Use useCallback for event handlers
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

## Common Tasks

### Adding a New Feature
1. Create component in `src/components/`
2. Define TypeScript interfaces
3. Implement with proper state management
4. Add to App.tsx
5. Update documentation
6. Test manually

### Modifying Timer Logic
1. Edit `src/hooks/usePomodoro.ts`
2. Ensure type safety
3. Test timer behavior
4. Verify localStorage persistence
5. Check keyboard shortcuts

### Adding Statistics
1. Update `useTodayStats` hook
2. Modify Stats component
3. Ensure data persistence
4. Test daily reset logic

## File Naming Conventions

- **Components**: PascalCase (e.g., `Timer.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePomodoro.ts`)
- **Utils**: camelCase (e.g., `sounds.ts`)
- **Types**: PascalCase interfaces in relevant files

## Testing Checklist

Before submitting changes:
- [ ] TypeScript compiles without errors
- [ ] Timer starts/pauses/resets correctly
- [ ] Mode switching works
- [ ] Settings persist after refresh
- [ ] Statistics update correctly
- [ ] Keyboard shortcuts work
- [ ] Responsive on mobile
- [ ] No console errors

## Common Pitfalls

### ❌ Don't
```typescript
// Don't use any
const data: any = ...;

// Don't mutate state directly
state.value = newValue;

// Don't forget cleanup
useEffect(() => {
  const interval = setInterval(...);
  // Missing return () => clearInterval(interval);
}, []);
```

### ✅ Do
```typescript
// Use proper types
const data: MyInterface = ...;

// Use setState
setState(prev => ({ ...prev, value: newValue }));

// Always cleanup
useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval);
}, []);
```

## Accessibility

- Use semantic HTML
- Add aria-labels for icon buttons
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

## Performance Tips

- Lazy load components if needed
- Memoize expensive calculations
- Debounce localStorage writes
- Use CSS transforms for animations
- Optimize images (if any)

## Security Reminders

- Never expose sensitive data
- Validate all user input
- Use React's built-in XSS protection
- Don't use eval() or innerHTML
- Keep dependencies updated

## Documentation

- Update README.md for user-facing changes
- Add JSDoc for public functions
- Comment complex logic
- Keep this file updated

## Questions?

If you're an AI agent and unsure about something:
1. Check existing code patterns
2. Read the documentation
3. Follow TypeScript best practices
4. When in doubt, ask the human maintainer

---

**Remember**: Write clean, maintainable, type-safe code that enhances the user experience.
