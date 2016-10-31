$(document).ready(function(){

  $('#twitter-feed').twitter({
    count : 12
  });

  $('#instagram-feed').instagram({
    count : 12
  });

  $('#dribbble-feed').dribbble({
    count : 12
  });

  $(window).scroll(function(){
    var navigation = $('.main-navigation');
    var anchorPosition = $('.photo-header').height();
    var scrollTotal = $(document).scrollTop();

    navigation.toggleClass('show', (scrollTotal > anchorPosition));
  });

});
