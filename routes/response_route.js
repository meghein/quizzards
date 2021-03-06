const express = require('express');
const router = express.Router();

module.exports = ({ addUserResults, addUserResponse, getUserResults }) => {

  // post request to access user results from a quiz attempt
  router.post("/:id", (req, res) => {
    console.log(req.body);
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined,
      quizId: req.params.id
    };
    addUserResults(templateVars.userId, templateVars["quizId"])
      .then((result) => {
        const promises = [Promise.resolve(result.id)];
        for (let key in req.body) {
          promises.push(addUserResponse(key, req.body[key], result.id));
        }
        return Promise.all(promises).then(responses => {
          return responses;
        });
      })
      .then(([resultId, _responses]) => {
        return getUserResults(resultId);
      })
      .then((results) => res.json(results))
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  // get request for showing user results based on a specific quiz attempt
  router.get("/:resultId", (req, res) => {
    getUserResults(req.params.resultId)
      .then((results) => {
        const templateVars = {
          user: req.session["user"],
          userId: req.session["user_id"] ? req.session["user_id"] : undefined,
          answers: results.answers,
          correct: results.correct,
          score: results.score,
          homepage: false,
          quiz: results.name
        };
        res.render('quiz_results', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
