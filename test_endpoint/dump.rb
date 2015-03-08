#!/usr/bin/env ruby
require 'sinatra'
require 'nokogiri'
require 'json'
require 'uri'

set :bind, '0.0.0.0'
set :port, 8080

get '/' do
  "Hello World!"
end

post '/' do
  request.body.rewind
  data = request.body.read
  p data
  status 200
end
