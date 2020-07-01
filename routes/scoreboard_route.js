const express = require('express');
const router = express.Router();


module.exports = ({
  getAllUserResults
}) => {
  router.get('/', (req, res) => {

    getAllUserResults()
      .then((results) =>{
        let templateVars = {
          user: req.session["user"],
          userId: req.session["user_id"] ? req.session["user_id"] : undefined,
          homepage: false,
          scores: []
        };
        for (const result of results) {
          templateVars.scores.push(
            {score: parseInt(result.correct) / result.answers.length,
              name: result.name});
        }
        console.log("tempVars", templateVars);
        res.render("scoreboard", templateVars);
      }).catch((err) => {
        console.error(err);
      });
  });

  return router;
};
