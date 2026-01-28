# Accenvix Solutions Portal

A professional company portal built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Public Pages**: Home, About, Services, Portfolio, and Contact pages
- **Authentication**: User registration and login with Supabase Auth
- **Admin Dashboard**: Protected admin area for managing content
- **Content Management**: CRUD operations for services and projects
- **Contact Form**: Visitors can send messages stored in Supabase
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Security**: Row Level Security (RLS) policies for data protection

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Deployment**: Vercel (frontend), Supabase (backend)

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd accenvix-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at [https://app.supabase.io](https://app.supabase.io)
2. Navigate to the SQL Editor in your Supabase dashboard
3. Run the migration files in numerical order from the `supabase/migrations` directory:
   - `001_create_tables.sql` - Creates all tables and indexes
   - `002_enable_rls.sql` - Enables Row Level Security on all tables
   - `003_create_policies.sql` - Creates RLS policies for data protection
   - `004_create_triggers.sql` - Creates authentication triggers
   - `005_insert_seed_data.sql` - Inserts initial seed data
4. Create storage buckets:
   - `project-images` for portfolio images
   - `service-icons` for service icons
   - Set both buckets to allow public read access

### 4. Configure Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   └── ...             # Public pages (home, about, etc.)
├── components/         # Reusable React components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   └── ...             # Shared components
├── context/            # React context providers
├── lib/                # Utility functions and Supabase client
│   └── supabase/       # Supabase client and helper functions
└── types/              # TypeScript type definitions

supabase/
├── schema.sql          # Database schema
├── rls.sql             # Row Level Security policies
├── auth-triggers.sql   # Authentication triggers
├── seed.sql            # Sample data
└── setup-guide.md      # Detailed Supabase setup guide

public/                 # Static assets
├── icons/              # Service icons
└── projects/           # Project images
```

## Supabase Setup Guide

For detailed Supabase setup instructions, see `supabase/setup-guide.md`.

## Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and create a new project
3. Connect your GitHub repository
4. Set the environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

### Supabase Production Setup

Make sure to:
1. Configure your production Supabase project with the same schema
2. Set up the storage buckets with appropriate permissions
3. Configure your domain in Supabase auth settings

## Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint to check for issues

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Yes |

## Database Schema

The application uses the following tables:

- `services` - Company services with title, description, and icon
- `projects` - Portfolio projects with title, description, image, and link
- `contact_messages` - Visitor contact form submissions
- `profiles` - User profiles with role information (public or admin)
- `settings` - Site configuration settings

## Row Level Security

RLS policies ensure:
- Public users can view services and projects
- Public users can submit contact messages
- Admin users have full access to all tables
- Users can only view their own profile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.