INSERT INTO questions
  (quiz_id, text)
VALUES
  (1, 'When Francis has extra cookies, what does he do with them?'),
  (1, 'Francis knows how to:'),
  (1, 'What is Francis secret protest technique?'),
  (1, 'True or False: Francis a will give you cookies some day.');



INSERT INTO answers
  (question_id, choice, is_correct)
VALUES
  (1, 'He mails them out to all of the isolated bootcampers when they finish their midterms', true),
  (1, 'He throws them at pigeons outside of his window', false),
  (1, 'He eats them all, and then has a tummy ache', false),
  (1, 'He builds little cookie towers all over his apartment' , false),

  (2, 'Levitate', false),
  (2, 'Forge knives', true),
  (2, 'Train dogs to do backflips', false),
  (2, 'Sing opera', false),

  (3, 'Shirtless screaming', false),
  (3, 'Giving out cookies', false),
  (3, 'Making barricades with shopping carts', true),
  (3, 'Trained support-cats', false),

  (4, 'True', true),
  (4, 'False', false);



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
