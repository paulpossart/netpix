BEGIN;

CREATE SCHEMA netpix;

CREATE TABLE netpix.session (
  sid text PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);

CREATE INDEX "IDX_session_expire" ON netpix.session (expire);

CREATE TABLE netpix.users(
    id UUID PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_username_idx ON netpix.users (username);

CREATE TABLE netpix.movies (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES netpix.users(id) ON DELETE CASCADE,
    movie_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table limits
-- session
CREATE OR REPLACE FUNCTION prevent_excess_netpix_sessions()
RETURNS trigger AS $$
BEGIN
    IF (SELECT COUNT(*) FROM netpix.session) >= 5000 THEN
        RAISE EXCEPTION 'Session limit reached — cannot create new.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER netpix_session_limit_trigger
BEFORE INSERT ON netpix.session
FOR EACH ROW EXECUTE FUNCTION prevent_excess_netpix_sessions();

-- users
CREATE OR REPLACE FUNCTION prevent_excess_netpix_users()
RETURNS trigger AS $$
BEGIN
    IF (SELECT COUNT(*) FROM netpix.users) >= 1000 THEN
        RAISE EXCEPTION 'User limit reached — cannot create new users.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER netpix_users_limit_trigger
BEFORE INSERT ON netpix.users
FOR EACH ROW EXECUTE FUNCTION prevent_excess_netpix_users();

-- movies
CREATE OR REPLACE FUNCTION prevent_excess_netpix_movies()
RETURNS trigger AS $$
BEGIN
    IF (SELECT COUNT(*) FROM netpix.movies) >= 10000 THEN
        RAISE EXCEPTION 'Movie storage limit reached.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER netpix_movies_limit_trigger
BEFORE INSERT ON netpix.movies
FOR EACH ROW EXECUTE FUNCTION prevent_excess_netpix_movies();

COMMIT;