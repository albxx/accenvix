#!/bin/bash

# Script to set up the complete Supabase database schema for Accenvix Solutions Portal
# This script should be run in the Supabase SQL Editor in the following order:
# 1. schema.sql - Creates all database tables
# 2. rls.sql - Sets up Row Level Security policies
# 3. auth-triggers.sql - Sets up authentication triggers
# 4. seed.sql - Inserts sample data

echo "Setting up Accenvix Solutions Portal database..."

echo "Step 1: Creating database schema (schema.sql)"
echo "Run the contents of supabase/schema.sql in your Supabase SQL Editor"

echo "Step 2: Setting up Row Level Security (rls.sql)"
echo "Run the contents of supabase/rls.sql in your Supabase SQL Editor"

echo "Step 3: Setting up authentication triggers (auth-triggers.sql)"
echo "Run the contents of supabase/auth-triggers.sql in your Supabase SQL Editor"

echo "Step 4: Inserting sample data (seed.sql)"
echo "Run the contents of supabase/seed.sql in your Supabase SQL Editor"

echo ""
echo "Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up storage buckets: project-images and service-icons (public read, admin write)"
echo "2. Configure environment variables in your .env.local file"
echo "3. Run 'npm run dev' to start the development server"