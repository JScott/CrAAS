var express = require('express')
var app = express()
var colors = require('colors')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// Set up Lambda
var AWS = require('aws-sdk')
var lambda = new AWS.Lambda({
  apiVersion: '2014-11-11',
  region: 'eu-west-1'
})

// Set up routing
app.get('/', function (req, res) {
  res.json({api: 'running'})
})
app.post('/crawl', function (req, res) {
  var params = {
    FunctionName: 'CrAAS',
    InvokeArgs: JSON.stringify(req.body)
  }
  console.log("Lambda called".cyan, req.body)
  lambda.invokeAsync(params, function(err, data) {
    if (err) {
      console.log(err, err.stack)
    }
    else {
      console.log("Lambda returned".green, data)
      res.send(data)
    }
  })
})

// Run the server
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Crawling API listening at http://%s:%s', host, port)
})
