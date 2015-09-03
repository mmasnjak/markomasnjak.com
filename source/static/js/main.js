$.jribbble.setToken('5eda91fcb18044ffd52459355dd1ba936701f193e6aeff1f9af256fefcc0faa1');
$.jribbble.shots('teams').then(function(shots) {
      var html = [];

      shots.forEach(function(shot) {
        // See the Dribbble docs for all available shot properties.
        html.push('<div class="grid-content">');
        html.push('<a href="' + shot.html_url + '">');
        html.push('<img src="' + shot.images.normal + '">');
        html.push('</a></div>');
      });

      $('#dribbble-data').html(html.join(''));
    });
//= require_tree .
