const express = require('express');
const router = express.Router();

module.exports = () => {
  //logs user out and clears the cookie session
  router.post("/", (req, res) => {
    req.session["user"] = null;
    res.redirect("/");
  });

  return router;
};
