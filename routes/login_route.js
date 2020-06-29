const express = require('express');
const router = express.Router();

module.exports = ({isUser, getUserById}
) => {
  router.get('/', (req, res) => {
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined
    };
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    const {
      email,
    } = req.body;

    isUser(email).then(function(user) {
      if (user) {
        getUserById(email).then(row => {
          const userId = row.id;
          const user = row;
          req.session["user_id"] = userId;
          req.session["user"] = user;
          console.log("user", userId);

          res.redirect("/");
        });
      } else {
        res.send("you need to register");
      }
    });
  });

  return router;
};
