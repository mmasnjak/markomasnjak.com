page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

config[:js_dir] = 'lib/js'
config[:css_dir] = 'lib/css'

password = ENV["PASSWORD"]

# General
activate :directory_indexes

# Development-specific
configure :development do
  activate :livereload
end

# Build-specific
configure :build do
  activate :minify_css
  activate :inline
  activate :minify_javascript
  activate :minify_html
  activate :imageoptim
  activate :asset_hash, :ignore => [/^linked-images/]

  set :url_root, 'http://markomasnjak.com'
  activate :search_engine_sitemap
end

# Deploy
activate :deploy do |deploy|
  deploy.build_before    = true
  deploy.deploy_method   = :ftp
  deploy.host            = 'markomasnjak.com'
  deploy.path            = '/markomasnjak.com'
  deploy.user            = 'marmas64'
  deploy.password        = password
end
