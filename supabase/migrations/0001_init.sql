-- ShininChrist, Milestone 1: initial schema
-- Run in the Supabase SQL editor (or `supabase db push`). Safe to run once on an empty project.
--
-- Design rules (from the client's guides):
--  * Google sign-in only identifies a person. Access depends on memberships.status = 'active',
--    which only an admin (or server code using the service role) can set.
--  * Users can edit their own personal details but never their status, role, Member ID or payments.
--  * Every payment goes through one `payments` table so more gateways can be added later.
--  * Proof screenshots and consent forms live in PRIVATE storage buckets (see the end of this file).
--  * Sessions ("log out of all devices", admin session control) use Supabase Auth itself
--    (auth.admin.signOut / refresh-token revocation); no custom sessions table is needed.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type app_role as enum ('pending', 'active_member', 'learner', 'teacher', 'admin', 'super_admin');

-- Registration status machine (Join guide, section 5), plus 'suspended'.
create type membership_status as enum (
  'started',
  'form_completed',
  'subscription_pending',
  'subscription_verified',
  'consent_pending',
  'consent_verified',
  'uniform_payment_pending',
  'payment_confirmed',
  'approved',
  'active',
  'suspended'
);

create type chapter_choice as enum ('men', 'women', 'youth');
create type review_status as enum ('not_submitted', 'pending', 'verified', 'rejected');
create type social_platform as enum ('youtube', 'facebook', 'instagram', 'tiktok');
create type payment_status as enum ('created', 'pending', 'pending_verification', 'confirmed', 'failed', 'cancelled', 'refunded');
create type payment_purpose as enum ('uniform', 'donation', 'store_order', 'academy', 'other');
create type order_status as enum ('requested', 'payment_pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled');
create type submission_type as enum (
  'invite_mercy', 'volunteer_time', 'volunteer_skills', 'serve_prayer', 'field_service', 'partner',
  'give_in_kind', 'give_property', 'contact', 'other'
);
create type submission_status as enum ('submitted', 'under_review', 'accepted', 'declined', 'scheduled', 'completed');
create type resource_access as enum ('free', 'contribution');

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- profiles: personal details the user may edit (one row per auth user)
-- ---------------------------------------------------------------------------
create table profiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  email          text not null,
  full_name      text,
  date_of_birth  date,
  gender         text check (gender in ('male', 'female')),
  country_code   char(2),               -- ISO code: NG, JM, US ...
  state_region   text,
  whatsapp       text,
  area_of_interest text check (area_of_interest in ('Men', 'Women', 'Youth', 'Academy')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create trigger profiles_updated before update on profiles for each row execute function set_updated_at();

-- Create a profile + a 'started' membership as soon as someone signs in with Google.
create or replace function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'));
  insert into memberships (user_id) values (new.id);
  insert into user_roles (user_id, role) values (new.id, 'pending');
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- user_roles: a user may hold several roles (e.g. active_member + teacher)
-- ---------------------------------------------------------------------------
create table user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role    app_role not null,
  primary key (user_id, role)
);

-- ---------------------------------------------------------------------------
-- memberships: status, chapter, Member ID. Written ONLY by admins / server (never by the user).
-- ---------------------------------------------------------------------------
create table memberships (
  user_id          uuid primary key references auth.users (id) on delete cascade,
  status           membership_status not null default 'started',
  chapter          chapter_choice,
  member_id        text unique,                     -- e.g. SC-NG-0000128, issued on activation
  is_minor         boolean not null default false,  -- set from date_of_birth by the server
  -- YouTube / social proof (Join guide + client edit: at least one of four platforms)
  social_platform  social_platform,
  proof_path       text,                            -- private storage path, never a public URL
  proof_status     review_status not null default 'not_submitted',
  -- Parental consent (required when is_minor)
  consent_path     text,
  consent_status   review_status not null default 'not_submitted',
  activated_at     timestamptz,
  approved_by      uuid references auth.users (id),
  admin_notes      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create trigger memberships_updated before update on memberships for each row execute function set_updated_at();
create index memberships_status_idx on memberships (status);

create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- ---------------------------------------------------------------------------
-- Member ID: SC-<country>-<7 digits>, counted per country
-- ---------------------------------------------------------------------------
create table member_id_counters (
  country_code char(2) primary key,
  last_number  integer not null default 0
);

create or replace function issue_member_id(p_country char(2)) returns text language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  insert into member_id_counters (country_code, last_number) values (upper(p_country), 1)
  on conflict (country_code) do update set last_number = member_id_counters.last_number + 1
  returning last_number into n;
  return 'SC-' || upper(p_country) || '-' || lpad(n::text, 7, '0');
end $$;
revoke all on function issue_member_id(char) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Uniform orders (required step before activation)
-- ---------------------------------------------------------------------------
create table uniform_orders (
  id             uuid primary key default gen_random_uuid(),
  reference      text unique not null default 'UNI-' || to_char(now(), 'YYYY') || '-' || lpad((floor(random() * 1000000))::int::text, 6, '0'),
  user_id        uuid not null references auth.users (id) on delete cascade,
  uniform_type   text not null default 'T-shirt',
  size           text not null check (size in ('S', 'M', 'L', 'XL', 'XXL')),
  quantity       integer not null default 1 check (quantity between 1 and 20),
  country_code   char(2) not null,
  delivery_address text not null,
  delivery_city  text not null,
  delivery_state text,
  delivery_phone text not null,
  uniform_cost   numeric(12, 2),            -- set by the server from the price list, never by the browser
  delivery_cost  numeric(12, 2),
  total          numeric(12, 2),
  currency       char(3) not null default 'NGN',
  status         order_status not null default 'requested',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create trigger uniform_orders_updated before update on uniform_orders for each row execute function set_updated_at();
create index uniform_orders_user_idx on uniform_orders (user_id);

-- Prices per country, editable by admins.
create table uniform_prices (
  country_code  char(2) primary key,
  currency      char(3) not null,
  uniform_price numeric(12, 2) not null,
  delivery_fee  numeric(12, 2) not null default 0,
  active        boolean not null default true
);

-- ---------------------------------------------------------------------------
-- payments: ONE table for every gateway (Paystack first; Flutterwave, Stripe, PayPal, bank later)
-- ---------------------------------------------------------------------------
create table payments (
  id              uuid primary key default gen_random_uuid(),
  internal_ref    text unique not null default 'PAY-' || replace(gen_random_uuid()::text, '-', ''),
  user_id         uuid references auth.users (id) on delete set null,   -- null for anonymous donors
  purpose         payment_purpose not null,
  uniform_order_id uuid references uniform_orders (id) on delete set null,
  amount          numeric(12, 2) not null check (amount > 0),
  currency        char(3) not null,
  gateway         text not null,                       -- 'paystack' | 'flutterwave' | 'stripe' | 'paypal' | 'bank_transfer'
  gateway_ref     text,                                -- the gateway's own reference / transaction id
  status          payment_status not null default 'created',
  payer_name      text,
  payer_email     text,
  country_code    char(2),
  designation     text,                                -- donations: "Where most needed" etc.
  is_recurring    boolean not null default false,
  verified_at     timestamptz,                         -- set ONLY after server-side verification / signed webhook
  raw_event       jsonb,                               -- last webhook payload, for audit
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (gateway, gateway_ref)                        -- makes webhook handling idempotent
);
create trigger payments_updated before update on payments for each row execute function set_updated_at();
create index payments_user_idx on payments (user_id);
create index payments_status_idx on payments (status);

-- ---------------------------------------------------------------------------
-- Form submissions: Invite Mercy, Serve forms, Give in-kind / major assets, Contact
-- ---------------------------------------------------------------------------
create table form_submissions (
  id          uuid primary key default gen_random_uuid(),
  reference   text unique not null default 'SUB-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)),
  type        submission_type not null,
  status      submission_status not null default 'submitted',
  user_id     uuid references auth.users (id) on delete set null,   -- optional: forms are public
  name        text,
  email       text,
  data        jsonb not null,                                       -- all form fields
  file_paths  text[] not null default '{}',                         -- private storage paths
  admin_notes text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger form_submissions_updated before update on form_submissions for each row execute function set_updated_at();
create index form_submissions_type_idx on form_submissions (type, status);

-- ---------------------------------------------------------------------------
-- Library: resources (members only) and downloads / "give what you can" contributions
-- ---------------------------------------------------------------------------
create table library_resources (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text,
  content_type text,            -- teaching, prayer, music, book, download ...
  collection   text,            -- ShininPurpose, ShininFaith, ShininDaily ...
  audience     text,
  scripture    text,
  file_path    text,            -- private storage path
  access       resource_access not null default 'free',
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger library_resources_updated before update on library_resources for each row execute function set_updated_at();

create table resource_downloads (
  id           uuid primary key default gen_random_uuid(),
  resource_id  uuid not null references library_resources (id) on delete cascade,
  user_id      uuid not null references auth.users (id) on delete cascade,
  contribution numeric(12, 2) not null default 0 check (contribution >= 0),   -- $0 still unlocks a free resource
  payment_id   uuid references payments (id),
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Store (public). Products + orders; prices shown as written, so text is fine for now.
-- ---------------------------------------------------------------------------
create table store_products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  subtitle    text,
  category    text not null,    -- Books, Music, Merchandise, Study Materials, Digital Products
  grp         text,             -- Album, Singles, WAEC, ...
  type        text,
  price       numeric(12, 2),
  currency    char(3) not null default 'USD',
  images      text[] not null default '{}',
  description text,
  preview_url text,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger store_products_updated before update on store_products for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Site settings (footer links, contact details, social URLs) editable by admins
-- ---------------------------------------------------------------------------
create table site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Audit log: role, status, payment and session changes
-- ---------------------------------------------------------------------------
create table audit_log (
  id         bigint generated always as identity primary key,
  actor_id   uuid references auth.users (id) on delete set null,
  action     text not null,        -- 'membership.activate', 'session.revoke', 'payment.confirm' ...
  target     text,                 -- table / id the action touched
  details    jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Access helpers used by the policies (security definer so they cannot be spoofed)
-- ---------------------------------------------------------------------------
create or replace function has_role(r app_role) returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from user_roles where user_id = auth.uid() and role = r);
$$;

create or replace function is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from user_roles where user_id = auth.uid() and role in ('admin', 'super_admin'));
$$;

-- The core rule: only an ACTIVE membership unlocks member content. Google login alone never does.
create or replace function is_active_member() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from memberships where user_id = auth.uid() and status = 'active');
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table profiles            enable row level security;
alter table user_roles          enable row level security;
alter table memberships         enable row level security;
alter table member_id_counters  enable row level security;
alter table uniform_orders      enable row level security;
alter table uniform_prices      enable row level security;
alter table payments            enable row level security;
alter table form_submissions    enable row level security;
alter table library_resources   enable row level security;
alter table resource_downloads  enable row level security;
alter table store_products      enable row level security;
alter table site_settings       enable row level security;
alter table audit_log           enable row level security;

-- profiles: read/update own; admins read all
create policy profiles_select on profiles for select using (id = auth.uid() or is_admin());
create policy profiles_update on profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_admin_update on profiles for update using (is_admin());

-- user_roles: read own; only admins change roles (no user policy to insert/update/delete)
create policy user_roles_select on user_roles for select using (user_id = auth.uid() or is_admin());
create policy user_roles_admin_write on user_roles for all using (is_admin()) with check (is_admin());

-- memberships: read own; ONLY admins write (status, chapter, Member ID are never user-editable).
-- The browser may call a server action to save the chapter and proof path; that runs with the service role.
create policy memberships_select on memberships for select using (user_id = auth.uid() or is_admin());
create policy memberships_admin_write on memberships for all using (is_admin()) with check (is_admin());

-- uniform_orders: a user sees and creates their own; the server sets prices and status
create policy uniform_orders_select on uniform_orders for select using (user_id = auth.uid() or is_admin());
create policy uniform_orders_insert on uniform_orders for insert with check (user_id = auth.uid() and status = 'requested');
create policy uniform_orders_admin_write on uniform_orders for update using (is_admin());

create policy uniform_prices_read on uniform_prices for select using (active or is_admin());
create policy uniform_prices_admin_write on uniform_prices for all using (is_admin()) with check (is_admin());

-- payments: a user reads their own; ALL writes come from the server (service role bypasses RLS)
create policy payments_select on payments for select using (user_id = auth.uid() or is_admin());
create policy payments_admin_write on payments for update using (is_admin());

-- form_submissions: anyone may submit (public forms); only admins read and manage
create policy submissions_insert on form_submissions for insert with check (status = 'submitted');
create policy submissions_select on form_submissions for select using (user_id = auth.uid() or is_admin());
create policy submissions_admin_write on form_submissions for update using (is_admin());

-- library: ONLY active members (or admins) see anything; published resources only for members
create policy library_select on library_resources for select using (is_admin() or (published and is_active_member()));
create policy library_admin_write on library_resources for all using (is_admin()) with check (is_admin());
create policy downloads_select on resource_downloads for select using (user_id = auth.uid() or is_admin());
create policy downloads_insert on resource_downloads for insert with check (user_id = auth.uid() and is_active_member());

-- store: public read of published products; admins manage
create policy store_select on store_products for select using (published or is_admin());
create policy store_admin_write on store_products for all using (is_admin()) with check (is_admin());

-- site settings: public read (footer, contact), admin write
create policy settings_select on site_settings for select using (true);
create policy settings_admin_write on site_settings for all using (is_admin()) with check (is_admin());

-- audit log + counters: admins read; writes only from the server
create policy audit_select on audit_log for select using (is_admin());
create policy counters_admin on member_id_counters for select using (is_admin());

-- ---------------------------------------------------------------------------
-- Activation helper (call from the admin panel / server only)
-- Checks every requirement from the Join guide before it flips the status to 'active'.
-- ---------------------------------------------------------------------------
create or replace function activate_member(p_user uuid) returns text language plpgsql security definer set search_path = public as $$
declare
  m memberships%rowtype;
  p profiles%rowtype;
  paid boolean;
  new_id text;
begin
  if not is_admin() then raise exception 'Only an admin can activate a member'; end if;

  select * into m from memberships where user_id = p_user;
  select * into p from profiles where id = p_user;
  if m.user_id is null then raise exception 'Membership not found'; end if;

  select exists (
    select 1 from payments pay
    join uniform_orders o on o.id = pay.uniform_order_id
    where o.user_id = p_user and pay.purpose = 'uniform' and pay.status = 'confirmed' and pay.verified_at is not null
  ) into paid;

  if p.full_name is null or p.date_of_birth is null or p.country_code is null then raise exception 'Registration form is incomplete'; end if;
  if m.proof_status <> 'verified' then raise exception 'Social subscription proof is not verified'; end if;
  if m.is_minor and m.consent_status <> 'verified' then raise exception 'Parental consent is not verified'; end if;
  if not paid then raise exception 'Uniform payment is not confirmed'; end if;

  new_id := coalesce(m.member_id, issue_member_id(p.country_code));
  update memberships
     set status = 'active', member_id = new_id, activated_at = now(), approved_by = auth.uid()
   where user_id = p_user;
  delete from user_roles where user_id = p_user and role = 'pending';
  insert into user_roles (user_id, role) values (p_user, 'active_member') on conflict do nothing;
  insert into audit_log (actor_id, action, target, details)
  values (auth.uid(), 'membership.activate', p_user::text, jsonb_build_object('member_id', new_id));
  return new_id;
end $$;

-- ---------------------------------------------------------------------------
-- Storage: PRIVATE buckets (nothing here is ever public)
-- Files are written by the server (service role) and read by admins through signed URLs.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values
  ('proofs',        'proofs',        false),   -- YouTube / social subscription screenshots
  ('consents',      'consents',      false),   -- signed parental consent forms
  ('submissions',   'submissions',   false),   -- files attached to forms (invitation letters, asset photos)
  ('library-files', 'library-files', false)    -- member downloads
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- First admin: after you sign in once with Google, run (replace the email):
--   insert into user_roles (user_id, role)
--   select id, 'super_admin' from auth.users where email = 'you@example.com';
-- ---------------------------------------------------------------------------
