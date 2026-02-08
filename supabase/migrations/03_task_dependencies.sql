-- Task Dependencies Migration

-- Create task dependencies table
create table if not exists task_dependencies (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade,
  depends_on_task_id uuid references tasks(id) on delete cascade,
  dependency_type text check (dependency_type in ('finish-to-start', 'start-to-start', 'finish-to-finish', 'start-to-finish')) default 'finish-to-start',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(task_id, depends_on_task_id)
);

-- Create task comments table
create table if not exists task_comments (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade,
  author_id uuid references team_members(id),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create task attachments table
create table if not exists task_attachments (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  file_size integer,
  uploaded_by uuid references team_members(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for new tables
alter table task_dependencies enable row level security;
alter table task_comments enable row level security;
alter table task_attachments enable row level security;

-- Task Dependencies policies
create policy "Task dependencies are viewable by team members"
  on task_dependencies for select
  using (true);

create policy "Team members can insert task dependencies"
  on task_dependencies for insert
  with check (true);

create policy "Team members can update task dependencies"
  on task_dependencies for update
  using (true);

create policy "Team members can delete task dependencies"
  on task_dependencies for delete
  using (true);

-- Task Comments policies
create policy "Task comments are viewable by team members"
  on task_comments for select
  using (true);

create policy "Team members can insert task comments"
  on task_comments for insert
  with check (true);

create policy "Team members can update their own comments"
  on task_comments for update
  using (auth.uid() = author_id);

create policy "Team members can delete their own comments"
  on task_comments for delete
  using (auth.uid() = author_id);

-- Task Attachments policies
create policy "Task attachments are viewable by team members"
  on task_attachments for select
  using (true);

create policy "Team members can insert task attachments"
  on task_attachments for insert
  with check (true);

create policy "Team members can delete task attachments"
  on task_attachments for delete
  using (true);

-- Insert sample data for task dependencies
-- Note: This assumes tasks already exist, so we'll add this as a separate script if needed