$(document).ready(function() {
  const jokeContainer = $('.joke');

  if(jokeContainer.length > 0) {
    $.getJSON('https://api.icndb.com/jokes/random?exclude=[explicit]', function (data) {
      jokeContainer.html(data.value.joke);
    });
  }
});
