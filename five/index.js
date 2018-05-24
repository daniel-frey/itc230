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

//app.get is the method to add routes app.VERB
app.get('/', (req, res, next) => {
  record.find({}, function (err, items) {
    if (err) return next(err);
    console.log(items.length);
    res.render('home', {records: items }); 
  });
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