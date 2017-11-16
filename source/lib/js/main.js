$(document).ready(function() {
  var chuckNorris = $('#chuck-norris-joke');

  $('.tweets').twitter({
    count : 1
  });

  if (chuckNorris.length > 0) {
    tellTheJoke(chuckNorris);
  }

  showImage();
});

function showImage() {
  $('img').each(function(i) {
    var img = new Image();
    var _this = $(this);
    var imgURL = _this.attr('data-src');

    img.onload = function() {
      _this.attr('src', imgURL).parent().addClass('active');
    }

    img.src = imgURL;
  });
}

function tellTheJoke(j) {
  $.getJSON('https://api.icndb.com/jokes/random', function (data) {
    j.html(data.value.joke);
  });
}
