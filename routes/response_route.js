const express = require('express');
const router = express.Router();

module.exports = ({ checkAnswers, storeAnswers, addUserResults, addUserResponse, getUserResults }) => {

  router.post("/:id", (req, res) => {
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined,
      quizId: req.params.id
    };


    addUserResults(templateVars.userId, templateVars["quizId"])
    .then((result) => {
      const promises = [Promise.resolve(result.id)];
      for (let key in req.body) {
        promises.push(addUserResponse(key, req.body[key], result.id))
      }
      return Promise.all(promises).then(responses => {
        console.log(responses);
        return responses;
      })
    })
    /* MPA style */
    /*
    .then(([resultId, ...responses]) => {
      // redirect to the page for this result to display it
      res.redirect(`/response/${resultId}`); // this route below would render the results
      return true;
    }). */
    .then(([resultId, _responses]) => {
      return getUserResults(resultId);
    })
    .then((results) => res.json(results))
    .catch((err) => {
      res.status(500).json(err);
    });
  });

  router.get("/:resultId", (req, res) => {

    getUserResults(req.params.resultId)
    .then((results) => {
      // render the page
      res.json({ results });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
