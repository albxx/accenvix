#!/bin/bash

# Script to set up the complete Supabase database schema for Accenvix Solutions Portal
# This script should be run in the Supabase SQL Editor with the migration files in numerical order:
# 1. migrations/001_create_tables.sql - Creates all database tables and indexes
# 2. migrations/002_enable_rls.sql - Enables Row Level Security on all tables
# 3. migrations/003_create_policies.sql - Sets up Row Level Security policies
# 4. migrations/004_create_triggers.sql - Sets up authentication triggers
# 5. migrations/005_insert_seed_data.sql - Inserts sample data

echo "Setting up Accenvix Solutions Portal database..."

echo "Step 1: Creating database tables and indexes (migrations/001_create_tables.sql)"
echo "Run the contents of supabase/migrations/001_create_tables.sql in your Supabase SQL Editor"

echo "Step 2: Enabling Row Level Security (migrations/002_enable_rls.sql)"
echo "Run the contents of supabase/migrations/002_enable_rls.sql in your Supabase SQL Editor"

echo "Step 3: Setting up Row Level Security policies (migrations/003_create_policies.sql)"
echo "Run the contents of supabase/migrations/003_create_policies.sql in your Supabase SQL Editor"

echo "Step 4: Setting up authentication triggers (migrations/004_create_triggers.sql)"
echo "Run the contents of supabase/migrations/004_create_triggers.sql in your Supabase SQL Editor"

echo "Step 5: Inserting sample data (migrations/005_insert_seed_data.sql)"
echo "Run the contents of supabase/migrations/005_insert_seed_data.sql in your Supabase SQL Editor"

echo ""
echo "Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up storage buckets: project-images and service-icons (public read, admin write)"
echo "2. Configure environment variables in your .env.local file"
echo "3. Run 'npm run dev' to start the development server"