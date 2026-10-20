-- Library: real files, download history and limits.
--  * File details for each resource (name shown to the member, type and size).
--  * The private "library-files" bucket gets a size limit and a list of allowed file types.
--  * Files are never public: the server hands out 60-second links after it has checked membership and contribution.

alter table library_resources
  add column if not exists file_name text,
  add column if not exists mime_type text,
  add column if not exists file_size bigint;

update storage.buckets
   set file_size_limit = 52428800,                      -- 50 MB (Supabase's own upload ceiling)
       allowed_mime_types = array[
         'application/pdf', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'video/mp4',
         'application/epub+zip', 'application/zip',
         'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
         'image/jpeg', 'image/png'
       ]
 where id = 'library-files';

-- Used for the "downloads per hour" limit and for "have they already contributed" lookups.
create index if not exists resource_downloads_user_idx on resource_downloads (user_id, created_at desc);
create index if not exists payments_designation_idx on payments (designation) where designation like 'library:%';
