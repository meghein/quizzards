// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM widgets`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const widgets = data.rows;
//         res.json({ widgets });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };

const express = require('express');
const router = express.Router();

module.exports = ({ getAllQuizzes, addQuiz, addQuestion, addAnswers }) => {
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

  //////////////////////////

  // router.post("/", (req, res) => {
  //   const { name, email, password } = req.body;
  //   addUser(name, email, password);

  //   console.log(req.body);

  //   // req.session["user_id"] = user.id;

  //   res.redirect("/");
  // });

  /////////////////////////

  router.post("/", (req, res) => {
    const name = req.body.name;
    const creator_id = req.body.creator_id
    console.log("REQ BODY ", req.body)
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
        const is_correct_1 = req.body.is_correct_1 ? true : false;
        const is_correct_2 = req.body.is_correct_2 ? true : false;
        const is_correct_3 = req.body.is_correct_3 ? true : false;
        const is_correct_4 = req.body.is_correct_4 ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4);
      });
      const question_2 = req.body.question_2;
      addQuestion(quiz_id, question_2).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.q2choice_1;
        const choice_2 = req.body.q2choice_2;
        const choice_3 = req.body.q2choice_3;
        const choice_4 = req.body.q2choice_4;
        const is_correct_1 = req.body.q2is_correct_1 ? true : false;
        const is_correct_2 = req.body.q2is_correct_2 ? true : false;
        const is_correct_3 = req.body.q2is_correct_3 ? true : false;
        const is_correct_4 = req.body.q2is_correct_4 ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4)
      });
      const question_3 = req.body.question_3;
      addQuestion(quiz_id, question_3).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.q3choice_1;
        const choice_2 = req.body.q3choice_2;
        const choice_3 = req.body.q3choice_3;
        const choice_4 = req.body.q3choice_4;
        const is_correct_1 = req.body.q3is_correct_1 ? true : false;
        const is_correct_2 = req.body.q3is_correct_2 ? true : false;
        const is_correct_3 = req.body.q3is_correct_3 ? true : false;
        const is_correct_4 = req.body.q3is_correct_4 ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4)
      });
      const question_4 = req.body.question_4;
      addQuestion(quiz_id, question_4).then(question => {
        const question_id = question.id;
        const choice_1 = req.body.q4choice_1;
        const choice_2 = req.body.q4choice_2;
        const choice_3 = req.body.q4choice_3;
        const choice_4 = req.body.q4choice_4;
        const is_correct_1 = req.body.q4is_correct_1 ? true : false;
        const is_correct_2 = req.body.q4is_correct_2 ? true : false;
        const is_correct_3 = req.body.q4is_correct_3 ? true : false;
        const is_correct_4 = req.body.q4is_correct_4 ? true : false;
        addAnswers(question_id, choice_1, is_correct_1, choice_2, is_correct_2, choice_3, is_correct_3, choice_4, is_correct_4).then(answer => {
          // console.log("ANSWER ", answer)
          res.redirect("/")
        });
      });
    });

    ///////////////// ASK A MENTOR - HOW DO I POPULATE THIS QUESTION WITH THE QUIZ_ID of the newly created quiz???

    ///// Do I have to make another query and SELECT that quiz_id based on, say, the quiz name and the last quiz with that name? Then assign what that query returns to a variable, and INSERT it within the addQuestion function? That leaves the potential for some buggy behaviour if two indentically-name quizzes are made at the same time. Is that a big enough issue?

    ///// Or do I have to use JOINS in a way I am not thinking of in my addQuestion function/query?

  });

  return router;
};
