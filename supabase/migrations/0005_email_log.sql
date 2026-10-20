-- Every transactional email we try to send. The unique dedupe_key means a retried webhook, a double click or a
-- repeated admin action can never send the same email twice. Server-only: RLS on, no policies.
create table if not exists email_log (
  id          bigint generated always as identity primary key,
  dedupe_key  text unique not null,
  template    text not null,
  recipient   text not null,
  status      text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  error       text,
  created_at  timestamptz not null default now(),
  sent_at     timestamptz
);
create index if not exists email_log_created_idx on email_log (created_at desc);
alter table email_log enable row level security;
