Option 2: Quiz App
An app that lets you create quizzes and share them between friends. The creator of the quiz can view and share all the results at the end of the quiz.

Requirements:
users can create quizzes
users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
users can share a link to a single quiz
users can see a list of public quizzes
users can see a list of public quizzes on the home page
users can attempt a quiz
  users can see the results of their recent attempt
users can share a link to the result of their attempt

# USER STORIES
- As a user... ROLE
- I want to... GOAL
- Because... BENEFIT

# Users can create quizzes
As a user, I want to create my own quiz because I have unique interests an humour.

# Users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
As a user, I want the option of making my quiz private or sharing it to the homepage or with a URL

# User should be able to create private or public quizzes
As a user, I want to make my own quizzes because I enjoy making my own creative content.

# Users can share a link to a single quiz
As a user, I want to share a link to a quiz because my quizzes are so good, they need to be recognized. 

# Users can see a list of public quizzes
As a user, I want to see a list of public quizzes because I need something to occupy my time in this pandemic. Also I want to see how clearly superior my own quizzes are.

# Users can see a list of public quizzes on the home page
As a user, I want to see the public quizzes on the home page, because I want the home page to show me what this website is about.

# Users can share a link to the result of their attempt
As a user, I want to share the results of my quiz because I need to flex on others with my brain power

# Users can attempt a quiz
As a user, I want to attempt quizzes, because I want to get 100% and dominate the leaderboard.


////////////////////////

# FEATURES
- Single Page App
- Simple user authentication w/o passwords
- 
:: MVP: Minimum Viable Product ::
- Core features: 
  - user login/registration => scroll-down form
  - build quizzes (listed/unlisted) => scroll-down form
  - share quizzes (url) => link copy
  - take quizzes => integrated in index
  - HOMEPAGE/index of public quizzes = basic body of index
  - scoreboard/results => scroll-down page
  - share link to the results of user quiz-attempt => link copy

  /users/quizzes/:id/results/:user

# WIREFRAMES
- Sketch a wireframe with a prototyping tool like Figma
- A sketch of what the app will work like with box layout

# DATA
- Define what data you need -  for quiz: users, quizzes: questions, choices, responses
- Build an ERD (with draw.io) - look at entity relationships, PKs (id), FKs (user_id), table names plural

# ROUTES
- follow REST:
  HTTP method | URL pattern   | Use
  GET         | /quizzes      | show all quizzes
  GET         | /quizzes/new  | show create new quiz form  --- GRAHAM
  POST        | /quizzes      | create new quiz ---- GRAHAM
  GET         | /quizzes/:id  | show a quiz
  DELETE      | /quizzes/:id  | delete a quiz

  GET         | /login        | retrieves the login form
  POST        | /login        | sends user credentials to db
  
  POST        | /quizzes/:id/results  | saves results of active users' attempt of a quiz, on quiz submit
  GET         | /quizzes/:id/results  | show results of all users' attempt of a specific quiz
  GET         | /users/:id/results    | show results of single user's total different quiz attempts

# STACK CHOICE
- Bootstrap, sass, jquery, express, node, postgresql

# SINGLE PAGE VS MULTI-PAGE APP
- SPA: HTML generated dynamically by JS on the client, AJX requests, no page reload
- MPA: EJS, sends response as full HTML, page reload

# DIVIDING TASKS
- Vertical: break into features, priortize features, each dev build a feature full stack
- Horizontal: break in tech domains, dev responsible for an entire domain, domains could be ui, api (routes), db

# COMMUNICATION - TEAMWORK
- be willing to let some things go
- give feedback kindly
- do what you say you'll do
- Trello: project management tool
- Slack: communication

# PROJECT WORKFLOW
- NEVER CODE ON MASTER
- Database setup:
  psql -U vagrant -d template1
  CREATE ROLE labber WITH LOGIN password 'labber';
  CREATE DATABASE midterm OWNER labber;
- Git Repo setup:
  fork and clone template
  change env. file: change database name to what you call yours, leave labber user
  npm install
  npm rebuild node sass
  npm run db:reset - might have to do a few times during project to reset db
  npm run local (for nodemon - runs on port 8080)
- PUBLIC FOLDER - static assets
- ROUTES - user (/api/users) and widget (/widgets/routes) routes
- Buld a dbHelpers.js file to store functions for db access
- To test POST requests.. could use Insomnia, Postman or curl

# GIT BRANCH
- git checkout -b feature/setup - or whatever you want to call the branch
- when ready to merge to master: 
  git checkout master
  git pull
  git merge feature/setup



