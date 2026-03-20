-- Create a schema for the API
CREATE SCHEMA api;

-- Create the todos table
CREATE TABLE api.todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO api.todos (title, completed) VALUES
  ('Learn Playwright API Testing', false),
  ('Setup PostgreSQL locally', true),
  ('Master PostgREST', false);

-- Create a dedicated user for PostgREST to connect with
CREATE ROLE web_anon NOLOGIN;

-- Grant usage on the api schema to this user
GRANT USAGE ON SCHEMA api TO web_anon;

-- Grant all privileges on the api.todos table (and its sequence) so the API can read/write
GRANT ALL ON api.todos TO web_anon;
GRANT ALL ON SEQUENCE api.todos_id_seq TO web_anon;

-- Create an authenticator user that PostgREST uses to login, then switch to web_anon
CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'secretpassword';
GRANT web_anon TO authenticator;
