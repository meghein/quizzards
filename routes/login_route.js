const express = require('express');
const router = express.Router();

module.exports = ({addUser}
) => {
  router.get('/', (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    const {name, email, password} = req.body;
    addUser(name, email, password);

    console.log(req.body);

    // req.session["user_id"] = user.id;

    res.redirect("/");
  });

  return router;
};
