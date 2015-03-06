var Crawler = require("simplecrawler");

var craas = new Crawler('www.reddit.com');

craas.initialPath = '/';
craas.initialPort = 80;
craas.initialProtocol = 'http';

craas.interval = 500; // default 250 milliseconds
craas.maxConcurrency = 3; // default 5
craas.maxDepth = 2; // default 0
craas.scanSubdomains = false; // default false
craas.downloadUnsupported = false; // default true

craas.on("fetchcomplete",function(queueItem, responseBuffer, response) {
  //console.log("I just received %s (%d bytes)",queueItem.url,responseBuffer.length);
  //console.log("It was a resource of type '%s'", response.headers['content-type']);

  var mime = response.headers['content-type'].split(';')[0];
  //console.log(mime);
  if (mime == 'text/html') {
    console.log(responseBuffer.toString('utf-8'));
  }
});

craas.start();
