-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHARR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);
