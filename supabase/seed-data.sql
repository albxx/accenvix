-- ========================================
-- SAMPLE SEED DATA FOR ACCENVIX SOLUTIONS PORTAL
-- ========================================

-- Insert sample services
INSERT INTO services (title, description, icon_url) VALUES
('Web Development', 'Custom websites and web applications built with modern technologies including React, Next.js, and Node.js.', '/icons/web-dev.svg'),
('Mobile Apps', 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.', '/icons/mobile-apps.svg'),
('Cloud Solutions', 'Scalable cloud infrastructure and services using AWS, Google Cloud, and Microsoft Azure.', '/icons/cloud.svg'),
('IT Consulting', 'Expert advice and guidance for your technology projects and strategic planning to ensure success.', '/icons/consulting.svg');

-- Insert sample projects
INSERT INTO projects (title, description, image_url, link) VALUES
('E-commerce Platform', 'A full-featured online shopping platform with payment integration, inventory management, and analytics.', '/projects/ecommerce.jpg', 'https://example.com/project1'),
('Business Dashboard', 'Analytics dashboard for monitoring key business metrics in real-time with customizable reports.', '/projects/dashboard.jpg', 'https://example.com/project2'),
('Mobile Banking App', 'Secure mobile application for banking and financial services with biometric authentication.', '/projects/banking.jpg', 'https://example.com/project3'),
('Healthcare Portal', 'Patient portal for medical appointments, prescriptions, and health records management.', '/projects/healthcare.jpg', 'https://example.com/project4');

-- Insert default settings
INSERT INTO settings (id, site_title, site_description, contact_email, contact_phone, address)
VALUES
('default-settings', 'Accenvix Solutions', 'Professional IT services and solutions for businesses of all sizes.', 'info@accenvix.com', '+1 (555) 123-4567', '123 Tech Street, Silicon Valley, CA 94000')
ON CONFLICT (id) DO UPDATE SET
  site_title = EXCLUDED.site_title,
  site_description = EXCLUDED.site_description,
  contact_email = EXCLUDED.contact_email,
  contact_phone = EXCLUDED.contact_phone,
  address = EXCLUDED.address;

-- Note: Profiles will be created automatically when users register
-- Note: Contact messages will be created by visitors using the contact form