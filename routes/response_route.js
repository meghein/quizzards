const express = require('express');
const router = express.Router();

module.exports = ({addUserResults}
) => {

  router.post("/", (req, res) => {
<<<<<<< HEAD
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined,
      quizResponse: req.body
    };
    console.log(templateVars);
=======
    const quizResponse = req.body;
    console.log(quizResponse);
>>>>>>> master

    res.redirect("/");
  });

  return router;
};
