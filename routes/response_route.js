const express = require('express');
const router = express.Router();

module.exports = ({addUserResults}
) => {

  router.post("/", (req, res) => {
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined,
      quizResponse: req.body
    };
    console.log(templateVars);

    res.redirect("/");
  });

  return router;
};
