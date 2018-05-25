'use strict'
//var movie = require("./lib/movies.js");
const express = require("express");
const app = express();
var Movie = require("./models/Record.js"); //database model

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use('/api', require('cors')());
app.use(require("body-parser").json());  

var handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res,next){
 Record.find({}, function (err, items) {
  console.log(items)
  if (err) return next(err);
        res.render('home', {items: JSON.stringify(items)});    
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

//handle POST
app.post('/detail', function(req,res, next){
  Record.findOne({name:req.body.name}, function (err, items) {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: items});
  });
});

app.get('/delete', function(req,res){
  Record.remove({ name:req.query.name}, function (err, result){
    if (err) return next(err);
    let deleted = result.result.n !==0;
    Record.count((err, total) => {
      res.type('text/html');
      res.render('delete', {name: req.query.name, deleted: result.result.n !==0, total: total});
    });
  });
});

//API routes
app.get('/api/v1/record', (req,res, next) => {
 Record.find((err,results) => {
     if (err || !results)
     return next(err);
     res.json(results);
 });
});

app.get('/api/v1/record/:name', (req,res,next)=> {
 let title = req.params.title;
 Record.findOne({name: name}, (err, result) => {
     if (err || !result) 
     return next(err);
     res.json(result);
 });
});

app.get('/api/v1/delete/:name', (req, res, next) => {
    Movie.remove({"name":req.params.name}, (err, result) => {
        if (err)
        return next(err);
        res.json({"deleted": result.result.n}); //n=1 for deleted item, 0 for not deleted
    });
});

app.get('/api/v1/add/:name/:year/:label', (req,res,next) => {
    // find & update existing item, or add new
    let title = req.params.title;
    Record.update({ name:name}, {name:name, year:req.params.year, label:req.params.label}, {upsert:true}, (err, result) =>{
        if (err)
        return next(err);
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