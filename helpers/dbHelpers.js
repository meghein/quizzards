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

    return db.query(query).then((result) => result.rows);
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
    }

    return db.query(query).then((result) => result.rows[0]);
  }






  const getAllQuizzes = function(options, limit = 6) {
    const queryParams = [];

    let queryString = `
    SELECT *
    FROM quizzes
    WHERE is_public=true
    `;

    console.log(queryString, queryParams);

    return db.query(queryString, queryParams)
      .then(res => res.rows);
  };

  return {
    getUsers,
    addUser,
    getAllQuizzes,
    addQuiz,
    addQuestion,
    addAnswers

  };
};
