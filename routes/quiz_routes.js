/* eslint-disable camelcase */
// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router = express.Router();

module.exports = ({ getAllQuizzes, getQuizById, addQuiz, addQuestion, addAnswers, getQuizQuestions, getQuestionAnswers }) => {
  router.get("/", (req, res) => {
    getAllQuizzes()
      .then((quizzes) => {
        res.render('quizzes', { templateVars: quizzes });
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
    const templateVars = {
      user: req.session["user"],
      userId: req.session["user_id"] ? req.session["user_id"] : undefined
    };
    getQuizById(req.params.id)
      .then((quiz) => {
        templateVars.quiz = quiz;
        return getQuizQuestions(quiz.id);
      })
      .then((questions) => {
        templateVars.questions = questions;
        return Promise.all(questions.map(question => {
          return getQuestionAnswers(question.id)
            .then((answers) => {
              question.answers = answers;
            });
        }));
      })
      .then(() => {
        res.render('quiz_id', templateVars);
      })
      .catch(err => {
        console.error(err);
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  router.post("/:id/delete", (req, res) => {
    //   const user = users[req.session["user_id"]];
    //   if (user) {
    //     const shortURL = req.params.shortURL;
    //     delete urlDatabase[shortURL];
    //     res.redirect("/urls");
    //   }
    //   res.status(403).send("no can do!");
  });

  router.post("/", (req, res) => {
    if ((!req.body.choice1 && req.body.question_1) || (!req.body.choice2 && req.body.question_2) || (!req.body.choice3 && req.body.question_3) || (!req.body.choice4 && req.body.question_4)) {
      console.log("NOOOOOOOOOOOOOOOOOOOO")
      res.status(400).json({ error: 'Every question must have a correct answer.' });
      return;
    };
    if (!req.body.name || !req.body.question_1) {
      console.log("NOOOOOOOOOOOOOOOOOOOO")
      res.status(400).json({ error: 'Every quiz must have a name and at least one question.' });
      return;
    };
    const name = req.body.name;
    const creator_id = req.session["user_id"]
    console.log("REQ BODY ", req.body);
    let is_public = true;
    if (req.body.is_public) {
      is_public = false;
    }
    addQuiz(creator_id, name, is_public).then(quiz => {
      const quiz_id = quiz.id;
      const question_1 = req.body.question_1;
      addQuestion(quiz_id, question_1).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.choice_1;
        const choice_2 = req.body.choice_2;
        const choice_3 = req.body.choice_3;
        const choice_4 = req.body.choice_4;
        const is_correct_1 = req.body.choice1 === 'is_correct_1' ? true : false;
        const is_correct_2 = req.body.choice1 === 'is_correct_2' ? true : false;
        const is_correct_3 = req.body.choice1 === 'is_correct_3' ? true : false;
        const is_correct_4 = req.body.choice1 === 'is_correct_4' ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4);
      });
      const question_2 = req.body.question_2;
      addQuestion(quiz_id, question_2).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.q2choice_1;
        const choice_2 = req.body.q2choice_2;
        const choice_3 = req.body.q2choice_3;
        const choice_4 = req.body.q2choice_4;
        const is_correct_1 = req.body.choice2 === 'q2is_correct_1' ? true : false;
        const is_correct_2 = req.body.choice2 === 'q2is_correct_2' ? true : false;
        const is_correct_3 = req.body.choice2 === 'q2is_correct_3' ? true : false;
        const is_correct_4 = req.body.choice2 === 'q2is_correct_4' ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4)
      });
      const question_3 = req.body.question_3;
      addQuestion(quiz_id, question_3).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.q3choice_1;
        const choice_2 = req.body.q3choice_2;
        const choice_3 = req.body.q3choice_3;
        const choice_4 = req.body.q3choice_4;
        const is_correct_1 = req.body.choice3 === 'q3is_correct_1' ? true : false;
        const is_correct_2 = req.body.choice3 === 'q3is_correct_2' ? true : false;
        const is_correct_3 = req.body.choice3 === 'q3is_correct_3' ? true : false;
        const is_correct_4 = req.body.choice3 === 'q3is_correct_4' ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4)
      });
      const question_4 = req.body.question_4;
      addQuestion(quiz_id, question_4).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.q4choice_1;
        const choice_2 = req.body.q4choice_2;
        const choice_3 = req.body.q4choice_3;
        const choice_4 = req.body.q4choice_4;
        const is_correct_1 = req.body.choice4 === 'q4is_correct_1' ? true : false;
        const is_correct_2 = req.body.choice4 === 'q4is_correct_2' ? true : false;
        const is_correct_3 = req.body.choice4 === 'q4is_correct_3' ? true : false;
        const is_correct_4 = req.body.choice4 === 'q4is_correct_4' ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4).then(answer => {
          // console.log("ANSWER ", answer)
          res.redirect("/");
        });
      });
    });
  });

  return router;
};
