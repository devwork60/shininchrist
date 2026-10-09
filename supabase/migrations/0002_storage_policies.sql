-- Private file uploads for the Join flow.
-- Members may upload ONLY into their own folder (<user id>/...) of the proofs and consents buckets.
-- Only admins can read those files (through short-lived signed links). Nobody can edit or delete from the browser.

update storage.buckets
   set file_size_limit = 10485760,                                   -- 10 MB
       allowed_mime_types = array['image/jpeg', 'image/png', 'application/pdf']
 where id in ('proofs', 'consents');

create policy "members upload own proof and consent files"
  on storage.objects for insert to authenticated
  with check (
    bucket_id in ('proofs', 'consents')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "admins read private files"
  on storage.objects for select to authenticated
  using (
    bucket_id in ('proofs', 'consents', 'submissions', 'library-files')
    and public.is_admin()
  );
