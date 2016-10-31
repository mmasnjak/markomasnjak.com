(function ($) {
  $.fn.instagram = function(options) {
    var settings = $.extend({
      count: 2,
      itemWidth: 320
    }, options);

    function relativeTime(d) {
      var rightNow = new Date();
  		var then = new Date(0).setUTCSeconds(d);
  		var diff = rightNow - then;

  		var second = 1000,
  		    minute = second * 60,
  		    hour = minute * 60,
  		    day = hour * 24,
  		    week = day * 7;

  		if (isNaN(diff) || diff < 0) {
  			return '';
  		}

  		if (diff < second * 2) {
  			return 'just now';
  		}

  		if (diff < minute) {
  			return Math.floor(diff / second) + ' seconds ago';
  		}

  		if (diff < minute * 2) {
  			return '1 minute ago';
  		}

  		if (diff < hour) {
  			return Math.floor(diff / minute) + ' minutes ago';
  		}

  		if (diff < hour * 2) {
  			return '1 hour ago';
  		}

  		if (diff < day) {
  			return  Math.floor(diff / hour) + ' hours ago';
  		}

  		if (diff > day && diff < day * 2) {
  			return 'yesterday';
  		}

  		if (diff < day * 365) {
  			return Math.floor(diff / day) + ' days ago';
  		}

  		else {
  			return 'over a year ago';
  		}
    }

    return this.each(function() {
      var _this = $(this);
      var collection;

      $.ajax({
        url: 'http://markomasnjak.com/instagram-feed',
        type: 'GET',
        dataType: 'json',
        data: {
          'count' : settings.count
        },
        success: function(data, textStatus, xhr) {
          data = JSON.parse(data).data;

          var html = '<div class="collection-item">' +
            '<a class="instagram-item" href="POST_URL" target="_blank">' +
              'POST_IMG' +
            '</a>' +
          '</div>';

          _this.removeClass('loading').html('<div class="collection-items"></div>');
          collection = _this.find('.collection-items');
          collection.css('width', (settings.itemWidth * settings.count) + 'px');

          for(var i = 0; i < data.length; i++) {
            collection.append(
              html.replace('POST_IMG', (data[i].images ? '<img class="card" src="' + data[i].images.standard_resolution.url + '"/>' : ''))
                  .replace('POST_URL', data[i].link)
                  .replace('POST_TEXT', (data[i].caption ? data[i].caption.text : ''))
                  .replace('AGO', relativeTime(data[i].created_time))
                  .replace('POST_COMMENT_COUNT', data[i].comments.count)
                  .replace('POST_FAVORITE_COUNT', data[i].likes.count)
            );
          }
        },
        error: function(e) {
          _this.empty()
               .removeClass('loading')
               .addClass('error')
               .append('<div class="error-message">Sorry, there was an error. Please <a href=".">refresh</a> this page to try again.</div>');
        }
      });
    });
  };
}(jQuery));
