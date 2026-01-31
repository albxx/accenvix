# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a professional website for AccEnvix Solutions built with a modern React stack. The site includes pages for home, about, services, portfolio, and contact.

## Key Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with ShadCN UI components
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Internationalization**: i18next with language detection
- **Testing**: Vitest with Testing Library
- **Package Manager**: npm or bun

## Project Structure

```
src/
├── components/     # Shared UI components and layout
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and i18n setup
├── locales/        # Translation files (en/ms)
├── pages/          # Page components for each route
├── test/           # Test setup files
└── App.tsx         # Main application with routing
```

## Common Development Commands

### Development
```bash
# Start development server
npm run dev
# or
bun run dev

# Visit http://localhost:5173 (default Vite port)
```

### Building
```bash
# Create production build
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

### Testing
```bash
# Run tests once
npm run test
# or
bun run test

# Run tests in watch mode
npm run test:watch
# or
bun run test:watch
```

### Code Quality
```bash
# Run ESLint
npm run lint
# or
bun run lint
```

## Architecture Patterns

### Routing
- Routes are defined in `src/App.tsx`
- Each page component is in `src/pages/`
- Follow the existing pattern when adding new routes

### Internationalization (i18n)
- Translation files in `src/locales/{language}/translation.json`
- Configured in `src/lib/i18n.ts`
- Default language is Malay (ms), fallback to English (en)
- Use `useTranslation()` hook from `react-i18next` for translations

### Component Organization
- Reusable components in `src/components/`
- UI components use ShadCN/UI patterns
- Layout components in `src/components/layout/`

### State Management
- TanStack Query for server state management
- React built-in state (useState, useContext) for client state
- Custom hooks in `src/hooks/` for reusable logic

## Testing Setup

Tests use Vitest with Testing Library. Configuration includes:
- DOM environment setup with jsdom
- Custom test setup in `src/test/setup.ts`
- Component testing with React Testing Library

## Deployment

The site is configured for Vercel deployment:
- Build command: `npm run build`
- Output directory: `dist/`
- Install command: `npm install`

Environment variables should be stored in `.env.local` file.