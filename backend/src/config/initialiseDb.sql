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