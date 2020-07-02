INSERT INTO questions
  (quiz_id, text)
VALUES
  (1, 'When Francis has extra cookies, what does he do with them?'),
  (1, 'Francis knows how to:'),
  (1, 'What is Francis secret protest technique?'),
  (1, 'Will Francis a will give you cookies some day?'),

  (2, 'What is Vasilys favourite breakfast food?'),
  (2, 'How old is Vasily?'),
  (2, 'What is Vasilys favourite videogame?'),
  (2, 'Another Vasily questions, time to guess.');



INSERT INTO answers
  (question_id, choice, is_correct)
VALUES
  (1, 'He mails them out to all of the isolated bootcampers when they finish their midterms', true),
  (1, 'He throws them at pigeons outside of his window', false),
  (1, 'He eats them all, and then has a tummy ache', false),
  (1, 'He builds little cookie towers all over his apartment' , false),

  (2, 'Levitate', false),
  (2, 'Forge knives', true),
  (2, 'Speak five languages', false),
  (2, 'Sing opera', false),

  (3, 'Shirtless screaming', false),
  (3, 'Giving out cookies', false),
  (3, 'Making barricades with shopping carts', true),
  (3, 'Francis is actually Anonymous, shhh...', false),

  (4, 'Absolutely', true),
  (4, 'Nope', false),
  (4, 'If and only if you do all your stretch', false),
  (4, 'If you pay for it, sure', false),

  (5, 'Pancakes', false),
  (5, 'Cereal', false),
  (5, 'Waffles', true),
  (5, 'Brisket', false),

  (6, 'Eight', false),
  (6, 'Thirteen', false),
  (6, 'Thirty-one', false),
  (6, 'Twenty-Eight', true),

  (7, 'My Hero: One Justice', false),
  (7, 'Slither.io', true),
  (7, 'Legend of Zelda: Ocarina of Time', false),
  (7, 'MYST', false),

  (8, 'This one?', false),
  (8, 'ThIs OnE?', true),
  (8, 'This_one?', false),
  (8, '.this.one.?', false);

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
