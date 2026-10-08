CREATE TABLE public.reservations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 reference text NOT NULL UNIQUE,
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 254),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
 date date NOT NULL,
 time text NOT NULL CHECK (time IN ('17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00')),
 guests integer NOT NULL CHECK (guests BETWEEN 1 AND 8),
 table_number integer NOT NULL CHECK (table_number BETWEEN 1 AND 8),
 occasion text NOT NULL DEFAULT 'Dinner',
 special_request text NOT NULL DEFAULT '' CHECK (char_length(special_request) <= 1000),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (date,time,table_number)
);
GRANT ALL ON public.reservations TO service_role;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.reservations IS 'Private guest reservations; validated server actions only. No public personal-data access.';