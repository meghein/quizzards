const express = require('express');
const router = express.Router();

module.exports = ({addUserResults}
) => {

  router.post("/", (req, res) => {

    console.log(req.body);

    res.redirect("/");
  });

  return router;
};
