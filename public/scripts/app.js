// const escape = require('./escape.js')

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
    $('#quizzes-container').empty();
    renderQuizzes(response);
  });
};

const renderResults = function(response) {
  const $resultModal = `
    <div id="results">
      ${Math.round(response.score * 100)}%
      You got ${response.correct} out of ${response.answers.length} right!
    <div id="copy-results">
      <h5>Share your results:</h5>
      <input type="text" value="http://localhost:8080/response/${response.id}" id="hidden-results">
      <button id="copy-results-button" class="btn btn-info btn-lg"><i class="fa fa-link" aria-hidden="true"></i> Copy Link</button>
    </div>
    </div>
    `;
  return $resultModal;
};

const copyToClipboard = function(id) {
  const $copyText = document.getElementById(id);
  $copyText.select();
  $copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
};


$(document).ready(() => {
  console.log('ready TEST');
  loadQuizzes();

  $("#copy-url-button").on('click', function() {
    copyToClipboard("hidden-url");
    $("#url-container").fadeOut(500)
    $("#url-container").fadeIn(1000)
  });


  $("#copy-results-button").on('click', function() {
    copyToClipboard("hidden-results");
    $("#copy-results").fadeOut(500)
    $("#copy-results").fadeIn(1000)
  });


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
      // console.log("response:", response)
      $('#results-container').append(renderResults(response));
    });
  });
});


