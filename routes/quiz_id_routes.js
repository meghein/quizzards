const express = require('express');
const router = express.Router();
//GET | /quizzes/: id | show a quiz
// DELETE | /quizzes/: id | delete a quiz

// In the event of a GET request, asking for /quizzes/somethingIDontKnowYet, do the callback
// :id is a route parameter, accessible in req.params
//retrieves the id pointing to the quiz and populates the long url for reference

module.exports = ({
  getQuizById
}) => {
  router.get('/', (req, res) => {
    // res.render("quiz_id");
    console.log("request:", req.params);

    getQuizById(1)
      .then((quiz) => {
        res.render('quiz_id', {
          templateVars: quiz
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  router.post("/id/delete", (req, res) => {
  //   const user = users[req.session["user_id"]];
  //   if (user) {
  //     const shortURL = req.params.shortURL;
  //     delete urlDatabase[shortURL];
  //     res.redirect("/urls");
  //   }
  //   res.status(403).send("no can do!");
  });

  return router;
};
