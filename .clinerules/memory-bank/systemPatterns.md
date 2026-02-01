# System Patterns: AccEnvix Website

## Architecture Overview
The AccEnvix website follows a component-based architecture using React with TypeScript. The system is organized into logical layers that separate concerns and promote maintainability.

## Core Architecture Patterns

### Component-Based Structure
- **Pages Layer**: Contains top-level page components (About, Contact, Index, Portfolio, Services) and admin pages (Dashboard, Tasks, Projects, Team, Reports, Login)
- **Components Layer**: Reusable UI components organized by functionality (layout, ui, hooks, lib)
- **Layout Components**: Navbar, Footer, and overall page structure components (including AdminLayout for admin section)
- **UI Components**: ShadCN UI components customized for project needs
- **Hooks**: Custom React hooks for shared logic (use-mobile, use-toast) and Supabase data hooks (useTasks, useProjects, useTeamMembers)
- **Lib**: Utility functions and shared logic (utils.ts) and Supabase client configuration

### File Organization
```
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   ├── ui/             # UI components (ShadCN based)
│   └── NavLink.tsx     # Navigation component
├── hooks/              # Custom hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── test/               # Test files
```

## Design Patterns in Use

### Component Composition
- Compound components for complex UI elements
- Prop drilling minimized through context where appropriate
- Reusable primitive components built up into higher-order components

### State Management
- Local component state for simple interactions
- React hooks for shared state logic
- Context API for global state when needed
- Controlled components for form handling

### Styling Patterns
- TailwindCSS utility-first approach
- Component-scoped styling
- Responsive design through Tailwind's responsive utilities
- Consistent design system through Tailwind configuration

## Key Technical Decisions

### Technology Stack Choices
- **React + TypeScript**: Type safety and component-based development
- **Vite**: Fast build tooling and development experience
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **ShadCN UI**: Pre-built accessible components that can be customized
- **Vitest**: Testing framework for unit and integration tests

### Performance Considerations
- Code splitting through dynamic imports
- Lazy loading for non-critical components
- Optimized bundle sizes through tree-shaking
- Image optimization strategies
- Efficient re-rendering through React.memo and useMemo

### Development Practices
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component testing with Vitest
- Git hooks for pre-commit validation

## Integration Patterns

### UI Component Integration
- ShadCN UI components customized and extended
- Consistent design language across all components
- Accessible components following WCAG guidelines
- Responsive design patterns implemented consistently

### Data Flow Patterns
- Unidirectional data flow
- Event-driven communication between components
- Form handling with controlled components
- API integration patterns (when implemented)

## Future Architecture Considerations
- Potential integration with backend services
- Advanced state management solutions if complexity grows
- Progressive Web App capabilities
- Server-side rendering considerations
- Performance monitoring and analytics integration