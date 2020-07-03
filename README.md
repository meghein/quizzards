# Quizzards!
=========
Quizzards is a full stack web application built with Node and Express with a PSQL database.
It allows a user to create personalized quizzes and share both the quiz and results. A user can make a quiz private - only accessible through a link, or elect to make their quiz public to be seen by all. Our Quizzard Lizard magically shows the results of each quiz and provides a scoreboard for the top 10 users if you'd like to compete with friends.  

## Final Product
!["Initial Login Page"](https://github.com/meghein/bmg-quiz-party/blob/master/public/images/loginRegisterView.png)
!["User Home Page"](https://github.com/meghein/bmg-quiz-party/blob/master/public/images/homePageView.png)
!["Create a Quiz"](https://github.com/meghein/bmg-quiz-party/blob/master/public/images/createQuiz.png)
!["Take a Quiz"](https://github.com/meghein/bmg-quiz-party/blob/master/public/images/quiz.png)
!["Quiz Results"](https://github.com/meghein/bmg-quiz-party/blob/master/public/images/results.png)
!["Users Scoreboard"](https://github.com/meghein/bmg-quiz-party/blob/master/public/images/scoreboard.png)

## Getting Started

1. Install dependencies: `npm i`
2. Fix to binaries for sass: `npm rebuild node-sass`
3. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
4. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
5. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser 1.x
- chalk 2.x
- cookie-sessions 1.x
- dotenv 2.x
- ejs 2.x
- express 4.x
- morgan 1.x
- node-sass-middleware 0.x
- pg-native 3.x
