var Crawler = require("simplecrawler");
var http = require('http');

function post_string(url, html, callback) {
  // console.log('Posting: '+url);
  var post_data = JSON.stringify({
    url: url,
    html: encodeURI(html)
  });
  var post_options = {
    host: callback.host,
    port: callback.port || 80,
    path: callback.path || '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': post_data.length
    }
  };
  var post_req = http.request(post_options);
  post_req.write(post_data);
  post_req.end();
};

exports.handler = function(event, context) {
  if (!event.crawl.host) {
    post_string(null, 'No crawl host provided, can not continue.', null);
  }
  if (!event.callback.host) {
    post_string(null, 'No callback host provided. Why am I running this for you?', null);
  }
  else {
    var craas = new Crawler(event.crawl.host);
    craas.initialPath = event.crawl.path || '/';
    craas.initialPort = event.crawl.port || 80;
    craas.initialProtocol = 'https';
    craas.interval = 100; // default 250 milliseconds
    craas.maxConcurrency = 3; // default 5
    craas.maxDepth = 1; // default 0
    craas.scanSubdomains = false; // default false
    craas.downloadUnsupported = false; // default true

    craas.on("fetchcomplete",function(queueItem, responseBuffer, response) {
      var mime = response.headers['content-type'].split(';')[0];
      if (mime == 'text/html') {
        post_string(queueItem.url, responseBuffer.toString('utf-8'), event.callback);
      };
    });

    craas.start();
  }
};
