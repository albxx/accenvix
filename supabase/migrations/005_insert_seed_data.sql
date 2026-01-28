-- ========================================
-- MIGRATION 005: INSERT SEED DATA
-- ========================================

-- Insert sample services
INSERT INTO services (title, description, icon_url) VALUES
  ('Web Development', 'Custom websites and web applications built with modern technologies', '/icons/web-dev.svg'),
  ('Mobile Apps', 'Native and cross-platform mobile applications for iOS and Android', '/icons/mobile-apps.svg'),
  ('Cloud Solutions', 'Scalable cloud infrastructure and deployment strategies', '/icons/cloud.svg'),
  ('IT Consulting', 'Expert advice and solutions for your technology challenges', '/icons/consulting.svg')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, image_url, link) VALUES
  ('E-commerce Platform', 'Full-featured online shopping platform with payment integration', '/projects/ecommerce.jpg', '#'),
  ('Healthcare Dashboard', 'Patient management system with analytics and reporting', '/projects/healthcare.jpg', '#'),
  ('Banking Application', 'Secure financial application with transaction monitoring', '/projects/banking.jpg', '#'),
  ('Analytics Dashboard', 'Real-time data visualization and business intelligence tool', '/projects/dashboard.jpg', '#')
ON CONFLICT DO NOTHING;

-- Insert default settings (only if no settings exist)
INSERT INTO settings (site_title)
SELECT 'Accenvix Solutions'
WHERE NOT EXISTS (SELECT 1 FROM settings);