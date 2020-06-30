// const escape = require('./escape.js')

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/users"
//   }).done((users) => {
//     console.log(users);
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });


// MAIN QUIZ CONTAINER FUNCTIONALITY TO LOAD QUIZ CARDS //

const createQuizElement = function(quiz) {
  console.log(quiz);
  const $quizElement = `
    <article id="quiz">
      <a class="text-reset" href="/quizzes/${quiz.id}">
        <header>
          <h4>${quiz.name}</h4>
        </header>
      </a>
      <a class="text-reset" href="/quizzes/results/${quiz.id}">
        <footer>
          <h6>Results</h6>
        </footer>
      </a>
    </article>
    `;
  return $quizElement;
};

const renderQuizzes = function(quizzes) {
  // console.log(quizzes)
  const quizArr = [];
  for (let title in quizzes) {
    const quizObj = quizzes[title];
    for (let quiz of quizObj) {
      console.log(quiz);
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
    console.log(response);
    renderQuizzes(response);
  });
};

$(document).ready(() => {
  console.log('ready');
  loadQuizzes();



  // SPECIFIC QUIZ RENDER //
  $("#fade").modal({
    fadeDuration: 1000,
    fadeDelay: 1.75 // Will fade in 750ms after the overlay finishes.
  });


  /////////////////////////////////

  // let error = false;
  // $('#new_quiz_form').submit(function(evt) {
  //   evt.preventDefault();
  //   $(".isa_error").css("display", "none");

  //   $.ajax({
  //     url: '/tweets',
  //     method: 'POST',
  //     data: $(this).serialize(),
  //   })
  // })
  /////////////////////////////////////
});

