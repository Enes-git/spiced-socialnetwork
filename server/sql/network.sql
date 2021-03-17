DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS users;

-- creating users table
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR NOT NULL CHECK (first_name <> ''),
    last_name     VARCHAR NOT NULL CHECK (last_name <> ''),
    email         VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    prof_pic_url  VARCHAR ,
    bio           VARCHAR ,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating reset password codes table
CREATE TABLE reset_codes (
    id            SERIAL PRIMARY KEY,
    code          VARCHAR (6) NOT NULL,
    user_email    VARCHAR NOT NULL REFERENCES users (email),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating friendships table
CREATE TABLE friendships (
    id            SERIAL PRIMARY KEY,
    sender_id     INTEGER NOT NULL REFERENCES users (id),
    recipient_id  INTEGER NOT NULL REFERENCES users (id),
    accepted      BOOLEAN DEFAULT false
);

-- SELECT * FROM users;