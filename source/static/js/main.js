$.jribbble.setToken('5eda91fcb18044ffd52459355dd1ba936701f193e6aeff1f9af256fefcc0faa1');

$.jribbble.users('m_masnjak').shots({'per_page' : 4}).then(function(shots) {
      var html = [];

      shots.forEach(function(shot) {
        // See the Dribbble docs for all available shot properties.
        html.push('<article class="dribbble-shot">');
        html.push('<a href="' + shot.html_url + '"><img src="' + shot.images.hidpi + '"></a>');
        html.push('<h2>' + shot.title + '</h2>');
        html.push(shot.description);
        html.push('<div class="meta">Views: ' + shot.views_count + ' Buckets: ' + shot.buckets_count + ' Likes: ' + shot.likes_count + '</div>');
        html.push('</article>');
      });

      $('#dribbble-data').html(html.join(''));
    });

twitterFetcher.fetch({
  'id'              : '259728338522873856',
  'domId'           : 'tweets',
  'showUser'        : false,
  'maxTweets'       : 3,
  'enableLinks'     : true,
  'showPermalinks'  : false
});
//= require_tree .
