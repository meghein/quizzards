/* eslint-disable camelcase */
module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users;`,
    };

    return db.query(query).then((result) => result.rows);
  };

  const addUser = (name, email, password) => {
    const query = {
      text: `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      values: [name, email, password]
    };

    return db.query(query).then((result) => result.rows[0]);
  };


  // write query that adds quiz name to
  // creator_id currently hard-coded - must accept creator_id later
  // only adding to quizzes table right now
  // leaving is_public defaulting to true right now

  const addQuiz = (creator_id, name, is_public) => {
    const query = {
      text: `INSERT INTO quizzes(creator_id, name, is_public) VALUES ($1, $2, $3) RETURNING *`,
      values: [creator_id, name, is_public]
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const addQuestion = (quiz_id, question_1) => {
    const query = {
      text: `INSERT INTO questions(quiz_id, text)
      VALUES ($1, $2)
      RETURNING *`,
      values: [quiz_id, question_1]
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const addAnswers = (question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4) => {
    const query = {
      text: `INSERT INTO answers(question_id, is_correct, choice)
      VALUES ($1, $3, $2),
      ($1, $5, $4),
      ($1, $7, $6),
      ($1, $9, $8)
      RETURNING *`,
      values: [question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4]
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const getAllQuizzes = function(options, limit = 6) {
    const queryParams = [];

    let queryString = `
    SELECT *
    FROM quizzes
    WHERE is_public=true
    `;

    // console.log(queryString, queryParams);

    return db.query(queryString, queryParams)
      .then(res => res.rows);
  };


  const getQuizzesByCreatorId = function(creator_id, limit) {
    const queryParams = [];

    let queryString = `
    SELECT *
    FROM quizzes
    WHERE quizzes.creator_id = $1
    ORDER BY is_public;
    `;

    queryParams.push(creator_id);

    return db.query(queryString, queryParams)
      .then(res => res.rows);
  };

  const getQuizById = function(id, limit) { //would need to create a search form by name or id
    const queryParams = [];

    let queryString = `
    SELECT *
    FROM quizzes
    WHERE quizzes.id = $1
    LIMIT 1;
    `;

    queryParams.push(id);
    // console.log("dbQuery:", queryString, "the param:", queryParams);

    return db.query(queryString, queryParams)
      .then(res => res.rows[0]);
  };

  const getQuizQuestions = function(quizId) {
    const queryParams = [];

    let queryString = `
    SELECT questions.*
    FROM questions
    JOIN quizzes ON questions.quiz_id = quizzes.id
    WHERE quizzes.id = $1;
    `;

    queryParams.push(quizId);

    return db.query(queryString, queryParams)
      .then(res => res.rows);
  };

  const getQuestionAnswers = function(questionId) {
    const queryParams = [];

    let queryString = `
    SELECT answers.*
    FROM answers
    JOIN questions ON answers.question_id = questions.id
    WHERE questions.id = $1;
    `;

    queryParams.push(questionId);

    return db.query(queryString, queryParams)
      .then(res => res.rows);
  };

  const isUser = function(email) {
    const queryString = `SELECT * FROM users
    WHERE users.email = $1
    `;

    return db.query(queryString, [email]).then(res => {
      return res.rows.length > 0;
    });
  };

  const getUserById = function(email) {
    const queryString = `SELECT * FROM users
    WHERE users.email = $1
    `;

    return db.query(queryString, [email]).then(res => {
      console.log("getUserById:", res.rows[0]);

      return res.rows[0];
    });
  };

  const checkAnswers = (key, value) => {
    const query = {
      text: `SELECT answers.*, quizzes.id as quiz_id
      FROM answers
      JOIN questions ON questions.id = question_id
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE question_id = $1
      AND answers.id = $2`,
      values: [key, value]
    };
    return db.query(query).then((res) => res.rows[0]);
  };

  const storeAnswers = (results) => {
    let score = 0;
    const promises = [];
    const answersArr = [];
    for (let key in results) {
      promises.push(checkAnswers(key, results[key]));
    }

    return Promise.all(promises).then(results => {
      for (let answer in results) {
        answersArr.push(results[answer].is_correct);
        if (results[answer].is_correct) {
          score++;
        }
      }
      console.log("score:", score);
      console.log("answersArr:", answersArr);
      return { score, answersArr };
    });
  };

  const getUserResults = (resultId) => {
    const query = `
    SELECT array_agg(answers.is_correct) as answers,
           sum(case when answers.is_correct then 1 else 0 end) as correct
    FROM results
    JOIN responses ON responses.result_id = results.id
    JOIN answers ON answers.id = responses.answer_id
    WHERE results.id = $1`;

    return db.query(query, [resultId])
      .then((res) => {
        const info = res.rows[0];
        info.score = info.correct / info.answers.length;
        return info;
      });
  };

  const addUserResults = (userId, quizId) => {
    const query = {
      text: `INSERT INTO results(user_id, quiz_id)
      VALUES ($1, $2)
      RETURNING *;`,
      values: [userId, quizId]
    };
    return db.query(query)
      .then(res => res.rows[0]);
  };

  const addUserResponse = (questionId, answerId, resultsId) => {
    const query = {
      text: `INSERT INTO responses(question_id, answer_id, result_id)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      values: [questionId, answerId, resultsId]
    };
    return db.query(query)
      .then(res => res.rows);
  };

  // const getAllUserResults = () => {
  //   const reqParams = [];
  //   const query = `
  //   SELECT  users.name,
  //           array_agg(answers.is_correct) as answers,
  //           sum(case when answers.is_correct then 1 else 0 end) as correct
  //   FROM results
  //   JOIN users ON users.id = results.user_id
  //   JOIN responses ON responses.result_id = results.id
  //   JOIN answers ON answers.id = responses.answer_id
  //   GROUP BY users.id
  //   LIMIT 10
  //   `;

  //   return db.query(query, reqParams)
  //     .then((res) => {
  //       const info = res.rows;
  //       return info;
  //     });
  // };

  const getAllUserResults = () => {
    const reqParams = [];
    const query = `
    SELECT  users.name,
            array_agg(answers.is_correct) as answers,
            sum(case when answers.is_correct then 1 else 0 end) as correct
    FROM results
    JOIN users ON users.id = results.user_id
    JOIN responses ON responses.result_id = results.id
    JOIN answers ON answers.id = responses.answer_id
    GROUP BY users.id
    LIMIT 10
    `;

    return db.query(query, reqParams)
      .then((res) => {
        const info = res.rows;
        return info;
      });
  }


  return {
    getUsers,
    addUser,
    getAllQuizzes,
    getQuizzesByCreatorId,
    getQuizById,
    addQuiz,
    addQuestion,
    addAnswers,
    getQuizQuestions,
    getQuestionAnswers,
    isUser,
    getUserById,
    checkAnswers,
    storeAnswers,
    addUserResults,
    addUserResponse,
    getUserResults,
    getAllUserResults
  };
};
