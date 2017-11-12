$(document).ready(function() {
  var chuckNorris = $('#chuck-norris-joke');

  $('.tweets').twitter({
    count : 1
  });

  if (chuckNorris.length > 0) {
    tellTheJoke(chuckNorris);
  }

  showImageGallery();

  $(window).scroll(function(e) {
    toggleClassOnScroll({
      item: $('.main-navigation'),
      threshold: 48
    });
  });
});

function toggleClassOnScroll(options) {
  var settings = $.extend({
    class: 'scrolled',
    threshold: 0
  }, options);

  if($(window).scrollTop() > settings.threshold) {
    settings.item.addClass(settings.class);
  } else {
    settings.item.removeClass(settings.class);
  }
}

function showImageGallery() {
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
