# Accenvix Website

Professional website built with modern web technologies including React, TypeScript, TailwindCSS, and Vite.

## Features

- Responsive design with mobile-first approach
- Modern UI components using ShadCN UI
- Supabase backend integration for data management
- Project management system with Tasks, Projects, Team, and Reports
- Internationalization support (English/Malay)
- Dark/light theme support
- Contact form with email notifications

## Prerequisites

- Node.js 16+ or Bun
- Supabase account (for backend services)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Namecheap SMTP Configuration (for contact form)
SMTP_HOST=smtp.namecheap.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
TO_EMAIL=recipient@yourdomain.com
```

### 3. Development

```bash
# Start development server with API mock
npm run dev:api

# Or start just the frontend (contact form won't work without API)
npm run dev
```

### 4. Build for Production

```bash
# Build for production
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/            # React contexts (Auth, Theme)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and Supabase client
├── locales/             # Translation files
├── pages/               # Page components
└── test/                # Test files

api/
├── mock-api.js         # Development API mock with nodemailer
└── send-email.js       # Vercel serverless function for production
```

## Available Scripts

- `dev`: Start development server
- `dev:api`: Start development server with API mock (recommended for local development)
- `build`: Build for production
- `build:dev`: Development build
- `preview`: Preview production build
- `test`: Run tests
- `test:watch`: Run tests in watch mode
- `lint`: Run ESLint

## Supabase Setup

1. Create a Supabase project at [supabase.io](https://supabase.io)
2. Copy your project URL and anon key
3. Update the `.env` file with your Supabase credentials
4. Run the SQL migrations in the `supabase/migrations/` directory

## Email Configuration

The contact form uses nodemailer with Namecheap SMTP settings. For production deployment:

1. Update the SMTP configuration in your hosting environment
2. Ensure the `api/send-email.js` file is properly deployed as a serverless function
3. Test email delivery with your actual SMTP credentials

## Deployment

This project is configured for deployment on Vercel. See `docs/setup_vercel.md` for detailed instructions.

## License

This project is proprietary to Accenvix Solutions.