-- Project Management Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp" with schema public;

-- Team Members table
create table team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique not null,
  password text,
  role text check (role in ('admin', 'manager', 'member')) default 'member',
  skills text[] default '{}',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  status text check (status in ('planning', 'in-progress', 'review', 'completed')) default 'planning',
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  start_date date,
  end_date date,
  owner_id uuid references team_members(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tasks table
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  status text check (status in ('todo', 'in-progress', 'review', 'completed')) default 'todo',
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  assignee_id uuid references team_members(id),
  start_date date,
  due_date date,
  estimated_hours numeric(5,2) default 0,
  actual_hours numeric(5,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Resources table
create table resources (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text check (type in ('human', 'equipment', 'software')) default 'human',
  availability text[], -- Array of available time slots
  skills text[],
  hourly_rate numeric(10,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Project Resources junction table (many-to-many relationship)
create table project_resources (
  project_id uuid references projects(id) on delete cascade,
  resource_id uuid references resources(id) on delete cascade,
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (project_id, resource_id)
);

-- Task Comments table
create table task_comments (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade,
  author_id uuid references team_members(id),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Project Files table
create table project_files (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  url text not null,
  file_type text,
  uploaded_by uuid references team_members(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security Policies
alter table team_members enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table resources enable row level security;
alter table project_resources enable row level security;
alter table task_comments enable row level security;
alter table project_files enable row level security;

-- Team Members policies
create policy "Team members are viewable by everyone"
  on team_members for select
  using (true);

create policy "Team members can insert their own profile"
  on team_members for insert
  with check (auth.uid() = id);

create policy "Team members can update their own profile"
  on team_members for update
  using (auth.uid() = id);

-- Projects policies
create policy "Projects are viewable by team members"
  on projects for select
  using (true);

create policy "Team members can insert projects"
  on projects for insert
  with check (true);

create policy "Team members can update projects"
  on projects for update
  using (true);

create policy "Team members can delete projects"
  on projects for delete
  using (true);

-- Tasks policies
create policy "Tasks are viewable by team members"
  on tasks for select
  using (true);

create policy "Team members can insert tasks"
  on tasks for insert
  with check (true);

create policy "Team members can update tasks"
  on tasks for update
  using (true);

create policy "Team members can delete tasks"
  on tasks for delete
  using (true);

-- Insert sample data
insert into team_members (name, email, password, role, skills) values
  ('Admin User', 'admin@accenvix.com', 'admin123', 'admin', ARRAY['management', 'strategy']),
  ('Project Manager', 'pm@accenvix.com', 'manager123', 'manager', ARRAY['planning', 'coordination']),
  ('Developer', 'dev@accenvix.com', 'dev123', 'member', ARRAY['react', 'typescript', 'nodejs']),
  ('Designer', 'design@accenvix.com', 'design123', 'member', ARRAY['ui/ux', 'figma', 'adobe']);

insert into resources (name, type, skills, hourly_rate) values
  ('Development Team', 'human', ARRAY['fullstack', 'frontend', 'backend'], 150.00),
  ('Design Team', 'human', ARRAY['ui/ux', 'graphic design'], 120.00),
  ('Cloud Hosting', 'software', ARRAY['aws', 'azure'], 500.00),
  ('Project Management Tool', 'software', ARRAY['asana', 'jira'], 100.00);