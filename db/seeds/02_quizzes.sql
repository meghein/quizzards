INSERT INTO quizzes
  (creator_id, name, is_public)
VALUES
  (1, 'Francis Facts', true);

INSERT INTO quizzes
  (creator_id, name, is_public)
VALUES
  (1, 'How tall are your classmates?', true);

INSERT INTO quizzes
  (creator_id, name, is_public)
VALUES
  (1, 'Guess the Disney princess?', true);




-- id SERIAL
-- PRIMARY KEY NOT NULL,
--   creator_id INTEGER REFERENCES users
-- (id) ON
-- DELETE CASCADE,
--   name VARCHARR(25)
-- NOT NULL,
--   is_public BOOLEAN NOT NULL DEFAULT true,
