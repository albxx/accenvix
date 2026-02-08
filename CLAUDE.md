# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Professional website for AccEnvix Solutions featuring a public-facing site and an admin dashboard for project management. The site includes pages for home, about, services, portfolio, and contact, plus authenticated admin routes for managing projects, tasks, team members, and reports.

## Key Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with ShadCN UI components (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase (Auth + Database)
- **Internationalization**: i18next with browser language detection
- **Testing**: Vitest with Testing Library
- **Package Manager**: npm or bun

## Project Structure

```
src/
├── components/          # Shared UI components and layout
│   ├── layout/         # Navbar, Footer, Layout wrapper
│   └── ui/             # ShadCN UI component library (50+ components)
├── contexts/           # React contexts (AuthContext)
├── hooks/              # Custom hooks
│   └── supabase/       # Data hooks (useProjects, useTasks, useTeamMembers)
├── lib/                # Utilities and configuration
│   ├── supabase/       # Supabase client and type definitions
│   ├── utils.ts        # cn() utility for class merging
│   └── i18n.ts         # i18next configuration
├── locales/            # Translation files (en/, ms/)
├── pages/              # Page components
│   └── admin/          # Admin dashboard pages (Dashboard, Projects, Tasks, Team, Reports)
├── App.tsx             # Main app with routing and providers
└── main.tsx            # Entry point
supabase/migrations/    # Database schema migrations
```

## Common Development Commands

```bash
# Start development server
npm run dev
# Visit http://localhost:5173

# Create production build
npm run build

# Create development build
npm run build:dev

# Preview production build
npm run preview

# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run ESLint
npm run lint
```

## Architecture Patterns

### Routing

Routes are defined in `src/App.tsx`. Public routes are at the root level, admin routes are under `/admin/` path.

```tsx
// All custom routes must be ABOVE the catch-all "*" route
<Route path="/" element={<Index />} />
<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="*" element={<NotFound />} />
```

**Pattern**: Admin routes require authentication. Use `useAuth()` hook to check user state.

### Provider Stack

The app wraps providers in this order (outer to inner):

1. `QueryClientProvider` - TanStack Query
2. `AuthProvider` - Supabase authentication context
3. `TooltipProvider` - UI tooltips
4. `BrowserRouter` - React Router

### Component Patterns

**ShadCN/UI Components**: All UI components use:
- `class-variance-authority` (CVA) for variant-based styling
- `cn()` utility (combines `clsx` + `tailwind-merge`)
- Radix UI primitive for accessibility
- ForwardRef for ref forwarding

Example button component at `src/components/ui/button.tsx:33-47`.

**Pattern for new UI components**: Copy an existing component like `button.tsx`, update the `cva` variants, and export `{ Component, componentVariants }`.

### Data Fetching

Supabase hooks follow a consistent pattern in `src/hooks/supabase/`:

```tsx
// useProjects.ts pattern
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Auto-fetch on mount
  useEffect(() => { fetchProjects() }, [])

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject }
}
```

Types are defined in `src/lib/supabase/client.ts` for Project, Task, TeamMember, and Resource.

### Authentication

- Supabase Auth is configured in `src/lib/supabase/client.ts`
- `AuthContext` in `src/contexts/AuthContext.tsx` provides global auth state
- Use `useAuth()` hook to access user and auth methods
- Auth state automatically syncs across tabs via Supabase's `onAuthStateChange`

### Internationalization

- Translation files in `src/locales/{language}/translation.json`
- Default language is Malay (ms), fallback to English (en)
- Browser language detection via `i18next-browser-languagedetector`
- Use `useTranslation()` hook from `react-i18next`

```tsx
const { t } = useTranslation()
return <h1>{t('welcome')}</h1>
```

### Database Migrations

Supabase schema migrations are in `supabase/migrations/`:
- `01_project_management_schema.sql` - Base tables (projects, tasks, team_members, resources)
- `02_enhanced_project_fields.sql` - Additional project fields
- `03_task_dependencies.sql` - Task dependency tracking

## Testing Setup

- Vitest with jsdom DOM environment
- React Testing Library for component testing
- Custom setup in `src/test/setup.ts`

## Deployment

Vercel deployment configuration:
- Build command: `npm run build`
- Output directory: `dist/`
- Install command: `npm install`
- Environment variables: Create `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`