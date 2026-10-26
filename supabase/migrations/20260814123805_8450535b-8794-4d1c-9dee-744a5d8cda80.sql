ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'Nepal',
  ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT 'Bhairahawa / Siddharthanagar',
  ADD COLUMN IF NOT EXISTS requirements TEXT NOT NULL DEFAULT 'Other / Not sure yet',
  ADD COLUMN IF NOT EXISTS start_time TEXT NOT NULL DEFAULT 'Just exploring';

ALTER TABLE public.contact_submissions
  ALTER COLUMN country DROP DEFAULT,
  ALTER COLUMN city DROP DEFAULT,
  ALTER COLUMN requirements DROP DEFAULT,
  ALTER COLUMN start_time DROP DEFAULT;