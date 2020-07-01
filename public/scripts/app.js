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
  let $quizElement = ``;
  if (quiz.is_public === true) {
    $quizElement = `
    <article class="quiz">
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
  } else {
    $quizElement = `
    <article class="quiz" id="quiz-unlisted">
      <a class="text-reset" href="/quizzes/${quiz.id}">
        <header>
          <h4>${quiz.name}</h4>
        </header>
      </a>
      <a class="text-reset" href="/quizzes/results/${quiz.id}">
        <footer>
          <h6>Results</h6>
          <h6 class="quiz_small_text">Unlisted Quiz</h6>
        </footer>
      </a>
    </article>
    `;
  }
  return $quizElement;
};

const renderQuizzes = function(quizzes) {
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
    $('#quizzes-container').empty();
    renderQuizzes(response);
  });
};

const loadQuizzesByUser = function() {
  $.ajax({
    url: '/quizzes/users/:id',
    method: 'GET',
    dataType: 'JSON'
  }).then(function(response) {
    console.log(response);
    $('#quizzes-container').empty();
    renderQuizzes(response);
  });
};

const renderResults = function(response) {
  const $resultModal = `
    <div>
    <h1>Results:</h1>
    ${Math.round(response.score * 100)}%
    You got ${response.correct} out of ${response.answers.length} right!
    <a>Click here for a link to share your results</a>
    </div>

    `;
  return $resultModal;
};



const copyUrlToClipboard = function() {
  var copyText = document.getElementById("hidden-url");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
/////////////////////////////////////////////
const copyRESULTSUrlToClipboard = function() {
  var copyText = document.getElementById("#####THE-INPUT-ELEMENT-ID-YOU-WANT#######");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
////////////////////////////////////////// Reference quiz-id.ejs lines 33-38 to see how it works with the input field

$(document).ready(() => {
  console.log('ready TEST');
  loadQuizzes();

  // SPECIFIC QUIZ RENDER //

  $("#copy-url-button").on('click', function() {
    copyUrlToClipboard();
    $("#url-container").fadeOut(500)
    $("#url-container").fadeIn(1000)
  });

  ////////////////////////////////////////////////
  $("#####THE-INPUT-ELEMENT-ID-YOU-WANT#######").on('click', function() {
    copyRESULTSUrlToClipboard();
    $("#url-container").fadeOut(500)
    $("#url-container").fadeIn(1000)
  });
  //////////////////////////////////////////////////




  $("#get_all_quizzes").on('click', function() {
    $("#get_my_quizzes").css("display", "initial");
    $("#get_all_quizzes").css("display", "none");
    loadQuizzes();
  });

  $("#get_my_quizzes").on('click', function() {
    $("#get_my_quizzes").css("display", "none");
    $("#get_all_quizzes").css("display", "initial");
    loadQuizzesByUser();
  });

  $("#quiz-form").on("submit", event => {
    const obj = {};
    const answers = $("input:checked")
    answers.each((_id, input) => {
      obj[input.name] = input.id;
    })
    event.preventDefault();
    $.ajax({
      url: event.target.action,
      method: 'POST',
      data: obj
    }).then(function(response) {
      $('#results-container').append(renderResults(response));
    });
  });
});


