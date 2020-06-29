const express = require('express');
const router = express.Router();

module.exports = ({addUserResults}
) => {

  router.post("/", (req, res) => {
    const quizResponse = req.body;
    console.log(quizResponse);

    res.redirect("/");
  });

  return router;
};
