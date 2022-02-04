/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  loadTweets();
  $('#new-tweet-form').on('submit', onSubmit);
  $('#tweet-composer').on('click', showTweetComposer);
  $('#error-container').hide();
  $('#new-tweet').hide();
});

const escape = str => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = (tweets) => {
  const tweetContainer = $('#tweets-container');
  if (!Array.isArray(tweets)) {
    tweetContainer.prepend(createTweetElement(tweets));
  } else {
    for (const tweet of tweets) {
      tweetContainer.prepend(createTweetElement(tweet));
    }
  }
};

const onSubmit = function(event) {
  event.preventDefault();
  if ($('#tweet-text').val().length > 140) {
    $('#error-container').children().html(`You can't tweet more than 140 characters!`);
    $('#error-container').slideDown("slow");
    return false;
  } else if ($('#tweet-text').val() === null || $('#tweet-text').val() === "") {
    $('#error-container').children().html(`Your tweet can't be empty!`);
    $('#error-container').slideDown("slow");
    return false;
  } else {
    const data = $(this).serialize();
    $.post('/tweets/', data)
      .then(() => {
        loadTweets(true);
        $('#tweet-text').val('');
        $('#error-container').slideUp();
      });
  }
};

const showTweetComposer = () => {
  $('#new-tweet').slideDown("slow");
  $('#tweet-text').focus();
};

const loadTweets = refresh => {
  $.getJSON('/tweets/')
    .then(function(data) {
      if (refresh) {
        renderTweets(data[data.length - 1]);
      } else {
        renderTweets(data);
      }
    });
};

const createTweetElement = tweetData => {
  const $tweet = `<article class="tweet">
  <header>
    <div class="tweet-header">
      <div class="full-name-tweeter">
        <img src="${tweetData.user.avatars}" alt="">
        <p>${tweetData.user.name}</p>
      </div>
    </div>
    <p>${tweetData.user.handle}</p>
  </header>
  <div class="tweet-content">
    <p>${escape(tweetData.content.text)}</p>
  </div>
  <footer>
    <div class="tweet-footer">
      <div class="date">
        <p>${timeago.format(tweetData.created_at)}</p>
      </div>
      <div class="tweet-actions">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </footer>
</article>`;
  return $tweet;
};

