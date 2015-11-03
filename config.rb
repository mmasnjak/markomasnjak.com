# Change Compass configuration
compass_config do |config|
  config.output_style = :compact
end

# Page options, layouts, aliases and proxies
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Helpers
set :css_dir, 'static/css'
set :js_dir, 'static/js'
set :images_dir, 'static/images'

# Development-specific configuration
configure :development do

  # Reload browser automatically when files change
  activate :livereload
end

# Build-specific configuration
configure :build do

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify html
  activate :minify_html

  # Enable cache buster
  activate :asset_hash
end
