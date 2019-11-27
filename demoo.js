
/* eslint-disable semi */
var http = require('http');
var fs = require('fs');
var url = require('url');
const PORT = process.env.PORT || 5000;

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = '.' + q.pathname;

  /* handles 404 error when accessing root (localhost:8080/) 
  and reroute to index.html */
  if (filename === './') {
    filename = './index.html'
  } else {
    /* in case when not accessing root,
     don't add another .html to the string */
    filename = filename + '.html';
  }
  console.log(filename);

  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 not found');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);

    return res.end();
  })
}).listen(8080);

console.log('Server listening on port 8080...');
