var Crawler = require("simplecrawler");
var http = require('http');

var craas = new Crawler('www.ruby-lang.org');
//var craas = new Crawler('www.google.com');
craas.initialPath = '/en';
//craas.initialPath = '/';
craas.initialPort = 80;
craas.initialProtocol = 'https';
craas.interval = 500; // default 250 milliseconds
craas.maxConcurrency = 3; // default 5
craas.maxDepth = 1; // default 0
craas.scanSubdomains = false; // default false
craas.downloadUnsupported = false; // default true

craas.on("fetchcomplete",function(queueItem, responseBuffer, response) {
  //console.log("I just received %s (%d bytes)",queueItem.url,responseBuffer.length);
  //console.log("It was a resource of type '%s'", response.headers['content-type']);

  var mime = response.headers['content-type'].split(';')[0];
  if (mime == 'text/html') {
    var html = JSON.stringify({
      url: queueItem.url,
      html: encodeURI(responseBuffer.toString('utf-8'))
    });
    console.log('HTML found.');
    post_with(html);
  };
});

function post_with(post_data) {
  console.log('Sending HTML...');
  var post_options = {
    host: 'localhost',
    port: '80',
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
};

craas.start();
