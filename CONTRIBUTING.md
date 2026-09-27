# Contributing to QwenCore

First off, thank you for considering contributing to QwenCore! It's people like you that make QwenCore such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible.

#### How Do I Submit a (Good) Bug Report?

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe the exact steps which reproduce the problem** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs** if possible
- **Include your environment details**:
  - Browser name and version
  - Operating system and version
  - Node.js version (if running locally)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**
- **List some other applications where this enhancement exists** (if applicable)

### Pull Requests

#### Development Process

1. Fork the repo
2. Clone your fork: `git clone https://github.com/your-username/qwencore.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes: `git commit -m 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature-name`
8. Submit a pull request

#### Pull Request Guidelines

- **Follow the existing code style** - We use TypeScript and follow React best practices
- **Write clear commit messages** - Use conventional commits format
- **Include tests** if applicable
- **Update documentation** for any new features
- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests
- **Ensure your code passes linting** - Run `npm run typecheck` before submitting

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(timer): add custom duration presets
fix(stats): correct daily reset logic
docs(readme): update installation instructions
```

### Development Setup

#### Prerequisites

- Node.js 18+
- npm or yarn
- Git

#### Setup Steps

```bash
# Fork and clone the repository
git clone https://github.com/your-username/qwencore.git
cd qwencore

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
```

#### Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

### Code Style Guidelines

#### TypeScript

- Use TypeScript for all new code
- Define proper types for props, state, and function parameters
- Avoid `any` type - use `unknown` if type is truly unknown
- Use interfaces for object shapes, types for unions/intersections

#### React

- Use functional components with hooks
- Keep components small and focused
- Use custom hooks for reusable logic
- Follow React best practices for performance (useMemo, useCallback, etc.)

#### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Use semantic class names when custom CSS is needed
- Keep the design consistent with existing components

#### File Organization

- One component per file
- Name files after their main export (PascalCase for components)
- Group related files together
- Use index.ts for barrel exports when appropriate

### Testing

While we don't have a formal test suite yet, please:

- Test your changes manually in multiple browsers
- Verify responsive design on different screen sizes
- Check keyboard shortcuts still work
- Ensure localStorage persistence works correctly
- Test edge cases (empty states, long text, etc.)

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public functions
- Update this CONTRIBUTING.md if you change the development process
- Include code comments for complex logic

### Review Process

1. **Automated Checks**: Your PR must pass all automated checks (build, typecheck)
2. **Code Review**: At least one maintainer will review your code
3. **Discussion**: Address any feedback or questions
4. **Approval**: Once approved, a maintainer will merge your PR

### Getting Help

If you need help with your contribution:

- Check existing issues and discussions
- Ask in the GitHub Discussions
- Reach out to maintainers

## Recognition

All contributors will be added to our [Contributors](#contributors) list. We believe in recognizing everyone who helps make QwenCore better!

## Questions?

Don't hesitate to ask questions! We're here to help you contribute successfully.

---

Thank you for contributing to QwenCore! 🍅
