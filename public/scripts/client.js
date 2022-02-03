/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  loadTweets();
  $('#new-tweet-form').on('submit', onSubmit);
});

const renderTweets = (tweets) => {
  const tweetContainer = $('#tweets-container');
  for (const tweet of tweets) {
    tweetContainer.prepend(createTweetElement(tweet));
  }
};

const onSubmit = function(event) {
  event.preventDefault();
  if ($('#tweet-text').val().length > 140) {
    alert("Too many characters in your tweet.");
    return false;
  } else if ($('#tweet-text').val() === null || $('#tweet-text').val() === "") {
    alert("Your tweet can't be empty!");
    return false;
  } else {
    const data = $(this).serialize();
    $.post('/tweets/', data)
      .then(() => {

      });
  }
};

const loadTweets = () => {
  $.getJSON('/tweets/')
    .then(function(data) {
      renderTweets(data);
    });
};

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1643654725453
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1643741125453
  }
];

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
    <p>${tweetData.content.text}</p>
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

