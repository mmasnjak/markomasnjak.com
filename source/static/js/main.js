var smallBreakPoint = 600;

$(document).ready(function(){

  $.jribbble.setToken('5eda91fcb18044ffd52459355dd1ba936701f193e6aeff1f9af256fefcc0faa1');

  $.jribbble.users('m_masnjak').shots({'per_page' : 8}).then(function(shots) {
    var html = [];

    shots.forEach(function(shot) {
      html.push('<div class="thumbnail-item">');
      html.push('<a href="' + shot.html_url + '" target="_blank">');
      html.push('<img src="' + shot.images.normal + '" style="border-bottom: 1px solid rgba(0,0,0,.12);">');
      html.push('<strong>' + shot.title + '</strong>');
      html.push('<small class="meta-info">' + getTimestamp(shot.created_at) + '</small>');
      html.push('</a></div>');
    });

    $('#dribbble-data').html(html.join(''));
  });

  twitterFetcher.fetch({
    'id'              : '259728338522873856',
    'domId'           : 'tweets',
    'showUser'        : false,
    'maxTweets'       : 4,
    'enableLinks'     : true,
    'showPermalinks'  : false
  });

  $(document).on('click', 'a.logo', function(e) {
    e.preventDefault();
    displayMobileNavigation();
  });

});

//------------------------------------------------------------
//
//------------------------------------------------------------

function getTimestamp(d) {
  return new Date(d).toLocaleDateString();
}

//------------------------------------------------------------
//
//------------------------------------------------------------

function displayMobileNavigation() {

  var _window = $(window);
  var _body = $('body');
  var html = getHtmlContent($('[data-mobile-navigation-show="true"]'));

  if (_window.width() <= smallBreakPoint) {
    _body.addClass('no-scroll');

    $('<nav id="mobile-nav" class="mobile-nav animated zoomIn"><div class="nav-items">' + html + '</div></nav>').appendTo(_body).click(function() {
      var _this = $(this);

      _this.removeClass('zoomIn').addClass('zoomOut');
      _body.addClass('no-scroll');

      _this.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        _this.unbind().remove();
        _body.removeClass('no-scroll');
      });
    });
  }
}

//------------------------------------------------------------
//
//------------------------------------------------------------

function getHtmlContent(element) {
  var html = [];

  element.each(function() {
    html.push(element.html());
  });

  return html.join('');
}