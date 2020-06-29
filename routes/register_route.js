const express = require('express');
const router = express.Router();

module.exports = ({
  addUser, isUser
}) => {
  router.get('/', (req, res) => {

    res.render("register");
  });

  router.post("/", (req, res) => {
    const {
      name,
      email,
      password
    } = req.body;

    isUser(email).then(function(user) {
      if (!user) {
        addUser(name, email, password).then(row => {
          const userId = row.id;
          req.session["user_id"] = userId;
          res.redirect("/");
        });
      } else {
        res.send("Please login");
      }
    });

  });

  return router;
};
