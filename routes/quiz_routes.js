// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();

module.exports = ({getAllQuizzes, getQuizById}) => {
  router.get("/", (req, res) => {
    getAllQuizzes()
      .then((quizzes) => {
        res.render('quizzes', {templateVars: quizzes});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/json", (req, res) => {
    getAllQuizzes()
      .then((quizzes) => {
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {
    // res.render("quiz_id");
    console.log("request:", req.params);

    getQuizById(req.params.id)
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
