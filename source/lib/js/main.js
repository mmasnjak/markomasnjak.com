$(document).ready(function() {
  $('.tweets').twitter({
    count : 1
  });
  
  start();
});

function start() {
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