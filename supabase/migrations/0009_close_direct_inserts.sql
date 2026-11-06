-- QA hardening (Milestone 1: "registration and payment submissions are validated server-side").
--
-- The website saves contact / invite / assignment forms and uniform orders through its own server, which checks every
-- field and works out the price itself. Nothing in the browser writes to these two tables directly, but the original
-- schema left two INSERT policies open:
--   submissions_insert     anyone holding the public key could add inbox entries (spam, or fake "Academy Assignment"
--                          submissions that look like they came from a student);
--   uniform_orders_insert  any signed-in member could add an order with a total of their own choosing.
-- Dropping them closes that door. The server (which does not go through these policies) is unaffected.
-- To undo: re-create the policies exactly as written in 0001_init.sql.
drop policy if exists submissions_insert on form_submissions;
drop policy if exists uniform_orders_insert on uniform_orders;
