(function ($) {
  $.fn.twitter = function(options) {
    var settings = $.extend({
      user  : 'm_masnjak',
      count : 20,
      url   : 'http://markomasnjak.com/twitter-feed',
      itemWidth: 320,
    }, options);

    function relativeTime(d) {
      var rightNow = new Date();
  		var then = new Date(d);
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

    function link(tweet) {
      return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
        var http = m2.match(/w/) ? 'http://' : '';
        return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
      });
    }

    function mention(tweet) {
      return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
      });
    }

    function list(tweet) {
      return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
      });
    }

    function hash(tweet) {
      return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
        return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
      });
    }

    function cleanTweet(t) {
      return hash(mention(list(link(t))));
    }

    return this.each(function() {
      var _this = $(this);
      var collection;

      $.ajax({
        url: settings.url,
        type: 'GET',
        dataType: 'json',
        data: {
          'count' : settings.count
        },
        success: function(data, textStatus, xhr) {
          var html = '<blockquote class="tweet" cite="TWEET_URL">' +
            'TWEET_TEXT' +
            '<footer class="tweet-timestamp">AGO PLACE <a href="https://twitter.com/" target="_blank">Follow Me on Twitter</a></footer>' +
          '</blockquote>';
          
          _this.removeClass('loading').empty();

          for(var i = 0; i < data.length; i++) {
            _this.append(
              html.replace('TWEET_TEXT', cleanTweet(data[i].text))
                  .replace(/USER/g, data[i].user.screen_name)
                  .replace('AGO', relativeTime(data[i].created_at))
                  .replace(/ID/g, data[i].id_str)
                  .replace('TWEET_URL', 'https://twitter.com/' + settings.user + '/status/' + data[i].id_str)
                  .replace('PLACE', (data[i].place ? 'from ' + data[i].place.full_name : ''))
                  .replace('TWEET_IMG', (data[i].entities.media && data[i].entities.media.length ? '<div class="tweet-media"><img src="' + data[i].entities.media[0].media_url + '"/></div>': ''))
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
