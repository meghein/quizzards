// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();

module.exports = ({getAllQuizzes}) => {
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

  return router;
};
