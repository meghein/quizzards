// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });


// MAIN QUIZ CONTAINER FUNCTIONALITY TO LOAD QUIZ CARDS //

const createQuizElement = function(quiz) {
  console.log(quiz)
  const $quizElement = `
    <article id="quiz">
      <header>
        <h4>${quiz.name}</h4>
      </header>

      <footer>
        <h6>Results</h6>
      </footer>
    </article>
  `;
  // const $quizElement = `<h1>HELO</h1>`
  return $quizElement;
};

const renderQuizzes = function(quizzes) {
  // console.log(quizzes)
  const quizArr = [];
  for (let title in quizzes) {
    const quizObj = quizzes[title];
    for (let quiz of quizObj) {
      console.log(quiz)
      quizArr.push(createQuizElement(quiz));
    }
  }
  $('#quizzes-container').append(quizArr);
};

const loadQuizzes = function() {
  $.ajax({
    url: '/quizzes/json',
    method: 'GET',
    dataType: 'JSON'
  }).then(function(response) {
    console.log(response)
    renderQuizzes(response);
  });
};

$(document).ready(() => {
  console.log('ready')
  loadQuizzes();
});




