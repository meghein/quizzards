const express = require('express');
const router = express.Router();

module.exports = ({ addUser, isUser }) => {
  // gets the registration route and passes the cookie session
  router.get('/', (req, res) => {
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"],
    };
    res.render("register", templateVars);
  });

  // checks whether the users email already exists in the db
  // either redirects them to home or asks them to login
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
          const user = row;
          req.session["user"] = user;
          req.session["user_id"] = userId;
          res.redirect("/");
        });
      } else {
        res
          .status(400)
          .send("Please login.");
      }
    });
  });

  return router;
};
