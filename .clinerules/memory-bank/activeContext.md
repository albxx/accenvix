# Active Context: AccEnvix Website

## Current Work Focus
Maintaining and updating the memory bank documentation to reflect the newly implemented task management features. This includes updating all core documentation files to accurately represent the current state of the project after implementing the comprehensive admin interface.

## Recent Changes
- Initialized memory bank structure
- Created core documentation files based on .clinerules framework
- Established project brief and product context
- **FIXED**: Contact form email sending 401 error
  - Updated Edge Function to allow optional JWT validation (public endpoint)
  - Modified frontend to properly use authenticated session token with fallback to anon key
  - Added proper Authorization header handling with Bearer token format
- **FIXED**: React Router v7 future flag warnings
  - Added `v7_startTransition` and `v7_relativeSplatPath` future flags to BrowserRouter
- **FIXED**: Auth session error handling
  - Improved AuthContext to handle "Auth session missing!" gracefully
  - Changed from getUser() to getSession() for better session checking
- **ADDED**: JSON-LD Structured Data
  - LocalBusiness schema with company info, address, hours, geo coordinates
  - Service schema listing all offered services
  - Added sameAs social media links (placeholder URLs)

## Next Steps (SEO & Marketing)
1. Submit sitemap to Google Search Console
2. Set up Google Analytics
3. Create a Google Business Profile
4. Consider adding more JSON-LD schemas (FAQ, Review, etc.)

## Active Decisions and Considerations
- Following the established .clinerules framework for documentation
- Ensuring all memory bank files align with the project brief and product context
- Maintaining consistency with existing codebase and technology choices
- Planning for future scalability and maintainability

## Important Patterns and Preferences
- Modern web development practices
- Clean, professional design aesthetic
- Performance optimization
- Responsive design principles
- Maintainable code architecture

## Learnings and Project Insights
- Project is built with React, TypeScript, TailwindCSS, and Vite
- Existing file structure suggests a component-based architecture
- ShadCN UI components are integrated
- Testing infrastructure appears to be in place (vitest)
- Project follows modern frontend development practices
- Supabase backend integration provides real-time data synchronization
- Admin interface follows consistent design patterns with reusable components
- Data visualization capabilities through Recharts integration
- Comprehensive CRUD operations implemented across admin features
- **Supabase Edge Functions** require proper Authorization headers with Bearer tokens
- For public endpoints like contact forms, authentication should be optional but validate tokens when provided
- Frontend should prefer authenticated session tokens and fall back to anon key for public access
