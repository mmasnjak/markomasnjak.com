$(document).ready(function() {
  var chuckNorris = $('#chuck-norris-joke');

  $('.tweets').twitter({
    user : 'm_masnjak',
    count : 1
  });

  $('.shots').dribbble({
    user : 'm_masnjak',
    count : 6
  });

  if (chuckNorris.length > 0) {
    tellTheJoke(chuckNorris);
  }
});

function tellTheJoke(j) {
  $.getJSON('https://api.icndb.com/jokes/random', function (data) {
    j.html(data.value.joke);
  });
}
