'use strict'
//var movie = require("./lib/records.js");
const express = require("express");
const app = express();
var Record = require("./models/Record"); //database model

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
//app.use('/api', require('cors')());

var handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res,next){
  Record.find({}, function (err, items) {
  res.render('home.html', {items: items});
  });
});

// send static file as response
app.get('/about', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/public/about.html');
 res.render('about.html');
});

app.get('/detail', function(req,res,next){
  Record.findOne({name:req.query.name}, function (err, items) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: items});
  });
});

//send POST
app.post('/detail', function(req,res, next){
  Record.findOne({name:req.body.name}, function (err, items) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: items});
  });
});

app.get('/delete', function(req,res){
  Record.remove({ title:req.query.name}, function (err, result){
    if (err) return next(err);
    let deleted = result.result.n !==0;
    Record.count((err, total) => {
      res.type('text/html');
      res.render('delete', {name: req.query.name, deleted: result.result.n !==0, total: total});
    });
  });
});

// api's
app.get('/api/record/:name', (req, res) => {
  let name = req.params.name;
  console.log(name);
  Record.findOne({name: name}, (err, result) => {
      if (err || !result) return (err);
      res.json( result );    
  });
});

app.get('/api/records', (req,res ) => {
  Record.find((err,results) => {
      if (err || !results) return (err);
      res.json(results);
  });
});

app.get('/api/delete/:name', (req,res) => {
  Record.remove({"title":req.params.title }, (err, result) => {
      if (err) return (err);
      // return # of items deleted
      res.json({"deleted": result.result.n});
  });
});

app.get('/api/add/:name/:year/:label', (req,res) => {
  // find & update existing item, or add new 
  let name = req.params.name;
  Record.update({ name: name}, {name:name, year: req.params.year, label: req.params.label }, {upsert: true }, (err, result) => {
      if (err) return(err);
      // nModified = 0 for new item, = 1+ for updated item 
      res.json({updated: result.nModified});
  });
});

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started'); 
});