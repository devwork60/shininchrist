-- Students submit Academy assignments to the admins. They arrive in the same inbox as other form submissions.
alter type public.submission_type add value if not exists 'assignment';
