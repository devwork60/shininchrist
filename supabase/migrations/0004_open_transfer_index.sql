-- Same rule as before (one bank-transfer payment waiting for review per person), written as an expression
-- index so Prisma does not mistake it for a plain unique on payments.user_id.
drop index if exists payments_one_open_bank_transfer;
create unique index payments_one_open_bank_transfer
  on payments ((user_id::text))
  where gateway = 'bank_transfer' and status = 'pending_verification';
