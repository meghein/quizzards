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
        <footer>
          <h4 class="quiz_small_text">Unlisted Quiz</h4>
        </footer>
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

// ADD RESULTS TO ON SUBMIT OF QUIZ FORM //
const renderResults = function(response) {
  const $result = `
    <div id="results">
      <h2><b>${Math.round(response.score * 100)}%</b><br></h2>
      You got ${response.correct} out of ${response.answers.length} right! <br>
    <div id="copy-results" data-quizid="${response.id}">
      <h5>Share your results:</h5>
      <button id="copy-results-button" class="btn btn-outline-primary"><i class="fa fa-link" aria-hidden="true"></i> Copy Link</button>
    </div>
    </div>
    `;
  return $result;
};

/////////////////////////////////////////////////////////////

$(document).ready(() => {
  // initial load of quizzes to index.ejs
  loadQuizzes();

  // loads all quizzes
  $("#get_all_quizzes").on('click', function() {
    $("#get_my_quizzes").css("display", "initial");
    $("#get_all_quizzes").css("display", "none");
    loadQuizzes();
  });

  // loads quizzes attached to logged in user
  $("#get_my_quizzes").on('click', function() {
    $("#get_my_quizzes").css("display", "none");
    $("#get_all_quizzes").css("display", "initial");
    loadQuizzesByUser();
  });

  // copy to clipboard for quiz url
  new ClipboardJS('#copy-url-button', {
    text: function(trigger) {
        return window.location.origin + '/quizzes/' + trigger.dataset.quizid;
    }
  });

  // copy to clipboard animation
  $("#copy-url-button").on('click', function() {
    $("#url-container").fadeOut(500)
    $("#url-container").fadeIn(1000)
  });

  // jquery for appending results to quiz form
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

      // results copy to clipboard functionality
      new ClipboardJS('#copy-results-button', {
        text: function(trigger) {
            const responseId = document.getElementById("copy-results").dataset.quizid;
            return window.location.origin + '/response/' + responseId;
        }
      });
      $("#copy-results-button").on('click', function() {
        $("#copy-results").fadeOut(500)
        $("#copy-results").fadeIn(1000)
      });

    });
  });
});


