-- Super admin profile seeder (safe to run again; it updates the same account).
--
-- 1. Edit the values in the `me` block below (especially anything marked PLACEHOLDER).
-- 2. Run it:  npx supabase db query --db-url "<DIRECT_URL from .env.local>" -f supabase/seed/super-admin.sql
--
-- The person must have signed in with Google once, so the account already exists in auth.users.
-- This marks the account as a STAFF member: active, with a Member ID, without needing the
-- uniform payment or proof upload that normal applicants must complete. The action is written to audit_log.

with me as (
  select
    'in.sultan60@gmail.com'::text   as email,
    'Imran Nasir'::text             as full_name,    -- from the Google account
    date '1990-01-01'               as dob,          -- PLACEHOLDER: replace with the real date of birth
    'male'::text                    as gender,       -- PLACEHOLDER: 'male' or 'female'
    'NG'::char(2)                   as country,      -- PLACEHOLDER: NG, JM, US, GH, KE, ZA, GB or CA
    'Lagos'::text                   as state_region, -- PLACEHOLDER
    '+234 800 000 0000'::text       as whatsapp,     -- PLACEHOLDER: the real WhatsApp number
    'Men'::text                     as interest,     -- Men, Women, Youth or Academy
    'men'::chapter_choice           as chapter       -- men, women or youth (match the interest)
),
target as (
  select u.id, me.* from auth.users u join me on lower(u.email) = lower(me.email)
),
p as (
  update public.profiles pr
     set full_name = t.full_name, date_of_birth = t.dob, gender = t.gender, country_code = t.country,
         state_region = t.state_region, whatsapp = t.whatsapp, area_of_interest = t.interest
    from target t where pr.id = t.id
  returning pr.id
),
m as (
  update public.memberships ms
     set status = 'active', chapter = t.chapter, is_minor = false,
         social_platform = coalesce(ms.social_platform, 'youtube'), proof_status = 'verified', consent_status = 'not_submitted',
         member_id = coalesce(ms.member_id, public.issue_member_id(t.country)),
         activated_at = coalesce(ms.activated_at, now()), approved_by = t.id,
         admin_notes = 'Staff account: activated by the super admin seeder (supabase/seed/super-admin.sql).'
    from target t where ms.user_id = t.id
  returning ms.user_id, ms.member_id
),
r as (
  insert into public.user_roles (user_id, role)
  select id, x.role from target, (values ('active_member'::app_role), ('super_admin'::app_role)) as x(role)
  on conflict do nothing
  returning user_id
),
d as (
  delete from public.user_roles ur using target t where ur.user_id = t.id and ur.role = 'pending' returning ur.user_id
),
a as (
  insert into public.audit_log (actor_id, action, target, details)
  select id, 'seed.super_admin', id::text, jsonb_build_object('source', 'supabase/seed/super-admin.sql') from target
  returning id
)
select (select count(*) from target) as account_found, (select count(*) from p) as profile_updated,
       (select member_id from m) as member_id;
