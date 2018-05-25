"use strict";

let record = require("./lib/records.js");

const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine('.html', handlebars({extname: '.html'}));
app.set("view engine", '.html');

//var recordMethods = require("./recordMethods");

// send static file as response
app.get('/', function(req,res){
  res.type('text/html');
  //res.sendFile(__dirname + '/public/home.html');
  res.render('../public/home.html', {records: record.getAll});
 });
 
 // send static file as response
 app.get('/about', function(req,res){
  res.type('text/html');
  res.sendFile(__dirname + '/public/about.html');
  res.render('about.html');
 });
 
 //handle GET
 app.get('/delete', function(req,res){
  var result = record.deleteOne(req.query.title); //delete movie object
  res.render('delete', {title: req.query.title, result: result});
  });
 
 app.get('/detail', function(req,res){
   console.log(req.query); // display parsed querystring object
   var found = record.getOne(req.query.title);
   res.render("details", {title: req.query.title, result: found, records: record.getAll()});
 });
 
 //handle POST
 app.post('/detail', function(req,res){
   console.log(req.body); // display parsed form submission
   var found = record.getOne(req.body.title);
   res.render("details", {title: req.body.title, result: found, records: record.getAll()});
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