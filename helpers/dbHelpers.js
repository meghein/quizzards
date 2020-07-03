// Helper functions to access database //

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users;`,
    };
    return db.query(query).then((result) => result.rows);
  };
  //add a user to the db
  const addUser = (name, email, password) => {
    const query = {
      text: `
        INSERT INTO users(name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      values: [name, email, password]
    };
    return db.query(query).then((result) => result.rows[0]);
  };
  //validation to determine whether someone has an existing email registered
  const isUser = email => {
    const query = {
      text: `
        SELECT * FROM users
        WHERE users.email = $1;
      `,
      values: [email]
    };
    return db.query(query).then(res => res.rows.length > 0);
  };
  //login validation that returns the user ID
  const getUserById = function(email) {
    const query = {
      text: `
      SELECT * FROM users
      WHERE users.email = $1;
      `,
      values: [email]
    };
    return db.query(query).then(res => res.rows[0]);
  };

  const addQuiz = (creator_id, name, is_public) => {
    const query = {
      text: `
        INSERT INTO quizzes(creator_id, name, is_public)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      values: [creator_id, name, is_public]
    };
    return db.query(query).then((result) => result.rows[0]);
  };

  const addQuestion = (quiz_id, question_1) => {
    const query = {
      text: `
        INSERT INTO questions(quiz_id, text)
        VALUES ($1, $2)
        RETURNING *;
      `,
      values: [quiz_id, question_1]
    };
    return db.query(query).then((result) => result.rows[0]);
  };

  const addAnswers = (question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4) => {
    const query = {
      text: `
        INSERT INTO answers(question_id, is_correct, choice)
        VALUES ($1, $3, $2),
        ($1, $5, $4),
        ($1, $7, $6),
        ($1, $9, $8)
        RETURNING *;
      `,
      values: [question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4]
    };
    return db.query(query).then((result) => result.rows[0]);
  };

  const getQuizzesByCreatorId = creator_id => {
    const query = {
      text: `
      SELECT *
      FROM quizzes
      WHERE quizzes.creator_id = $1
      ORDER BY is_public;
      `,
      values: [creator_id]
    };
    return db.query(query).then(res => res.rows);
  };

  // access all public quizzes for the main index.ejs
  const getAllQuizzes = () => {
    const query = `
    SELECT *
    FROM quizzes
    WHERE is_public=true;
    `;
    return db.query(query).then(res => res.rows);
  };

  // quiz GET route functions to find quiz by id
  const getQuizById = id => {
    const query = {
      text: `
      SELECT *
      FROM quizzes
      WHERE quizzes.id = $1
      LIMIT 1;
      `,
      values: [id]
    };
    return db.query(query).then(res => res.rows[0]);
  };

  // generate questions attached to quiz
  const getQuizQuestions = quizId => {
    const query = {
      text: `
      SELECT questions.*
      FROM questions
      JOIN quizzes ON questions.quiz_id = quizzes.id
      WHERE quizzes.id = $1;
      `,
      values: [quizId]
    };
    return db.query(query).then(res => res.rows);
  };

  // generate answers attached to questions
  const getQuestionAnswers = questionId => {
    const query = {
      text: `
        SELECT answers.*
        FROM answers
        JOIN questions ON answers.question_id = questions.id
        WHERE questions.id = $1;
        `,
      values: [questionId]
    };
    return db.query(query).then(res => res.rows);
  };

  // store user responses in database for populating results
  const addUserResponse = (questionId, answerId, resultsId) => {
    const query = {
      text: `
      INSERT INTO responses(question_id, answer_id, result_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      values: [questionId, answerId, resultsId]
    };
    return db.query(query).then(res => res.rows);
  };

  // store user results in database for populating scoreboard
  const addUserResults = (userId, quizId) => {
    const query = {
      text: `
      INSERT INTO results(user_id, quiz_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
      values: [userId, quizId]
    };
    return db.query(query).then(res => res.rows[0]);
  };

  // compile correct answers for response POST and GET routes
  const getUserResults = resultId => {
    const query = {
      text:`
        SELECT results.id, array_agg(answers.is_correct) as answers,
               sum(case when answers.is_correct then 1 else 0 end) as correct,
               quizzes.name
        FROM results
        JOIN responses ON responses.result_id = results.id
        JOIN answers ON answers.id = responses.answer_id
        JOIN quizzes ON quizzes.id = results.quiz_id
        WHERE results.id = $1
        GROUP BY results.id, quizzes.name;
      `,
      values: [resultId]
    };
    return db.query(query, [resultId])
      .then((res) => {
        const info = res.rows[0];
        info.score = info.correct / info.answers.length;
        return info;
      });
  };
  //gets all users quiz results for the scoreboard
  const getAllUserResults = () => {
    const query = `
    SELECT  users.name,
            array_agg(answers.is_correct) as answers,
            sum(case when answers.is_correct then 1 else 0 end) as correct,
            avg(case when answers.is_correct then 1 else 0 end) as average
    FROM results
    JOIN users ON users.id = results.user_id
    JOIN responses ON responses.result_id = results.id
    JOIN answers ON answers.id = responses.answer_id
    GROUP BY users.id
    ORDER BY average DESC
    LIMIT 10;
    `;
    return db.query(query).then(res => res.rows);
  };

  return {
    getUsers,
    addUser,
    isUser,
    getUserById,
    addQuiz,
    addQuestion,
    addAnswers,
    getAllQuizzes,
    getQuizzesByCreatorId,
    getQuizById,
    getQuizQuestions,
    getQuestionAnswers,
    addUserResponse,
    addUserResults,
    getUserResults,
    getAllUserResults,
  };
};
