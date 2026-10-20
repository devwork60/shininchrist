-- Admin site content, member suspension details, and the uniform "delivery type".

-- 1) Uniform orders record how the uniform gets to the member (Home delivery, Pickup point, ...).
alter table uniform_orders add column if not exists delivery_type text;

-- 2) Why and when a member was suspended (the status itself already exists: memberships.status = 'suspended').
alter table memberships
  add column if not exists suspended_at     timestamptz,
  add column if not exists suspended_by     uuid references auth.users (id) on delete set null,
  add column if not exists suspended_reason text;

-- 3) Editable site content (Invite Mercy, footer, header). One row per section; server-only (RLS on, no policies).
create table if not exists site_content (
  key        text primary key,
  value      jsonb not null,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);
alter table site_content enable row level security;

-- 4) Public images for editable pages (e.g. the Invite Mercy photo). Anyone can SEE them (they are on the public
--    website); only admins can add, replace or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 4194304, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = true,
      file_size_limit = 4194304,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

create policy "admins add site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.is_admin());
create policy "admins replace site media"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.is_admin());
create policy "admins delete site media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.is_admin());
