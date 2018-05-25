var credentials = require("../lib/credentials");
var mongoose = require('mongoose');

var options = { server: 
  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } 
   } 
};
 mongoose.connect(credentials.mongo.development.connectionString, options);

// local db connection settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/<DB_NAME>');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Movie model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 name: String,
 year: Number,
 label: String,
}); 

// mySchema.methods.prefix = function(){
//  //add Mr. to Lead Actor's name
//  this.leadActor = "Mr. " + this.leadActor;
//  return this.leadActor;
//  console.log(this.movies)
// };

// exports.getAll = function(){
//  return this.movies;
//  console.log(this.movies)
// };

module.exports = mongoose.model('Records', mySchema);