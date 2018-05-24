"use strict";

let record = require("./lib/records.js");

const express = require('express');

const app = express();

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
  var header = "Searching for: " + req.body.name + ' by Dave Matthews Band<br>';
  var match = record.get(req.body.name);
  res.render("details", {name: req.body.name, result: match});
});

app.post('/add', function(req, res){
  let completeRecord = {name : req.body.name, year : req.body.year, label : req.body.label};
  let added = record.add(completeRecord);
  res.render('add',{name: req.body.name, result: added});
});
app.get('/', (req, res, next) => {
  record.find({}, function (err, items) {
    if (err) return next(err);
    console.log(items.length);
    res.render('home', {records: items });
//404 page
app.use(function(req, res){
  res.status(404);
  res.render('404');
});


app.listen(app.get('port'), function(){
  console.log('Express has started on http://localhost: ' +
    app.get('port') + ';press Ctrl-C to terminate.');
});