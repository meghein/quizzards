// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function() {
  console.log("READY")

  // $.ajax({
  //   url: '/quizzes',
  //   method: 'POST',
  //   data: $(this).serialize(),
  // })
  //   .then(function() {
  //     // $('#tweet-text').val('');
  //     // $('#char-counter').text(140);
  //     // $.fn.loadTweets();
  //   });

  let shown = false;
  $("#create_new_quiz").on('click', function() {
    if (!shown) {
      console.log("WHEE")
      // $("#nav-new-tweet").html("<strong>Hide</strong> tweet composer");
      // $("#new_quiz_container").slideDown();
      // $("#new_quiz_container").css("display", "block");
      // $("#tweet-text").focus();
      shown = true;
    } else {
      console.log("GOODBYE")
      // $("#nav-new-tweet").html("<strong>Write</strong> a new tweet");
      // $("#new_quiz_container").slideUp();
      // ("#new_quiz_container").css("display", "none");
      shown = false;
    }
  });
})

  // $.ajax({
  //   method: "GET",
  //   url: "/quizzes/new"
  // }).then(())


  // $.fn.loadNewQuizForm = function() {
  //   $.ajax('/quizzes/new', { method: 'GET' })
  //     .then(function(data) {
  //       // $('#tweets-container').empty();
  //       console.log(data)
  //       $('#new_quiz_container').
  //     });

    // })
    //  POST REQUEST STRUCTURE
    // // $.ajax({
    //   url: '/tweets',
    //   method: 'POST',
    //   data: $(this).serialize(),
    // })
    //   .then(function() {
    //     $('#tweet-text').val('');
    //     $('#char-counter').text(140);
    //     $.fn.loadTweets();
    //   });


// That’s where our jQuery should go for the newQuiz slider for example.