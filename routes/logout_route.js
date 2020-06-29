const express = require('express');
const router = express.Router();

module.exports = () => {

  router.post("/", (req, res) => {
    req.session["user"] = null;
    res.redirect("/");
  });

  return router;
};
