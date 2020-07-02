const express = require('express');
const router = express.Router();

module.exports = ({ addUserResults, addUserResponse, getUserResults }) => {

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
        return getUserResults(resultId); // => if we end up going the SPA way
        // res.redirect(`/response/${resultId}`);
        // return true;
      })
      .then((results) => res.json(results))
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get("/:resultId", (req, res) => {

    getUserResults(req.params.resultId)
      .then((results) => {
        const templateVars = {
          user: req.session["user"],
          userId: req.session["user_id"] ? req.session["user_id"] : undefined,
          answers: results.answers,
          correct: results.correct,
          score: results.score,
          homepage: false
        };
        // console.log("tempVars:", templateVars)
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
