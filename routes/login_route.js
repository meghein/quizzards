const express = require('express');
const router = express.Router();

module.exports = ({ isUser, getUserById }
) => {
  router.get('/', (req, res) => {
    // passed templateVars to the header partial from cookie session
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined,
      homepage: false
    };
    res.render("login", templateVars);
  });

  // checks the users email to validate login and sets the cookie session
  router.post("/", (req, res) => {
    const { email } = req.body;
    isUser(email).then(function(user) {
      if (user) {
        getUserById(email).then(row => {
          const userId = row.id;
          const user = row;
          req.session["user_id"] = userId;
          req.session["user"] = user;
          res.redirect("/");
        });
      } else {
        res
          .status(400)
          .send("The login information provided does not match a registered user account. Please try again, or register for a new Quizzards account.");
      }
    });
  });

  return router;
};
