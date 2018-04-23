"use strict";

// assignment two stuffs
// var http = require("http"), fs = require('fs'), qs = require("querystring"), records = require("./lib/records");



// http.createServer(function(req,res){
//   console.log("url = " + req.url);
  
//   var url = req.url.split("?");
//   var params = qs.parse(url[1]);
//   console.log(params);
//   console.log(typeof params);
//   let found = records.get(params.name);
//   var path = url[0].toLowerCase();
//   switch(path) {
//     case '/': 
//       fs.readFile(__dirname + '/home.html', function(err, data){
//             if (err) {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end('500 - internal error');
//             } else{
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(data);
//             }
//           });
//       break;
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('About');
//       break;
//     case '/search':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Record Results: ' + params.name + "\n" + JSON.stringify(found));
//       break;
//     case '/add':
//       records.add(params);
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Record Added' + '\n' + 'Title: ' + params.name + '\n' + 'Year: ' + params.year + '\n' + 'Label: ' + params.label);
//       break;
//     case '/delete':
//       var deleted = records.delete(params.name);
//       res.end('Record Deleted' + '\n' + 'Title: ' + params.name + '\n' + 'Total Records Remaining:' +  deleted.Total);
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       break;
//     case '/all':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end(JSON.stringify(records.allRecords()));
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('404:Page not found.');
//   }
  
// }).listen(process.env.PORT || 3000);

let record = require("./lib/records.js");

const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine('.html', handlebars({extname: '.html'}));
app.set("view engine", '.html');

//app.get is the method to add routes app.VERB
app.get('/', function(req, res){
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Page');
});

app.get('/delete', function(req, res){
  let deleted = record.delete(req.query.name);
  res.render('delete', {name: req.query.name, result: deleted});
});

app.post('/get', function(req, res){
  var header = "Searching for: " + req.body.name + ' by David Bowie<br>';
  var match = record.get(req.body.name);
  res.render("details", {name: req.body.name, result: match});
});

//404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});


app.listen(app.get('port'), function(){
  console.log('Express has started on http://localhost: ' +
    app.get('port') + ';press Ctrl-C to terminate.');
});