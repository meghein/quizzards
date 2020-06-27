const express = require('express');
const router = express.Router();

module.exports = ({
  addUser
}) => {
  router.get('/', (req, res) => {



  });




  router.post("/", (req, res) => {
    //create a new user

    //extract info from request
    const {
      name,
      email,
      password
    } = req.body;

    console.log(name, email, password);

    //save the user in the db
    addUser(name, email, password)
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  });

  return router;
};
