# Supabase Setup Guide for Accenvix Solutions Portal

## Prerequisites

1. Create a free Supabase account at [https://supabase.io](https://supabase.io)
2. Create a new project in the Supabase dashboard

## Database Schema Setup

1. In your Supabase project, go to the SQL Editor
2. Copy and paste the contents of `supabase/schema.sql` into the editor
3. Run the SQL to create all tables and initial setup

## Row Level Security Configuration

1. After creating the tables, run the SQL from `supabase/rls.sql` in the SQL Editor
2. This will set up all the necessary RLS policies for your application

## Auth Triggers Setup

1. Run the SQL from `supabase/auth-triggers.sql` in the SQL Editor
2. This sets up automatic profile creation when users sign up

## Storage Setup

1. Go to the Storage section in your Supabase dashboard
2. Create two buckets:
   - `project-images` for portfolio project images
   - `service-icons` for service icons
3. Set the buckets to:
   - Public read access (for displaying images to visitors)
   - Admin write access (only admins can upload)

## Environment Variables

Once your Supabase project is set up, you'll need these values for your `.env.local` file:

- `NEXT_PUBLIC_SUPABASE_URL` - Found in Project Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Found in Project Settings > API

## Initial Admin Setup

To make a user an admin:

1. Have the user sign up through the portal
2. In the SQL Editor, run:
   ```sql
   SELECT public.make_user_admin('USER_ID_HERE');
   ```
   Replace USER_ID_HERE with the actual user ID from the profiles table.

## Testing RLS Policies

You can test your RLS policies by:

1. Creating a test user through the signup form
2. Checking that they can only:
   - View services and projects
   - Submit contact messages
3. Creating an admin user and verifying they can:
   - Access the admin dashboard
   - Perform CRUD operations on services and projects
   - View contact messages