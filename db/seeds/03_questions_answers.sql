INSERT INTO questions
  (text)
VALUES
  ('When Francis has extra cookies, what does he do with them?'),
  ('Francis knows how to:'),
  ('What is Francis secret protest technique?'),
  ('True or False: Francis a will give you cookies some day.');



INSERT INTO answers
  (choice, is_correct)
VALUES
  ('He mails them out to all of the isolated bootcampers when they finish their midterms', true),
  ('He throws them at pigeons outside of his window', false),
  ('He eats them all, and then has a tummy ache', false),
  ('He builds little cookie towers all over his apartment' , false),

  ('Levitate', false),
  ('Forge knives', true),
  ('Train dogs to do backflips', false),
  ('Sing opera', false),

  ('Shirtless screaming', false),
  ('Giving out cookies', false),
  ('Making barricades with shopping carts', true),
  ('Trained support-cats', false),

  ('True', true),
  ('False', false);



-- CREATE TABLE questions
-- (
--   id SERIAL PRIMARY KEY NOT NULL,
--   quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
--   text VARCHAR(255) NOT NULL
-- );


-- CREATE TABLE answers
-- (
--   id SERIAL PRIMARY KEY NOT NULL,
--   question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
--   choice VARCHARR(255) NOT NULL,
--   is_correct BOOLEAN NOT NULL
-- );
