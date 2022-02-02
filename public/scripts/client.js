/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = tweetData => {
  const tweetHTML = `<article class="tweet">
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
  return tweetHTML;
};

const $tweet = createTweetElement(tweetData);


console.log($tweet);

$(document).ready(() => {
  console.log('document ready')
  $('#tweets-container').append($tweet);
});

