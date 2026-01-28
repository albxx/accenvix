-- ========================================
-- MIGRATION 003: CREATE RLS POLICIES
-- ========================================

-- Services table policies
-- Public users can view services
-- Admin users have full access to services
DROP POLICY IF EXISTS "Public can view services" ON services;
CREATE POLICY "Public can view services"
ON services FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admin full access to services" ON services;
CREATE POLICY "Admin full access to services"
ON services FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'admin'
));

-- Projects table policies
-- Public users can view projects
-- Admin users have full access to projects
DROP POLICY IF EXISTS "Public can view projects" ON projects;
CREATE POLICY "Public can view projects"
ON projects FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admin full access to projects" ON projects;
CREATE POLICY "Admin full access to projects"
ON projects FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'admin'
));

-- Contact messages table policies
-- Public users can insert contact messages (for contact form)
-- Admin users can view all contact messages
DROP POLICY IF EXISTS "Public can insert contact messages" ON contact_messages;
CREATE POLICY "Public can insert contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can view contact messages" ON contact_messages;
CREATE POLICY "Admin can view contact messages"
ON contact_messages FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'admin'
));

-- Profiles table policies
-- Users can view their own profile
-- Admin users have full access to all profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin full access to profiles" ON profiles;
CREATE POLICY "Admin full access to profiles"
ON profiles FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'admin'
));

-- Settings table policies
-- Public users can view settings
DROP POLICY IF EXISTS "Public can view settings" ON settings;
CREATE POLICY "Public can view settings"
ON settings FOR SELECT
USING (true);