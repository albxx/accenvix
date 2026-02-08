-- Enhanced Project Fields Migration

-- Add new columns to projects table
alter table projects add column if not exists project_type text default 'general';
alter table projects add column if not exists category text default 'uncategorized';
alter table projects add column if not exists budget numeric(12,2) default 0;
alter table projects add column if not exists estimated_hours numeric(8,2) default 0;
alter table projects add column if not exists actual_hours numeric(8,2) default 0;
alter table projects add column if not exists template_id uuid references projects(id);

-- Create project templates table
create table if not exists project_templates (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  project_type text default 'general',
  category text default 'uncategorized',
  default_budget numeric(12,2) default 0,
  default_estimated_hours numeric(8,2) default 0,
  status text check (status in ('active', 'inactive')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create milestones table
create table if not exists milestones (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  due_date date,
  status text check (status in ('pending', 'in-progress', 'completed')) default 'pending',
  progress numeric(5,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create project team assignments table
create table if not exists project_team_assignments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  team_member_id uuid references team_members(id) on delete cascade,
  role text check (role in ('project_manager', 'team_member', 'stakeholder')) default 'team_member',
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (project_id, team_member_id)
);

-- Create project categories table
create table if not exists project_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text,
  color text default '#3b82f6',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create project types table
create table if not exists project_types (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text,
  default_template_id uuid references project_templates(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for new tables
alter table project_templates enable row level security;
alter table milestones enable row level security;
alter table project_team_assignments enable row level security;
alter table project_categories enable row level security;
alter table project_types enable row level security;

-- Project Templates policies
create policy "Project templates are viewable by everyone"
  on project_templates for select
  using (true);

create policy "Team members can insert project templates"
  on project_templates for insert
  with check (true);

create policy "Team members can update project templates"
  on project_templates for update
  using (true);

create policy "Team members can delete project templates"
  on project_templates for delete
  using (true);

-- Milestones policies
create policy "Milestones are viewable by team members"
  on milestones for select
  using (true);

create policy "Team members can insert milestones"
  on milestones for insert
  with check (true);

create policy "Team members can update milestones"
  on milestones for update
  using (true);

create policy "Team members can delete milestones"
  on milestones for delete
  using (true);

-- Project Team Assignments policies
create policy "Project team assignments are viewable by team members"
  on project_team_assignments for select
  using (true);

create policy "Team members can insert project team assignments"
  on project_team_assignments for insert
  with check (true);

create policy "Team members can update project team assignments"
  on project_team_assignments for update
  using (true);

create policy "Team members can delete project team assignments"
  on project_team_assignments for delete
  using (true);

-- Project Categories policies
create policy "Project categories are viewable by everyone"
  on project_categories for select
  using (true);

create policy "Team members can insert project categories"
  on project_categories for insert
  with check (true);

create policy "Team members can update project categories"
  on project_categories for update
  using (true);

create policy "Team members can delete project categories"
  on project_categories for delete
  using (true);

-- Project Types policies
create policy "Project types are viewable by everyone"
  on project_types for select
  using (true);

create policy "Team members can insert project types"
  on project_types for insert
  with check (true);

create policy "Team members can update project types"
  on project_types for update
  using (true);

create policy "Team members can delete project types"
  on project_types for delete
  using (true);

-- Insert sample data for new tables
insert into project_categories (name, description, color) values
  ('Web Development', 'Web application and website projects', '#22c55e'),
  ('Mobile App', 'Mobile application development projects', '#3b82f6'),
  ('Enterprise', 'Large-scale enterprise projects', '#f59e0b'),
  ('Marketing', 'Marketing and campaign projects', '#ef4444'),
  ('Research', 'Research and development projects', '#a855f7');

insert into project_types (name, description) values
  ('Software Development', 'Custom software development projects'),
  ('Website Development', 'Website and web application projects'),
  ('Mobile App Development', 'iOS and Android application projects'),
  ('Marketing Campaign', 'Digital marketing and campaign projects'),
  ('Event Planning', 'Event organization and management projects'),
  ('Research Project', 'Research and development initiatives');

insert into project_templates (name, description, project_type, category, default_budget, default_estimated_hours) values
  ('Basic Website', 'Simple website with basic pages', 'Website Development', 'Web Development', 5000.00, 40.00),
  ('E-commerce Site', 'Online store with shopping cart', 'Website Development', 'Web Development', 15000.00, 120.00),
  ('Mobile App MVP', 'Minimum viable product for mobile app', 'Mobile App Development', 'Mobile App', 25000.00, 200.00),
  ('Marketing Campaign', 'Digital marketing campaign setup', 'Marketing Campaign', 'Marketing', 8000.00, 60.00);