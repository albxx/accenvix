-- ========================================
-- ACCENVIX SOLUTIONS DATABASE SCHEMA
-- ========================================

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'public' CHECK (role IN ('public', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT NOT NULL DEFAULT 'Accenvix Solutions',
  site_description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (site_title)
VALUES ('Accenvix Solutions')
ON CONFLICT (id) DO NOTHING;

-- Insert default admin user (will be updated with real user id after auth setup)
-- INSERT INTO profiles (id, email, role) VALUES ('ADMIN_USER_ID', 'admin@accenvix.com', 'admin');

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (to be updated with proper policies in Step 3)
-- See supabase/rls.sql for the complete RLS policies
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin full access to services" ON services FOR ALL TO authenticated USING (true);

CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin full access to projects" ON projects FOR ALL TO authenticated USING (true);

CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact messages" ON contact_messages FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin full access to profiles" ON profiles FOR ALL TO authenticated USING (true);

CREATE POLICY "Public can view settings" ON settings FOR SELECT USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_services_title ON services(title);
CREATE INDEX IF NOT EXISTS idx_projects_title ON projects(title);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Set up storage buckets
-- This will be done via the Supabase dashboard or CLI after project creation