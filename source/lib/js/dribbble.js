(function ($) {
  $.fn.dribbble = function(options) {
    var settings = $.extend({
      user           : null,
      count          : 20,
      showLowProfile : false,
      url            : 'http://markomasnjak.com/feeds/dribbble/'
    }, options);

    return this.each(function() {
      var _this = $(this);

      var html = '<div class="feed-item feed-item--half">' +
        '<a class="shot" href="SHOT_URL" target="_blank">' +
          '<img src="SHOT_IMG" title="SHOT_TITLE" />' +
        '</a>' +
      '</div>';

      $.ajax({
        url: settings.url,
        type: 'GET',
        dataType: 'json',
        data: {
          'user' : settings.user,
          'count' : settings.count
        },
        success: function(data, textStatus, xhr) {
          _this.empty();

          for(var i = 0; i < data.length; i++) {
            if(data[i].low_profile === settings.showLowProfile) {
              _this.append(
                html.replace('SHOT_IMG', data[i].images.hidpi)
                    .replace('SHOT_URL', data[i].html_url)
                    .replace(/SHOT_TITLE/g, data[i].title)
              );
            }
          }
        },
        error: function(e) {
          _this.empty().append(
            '<div class="feed-item">' +
              '<div class="feed-item__error">' +
                '<div class="feed-item__icon">' +
                  '<img src="/lib/images/dribbble.png" width="44" height="44"/>' +
                '</div>' +
                '<div class="feed-item__message">' +
                  'Sorry, there was an error. Please try again later.' +
                '</div>' +
                '<div class="feed-item__cite">' +
                  '<a href="https://dribbble.com/' + settings.user + '" target="_blank">See My Work on Dribbble</a>' +
                '</div>' +
              '</div>' +
            '</div>'
          );
        }
      });
    });
  };
}(jQuery));
