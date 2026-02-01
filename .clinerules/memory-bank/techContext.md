# Technical Context: AccEnvix Website

## Technology Stack

### Frontend Framework
- **React 18+**: Component-based UI library
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server

### Styling and UI
- **TailwindCSS**: Utility-first CSS framework
- **ShadCN UI**: Accessible UI components built on Radix UI
- **PostCSS**: CSS processing and optimization

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting and consistency
- **Vitest**: Unit and integration testing framework
- **Testing Library**: React component testing utilities

### Build and Deployment
- **Vite**: Bundling and optimization
- **Node.js**: Runtime environment
- **npm/bun**: Package management

## Development Environment Setup

### Prerequisites
- Node.js 16+ or Bun runtime
- npm or bun package manager
- Git for version control

### Installation Process
1. Clone repository
2. Install dependencies with `npm install` or `bun install`
3. Start development server with `npm run dev` or `bun run dev`

### Available Scripts
- `dev`: Start development server
- `build`: Create production build
- `preview`: Preview production build
- `test`: Run test suite
- `test:ui`: Run tests with UI interface
- `lint`: Run ESLint
- `format`: Format code with Prettier

## Project Configuration

### TypeScript Configuration
- `tsconfig.json`: Base TypeScript configuration
- `tsconfig.app.json`: Application-specific settings
- `tsconfig.node.json`: Node.js environment settings

### Build Tool Configuration
- `vite.config.ts`: Vite build configuration
- `vitest.config.ts`: Test environment configuration
- `postcss.config.js`: PostCSS processing configuration
- `tailwind.config.ts`: TailwindCSS theme and plugin configuration

### Code Quality Tools
- `eslint.config.js`: ESLint rules and plugins
- `.gitignore`: Excluded files and directories
- `.prettierignore`: Files excluded from formatting

## Dependencies Overview

### Production Dependencies
- `react`: Core UI library
- `react-dom`: DOM renderer for React
- `@radix-ui/react-*`: Accessible UI primitives
- `class-variance-authority`: Component variance utility
- `clsx`: Conditional class name utility
- `lucide-react`: Icon library
- `tailwind-merge`: Tailwind class name conflict resolution
- `tailwindcss-animate`: Animation utilities
- `@supabase/supabase-js`: Supabase client for backend integration
- `@tanstack/react-query`: Data fetching and state management
- `react-router-dom`: Client-side routing
- `recharts`: Data visualization library
- `date-fns`: Date manipulation utilities

### Development Dependencies
- `@types/*`: TypeScript definition files
- `@typescript-eslint/*`: TypeScript linting
- `@vitejs/plugin-react`: React support for Vite
- `autoprefixer`: CSS vendor prefixing
- `eslint`: Code linting
- `jsdom`: DOM testing environment
- `postcss`: CSS processing
- `prettier`: Code formatting
- `tailwindcss`: CSS framework
- `vite`: Build tool
- `vitest`: Test framework

## Testing Strategy

### Test Framework
- Vitest for fast unit and integration tests
- React Testing Library for component testing
- JSDOM for browser-like test environment

### Test Structure
- Tests located in `src/test/` directory
- Component tests colocated with components when appropriate
- Setup files for test environment configuration

### Coverage and Quality
- Code coverage reporting
- Snapshot testing for UI components
- Accessibility testing considerations

## Performance Considerations

### Optimization Techniques
- Code splitting via dynamic imports
- Tree shaking for unused code elimination
- Image optimization strategies
- Bundle size monitoring
- Lazy loading for non-critical resources

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Progressive enhancement principles

## Security Considerations

### Client-Side Security
- XSS prevention through React's built-in escaping
- Secure dependency management
- Content Security Policy compliance
- Form validation and sanitization

### Development Security
- Dependency vulnerability scanning
- Secure coding practices
- Environment variable management
- Input validation and sanitization