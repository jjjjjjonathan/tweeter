$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const count = (140 - $(this).val().length);
    const counter = $(this).siblings().find("output");
    counter.text(count.toString(10));
    if (count < 0) {
      counter.addClass('over-character-limit');
    } else {
      counter.removeClass('over-character-limit');
    }
  });
});
