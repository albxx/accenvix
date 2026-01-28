-- ========================================
-- MIGRATION 004: CREATE AUTH TRIGGERS AND FUNCTIONS
-- ========================================

-- Function to create a profile entry for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'public');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user role to admin (for initial admin setup)
CREATE OR REPLACE FUNCTION public.make_user_admin(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET role = 'admin'
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;