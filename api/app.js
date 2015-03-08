var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Set up Lambda
var AWS = require('aws-sdk')
var lambda = new AWS.Lambda()

// Set up routing
app.get('/', function (req, res) {
  res.json({hello: 'world'})
})
app.post('/', function (req, res) {
  res.send(req.body)
})
app.post('/crawl', function (req, res) {
  var params = {
    FunctionName: 'craas',
    InvokeArgs: req.body
  }
  lambda.invokeAsync(params, function(err, data) {
    if (err) {
      console.log(err, err.stack)
    }
    else {
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
