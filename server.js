// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
const dbHelpers = require('./helpers/dbHelpers')(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const quizRoutes = require("./routes/quiz_routes");
const loginRoute = require("./routes/login_route");
const quizIdRoute = require("./routes/quiz_id_routes");
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(dbHelpers));
// app.use("/api/widgets", widgetsRoutes(dbHelpers));
<<<<<<< HEAD
// app.use("/api/quizzes", quizRoutes(dbHelpers));
=======
app.use("/quizzes", quizRoutes(dbHelpers));
>>>>>>> 2c2cc744b4e3483fd0c8df7a10c78a4b8faf64c1
app.use("/login", loginRoute(dbHelpers));
app.use("/quizzes", quizRoutes(dbHelpers));
app.use("/:id", quizIdRoute(dbHelpers));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
