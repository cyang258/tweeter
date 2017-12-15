/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $("#nav-bar button").click(function() {
    $(".container .new-tweet").slideToggle("slow");
    $("textarea").focus();
  });

  function createTweetElement(x) {

    let name = x.user.name;
    let handle = x.user.handle;
    let content = x.content.text;
    let img = x.user.avatars.small;
    let createdDate = moment(x.created_at).fromNow();


    var tweet_test = `
    <section class="tweet">
      <article>
        <header>
          <img src="${img}">
          <p1>${name}</p1>
          <p2>${handle}</p2>
        </header>
        <main>
          <p3>${content}</p3>
        </main>
        <footer>
          <p4>posted at ${createdDate}</p4>
          <i class="fa fa-flag"></i>
          <i class="fa fa-refresh"></i>
          <i class="fa fa-heart"></i>
        </footer>
      </article>
    </section>`;
  $('#tweets-container').prepend(tweet_test);
  }

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET" ,
      datatype: "json",
      success: function (data) {
        for(let i of data) {
          createTweetElement(i);
        }
      }
    })
  }


  loadTweets();

  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    let contentLength = $(this).children("textarea").val().length;
    let overMax = contentLength - 140;
    if(contentLength > 140) {
      return alert("You messages has " + overMax + " more words than max characters limit!")
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function(data) {
          content = data;
          loadTweets();
      }
     })
    }
  });


})