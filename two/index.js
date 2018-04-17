"use strict";

var http = require("http"), fs = require('fs'), qs = require("querystring"), records = require("./lib/records");


http.createServer(function(req,res){
  console.log("url = " + req.url);
  
  var url = req.url.split("?");
  var params = qs.parse(url[1]);
  console.log(params);
  console.log(typeof params);
  let found = records.get(params.name);
  var path = url[0].toLowerCase();
  switch(path) {
    case '/': 
      fs.readFile(__dirname + '/home.html', function(err, data){
            if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - internal error');
            } else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
            }
          });
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About');
      break;
    case '/search':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Record Results: ' + params.name + "\n" + JSON.stringify(found));
      break;
    case '/add':
      records.add(params);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Record Added' + '\n' + 'Title: ' + params.name + '\n' + 'Year: ' + params.year + '\n' + 'Label: ' + params.label);
      break;
    case '/delete':
      var deleted = records.delete(params.name);
      res.end('Record Deleted' + '\n' + 'Title: ' + params.name + '\n' + 'Total Records Remaining:' +  deleted.Total);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      break;
    case '/all':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(records.allRecords()));
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);