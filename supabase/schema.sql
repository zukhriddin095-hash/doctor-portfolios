-- Run once in Supabase: SQL Editor -> New query
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  rating smallint not null check (rating between 1 and 5),
  text text not null check (char_length(text) between 10 and 1000),
  locale text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text,
  locale text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);
-- RLS on, no policies: the public anon key can read/write nothing.
-- The site's server routes use the service role key, which bypasses RLS.
alter table public.reviews enable row level security;
alter table public.appointments enable row level security;
create index if not exists reviews_public_idx on public.reviews (approved, created_at desc);
