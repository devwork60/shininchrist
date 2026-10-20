-- Manual bank-transfer payments (receipt upload + admin verification) next to Paystack card payments.
--  * payments.gateway = 'bank_transfer' is the payment METHOD; payments.status is the payment STATE.
--  * 'confirmed' is the existing "paid" state. Only Paystack verification or an admin approval can set it.
--  * Receipts live in a PRIVATE bucket; only admins can read them (through short-lived signed links).
--  * Both new tables have RLS on and no policies: they are reached only by server code that checks the role.

alter type payment_status add value if not exists 'rejected';

alter table payments
  add column if not exists receipt_path     text,
  add column if not exists submitted_at     timestamptz,
  add column if not exists reviewed_by      uuid references auth.users (id) on delete set null,
  add column if not exists reviewed_at      timestamptz,
  add column if not exists rejection_reason text;

-- A person can have only ONE bank-transfer payment waiting for review (stops double submits).
create unique index if not exists payments_one_open_bank_transfer
  on payments (user_id)
  where gateway = 'bank_transfer' and status = 'pending_verification';

-- Verification history shown to admins: submitted, resubmitted, approved, rejected.
create table if not exists payment_events (
  id         bigint generated always as identity primary key,
  payment_id uuid not null references payments (id) on delete cascade,
  event      text not null,
  actor_id   uuid references auth.users (id) on delete set null,
  note       text,
  created_at timestamptz not null default now()
);
create index if not exists payment_events_payment_idx on payment_events (payment_id, created_at);
alter table payment_events enable row level security;

-- Bank account shown to people who choose bank transfer. One per currency, edited by admins.
create table if not exists bank_accounts (
  currency       char(3) primary key,
  bank_name      text not null,
  account_title  text not null,
  account_number text not null,
  instructions   text,
  active         boolean not null default true,
  updated_by     uuid references auth.users (id) on delete set null,
  updated_at     timestamptz not null default now()
);
alter table bank_accounts enable row level security;

-- Private receipt storage: members write only into their own folder; only admins can read.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receipts', 'receipts', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = false,
      file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

create policy "members upload own receipts"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'receipts' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "admins read receipts"
  on storage.objects for select to authenticated
  using (bucket_id = 'receipts' and public.is_admin());
