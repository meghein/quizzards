module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users;`,
    };

    return db.query(query).then((result) => result.rows);
  };

  const addUser = (name, email, password) => {
    const query = {
      text: "INSERT INTO users(name) VALUES ($1) RETURNING *",
      values: [name],
    };

    return db.query(query).then((result) => result.rows);
  };

  return {
    getUsers,
    addUser,
  };
};
