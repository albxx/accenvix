-- ========================================
-- SEED DATA FOR ACCENVIX SOLUTIONS PORTAL
-- ========================================

-- Insert sample services
INSERT INTO services (title, description, icon_url) VALUES
('Web Development', 'Custom websites and web applications built with modern technologies.', '/icons/web-dev.svg'),
('Mobile Apps', 'Native and cross-platform mobile applications for iOS and Android.', '/icons/mobile-apps.svg'),
('Cloud Solutions', 'Scalable cloud infrastructure and services for your business needs.', '/icons/cloud.svg'),
('Consulting', 'Expert advice and guidance for your technology projects and strategy.', '/icons/consulting.svg');

-- Insert sample projects
INSERT INTO projects (title, description, image_url, link) VALUES
('E-commerce Platform', 'A full-featured online shopping platform with payment integration.', '/projects/ecommerce.jpg', 'https://example.com/project1'),
('Business Dashboard', 'Analytics dashboard for monitoring key business metrics in real-time.', '/projects/dashboard.jpg', 'https://example.com/project2'),
('Mobile Banking App', 'Secure mobile application for banking and financial services.', '/projects/banking.jpg', 'https://example.com/project3'),
('Healthcare Portal', 'Patient portal for medical appointments and health records management.', '/projects/healthcare.jpg', 'https://example.com/project4');

-- Insert default settings
INSERT INTO settings (site_title, site_description, contact_email, contact_phone, address) VALUES
('Accenvix Solutions', 'Professional IT services and solutions for businesses of all sizes.', 'info@accenvix.com', '+1 (555) 123-4567', '123 Tech Street, Silicon Valley, CA 94000');

-- Note: Profiles will be created automatically when users register
-- Note: Contact messages will be created by visitors using the contact form