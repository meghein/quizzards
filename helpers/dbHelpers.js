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

  const getQuizById = function(options, limit = 1) { //would need to create a search form by name or id
    const queryParams = [];

    let queryString = `
    SELECT quizzes.*, questions.text as text
    FROM quizzes
    JOIN questions ON questions.quiz_id = quizzes.id
    `;

    if (options.quiz_id) {
      queryParams.push(`%${options.quiz_id}%`);
    }
    queryParams.push(limit);
    queryString += `
      WHERE is_public = true AND quizzes.id = $${queryParams.length}
      LIMIT $${queryParams.length};
    `;

    console.log("dbQuery:", queryString, "the param:", queryParams);

    return db.query(queryString, queryParams)
      .then(res => res.rows[0]);
  };

  return {
    getUsers,
    addUser,
    getAllQuizzes,
    getQuizById
  };
};
