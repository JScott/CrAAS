#!/usr/bin/env ruby
require 'sinatra'
require 'nokogiri'
require 'json'
require 'uri'

set :bind, '0.0.0.0'
set :port, 80

get '/' do
  "Hello World!"
end

def validate(html)
  html = Nokogiri::XML html
  puts html.errors
end

post '/' do
  request.body.rewind
  data = request.body.read
  data = JSON.parse data
  data['html'] = URI.decode data['html']
  validate data['html']
  status 200
end
