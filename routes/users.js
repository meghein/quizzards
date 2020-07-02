/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = ({ getUsers, addUser }) => {
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => {
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    //create a new user
    //extract info from request
    const { name, email, password } = req.body;

    //save the user in the db
    addUser(name, email, password)
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  });

  router.get('id', (req, res) => {
    const { id } = req.params;
    res.json({ userID: id });
  });

  return router;
};
