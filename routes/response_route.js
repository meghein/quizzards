const express = require('express');
const router = express.Router();

module.exports = ({ checkAnswers, addUserResults }) => {

  router.post("/", (req, res) => {
    const response = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined,
      quizResponse: req.body
    };
    console.log("keys:", Object.keys(response.quizResponse));
    console.log("vals:", Object.values(response.quizResponse));

    let results = 0;

    for (let key in req.body) {
      checkAnswers(key, req.body[key])
      .then((answer) => {
        console.log("answers:", answer.is_correct)
        if (answer.is_correct) {
          results++
        }
        return results;
      })
      .then((results) => {
        console.log(results)
      })
    }

    res.redirect("/");
  });

  return router;
};
